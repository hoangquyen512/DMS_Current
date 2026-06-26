# Table — [WEB] DMS Portal

> Class: `.portal-table`, `.portal-table-wrap`

## Chuẩn từ màn Tin tức

| Cột type | Quy tắc |
|----------|---------|
| Link | Màu `#2B579A`, click vào detail |
| Copy | Icon copy cạnh Mã / SĐT (`.copy-btn`) |
| Sort | Icon ↕ trên header (`.sort-icon`) |
| Tag | `.portal-tag--success` cho trạng thái |
| Toolbar | 「Tạo mới」primary + actions phụ |

## Toolbar mẫu

```
Danh sách tin tức                    [Tạo mới]
```

## Pagination

- Text: `1-2 trên 2 tin tức`
- Page size: `10 / trang` (dropdown)
- Class: `.portal-pagination`

## HTML mẫu

```html
<div class="portal-toolbar">
  <strong>Danh sách tin tức</strong>
  <div class="portal-toolbar__actions">
    <button type="button" class="portal-btn portal-btn--primary">Tạo mới</button>
  </div>
</div>
<div class="portal-table-wrap">
  <table class="portal-table">...</table>
</div>
```

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Màn /category/news |
