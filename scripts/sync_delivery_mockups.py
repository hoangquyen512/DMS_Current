#!/usr/bin/env python3
"""Đồng bộ 4 màn Giao hàng từ Delivery_Management vào mockup workspace."""
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REF = Path(r"d:\Delivery_Management")
WS_WEB = ROOT / "mockups" / "web" / "giam-sat" / "giao-hang"
WS_MOBILE = ROOT / "mockups" / "mobile" / "tai-xe"

WEB_MAP = {
    "WEB-CP-B3-don-giao-hang-phan-bo.html": WS_WEB / "danh-sach-phan-bo-don-giao-hang" / "WEB-CP-B3-don-giao-hang-phan-bo.html",
    "WEB-CP-A4-cau-hinh-khu-vuc-tai-xe.html": WS_WEB / "cau-hinh-khu-vuc-giao-hang-theo-tuyen" / "WEB-CP-A4-cau-hinh-khu-vuc-tai-xe.html",
    "MS-W-DL03-bao-cao-doi-soat-tien-thu-giao-hang.html": WS_WEB / "bao-cao-doi-soat-tien-thu-giao-hang" / "MS-W-DL03-bao-cao-doi-soat-tien-thu-giao-hang.html",
}

BREADCRUMBS = {
    "WEB-CP-B3-don-giao-hang-phan-bo.html": ("Quản lý đơn giao hàng", "Quản lý đơn giao hàng"),
    "WEB-CP-A4-cau-hinh-khu-vuc-tai-xe.html": ("Cấu hình khu vực giao hàng theo tuyến", "Cấu hình khu vực giao hàng theo Tuyến giao hàng"),
    "MS-W-DL03-bao-cao-doi-soat-tien-thu-giao-hang.html": ("Báo cáo đối soát tiền thu", "Báo cáo đối soát tiền thu giao hàng"),
}


def wrap_portal_web(html: str, filename: str) -> str:
    crumb, title = BREADCRUMBS[filename]
    if "</style>" in html and "portal-chrome.css" not in html:
        html = html.replace("</style>", "</style>\n<link rel=\"stylesheet\" href=\"../../../_shared/portal-chrome.css\"/>", 1)

    html = re.sub(r"<body[^>]*>", "", html, count=1)
    html = html.replace("</body>", "").replace("</html>", "")

    # Remove standalone topbar (portal chrome replaces it)
    html = re.sub(
        r"<(?:div|header) class=\"topbar\">.*?</(?:div|header)>\s*",
        "",
        html,
        count=1,
        flags=re.DOTALL,
    )

    subtitle = ""
    sub_match = re.search(
        r"<div class=\"page-subtitle\">(.*?)</div>",
        html,
        flags=re.DOTALL,
    )
    if sub_match:
        subtitle = f'<p class="page-subtitle portal-page-subtitle">{sub_match.group(1).strip()}</p>\n'

    # Remove page-header block (title moves to portal breadcrumb row)
    html = re.sub(
        r"<(?:div|section) class=\"page-header\">.*?</(?:div|section)>\s*",
        "",
        html,
        count=1,
        flags=re.DOTALL,
    )

    portal_head = f'''<body class="portal-page" data-portal-base="../../../">
<div id="portal-chrome-root"></div>
<div class="portal-page-body">

<nav class="portal-breadcrumb" aria-label="Breadcrumb">
  <a href="../../../main.html">Giám sát</a>
  <span class="portal-breadcrumb__sep">/</span>
  <a href="#">Giao hàng</a>
  <span class="portal-breadcrumb__sep">/</span>
  <span class="portal-breadcrumb__current">{crumb}</span>
</nav>
<h1 class="portal-page-title page-title">{title}</h1>
{subtitle}

'''

    portal_tail = '''
<script src="../../../menu-tree.js"></script>
<script src="../../../_shared/portal-menu.js"></script>
<script src="../../../_shared/portal-chrome.js"></script>
</div><!-- /portal-page-body -->
</body>
</html>
'''

    # B3/A4: giữ nguyên markup gốc; DL03 bọc trong main nếu cần
    if '<div class="app">' in html or '<main class="page">' in html:
        html = portal_head + html.strip() + portal_tail
    else:
        html = portal_head + '<main class="page">' + html.strip() + '</main>' + portal_tail

    return html


def sync_web():
    for name, dest in WEB_MAP.items():
        src = REF / name
        if not src.exists():
            raise FileNotFoundError(src)
        raw = src.read_text(encoding="utf-8")
        wrapped = wrap_portal_web(raw, name)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(wrapped, encoding="utf-8")
        print(f"Synced web: {dest.relative_to(ROOT)}")


def sync_mobile_gh01():
    src = REF / "MS-A-GH01-giao-hang-don-hang.html"
    dest = WS_MOBILE / "MS-A-GH01-giao-hang-don-hang.html"
    shutil.copy2(src, dest)
    print(f"Synced mobile: {dest.relative_to(ROOT)}")


def write_dl03_redirect():
    dest = WS_MOBILE / "MS-A-DL03-ocr-don-giao-hang.html"
    dest.write_text(
        """<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8"/>
<meta http-equiv="refresh" content="0;url=MS-A-GH01-giao-hang-don-hang.html#ocr"/>
<title>Redirect — DL03 → GH01</title>
<script>location.replace('MS-A-GH01-giao-hang-don-hang.html#ocr');</script>
</head>
<body>
<p>OCR đã gộp trong <a href="MS-A-GH01-giao-hang-don-hang.html#ocr">MS-A-GH01 Giao hàng</a>.</p>
</body>
</html>
""",
        encoding="utf-8",
    )
    print(f"Redirect mobile DL03 → GH01")


def remove_extra_web():
    extras = [
        WS_WEB / "quan-ly-don-giao-hang" / "MS-W-DL01-phan-bo-thu-cong-gan-tai-xe.html",
        WS_WEB / "cai-dat-vung-giao-hang-cho-tai-xe" / "MS-W-DL02-cai-dat-vung-giao-hang-tai-xe.html",
        WS_WEB / "phan-bo-thu-cong-gan-tai-xe" / "WEB-CP-B4-phan-bo-thu-cong-gan-tai-xe.html",
        WS_WEB / "_shared" / "ms-w-dl01-portal.css",
    ]
    for p in extras:
        if p.exists():
            p.unlink()
            print(f"Removed: {p.relative_to(ROOT)}")
    for folder in [
        WS_WEB / "quan-ly-don-giao-hang",
        WS_WEB / "cai-dat-vung-giao-hang-cho-tai-xe",
        WS_WEB / "phan-bo-thu-cong-gan-tai-xe",
    ]:
        if folder.exists() and not any(folder.iterdir()):
            folder.rmdir()
            print(f"Removed empty dir: {folder.relative_to(ROOT)}")


if __name__ == "__main__":
    sync_web()
    sync_mobile_gh01()
    write_dl03_redirect()
    remove_extra_web()
    print("Done.")
