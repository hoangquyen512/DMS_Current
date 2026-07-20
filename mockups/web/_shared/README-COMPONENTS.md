# [WEB] Portal Components — Hướng dẫn nhanh

## File CSS

| File | Mục đích |
|------|----------|
| `portal-tokens.css` | Design tokens (--portal-*) |
| `portal-fonts.css` | Font stack |
| `portal-components.css` | Component `.portal-*` (chuẩn mới) |
| `portal-mockup-bridge.css` | Map class mockup cũ → visual portal |
| `portal-mockup-widgets.js` | JS Multi-select + Select dropdown + Bộ lọc nâng cao |
| `portal-date-range-picker.js` | JS Date range — calendar popup (auto-load từ portal-chrome.js) |
| `portal-chrome.css` | Import tất cả + header ecodms |

**Trang mới:** dùng class `.portal-*` theo `design-system/web/patterns/list-screen.md`  
**Trang cũ:** chỉ cần `portal-chrome.css` + `body.portal-page` — bridge tự áp dụng.

## Gallery

Mở `mockups/web/components-gallery.html` — reference trực quan.

## Snippet — Date range (một ô)

Markup chuẩn — **click mở calendar** (auto qua `portal-chrome.js`):

```html
<div class="portal-field__control portal-date-range">
  <div class="portal-date-range__inner">
    <input class="portal-date-range__input" placeholder="Từ ngày" readonly/>
    <span class="portal-date-range__sep">—</span>
    <input class="portal-date-range__input" placeholder="Đến ngày" readonly/>
  </div>
  <span class="portal-date-range__icon"></span>
</div>
```

Calendar tự gắn khi có `portal-chrome.js`. Trang có logic riêng: `data-date-range-custom="1"`.

**Bỏ chọn (allowClear):** Khi đã có Từ/Đến ngày, hiện nút **×** trên ô lịch (cùng style Select). Trong popup vẫn có nút **Xóa**.

## Snippet — Multi-select (Select multi choice)

**Spec:** `design-system/web/components/multi-select.md`  
**Snippet file:** `mockups/templates/web-multi-select-snippet.html`

Cần `portal-mockup-widgets.js` (auto qua `portal-chrome.js`).

- Dropdown đánh dấu đã chọn (tick ✓)
- Ô tự giãn theo số tag
- API: `PortalMockupWidgets.setMultiSelectValues` / `clearMultiSelect` / `getMultiSelectValues`

```html
<div class="portal-multi-select" id="programMulti">
  <div class="portal-multi-select__inner portal-multi-select__tags">
    <span class="portal-multi-select__placeholder">Chương trình trưng bày</span>
  </div>
  <span class="portal-multi-select__arrow"></span>
  <ul class="portal-multi-select__dropdown">
    <li class="portal-multi-select__option" data-value="A">Chương trình A</li>
    <li class="portal-multi-select__option" data-value="B">Chương trình B</li>
  </ul>
  <select class="portal-multi-select__hidden" id="filterProgram" multiple hidden>
    <option value="A">Chương trình A</option>
    <option value="B">Chương trình B</option>
  </select>
</div>
```

**Single select — dropdown bo tròn 8px:** JS tự bọc `select.portal-select` / `filter-select` → `.portal-select-ui` + panel `.portal-select-ui__dropdown` (`--portal-radius-dropdown: 8px`). Không dùng native OS list.

**Bỏ chọn (allowClear):** Khi select có option placeholder `value=""` (thường `hidden`), sau khi chọn sẽ hiện nút **×** trên control; click lại đúng option đang chọn trong dropdown cũng bỏ chọn. Tắt bằng `data-clearable="false"`. Select bắt buộc không có option rỗng (vd. `* Công ty`) thì không hiện nút xóa.

**Create / Edit:** Mọi select **tùy chọn** trong form Create/Edit (modal hoặc trang) **bắt buộc** có allowClear. Widget (`portal-mockup-widgets.js`) tự inject placeholder nếu thiếu; field có `*` / `data-clearable="false"` thì không cho bỏ chọn. Class hỗ trợ: `portal-select`, `filter-select`, `search-select`, `form-select`. Khi gán value bằng JS: `PortalMockupWidgets.setSelectValue(id, value)` hoặc `syncFormSelectsClear(modal)`.

## Snippet — Bộ lọc nâng cao (CTTB pattern)

Tự động inject qua `portal-mockup-widgets.js` (load bởi `portal-chrome.js`):

**Thứ tự trang:** `h1` bọc trong **`.portal-page-hd`** (title trái · tags + nút **Bộ lọc** phải) → **filter card**

1. **Cùng dòng title:** JS bọc `h1.portal-page-title` → `.portal-page-hd` · nút **Bộ lọc** + tags căn **phải** (`.portal-page-hd__aside`)
2. **Popover:** Công ty / Vùng / Nhóm + **Làm mới** / **Xác nhận**
3. **Context tags:** sau Xác nhận → hiển thị trong `.portal-page-hd__aside` (căn phải)

Field **Công ty / Vùng / Nhóm** trong grid chính tự chuyển vào popover. Reference: `MS-W-CTTB00-*.html`

```html
<!-- Không cần markup thủ công — chỉ cần filter-card + portal-chrome.js -->
<h1 class="portal-page-title">Tiêu đề màn</h1>
<div class="filter-card">…</div>
```

## Spec chi tiết

- `design-system/web/COMPONENT-INVENTORY-LIVE.md`
- `design-system/web/patterns/list-screen.md`
