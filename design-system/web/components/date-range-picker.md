# Component — Date Range Picker [WEB]

> Control chọn **Từ ngày — Đến ngày** trong một ô filter, có popup calendar.  
> Dùng cho mọi màn list Portal (QueryFilter, filter-card legacy).

## Asset (bắt buộc)

| File | Vai trò |
|------|---------|
| `mockups/web/_shared/portal-date-range-picker.css` | Style popup calendar + nút × trên ô |
| `mockups/web/_shared/portal-date-range-picker.js` | Khởi tạo picker, auto-bind click |
| `mockups/web/_shared/portal-components.css` | Style ô `.portal-date-range` + nút × |

**Snippet copy-paste:** `mockups/templates/web-date-range-picker-snippet.html`

> `portal-chrome.js` tự load CSS/JS date picker — không cần gắn thủ công trên trang mới.

## Cách gắn vào mockup mới

### HTML control

```html
<div class="portal-field">
  <label class="portal-field__label">{Nhãn field ngày}</label>
  <div class="portal-field__control portal-date-range">
    <div class="portal-date-range__inner">
      <input class="portal-date-range__input" type="text" placeholder="Từ ngày" aria-label="Từ ngày" readonly/>
      <span class="portal-date-range__sep" aria-hidden="true">—</span>
      <input class="portal-date-range__input" type="text" placeholder="Đến ngày" aria-label="Đến ngày" readonly/>
    </div>
    <span class="portal-date-range__icon" aria-hidden="true"></span>
  </div>
</div>
```

Có sẵn giá trị demo:

```html
<input class="portal-date-range__input" type="text" value="01/06/2026" placeholder="Từ ngày" readonly/>
<input class="portal-date-range__input" type="text" value="15/06/2026" placeholder="Đến ngày" readonly/>
```

**Không** dùng `type="date"` native — dùng `type="text"` + `readonly` (JS normalize nếu còn `type="date"` cũ).

## Quy tắc UX

| Quy tắc | Chi tiết |
|---------|----------|
| Một ô duy nhất | Không tách 2 field `Từ ngày` / `Đến ngày` |
| Input `readonly` | User chọn qua calendar, không gõ tay |
| Click vùng control | Mở popup (ô input, icon lịch, border) |
| Chọn range | Click ngày 1 → ngày 2; highlight range → tự đóng |
| **allowClear trên ô** | Khi đã có ngày → nút **×** (cùng style Select) — xóa Từ/Đến |
| Nút trong popup | **Xóa** (clear, giữ popup mở) |
| Format hiển thị | `dd/MM/yyyy` |
| Đóng popup | Click ngoài vùng control / sau khi chọn đủ range |
| Custom calendar riêng | `data-date-range-custom="1"` — JS không bind |

## Kích hoạt JS

Script tự init khi load trang, target mọi `.portal-date-range` (trừ `data-date-range-custom`).

```javascript
PortalDateRangePicker.init();
PortalDateRangePicker.initOne(document.querySelector('#myDateWrap'));
PortalDateRangePicker.clear(wrap);      // xóa giá trị
PortalDateRangePicker.syncClear(wrap);  // cập nhật hiện/ẩn nút ×
```

Event: `daterange:apply`, `daterange:clear` (bubble từ wrap).

## Mockup tham chiếu

- `mockups/web/components-gallery.html`
- `mockups/templates/web-template.html`
- `mockups/web/ho-tro-phan-mem/xu-ly-yeu-cau/MS-W-HT01-*.html`

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 10/07/2026 | Tách control calendar range; asset `_shared/portal-date-range-picker.*` |
| 1.1 | 17/07/2026 | allowClear — nút × trên ô lịch (đồng bộ Select) |
