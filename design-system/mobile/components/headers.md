# Header — [APP] Salesman Mobile

> Class: `.app-header`, `.app-header--primary`, `.app-header--light`

---

## Variants

| Variant | Class | Visual |
|---------|-------|--------|
| **Primary** | `.app-header--primary` | Nền `--app-primary`, chữ trắng, status bar cùng màu |
| **Light** | `.app-header--light` | Nền trắng, chữ `--neutral-900`, border bottom |

---

## Anatomy

```
[ ← back ]  Title chính          [ action icon ]
            Subtitle (optional)
```

| Phần | Class | Spec |
|------|-------|------|
| Container | `.app-header` | min-height 56px, padding 12px 16px, flex |
| Back | `.app-header__back` | 28px, transparent, chữ/icon trắng hoặc neutral |
| Title block | `.app-header__title` | flex 1 |
| Title | `h1` trong title block | 17px / 600 |
| Subtitle | `.app-header__sub` | 12px, opacity 0.85 |
| Action | `.app-header__action` | Icon button phải |

---

## Quy tắc

- Title ≤ 2 dòng, ellipsis nếu dài
- Primary header: dùng cho flow có brand bar (kiểm tra tài sản, tồn kho, báo cáo)
- Light header: form, danh sách phụ

---

## HTML mẫu

```html
<header class="app-header app-header--primary">
  <button type="button" class="app-header__back" aria-label="Quay lại">←</button>
  <div class="app-header__title">
    <h1>Kiểm tra tài sản</h1>
    <p class="app-header__sub">FV_Ops_Kiều My_Test111</p>
  </div>
</header>
```

---

## Store hero (chi tiết cửa hàng)

> Class: `.app-hero`, `.app-hero__logo`, `.app-hero__name`, `.app-action-tile`

Dùng cho VT01, CH03 — gradient `--app-hero-gradient` (từ APK `#d4edf9` → `#E4EFF8`).

```html
<div class="app-hero">
  <div class="app-hero__logo">🏪</div>
  <p class="app-hero__name">Cửa hàng Minh Anh</p>
  <p class="app-hero__phone">📞 0908 706 789</p>
  <p class="app-hero__addr">34 Hoàng Việt, Q. Tân Bình</p>
</div>
```

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.1 | 24/06/2026 | Thêm `.app-hero`, `.app-action-tile` từ APK |
