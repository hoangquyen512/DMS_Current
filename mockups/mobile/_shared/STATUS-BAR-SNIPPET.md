# Status Bar — Icon DMS Portal (🌐)

## Quy tắc bắt buộc [APP]

Mọi màn hình mockup **Salesman App** (mọi `.phone-screen`) **phải có icon web** trên **status bar** (góc phải, trước icon sóng/pin) để mở **DMS Portal** (`mockups/web/main.html`).

| Thuộc tính | Giá trị |
|-----------|---------|
| Vị trí | Status bar — bên phải, **trước** 📶 / pin |
| Class link | `status-portal-link` |
| Icon Salesman | `🌐` (emoji) |
| Icon Tài xế (Tabler) | `<i class="ti ti-world"></i>` |
| `title` | `DMS Portal` |
| `aria-label` | `Mở DMS Portal` |
| Đích | `{DEPTH}web/main.html` (tương đối từ file HTML) |

## Snippet HTML chuẩn (Salesman)

```html
<div class="status-bar">
  <span>15:15</span>
  <span class="status-icons">
    <a class="status-portal-link" href="../../../web/main.html" title="DMS Portal" aria-label="Mở DMS Portal">🌐</a>
    <span>📶 🔋 80%</span>
  </span>
</div>
```

**Tính `href`:** từ thư mục file → lên `mockups/` → vào `web/main.html`.

| File nằm ở | `href` |
|------------|--------|
| `mobile/main.html` | `../web/main.html` |
| `mobile/*/*.html` (depth 1) | `../../web/main.html` |
| `mobile/*/*/*.html` (depth 2) | `../../../web/main.html` |

## Status bar nền primary (xanh)

Thêm class `status-bar--primary` hoặc `on-primary` để icon 🌐 hiển thị màu trắng:

```html
<div class="status-bar status-bar--primary">...</div>
```

## Snippet Tài xế (Tabler Icons)

```html
<div class="status-bar">
  <span>9:41</span>
  <div class="status-right">
    <a class="status-portal-link" href="/main.html" title="DMS Portal" aria-label="Mở DMS Portal">
      <i class="ti ti-world"></i>
    </a>
    <i class="ti ti-wifi"></i>
    <i class="ti ti-signal-4g"></i>
    <i class="ti ti-battery-3"></i>
  </div>
</div>
```

## CSS dùng chung

- `mockup-shell.css` — sub-page / full-flow
- `app-chrome.css` — `main.html` hub 4 tab

## Script tự bổ sung (fallback)

`mockup-fit.js` tự inject icon nếu thiếu (khi load `mockup-shell.css`). **Vẫn nên ghi HTML tường minh** để import Visily đúng.

## Template

Copy từ `mockups/templates/mobile-template.html`.

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 08/07/2026 | Chuẩn hóa icon Portal trên mọi màn mobile |
