import json
from pathlib import Path
import xml.etree.ElementTree as ET
import openpyxl

root = Path(__file__).parent
report = []
for branch, expected_count in [('altufevo', 27), ('novokosino', 35)]:
    expected = json.loads((root / f'{branch}-catalog.json').read_text(encoding='utf-8'))
    rows = list(openpyxl.load_workbook(root / f'yandex-{branch}-final.xlsx', data_only=True).active.values)[1:]
    actual = {r[0]: r for r in rows}
    assert len(actual) == expected_count
    assert set(actual) == {x['id'] for x in expected}
    for item in expected:
        row = actual[item['id']]
        assert row[2] == item['name'], (branch, item['id'], 'name')
        assert float(row[7]) == item['price'], (branch, item['id'], 'price')
        assert row[3] == item['description'].replace('24 часов', '24 часа'), (branch, item['id'], 'description')
        assert (row[10] == 'да') == item['popular'], (branch, item['id'], 'popular')
        assert row[11] == 'да' and row[5], (branch, item['id'], 'availability/photo')
        item.update(description=row[3], shortDescription=row[4], picture=row[5])
    (root / f'{branch}-catalog.json').write_text(json.dumps(expected, ensure_ascii=False, indent=2), encoding='utf-8')
    for platform in ('2gis', 'yandex'):
        path = root / f'{platform}-{branch}-updated.yml'
        tree = ET.parse(path)
        lookup = {x['id'] if platform == 'yandex' else ('alt' if branch == 'altufevo' else 'nov') + x['id'].replace('-', ''): x for x in expected}
        for offer in tree.findall('.//offer'):
            item = lookup[offer.attrib['id']]
            offer.find('description').text = item['description']
            if platform == 'yandex':
                offer.find('shortDescription').text = item['shortDescription']
                pic = offer.find('picture')
                if pic is None:
                    pic = ET.SubElement(offer, 'picture')
                pic.text = item['picture']
        ET.indent(tree, space='  ')
        tree.write(path, encoding='utf-8', xml_declaration=True)
    report.append({'branch': branch, 'offers': len(actual), 'prices_verified': len(actual), 'descriptions_verified': len(actual), 'popular': sum(x['popular'] for x in expected), 'with_images': sum(bool(x['picture']) for x in expected)})
(root / 'verification-final.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))

cards = json.loads((root / '2gis-saved-cards.json').read_text(encoding='utf-8'))
assert len(cards) == 62
for branch in ('altufevo', 'novokosino'):
    for item in json.loads((root / f'{branch}-catalog.json').read_text(encoding='utf-8')):
        matching = [c for c in cards if item['name'] in c and item['description'] in c]
        assert matching, (branch, item['id'], '2GIS missing')
        assert any(int(''.join(ch for ch in c.splitlines()[-1] if ch.isdigit())) == item['price'] for c in matching), (branch, item['id'], '2GIS price')
print('2GIS: 62 cards, all names, descriptions and displayed prices verified')
