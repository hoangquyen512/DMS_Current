# Mockups Web — DMS Portal

## Cấu trúc folder

```
mockups/web/
├── main.html              ← Trang hub Dashboard + menu 3 cấp
├── menu-tree.js           ← Cây menu (sinh từ Menu_DMS.xlsx)
├── menu_data.json         ← Dữ liệu menu export từ Excel
├── _specs/                ← File spec .md (không phải mockup HTML)
├── quan-tri/              ← Level 1
├── mua-hang/
├── giam-sat/
├── danh-muc/
├── bao-cao/
└── ho-tro-phan-mem/
```

Mỗi **Level 1** là một thư mục. Bên trong lồng tiếp theo **Level 2 → Level 3 → Level 4** (nếu có), tên folder = **slug** không dấu của tên menu.

**Ví dụ đường dẫn mockup:**

| Menu | Folder |
|------|--------|
| Giám sát → Định tuyến | `giam-sat/dinh-tuyen/` |
| Danh mục → CTTB → Thông tin trả thưởng theo giai đoạn | `danh-muc/chuong-trinh-trung-bay/thong-tin-tra-thuong-theo-giai-doan/` |
| Danh mục → Tài sản → Kho tài sản | `danh-muc/tai-san/kho-tai-san/` |
| Mua hàng → Đơn hàng | `mua-hang/don-hang/` |

## Quy tắc đặt file mockup

```
mockups/web/{l1-slug}/{l2-slug}/{l3-slug}/{MS-CODE}-{ten-man-hinh}.html
```

- File HTML đặt tại **folder lá** tương ứng mục menu Level 3 (hoặc L2 nếu không có L3).
- Nhiều mockup cùng màn hình → cùng folder (vd: CK01–CK04 trong `kho-tai-san/`).
- `main.html` link qua `menu-tree.js` — mục có mockup hiển thị badge **MOCKUP**.

## Tái tổ chức khi menu thay đổi

1. Cập nhật `D:\Menu_DMS.xlsx`
2. Export lại `menu_data.json` (hoặc chạy export Confluence/menu)
3. Chạy:

```bat
powershell -ExecutionPolicy Bypass -File scripts\reorganize-mockup-web.ps1
```

Script sẽ: tạo folder theo menu, di chuyển file theo `$fileFolderMap`, cập nhật `menu-tree.js`.

## Mở mockup

Double-click `main.html` → menu → chọn mục có badge MOCKUP.

Hoặc mở trực tiếp file HTML trong folder con.
