# Navigation — [APP] Salesman Mobile

> Bottom tab + status bar: `app-chrome.css`. Sub-header: `app-components.css`

---

## Bottom tab bar (hub)

| Phần | Class | Spec |
|------|-------|------|
| Container | `.bottom-nav` | Height 64px, nền trắng, shadow top |
| Item | `.nav-item` | Icon 24px + label 11px |
| Active | `.nav-item.active` | Màu `--app-primary`, weight 600 |
| Inactive | `.nav-item` | `--tab-inactive` |
| Badge | `.nav-badge` | `--badge-red`, min 18px, góc icon |

4 tab chuẩn: Viếng thăm · Báo cáo · Đơn hàng · Khác

---

## Status bar

| Class | Spec |
|-------|------|
| `.status-bar` | 44px, nền trắng hoặc `.on-primary` |
| `.status-bar.on-primary` | Nền brand, chữ trắng (màn báo cáo) |

---

## Route bar (Viếng thăm)

| Class | Mô tả |
|-------|-------|
| `.route-bar` | Pill chọn tuyến, nền `--neutral-50` |

---

## Quy tắc

- Tab bar chỉ trên `main.html` hub
- Sub-page: back arrow → màn trước, không hiện bottom tab
- Deep link mockup: query `?from=vt|ch` giữ flow A/B

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Map tabBar*TintColor APK |
