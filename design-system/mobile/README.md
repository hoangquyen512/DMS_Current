# Design System — [APP] DMS Salesman (Mobile)

> Chuẩn UI cho Salesman App, trích từ `app_1_9_21.apk` (eco-salesman / React Native + NativeWind).  
> Dùng làm format chung khi viết spec, gen mockup HTML và review UI.

---

## Cấu trúc

```
design-system/mobile/
├── README.md                 ← File này
├── tokens/
│   ├── colors.md             ← Palette + semantic
│   ├── typography.md         ← Text styles
│   └── spacing.md            ← Spacing, radius, shadow
└── components/
    ├── _index.md             ← Inventory component
    ├── buttons.md
    ├── inputs.md
    ├── navigation.md
    ├── headers.md
    ├── tabs.md
    ├── cards.md
    ├── badges.md
    └── lists.md

mockups/mobile/_shared/
├── mockup-tokens.css         ← CSS variables (nguồn màu/spacing)
├── app-components.css        ← Class component chuẩn (.app-*)
├── mockup-shell.css          ← Khung phone + status bar + .status-portal-link
├── app-chrome.css            ← Hub: tab bar + layout main.html
├── mockup-fit.js             ← Scale viewport + auto inject icon 🌐
└── STATUS-BAR-SNIPPET.md     ← ⭐ Icon web → DMS Portal (bắt buộc mọi màn)
```

### Status bar — Icon DMS Portal

Mọi mockup **[APP]** phải có link `status-portal-link` (🌐) trên status bar → `web/main.html`. Xem `mockups/mobile/_shared/STATUS-BAR-SNIPPET.md`.

---

## Quy trình khi thiết kế mới

1. Đọc **pattern** → `patterns/mobile/[list|form|detail]-screen.md`
2. Chọn **component** → `components/_index.md` → file chi tiết
3. Áp **token** → `tokens/colors.md`, `typography.md`, `spacing.md`
4. Gen mockup HTML → import `mockup-shell.css` + dùng class `.app-*` từ `app-components.css`
5. Tham chiếu gallery → `mockups/mobile/components-gallery.html`

---

## Quy tắc bắt buộc

| # | Quy tắc |
|---|---------|
| 1 | **KHÔNG** tự bịa màu — dùng token `--app-primary`, `--neutral-*` |
| 2 | **KHÔNG** tạo class CSS mới nếu đã có `.app-*` tương đương |
| 3 | Primary button: tối đa **1** / section / footer |
| 4 | Header primary (`--app-primary`) cho màn có back + title trên nền brand |
| 5 | Viewport mockup: **375 × 812** px (`mockup-shell.css`) |
| 6 | Field `* Công ty` luôn đầu tiên trong form (quy tắc BA workspace) |

---

## Mapping APK → Design System

| APK (bundle) | Token / Class |
|--------------|---------------|
| `colors_brand_primary` | `--app-primary` `#009ADD` |
| `button_surface_brand` | `.app-btn--primary` |
| `button_surface_light` | `.app-btn--light` |
| `tabBarActiveTintColor` | `.nav-item.active`, `.app-tab--active` |
| `tabBarInactiveTintColor` | `--tab-inactive` |
| `border_radius_md/lg/xl` | `--radius-md/lg/xl` |

Chi tiết trích xuất: `mockups/mobile/_specs/APK-DESIGN-TOKENS.md`

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Khởi tạo DS mobile từ APK v1.9.21 + `app-components.css` |
| 1.1 | 08/07/2026 | Chuẩn icon 🌐 status bar → DMS Portal (`STATUS-BAR-SNIPPET.md`) |
