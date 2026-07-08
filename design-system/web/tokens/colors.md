# Colors — [WEB] DMS Portal (ecodms)

> CSS: `mockups/web/_shared/portal-tokens.css`  
> Nguồn: portal dev live — Ant Design Pro

---

## Brand

| Token CSS | Hex | Khi dùng |
|-----------|-----|----------|
| `--portal-brand` | `#2B579A` | Header, tab active, link, button primary |
| `--portal-brand-light` | `#3A6CB5` | Menu hover, button hover |
| `--portal-brand-dark` | `#244A83` | Pressed state |
| `--portal-brand-yellow` | `#FFCC33` | Logo ecodms icon |
| `--portal-menu-bg` | `#2C4475` | Mega menu dropdown |
| `--portal-role-green` | `#5BD8A6` | Badge 「Vai trò: …」 (live) |
| `--portal-role-green-solid` | `#1CBC77` | Tag 「Bộ Lọc」 active (live) |
| `--portal-user-orange` | `#F59E0B` | User button header |

**Lưu ý:** Mockup cũ dùng `#1E3A8A` / `#3B82F6` — **không khớp** portal thật. Đã đổi sang `#2B579A`.

---

## Surface & text

| Token | Giá trị | Khi dùng |
|-------|---------|----------|
| `--portal-bg` | `#F0F2F5` | Nền page |
| `--portal-surface` | `#FFFFFF` | Card, table, input |
| `--portal-text` | `rgba(0,0,0,0.88)` | Text chính |
| `--portal-text-secondary` | `rgba(0,0,0,0.65)` | Label phụ |
| `--portal-border` | `#F0F0F0` | Card, table row |

---

## Status tag (Ant Tag)

| Variant | Nền | Chữ | Ví dụ portal |
|---------|-----|-----|--------------|
| Success | `#F6FFED` | `#52C41A` | Bình thường |
| Warning | `#FFFBE6` | `#FAAD14` | Chờ duyệt |
| Error | `#FFF2F0` | `#FF4D4F` | Từ chối |
| Default | `#FAFAFA` | secondary | FVC, nháp |
| Orange (company) | `#FFF7E6` | `#D46B08` | Công ty: FINVIET |
| Blue (entity) | `#E6F4FF` | `#0958D9` | FINVIET |
| Green solid | `#5BD8A6` / `#1CBC77` | `#FFFFFF` | Vai trò, Bộ Lọc |

---

## Dashboard KPI gradient

| Card | Gradient |
|------|----------|
| Đơn hàng | `#667EEA` → `#764BA2` |
| Doanh số | `#4FACFE` → `#00F2FE` |
| Doanh thu | `#43E97B` → `#38F9D7` |
| Viếng thăm | `#11998E` → `#38EF7D` |
| Cửa hàng mới | `#F093FB` → `#F5576C` |

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Quét portal dev |
| 1.1 | 24/06/2026 | Browser MCP — tag orange/blue/green live |
