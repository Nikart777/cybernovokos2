from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).parent
# Values transcribed from the two price PNGs explicitly supplied by the owner.
# Each array: weekday day, weekend day, weekday evening, weekend evening.
ALT = {
 'standard': ('Общий зал', 'Игровой ПК RTX 5060, монитор 24″, 240 Гц.', [[140,160,170,190],[380,440,460,510],[580,670,730,820]],[750,850]),
 'vipbootcamp': ('VIP BOOTCAMP', 'Буткемп на 5 мест. ПК RTX 5070, монитор 24,5″, 240 Гц.', [[160,190,180,230],[440,520,500,660],[660,790,750,990]],[850,1050]),
 'duo': ('DUO', 'Комната на 2 ПК. RTX 4070 Super, монитор 24,5″, 360 Гц.', [[220,260,250,310],[600,720,690,850],[900,1080,1050,1290]],[1200,1450]),
 'solo': ('SOLO', 'Отдельная комната на 1 игрока. RTX 4070 Super, монитор 27″, 2K, 240 Гц. Всего 3 комнаты.', [[220,260,250,310],[600,720,690,850],[900,1080,1050,1290]],[1200,1450]),
 'ps5-vip': ('PlayStation 5, TV VIP', 'Отдельная комната с PS5 и экраном 70″, до 4 человек.', [[350,400,500,630],[800,1000,1200,1500],[1200,1400,1400,1700]],[1700,1900]),
}
NOV = {
 'standard': ('Общий зал', 'Игровой ПК RTX 4060, монитор 24,5″, 144 Гц.', [[150,170,170,200],[410,470,470,530],[630,730,730,830]],[700,850]),
 'bootcamp': ('BOOTCAMP', 'Буткемп на 5 мест. ПК RTX 4060, монитор 24,5″, 144 Гц.', [[170,190,190,210],[460,520,520,580],[700,800,790,900]],[850,950]),
 'vip': ('VIP BOOTCAMP', 'Буткемп на 5 мест. ПК RTX 4070, монитор 24,5″, 240 Гц.', [[190,210,210,250],[520,580,580,700],[780,890,880,1100]],[950,1150]),
 'duo': ('DUO', 'Зона на 2 ПК. RTX 4070, монитор 24,5″, 240 Гц.', [[190,210,210,250],[520,580,580,700],[780,890,880,1100]],[950,1150]),
 'solo': ('SOLO', 'Отдельная комната на 1 игрока. RTX 5070. PRO: 24,5″, 400 Гц; PREMIUM: 27″, 240 Гц. По 2 комнаты каждого типа.', [[230,280,290,300],[630,690,800,850],[950,1050,1200,1300]],[1300,1450]),
 'ps5-std': ('PlayStation 5, TV-зона', 'Зона PS5 с экраном 70″, до 2 человек.', [[340,400,380,450],[780,960,890,1060],[1180,1420,1330,1620]],[1800,2125]),
 'ps5-vip': ('PlayStation 5, TV VIP', 'Отдельная комната с PS5 и экраном 70″, до 4 человек.', [[390,460,500,520],[910,1100,1060,1300],[1350,1640,1540,1880]],[2075,2450]),
}
WEEKEND = 'Выходной тариф: с пт 16:00 до вс 22:00; в праздники — с 16:00 предпраздничного дня до 22:00 дня после праздников.'
SIM = {'altufevo': {1:[570,750],2:[980,1190],3:[1330,1550]}, 'novokosino': {1:[580,850],2:[980,1290],3:[1350,1650]}}
SUBS = {'day': (24,7,[2900,3500,4200]), '50h':(50,20,[5100,6300,7500]), '100h':(100,45,[8500,10500,12500])}

def item(row, branch, zones):
    ident, cat, name, desc, short, photo, url, price, count, unit, popular, available = row
    if branch == 'altufevo' and ident.startswith('ps5-std-'):
        return None
    match = re.fullmatch(r'(.+)-(1h|3h|5h|night)', ident)
    if match and match[1] in zones:
        zone, duration = match.groups()
        label, spec, rates, night = zones[zone]
        pc = not zone.startswith('ps5')
        subject = f'Игровой ПК {label}' if pc else label
        per = 'Цена за 1 место.' if pc else 'Цена за комнату.' if zone == 'ps5-vip' else 'Цена за TV-зону.'
        if duration == 'night':
            name = f'{subject} — ночь 13 часов, 22:00–11:00'
            price = night[0]
            tariff = f'Ночь 22:00–11:00: будни {night[0]} ₽, выходные {night[1]} ₽.'
        else:
            hours = int(duration[0])
            htext = '1 час' if hours == 1 else '3 часа' if hours == 3 else '5 часов'
            name = f'{subject} — {htext}, будни 04:00–16:00'
            r = rates[[1,3,5].index(hours)]
            price = r[0]
            tariff = f'04:00–16:00: будни {r[0]} ₽, выходные {r[1]} ₽. 16:00–04:00: будни {r[2]} ₽, выходные {r[3]} ₽.'
        desc = f'{spec} {tariff} {per} {WEEKEND}'
        if not pc:
            desc += ' Дополнительный гость +100 ₽ при возможности размещения.'
        short = f'{spec} {tariff} {per}'
        cat = 'Игровые ПК — ' + label if pc else label
    elif ident.startswith('simracing-'):
        hours = int(ident.split('-')[-1][0])
        r = SIM[branch][hours]
        price = r[0]
        htext = f'{hours} ' + ('час' if hours == 1 else 'часа')
        name = f'Автосимулятор — {htext}, будни'
        desc = f'Гоночный автосимулятор с рулём и педалями. Пакет {htext}: будни {r[0]} ₽, выходные {r[1]} ₽. {WEEKEND}'
        short = f'Гоночный автосимулятор с рулём и педалями. {htext}: будни {r[0]} ₽, выходные {r[1]} ₽.'
    elif ident.startswith('abonement-'):
        kind = ident.split('-')[-1]
        hours = 24 if kind == 'day' else int(kind[:-1])
        name = f'Абонемент на игровые ПК — {hours} ' + ('часа' if hours == 24 else 'часов')
        if branch == 'novokosino':
            _, days, r = SUBS[kind]
            desc = f'{hours} часов игрового времени, срок действия {days} дней. Общий зал: {r[0]} ₽; VIP/BOOTCAMP: {r[1]} ₽; SOLO: {r[2]} ₽. Указана цена для общего зала.'
        else:
            desc = f'{hours} часов игрового времени. Базовая стоимость {price} ₽; стоимость зависит от выбранной игровой зоны. Условия применения абонемента уточняйте у администратора.'
        short = desc
    elif ident == 'certificate':
        name = 'Подарочный сертификат в компьютерный клуб — 1000 ₽'
        desc = 'Подарочный сертификат номиналом 1000 ₽ на услуги компьютерного клуба. Игровые ПК, PlayStation 5 и автосимуляторы. Другие номиналы и условия использования уточняйте у администратора.'
        short = desc
    else:
        raise ValueError(f'Unmapped: {branch}/{ident}')
    assert len(name) <= 200 and len(desc) <= 500 and len(short) <= 250, (ident,len(name),len(desc),len(short))
    return dict(id=ident,category=cat,name=name,description=desc,shortDescription=short,picture=photo,url=url,price=int(price),popular=popular == 'да',available=True)

def save_yml(items, branch, platform):
    root = ET.Element('yml_catalog',date='2026-09-22 12:00')
    shop = ET.SubElement(root,'shop')
    ET.SubElement(shop,'name').text = 'CyberX ' + ('Алтуфьево' if branch == 'altufevo' else 'Новокосино')
    ET.SubElement(shop,'company').text = 'CyberX Community'
    currencies = ET.SubElement(shop,'currencies')
    ET.SubElement(currencies,'currency',id='RUB',rate='1')
    cats = list(dict.fromkeys(i['category'] for i in items))
    categories = ET.SubElement(shop,'categories')
    for idx, cat in enumerate(cats,1):
        ET.SubElement(categories,'category',id=str(idx)).text=cat
    offers = ET.SubElement(shop,'offers')
    for i in items:
        oid = i['id'] if platform == 'yandex' else ('alt' if branch == 'altufevo' else 'nov') + i['id'].replace('-','')
        assert len(oid) <= (80 if platform == 'yandex' else 20),oid
        offer = ET.SubElement(offers,'offer',id=oid,available='true')
        fields = {'name':i['name'],'price':i['price'],'currencyId':'RUB','categoryId':cats.index(i['category'])+1,'description':i['description'],'url':i['url']}
        if platform == 'yandex':
            fields.update(vendor='CyberX',shortDescription=i['shortDescription'])
            if i['picture']:
                fields['picture'] = i['picture']
        for key, value in fields.items():
            ET.SubElement(offer,key).text=str(value)
    ET.indent(root,space='  ')
    path = ROOT/f'{platform}-{branch}-updated.yml'
    ET.ElementTree(root).write(path,encoding='utf-8',xml_declaration=True)
    assert len(ET.parse(path).findall('.//offer')) == len(items)

report=[]
for branch,zones in [('altufevo',ALT),('novokosino',NOV)]:
    source=json.loads((ROOT/f'yandex-{branch}-original.json').read_text(encoding='utf-8'))['Sheet1']
    items=[]
    for row in source[1:]:
        updated=item(row,branch,zones)
        if updated is not None:
            items.append(updated)
            if updated['price'] != int(row[7]):
                report.append(f"{branch}: {row[0]}: {row[7]} → {updated['price']} ₽")
        else:
            report.append(f'{branch}: удалена позиция {row[0]}')
    if branch=='altufevo':
        extra=next(r.copy() for r in source[1:] if r[0]=='simracing-2h')
        extra[0]='simracing-3h'
        extra[5]=''
        extra[10]='нет'
        items.append(item(extra,branch,zones))
    assert len(items)==(27 if branch=='altufevo' else 35)
    assert len(set(i['id'] for i in items))==len(items)
    (ROOT/f'{branch}-catalog.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
    for platform in ['2gis','yandex']:
        save_yml(items,branch,platform)
    print(branch,len(items),'offers; popular:',sum(i['popular'] for i in items))
(ROOT/'price-changes.txt').write_text('\n'.join(report),encoding='utf-8')
print('\n'.join(report))
