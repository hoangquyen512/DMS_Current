# Pattern — Màn hình List [WEB]

> Nguồn: dms-portal-dev · Ant Design Pro · QueryFilter + ProTable  
> **Chuẩn CRUD hệ thống (2026-07):** `portal-crud-list-modal-pattern.md` — reference mockup **MS-W-DL04**  
> CSS: `mockups/web/_shared/portal-components.css`  
> Bridge mockup cũ: `mockups/web/_shared/portal-mockup-bridge.css`

## 0. Chuẩn mặc định (bắt buộc từ nay)

Khi màn list có **Tạo mới / Sửa / Chi tiết / Import**:

1. Đọc và follow **`portal-crud-list-modal-pattern.md`**
2. Copy khung từ `mockups/templates/web-portal-crud-list-modal-snippet.html`
3. Import Excel (nếu có): `web-portal-import-excel-snippet.html` — **form ngang**, không vuông
4. **Không** thêm hàng dashboard KPI mặc định
5. Create / Edit / Detail = **popup** trên list — không tách trang

---

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
        <label class="portal-field__label" for="f2">Trạng thái</label>
        <div class="portal-field__control portal-select-wrap">
          <select class="portal-select" id="f2">
            <option value="" selected hidden>Trạng thái</option>
            <option>Hoạt động</option>
            <option>Không hoạt động</option>
          </select>
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
            <span class="portal-multi-select__placeholder">Chương trình trưng bày</span>
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

### 2.1 Date Range — một ô + calendar popup

- Một border bọc ngoài: `Từ ngày — Đến ngày`, icon lịch góc phải
- Class: `.portal-date-range` (tự gắn picker qua `portal-chrome.js`)
- **Asset:** `_shared/portal-date-range-picker.css` + `_shared/portal-date-range-picker.js`
- **Spec:** `design-system/web/components/date-range-picker.md`
- **Snippet:** `mockups/templates/web-date-range-picker-snippet.html`
- Input `readonly` — chọn qua popup; format `dd/MM/yyyy`
- **allowClear:** nút **×** trên ô khi đã có ngày (cùng style Select)
- **Không** dùng hai `filter-group` riêng cho Từ ngày / Đến ngày

### 2.1b Select one choice — allowClear

- Spec: `design-system/web/components/select.md` · Snippet: `web-select-snippet.html`
- Placeholder `value="" selected hidden` = tên trường → sau khi chọn hiện nút **×**
- Field bắt buộc (`* Công ty`): `data-clearable="false"`
- **Create / Edit:** select tùy chọn trong form Create/Edit **bắt buộc** allowClear; gán value JS → `PortalMockupWidgets.setSelectValue`
```html
<link rel="stylesheet" href="{PORTAL_BASE}_shared/portal-date-range-picker.css"/>
...
<div class="portal-field__control portal-date-range portal-date-range--picker" data-date-range-picker>
  <div class="portal-date-range__inner">
    <input class="portal-date-range__input" type="text" placeholder="Từ ngày" readonly/>
    <span class="portal-date-range__sep">—</span>
    <input class="portal-date-range__input" type="text" placeholder="Đến ngày" readonly/>
  </div>
  <span class="portal-date-range__icon"></span>
</div>
<script src="{PORTAL_BASE}_shared/portal-date-range-picker.js"></script>
```

### 2.2 Multi-select — tag trong một ô (Select multi choice)

- Class: `.portal-multi-select` + script `portal-mockup-widgets.js`
- **Spec:** `design-system/web/components/multi-select.md`
- **Snippet:** `mockups/templates/web-multi-select-snippet.html`
- Tag xám có nút `×`, dropdown đánh dấu đã chọn (tick ✓ + `.is-selected`)
- Chiều cao **tự giãn** khi nhiều tag — không khóa `height` cố định
- API: `PortalMockupWidgets.setMultiSelectValues` / `getMultiSelectValues` / `clearMultiSelect`
- Dùng cho: Chương trình trưng bày, Khu vực, NPP, NV bán hàng… (chọn nhiều)
- **CẤM** tự viết `.multi-select` / checkbox list riêng cho filter Portal

```html
<div class="portal-field__control portal-multi-select" id="msNpp">
  <div class="portal-multi-select__inner portal-multi-select__tags">
    <span class="portal-multi-select__placeholder">Chọn nhà phân phối</span>
  </div>
  <span class="portal-multi-select__arrow"></span>
  <ul class="portal-multi-select__dropdown">
    <li class="portal-multi-select__option" data-value="NPP-HCM-01">NPP-HCM-01 — Finviet HCM</li>
  </ul>
  <select class="portal-multi-select__hidden" id="filterNpp" multiple hidden>
    <option value="NPP-HCM-01">NPP-HCM-01 — Finviet HCM</option>
  </select>
</div>
```

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
| 2.1 | 10/07/2026 | Date range + calendar popup: `portal-date-range-picker.*` |
