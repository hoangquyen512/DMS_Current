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
│   └── mockup-tokens.css  ← Màu brand #1a9ad6 (mọi mockup)
├── vieng-tham/            ← Tab Viếng thăm (Flow A)
│   ├── chi-tiet-cua-hang/
│   ├── tai-san/           ← MS-A-TS00 full flow (dùng chung Flow A + B)
│   └── ton-kho/           ← MS-A-TK00 full flow (dùng chung Flow A + B)
├── khac/                  ← Tab Khác (Flow B)
│   └── cua-hang/          ← Danh sách CH + Tác vụ cửa hàng
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

## Kích thước UI chuẩn

Mọi mockup mobile dùng **một khung duy nhất** qua `_shared/mockup-shell.css`:

| Token | Giá trị |
|-------|---------|
| Viewport | **375 × 812** px |
| Status bar | 44 px |
| Bezel padding | 12 px |
| **Brand primary** | `#1a9ad6` (`--app-primary`) |
| Primary dark | `#1580b5` (`--app-primary-dark`) |
| Primary light | `#e8f6fc` (`--app-primary-light`) |

Sub-page: `<body class="mockup-page">` + `mockup-shell.css` + `mockup-fit.js`  
Main hub: `app-chrome.css` (đã import shell) + `mockup-fit.js`.

**Viewport fit:** `mockup-fit.js` tự scale khung phone để nằm trọn trong cửa sổ browser (không scroll trang). Resize/orientation → tự cập nhật.

## Tái tổ chức khi thêm mockup mới

```powershell
powershell -ExecutionPolicy Bypass -File DMS_Salesman_mockup/scripts/reorganize-mockup-mobile.ps1
```
