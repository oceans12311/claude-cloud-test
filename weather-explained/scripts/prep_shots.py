"""Prepare the numbered AI shots for the Frozen Iguanas short.

assets-raw/shots/NN.(png|jpg|webp)  ->  public/img/shots/NN.(jpg|png)
- scenes (full-bleed 9:16) are resized/cropped to 1080x1920 JPG
- icons/characters get their outer white background flood-filled to alpha
- cards (diagrams) are kept as-is with their own background
Missing shots get a labelled placeholder so the timeline always renders.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageOps

RAW, OUT = Path('assets-raw/shots'), Path('public/img/shots')
OUT.mkdir(parents=True, exist_ok=True)
KIND = {'01': 'scene', '02': 'scene', '03': 'icon', '04': 'icon', '05': 'icon', '06': 'scene',
        '07': 'card', '08': 'icon', '09': 'scene', '10': 'icon', '11': 'icon'}
KEY = (255, 0, 255)


def find(n):
    for p in RAW.glob(f'{n}*'):
        if p.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp'):
            return p


def cut_out(img):
    rgb = img.convert('RGB')
    w, h = rgb.size
    key = rgb.copy()
    seeds = [(x, y) for x in range(0, w, 8) for y in (0, h - 1)] + [(x, y) for y in range(0, h, 8) for x in (0, w - 1)]
    for s in seeds:
        if key.getpixel(s) != KEY and min(key.getpixel(s)) > 225:
            ImageDraw.floodfill(key, s, KEY, thresh=45)
    mask = Image.new('L', (w, h), 255)
    kp, mp = key.load(), mask.load()
    for y in range(h):
        for x in range(w):
            if kp[x, y] == KEY:
                mp[x, y] = 0
    out = rgb.convert('RGBA')
    out.putalpha(mask.filter(ImageFilter.GaussianBlur(1.0)))
    return out.crop(out.getbbox())


for n, kind in KIND.items():
    src = find(n)
    if src is None:
        ph = Image.new('RGB', (1080, 1920) if kind == 'scene' else (900, 900), (200, 200, 200))
        ImageDraw.Draw(ph).text((40, 40), f'shot {n} missing', fill='black')
        ph.save(OUT / (f'{n}.jpg' if kind == 'scene' else f'{n}.png'))
        print(n, 'placeholder')
        continue
    img = Image.open(src)
    if kind == 'scene':
        ImageOps.fit(img.convert('RGB'), (1080, 1920), Image.LANCZOS).save(OUT / f'{n}.jpg', quality=92)
    elif kind == 'icon':
        cut_out(img).save(OUT / f'{n}.png')
    else:
        img.convert('RGB').save(OUT / f'{n}.png')
    print(n, kind, src.name)
