# Component Inventory — [APP] Salesman Mobile

> Spec chi tiết từng component. CSS class: `mockups/mobile/_shared/app-components.css`

---

## Danh sách component

| Component | File spec | Class chính | Ghi chú |
|-----------|-----------|-------------|---------|
| Button | `buttons.md` | `.app-btn`, `.app-btn--primary` | Full-width mobile-first |
| Input / Field | `inputs.md` | `.app-field`, `.app-input` | Label `*` trước tên field |
| Header | `headers.md` | `.app-header` | Brand hoặc trắng |
| Bottom navigation | `navigation.md` | `.bottom-nav`, `.nav-item` | Trong `app-chrome.css` |
| Tabs | `tabs.md` | `.app-tabs`, `.app-tab` | Underline + segment pill |
| Card | `cards.md` | `.app-card` | List item, KPI |
| Badge / Chip | `badges.md` | `.app-badge`, `.app-chip` | Status, filter |
| List | `lists.md` | `.app-list`, `.app-list-item` | Scroll + section |

---

## Import CSS (mockup HTML)

```html
<link rel="stylesheet" href="_shared/mockup-shell.css"/>
<!-- shell đã import: mockup-tokens.css + app-components.css -->
```

Hub `main.html`:

```html
<link rel="stylesheet" href="_shared/app-chrome.css"/>
<!-- chrome đã import shell + components -->
```

---

## Gallery

Mở `mockups/mobile/components-gallery.html` để xem tất cả component + state.

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Inventory từ APK + mockup hiện có |
