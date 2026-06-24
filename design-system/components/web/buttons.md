# Button — Web Portal

> Component button cho Web Portal, theo style mặc định Visily (modern, clean).

---

## 🎨 Variants

| Variant | Visual | Khi dùng |
|---------|--------|----------|
| **Primary** | Nền `Primary/500`, chữ `Neutral/0` | Action chính 1 màn 1 button (Lưu, Tạo mới, Xác nhận) |
| **Secondary** | Nền `Neutral/0`, viền `Neutral/200`, chữ `Neutral/700` | Action thay thế (Hủy, Quay lại, Đóng) |
| **Tertiary** | Nền `Neutral/100`, không viền, chữ `Neutral/700` | Action phụ trong toolbar (Refresh, Filter) |
| **Danger** | Nền `Error/500`, chữ `Neutral/0` | Action không thể undo (Xóa, Từ chối) |
| **Text** | Không nền, không viền, chữ `Primary/500` | Action nhẹ trong table row, link-like |
| **Icon** | Chỉ icon, không text | Action trong table cell (Edit, Delete) |

---

## 📏 Sizes

| Size | Height | Padding ngang | Font |
|------|--------|---------------|------|
| **Small** | 28px | 12px | `Button/Small` (12px) |
| **Medium** | 36px | 16px | `Button/Default` (14px) |
| **Large** | 44px | 24px | `Button/Default` (14px) |
| **Icon** | 32x32px | (vuông) | — |

**Khi dùng size:**
- Small: trong table row, dense layout
- Medium: **mặc định** cho mọi button
- Large: button submit form lớn (chỉ vài trường hợp đặc biệt)
- Icon: chỉ thao tác phổ biến (Edit, Delete) trong row

---

## 🎭 Trạng thái (States)

### Primary button
| State | Visual |
|-------|--------|
| Default | Nền `Primary/500`, chữ trắng |
| Hover | Nền `Primary/600` |
| Pressed | Nền `Primary/700` |
| Focused | Nền `Primary/500` + outline ring `Primary/100` (3px) |
| Disabled | Nền `Neutral/200`, chữ `Neutral/300`, không cursor pointer |
| Loading | Hiển thị spinner thay text, disable click |

### Secondary button
| State | Visual |
|-------|--------|
| Default | Nền trắng, viền `Neutral/200` 1px, chữ `Neutral/700` |
| Hover | Nền `Neutral/50`, viền `Neutral/300` |
| Pressed | Nền `Neutral/100` |
| Disabled | Viền `Neutral/200`, chữ `Neutral/300` |

### Danger button
| State | Visual |
|-------|--------|
| Default | Nền `Error/500`, chữ trắng |
| Hover | Nền `Error/600` |
| Pressed | Nền `Error/700` |
| Disabled | Nền `Neutral/200`, chữ `Neutral/300` |

---

## 📌 Quy tắc bắt buộc

### Primary chỉ 1 button/màn hình
- Mỗi màn hình/section/modal **chỉ có 1 button Primary** (action quan trọng nhất)
- Các action khác phải là Secondary, Tertiary, hoặc Danger

### Thứ tự sắp xếp
- **Modal/Form footer**: `[Hủy] [Lưu]` — Hủy bên trái, Primary bên phải
- **Table action**: `[Edit icon] [Delete icon]` — Edit trước, Delete sau
- **Toolbar**: từ phải sang trái theo độ quan trọng

### Khoảng cách
- Giữa 2 button cạnh nhau: 8px
- Padding xung quanh button trong container: 16px

### Icon trong button
- Position: trước text (icon-text), KHÔNG sau text
- Khoảng cách icon-text: 6px
- Size icon: 16px (medium button), 14px (small)

### Label
- Verb thuần (Lưu, Hủy, Xóa) hoặc Verb + Object (Tạo NPP, Xuất Excel)
- KHÔNG dùng emoji
- Title case hoặc Sentence case (nhất quán trong app)

---

## ⚠️ Anti-pattern

| ❌ Sai | ✅ Đúng |
|--------|---------|
| 2 button Primary cạnh nhau | 1 Primary + 1 Secondary |
| Button "OK" / "Yes" / "No" mơ hồ | Verb cụ thể: "Xóa", "Lưu", "Đồng ý" |
| Disabled button không có lý do | Tooltip giải thích vì sao disabled |
| Button quá dài (>30 ký tự) | Cô đọng lại label |
| Mix Primary và Danger trong 1 footer | Chỉ 1 trong 2 |

---

## 🎬 Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Đang submit form | Primary → loading state, các button khác disabled |
| Form rỗng / chưa hợp lệ | Primary disabled + tooltip "Vui lòng nhập đủ thông tin" |
| Hành động nguy hiểm | Confirm dialog trước khi thực thi |
| Network error | Button quay về Default state, hiển thị toast error |
| Permission denied | Ẩn button hoàn toàn (KHÔNG disable) |

---

## 📝 Spec template trong tài liệu BA

Khi viết spec, mô tả button như sau:

```
Button "Tạo NPP"
- Variant: Primary
- Size: Medium  
- Position: góc trên phải của Title bar
- Visibility: chỉ hiển thị nếu user có permission "create_npp"
- Behavior:
  - Click → mở modal "Tạo NPP mới"
  - Khi đang submit → loading state
- Disabled khi: (không có)
```
