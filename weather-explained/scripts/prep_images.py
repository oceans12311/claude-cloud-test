"""Turn raw AI images (white background) into transparent PNGs for Remotion.

Put the downloads in assets-raw/: iguana_frozen.jpg, iguana.jpg, beach.jpg.
Icons get their outer white background flood-filled to alpha (inner whites such
as eyes stay opaque). Scenes are copied as-is. Missing files get a placeholder.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

RAW = Path('assets-raw')
OUT = Path('public/img')
OUT.mkdir(parents=True, exist_ok=True)
ICONS = ['iguana_frozen', 'iguana']
SCENES = ['beach']
KEY = (255, 0, 255)


def find(name):
    for ext in ('.png', '.jpg', '.jpeg', '.webp'):
        p = RAW / f'{name}{ext}'
        if p.exists():
            return p


def cut_out(src: Path, dst: Path):
    img = Image.open(src).convert('RGB')
    w, h = img.size
    # Seed from points along every edge so separated background pockets are caught too.
    seeds = [(x, 0) for x in range(0, w, 16)] + [(x, h - 1) for x in range(0, w, 16)]
    seeds += [(0, y) for y in range(0, h, 16)] + [(w - 1, y) for y in range(0, h, 16)]
    for s in seeds:
        if img.getpixel(s) != KEY and min(img.getpixel(s)) > 225:
            ImageDraw.floodfill(img, s, KEY, thresh=40)
    mask = Image.new('L', (w, h), 255)
    px, mp = img.load(), mask.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == KEY:
                mp[x, y] = 0
    mask = mask.filter(ImageFilter.GaussianBlur(1.2))
    rgba = Image.open(src).convert('RGBA')
    rgba.putalpha(mask)
    rgba = rgba.crop(rgba.getbbox())
    rgba.save(dst)


def placeholder(name, dst, size, color):
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([20, 20, size[0] - 20, size[1] - 20], 60, fill=color, outline='black', width=10)
    d.text((60, 60), name, fill='black')
    img.save(dst)


for n in ICONS:
    src = find(n)
    if src:
        cut_out(src, OUT / f'{n}.png')
    else:
        placeholder(n, OUT / f'{n}.png', (1000, 560), (120, 200, 90, 255) if n == 'iguana' else (140, 200, 220, 255))
    print(n, 'real' if src else 'placeholder')

for n in SCENES:
    src = find(n)
    if src:
        Image.open(src).convert('RGB').resize((1080, 1920), Image.LANCZOS).save(OUT / f'{n}.jpg', quality=92)
    else:
        Image.new('RGB', (1080, 1920), (120, 190, 240)).save(OUT / f'{n}.jpg')
    print(n, 'real' if src else 'placeholder')
