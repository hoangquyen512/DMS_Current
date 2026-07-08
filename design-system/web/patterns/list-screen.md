# Pattern — Màn hình List [WEB]

> Nguồn: dms-portal-dev · Ant Design Pro · QueryFilter + ProTable  
> CSS: `mockups/web/_shared/portal-components.css`  
> Bridge mockup cũ: `mockups/web/_shared/portal-mockup-bridge.css`

## 1. Cấu trúc trang

```
body.portal-page
├── #portal-chrome-root          ← header ecodms (portal-chrome.js)
├── .portal-page-body
│   ├── nav.portal-breadcrumb
│   ├── h1.portal-page-title
│   ├── .portal-page-hd          ← tên màn + Bộ lọc nâng cao (cùng 1 dòng)
│   ├── .portal-card.portal-query-filter     ← bộ lọc chính
│   └── .portal-card.portal-protable         ← tabs + toolbar + bảng
```

## 2. QueryFilter — 4 cột × 2 hàng

```html
<div class="portal-card portal-query-filter">
  <div class="portal-card__hd">Tìm kiếm theo</div>
  <div class="portal-card__bd">
    <div class="portal-filter-grid portal-filter-grid--4">
      <div class="portal-field">
        <label class="portal-field__label" for="f1">Nhãn</label>
        <div class="portal-field__control portal-input-search-wrap">
          <input class="portal-input" id="f1" type="text" placeholder="..."/>
        </div>
      </div>
      <div class="portal-field">
        <label class="portal-field__label" for="f2">Select</label>
        <div class="portal-field__control portal-select-wrap">
          <select class="portal-select" id="f2">...</select>
        </div>
      </div>
      <!-- ... tối đa 8 field hiển thị / hàng 4 cột -->
      <div class="portal-field">
        <label class="portal-field__label" for="f7">Ngày giao hàng</label>
        <div class="portal-field__control portal-date-range">
          <div class="portal-date-range__inner">
            <input class="portal-date-range__input" id="f7From" type="text" placeholder="Từ ngày"/>
            <span class="portal-date-range__sep" aria-hidden="true">—</span>
            <input class="portal-date-range__input" id="f7To" type="text" placeholder="Đến ngày"/>
          </div>
          <span class="portal-date-range__icon" aria-hidden="true"></span>
        </div>
      </div>
      <div class="portal-field">
        <label class="portal-field__label">Chương trình</label>
        <div class="portal-field__control portal-multi-select" id="f8Multi">
          <div class="portal-multi-select__inner portal-multi-select__tags">
            <span class="portal-multi-select__placeholder">Chọn chương trình</span>
          </div>
          <span class="portal-multi-select__arrow"></span>
          <ul class="portal-multi-select__dropdown">
            <li class="portal-multi-select__option" data-value="A">Chương trình A</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="portal-query-actions">
      <div class="portal-query-actions__inner">
        <button type="button" class="portal-btn portal-btn--default">Làm mới</button>
        <button type="button" class="portal-btn portal-btn--primary">Tìm kiếm</button>
      </div>
    </div>
  </div>
</div>
```

**Quy tắc:**
- Label: `height 22px`, một dòng, ellipsis
- Control: `height 32px`, `width 100%`, `box-sizing border-box`
- Gap cột: **24px**, hàng: **16px**
- Nút chỉ **Làm mới + Tìm kiếm**, **luôn ở cuối panel filter** (sau toàn bộ field), căn **phải**, có `border-top`
- Filter **một grid 4 cột** (`filter-grid--4` / `portal-filter-grid--4`) — không tách nhiều `filter-row` lẻ gây ô trống
- **Công ty / Vùng / Nhóm** chỉ trong **Bộ lọc nâng cao** (popover CTTB) — auto qua `portal-mockup-widgets.js`
- Nút Làm mới/Tìm kiếm **không có** `border-top`

### 2.4 Bộ lọc nâng cao — CTTB pattern

- **Vị trí:** `.portal-page-hd` — **tên màn hình (trái) + context tags + nút Bộ lọc (phải)** trên **cùng 1 dòng**, ngoài vùng filter
- Click **Bộ lọc** → popover (Công ty, Vùng, Nhóm + Làm mới / Xác nhận)
- Dưới header: filter card **Tìm kiếm theo** → tabs → bảng
- Auto-inject qua `portal-mockup-widgets.js`

### 2.3 ProTable — title + nút thao tác cùng 1 dòng

Thứ tự: **Tabs trạng thái** → **Title (trái) + Nút Import/Export/… (phải, cùng dòng)** → Alert chọn → Bảng

- `.portal-protable__list-hd` + `.portal-protable__list-actions` dùng CSS grid — **luôn 1 hàng**
- Legacy `.list-section-header`: title trái, `.list-section-actions` phải — **flex row, nowrap**

### 2.1 Date Range — một ô (không tách Từ/Đến)

- Một border bọc ngoài, bên trong: `Từ ngày — Đến ngày`, icon lịch góc phải
- Class: `.portal-date-range` (legacy alias: `.filter-date-range`)
- **Width:** luôn `width: 100%` trong filter grid — không giới hạn `max-width` (trừ dashboard `.portal-dash-filter-row`)
- **Không** dùng hai `filter-group` riêng cho Từ ngày / Đến ngày

### 2.2 Multi-select — tag trong một ô

- Class: `.portal-multi-select` + script `portal-mockup-widgets.js`
- Tag xám có nút `×`, dropdown chọn thêm, chiều cao tự giãn khi nhiều tag
- Dùng cho: Chương trình trưng bày, Khu vực, NPP… (chọn nhiều)

## 3. ProTable

```html
<div class="portal-card portal-protable">
  <div class="portal-protable__toolbar">
    <div class="portal-tabs portal-tabs--line" role="tablist">...</div>
  </div>
  <div class="portal-protable__list-hd">
    <h2 class="portal-protable__list-title">Danh sách …</h2>
  </div>
  <div class="portal-protable__list-actions">
    <button class="portal-btn portal-btn--default">Import Excel</button>
    <button class="portal-btn portal-btn--default">Export File</button>
    <button class="portal-btn portal-btn--primary">+ Tạo mới</button>
  </div>
  <div class="portal-card__bd">
    <div class="portal-table-alert" id="bulkAlert" hidden>
      <span>Đã chọn <strong>0</strong> mục</span>
      <div class="portal-table-alert__actions">...</div>
    </div>
    <div class="portal-table-wrap portal-table-wrap--flush">
      <table class="portal-table portal-table--zebra">...</table>
    </div>
    <div class="portal-pagination">...</div>
  </div>
</div>
```

## 4. Cột checkbox

```html
<th class="col-check"><input type="checkbox" id="selectAll"></th>
<td class="col-check"><input type="checkbox" class="row-check"></td>
```

- `th` và `td` **cùng** `text-align: center`, width **48px**
- Class alias: `checkbox-col` (bridge map sang `col-check`)

## 5. Ô dữ liệu trong bảng

| Pattern | Class |
|---------|--------|
| Mã + copy | `.copy-cell` + `.copy-btn` |
| Link tên | `.portal-table__link` |
| Tag trạng thái | `.portal-tag--success/warning/error/blue/orange` |
| Tag Vùng trong bảng | `.portal-table__region-tag` (tím, CTTB) |
| Icon thao tác | `.portal-table-actions` + `.portal-icon-btn` |

## 6. Mockup cũ (chưa refactor HTML)

Giữ class legacy (`filter-card`, `filter-group`, `btn-primary`, `table-container`…) — `portal-mockup-bridge.css` tự map visual portal khi `body.portal-page`.

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.5 | 24/06/2026 | Bộ lọc nâng cao + Công ty; nút list dưới title; bỏ border nút filter |
| 1.6 | 24/06/2026 | Bộ lọc nâng cao CTTB: nút xanh + popover + context tags; reference MS-W-CTTB00 |
| 1.7 | 24/06/2026 | Bộ lọc nâng cao chuyển ra `.portal-advanced-bar` ngoài filter, đặt trước filter card |
| 1.8 | 24/06/2026 | Title danh sách + nút thao tác luôn cùng 1 dòng (ProTable grid + list-section row) |
| 1.9 | 24/06/2026 | Tên màn hình + Bộ lọc nâng cao cùng 1 dòng (`.portal-page-hd`) |
| 2.0 | 24/06/2026 | Date range full width trong filter; bỏ `max-width: 260px` global |
