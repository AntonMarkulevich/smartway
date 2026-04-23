# -*- coding: utf-8 -*-
"""One-off: replace footer arrows and inline __btn-icon SVGs with img/arrow.svg"""
import re
from pathlib import Path

root = Path(__file__).resolve().parent
footer_old = re.compile(
    r'<span class="footer__ext-icon" aria-hidden="true"> ↗</span>',
    re.MULTILINE,
)
footer_new = (
    '<span class="footer__ext-icon" aria-hidden="true">'
    '<img src="img/arrow.svg" alt="" class="btn__arrow" width="14" height="14" decoding="async">'
    "</span>"
)

pattern_icon = re.compile(
    r'(<span class="[^"]*__btn-icon[^"]*" aria-hidden="true">)\s*<svg\b.*?</svg>\s*(</span>)',
    re.DOTALL,
)
icon_repl = (
    r'\1<img src="img/arrow.svg" alt="" class="btn__arrow" width="20" height="20" '
    r'loading="lazy" decoding="async" aria-hidden="true" />\2'
)

for p in sorted(root.glob("*.html")):
    t = p.read_text(encoding="utf-8")
    orig = t
    t = footer_old.sub(footer_new, t)
    t = pattern_icon.sub(icon_repl, t)
    if t != orig:
        p.write_text(t, encoding="utf-8")
        print("updated", p.name)

print("done")
