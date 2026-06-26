# Pattern: Màn hình Danh sách — Mobile

> Template — BA điền theo design system thực tế của Salesman App.

---

## Layout chuẩn (top → bottom)

1. **Header**
   - Back arrow (trái) + Title màn hình
   - Action icon (phải, nếu có): Tạo mới, Filter, Search

2. **Search bar** (nếu có)
   - Full-width, placeholder "Tìm kiếm..."
   - Debounce 500ms

3. **Filter chips** (nếu có)
   - Horizontal scroll
   - Active chip: nền primary
   - Tap để toggle

4. **List body**
   - Pull-to-refresh
   - Infinite scroll (load thêm khi gần đáy)
   - Mỗi item là card với info cơ bản + tap để vào detail

5. **Floating Action Button** (FAB, optional)
   - Góc dưới phải, nếu có action "Tạo mới"

---

## Components dùng

- Header: `design-system/mobile/components/headers.md`
- Search: `design-system/mobile/components/inputs.md`
- List item card: `design-system/mobile/components/cards.md`
- FAB: `design-system/mobile/components/buttons.md`

---

## Quy tắc bắt buộc

- Mặc định sort theo "Mới nhất"
- Load 20 records/lần, infinite scroll
- Empty state: icon + message + button "Tạo mới" (nếu có quyền)
- Loading state: skeleton items, KHÔNG dùng spinner che màn hình
- Error state: message + button "Thử lại"
- Pull-to-refresh hiển thị loading indicator chuẩn iOS/Android

---

## Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Mất mạng | Hiển thị toast "Không có kết nối" + cho phép xem cache cũ |
| Server error | Empty state với icon error + button "Thử lại" |
| Không có data | Empty state với icon trống + message gợi ý + button action (nếu có) |
| Đang load | Skeleton items 5-7 dòng |
| Load thêm | Spinner ở đáy list khi infinite scroll |

---

## Ví dụ thực tế

[Reference màn hình thực tế trên Confluence: ___]
