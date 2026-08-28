#!/usr/bin/env python3
"""Генератор XLSX-прайса Яндекс Бизнеса для CyberX Алтуфьево (permalink 108414541367).

Источник: data/altufevo-yandex-menu.json (цены сняты с cyberx.moscow).
Запуск:   python scripts/generate-altufevo-xlsx.py
Выход:    output/altufevo-price-list.xlsx → кабинет: Товары и услуги → Загрузить XLS/YML → XLS.

Колонки — как в экспорте Яндекса (важен порядок), включая «популярный товар» (да/нет):
заливка файла проставляет популярные без ручных кликов.
Фото добавляются вторым этапом (колонка «фото» принимает URL — заполнится, когда появятся).
"""
import json, os, sys
from openpyxl import Workbook

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data", "altufevo-yandex-menu.json")
DUMP = os.path.join(ROOT, "output", "langame-cyberx52.json")
OUT = os.path.join(ROOT, "output", "altufevo-price-list.xlsx")
DEFAULT_URL = "https://cyberx.moscow/#price"
CLUB_ID = 3  # CyberX-Nash


def langame_prices():
    """{(zone_id, packet_id): (min, max)} из выгрузки кассы.

    Матрица содержит и архивные записи: строки фильтруются по pc_types клуба
    и по неудалённым пакетам, иначе в цены попадают тарифы снятых зон.
    """
    d = json.load(open(DUMP, encoding="utf-8"))
    club = next(c for c in d["clubs"]["data"] if c["id"] == CLUB_ID)
    zones = set(int(z) for z in json.loads(club["pc_types"]))
    packets = {p["id"] for p in d["tariffs_types_groups"]["data"] if not p.get("is_deleted")}
    acc = {}
    for r in d["tariffs_time_period"]["data"]:
        if r.get("club_id") != CLUB_ID or r["packets_type_PC"] not in zones or r["tariff_packet_id"] not in packets:
            continue
        acc.setdefault((r["packets_type_PC"], r["tariff_packet_id"]), []).append(r["price"])
    return {k: (int(min(v)), int(max(v))) for k, v in acc.items()}

HEADERS = ["идентификатор", "категория", "название", "описание", "короткое описание",
           "фото", "ссылка", "цена", "количество", "единицы измерения",
           "популярный товар", "в наличии"]

data = json.load(open(SRC, encoding="utf-8"))
items = data["items"]

wb = Workbook()
ws = wb.active
ws.title = "Прайс-лист"
ws.append(HEADERS)

prices = langame_prices()
problems, changed = [], []
for it in items:
    key = tuple(it["langame"]) if it.get("langame") else None
    if key:
        if key not in prices:
            problems.append(f"{it['id']}: нет тарифа {key} в выгрузке кассы")
            continue
        lo, hi = prices[key]
        if it["price"] != lo:
            changed.append((it["id"], it["price"], lo))
        it["price"], it["max"] = lo, hi
    desc = it["desc"].replace("{MIN}", str(it["price"])).replace("{MAX}", str(it.get("max", it["price"])))
    if "{" in desc:
        problems.append(f"{it['id']}: неподставленный плейсхолдер")
    if len(desc) > 500:
        problems.append(f"{it['id']}: описание {len(desc)} зн. (>500)")
    ws.append([
        it["id"], it["cat"], it["name"], desc, "",
        it.get("photo", ""), it.get("url", DEFAULT_URL), it["price"], "", "",
        "да" if it.get("popular") else "нет", "да",
    ])

if problems:
    print("ОШИБКИ:"); [print(" -", p) for p in problems]; sys.exit(1)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
wb.save(OUT)

cats = {}
for it in items:
    cats.setdefault(it["cat"], []).append(it)
print(f"XLSX: {os.path.relpath(OUT, ROOT)} ({len(items)} позиций)")
for c, arr in cats.items():
    print(f"— {c}")
    for it in arr:
        star = "★" if it.get("popular") else " "
        print(f"   {star} {it['price']:>5} ₽  {it['name']}")
print(f"\nПопулярных: {sum(1 for i in items if i.get('popular'))}")
if changed:
    print(f"\nЦены обновлены по кассе ({len(changed)}):")
    for pid, old, new in changed:
        print(f"   {pid:20} {old} -> {new} ₽  ({new - old:+})")
