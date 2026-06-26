# Input / Field — [APP] Salesman Mobile

> Class CSS: `.app-field`, `.app-input`, `.app-search`, `.app-textarea`

---

## Field wrapper

| Phần | Class | Mô tả |
|------|-------|-------|
| Wrapper | `.app-field` | Label + control + helper/error |
| Label bắt buộc | `.app-field__label` | Dấu `*` **phía trước** tên |
| Label tùy chọn | `.app-field__label` (không có `*`) | — |
| Helper | `.app-field__hint` | 12px, `--neutral-500` |
| Error | `.app-field__error` | 12px, `--error-500` |

---

## Control types

| Loại | Class | Spec |
|------|-------|------|
| Text | `.app-input` | Border `--neutral-200`, radius `--radius-lg`, padding 12px |
| Search pill | `.app-search` | Nền trắng, radius full, icon trái |
| Textarea (Ghi chú) | `.app-textarea` | Max 500 ký tự, counter `0/500`, resize vertical |
| Dropdown | `.app-select` | Chevron phải, readonly until tap |
| Readonly | `.app-input--readonly` | Nền `--neutral-50`, không focus ring |

---

## States

| State | Visual |
|-------|--------|
| Default | Viền `--neutral-200` |
| Focus | Viền `--app-primary`, shadow nhẹ |
| Error | Viền `--error-500` + `.app-field__error` |
| Disabled | Nền `--neutral-100`, chữ `--neutral-500` |

---

## Quy tắc form

1. `* Công ty` luôn field đầu tiên
2. Gap giữa field: 16px
3. Ghi chú: `<textarea>`, không dùng `<input type="text">`
4. Placeholder: `--neutral-500`

---

## HTML mẫu

```html
<div class="app-field">
  <label class="app-field__label"><span class="req">*</span> Công ty</label>
  <input type="text" class="app-input" placeholder="Chọn công ty"/>
</div>
<div class="app-field">
  <label class="app-field__label">Ghi chú</label>
  <textarea class="app-textarea" maxlength="500" placeholder="Nhập ghi chú"></textarea>
  <span class="app-field__counter">0/500</span>
</div>
```

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Chuẩn field BA workspace |
