#!/usr/bin/env python3
"""Значения data-week / data-end для блока цен на cyberx.moscow — из кассы LANGAME.

Сайт делит сутки на «Утро и День» (тариф, действующий с 08:00) и «Вечер и Ночь»
(тариф, действующий после дневного окна). Касса хранит это как отдельные строки
time_period с разным time_from — здесь они и разбираются.

Колонки сайта: data-week = будни (группа «Будние дни»), data-end = выходные.
Запуск: python scripts/site-prices-from-langame.py
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DUMP = os.path.join(ROOT, "output", "langame-cyberx52.json")
CLUB_ID = 3
GROUP_WEEKDAY = 74   # Будние дни (вт,ср,чт)
GROUP_WEEKEND = 76   # Выходные дни (сб,вс)

# блок сайта -> (zone_id, подпись)
SITE_ZONES = [
    ("common",   1, "ОБЩИЙ ЗАЛ"),
    ("bootcamp", 2, "VIP BOOTCAMP"),
    ("duo",      5, "DUO (2 МЕСТА)"),
    ("solo",     5, "SOLO (3 КОМНАТЫ)"),
    ("tv-std",   4, "TV & PS5 — АРЕНДА TV (Стандарт)"),
    ("tv-vip",   9, "TV & PS5 — TV VIP КОМНАТА"),
]
PACKETS = [(1, "1 ЧАС"), (2, "3 ЧАСА"), (3, "5 ЧАСОВ"), (6, "НОЧЬ")]

d = json.load(open(DUMP, encoding="utf-8"))
club = next(c for c in d["clubs"]["data"] if c["id"] == CLUB_ID)
live_zones = set(int(z) for z in json.loads(club["pc_types"]))
live_packets = {p["id"] for p in d["tariffs_types_groups"]["data"] if not p.get("is_deleted")}

rows = [r for r in d["tariffs_time_period"]["data"]
        if r.get("club_id") == CLUB_ID and r["packets_type_PC"] in live_zones
        and r["tariff_packet_id"] in live_packets]


def price(zone, packet, group, slot):
    """slot: 'day' — тариф, стартующий в 08:00; 'eve' — вечерний (всё остальное)."""
    cand = [r for r in rows if r["packets_type_PC"] == zone
            and r["tariff_packet_id"] == packet and r["tariff_groups"] == group]
    if not cand:
        return None
    if packet == 6:  # ночной пакет — одна строка на группу
        return int(cand[0]["price"])
    day = [r for r in cand if r["time_from"].startswith("08:")]
    eve = [r for r in cand if not r["time_from"].startswith("08:") and not r["time_from"].startswith("00:")]
    pick = day if slot == "day" else (eve or day)
    return int(min(r["price"] for r in pick)) if pick else None


print(f"{'зона / карточка':46} {'data-week':>10} {'data-end':>10}")
print("-" * 68)
for key, zone, label in SITE_ZONES:
    print(f"\n### {label}  (zone={zone})")
    for slot, slot_name in (("day", "Утро и День"), ("eve", "Вечер и Ночь")):
        for pid, pname in PACKETS:
            if pid == 6 and slot == "day":
                continue  # ночь только в вечерней секции
            w = price(zone, pid, GROUP_WEEKDAY, slot)
            e = price(zone, pid, GROUP_WEEKEND, slot)
            if w is None and e is None:
                continue
            print(f"  {slot_name:14} {pname:10} {'':18} {str(w):>10} {str(e):>10}")
