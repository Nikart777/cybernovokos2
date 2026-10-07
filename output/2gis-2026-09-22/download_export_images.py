from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import json
import urllib.request
import time

root = Path(__file__).parent
jobs = []
for branch in ('altufevo', 'novokosino'):
    rows = json.loads((root / f'yandex-{branch}-original.json').read_text(encoding='utf-8'))['Sheet1']
    folder = root / 'yandex-images' / branch
    folder.mkdir(parents=True, exist_ok=True)
    for row in rows[1:]:
        url = row[5]
        if not url.startswith('https://avatars.mds.yandex.net/get-sprav-products/'):
            raise ValueError(f'Unexpected image origin: {row[0]}')
        jobs.append((folder / f'{row[0]}.jpg', url))

def download(job):
    path, url = job
    if path.exists() and path.stat().st_size > 1000:
        return {'file': str(path), 'url': url, 'bytes': path.stat().st_size}
    for attempt in range(3):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(request, timeout=25) as response:
                data = response.read()
                content_type = response.headers.get('Content-Type', '')
            break
        except Exception as exc:
            if attempt == 2:
                return {'file': str(path), 'url': url, 'bytes': 0, 'error': str(exc)}
            time.sleep(1 + attempt)
    if not content_type.startswith('image/') or len(data) < 1000:
        raise ValueError(f'Invalid image: {path.name}')
    path.write_bytes(data)
    return {'file': str(path), 'url': url, 'bytes': len(data), 'content_type': content_type}

with ThreadPoolExecutor(max_workers=3) as pool:
    results = list(pool.map(download, jobs))
(root / 'yandex-images' / 'manifest.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'downloaded': len(results), 'bytes': sum(r['bytes'] for r in results)}, ensure_ascii=False))
