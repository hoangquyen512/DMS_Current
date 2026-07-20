# Mockups — HTML Visual Mockups

> Folder chứa HTML mockup files được Claude auto-generate cho mỗi specification có UI.
> File HTML mở được trong browser và import vào **Visily** để edit thành wireframe.

---

## 🎯 Mục đích

| Có thể | Không thể |
|--------|-----------|
| ✅ Xem visual structure nhanh | ❌ Pixel-perfect như designer |
| ✅ Import vào Visily để edit | ❌ Animation / interaction |
| ✅ Multi-state (default, empty, error) | ❌ Tích hợp real data |
| ✅ Sample data thực tế | ❌ Thay thế hoàn toàn designer |

---

## 📂 Cấu trúc

```
mockups/
├── README.md              ← File này
├── templates/
│   ├── mobile-template.html   ← Base template cho Salesman/Manager App
│   ├── web-template.html      ← Base template cho Portal HO/NPP
│   ├── web-date-range-picker-snippet.html  ← Date range calendar + allowClear ×
│   ├── web-select-snippet.html             ← ⭐ Select one choice + allowClear × (filter + Create/Edit)
│   ├── web-multi-select-snippet.html       ← ⭐ Select multi choice
│   ├── web-portal-crud-list-modal-snippet.html  ← ⭐ CRUD list + Create/Edit popup + Select × (MS-W-DL04)
│   └── web-portal-import-excel-snippet.html     ← Import Excel form ngang
├── mobile/                    ← Mockup Salesman App (main.html = entry 4 tab)
│   ├── main.html
│   ├── vieng-tham/
│   ├── bao-cao/
│   ├── don-hang/
│   └── khac/
└── web/                       ← Mockup Portal (main.html = entry menu)
    ├── main.html
    ├── components-gallery.html   ← Component reference
    ├── _shared/                  ← portal-components.css, portal-mockup-bridge.css
    └── …/MS-WXX-ten-man-hinh.html
```

**Component portal:** xem `web/_shared/README-COMPONENTS.md` và `design-system/web/patterns/list-screen.md`.  
**Chuẩn CRUD [WEB]:** `design-system/web/patterns/portal-crud-list-modal-pattern.md` (reference **MS-W-DL04**). Mọi trang con load `portal-chrome.css` → tự có visual Ant Design Pro (kể cả HTML class cũ).

### Quy tắc Select (bắt buộc)

- **Không** dùng option `Tất cả`, `Tất cả …`, `-- Tất cả --`.
- **Không** dùng option trống `<option value=""></option>` (sẽ hiện dòng trống trên list).
- **Placeholder = đúng tên trường** (label), ví dụ: `<option value="" selected hidden>Khu vực</option>` — không dùng chữ `Chọn` chung.
- Có giá trị mặc định: placeholder chỉ `hidden` (không `selected`) + option thật `selected`.
- Cascade (Vùng → Khu vực → …): **không** `disabled` cấp con — luôn click được; chưa chọn cha thì chỉ còn placeholder.
- **Dropdown xổ xuống bo tròn 8px** (`--portal-radius-dropdown`): panel `.portal-select-ui__dropdown` / `.portal-multi-select__dropdown` + shadow Ant Design. Native OS list không style được — mockup dùng UI custom (tự bật qua `portal-chrome.js` → `portal-mockup-widgets.js`).
- **allowClear (Select one choice):** có placeholder `value=""` → nút **×** trên control; click lại option đang chọn cũng bỏ chọn. Field bắt buộc: `data-clearable="false"`. **Create/Edit:** select tùy chọn bắt buộc có × (`form-select` cũng được enhance). Spec: `design-system/web/components/select.md` · Snippet: `templates/web-select-snippet.html`.
- **Multi-select (chọn nhiều):** bắt buộc `.portal-multi-select` — tag trong ô, dropdown đánh dấu đã chọn (tick ✓), ô tự giãn. Spec: `design-system/web/components/multi-select.md` · Snippet: `templates/web-multi-select-snippet.html`. **CẤM** tự viết `.multi-select` riêng.
- **Date range — calendar popup:** mọi `.portal-date-range` click mở lịch (bo tròn 8px). **allowClear:** nút **×** trên ô khi đã có ngày. Tự load qua `portal-chrome.js` → `portal-date-range-picker.js`. Spec: `design-system/web/components/date-range-picker.md`. Trang custom calendar: `data-date-range-custom="1"`.
- Template: `templates/web-template.html` (comment đầu file).
- Select phải click được (chevron `pointer-events: none`).

---

## 🚀 Workflow với Visily

### Bước 1 — Claude gen file HTML
Claude tự động tạo file trong `mockups/mobile/` hoặc `mockups/web/` sau khi viết spec.

### Bước 2 — Mở trong Chrome
- **Portal:** `mockups/web/main.html`
- **Salesman App:** `mockups/mobile/main.html`
- Hoặc double-click file `.html` con

### Bước 3 — Import vào Visily
1. **Cài Extension**: Chrome Web Store → search **"Visily – Screenshot Capture & Design"** → Install
2. Click icon **Visily** trên toolbar Chrome
3. Chọn **"Capture Full Page"**
4. Output type: **"Editable wireframe"** ← QUAN TRỌNG (không phải Image)
5. Click **"Import to Visily"**

### Bước 4 — Edit trong Visily
- Các element đã được convert thành Visily components → edit thoải mái
- Move, resize, đổi text, thay màu...
- Export sang PDF/PNG để share hoặc export sang Figma để polish

---

## 📐 Convention đặt tên file

```
mockups/[platform]/[MS-code]-[ten-man-hinh].html
```

| Loại | Prefix | Ví dụ |
|------|--------|-------|
| Mobile (Salesman App) | `MS-` | `MS-01-bao-cao-vieng-tham.html` |
| Mobile (Manager App) | `MS-M-` | `MS-M-01-dashboard.html` |
| Web (Portal HO) | `MS-W-` | `MS-W01-danh-sach-npp.html` |
| Web (Portal NPP) | `MS-NPP-` | `MS-NPP-01-don-hang.html` |
| Modal trong màn hình | `MS-WXX-M` | `MS-W01-M01-modal-tao-npp.html` |

---

## 🎨 Multi-state trong 1 file

### [APP] Mobile — Full-flow (mặc định)

- **Một khung phone** duy nhất; các màn (list → form → confirm…) là `.screen` ẩn/hiện **bên trong** `.phone-screen`.
- User/reviewer **bấm Back, nút hành động, bottom sheet** như app thật — **không** dùng thanh tab dev trên đầu file.
- Mẫu: `mobile/vieng-tham/dat-hang/MS-A-DH01-bang-gia-si-full-flow.html`

```html
<div class="phone">
  <div class="phone-screen">
    <div class="screen" id="scr-list">...</div>
    <div class="screen active" id="scr-form">...</div>
    <div class="screen" id="scr-confirm">...</div>
  </div>
</div>
```

### [WEB] Portal — Switcher bar

Dùng `.switcher` + `.screen-wrapper` theo `templates/web-template.html` (một state hiển thị mỗi lần).

### [APP] Gallery / so sánh layout (ngoại lệ)

Chỉ `components-gallery.html` hoặc file gallery được ghi rõ mới xếp **nhiều phone cạnh nhau** để so component — **không** áp dụng cho mockup tính năng full-flow.

---

## 💡 Tips

**Tip 1 — Capture từng section thay vì full page**
Nếu mockup dài, dùng **"Select Element"** trong Visily Extension để capture từng phần.

**Tip 2 — Test trước với template**
Mở `mockups/templates/web-template.html` hoặc `mobile-template.html` để xem chất lượng baseline trước khi bắt đầu.

**Tip 3 — Từ Visily sang Figma (tùy chọn)**
Nếu cần polish trong Figma: Visily → Share → Export as Figma design.
