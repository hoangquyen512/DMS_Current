# Tabs — [APP] Salesman Mobile

> Class: `.app-tabs`, `.app-tab`, `.app-seg`, `.app-seg-btn`

---

## Underline tabs

Dùng chuyển view cùng cấp (vd: Bản đồ / Danh sách).

| Class | State |
|-------|-------|
| `.app-tabs` | Container, border-bottom `--neutral-100` |
| `.app-tab` | 14px, `--neutral-500`, flex 1 |
| `.app-tab--active` | `--app-primary`, weight 600, gạch dưới 3px |

Tương đương mockup cũ: `.map-tab`, `.map-tab.active`

---

## Segment pill (trên nền brand)

Dùng filter thời gian, phân loại đơn.

| Class | State |
|-------|-------|
| `.app-seg` | Nền `rgba(255,255,255,.2)`, radius full |
| `.app-seg-btn` | Chữ trắng 85% opacity |
| `.app-seg-btn--active` | Nền trắng, chữ `--app-primary` |

---

## Period tabs (báo cáo)

| Class | Mô tả |
|-------|-------|
| `.period-tabs` / `.period-tab` | Trong `app-chrome.css` — giữ cho tab Báo cáo hub |

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Gom map-tab + seg-btn |
