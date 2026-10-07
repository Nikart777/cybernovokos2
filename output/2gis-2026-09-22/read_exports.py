import json
from pathlib import Path
import openpyxl

root = Path(__file__).parent
for path in root.glob('yandex-*-original.xlsx'):
    book = openpyxl.load_workbook(path, data_only=True)
    sheets = {sheet.title: list(sheet.values) for sheet in book}
    path.with_suffix('.json').write_text(json.dumps(sheets, ensure_ascii=False, indent=2), encoding='utf-8')
    print(path.name)
    for name, rows in sheets.items():
        print(name, len(rows), 'rows')
        for row in rows[:4]:
            print(json.dumps(row, ensure_ascii=False))
