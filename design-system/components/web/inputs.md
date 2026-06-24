# Input / Form Field — Web Portal

> Component input cho Web Portal, theo style mặc định Visily.

---

## 🎨 Variants

| Variant | Khi dùng |
|---------|----------|
| **Text** | Nhập text ngắn (tên, mã, email, phone) |
| **Number** | Nhập số (số lượng, giá, tỷ lệ %) |
| **Password** | Mật khẩu (có toggle show/hide) |
| **Textarea** | Text dài (mô tả, ghi chú) |
| **Select** | Chọn 1 từ danh sách dropdown |
| **Multi-select** | Chọn nhiều từ danh sách |
| **Date picker** | Chọn ngày, hỗ trợ range |
| **Time picker** | Chọn giờ |
| **DateTime** | Chọn ngày + giờ |
| **File upload** | Upload file (drag-drop hoặc browse) |
| **Switch** | Toggle on/off (vd: Active/Inactive) |
| **Checkbox** | Chọn nhiều option độc lập |
| **Radio** | Chọn 1 trong nhiều option |
| **Search** | Input có icon tìm kiếm + clear |

---

## 📏 Anatomy

```
┌─────────────────────────────────────┐
│ Tên trường (*)                      │  ← Label (Label/Default)
│ ┌─────────────────────────────────┐ │
│ │  Placeholder text               │ │  ← Input field
│ └─────────────────────────────────┘ │
│ Helper text hoặc Error message      │  ← Helper/Error text
└─────────────────────────────────────┘
```

### Kích thước
- **Default height**: 36px (cùng size với button medium)
- **Padding ngang**: 12px
- **Border**: 1px solid `Neutral/200`
- **Border radius**: 6px (`md`)
- **Font**: `Body/Default` (14px)
- **Khoảng cách label-input**: 4px (`xs`)
- **Khoảng cách input-helper**: 4px (`xs`)

---

## 🎭 Trạng thái (States)

| State | Visual |
|-------|--------|
| Default | Border `Neutral/200`, text `Neutral/900`, placeholder `Neutral/500` |
| Hover | Border `Neutral/300` |
| Focused | Border `Primary/500`, ring `Primary/100` (3px outside) |
| Filled | Border `Neutral/200`, text `Neutral/900` |
| Disabled | Background `Neutral/50`, border `Neutral/200`, text `Neutral/300`, không click được |
| Read-only | Background `Neutral/50`, text `Neutral/700`, KHÔNG có border focus |
| Error | Border `Error/500`, text `Neutral/900`, helper text `Error/700` |
| Success | Border `Success/500` (chỉ dùng khi cần feedback đặc biệt, vd: validate username available) |

---

## 📌 Quy tắc bắt buộc

### Label
- Đặt **PHÍA TRÊN** input (không bên trái) — nhất quán cho mọi form
- Field bắt buộc: thêm `(*)` đỏ sau label, **KHÔNG** thêm "(bắt buộc)"
- Field tùy chọn: KHÔNG cần đánh dấu (mặc định coi là tùy chọn)

### Placeholder
- Ngắn gọn, gợi ý format hoặc ví dụ
- KHÔNG dùng làm thay thế label
- Ví dụ: `"Vd: Nguyễn Văn A"`, `"yyyy-mm-dd"`

### Helper text
- Dùng khi cần giải thích thêm (vd: "Mã sẽ được sinh tự động nếu để trống")
- Color `Neutral/500`, font `Body/Small` (12px)

### Error message
- Hiển thị **DƯỚI** input, color `Error/700`, font `Body/Small`
- Validate inline khi blur khỏi field
- Khi có error: KHÔNG hiển thị helper text
- Tin nhắn cụ thể: KHÔNG dùng "Lỗi" / "Sai", phải nói rõ "Mã NPP đã tồn tại"

### Required indicator
- Dấu `*` đỏ chỉ trên label
- KHÔNG dùng border đỏ ở default state
- Border đỏ chỉ khi user submit/blur mà field rỗng

---

## 🎯 Spec field theo loại

### Text input
```
Field "Tên NPP" (*)
- Variant: Text
- Max length: 100 ký tự
- Validate: required, không cho phép emoji
- Placeholder: "Vd: Nhà phân phối ABC"
- Khi blur: trim whitespace 2 đầu
```

### Number input
```
Field "Hạn mức tín dụng" (*)
- Variant: Number
- Min: 0, Max: 999,999,999
- Format: thousand separator (1,000,000 VND)
- Validate: required, integer, > 0
- Placeholder: "0"
- Suffix: "VND"
```

### Select dropdown
```
Field "Khu vực" (*)
- Variant: Select
- Source: API GET /api/regions
- Search trong dropdown: enabled
- Validate: required
- Placeholder: "Chọn khu vực"
- Empty state: "Không có dữ liệu"
```

### Date picker
```
Field "Ngày bắt đầu" (*)
- Variant: Date picker
- Format display: dd/MM/yyyy
- Min date: today
- Max date: today + 1 year
- Validate: required, < ngày kết thúc
```

---

## ⚠️ Anti-pattern

| ❌ Sai | ✅ Đúng |
|--------|---------|
| Label bên trái input | Label phía trên |
| Placeholder thay thế label | Có cả label và placeholder |
| Tin nhắn "Lỗi!" mơ hồ | "Mã NPP đã tồn tại trong hệ thống" |
| Validate ngay khi user gõ | Validate khi blur (trừ khi user yêu cầu real-time) |
| Border đỏ default cho field bắt buộc | Chỉ đỏ khi thực sự lỗi |
| Disabled không có lý do | Tooltip / helper text giải thích |

---

## 🎬 Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Field auto-fill từ API | Loading inline + disable tạm thời |
| Field copy-paste data có ký tự lạ | Tự sanitize, KHÔNG báo lỗi (nếu sanitize được) |
| User paste quá max length | Cắt còn max length, hiển thị toast warning |
| Input số quá max | Highlight error + giới hạn = max |
| Select có nhiều option (>20) | Bật search trong dropdown |
| Date out of range | Disable date đó trong calendar |
| File upload quá size | Toast error trước khi upload |
| Network error khi load options | Hiển thị "Không tải được dữ liệu, [Thử lại]" |

---

## 📝 Spec template trong tài liệu BA

Khi viết spec field, dùng bảng:

| # | Tên field | Loại | Bắt buộc | Default | Validate | Nguồn |
|---|-----------|------|----------|---------|----------|-------|
| 1 | Mã NPP | Text | Có | (auto-gen) | Length 6-20, alphanumeric | — |
| 2 | Tên NPP | Text | Có | — | Max 100 ký tự | — |
| 3 | Khu vực | Select | Có | — | required | API /api/regions |
| 4 | Ngày bắt đầu | Date | Có | Today | ≥ Today | — |
| 5 | Ghi chú | Textarea | Không | — | Max 500 ký tự | — |
