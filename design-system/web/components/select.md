# Component — Select (one choice) [WEB]

> Control chọn **một giá trị** trong filter/form — dropdown bo tròn 8px (không dùng native OS list).  
> Chuẩn portal Ant Design Select (single).

## Asset (bắt buộc)

| File | Vai trò |
|------|---------|
| `mockups/web/_shared/portal-components.css` | Style `.portal-select`, panel `.portal-select-ui__*`, nút × |
| `mockups/web/_shared/portal-mockup-widgets.js` | Bọc select → custom dropdown + allowClear |

**Snippet copy-paste:** `mockups/templates/web-select-snippet.html`

> CSS/JS tự load qua `portal-chrome.js` khi trang dùng `body.portal-page` + `#portal-chrome-root`.

## Cách gắn vào mockup mới

### Markup chuẩn (filter tùy chọn — có bỏ chọn)

```html
<div class="portal-field">
  <label class="portal-field__label" for="fStatus">Trạng thái</label>
  <div class="portal-field__control portal-select-wrap">
    <select class="portal-select" id="fStatus">
      <option value="" selected hidden>Trạng thái</option>
      <option>Hoạt động</option>
      <option>Không hoạt động</option>
    </select>
  </div>
</div>
```

### Field bắt buộc (không cho bỏ chọn)

```html
<select class="portal-select" id="fCompany" data-clearable="false">
  <option selected>Công ty TNHH NPP HCM</option>
  <option>Công ty TNHH NPP Bình Dương</option>
</select>
```

Hoặc không có option `value=""` — JS không hiện nút ×.

## Quy tắc UX

| Quy tắc | Chi tiết |
|---------|----------|
| Placeholder | `<option value="" selected hidden>{Tên trường}</option>` — **không** dùng “Tất cả…” / option text trống |
| Dropdown | Panel `.portal-select-ui__dropdown`, bo tròn 8px |
| **allowClear** | Có placeholder `value=""` → sau khi chọn hiện nút **×** trên control |
| **Create / Edit** | Field **tùy chọn** trong form Create/Edit **bắt buộc** allowClear (nút ×). Widget tự inject placeholder nếu thiếu. Field bắt buộc (`*` / `data-clearable="false"`) **không** cho bỏ chọn |
| Click lại option đang chọn | Bỏ chọn (về placeholder) |
| Phím | `Backspace` / `Delete` khi focus → bỏ chọn (nếu clearable) |
| Tắt clear | `data-clearable="false"` |
| Class | `select.portal-select` / `filter-select` / `search-select` / `form-select` |
| Gán giá trị bằng JS | Dùng `PortalMockupWidgets.setSelectValue(id, value)` để đồng bộ nút × |

### Create / Edit — markup khuyến nghị

```html
<!-- Tùy chọn — có nút × sau khi chọn -->
<select class="portal-select" id="createRouteId">
  <option value="" selected hidden>Tuyến giao hàng</option>
  <option value="TGH-001">Tuyến Q1 — Bến Nghé</option>
</select>

<!-- Bắt buộc — không allowClear -->
<select class="portal-select" id="createCompanyCode" data-clearable="false">
  <option value="FV" selected>Finviet</option>
</select>
```

```js
// Khi mở Edit / cascade: đồng bộ nút ×
PortalMockupWidgets.setSelectValue('editRouteId', routeId);
// hoặc
PortalMockupWidgets.syncFormSelectsClear(document.getElementById('editModal'));
```

## Legacy filter-card

```html
<select class="filter-select">
  <option value="" selected hidden>Nhà phân phối</option>
  <option>NPP Bình Tân</option>
</select>
```

## Mockup tham chiếu

- `mockups/web/components-gallery.html`
- `mockups/templates/web-template.html`
- `mockups/web/giam-sat/giao-hang/quan-ly-nhan-vien-giao-hang/MS-W-DL04-danh-sach-nhan-vien-giao-hang.html` (Create/Edit)
- `mockups/web/_shared/README-COMPONENTS.md`

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.1 | 20/07/2026 | allowClear bắt buộc trên Create/Edit (tùy chọn); hỗ trợ `form-select`; `setSelectValue` / sync modal |
| 1.0 | 17/07/2026 | Select one choice + allowClear (× / click lại option) |
