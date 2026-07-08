# Design System — [WEB] DMS Portal

> Chuẩn UI từ **dms-portal-dev.finviet.com.vn** (Ant Design Pro / ecodms).  
> Quét live: dashboard + Danh mục → Tin tức (24/06/2026).

---

## Cấu trúc

```
design-system/web/
├── README.md                 ← File này
├── tokens/
│   ├── colors.md
│   ├── typography.md
│   └── spacing.md
└── components/
    ├── _index.md
    ├── navigation.md         ← Header L1 + mega menu
    ├── breadcrumbs.md
    ├── buttons.md
    ├── inputs.md
    ├── filters.md
    ├── tables.md
    ├── tags.md
    ├── cards.md
    └── pagination.md

mockups/web/_shared/
├── portal-tokens.css         ← CSS variables
├── portal-components.css     ← Class .portal-*
├── portal-chrome.css         ← Header ecodms
└── portal-chrome.js

mockups/web/components-gallery.html

design-system/web/extract/          ← Snapshot JSON + screenshots (sau khi chạy script)
```

**Cập nhật từ portal live:** `scripts/run-portal-extract.bat` (cần Node.js + tài khoản SSO).

---

## Quy trình thiết kế mới

1. Pattern → `patterns/web/[list|form|detail]-screen.md`
2. Component → `components/_index.md`
3. Token → `tokens/*.md` + `portal-tokens.css`
4. Mockup HTML → import `portal-chrome.css`, dùng class `.portal-*`

---

## Đặc điểm portal thật

| Thành phần | Ghi chú |
|------------|---------|
| Framework | Ant Design Pro (`ant-*` classes) |
| Header | Nền `#2B579A`, cao 56px |
| Mega menu | Nền `#2C4475`, hover `#3A6CB5` |
| Trang list | Breadcrumb + filter card + table + pagination |
| Nút chính | 「Tạo mới」— primary brand blue |
| Tag trạng thái | Xanh lá 「Bình thường」 |

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Trích từ portal dev live |
| 1.1 | 24/06/2026 | Browser MCP — snapshot `extract/portal-live-snapshot.json` |
