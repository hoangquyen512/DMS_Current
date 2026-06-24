# Pattern: Màn hình Form (Tạo/Sửa) — Web Portal

> Template — BA điền theo design system thực tế (từ Visily).

---

## Layout chuẩn

### Phương án A — Modal (cho form ngắn)
- Modal căn giữa màn hình
- Header: Title + button "X" (đóng) bên phải
- Body: Form fields (scroll nếu dài)
- Footer: Button "Hủy" (Secondary) + "Lưu" (Primary)

### Phương án B — Full page (cho form dài, phức tạp)
- Breadcrumb đầu trang
- Title bar: Title + button "Hủy" + "Lưu" (sticky top)
- Form body: chia thành các section/tab
- Layout 2 cột nếu form rộng (label trái, input phải)

---

## Components dùng

- Modal: xem `components/web/modals.md`
- Input: xem `components/web/inputs.md`
- Button: xem `components/web/buttons.md`
- Field group/Section: xem `components/web/cards.md`

---

## Quy tắc form web

- **Layout**:
  - Form ngắn (<10 field): label trên, input dưới — 1 cột
  - Form dài: layout 2 cột (50% mỗi cột)
  - Field bắt buộc: dấu `*` đỏ sau label
  
- **Validation**:
  - Validate inline khi blur khỏi field
  - Submit: validate toàn bộ + scroll đến field lỗi đầu tiên
  - Error: viền đỏ + text đỏ dưới input
  
- **Field types**:
  - Text input: 36-40px height
  - Dropdown: cùng height với text input
  - Date picker: clickable input mở calendar
  - File upload: dropzone hoặc button "Chọn file"
  - Textarea: min 80px height, có resize handle

---

## Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Đang submit | Button "Lưu" → loading state + disable form |
| Validate fail | Highlight field lỗi + scroll tới + focus field đầu |
| Submit thành công | Toast green + đóng modal / redirect về list |
| Submit fail (server) | Toast red + giữ data + show error detail |
| Discard form (có data) | Confirm dialog "Bạn có chắc muốn thoát?" |
| Field auto-fill (vd lấy từ API) | Hiển thị loading inline + disable field tạm thời |

---

## Ví dụ thực tế

[Reference màn hình thực tế trên Confluence: ___]
