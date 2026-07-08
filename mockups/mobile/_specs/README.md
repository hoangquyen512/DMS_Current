# Mockups Mobile — Salesman App

## Cấu trúc folder

```
mockups/mobile/
├── main.html              ← Entry point: 4 tab bottom nav (giống app thật)
├── menu-tree.js           ← Cây menu tab + mockup con
├── menu_data.json         ← Dữ liệu menu (JSON)
├── _shared/               ← CSS/JS dùng chung
│   ├── app-chrome.css     ← Tab bar + status (main)
│   ├── mockup-shell.css   ← Khung phone 375×812 (mọi sub-page)
│   ├── mockup-tokens.css  ← Màu brand từ APK (#009add)
│   ├── app-components.css ← Class .app-* chuẩn
│   ├── mockup-fit.js      ← Scale phone + auto inject icon 🌐 nếu thiếu
│   └── STATUS-BAR-SNIPPET.md ← ⭐ Snippet status bar + icon DMS Portal
├── components-gallery.html ← Gallery Design System
├── vieng-tham/            ← Tab Viếng thăm (Flow A)
│   ├── chi-tiet-cua-hang/
│   ├── tai-san/           ← MS-A-TS00 full flow (dùng chung Flow A + B)
│   └── ton-kho/           ← MS-A-TK00 full flow (dùng chung Flow A + B)
├── khac/                  ← Tab Khác (Flow B)
│   └── cua-hang/          ← Danh sách CH + Tác vụ cửa hàng
├── tai-xe/                ← Chế độ Tài xế — thay toàn bộ app shell
│   ├── MS-A-GH01-giao-hang-don-hang.html   ← App Tài xế (1 file, multi-view)
│   └── MS-A-DL03-ocr-don-giao-hang.html    ← redirect → GH01#ocr
├── bao-cao/
└── don-hang/
```

## Luồng mockup tài sản

### Flow A — Viếng thăm
`main` → **Viếng thăm** → `MS-A-VT01` → **Kiểm tra tài sản** → `MS-A-TS00?from=vt`

### Flow B — Khác → Chăm sóc
`main#khac` → **Cửa hàng** → `MS-A-CH02` (tab Chăm sóc) → chọn CH → `MS-A-CH03` → **Kiểm tra tài sản** / **Giao tài sản** → `MS-A-TS00?from=ch`

| Màn hình | File |
|----------|------|
| Danh sách cửa hàng | `khac/cua-hang/MS-A-CH02-danh-sach-cua-hang.html` |
| Tác vụ cửa hàng | `khac/cua-hang/MS-A-CH03-tac-vu-cua-hang.html` |
| Tài sản full flow (8 bước) | `vieng-tham/tai-san/MS-A-TS00-kiem-tra-tai-san-full-flow.html` |

**MS-A-TS00** gom toàn bộ: Dashboard · Kiểm tra tình trạng · Đăng ký · **Chọn cửa hàng** · **Thêm tài sản** · Chi tiết đơn · Giao tài sản.

| Bước đăng ký | Màn hình | Cách vào |
|--------------|----------|----------|
| Chọn cửa hàng | `scr-pick-store` | Tap * Cửa hàng trên form · Flow A: + Đăng ký mới |
| Thêm tài sản | `scr-pick-asset` | + Thêm / ➕ Thêm tài sản (sau khi đã chọn CH) |

Query `?screen=giao` · `?screen=chon-ch` · `?screen=them-ts` mở thẳng bước tương ứng.

## Luồng mockup tồn kho sản phẩm

### Flow A — Viếng thăm
`main` → **Viếng thăm** → `MS-A-VT01` → **Kiểm tra tồn kho** → `MS-A-TK00?from=vt`

### Flow B — Khác → Chăm sóc
`main#khac` → **Cửa hàng** → `MS-A-CH02` → chọn CH → `MS-A-CH03` → **Kiểm tra tồn kho** → `MS-A-TK00?from=ch`

| Màn hình | File |
|----------|------|
| Tồn kho full flow (4 bước) | `vieng-tham/ton-kho/MS-A-TK00-kiem-tra-ton-kho-full-flow.html` |

**MS-A-TK00** gom: Danh sách SP · Lịch sử · Thêm sản phẩm · Nhập tồn kho (HSD) · Chi tiết tồn kho.

| Query | Màn hình |
|-------|----------|
| `?from=vt` | Flow A — CH: hellohuong, back → VT01 |
| `?from=ch` | Flow B — CH: Bidy, back → CH03 |
| `?screen=empty` | Empty state |
| `?screen=pick` | Thêm sản phẩm |
| `?screen=detail&sku=...` | Chi tiết tồn kho |

Mockup cũ tham khảo: `vieng-tham/ton-kho/_archive/MS-A-KTTKSP01-*`

## Luồng mockup báo cáo viếng thăm cửa hàng

### Flow A — Viếng thăm / Tab Báo cáo
`main#bao-cao` → KPI **Viếng thăm** → `MS-A-BCVT00?from=vt`

Hoặc: `main` → VT01 → **Báo cáo viếng thăm** → `MS-A-BCVT00?from=vt&entry=vt01`

### Flow B — Chăm sóc
`main#khac` → CH02 → CH03 → **Báo cáo viếng thăm** → `MS-A-BCVT00?from=ch`

| Màn hình | File |
|----------|------|
| Báo cáo VT full flow (5 bước) | `bao-cao/vieng-tham/MS-A-BCVT00-bao-cao-vieng-tham-full-flow.html` |

**MS-A-BCVT00** gom: Dashboard (tab VT + Đơn hàng) · Bộ lọc · Chi tiết VT cửa hàng.

| Query | Màn hình / hành vi |
|-------|-------------------|
| `?from=vt` | Flow A — phạm vi tuyến VT, back → `main#bao-cao` |
| `?from=vt&entry=vt01` | Flow A từ VT01, back → VT01 |
| `?from=ch` | Flow B — phạm vi CH chăm sóc, back → CH03 |
| `?screen=filter` | Mở bộ lọc |
| `?screen=orders` | Dashboard tab đơn hàng |
| `?screen=store&store=hellohuong` | Chi tiết cửa hàng |

Mockup cũ tham khảo: `bao-cao/vieng-tham/_archive/MS-01-*`

## Luồng mockup Chế độ Tài xế

Khi bấm **Tài xế** (tab Khác SR) → **toàn bộ app** chuyển sang shell Tài xế (`tai-xe/main.html`), thay bottom nav:

**Giao hàng · Báo cáo · OCR · Khác** (không còn Viếng thăm / Báo cáo SR / Đơn hàng).

### Entry
`main#khac` → icon **Tài xế** (hàng profile) → `tai-xe/main.html`

### Màn hình

| Màn hình | File | Ghi chú |
|----------|------|---------|
| **App Tài xế (main)** | `tai-xe/main.html` | Shell GH01 — danh sách đơn, giao, OCR, báo cáo, Khác |
| OCR chi tiết (mockup riêng) | `tai-xe/MS-A-DL03-ocr-don-giao-hang.html` | Full flow OCR tách spec |
| Alias GH01 | `tai-xe/MS-A-GH01-*.html` | Redirect → `main.html` |

| Hash `main.html` | Tab |
|------------------|-----|
| (mặc định) | Giao hàng — danh sách đơn |
| `#report` | Báo cáo |
| `#ocr` | OCR |

Tab **Khác** (Tài xế): profile + menu + nút **SR** quay `main.html#khac`.

## Kích thước UI chuẩn

Mọi mockup mobile dùng **một khung duy nhất** qua `_shared/mockup-shell.css`:

| Token | Giá trị |
|-------|---------|
| Viewport | **375 × 812** px |
| Status bar | 44 px |
| Bezel padding | 12 px |
| **Brand primary** | `#009add` (`--app-primary`) — từ APK v1.9.21 |
| Primary dark | `#058ad0` (`--app-primary-dark`) |
| Primary light | `#e4eff8` (`--app-primary-light`) |
| Text / Tab inactive | `#292d32` / `#98a2b3` |
| Success / Error | `#02b46e` / `#cc3b29` |

Chi tiết trích xuất: `_specs/APK-DESIGN-TOKENS.md`

Sub-page: `<body class="mockup-page">` + `mockup-shell.css` + `mockup-fit.js`  
Main hub: `app-chrome.css` (đã import shell) + `mockup-fit.js`.

**Viewport fit:** `mockup-fit.js` tự scale khung phone để nằm trọn trong cửa sổ browser (không scroll trang). Resize/orientation → tự cập nhật.

## Icon DMS Portal trên Status Bar (BẮT BUỘC)

Mọi màn hình mobile **phải có icon 🌐** (hoặc Tabler `ti-world` ở shell Tài xế) trên status bar — góc phải, trước icon sóng/pin — link tới `mockups/web/main.html`.

➡️ Snippet + quy tắc: `_shared/STATUS-BAR-SNIPPET.md`  
➡️ Template mẫu: `mockups/templates/mobile-template.html`

## Tái tổ chức khi thêm mockup mới

```powershell
powershell -ExecutionPolicy Bypass -File DMS_Salesman_mockup/scripts/reorganize-mockup-mobile.ps1
```
