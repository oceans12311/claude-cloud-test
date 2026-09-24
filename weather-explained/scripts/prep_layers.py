"""Split the single frozen-iguana image into animation layers.

public/img/layers/
  full.png   original with white background removed (1264x1264, uncropped so
             coordinates stay stable)
  base.png   same iguana with the ice crystals painted out (the "thawed" look)
  ice.png    only the ice crystals, transparent elsewhere
Tail / leg / eye pieces are cut in Remotion with clip-paths on base.png, using
the coordinates in src/layers.ts.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = Path('assets-raw/iguana_frozen.jpg')
OUT = Path('public/img/layers')
OUT.mkdir(parents=True, exist_ok=True)
KEY = (255, 0, 255)

rgb = Image.open(SRC).convert('RGB')
w, h = rgb.size

# 1) Outer background -> alpha (flood fill from the border so inner whites survive).
key = rgb.copy()
for s in [(x, y) for x in range(0, w, 8) for y in (0, h - 1)] + [(x, y) for y in range(0, h, 8) for x in (0, w - 1)]:
    if key.getpixel(s) != KEY and min(key.getpixel(s)) > 225:
        ImageDraw.floodfill(key, s, KEY, thresh=45)
k = np.array(key)
alpha = np.where((k == KEY).all(-1), 0, 255).astype(np.uint8)
alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.0)))

a = np.array(rgb).astype(np.float32)
r, g, b = a[..., 0], a[..., 1], a[..., 2]

# 2) Ice crystals: light, clearly bluish pixels (eye white is grey-blue, so the margin matters).
ice = (b - r > 28) & (b > 150) & (alpha > 0)
ice_img = Image.fromarray((ice * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
ice_a = np.array(ice_img)

# 3) Paint the ice out of the base with normalized convolution (fill from surrounding greens).
def blur(x, sigma):
    r = int(3 * sigma)
    k = np.exp(-np.arange(-r, r + 1) ** 2 / (2 * sigma ** 2)); k /= k.sum()
    x = np.apply_along_axis(lambda v: np.convolve(v, k, 'same'), 0, x)
    return np.apply_along_axis(lambda v: np.convolve(v, k, 'same'), 1, x)

hole = ice_a > 40
valid = ((~hole) & (alpha > 128)).astype(np.float32)
filled = a.copy()
todo = hole.copy()
for sigma in (2, 5, 12, 30):
    den = blur(valid, sigma)
    est = np.stack([blur(a[..., c] * valid, sigma) for c in range(3)], -1) / np.maximum(den, 1e-4)[..., None]
    take = todo & (den > 0.05)
    filled[take] = est[take]
    todo &= ~take
mix = (ice_a / 255.0)[..., None]
base = np.array(rgb).astype(np.float32) * (1 - mix) + filled * mix

Image.fromarray(np.dstack([np.array(rgb), alpha])).save(OUT / 'full.png')
Image.fromarray(np.dstack([base.clip(0, 255).astype(np.uint8), alpha])).save(OUT / 'base.png')
Image.fromarray(np.dstack([np.array(rgb), np.minimum(ice_a, alpha)])).save(OUT / 'ice.png')

# Preview sheet for checking the split.
prev = Image.new('RGB', (w * 3, h), (250, 247, 242))
for i, n in enumerate(['full', 'base', 'ice']):
    im = Image.open(OUT / f'{n}.png')
    prev.paste(im, (i * w, 0), im)
prev.resize((w * 3 // 3, h // 3)).save('out/layers_preview.png')
print('ice pixels:', int(ice.sum()))
