# DMS Salesman — HTML Mockup Repository

> Repo chứa toàn bộ HTML mockup, design system và script hỗ trợ cho DMS Portal + Salesman App.
> Team clone/pull repo này để xem mockup, import Visily, hoặc đóng góp mockup mới.

**Remote:** https://github.com/vudq170/DMS_Salesman_mockup.git

**Deploy production (Render):** xem [DEPLOY-RENDER.md](./DEPLOY-RENDER.md)

---

## Cấu trúc

```
DMS_Salesman_mockup/
├── README.md                 ← File này
├── mockups/
│   ├── README.md             ← Hướng dẫn Visily workflow
│   ├── templates/            ← web-template.html, mobile-template.html, web-date-range-picker-snippet.html
│   ├── mobile/               ← Mockup Salesman App
│   └── web/                  ← Mockup DMS Portal (main.html = entry)
├── design-system/
│   ├── tokens/               ← colors, typography, spacing
│   ├── components/           ← web + mobile components
│   └── patterns/             ← list / form / detail screen patterns
└── scripts/
    ├── patch-portal-chrome.ps1      ← Gắn portal header vào HTML
    └── reorganize-mockup-web.ps1    ← Sắp xếp mockup web theo menu
```

---

## Quick Start

### Clone repo (lần đầu)

```bash
git clone https://github.com/vudq170/DMS_Salesman_mockup.git
cd DMS_Salesman_mockup
```

### Xem mockup

1. Mở `mockups/web/main.html` trong Chrome — portal dashboard + menu toàn bộ mockup web
2. Mở `mockups/mobile/main.html` trong Chrome — Salesman App 4 tab + catalog mockup mobile
3. Hoặc mở trực tiếp file `.html` trong `mockups/mobile/` / `mockups/web/`

### Import vào Visily

Xem chi tiết trong `mockups/README.md`.

**[APP] Mobile full-flow:** một khung phone, điều hướng trong app — **không** tab switcher dev. Xem `mockups/mobile/_shared/MOCKUP-MOBILE-FULL-FLOW.md`.

---

## Script hỗ trợ

| Script | Mục đích |
|--------|----------|
| `scripts/patch-portal-chrome.ps1` | Gắn portal header ecodms + nút Back vào file HTML web |
| `scripts/reorganize-mockup-web.ps1` | Tổ chức lại file mockup web theo cây menu DMS |
| `scripts/reorganize-mockup-mobile.ps1` | Tổ chức lại file mockup mobile theo 4 tab app |

```powershell
# Gắn portal chrome cho toàn bộ mockup web
powershell -File scripts/patch-portal-chrome.ps1

# Sắp xếp mockup theo menu
powershell -File scripts/reorganize-mockup-web.ps1
```

---

## Convention đặt tên file

```
mockups/[platform]/[MS-code]-[ten-man-hinh].html
```

| Platform | Prefix | Ví dụ |
|----------|--------|-------|
| Mobile (Salesman App) | `MS-A-` / `MS-` | `MS-A-GH01-giao-hang-don-hang.html` |
| Web (Portal) | `MS-W-` / `WEB-` | `MS-W-CK01-danh-sach-chuyen-kho.html` |

---

## Liên kết với BA Workspace

Repo này nằm trong workspace `DMS_Current_Claude/DMS_Salesman_mockup/`.
Khi BA dùng Claude viết spec + gen mockup, output được lưu vào folder này.
Push lên GitHub để team dev/design pull về sử dụng.

---

## Change History

| Ngày | Phiên bản | Mô tả |
|------|-----------|-------|
| 24/06/2026 | 1.0 | Tách mockup + design-system + scripts ra repo riêng từ DMS_Current_Claude |
