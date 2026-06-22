#!/usr/bin/env python3
"""Generate placeholder EAden logo/favicon assets to replace upstream WorkAdventure art.

Renders a simple wordmark ("EAden" on wide logos, "EA" on square icons) in the
Effective Altruism France brand teal-blue (#368094), overwriting the existing files
in place at their exact original dimensions. White (`-white`) variants render the
mark in white on a transparent background.

One-off utility — run from the repo root:  python3 deploy/scripts/gen-eaden-assets.py
Requires Pillow.
"""
from __future__ import annotations

import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FONT = "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"

BRAND = (54, 128, 148, 255)   # #368094 EA France blue
WHITE = (255, 255, 255, 255)
TRANSPARENT = (0, 0, 0, 0)


def fit_font(text: str, max_w: int, max_h: int) -> ImageFont.FreeTypeFont:
    """Largest Noto Sans Bold that fits text within (max_w, max_h)."""
    size = max_h
    while size > 4:
        f = ImageFont.truetype(FONT, size)
        l, t, r, b = f.getbbox(text)
        if (r - l) <= max_w and (b - t) <= max_h:
            return f
        size -= 1
    return ImageFont.truetype(FONT, 5)


def draw_centered(img: Image.Image, text: str, color, pad_ratio: float = 0.16):
    d = ImageDraw.Draw(img)
    w, h = img.size
    pad = int(min(w, h) * pad_ratio)
    f = fit_font(text, w - 2 * pad, h - 2 * pad)
    l, t, r, b = d.textbbox((0, 0), text, font=f)
    d.text(((w - (r - l)) / 2 - l, (h - (b - t)) / 2 - t), text, font=f, fill=color)


def rounded_rect_mask(size, radius_ratio=0.22) -> Image.Image:
    w, h = size
    radius = int(min(w, h) * radius_ratio)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, w - 1, h - 1], radius=radius, fill=255)
    return mask


def make(path: str, size, text: str, *, white: bool):
    """white=True -> white mark on transparent; else white mark on a brand rounded square."""
    w, h = size
    img = Image.new("RGBA", size, TRANSPARENT)
    if white:
        draw_centered(img, text, WHITE)
    else:
        tile = Image.new("RGBA", size, BRAND)
        # rounded corners only when reasonably large; tiny favicons stay full-bleed for clarity
        if min(w, h) >= 40:
            img.paste(tile, (0, 0), rounded_rect_mask(size))
        else:
            img = tile
        draw_centered(img, text, WHITE)
    abspath = os.path.join(ROOT, path)
    img.save(abspath, "PNG")
    print(f"  {path}  {size[0]}x{size[1]}  {'white' if white else 'brand'}")


# ---- standalone logos -------------------------------------------------------
print("standalone logos:")
make("play/public/static/images/Powered_By_WorkAdventure_Small.png", (128, 32), "EAden", white=False)
make("play/public/static/images/logo-WA-min.png", (128, 128), "EA", white=False)
make("play/public/static/images/logo-wa-2.png", (92, 92), "EA", white=False)
make("play/src/front/Components/images/Powered_By_WorkAdventure_Big.png", (288, 64), "EAden", white=False)
make("play/src/front/Components/images/icon-workadventure-white.png", (144, 144), "EA", white=True)
make("play/src/front/Components/images/logo-WA-pixel.png", (64, 64), "EA", white=False)

# ---- favicon set ------------------------------------------------------------
# Scan the existing favicon dir and overwrite every PNG in place, using each
# file's real dimensions and inferring brand/white from its name. This handles
# the irregular names (e.g. "android-icon-36x36.-white.png", "apple-icon-white.png").
FAV = "play/public/static/images/favicons"
print("favicon set:")
fav_dir = os.path.join(ROOT, FAV)
for fname in sorted(os.listdir(fav_dir)):
    if not fname.lower().endswith(".png"):
        continue
    w, h = Image.open(os.path.join(fav_dir, fname)).size
    text = "EA" if min(w, h) >= 28 else "E"
    make(f"{FAV}/{fname}", (w, h), text, white=("white" in fname))

# ---- favicon.ico (multi-resolution) ----------------------------------------
print("favicon.ico:")
ico_src = Image.new("RGBA", (64, 64), TRANSPARENT)
ico_src.paste(Image.new("RGBA", (64, 64), BRAND), (0, 0), rounded_rect_mask((64, 64)))
draw_centered(ico_src, "EA", WHITE)
ico_path = os.path.join(ROOT, FAV, "favicon.ico")
ico_src.save(ico_path, sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print(f"  {FAV}/favicon.ico")

# ---- favicon-512x512.svg ----------------------------------------------------
print("favicon-512x512.svg:")
svg = """<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" ry="112" fill="#368094"/>
  <text x="256" y="256" fill="#ffffff" font-family="'Noto Sans','DejaVu Sans',sans-serif"
        font-weight="700" font-size="240" text-anchor="middle" dominant-baseline="central">EA</text>
</svg>
"""
with open(os.path.join(ROOT, FAV, "favicon-512x512.svg"), "w") as fh:
    fh.write(svg)
print(f"  {FAV}/favicon-512x512.svg")

print("done.")
