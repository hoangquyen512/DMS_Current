# [WEB] Portal Components — Hướng dẫn nhanh

## File CSS

| File | Mục đích |
|------|----------|
| `portal-tokens.css` | Design tokens (--portal-*) |
| `portal-fonts.css` | Font stack |
| `portal-components.css` | Component `.portal-*` (chuẩn mới) |
| `portal-mockup-bridge.css` | Map class mockup cũ → visual portal |
| `portal-mockup-widgets.js` | JS Multi-select + Bộ lọc nâng cao CTTB (popover) |
| `portal-chrome.css` | Import tất cả + header ecodms |

**Trang mới:** dùng class `.portal-*` theo `design-system/web/patterns/list-screen.md`  
**Trang cũ:** chỉ cần `portal-chrome.css` + `body.portal-page` — bridge tự áp dụng.

## Gallery

Mở `mockups/web/components-gallery.html` — reference trực quan.

## Snippet — Date range (một ô)

```html
<div class="portal-date-range filter-date-range">
  <div class="portal-date-range__inner">
    <input class="portal-date-range__input filter-input" placeholder="Từ ngày"/>
    <span class="portal-date-range__sep">—</span>
    <input class="portal-date-range__input filter-input" placeholder="Đến ngày"/>
  </div>
  <span class="portal-date-range__icon"></span>
</div>
```

## Snippet — Multi-select

Cần `portal-mockup-widgets.js` trước `</body>`.

```html
<div class="portal-multi-select" id="programMulti">
  <div class="portal-multi-select__inner portal-multi-select__tags">
    <span class="portal-multi-select__placeholder">Chọn chương trình</span>
  </div>
  <span class="portal-multi-select__arrow"></span>
  <ul class="portal-multi-select__dropdown">
    <li class="portal-multi-select__option" data-value="A">Chương trình A</li>
  </ul>
</div>
```

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
