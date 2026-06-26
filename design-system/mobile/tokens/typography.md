# Typography — [APP] Salesman Mobile

> Font hệ thống Android: **Roboto**. Mockup dùng stack system font.

---

## Font family

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

---

## Text styles

| Style | Token | Size | Weight | Line height | Khi dùng |
|-------|-------|------|--------|-------------|----------|
| `Title/Screen` | `--text-lg` | 18px | 600 | 24px | Tiêu đề màn (header) |
| `Title/Section` | 15px | 15px | 700 | 20px | Section header (`.app-section-hd`) |
| `Body/Default` | `--text-base` | 14px | 400 | 20px | Nội dung card, list |
| `Body/Strong` | `--text-base` | 14px | 600–700 | 20px | Tên cửa hàng, KPI title |
| `Caption` | `--text-sm` | 12px | 400 | 16px | Địa chỉ, meta, helper |
| `Button` | `--text-md` | 16px | 600 | 22px | Label nút full-width |
| `Tab/Label` | `--text-xs` | 11px | 500–600 | 14px | Bottom nav label |
| `Status bar` | — | 15px | 600 | — | Giờ trên status bar |

---

## Hierarchy

- Mỗi màn: **1** title chính trong header
- Section title: `15px / 700` — không dùng H1 HTML trong app mockup
- Không nhảy quá 2 cấp weight trong cùng block (vd: 400 + 700 OK; 400 + 500 + 700 tránh)

---

## Màu chữ

| Vai trò | Token |
|---------|-------|
| Title | `--neutral-900` |
| Body | `--neutral-700` |
| Secondary / caption | `--neutral-500` |
| On primary header | `#FFFFFF` (opacity 0.85 cho subtitle) |
| Link | `--app-primary` |
| Error inline | `--error-500` |

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Scale từ APK textFontSize1..5 |
