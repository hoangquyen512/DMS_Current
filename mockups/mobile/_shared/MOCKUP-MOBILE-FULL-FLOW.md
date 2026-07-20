# [APP] Quy tắc mockup Mobile — Full-flow trong một phone

> Áp dụng mọi mockup Salesman App trong `mockups/mobile/` (trừ `components-gallery.html` và file gallery được ghi rõ).

---

## Bắt buộc

| # | Quy tắc |
|---|---------|
| 1 | **Một khung `.phone`** duy nhất mỗi file mockup tính năng |
| 2 | Các màn con = `.screen` ẩn/hiện **bên trong** `.phone-screen` (class `.active`) |
| 3 | Chuyển màn bằng điều hướng **trong app**: Back, nút CTA, bottom sheet, overlay |
| 4 | **CẤM** thanh switcher/tab dev trên đầu file — ví dụ `MS-A-DH01` + `1 · Chọn SP \| 2 · Bảng giá sỉ \| …` |
| 5 | Empty / edge state: đi trong luồng (vd *Tạo thêm đơn*) hoặc file riêng — không tab reviewer |

---

## Không áp dụng

- **[WEB] Portal** — vẫn dùng `.switcher` + `.screen-wrapper` (`web-template.html`)
- **Component gallery** — có thể nhiều phone cạnh nhau để so component

---

## File mẫu

`mockups/mobile/vieng-tham/dat-hang/MS-A-DH01-bang-gia-si-full-flow.html`

Luồng demo: Viếng thăm → Đơn hàng (empty) → Tạo đơn → Chọn SP → Bottom sheet Bảng giá sỉ → Xác nhận.

---

## Tài liệu liên quan

- `.claude/context/html-mockup-generation.md`
- `mockups/README.md`
- `mockups/templates/mobile-template.html`
