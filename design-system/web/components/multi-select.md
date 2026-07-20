# Component — Multi-select (Select multi choice) [WEB]

> Control chọn **nhiều giá trị** trong một ô filter/form: tag trong ô + dropdown có đánh dấu đã chọn.  
> Chuẩn portal Ant Design Select (`mode="multiple"`) — tham chiếu live: `/admin/stores`.

## Asset (bắt buộc)

| File | Vai trò |
|------|---------|
| `mockups/web/_shared/portal-components.css` | Style ô input, tag, dropdown, tick đã chọn |
| `mockups/web/_shared/portal-mockup-widgets.js` | Init click, toggle chọn, sync `is-selected` |

**Snippet copy-paste:** `mockups/templates/web-multi-select-snippet.html`

> CSS/JS tự load qua `portal-chrome.js` khi trang dùng `body.portal-page` + `portal-chrome.css`.

## Cách gắn vào mockup mới

### 1. Head

```html
<link rel="stylesheet" href="{PORTAL_BASE}_shared/portal-components.css"/>
<link rel="stylesheet" href="{PORTAL_BASE}_shared/portal-chrome.css"/>
```

`{PORTAL_BASE}` = `../` × số cấp lên `mockups/web/` (vd depth 3 → `../../../`).

### 2. Body — trước `</body>`

```html
<script src="{PORTAL_BASE}_shared/portal-mockup-widgets.js"></script>
<script src="{PORTAL_BASE}_shared/portal-chrome.js"></script>
```

`portal-chrome.js` đã auto-load `portal-mockup-widgets.js` nếu chưa có — chỉ thêm thủ công khi trang **không** dùng chrome.

### 3. HTML control

```html
<div class="portal-field">
  <label class="portal-field__label">Nhà phân phối</label>
  <div class="portal-field__control portal-multi-select" id="msNpp">
    <div class="portal-multi-select__inner portal-multi-select__tags">
      <span class="portal-multi-select__placeholder">Chọn nhà phân phối</span>
    </div>
    <span class="portal-multi-select__arrow"></span>
    <ul class="portal-multi-select__dropdown">
      <li class="portal-multi-select__option" data-value="NPP-HCM-01">NPP-HCM-01 — Finviet HCM</li>
      <li class="portal-multi-select__option" data-value="NPP-HCM-02">NPP-HCM-02 — Finviet Bình Dương</li>
    </ul>
    <select class="portal-multi-select__hidden" id="filterNpp" multiple hidden>
      <option value="NPP-HCM-01">NPP-HCM-01 — Finviet HCM</option>
      <option value="NPP-HCM-02">NPP-HCM-02 — Finviet Bình Dương</option>
    </select>
  </div>
</div>
```

## Quy tắc UX

| Quy tắc | Chi tiết |
|---------|----------|
| Tag trong ô | Mỗi giá trị = 1 tag xám + nút `×` |
| Chiều cao ô | `min-height` 41px (filter) / 32px (form) — **tự giãn** khi nhiều tag, không overflow |
| Mở dropdown | Click vùng control (không phải `×`) |
| Đã chọn trong list | Nền highlight + **tick ✓** bên phải (`.is-selected`) |
| Click option | Toggle: chọn thêm / bỏ chọn |
| Giữ mở | Dropdown **không** đóng sau mỗi lần chọn (chọn tiếp) |
| Đóng | Click ngoài vùng control |
| Disabled | Class `.is-disabled` trên root |
| Placeholder | Đúng tên trường / “Chọn …”, ẩn khi đã có tag |

## API JS

```javascript
// Auto init mọi .portal-multi-select khi load trang
PortalMockupWidgets.initAll();

// Gán / đọc / xóa / disable
PortalMockupWidgets.setMultiSelectValues('msNpp', ['NPP-HCM-01', 'NPP-HCM-02']);
PortalMockupWidgets.getMultiSelectValues('msNpp'); // ['NPP-HCM-01', ...]
PortalMockupWidgets.clearMultiSelect('msNpp');
PortalMockupWidgets.setMultiSelectDisabled('msNpp', true);
PortalMockupWidgets.syncMultiSelectOptions(document.getElementById('msNpp'));
```

Event khi đổi lựa chọn: `portal-multiselect-change` (bubble từ root).

```javascript
document.getElementById('msNpp').addEventListener('portal-multiselect-change', function () {
  // applyFilters()
});
```

## CẤM

- ❌ Tự viết CSS/JS multi-select riêng (`.multi-select`, `.tag`, checkbox list) cho filter/form Portal chuẩn
- ❌ Khóa `height: 41px` cố định khiến tag tràn
- ❌ Dropdown không đánh dấu mục đã chọn
- ❌ Tree-select / transfer 2 cột: dùng pattern riêng (không nhầm với multi-select)

## Mockup tham chiếu

- `mockups/web/giam-sat/giao-hang/quan-ly-don-giao-hang/WEB-CP-B3-don-giao-hang-phan-bo.html`
- `mockups/web/giam-sat/giao-hang/quan-ly-nhan-vien-giao-hang/MS-W-DL04-danh-sach-nhan-vien-giao-hang.html`
- `mockups/web/components-gallery.html`
- `mockups/templates/web-template.html`

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 17/07/2026 | Chuẩn hóa Ant Design multi-select: tick đã chọn, ô tự giãn, API helpers, snippet template |
