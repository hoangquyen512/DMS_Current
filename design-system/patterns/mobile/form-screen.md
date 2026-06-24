# Pattern: Màn hình Form (Tạo/Sửa) — Mobile

> Template — BA điền theo design system thực tế của Salesman App.

---

## Layout chuẩn

1. **Header**
   - Back arrow (trái) + Title ("Tạo mới [X]" / "Sửa [X]")
   - Optional: Save button (phải)

2. **Form body** (scroll được)
   - 1 field/dòng, full-width
   - Label trên input (KHÔNG bên trái)
   - Field bắt buộc: dấu `*` đỏ sau label
   - Validate inline khi blur khỏi field
   - Group field cùng chủ đề thành section có heading

3. **Footer fixed** (sticky bottom)
   - Primary button "Lưu" full-width
   - Optional: Secondary button "Hủy"

---

## Components dùng

- Header: xem `components/mobile/navigation.md`
- Input field: xem `components/mobile/inputs.md`
- Button: xem `components/mobile/buttons.md`

---

## Quy tắc form mobile

- 1 field 1 dòng (KHÔNG layout 2 cột như web)
- Touch target tối thiểu 44x44px
- Keyboard appropriate type cho từng field (email, number, phone...)
- Auto-scroll input vào view khi focus (tránh bị che bởi keyboard)
- Validate inline khi blur:
  - ✅ Hợp lệ: viền xanh + icon check (optional)
  - ❌ Lỗi: viền đỏ + text đỏ dưới input
- Field disabled: nền xám nhạt, không bắt sự kiện

---

## Gesture

- **Swipe down từ top**: đóng modal/quay lại (có confirm nếu form đang dirty)
- **Tap ngoài keyboard**: ẩn keyboard
- **Pull-to-refresh**: KHÔNG áp dụng cho form (chỉ cho list)

---

## Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Form đang submit | Button "Lưu" → loading state + disable toàn bộ form |
| Lỗi validate | Highlight field lỗi + scroll đến field đầu tiên có lỗi |
| Lỗi submit (mạng) | Toast red + giữ nguyên data đã nhập |
| Discard form (có data) | Confirm dialog "Bạn có chắc muốn thoát? Dữ liệu chưa lưu sẽ mất" |
| Submit thành công | Toast green + auto back về list (hoặc về detail screen) |

---

## Ví dụ thực tế

[Reference màn hình thực tế trên Confluence: ___]
