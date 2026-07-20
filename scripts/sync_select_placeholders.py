# -*- coding: utf-8 -*-
"""Sync <select> placeholder text to field label; strip disabled on filter* selects."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "mockups"


def clean_label(html: str) -> str:
    t = re.sub(r"<[^>]+>", "", html)
    t = t.replace("*", "").replace("\xa0", " ").strip()
    t = re.sub(r"\s+", " ", t)
    return t


def is_generic_ph(ph: str) -> bool:
    p = ph.strip()
    if not p or p == "Chọn":
        return True
    if p.startswith("Chọn ") or p.startswith("Chọn…") or p.startswith("— Chọn"):
        return True
    if p.startswith("Chọn") and len(p) < 40:
        return True
    return False


def sync_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    orig = text

    for m in re.finditer(
        r'<label([^>]*)class="[^"]*portal-field__label[^"]*"([^>]*)>(.*?)</label>',
        text,
        re.I | re.S,
    ):
        attrs = m.group(1) + m.group(2)
        label = clean_label(m.group(3))
        if not label:
            continue
        idm = re.search(r'\bfor=["\']([^"\']+)["\']', attrs)
        if not idm:
            continue
        sid = idm.group(1)
        sel_pat = re.compile(
            rf'(<select[^>]*\bid=["\']{re.escape(sid)}["\'][^>]*>\s*)'
            rf'(<option\s+value=""\s+(?:selected\s+)?hidden\s*>)([^<]*)(</option>)',
            re.I,
        )

        def sel_repl(sm: re.Match[str], lab: str = label) -> str:
            cur = sm.group(3).strip()
            if cur == lab:
                return sm.group(0)
            if is_generic_ph(cur):
                return sm.group(1) + sm.group(2) + lab + sm.group(4)
            return sm.group(0)

        text = sel_pat.sub(sel_repl, text)

    def filter_repl(m: re.Match[str]) -> str:
        lab = clean_label(m.group(1))
        ph = m.group(3)
        if not lab:
            return m.group(0)
        if is_generic_ph(ph) and ph.strip() != lab:
            return m.group(0).replace(
                m.group(2) + ph + m.group(4),
                m.group(2) + lab + m.group(4),
                1,
            )
        return m.group(0)

    text = re.sub(
        r'<div class="filter-label">(.*?)</div>\s*(?:<div[^>]*>\s*)?<select[^>]*>\s*'
        r'(<option\s+value=""\s+(?:selected\s+)?hidden\s*>)([^<]*)(</option>)',
        filter_repl,
        text,
        flags=re.I | re.S,
    )

    # Strip disabled on filter* selects (cascade mockups must stay clickable)
    text = re.sub(
        r'(<select[^>]*\bid="filter[^"]*"[^>]*)\s+disabled(\s|>)',
        lambda m: m.group(1) + m.group(2),
        text,
        flags=re.I,
    )

    if text != orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed: list[str] = []
    for path in ROOT.rglob("*.html"):
        if "_archive" in path.parts:
            continue
        if sync_file(path):
            changed.append(str(path.relative_to(ROOT)))
    print(f"updated {len(changed)}")
    for c in changed:
        print(c)


if __name__ == "__main__":
    main()
