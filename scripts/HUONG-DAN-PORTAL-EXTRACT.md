# Hướng dẫn trích Design System từ Portal Dev

## Mục tiêu

Sau khi đăng nhập `dms-portal-dev.finviet.com.vn`, script thu thập:

- Screenshot các màn mẫu
- Computed style của component Ant Design (button, table, header…)
- Danh sách class `ant-*` / `ant-pro-*` đang dùng

Output: `design-system/web/extract/`

---

## Yêu cầu (máy local)

1. **Node.js 18+** — https://nodejs.org/
2. Tài khoản SSO Finviet (eco-account-dev)
3. Mạng công ty / VPN (nếu portal chặn IP ngoài)

---

## Cách chạy

1. Double-click `scripts/run-portal-extract.bat`
2. Lần đầu: file `.env` mở ra → điền `PORTAL_USER`, `PORTAL_PASS`
3. Chromium mở **không headless** — quan sát luồng SSO, chỉnh selector trong `extract.mjs` nếu form khác
4. Kết quả:
   - `design-system/web/extract/portal-live-snapshot.json`
   - `design-system/web/extract/screenshots/*.png`

---

## Trích public (không cần đăng nhập)

```powershell
powershell -File scripts/extract-portal-public.ps1
```

→ `design-system/web/extract/public-css-snapshot.json` từ `/umi.css`

---

## Dùng kết quả cho mockup BA

| Nguồn | Áp dụng vào |
|-------|-------------|
| `portal-live-snapshot.json` → `styles` | Cập nhật `mockups/web/_shared/portal-tokens.css` |
| `antClasses` | Bổ sung `design-system/web/components/*.md` |
| Screenshots | Reference khi gen HTML mockup / Visily |

Quy trình BA: đọc `design-system/web/README.md` → class `.portal-*` trong `portal-components.css`.

---

## Lưu ý bảo mật

- **Không commit** file `.env` chứa mật khẩu
- Đổi mật khẩu sau khi test nếu đã chia sẻ trong chat

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Script Playwright + public CSS extract |
