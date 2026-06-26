# Pattern: Màn hình Chi tiết — Mobile

> Template — BA điền theo design system thực tế của Salesman App.

---

## Layout chuẩn

1. **Header**
   - Back arrow (trái) + Title (tên đối tượng)
   - Action icons (phải): Edit, More menu (3 chấm)

2. **Body** (scroll được)
   - **Section 1 — Thông tin cơ bản**: tên, mã, trạng thái (badge màu)
   - **Section 2 — Thông tin chi tiết**: các field info dạng key-value
   - **Section 3 — Tab/Sub-content** (nếu có): tab để xem các loại data liên quan
   - **Section 4 — Lịch sử / Activity** (nếu có)

3. **Footer fixed** (optional)
   - Primary action button (vd "Duyệt", "Hoàn tất")

---

## Components dùng

- Header: `design-system/mobile/components/headers.md`
- Status badge: `design-system/mobile/components/badges.md`
- Tabs: `design-system/mobile/components/tabs.md`
- Action button: `design-system/mobile/components/buttons.md`

---

## Quy tắc bắt buộc

- Mỗi field hiển thị dạng:
  ```
  Label nhỏ (caption, gray)
  Value lớn (body, dark)
  ```
- Trạng thái dùng badge màu (green/red/yellow/gray theo semantic)
- Section có heading + divider rõ ràng
- Tap vào field có thể click (vd phone, email, address) → action tương ứng (gọi, mail, map)

---

## Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Field không có giá trị | Hiển thị "—" hoặc "(chưa cập nhật)" thay vì để trống |
| Đang load | Skeleton placeholder cho từng section |
| Error load | Empty state với button "Thử lại" |
| Không có quyền edit | Ẩn icon Edit ở header |

---

## Ví dụ thực tế

[Reference màn hình thực tế trên Confluence: ___]
