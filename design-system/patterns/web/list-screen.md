# Pattern: Màn hình Danh sách — Web Portal

> Template — BA điền theo design system thực tế (từ Visily).

---

## Layout chuẩn (top → bottom)

1. **Breadcrumb** — đường dẫn từ Home

2. **Title bar**
   - Title (H1) bên trái
   - Action buttons bên phải: Tạo mới (Primary), Import, Export, Refresh

3. **Filter bar**
   - Search box (full-width hoặc 30% trái)
   - Filter dropdowns (date range, status, category...)
   - Button "Reset filter" (Text button)

4. **Table**
   - Header có sort theo cột
   - Body: data rows
   - Cột Action cuối: Edit, Delete (icon)
   - Hover row: highlight nhẹ

5. **Pagination**
   - Bên trái: "Showing X to Y of Z records"
   - Bên phải: prev/next + chọn page + chọn page size (10/20/50)

---

## Components dùng

- Breadcrumb: xem `components/web/breadcrumbs.md`
- Title bar buttons: xem `components/web/buttons.md`
- Filter dropdown: xem `components/web/filters.md`
- Table: xem `components/web/tables.md`
- Pagination: xem `components/web/pagination.md`

---

## Quy tắc bắt buộc

- Mặc định sort theo "Ngày tạo" giảm dần
- Default page size: 20
- Search debounce 500ms
- Filter có nút "Reset filter" reset về mặc định
- Table có sort theo cột (header có icon ▲▼ khi active)
- Cột Action: chỉ hiển thị icon (không text), tooltip khi hover
- Quyền: ẩn button/icon nếu user không có quyền (KHÔNG disable)

---

## Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Danh sách rỗng | Empty state với icon + message + button "Tạo mới" (nếu có quyền) |
| Đang load | Skeleton table rows (5-7 dòng), KHÔNG dùng spinner che màn hình |
| Lỗi load | Empty state với icon error + button "Thử lại" |
| Filter rỗng | Empty state "Không có kết quả phù hợp" + button "Xóa filter" |
| Action delete | Confirm dialog trước khi xóa |
| Bulk action | Checkbox cột đầu + action bar khi có row được chọn |

---

## Ví dụ thực tế

[Reference màn hình thực tế trên Confluence: ___]
