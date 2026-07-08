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
│   └── web-template.html      ← Base template cho Portal HO/NPP
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

**Component portal:** xem `web/_shared/README-COMPONENTS.md` và `design-system/web/patterns/list-screen.md`. Mọi trang con load `portal-chrome.css` → tự có visual Ant Design Pro (kể cả HTML class cũ).

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

Mỗi file HTML nên có 2-3 states hiển thị cạnh nhau:
```html
<!-- State 1: Default — có data -->
<div class="phone">...</div>

<!-- State 2: Empty state -->
<div class="phone">...</div>

<!-- State 3: Error (nếu cần) -->
<div class="phone">...</div>
```

→ Mở file → thấy cả 3 states cùng lúc, dễ so sánh và review.

---

## 💡 Tips

**Tip 1 — Capture từng section thay vì full page**
Nếu mockup dài, dùng **"Select Element"** trong Visily Extension để capture từng phần.

**Tip 2 — Test trước với template**
Mở `mockups/templates/web-template.html` hoặc `mobile-template.html` để xem chất lượng baseline trước khi bắt đầu.

**Tip 3 — Từ Visily sang Figma (tùy chọn)**
Nếu cần polish trong Figma: Visily → Share → Export as Figma design.
