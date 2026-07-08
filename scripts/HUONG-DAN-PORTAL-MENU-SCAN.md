# Quét toàn bộ menu portal dev

## Chạy tự động (khuyến nghị)

1. Cài **Node.js 18+**
2. Double-click: `scripts/run-portal-menu-scan.bat`
3. Điền `.env` (copy từ `extract-portal-design/.env.example`) nếu chưa có
4. Chromium mở → SSO → duyệt **tất cả** mục mega menu L1/L2/L3
5. Output: `design-system/web/extract/portal-menu-full-scan.json`

## Script làm gì?

| Bước | Mô tả |
|------|--------|
| 1 | Đăng nhập SSO |
| 2 | Hover từng nhánh L1: Quản trị, Mua hàng, Giám sát, Danh mục, Báo cáo, Hỗ trợ PM |
| 3 | Thu thập link L2 + L3 (menu lồng nhau) |
| 4 | Vào từng URL, quét component (table, select, switch, form…) |
| 5 | Ghi JSON + summary theo nhánh |

## File output

| File | Nội dung |
|------|----------|
| `portal-menu-urls.json` | Danh sách URL đã biết (snapshot thủ công) |
| `portal-menu-full-scan.json` | Kết quả sau khi chạy script đầy đủ |
| `portal-admin-scan.json` | [Tùy chọn] Chỉ nhánh Quản trị |

## Chạy trong Cursor (Browser MCP)

Agent có thể quét từng nhánh khi bạn yêu cầu (vd: "Quét nhánh Danh mục").  
Mega menu có menu lồng 3 cấp → **Playwright ổn định hơn** Browser MCP.

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Script scan-all.mjs + run-portal-menu-scan.bat |
