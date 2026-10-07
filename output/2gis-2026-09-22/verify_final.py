import json
from pathlib import Path
import openpyxl

root = Path(__file__).parent
for branch in ('altufevo', 'novokosino'):
    path = root / f'yandex-{branch}-final.xlsx'
    wb = openpyxl.load_workbook(path, data_only=True)
    rows = list(wb.active.values)
    print(branch, 'rows', len(rows)-1, 'headers', rows[0])
    print('sample', rows[1])
    path.with_suffix('.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding='utf-8')
