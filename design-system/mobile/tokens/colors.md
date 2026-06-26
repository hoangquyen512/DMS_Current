# Colors — [APP] Salesman Mobile

> Nguồn: `app_1_9_21.apk` — CSS var trong `mockups/mobile/_shared/mockup-tokens.css`

---

## Brand (Finviet)

| Token CSS | Hex | Semantic | Khi dùng |
|-----------|-----|----------|----------|
| `--app-primary` | `#009ADD` | Brand/500 | Nút primary, tab active, link, header brand |
| `--app-primary-dark` | `#058AD0` | Brand/600 | Pressed, navigation accent |
| `--app-primary-darker` | `#17629E` | Brand/700 | Text link đậm, outline button text |
| `--app-primary-light` | `#E4EFF8` | Brand/50 | Nền nhẹ, icon container, chip active bg |
| `--app-gradient-start` | `#009ADD` | — | Gradient báo cáo (đầu) |
| `--app-gradient-end` | `#57BAF7` | — | Gradient báo cáo (cuối) |

Alias full-flow: `--primary-500`, `--primary-600`, `--primary-700`

---

## Neutral

| Token CSS | Hex | Khi dùng |
|-----------|-----|----------|
| `--neutral-0` | `#FFFFFF` | Card, input, bottom bar |
| `--neutral-50` | `#F4F5F6` | Nền page, section background |
| `--neutral-100` | `#F0F3F7` | Divider nhẹ, border tab bar |
| `--neutral-200` | `#DAE1E7` | Border card, input |
| `--neutral-300` | `#C7CFE2` | Border disabled |
| `--neutral-500` | `#98A2B3` | Text phụ, placeholder, tab inactive |
| `--neutral-600` | `#8B97A1` | Icon phụ, chevron, nút ghost |
| `--neutral-700` | `#292D32` | Text body, label |
| `--neutral-900` | `#1A141F` | Title, heading |

---

## Semantic

| Token CSS | Hex | Khi dùng |
|-----------|-----|----------|
| `--success-50` | `#CCF0E2` | Badge/bg success |
| `--success-500` | `#02B46E` | Icon/dot success |
| `--success-700` | `#059669` | Text success đậm |
| `--warning-500` | `#F59E0B` | Cảnh báo |
| `--error-50` | `#FEF2F2` | Nền lỗi |
| `--error-500` | `#CC3B29` | Lỗi, badge đỏ, nav badge |
| `--tab-inactive` | `#98A2B3` | Bottom tab / tab chưa chọn |
| `--text-default` | `#292D32` | Text mặc định |
| `--app-shadow-primary` | `rgba(0,154,221,.35)` | FAB, CTA shadow |
| `--app-shadow-primary-sm` | `rgba(0,154,221,.12)` | Hover tile/card |
| `--app-hero-gradient` | `#d4edf9 → #E4EFF8 → #F4F5F6` | Hero cửa hàng (VT01, CH03) |

---

## Status nghiệp vụ (mapping)

| Trạng thái | Màu |
|------------|-----|
| Hoạt động / Đã duyệt / Hoàn thành | `--success-500` |
| Chờ duyệt / Đang xử lý | `--warning-500` |
| Từ chối / Lỗi / Hủy | `--error-500` |
| Nháp / Tạm dừng | `--neutral-500` |
| Đang viếng thăm / In progress | `--app-primary` |

---

## Quy tắc contrast

- Text trên `--app-primary`: luôn `#FFFFFF`
- Text trên `--neutral-0`: `--neutral-700` trở lên
- Disabled text: `--neutral-500` trên `--neutral-100`

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Palette từ APK v1.9.21 |
