# Component Inventory LIVE — [WEB] dms-portal-dev.finviet.com.vn

> Quét Browser MCP: **24/06/2026** (phiên SSO)  
> Phạm vi: dashboard + `/category/news/` + `/sale/payment-transaction/` + form Tạo mới (modal)  
> Framework: **Ant Design 5 + Ant Design Pro** (`ant-*`, `ant-pro-*`)

---

## Kết luận nhanh

| Câu hỏi | Trả lời |
|---------|---------|
| Đã học **hết** component portal? | **Chưa** — đã xác nhận ~35 nhóm trên màn thật; ~15 nhóm Ant Design có trong stack nhưng **chưa gặp** trên các URL đã quét |
| Đủ để làm mockup list/filter/form? | **Có** — pattern ProTable + QueryFilter + Modal/Drawer đã đủ |
| Cần quét thêm? | Menu L1 khác (Quản trị, Giám sát, Báo cáo…) — mega menu không expose `href`, cần điều hướng thủ công từng màn |

---

## A. Component đã xác nhận TRÊN PORTAL LIVE

### 1. Layout & điều hướng

| # | Component | Class Ant / Pro | Màn ví dụ | Ghi chú mockup |
|---|-----------|-----------------|-----------|----------------|
| 1 | Header top nav | `ant-pro-layout-header`, `ant-pro-top-nav-header` | Mọi màn | Nền `#2B579A`, cao 56px → `portal-chrome.css` |
| 2 | Mega menu L1 | `ant-menu-horizontal`, `ant-pro-base-menu-horizontal` | Header | 6 mục: Quản trị, Mua hàng, Giám sát, Danh mục, Báo cáo, Hỗ trợ PM |
| 3 | Breadcrumb | `ant-breadcrumb`, `ant-page-header` | Tin tức | `Danh mục / Tin tức` |
| 4 | Page container | `ant-pro-page-container` | List pages | Padding + title area |
| 5 | Page title | `ant-page-header-heading-title` | Tin tức | 20px / weight 600 |
| 6 | Footer | `ant-pro-global-footer` | Mọi màn | Powered by Finviet |
| 7 | Avatar user | `ant-avatar` | Header | Chữ cái đầu, nền cam |
| 8 | Watermark | `ant-pro-layout-watermark` | [CẦN XÁC NHẬN] | Class có trên Tin tức |

### 2. Search & bộ lọc (QueryFilter)

| # | Component | Class | Màn ví dụ | Chi tiết |
|---|-----------|-------|-----------|----------|
| 9 | **Ô tìm kiếm text** | `ant-input`, `ant-input-affix-wrapper` | Tin tức, Lịch sử DV | Placeholder theo field (vd: "Tin tức", "Mã giao dịch") |
| 10 | **Select đơn** | `ant-select`, `ant-select-single` | Tin tức (filter), Form Tạo mới | Công ty, Loại tin tức, Kiểu hiển thị, Đối tượng… |
| 11 | **Select đa** | `ant-select-multiple` | Lịch sử dịch vụ | ≥2 combobox multi trên filter |
| 12 | **Date range** | `ant-picker-range` | Dashboard, Lịch sử DV | `dd/MM/yyyy → dd/MM/yyyy` |
| 13 | **Date đơn** | `ant-picker` | Lịch sử DV | Trong range picker |
| 14 | Query filter panel | `ant-pro-query-filter`, `ant-pro-table-search` | List pages | Card trắng phía trên bảng |
| 15 | Nút Làm mới filter | `ant-btn-default` | List | Reset form filter |
| 16 | Nút Tìm kiếm | `ant-btn-primary` | List | Submit filter |
| 17 | Tag ngữ cảnh | `ant-tag-orange/blue/has-color` | Header list | Công ty, Vai trò, Bộ Lọc |

### 3. Bảng dữ liệu (ProTable)

| # | Component | Class | Màn ví dụ | Chi tiết |
|---|-----------|-------|-----------|----------|
| 18 | **Table list** | `ant-table`, `ant-pro-table` | Tin tức, Lịch sử DV | `size=small`, bordered, sticky header |
| 19 | Cột sortable | `ant-table-column-sorters` | Tin tức | Icon ↕ trên header |
| 20 | Ô copy giá trị | `ant-typography-copy` | Tin tức | Nút "Sao chép" cạnh mã |
| 21 | Link hàng (mở edit) | `ant-typography` link | Tin tức | Click tiêu đề → drawer |
| 22 | Toolbar title | `ant-pro-table-list-toolbar-title` | Tin tức | "Danh sách tin tức" |
| 23 | Toolbar actions | `ant-pro-table-list-toolbar-right` | Tin tức | **Tạo mới** |
| 24 | Table settings | `ant-pro-table-list-toolbar-setting-items` | Lịch sử DV | `column-height`, `fullscreen` |
| 25 | **Pagination** | `ant-pagination`, `ant-pagination-mini` | Tin tức | Text `1-2 trên 2 tin tức`, page size select |
| 26 | Empty state | `ant-empty` | Dashboard list | Khi không có data |
| 27 | Loading | `ant-spin-nested-loading` | Mọi màn | Bọc table/content |

### 4. Button

| # | Variant | Class | Ví dụ text |
|---|---------|-------|------------|
| 28 | Primary | `ant-btn-primary` | Tìm kiếm, Tạo mới, Đồng ý |
| 29 | Default | `ant-btn-default` | Làm mới, Xem thêm |
| 30 | Export | `ant-btn-default` | Export Excel |
| 31 | Sync | `ant-btn-default` | Đồng bộ |
| 32 | Icon only | `ant-btn` + icon | Column height, fullscreen |
| 33 | Disabled | `ant-btn[disabled]` | Pagination prev/next khi 1 trang |

### 5. Form tạo / sửa

| # | Component | Shell | Màn ví dụ | Field đã thấy |
|---|-----------|-------|-----------|---------------|
| 34 | **Form create** | `ant-modal` | Tin tức → Tạo mới | Công ty*, Vùng, Vùng mới, Tiêu đề, Loại tin tức, Kiểu hiển thị, Đối tượng, Mô tả |
| 35 | **Form edit** | `ant-drawer` | Tin tức → click dòng | [CẦN XÁC NHẬN field — drawer mở nhưng chưa load đủ trong phiên quét] |
| 36 | Form layout | `ant-form-horizontal`, `ant-pro-form` | Modal create | Label trái, control phải |
| 37 | Input text | `ant-input` | Form | Tiêu đề |
| 38 | Textarea | `textarea.ant-input` | Form | Mô tả |
| 39 | Select đơn (form) | `ant-select` | Form | 6 dropdown |
| 40 | Rich text editor | Custom toolbar | Form Tạo mới | Font Size, Line Height, Letter Spacing, Bold, Italic… |
| 41 | Footer form | `ant-btn` | Modal | **Làm mới**, **Đồng ý** |
| 42 | Đóng modal | `ant-modal-close` | Modal | Nút Close |

### 6. Dashboard đặc thù

| # | Component | Class / pattern | Ghi chú |
|---|-----------|-----------------|--------|
| 43 | KPI gradient cards | `ant-card` + custom gradient | Đơn hàng, Doanh số, Doanh thu… |
| 44 | Tabs | `ant-tabs`, `ant-tabs-card` | Nhân viên online, Hoạt động gần đây |
| 45 | List hoạt động | `ant-list`, `ant-list-item-meta` | Sidebar dashboard |
| 46 | Google Map embed | `.gm-style` | Bản đồ giám sát |
| 47 | Chart tabs | `ant-tabs` | Biểu đồ trạng thái ĐH, doanh số |
| 48 | Filter dashboard | `ant-picker-range` + tag FINVIET | Tình hình bán hàng |
| 49 | Nút Bộ Lọc | Tag/button xanh | Dashboard mobile layout |

### 7. Khác

| # | Component | Class | Ghi chú |
|---|-----------|-------|--------|
| 50 | Dropdown | `ant-dropdown` | User menu, table actions |
| 51 | Badge status | `ant-badge-status` | Trạng thái online |
| 52 | Tabs phụ | `ant-tabs` | Lịch sử DV — tab Thông báo |
| 53 | Typography | `ant-typography` | Text, ellipsis, copy |
| 54 | Space / Row / Col | `ant-space`, `ant-row`, `ant-col` | Grid layout |
| 55 | Card container | `ant-card`, `ant-pro-card` | Filter, content block |
| 56 | Tooltip | `ant-tooltip` | Toolbar icon — **có class khi hover** [chưa capture ảnh] |
| 57 | Popover | `ant-popover` | Có trong CSS bundle |

---

## B. Component user hỏi — trạng thái học

| Component bạn hỏi | Đã gặp live? | Class / pattern | Ghi chú |
|-------------------|--------------|-----------------|--------|
| **Search** | ✅ Có | `ant-input` + QueryFilter + nút Tìm kiếm | Không dùng `ant-input-search` standalone |
| **Select one choice** | ✅ Có | `ant-select-single` | Filter + form |
| **Multichoice** | ✅ Có | `ant-select-multiple` | Lịch sử dịch vụ |
| **Table list** | ✅ Có | `ant-pro-table` | Chuẩn mọi màn danh sách |
| **Button** | ✅ Có | `ant-btn-primary/default` | Xem mục 4 |
| **Tooltip** | ⚠️ Một phần | `ant-tooltip` | Icon setting bảng; cần hover |
| **Toggle (Switch)** | ❌ Chưa gặp | `ant-switch` | Có thể ở màn Cấu hình — chưa vào được URL |
| **Form create** | ✅ Có | `ant-modal` + `ant-pro-form` | Tin tức |
| **Form edit** | ⚠️ Một phần | `ant-drawer` | Mở khi click dòng; cần quét lại field |

---

## C. Component Ant Design có trong stack — CHƯA gặp trên màn đã quét

> Có thể xuất hiện ở màn Quản trị / Cấu hình / Import — **chưa truy cập** (URL đoán `admin/*`, `setting/*` → Error 404)

| Component | Class | Khả năng dùng trên DMS |
|-----------|-------|------------------------|
| Switch / Toggle | `ant-switch` | Cấu hình bật/tắt module |
| Checkbox | `ant-checkbox`, `ant-checkbox-group` | Phân quyền, chọn nhiều |
| Radio | `ant-radio-group` | Loại cấu hình |
| Input Number | `ant-input-number` | KPI, số lượng |
| Upload file | `ant-upload` | Import Excel, đính kèm |
| Tree | `ant-tree`, `ant-tree-select` | Phân vùng, phân cấp |
| Cascader | `ant-cascader` | Địa chỉ / vùng lồng nhau |
| Transfer | `ant-transfer` | Gán quyền 2 cột |
| Steps | `ant-steps` | Wizard tạo mới nhiều bước |
| Collapse | `ant-collapse` | Form dài gấp nhóm |
| Segmented | `ant-segmented` | Chuyển view |
| Descriptions | `ant-descriptions` | Màn chi tiết read-only |
| Alert | `ant-alert` | Cảnh báo hệ thống |
| Popconfirm | `ant-popconfirm` | Xác nhận xóa |
| Rate / Slider | `ant-rate`, `ant-slider` | [CẦN XÁC NHẬN] |
| Statistic / Progress | `ant-statistic`, `ant-progress` | Dashboard / báo cáo |

---

## D. Pro Components (Ant Design Pro) đã thấy

```
ant-pro-layout          ant-pro-page-container    ant-pro-query-filter
ant-pro-table           ant-pro-table-search      ant-pro-table-list-toolbar
ant-pro-form            ant-pro-field-*           ant-pro-card
ant-pro-grid-content    ant-pro-top-nav-header    ant-pro-global-header
ant-pro-global-footer
```

---

## E. Pattern màn hình chuẩn (áp dụng mockup)

### List screen
```
Header → Breadcrumb → Page title
→ Tag bar (Công ty / Vai trò / Bộ Lọc)
→ QueryFilter card (input + select + date + Làm mới/Tìm kiếm)
→ ProTable toolbar (title trái + Tạo mới phải)
→ Table + pagination
```

### Create screen (modal)
```
Modal title → Form 2 cột (Công ty* đầu tiên)
→ Footer: Làm mới | Đồng ý
```

---

## F. Mapping sang mockup BA

| Portal (live) | Mockup class |
|---------------|--------------|
| `ant-pro-query-filter` | `.portal-card` + `.portal-filter-grid` |
| `ant-btn-primary` | `.portal-btn--primary` |
| `ant-table` | `.portal-table` |
| `ant-select` | `.portal-field` + `<select>` hoặc custom dropdown |
| `ant-tag-*` | `.portal-tag--*` |
| Header | `portal-chrome.css` |

Gallery: `mockups/web/components-gallery.html`  
Snapshot JSON: `design-system/web/extract/portal-live-snapshot.json`

---

## G. Việc cần làm tiếp (quét full menu)

1. Điều hướng từng mục mega menu (Quản trị → Công ty, Nhân viên…) — cần click menu thật, không đoán URL
2. Bổ sung doc: `buttons.md`, `inputs.md`, `filters.md`, `forms.md`, `tooltips.md` (hiện thiếu)
3. Quét màn có **Switch**, **Upload**, **Tree** để đóng gap mục C

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Quét live Browser MCP — 3 route + form modal |
