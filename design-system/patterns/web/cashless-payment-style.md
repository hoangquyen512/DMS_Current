# Design Style — Cashless Payment (Portal Web)

> Tài liệu tham chiếu style cho tất cả mockup trong feature Cashless Payment.
> Reuse đúng tokens, class CSS, layout pattern từ file gốc `WEB-CP-B3-don-giao-hang-phan-bo.html`.

---

## Design Tokens

```css
:root {
    --primary-50: #EFF6FF;
    --primary-100: #DBEAFE;
    --primary-500: #3B82F6;
    --primary-600: #2563EB;
    --primary-700: #1D4ED8;
    --neutral-0: #FFFFFF;
    --neutral-50: #F9FAFB;
    --neutral-100: #F3F4F6;
    --neutral-200: #E5E7EB;
    --neutral-300: #D1D5DB;
    --neutral-500: #6B7280;
    --neutral-700: #374151;
    --neutral-900: #111827;
    --success-50: #ECFDF5;
    --success-500: #10B981;
    --success-700: #047857;
    --warning-50: #FFFBEB;
    --warning-500: #F59E0B;
    --warning-700: #B45309;
    --error-50: #FEF2F2;
    --error-500: #EF4444;
    --error-700: #B91C1C;
}
```

## Layout

- `.app` flex container, `.main` flex:1 background neutral-50
- `.topbar` sticky white bar, breadcrumb left, company badge + avatar right
- `.page` padding 20px 28px 40px
- `.page-header` flex space-between, title 22px bold + optional subtitle
- Company badge: `Finviet` trên topbar (cố định)

## Components

### Filter Card
- `.filter-card` white bg, border neutral-200, radius 8px, padding 14px 16px
- `.filter-row` flex wrap, gap 10px, align flex-end
- `.filter-field` flex col, gap 3px, flex:1, min-width 140px
- `.filter-label` 11px uppercase, neutral-500
- `.filter-select` / `.filter-input` / `.filter-search` (with search icon)
- `.filter-actions` chứa Làm mới + Tìm kiếm

### Table / DataGrid
- `.list-section` white bg, border, radius 8px, padding 16px
- `.table-container` overflow hidden, radius 8px
- `thead` bg neutral-50, `th` 12px bold neutral-700
- `td` 13px, `td.code` mono primary-600, `td.muted` neutral-500 12px, `td.money` bold right
- `.copy-icon` inline "⎘" neutral-300, hover primary-500
- `.cell-link` primary-600 bold, hover underline
- `.badge` inline 11px bold, radius 4px, padding 2px 8px

### Badge Variants
- Status: `.badge-pending` warning, `.badge-assigned` primary, `.badge-delivering` indigo, `.badge-completed` success, `.badge-failed` error
- Nguồn: `.badge-source-ecom` primary, `.badge-source-dms` green, `.badge-source-merchant` pink, `.badge-source-ocr` orange
- Thanh toán: `.badge-pay-unpaid` warning, `.badge-pay-paid` success, `.badge-pay-method` neutral
- Trạng thái chung: `.badge-active` success, `.badge-inactive` neutral

### Bulk Bar
- `.bulk-bar` primary-50 bg, primary-100 border, display none → `.visible`
- Count + meta + actions (right aligned)

### Pagination
- `.pagination` border-top, flex space-between
- `.page-btn` 28x28, `.page-btn.active` primary-500

### Modal
- `.modal-overlay` fixed inset, bg rgba black 0.45, `.open` display flex
- `.modal` white radius 10px, width 560px, shadow
- `.modal-header` / `.modal-body` / `.modal-footer` (neutral-50 bg)
- `.form-field` / `.form-label` / `.form-select` / `.form-textarea`
- `.confirm-info-panel` neutral-50 bg, grid 130px + 1fr

### Toast
- `.toast` fixed bottom-right, neutral-900 bg, `.toast.success` success-700
- `.show` display flex

### Buttons
- `.btn-primary` primary-500, `.btn-secondary` white border, `.btn-text` transparent primary text
- Disabled: opacity 0.5

## Status Tabs (nếu có)
- `.status-tab` button pills, gap 6px, active = primary-500 bg white text
- `.tab-count` inline counter badge

## Nguồn đơn hàng (4 loại)
- Ecom / DMS / Merchant App / OCR

## Quy tắc chung
- Font: system font stack (-apple-system, Inter, Roboto...)
- Không dùng emoji trong data — chỉ dùng trong status badge text
- Tên công ty cố định "Finviet" trên topbar
- Không có tuyến giao hàng trong filter (đã bỏ)
- Ghi chú textarea max 500 ký tự + counter

## Cấu trúc hành chính (2025 — sau cải cách)
- **Bỏ cấp Quận/Huyện** — cấu trúc 2 cấp: `Tỉnh/TP → Phường/Xã`
- Cây phân cấp đầy đủ cho cấu hình khu vực giao hàng:
  - `Vùng` (Miền Bắc / Trung / Nam)
  - → `Khu vực` (Đông Nam Bộ, Tây Nam Bộ, ĐB sông Hồng, Duyên hải NTB...)
  - → `Tỉnh / Thành phố` (sau sáp nhập 2025)
  - → `Phường / Xã`
  - → `Đường` (tuỳ chọn — nếu không chọn = phụ trách toàn bộ đường của phường)

## Pattern: Dual-list Shuttle với 2 Tab (Hierarchy Picker)

Dùng cho cấu hình **mapping nhiều khi 1 entity ↔ N items có phân cấp**. Áp dụng cho cấu hình khu vực giao hàng của tài xế (1 tài xế ↔ N phường/đường).

### Cấu trúc

```
┌────────────────────────────────────────────────────────────┐
│ Tab Bar: [Theo Phường/Xã (N)] [Theo Đường (M)]             │
├────────────────────────────────────────────────────────────┤
│ Tab Filter (cascading): Vùng → Khu vực → Tỉnh/TP [→ Phường]│
├──────────────────────┬───┬───────────────────────────────┐  │
│ Sẵn có (N/M items)   │   │ Đã chọn (X items)             │  │
│ [search]             │ › │ [search]                      │  │
│ ☐ Item path          │ ‹ │ ☑ Item path                   │  │
│ ☐ Item path          │   │ ☑ Item path                   │  │
└──────────────────────┴───┴───────────────────────────────┘  │
```

### Class hierarchy

- `.tab-bar` + `.tab-btn` (active có underline primary + badge counter)
- `.tab-content` (display none/block khi active)
- `.tab-filter.cols-3` (3 cột) / `.cols-4` (4 cột) — cascading dropdown
- `.shuttle` (grid 1fr / auto / 1fr)
- `.shuttle-panel` (border + radius + flex column)
- `.shuttle-panel-header` (checkbox-all + title + count)
- `.shuttle-search-wrap` (search box trong panel)
- `.shuttle-list` (overflow scroll, `.shuttle-item` có check state)
- `.shuttle-actions` (cột giữa: nút "› Thêm" và "‹ Xóa")
- `.shuttle-btn` (width 80px)

### Logic

- **Left panel** = items chưa chọn, lọc theo cascading filter + search
- **Right panel** = items đã chọn, chỉ lọc theo search
- Click item → toggle checkbox; click nút "Thêm/Xóa" → di chuyển checked items giữa 2 panel
- Counter badge ở tab cập nhật realtime khi thêm/xóa
- Mỗi tab có cascading filter độc lập

### Áp dụng cho Cashless Payment
- Tab 1: Phụ trách toàn Phường/Xã (cascading 3 cấp: Vùng → Khu vực → Tỉnh/TP)
- Tab 2: Phụ trách theo Đường cụ thể (cascading 4 cấp: thêm Phường/Xã)

## Driver-centric Mapping (KHÔNG dùng Zone entity)
- Cấu hình mapping **trực tiếp ở level Tài xế** (không cần CRUD Zone riêng)
- 1 Tài xế ↔ N (Phường + Đường) — granularity tối thiểu là Đường, tối đa là Phường (toàn bộ)
- **KHÔNG** quản lý: workload/năng lực giao, phương tiện/biển số, ca giao — chỉ phân chia khu vực thuần
- Hiển thị trong bảng: tag chip `Tỉnh › Phường › Đường` (hoặc `Tỉnh › Phường › Toàn bộ đường`), tối đa 3 tag + "+N khác"
- Class tag: `.area-tag` (Đường cụ thể — primary color) / `.area-tag.full-ward` (Toàn phường — indigo color)
