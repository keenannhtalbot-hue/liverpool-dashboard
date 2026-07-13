"""Generate the four PWA icons for the Liverpool Deep Dive dashboard.

Produces:
  icons/icon-192.png          (PWA, any)
  icons/icon-512.png          (PWA, any)
  icons/icon-maskable-512.png (PWA, maskable — artwork inside the safe zone)
  icons/apple-touch-icon.png  (iOS, 180x180)

Design:
  - Deep navy background (#0a1628) for the regular icons.
  - For the maskable icon: same background but with the artwork inset
    so it remains visible under any Android adaptive mask.
  - Liver Bird silhouette in gold (#fcd000) with subtle red (#c8102e) accent.
  - 180x180 apple icon mirrors the 192 layout.
"""

from PIL import Image, ImageDraw
import os

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "icons")
os.makedirs(OUT_DIR, exist_ok=True)

RED = (200, 16, 46)
RED_DEEP = (139, 10, 28)
GOLD = (252, 208, 0)
NAVY = (10, 22, 40)


def draw_liver_bird(draw, cx, cy, scale, color):
    """Draw a stylised Liver Bird silhouette centred on (cx, cy)."""
    # Approximate the heraldic Liver Bird with a series of shapes.
    # It's a two-legged bird with seaweed in its beak. We simplify into:
    #   - body (oval)
    #   - head (smaller oval)
    #   - legs (two thin rectangles)
    #   - tail (triangle)
    #   - seaweed sprig (two curves)
    s = scale

    # Body (oval)
    bw = int(s * 0.55)
    bh = int(s * 0.80)
    body_bbox = (cx - bw // 2, cy - bh // 2 + int(s * 0.05),
                 cx + bw // 2, cy + bh // 2 + int(s * 0.05))
    draw.ellipse(body_bbox, fill=color)

    # Head (slightly higher, smaller)
    hd = int(s * 0.32)
    head_cy = cy - int(s * 0.42)
    draw.ellipse((cx - hd // 2, head_cy - hd // 2, cx + hd // 2, head_cy + hd // 2), fill=color)

    # Beak (small triangle pointing left — liver bird faces left)
    beak_pts = [
        (cx - hd // 2, head_cy - int(s * 0.04)),
        (cx - hd // 2 - int(s * 0.10), head_cy),
        (cx - hd // 2, head_cy + int(s * 0.04)),
    ]
    draw.polygon(beak_pts, fill=color)

    # Seaweed sprig (two simple curves from the beak)
    for off in (-2, 4):
        pts = []
        for i in range(8):
            t = i / 7
            x = cx - hd // 2 - int(s * 0.05) - int(s * 0.04 * i)
            y = head_cy + off + int(2 * (i % 2))
            pts.append((x, y))
        for i in range(len(pts) - 1):
            draw.line([pts[i], pts[i + 1]], fill=color, width=max(1, int(s * 0.015)))

    # Eye (small red dot)
    er = max(1, int(s * 0.025))
    draw.ellipse((cx - int(s * 0.05) - er, head_cy - int(s * 0.05) - er,
                  cx - int(s * 0.05) + er, head_cy - int(s * 0.05) + er), fill=RED)

    # Tail (pointing up to the right)
    tail_pts = [
        (cx + bw // 2 - int(s * 0.05), cy - int(s * 0.18)),
        (cx + bw // 2 + int(s * 0.15), cy - int(s * 0.42)),
        (cx + bw // 2 + int(s * 0.04), cy - int(s * 0.05)),
    ]
    draw.polygon(tail_pts, fill=color)

    # Legs
    leg_w = max(1, int(s * 0.04))
    leg_h = int(s * 0.18)
    for off in (-int(s * 0.07), int(s * 0.07)):
        draw.rectangle((cx + off - leg_w // 2,
                        cy + bh // 2 - int(s * 0.04),
                        cx + off + leg_w // 2,
                        cy + bh // 2 - int(s * 0.04) + leg_h), fill=color)

    # Feet (small triangles)
    for off in (-int(s * 0.07), int(s * 0.07)):
        pts = [
            (cx + off - leg_w, cy + bh // 2 - int(s * 0.04) + leg_h),
            (cx + off + leg_w, cy + bh // 2 - int(s * 0.04) + leg_h),
            (cx + off,         cy + bh // 2 - int(s * 0.04) + leg_h + int(s * 0.04)),
        ]
        draw.polygon(pts, fill=color)


def make_icon(size, maskable=False, fname="icon.png"):
    """Render a single PWA icon."""
    img = Image.new("RGB", (size, size), NAVY)
    draw = ImageDraw.Draw(img, "RGBA")

    if maskable:
        # For maskable: artwork MUST stay inside the centered safe zone.
        # Android's largest mask = circle inscribed in 80% of the square,
        # so we keep bird inside ~60% of the canvas.
        scale = size * 0.50
        draw_liver_bird(draw, size // 2, size // 2, scale, GOLD)
        # Subtle red border ring at the very edge so the icon is visible
        # even if a launcher only shows the inner circle.
        bw = max(1, size // 64)
        draw.rectangle((0, 0, size - 1, size - 1), outline=RED_DEEP, width=bw)
    else:
        # For non-maskable: bird centred, slightly larger, with a soft gold halo.
        halo = size // 6
        draw.ellipse((size // 2 - halo, size // 2 - halo,
                      size // 2 + halo, size // 2 + halo),
                     fill=(252, 208, 0, 40))
        scale = size * 0.66
        draw_liver_bird(draw, size // 2, size // 2, scale, GOLD)
        # Thin red inner border for LFC brand
        bw = max(1, size // 80)
        draw.rectangle((bw, bw, size - bw - 1, size - bw - 1), outline=RED, width=bw)

    out = os.path.join(OUT_DIR, fname)
    img.save(out, "PNG", optimize=True)
    print(f"wrote {out} ({size}x{size})")


if __name__ == "__main__":
    make_icon(192, maskable=False, fname="icon-192.png")
    make_icon(512, maskable=False, fname="icon-512.png")
    make_icon(512, maskable=True,  fname="icon-maskable-512.png")
    make_icon(180, maskable=False, fname="apple-touch-icon.png")
    print("done")
