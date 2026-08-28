#!/usr/bin/env python3
"""Подстановка кассовых цен LANGAME в блок прайса cyberx.moscow.

Правит только атрибуты data-week / data-end у .cx-price-display, вёрстку не трогает.
Карточки сопоставляются по порядку следования в разметке — он фиксирован:
зона -> секция «Утро и День» (1ч, 3ч, 5ч) -> секция «Вечер и Ночь» (1ч, 3ч, 5ч, ночь).

Запуск: python scripts/patch-site-prices.py [--check]
  --check — только показать расхождения, файл не трогать.
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DUMP = os.path.join(ROOT, "output", "langame-cyberx52.json")
HTML = os.path.join(ROOT, "output", "altufevo-price-block.html")
CLUB_ID, G_WEEKDAY, G_WEEKEND = 3, 74, 76

# порядок блоков в разметке: (метка, zone_id, есть ли ночная карточка)
BLOCKS = [
    ("ОБЩИЙ ЗАЛ", 1), ("VIP BOOTCAMP", 2), ("DUO", 5), ("SOLO", 5),
    ("TV Стандарт", 4), ("TV VIP", 9),
]
PACKETS_DAY = [(1, "1 ЧАС"), (2, "3 ЧАСА"), (3, "5 ЧАСОВ")]
PACKETS_EVE = [(1, "1 ЧАС"), (2, "3 ЧАСА"), (3, "5 ЧАСОВ"), (6, "НОЧЬ")]

d = json.load(open(DUMP, encoding="utf-8"))
club = next(c for c in d["clubs"]["data"] if c["id"] == CLUB_ID)
live_zones = set(int(z) for z in json.loads(club["pc_types"]))
live_packets = {p["id"] for p in d["tariffs_types_groups"]["data"] if not p.get("is_deleted")}
rows = [r for r in d["tariffs_time_period"]["data"]
        if r.get("club_id") == CLUB_ID and r["packets_type_PC"] in live_zones
        and r["tariff_packet_id"] in live_packets]


def price(zone, packet, group, slot):
    cand = [r for r in rows if r["packets_type_PC"] == zone
            and r["tariff_packet_id"] == packet and r["tariff_groups"] == group]
    if not cand:
        return None
    if packet == 6:
        return int(cand[0]["price"])
    day = [r for r in cand if r["time_from"].startswith("08:")]
    eve = [r for r in cand if not r["time_from"].startswith(("08:", "00:"))]
    pick = day if slot == "day" else (eve or day)
    return int(min(r["price"] for r in pick)) if pick else None


expected = []  # [(label, week, end)]
for label, zone in BLOCKS:
    for pid, pname in PACKETS_DAY:
        expected.append((f"{label} / день / {pname}", price(zone, pid, G_WEEKDAY, "day"), price(zone, pid, G_WEEKEND, "day")))
    for pid, pname in PACKETS_EVE:
        expected.append((f"{label} / вечер / {pname}", price(zone, pid, G_WEEKDAY, "eve"), price(zone, pid, G_WEEKEND, "eve")))

html = open(HTML, encoding="utf-8").read()
pattern = re.compile(r'(data-week=")(\d+)("\s+data-end=")(\d+)(")')
found = pattern.findall(html)
if len(found) != len(expected):
    print(f"ОСТАНОВКА: карточек в HTML {len(found)}, ожидалось {len(expected)} — разметка изменилась")
    sys.exit(1)

changes, idx = [], 0


def repl(m):
    global idx
    label, w, e = expected[idx]
    old_w, old_e = int(m.group(2)), int(m.group(4))
    if w is None or e is None:
        print(f"нет цены в кассе: {label}")
        idx += 1
        return m.group(0)
    if (old_w, old_e) != (w, e):
        changes.append((label, old_w, old_e, w, e))
    idx += 1
    return f"{m.group(1)}{w}{m.group(3)}{e}{m.group(5)}"


new_html = pattern.sub(repl, html)

if changes:
    print(f"{'карточка':34} {'было':>13}   {'стало':>13}")
    print("-" * 66)
    for label, ow, oe, w, e in changes:
        print(f"{label:34} {ow:>5}/{oe:<7} → {w:>5}/{e:<7}")
else:
    print("расхождений нет — цены уже актуальны")

if "--check" not in sys.argv and changes:
    open(HTML, "w", encoding="utf-8").write(new_html)
    print(f"\nобновлено карточек: {len(changes)} из {len(expected)} → {os.path.relpath(HTML, ROOT)}")
