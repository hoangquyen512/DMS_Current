# Card — [APP] Salesman Mobile

> Class: `.app-card` và modifiers

---

## List card (cửa hàng, đơn)

| Phần | Class | Spec |
|------|-------|------|
| Card | `.app-card` | margin 8px 12px, padding 12px, radius `--radius-xl`, shadow sm |
| Header row | `.app-card__hd` | flex, gap 8px |
| Title | `.app-card__title` | 14px / 700, `--neutral-900` |
| Meta | `.app-card__meta` | 12px, `--neutral-500` |
| Body text | `.app-card__text` | 12px, line-height 1.4 |
| Footer CTA | `.app-card__actions` | margin-top 8px |

Alias tương thích: `.visit-card` trong `app-chrome.css`

---

## KPI / stat card

| Class | Spec |
|-------|------|
| `.app-stat-card` | flex 1, border `--neutral-200`, radius 10px, text-center |
| `.app-kpi-item` | flex row, icon 40px + text |

---

## Quy tắc

- Card clickable: thêm `.app-card--pressable` (active scale nhẹ)
- Không nest card trong card
- Icon accent: màu `--app-primary`

---

## HTML mẫu

```html
<article class="app-card">
  <div class="app-card__hd">
    <span class="app-card__icon">📍</span>
    <span class="app-card__title">Hoàng Việt Restaurant</span>
    <span class="app-card__meta">33m</span>
  </div>
  <p class="app-card__text">0908706789</p>
  <p class="app-card__text">34 Hoàng Việt, Q. Tân Bình</p>
  <div class="app-card__actions">
    <button class="app-btn app-btn--primary app-btn--block">Viếng thăm</button>
  </div>
</article>
```

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Chuẩn visit-card |
