# Table — Web Portal

> Component bảng dữ liệu cho Web Portal, theo style Visily mặc định.

---

## 📐 Anatomy

```
┌──────────────────────────────────────────────────────┐
│ ☑ │ Header 1 ▲│ Header 2  │ Header 3  │ Action     │  ← Header row
├──────────────────────────────────────────────────────┤
│ ☐ │ Cell A    │ Cell B    │ Cell C    │ ✏ 🗑       │  ← Data row
│ ☐ │ Cell A    │ Cell B    │ Cell C    │ ✏ 🗑       │
│ ☐ │ ...                                             │
├──────────────────────────────────────────────────────┤
│ Showing 1-20 of 156 │     [<] [1] [2] [3] [>]      │  ← Pagination
└──────────────────────────────────────────────────────┘
```

---

## 🎨 Style

### Table chính
- **Background**: `Neutral/0` (white)
- **Border**: 1px solid `Neutral/200`, border-radius `lg` (8px) outer
- **Cell padding**: 12px 16px
- **Font**: `Body/Default` (14px)

### Header row
- **Background**: `Neutral/50`
- **Font**: `Label/Default` (14px Medium)
- **Color**: `Neutral/700`
- **Border-bottom**: 1px solid `Neutral/200`
- **Sortable indicator**: icon ▲▼ phía sau text khi cột support sort
- **Active sort**: icon đậm + color `Primary/500`

### Data row
- **Color text**: `Neutral/900` (default), `Neutral/500` (secondary info)
- **Border-bottom**: 1px solid `Neutral/100`
- **Hover**: background `Neutral/50`
- **Selected** (khi có checkbox): background `Primary/50`
- **Focused** (keyboard navigation): outline `Primary/500`

### Cells đặc biệt
- **ID/Mã**: font `Mono` (monospace) nếu là code
- **Số tiền**: căn phải, format thousand separator
- **Ngày**: format `dd/MM/yyyy` hoặc `dd/MM/yyyy HH:mm`
- **Status**: dùng Badge component
- **Action**: căn giữa, icon-only buttons

---

## 📌 Quy tắc bắt buộc

### Cấu trúc cột
- **Cột đầu tiên** (nếu có bulk action): checkbox để chọn row
- **Cột cuối cùng**: Actions (Edit, Delete, View Detail icon)
- **Mã/ID**: cột thứ 2 (nếu có)
- **Sortable columns**: có icon ▲▼ — sort theo cột nào thì cột đó highlight

### Default sort
- Mặc định sort theo **"Ngày tạo"** giảm dần (record mới nhất ở đầu)
- Nếu không có ngày tạo → sort theo ID giảm dần

### Pagination
- Default page size: **20 records**
- Options: 10, 20, 50, 100
- Hiển thị: "Showing 1-20 of 156" bên trái
- Pagination controls bên phải

### Empty state
- Khi không có data: hiển thị empty state với icon + message + button "Tạo mới" (nếu có quyền)
- KHÔNG dùng dòng "Không có dữ liệu" lẫn vào table rows

### Loading state
- **Initial load**: Skeleton rows (5-7 rows xám)
- **Pagination/Filter change**: spinner overlay nhẹ trên table
- **NEVER** dùng spinner che toàn màn hình

### Responsive
- Min-width: 768px (tablet trở lên)
- Mobile (<768px): cân nhắc dùng card list thay vì table
- Có scroll horizontal nếu nhiều cột (sticky cột đầu nếu cần)

---

## 🔧 Tính năng nâng cao

### Sort
- Click header cột → sort asc/desc/clear (cycle 3 trạng thái)
- Có thể sort multi-column (Shift + click)
- Default: 1 cột sort tại 1 thời điểm

### Filter cột (column filter)
- Icon filter trong header cột → mở dropdown filter
- Filter active: icon highlight + indicator dot

### Bulk action
- Checkbox cột đầu → chọn row → action bar hiện ở top
- Chọn tất cả: checkbox header (chỉ chọn page hiện tại, có nút "Chọn tất cả N records")
- Action bar: "Đã chọn X items" + buttons (Delete, Export, ...)

### Resize column
- Hover viền cột → cursor đổi → drag để resize
- Lưu width vào localStorage để giữ giữa các session

### Fixed columns (sticky)
- Cột "Mã" hoặc "Tên" sticky bên trái khi scroll horizontal
- Cột "Action" sticky bên phải

### Row expansion
- Icon `▶` đầu row → click expand → hiển thị nested table hoặc detail
- Chỉ dùng cho cấu trúc parent-child rõ ràng

### Inline edit
- Double-click cell → trở thành input
- Save khi blur hoặc Enter, Cancel khi Esc
- KHÔNG dùng cho mọi cell, chỉ cho field đơn giản

---

## 🎬 Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Table rỗng (chưa có data) | Empty state: icon + message + "Tạo mới" |
| Filter không kết quả | Empty state: "Không có kết quả phù hợp" + button "Xóa filter" |
| Đang load lần đầu | Skeleton 5-7 rows |
| Đang load page tiếp theo | Spinner overlay nhẹ + giữ data cũ |
| Lỗi load | Empty state + button "Thử lại" |
| Network slow (>3s) | Hiện loading indicator + cho cancel |
| Row được edit/delete vừa rồi | Highlight row với màu nhẹ trong 2s |
| User không có quyền edit | Ẩn icon Edit (không disable) |
| Cell value quá dài | Truncate với "..." + tooltip hiện full khi hover |
| Sort cột mà data có null | Null values xuống cuối khi asc, đầu khi desc |

---

## ⚠️ Anti-pattern

| ❌ Sai | ✅ Đúng |
|--------|---------|
| Hiển thị "—" cho cell rỗng | Có thể dùng "—", "Chưa có", hoặc để trống tùy ngữ cảnh — phải nhất quán |
| Action button có text trong row (Edit/Delete) | Dùng icon-only, tooltip khi hover |
| Pagination kết hợp infinite scroll | Chọn 1 trong 2, KHÔNG mix |
| Header cột tiếng Anh khi UI tiếng Việt | Header phải localize đầy đủ |
| Cột status hiển thị text thuần "active" | Dùng Badge với màu semantic |

---

## 📝 Spec template trong tài liệu BA

Khi viết spec table:

```
**Bảng "Danh sách NPP"**

| # | Cột | Loại | Width | Sort | Filter | Format | Nguồn |
|---|-----|------|-------|------|--------|--------|-------|
| 1 | ☐ | Checkbox | 40px | — | — | — | — |
| 2 | Mã NPP | Text | 120px | ✓ | ✓ | Monospace | npp.code |
| 3 | Tên NPP | Text | auto | ✓ | ✓ | — | npp.name |
| 4 | Khu vực | Text | 150px | ✓ | ✓ Multi | — | npp.region.name |
| 5 | Trạng thái | Badge | 100px | — | ✓ Multi | Color theo status | npp.status |
| 6 | Ngày tạo | Date | 130px | ✓ default↓ | ✓ Range | dd/MM/yyyy | npp.created_at |
| 7 | Action | Icon | 80px | — | — | Edit, Delete | — |

**Pagination**: Default 20/page, options 10/20/50/100
**Default sort**: Ngày tạo giảm dần
**Bulk action**: Delete (nếu có quyền), Export Excel
```
