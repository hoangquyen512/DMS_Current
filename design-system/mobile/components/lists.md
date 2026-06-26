# List — [APP] Salesman Mobile

> Layout scroll + section + empty state

---

## Structure

```
.app-scroll          ← flex 1, overflow-y auto, nền --neutral-50
  .app-section-hd    ← tiêu đề section
  .app-list          ← wrapper (optional)
    .app-card × n
  .app-empty         ← khi không có data
```

---

## Section header

| Class | Spec |
|-------|------|
| `.app-section-hd` | padding 12px 16px 8px, 15px/700, nền `--neutral-50` |
| `.app-filter-row` | Hàng "Bộ lọc" + chevron |

---

## Empty state

| Class | Mô tả |
|-------|-------|
| `.app-empty` | flex column, center, padding 48px 24px |
| `.app-empty__icon` | 48px emoji/icon |
| `.app-empty__title` | 16px / 600 |
| `.app-empty__desc` | 14px, `--neutral-500` |

---

## Infinite scroll / loading

- Skeleton: `.app-skeleton` — pulse animation, height 72px, margin 8px 12px
- Footer spinner: `.app-list-loader` — padding 16px, text-center

---

## Quy tắc

- Default sort: mới nhất trước
- Pull-to-refresh: [CẦN XÁC NHẬN] behavior mockup — hiển thị text hint
- Page size: 20 items [CẦN XÁC NHẬN]

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Pattern list-screen |
