# Filter & Search Bar — Web Portal

> Component thanh filter cho list/table screens, theo style Visily mặc định.

---

## 📐 Anatomy — Filter Bar tiêu chuẩn

```
┌────────────────────────────────────────────────────────┐
│ 🔍 [Search box     ] │ Khu vực▾│ Trạng thái▾│ [Reset]  │
└────────────────────────────────────────────────────────┘
```

- **Search box** (luôn có): tìm kiếm full-text
- **Filter dropdowns**: 2-5 filter tùy use case
- **Reset filter**: Text button bên phải (chỉ hiện khi có filter active)
- **Optional**: button "Filter nâng cao" mở modal/drawer với nhiều filter hơn

---

## 🎨 Style

### Container
- **Padding**: 16px
- **Background**: `Neutral/0`
- **Border**: bottom 1px solid `Neutral/200` (nếu sticky top)
- **Gap giữa các filter**: 12px
- **Layout**: flex horizontal, wrap nếu cần

### Search box
- **Width**: 240-360px (1/4 đến 1/3 của bar)
- **Height**: 36px (cùng size với input)
- **Icon**: 🔍 prefix (left), `Neutral/500`
- **Placeholder**: "Tìm kiếm theo Mã, Tên..."
- **Clear button**: icon X (suffix) — hiện khi có text

### Filter dropdown
- **Style**: giống Select component nhưng compact
- **Width**: auto theo content, min 120px
- **Height**: 36px
- **Default state**: hiện label; option trống (`value=""`) hoặc giá trị cụ thể đã chọn — **không** dùng option "Tất cả…"

- **Active state** (đã chọn): hiện label + giá trị + dot indicator

### Reset button
- **Variant**: Text button
- **Color**: `Primary/500`
- **Visibility**: chỉ khi có ≥1 filter active
- **Position**: cuối bar (bên phải)

---

## 🔧 Loại Filter

| Loại | Khi dùng | Behavior |
|------|----------|----------|
| **Text Search** | Tìm theo nhiều trường (Mã, Tên, ...) | Debounce 500ms, full-text search |
| **Single Select** | Chọn 1 giá trị (Trạng thái, Loại) | Dropdown đơn |
| **Multi Select** | Chọn nhiều giá trị (Khu vực, Tag) | Dropdown có checkbox |
| **Date Single** | Filter theo 1 ngày | Date picker |
| **Date Range** | Filter theo khoảng ngày | Range date picker với preset (Today, 7 days, 30 days...) |
| **Number Range** | Lọc theo khoảng số (giá, tuổi) | 2 input min-max |
| **Toggle / Switch** | Filter on/off (Đang hoạt động) | Switch component |

---

## 📌 Quy tắc bắt buộc

### Sắp xếp filter
- **Trái → phải theo tần suất sử dụng** (filter dùng nhiều ở trái)
- Search luôn ở **đầu** (bên trái nhất)
- Reset luôn ở **cuối** (bên phải nhất)

### Behavior

#### Search
- **Debounce**: 500ms (gõ xong mới fire request)
- **Min length**: 0 (cho phép search rỗng = clear search)
- **Highlight**: kết quả nên highlight ký tự match (optional)
- **Clear**: button X clear toàn bộ search

#### Filter dropdown
- **Apply ngay**: chọn xong tự apply (không cần button "Apply")
- **Multi-select**: hiện chip "X selected" khi >2 items chọn
- **Search trong dropdown**: enable nếu options >10
- **Empty state**: "Không có kết quả phù hợp"

#### Reset
- **1 click reset tất cả**: search + tất cả filter về default
- **Confirm**: KHÔNG cần confirm (action nhẹ, có thể redo dễ)

#### URL sync
- Filter values nên được sync vào URL query params
- → User share link giữ filter, refresh không mất filter

### Active indicator
- **Filter đã chọn**: 
  - Background `Primary/50`
  - Text bold hơn
  - Border `Primary/500`
  - Hoặc dot indicator nhỏ

### Empty result
- Khi filter ra 0 kết quả:
  - Empty state trong table
  - Message: "Không có kết quả phù hợp"
  - Button "Xóa filter" để reset

---

## 🔍 Filter nâng cao (Advanced Filter)

Khi có >5 filter, dùng pattern này thay vì show hết trên bar:

```
┌────────────────────────────────────┐
│ 🔍 [Search...] [Filter nâng cao]   │
└────────────────────────────────────┘
                     ↓ click
┌─ Drawer slide từ phải ─────────────┐
│ Filter nâng cao              [X]   │
├────────────────────────────────────┤
│ Khu vực                            │
│ [Multi-select dropdown]            │
│                                    │
│ Trạng thái                         │
│ [Multi-select dropdown]            │
│                                    │
│ Khoảng ngày tạo                    │
│ [Date range picker]                │
│                                    │
│ Hạn mức                            │
│ [Min input] - [Max input]          │
│ ...                                │
├────────────────────────────────────┤
│        [Reset] [Áp dụng]           │
└────────────────────────────────────┘
```

### Khi nào dùng?
- ≥5 filter cần thiết
- Muốn UI gọn hơn cho 80% case (dùng filter cơ bản)
- Power user mới mở advanced filter

### Quy tắc
- **Filter cơ bản** giữ trên bar (Search + 2-3 filter chính)
- **Advanced filter** chứa các filter nâng cao
- Indicator hiển thị số filter active: "Filter nâng cao (3)"

---

## 💾 Saved filters (optional)

Cho power user thường xuyên dùng cùng 1 set filter:

- Sau khi chọn filter → button "Lưu filter" → đặt tên
- Lần sau quick chọn từ dropdown "Saved filters"
- Lưu vào DB user preferences

---

## 🎬 Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Đang load options của dropdown | Loading spinner trong dropdown |
| Không có options | "Không có dữ liệu" trong dropdown |
| API search timeout | Toast warning, giữ filter cũ |
| User clear search nhanh | Cancel request đang chờ, fire request mới |
| Filter nâng cao chưa áp dụng → đóng drawer | Reset về state cũ (KHÔNG keep tentative changes) |
| URL có filter param không hợp lệ | Ignore, fall back default |

---

## ⚠️ Anti-pattern

| ❌ Sai | ✅ Đúng |
|--------|---------|
| 8 filter dropdown trên bar | Tối đa 4-5 trên bar, còn lại vào Advanced |
| Apply button cho mỗi filter | Auto-apply khi chọn |
| Search không debounce (fire mỗi keystroke) | Debounce 500ms |
| Reset không có confirmation feedback | Toast "Đã reset filter" hoặc visual feedback rõ ràng |
| Không có default value | Filter: option trống `value=""` hoặc giá trị cụ thể — **cấm** "Tất cả…" |

---

## 📝 Spec template trong tài liệu BA

```
**Filter Bar — Danh sách NPP**

| # | Filter | Loại | Default | Options/Source | Apply | Note |
|---|--------|------|---------|---------------|-------|------|
| 1 | Search | Text | rỗng | — | Debounce 500ms | Tìm theo Mã, Tên, SDT |
| 2 | Khu vực | Multi-select | (trống / giá trị cụ thể — cấm "Tất cả…") | API /api/regions | Auto | — |
| 3 | Trạng thái | Multi-select | (trống / giá trị cụ thể — cấm "Tất cả…") | enum: Active, Inactive, Pending | Auto | — |
| 4 | Ngày tạo | Date range | rỗng | — | Auto | Preset: 7 ngày, 30 ngày, 90 ngày |
| 5 | Reset | Button | — | — | Click | Reset all + reload |

**URL sync**: ✓ Tất cả filter sync vào query params
**Empty result behavior**: Empty state với button "Xóa filter"
**Advanced filter**: Không cần (4 filter là đủ)
```
