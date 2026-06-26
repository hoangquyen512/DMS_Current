# Button — [APP] Salesman Mobile

> Class CSS: `app-components.css` — prefix `.app-btn`

---

## Variants

| Variant | Class | Visual | Khi dùng |
|---------|-------|--------|----------|
| **Primary** | `.app-btn--primary` | Nền `--app-primary`, chữ trắng | CTA chính (Lưu, Viếng thăm, Xác nhận) |
| **Outline** | `.app-btn--outline` | Nền trắng, viền `--app-primary`, chữ primary | Action phụ cùng cấp |
| **Light** | `.app-btn--light` | Nền `--app-primary-light`, chữ `--app-primary-darker` | Action phụ trên nền brand |
| **Ghost** | `.app-btn--ghost` | Không nền, chữ `--neutral-700` | Hủy, bỏ qua |
| **Danger** | `.app-btn--danger` | Nền `--error-500`, chữ trắng | Xóa, từ chối |
| **Disabled** | `.app-btn:disabled` | Opacity 0.45, không pointer | Sau validate fail |

---

## Sizes

| Size | Class | Height / padding | Font |
|------|-------|------------------|------|
| **Default** | `.app-btn` | `12px 16px`, min-height 48px | 16px / 600 |
| **Small** | `.app-btn--sm` | `8px 12px`, min-height 36px | 14px / 600 |
| **Block** | `.app-btn--block` | width 100% | — |
| **Icon** | `.app-icon-btn` | 36×36px | — |

---

## States

| State | Primary | Outline |
|-------|---------|---------|
| Default | `--app-primary` | viền primary |
| Pressed | `--app-primary-dark` | nền `--app-primary-light` |
| Disabled | opacity 0.45 | opacity 0.45 |
| Loading | spinner + `pointer-events: none` | — |

---

## Quy tắc

- **1 primary** / footer / bottom sheet
- Footer cố định: `.app-footer-actions` — `[Ghost/Hủy]` trái, `[Primary]` phải hoặc full-width stack
- Gap giữa 2 nút: 8px
- Border radius: `--radius-lg` (8px)

---

## HTML mẫu

```html
<button type="button" class="app-btn app-btn--primary app-btn--block">Viếng thăm</button>
<button type="button" class="app-btn app-btn--outline">Kiểm tra tồn kho</button>
```

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Map `button_surface_brand` từ APK |
