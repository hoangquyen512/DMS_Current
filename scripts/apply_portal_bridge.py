#!/usr/bin/env python3
"""Patch mockup web: col-check alignment + đảm bảo portal chrome scripts."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "mockups" / "web"

SKIP = {"components-gallery.html", "main.html"}


def patch_file(path: Path) -> list[str]:
    changes: list[str] = []
    text = path.read_text(encoding="utf-8")
    original = text

    if "checkbox-col" in text and "col-check" not in text:
        text = text.replace('class="checkbox-col"', 'class="checkbox-col col-check"')
        changes.append("checkbox-col → col-check")

    text = re.sub(
        r'<th([^>]*?)style="width:\s*36px;?"([^>]*?)>\s*<input([^>]*?)type="checkbox"',
        r'<th class="col-check"><input\3type="checkbox"',
        text,
        flags=re.I,
    )

    if "portal-chrome.js" not in text and path.name not in SKIP:
        depth = len(path.relative_to(WEB).parts) - 1
        base = "../" * depth
        inject = (
            f'<script src="{base}menu-tree.js"></script>\n'
            f'<script src="{base}_shared/portal-menu.js"></script>\n'
            f'<script src="{base}_shared/portal-chrome.js"></script>'
        )
        if "</body>" in text:
            text = text.replace("</body>", inject + "\n</body>")
            changes.append("added portal-chrome scripts")

    if text != original:
        path.write_text(text, encoding="utf-8")
    return changes


def main() -> None:
    total = 0
    for html in sorted(WEB.rglob("*.html")):
        if html.name in SKIP:
            continue
        ch = patch_file(html)
        if ch:
            print(f"{html.relative_to(ROOT)}: {', '.join(ch)}")
            total += 1
    print(f"Done. Patched {total} file(s).")


if __name__ == "__main__":
    main()
