# Pattern: Màn hình Chi tiết — Web Portal

> Template — BA điền theo design system thực tế (từ Visily).

---

## Layout chuẩn

1. **Breadcrumb** — đường dẫn từ Home

2. **Title bar**
   - Title (H1) bên trái + Status badge bên cạnh
   - Action buttons bên phải: Edit, Delete, More

3. **Body** — chia thành các phương án:

### Phương án A — Cards layout
- Multi-cards mỗi card 1 nhóm thông tin
- Layout 2-3 cột

### Phương án B — Tabs layout
- Tabs phía trên (Thông tin chung, Lịch sử, Documents...)
- Mỗi tab là 1 view riêng

### Phương án C — Sidebar + Main
- Sidebar trái: navigation (sections)
- Main area: nội dung section đang chọn

4. **Activity/History panel** (nếu có)
   - Bên phải hoặc bottom
   - Timeline activity, comments

---

## Components dùng

- Breadcrumb: xem `components/web/breadcrumbs.md`
- Status badge: xem `components/web/badges.md`
- Card: xem `components/web/cards.md`
- Tabs: xem `components/web/tabs.md`
- Action button: xem `components/web/buttons.md`

---

## Quy tắc bắt buộc

- Field hiển thị dạng key-value:
  - Label (caption gray) bên trái
  - Value (body dark) bên phải HOẶC dưới
- Status dùng badge màu (green/red/yellow/gray)
- Field clickable (vd email, phone, link) → action tương ứng
- Action "Edit" mở:
  - Modal nếu form ngắn
  - Page edit riêng nếu form phức tạp
- Field không có giá trị: "—" (KHÔNG để trống)

---

## Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Đang load | Skeleton placeholder cho từng section |
| Error load | Error state với button "Thử lại" |
| Object đã bị xóa | Show warning "Đối tượng đã bị xóa" + redirect về list |
| Không có quyền edit | Ẩn button Edit (hoặc disable + tooltip giải thích) |
| Đang có thao tác (vd duyệt) | Loading overlay + disable action buttons |

---

## Ví dụ thực tế

[Reference màn hình thực tế trên Confluence: ___]
