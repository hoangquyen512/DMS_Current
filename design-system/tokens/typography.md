# Typography — Web Portal Design System

> Nguồn chuẩn: **dms-portal-dev.finviet.com.vn** (Ant Design 5 + Ant Design Pro / ecodms).  
> Đồng bộ đo live: **16/07/2026** (`/category/news/`).  
> **Không dùng Inter** — mockup web dùng system UI giống Portal thật.

---

## Font Family

```
Primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif
Mono:    "SF Mono", "Fira Code", Consolas, monospace  (mã / ID)
```

Portal load **Roboto** trong stack; không load Inter.

CSS: `--portal-font` trong `mockups/web/_shared/portal-tokens.css` · ép qua `portal-fonts.css`.

---

## Text Styles (Ant Design 5)

### Tiêu đề

| Vị trí | Size | Weight | Line height | Color |
|--------|------|--------|-------------|-------|
| Page title (`.portal-page-title`) | **20px** | **600** | **32px** | `rgba(0,0,0,0.88)` |
| Toolbar list title | **16px** | **500** | **16px** | `rgba(0,0,0,0.88)` |
| Card / filter section head | 14px | 600 | 22px | `rgba(0,0,0,0.88)` |

### Body & control

| Vị trí | Size | Weight | Line height | Color |
|--------|------|--------|-------------|-------|
| Body / table cell / input / select | **14px** | **400** | **22px** (1.5715) | `rgba(0,0,0,0.88)` |
| Field label | **14px** | **400** | **22px** | `rgba(0,0,0,0.88)` |
| Button (primary / default) | **14px** | **400** | **22px** | — |
| Breadcrumb | **14px** | **400** | **22px** | `rgba(0,0,0,0.45)` |
| Table header (`th`) | **14px** | **600** | **22px** | `rgba(0,0,0,0.88)` |
| Link trong bảng | **14px** | **400** | **22px** | `#1677ff` (info) |
| Tag | **12px** | **400** | **20px** | theo variant |
| Caption / helper | **12px** | **400** | 18–20px | `rgba(0,0,0,0.45)` |

### Header portal

| Vị trí | Size | Weight | Ghi chú |
|--------|------|--------|---------|
| Menu L1 | 14px | 400 | chữ trắng trên `#2B579A` |
| Brand / logo text | ~15–16px | 500–600 | header |

---

## Token CSS

| Token | Giá trị |
|-------|---------|
| `--portal-font-size` | `14px` |
| `--portal-line-height` | `1.5715` |
| `--portal-line-height-px` | `22px` |
| `--portal-page-title-size` | `20px` |
| `--portal-page-title-weight` | `600` |
| `--portal-toolbar-title-size` | `16px` |
| `--portal-text` | `rgba(0,0,0,0.88)` |
| `--portal-text-secondary` | `rgba(0,0,0,0.65)` |
| `--portal-text-tertiary` | `rgba(0,0,0,0.45)` |
| `--portal-info-text` | `#1677ff` |

---

## Quy tắc khi gen mockup

1. **Cấm** `font-family: Inter` hoặc Google Fonts Inter trong mockup web.
2. Page title = **20px / 600 / line-height 32px** — không dùng 22px/700.
3. Button / body = **14px / 400** — không dùng 13px hoặc weight 500 cho button thường.
4. Link trong bảng = `#1677ff`, không phải brand `#2B579A` (brand dùng cho primary button / tab active).
5. Luôn load `portal-chrome.css` (kéo theo `portal-fonts.css` + tokens).

---

## Change History

| Ngày | Mô tả |
|------|-------|
| 16/07/2026 | Đồng bộ Ant Design 5 từ portal live — bỏ Visily/Inter defaults |
| 24/06/2026 | Bản đầu (Visily Inter — đã thay) |
