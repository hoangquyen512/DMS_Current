# Typography — Web Portal Design System

> Typography system cho DMS Web Portal, dựa trên Visily default (Inter font family).
> BA điều chỉnh nếu team dùng font khác.

---

## 🔤 Font Family

```
Primary: Inter, -apple-system, "Segoe UI", Roboto, sans-serif
Mono:    "Fira Code", Consolas, monospace  (cho code/ID hiển thị)
```

> **Lưu ý**: Font fallback đảm bảo render OK kể cả khi Inter không load được.

---

## 📏 Text Styles

### Headings — Tiêu đề
| Style | Size | Weight | Line height | Khi dùng |
|-------|------|--------|-------------|----------|
| `Heading/H1` | 28px | 700 (Bold) | 36px | Title màn hình (1 màn 1 H1) |
| `Heading/H2` | 22px | 600 (SemiBold) | 30px | Section title trong page |
| `Heading/H3` | 18px | 600 (SemiBold) | 26px | Sub-section, modal title |
| `Heading/H4` | 16px | 600 (SemiBold) | 24px | Card title, group label |

### Body — Nội dung chính
| Style | Size | Weight | Line height | Khi dùng |
|-------|------|--------|-------------|----------|
| `Body/Large` | 16px | 400 (Regular) | 24px | Mô tả dài, intro paragraph |
| `Body/Default` | 14px | 400 (Regular) | 20px | Text mặc định, table cell, input |
| `Body/Small` | 12px | 400 (Regular) | 18px | Caption, footnote, helper text |

### Special — Đặc thù
| Style | Size | Weight | Line height | Khi dùng |
|-------|------|--------|-------------|----------|
| `Label/Default` | 14px | 500 (Medium) | 20px | Label của input field |
| `Label/Small` | 12px | 500 (Medium) | 16px | Mini label, status badge text |
| `Button/Default` | 14px | 500 (Medium) | 20px | Text trong button medium |
| `Button/Small` | 12px | 500 (Medium) | 16px | Text trong button small |
| `Link/Default` | 14px | 500 (Medium) | 20px | Hyperlink, breadcrumb |

---

## 📌 Quy tắc dùng

### Hierarchy — Phân cấp nội dung
- Mỗi page chỉ có **1 H1** (Title chính)
- H2 dùng cho mỗi section lớn
- H3 dùng cho sub-section
- KHÔNG nhảy cấp (H1 → H3 không qua H2)

### Color
- Heading mặc định: `Neutral/900`
- Body mặc định: `Neutral/700`
- Label: `Neutral/500` (cho field) hoặc `Neutral/700` (cho section label)
- Caption / helper text: `Neutral/500`
- Link: `Primary/500`

### Weight
- KHÔNG dùng quá 3 weight trong 1 màn hình
- Bold chỉ dùng cho heading hoặc emphasis cực mạnh
- Medium dùng cho label, button, link
- Regular dùng cho body

### Length
- Title màn hình: ≤ 60 ký tự
- Title section: ≤ 80 ký tự
- Button label: ≤ 24 ký tự
- Helper text: ≤ 120 ký tự

---

## ⚙️ Cách Claude áp dụng khi gen UI

| Vị trí trong spec | Style |
|-------------------|-------|
| Tên màn hình (page title) | `Heading/H1` |
| Tên section (vd "Thông tin chung") | `Heading/H2` |
| Tên modal | `Heading/H3` |
| Label field | `Label/Default` |
| Value field hiển thị | `Body/Default` |
| Helper text dưới input | `Body/Small`, color `Neutral/500` |
| Error message dưới input | `Body/Small`, color `Error/700` |
| Button text | `Button/Default` |
| Status badge | `Label/Small` |
