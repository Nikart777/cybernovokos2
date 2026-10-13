"""Losslessly compress the existing brand fonts to WOFF2 (fonttools + brotli)."""
from pathlib import Path
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
for source in (root / 'app' / 'fonts').glob('*.woff'):
    font = TTFont(source)
    font.flavor = 'woff2'
    target = source.with_suffix('.woff2')
    font.save(target)
    print(f'{source.name}: {source.stat().st_size} -> {target.stat().st_size} bytes')
