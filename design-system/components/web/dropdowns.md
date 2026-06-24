# Dropdown / Select — Web Portal

> Component dropdown/select cho Web Portal. Có 3 loại chính:
> - **Form Select**: chọn giá trị cho field trong form
> - **Action Menu**: menu hành động (3 dots, Settings)
> - **Filter Dropdown**: trong filter bar (xem `filters.md`)

---

## 🎨 Variants

| Variant | Khi dùng |
|---------|----------|
| **Single Select** | Chọn 1 giá trị từ danh sách |
| **Multi Select** | Chọn nhiều giá trị (có checkbox) |
| **Searchable Select** | Có search box trong dropdown (khi options >10) |
| **Async Select** | Load options từ API (khi user gõ search) |
| **Tree Select** | Cấu trúc cây (vd: Khu vực → Tỉnh → Quận) |
| **Action Menu** | Menu hành động (Edit, Delete, ...) |

---

## 📐 Anatomy

### Form Select (đóng)
```
┌─────────────────────────────┐
│ Chọn khu vực           ▾   │
└─────────────────────────────┘
```

### Form Select (mở)
```
┌─────────────────────────────┐
│ Chọn khu vực           ▴   │
└─────────────────────────────┘
┌─────────────────────────────┐
│ 🔍 Tìm kiếm...              │  ← Search (nếu searchable)
├─────────────────────────────┤
│ ✓ Miền Bắc                  │  ← Selected item
│   Miền Trung                │
│   Miền Nam                  │
│   Tây Nguyên                │
└─────────────────────────────┘
```

### Multi-Select (mở)
```
┌─────────────────────────────┐
│ ☑ Miền Bắc                  │
│ ☐ Miền Trung                │
│ ☑ Miền Nam                  │
│ ☐ Tây Nguyên                │
├─────────────────────────────┤
│         [Hủy]  [Áp dụng]    │  ← Footer (optional)
└─────────────────────────────┘
```

### Tag display khi multi-select có nhiều values
```
┌─────────────────────────────┐
│ [Miền Bắc x] [Miền Nam x]  ▾│
└─────────────────────────────┘
```

### Action Menu (3 dots)
```
       ⋯
       ↓ click
   ┌────────────┐
   │ ✏ Sửa      │
   │ 📋 Sao chép│
   ├────────────┤
   │ 🗑 Xóa      │  ← Danger items có divider trước
   └────────────┘
```

---

## 🎨 Style

### Trigger (input/button đóng)
- **Height**: 36px (cùng size input)
- **Padding**: 8px 12px
- **Border**: 1px solid `Neutral/200`
- **Border-radius**: 6px
- **Icon**: ▾ chevron, `Neutral/500`, ở phải
- **Background**: `Neutral/0`

### Dropdown panel
- **Background**: `Neutral/0`
- **Border**: 1px solid `Neutral/200`
- **Border-radius**: 8px
- **Shadow**: `shadow/md` (có depth nhẹ)
- **Min-width**: bằng width của trigger
- **Max-width**: 400px (tránh quá rộng)
- **Max-height**: 320px (scroll nếu nhiều options)
- **Padding**: 4px (vertical)

### Option
- **Padding**: 8px 12px
- **Font**: `Body/Default` (14px)
- **Color**: `Neutral/700` (default), `Neutral/900` (selected)
- **Hover**: background `Neutral/50`
- **Selected**: background `Primary/50`, text bold (medium weight)
- **Active (keyboard)**: background `Primary/100`
- **Disabled**: color `Neutral/300`, không click được

### Search box (trong searchable)
- **Padding**: 8px
- **Border-bottom**: 1px solid `Neutral/100`
- **Sticky**: top khi scroll dropdown

---

## 🎭 Trạng thái

| State | Trigger | Dropdown |
|-------|---------|----------|
| Default | Border `Neutral/200`, placeholder `Neutral/500` | Hidden |
| Hover | Border `Neutral/300` | Hidden |
| Focused | Border `Primary/500`, ring `Primary/100` | Hidden |
| Open | Border `Primary/500` | Visible với options |
| Filled | Border `Neutral/200`, text `Neutral/900` | Hidden |
| Disabled | BG `Neutral/50`, text `Neutral/300` | Disabled |
| Error | Border `Error/500` | — |

---

## 📌 Quy tắc bắt buộc

### Khi nào dùng Searchable
- Số options ≥10 → bắt buộc có search
- Số options 5-9 → optional (tùy use case)
- Số options <5 → KHÔNG cần search

### Single vs Multi
- Default: Single (đơn giản, ít gây nhầm lẫn)
- Multi chỉ khi: Filter, Tag picker, Permission/Role assignment

### Multi-select behavior
- **Apply ngay** khi click checkbox (không cần button Apply)
- **HOẶC** dùng footer "Hủy / Áp dụng" nếu cần preview trước khi commit
- Hiển thị tag/chip trong trigger khi đã chọn
- Khi >3 chip → hiển thị "[Item 1] [Item 2] +3 nữa"
- Click "Clear all" để xóa tất cả

### Async Select (load từ API)
- **Min length** để fire search: 2-3 ký tự
- **Debounce**: 300ms
- **Loading state**: spinner trong dropdown khi đang fetch
- **Empty result**: "Không tìm thấy '<query>'"
- **Error**: "Lỗi tải dữ liệu, [Thử lại]"

### Empty state
- "Không có dữ liệu" — khi data source rỗng
- "Không tìm thấy kết quả" — khi search không khớp
- Optional: "Tạo mới X" (nếu cho phép tạo inline)

### Selected display
- **Single**: hiện text của option đã chọn trong trigger
- **Multi 1-3 items**: hiện chip cho từng item
- **Multi >3 items**: "[Item 1] [Item 2] [Item 3] +N nữa"
- **Multi quá nhiều (vd 50+)**: "Đã chọn 50 / 100"

---

## 🔧 Action Menu (đặc biệt)

Action menu (3 dots, settings icon) có quy tắc riêng:

### Trigger
- Icon-only button (3 dots ⋯ hoặc ⚙)
- Size: 32x32px
- Color: `Neutral/500`
- Hover: background `Neutral/100`

### Menu items
- **Icon + Label**: icon trước, label sau, gap 8px
- **Padding**: 8px 12px
- **Hover**: background `Neutral/50`
- **Divider**: 1px solid `Neutral/100` để chia nhóm

### Danger items (Delete, Remove)
- Color: `Error/700`
- Icon: 🗑 hoặc tương tự, color `Error/500`
- Đặt **CUỐI** menu, có divider trước

### Disabled items
- Color: `Neutral/300`
- KHÔNG click được
- Tooltip giải thích lý do disabled (vd: "Không có quyền")

### Submenu (cấp 2)
- TRÁNH dùng nếu có thể (gây UX phức tạp)
- Nếu cần: arrow ▶ phía sau label, mở submenu khi hover

---

## 🎬 Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Đang load options | Spinner trong dropdown |
| Không có quyền chọn 1 option | Disable option đó + tooltip lý do |
| Mở dropdown gần edge của viewport | Auto-position để KHÔNG bị cắt (mở lên thay vì xuống) |
| User scroll page khi dropdown đang mở | Đóng dropdown |
| Click outside | Đóng dropdown |
| Press Esc | Đóng dropdown |
| Tab/Shift+Tab | Navigate giữa các options bằng keyboard |
| Enter trên option | Select option |
| User search và không có result | Empty state + (optional) link "Tạo mới [query]" |

---

## ⚠️ Anti-pattern

| ❌ Sai | ✅ Đúng |
|--------|---------|
| Dropdown có 50+ options không có search | Bắt buộc search khi >10 options |
| Trigger không hiện giá trị đã chọn | Trigger phải reflect selection |
| Multi-select không có cách clear all | Có nút "Clear" hoặc "Bỏ chọn tất cả" |
| Action menu để Edit / Delete cùng nhóm | Tách Delete (danger) ra với divider |
| Dropdown render trong overflow:hidden | Render ngoài (portal) để không bị cắt |
| Không hỗ trợ keyboard navigation | Tab/Arrow/Enter/Esc đầy đủ |

---

## 📝 Spec template trong tài liệu BA

### Single Select
```
**Field "Khu vực"**
- Variant: Single Select
- Searchable: ✓ (vì có 30+ khu vực)
- Source: GET /api/regions (cache 5 phút)
- Validate: required
- Placeholder: "Chọn khu vực"
- Empty state: "Không có khu vực" + button "Tạo khu vực mới" (chỉ admin)
```

### Multi Select
```
**Field "Vai trò"**
- Variant: Multi Select
- Apply: auto khi check
- Source: GET /api/roles
- Display: chip cho ≤3 vai trò, "+N nữa" cho >3
- Validate: required (≥1 vai trò)
```

### Action Menu
```
**Action menu cho row NPP**
- Trigger: icon ⋯ ở cột Action cuối
- Items:
  1. ✏ Sửa thông tin → (chỉ user có quyền edit)
  2. 📋 Sao chép thông tin → copy to clipboard
  3. 📊 Xem báo cáo → /reports/npp/{id}
  4. (divider)
  5. 🗑 Xóa NPP (Danger) → Confirm dialog → API DELETE
- Visibility: ẩn item nếu user không có permission
```
