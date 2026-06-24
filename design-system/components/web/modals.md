# Modal / Dialog — Web Portal

> Component modal cho Web Portal, theo style Visily mặc định.

---

## 🎨 Variants

| Variant | Khi dùng | Width |
|---------|----------|-------|
| **Small Modal** | Confirm action, simple form 1-3 fields | 400px |
| **Medium Modal** | Form thông thường (4-10 fields) | 600px |
| **Large Modal** | Form phức tạp, multi-section | 800-960px |
| **Full-screen Modal** | Workflow phức tạp, nhiều bước (Wizard) | 90% viewport |
| **Drawer** | Slide từ phải, cho detail/edit nhanh | 480-640px |
| **Confirm Dialog** | Xác nhận hành động đơn giản (Yes/No) | 400px |

---

## 📐 Anatomy

```
┌────────────────────────────────────┐
│ Title                          [X] │  ← Header
├────────────────────────────────────┤
│                                    │
│   Body content                     │  ← Body (scrollable)
│                                    │
├────────────────────────────────────┤
│              [Hủy] [Lưu]           │  ← Footer
└────────────────────────────────────┘
```

### Header
- **Padding**: 16px 24px
- **Border-bottom**: 1px solid `Neutral/200`
- **Title**: `Heading/H3` (18px SemiBold), color `Neutral/900`
- **Close button**: icon X, `Neutral/500`, top-right
- **Optional**: subtitle dưới title (`Body/Small`, `Neutral/500`)

### Body
- **Padding**: 24px
- **Max-height**: `calc(100vh - 200px)` (giữ header/footer luôn visible)
- **Scroll**: vertical only, hiện scrollbar khi content vượt
- **Background**: `Neutral/0`

### Footer
- **Padding**: 16px 24px
- **Border-top**: 1px solid `Neutral/200`
- **Background**: `Neutral/50` (tùy chọn) hoặc `Neutral/0`
- **Buttons**: căn phải, gap 8px, **Hủy → Primary** (Hủy bên trái)
- **Optional**: link "Xem hướng dẫn" bên trái nếu cần

---

## 🎭 Trạng thái

| State | Visual |
|-------|--------|
| Closed | Không hiện |
| Opening | Fade-in 200ms + scale 0.95 → 1 |
| Open | Visible với backdrop overlay |
| Submitting | Primary button → loading, các button khác disable |
| Closing | Fade-out 150ms |

### Backdrop
- **Background**: `rgba(17, 24, 39, 0.5)` (Neutral/900 với alpha)
- **Click backdrop**: đóng modal (trừ khi đang submitting hoặc form dirty)
- **Blur**: optional 4px backdrop-filter blur

---

## 📌 Quy tắc bắt buộc

### Khi nào dùng Modal vs Drawer vs Page?
| Use case | Component |
|----------|-----------|
| Form ngắn, nhanh (1-10 field) | Modal |
| Form dài, phức tạp (>10 field) | Page riêng |
| Quick edit / View detail | Drawer (slide phải) |
| Workflow nhiều bước (>3 steps) | Full-screen Modal hoặc Page |
| Confirm action (Yes/No) | Confirm Dialog (Small) |
| Notification / Alert | Toast (KHÔNG modal) |

### Footer button order
- **Đúng**: `[Hủy] [Lưu]` (Hủy/Secondary trái, Primary phải)
- **Sai**: `[Lưu] [Hủy]` (gây nhầm lẫn user)
- **Danger action**: `[Hủy] [Xóa]` — Xóa dùng Danger variant

### Title
- Verb-Object format: "Tạo NPP mới", "Sửa thông tin NPP", "Xóa NPP"
- Concise, không quá 60 ký tự
- KHÔNG dùng "Modal:" hoặc "Dialog:" prefix

### Close behavior
| Action | Có dirty form? | Behavior |
|--------|-----------------|----------|
| Click X | Không | Đóng ngay |
| Click X | Có | Confirm dialog "Bạn có chắc thoát? Dữ liệu chưa lưu sẽ mất" |
| Click backdrop | Không | Đóng ngay |
| Click backdrop | Có | KHÔNG đóng (bảo vệ user) |
| Press Esc | Không | Đóng ngay |
| Press Esc | Có | Confirm dialog |

### Focus management
- Mở modal → auto focus vào field đầu tiên (hoặc Primary button nếu là confirm)
- Trap focus trong modal (Tab không nhảy ra ngoài)
- Đóng modal → return focus về element đã trigger

### Stack modals
- **TRÁNH** mở modal trong modal
- Nếu bắt buộc: chỉ 1 cấp lồng nhau, modal con là Confirm dialog đơn giản

---

## 🔧 Confirm Dialog (đặc biệt)

Confirm dialog là Modal nhỏ chuyên cho confirm action. Có 2 variant:

### Default Confirm
```
┌──────────────────────────────────┐
│ ⓘ Xác nhận                       │
├──────────────────────────────────┤
│ Bạn có chắc muốn duyệt NPP       │
│ "Nhà phân phối ABC"?              │
├──────────────────────────────────┤
│           [Hủy] [Xác nhận]       │
└──────────────────────────────────┘
```

### Danger Confirm (xóa, không thể undo)
```
┌──────────────────────────────────┐
│ ⚠ Xóa NPP                        │
├──────────────────────────────────┤
│ Bạn có chắc muốn xóa NPP "ABC"?   │
│ Hành động này không thể hoàn tác.│
│                                   │
│ [Để xác nhận, gõ "ABC" bên dưới]│
│ ┌─────────────────────────────┐  │
│ └─────────────────────────────┘  │
├──────────────────────────────────┤
│           [Hủy] [Xóa]            │
└──────────────────────────────────┘
```

### Quy tắc Danger Confirm
- Title có icon ⚠ + color `Error/500`
- Body nêu rõ hậu quả "không thể hoàn tác"
- Với hành động cực kỳ nguy hiểm (xóa data lớn): yêu cầu user **gõ tên** để confirm
- Button "Xóa" dùng Danger variant
- Button "Hủy" focus mặc định (an toàn hơn)

---

## 🎬 Edge cases UI

| Trường hợp | Behavior |
|-----------|----------|
| Đang submit | Primary loading, footer buttons disabled, KHÔNG cho đóng modal |
| Submit thành công | Đóng modal + toast green |
| Submit fail (validate) | Giữ modal mở, highlight field lỗi, scroll tới |
| Submit fail (server) | Giữ modal mở, hiển thị error banner ở top body |
| Network timeout | Hiển thị error + button "Thử lại" |
| Browser back button | Đóng modal (đăng ký với history API) |
| Mobile keyboard mở | Modal scroll để input không bị che |

---

## ⚠️ Anti-pattern

| ❌ Sai | ✅ Đúng |
|--------|---------|
| Modal trong modal trong modal | Tối đa 1 cấp lồng (Confirm) |
| Backdrop không click được | Backdrop đóng modal (khi không dirty) |
| Title chung chung "Form" | Title cụ thể "Tạo NPP mới" |
| Footer chỉ có "OK" | Có "Hủy" + Primary action |
| Không trap focus | Trap focus là yêu cầu cơ bản |
| Auto-close khi success quá nhanh | Cho user thấy success state ít nhất 500ms trước khi đóng |

---

## 📝 Spec template trong tài liệu BA

```
**Modal "Tạo NPP mới"**

- Variant: Medium Modal (600px)
- Trigger: Click button "Tạo NPP" trên Title bar danh sách
- Title: "Tạo NPP mới"
- Close behavior:
  - Click X / backdrop / Esc khi form rỗng → đóng ngay
  - Khi form đã nhập data → confirm dialog trước khi đóng
- Body content: Form 8 fields (xem section 6 - Bộ Field)
- Footer:
  - Button "Hủy" (Secondary) — đóng modal
  - Button "Tạo" (Primary) — submit form
- Validate khi submit:
  - Tất cả field bắt buộc đã có giá trị
  - Mã NPP không trùng (call API check)
- Success: 
  - Toast green "Tạo NPP thành công"
  - Đóng modal
  - Refresh table danh sách
  - Highlight row mới (2s)
- Fail:
  - Hiển thị error message ở field tương ứng
  - Hoặc error banner ở top body nếu lỗi server
```
