# -*- coding: utf-8 -*-
"""Синхронизация текста футера со скриншотом (без правок CSS)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

pat_partner = re.compile(
    r"^[ \t]*<li><a href=\"[^\"]*\">Партнерская программа для франчайзи «1С»</a></li>[ \t]*\r?\n",
    re.MULTILINE,
)
pat_about = re.compile(
    r'(<li><a href="[^"]*">Правила использования ПЭП</a></li>)\s*\r?\n'
    r'(\s*)(<li><a href="[^"]*">Аккредитованная IT-компания</a></li>)\s*\r?\n'
    r'(\s*)(<li><a href="[^"]*">Договор о страховании финансовых рисков</a></li>)'
)
repl_about = r'\1\n\2<li><a href="#">Гарантия лучшей цены</a></li>\n\2\3'

for p in sorted(ROOT.glob("*.html")):
    t = p.read_text(encoding="utf-8")
    o = t
    t = pat_partner.sub("", t)
    t = pat_about.sub(repl_about, t)
    t = t.replace('alt="ТКП"', 'alt="ГКП"')
    t = t.replace("<p>ООО «Смартвэй», 2026</p>", "<p>ООО «Смартвэй», 2024</p>")
    t = t.replace("стр.&nbsp;1, пом.", "стр.1, пом.")
    if t != o:
        p.write_text(t, encoding="utf-8")
        print("updated:", p.name)
