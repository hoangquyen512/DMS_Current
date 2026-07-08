# DEPLOY — Render.com (DMS Portal Mockup)

Hướng dẫn deploy mockup DMS Portal + Salesman App lên **[Render](https://render.com)** — workflow tương tự project web Python/Node đã dùng Render trước đây.

> **Repo khuyến nghị:** [github.com/vudq170/DMS_Salesman_mockup](https://github.com/vudq170/DMS_Salesman_mockup.git)  
> (đã có `Dockerfile`, `render.yaml`, `server/mock`, `scripts/run_local_server.py`)

---

## 1. URL sau deploy

| Mục đích | URL |
|----------|-----|
| Portal (mặc định) | `https://<tên-service>.onrender.com/` |
| Dashboard | `https://<tên-service>.onrender.com/main.html` |
| Mobile App | `https://<tên-service>.onrender.com/mobile/main.html` |
| Health check | `https://<tên-service>.onrender.com/health` |
| Mock API | `https://<tên-service>.onrender.com/api/*` |

Render tự cấp domain `*.onrender.com`. Có thể gắn custom domain sau (Settings → Custom Domains).

---

## 2. Chuẩn bị — Push code lên GitHub

Trong thư mục `DMS_Salesman_mockup/`:

```bash
git add Dockerfile render.yaml requirements.txt .dockerignore
git add server/ scripts/run_local_server.py
git add mockups/
git commit -m "feat: add Render production deploy (Docker + mock API)"
git push origin Qin/DMS_Current
# hoặc push lên branch main nếu Render track main
```

**Không push:** file `.env`, credential, dữ liệu Confluence nội bộ.

---

## 3. Cách A — Blueprint (khuyến nghị, 1 click)

Giống flow **New → Blueprint** trên Render:

1. Đăng nhập [dashboard.render.com](https://dashboard.render.com)
2. **New +** → **Blueprint**
3. Connect GitHub → chọn repo `DMS_Salesman_mockup`
4. Chọn branch (vd: `Qin/DMS_Current` hoặc `main`)
5. Render đọc `render.yaml` và tạo Web Service `dms-mockup`
6. **Apply** → chờ build Docker (~3–5 phút lần đầu)
7. Mở URL service → thấy DMS Portal dashboard

`render.yaml` đã cấu hình:
- Runtime: **Docker**
- Region: **Singapore** (gần VN)
- Health check: `/health`
- `APP_ENV=production`, `MOCK_API_ENABLED=true`
- `PORT` do Render tự inject (server đã hỗ trợ)

---

## 4. Cách B — Tạo Web Service thủ công

Nếu không dùng Blueprint:

1. **New +** → **Web Service**
2. Connect repo `DMS_Salesman_mockup`
3. Cấu hình:

| Trường | Giá trị |
|--------|---------|
| Name | `dms-mockup` |
| Region | Singapore |
| Branch | `Qin/DMS_Current` (hoặc branch của bạn) |
| Runtime | **Docker** |
| Dockerfile path | `./Dockerfile` |
| Instance type | Free (hoặc Starter nếu cần luôn online) |

4. **Environment Variables:**

| Key | Value |
|-----|-------|
| `APP_ENV` | `production` |
| `MOCK_API_ENABLED` | `true` |

> **Không** set `PORT` — Render tự gán.

5. **Health Check Path:** `/health`
6. **Create Web Service** → Deploy

---

## 5. Cách C — Python native (không Docker)

Tuỳ chọn nếu muốn build nhanh hơn (không cần Docker layer):

| Trường | Giá trị |
|--------|---------|
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `python scripts/run_local_server.py` |
| Health Check | `/health` |

Env vars giống Cách B. File `requirements.txt` trống (chỉ dùng Python stdlib).

---

## 6. Free tier — lưu ý quan trọng

| Đặc điểm | Mô tả |
|----------|-------|
| Cold start | Sau ~15 phút không truy cập, service **ngủ** → lần mở đầu **30–60 giây** |
| Spin down | Bình thường với demo/mockup — chấp nhận được |
| Nâng cấp | Plan **Starter** ($7/tháng) → không sleep, phản hồi nhanh hơn |

Thông báo cho người dùng: *"Lần đầu mở link có thể chờ ~1 phút"*.

---

## 7. Cập nhật mockup sau khi đã deploy

```bash
# Sửa mockup local → commit → push
git push origin Qin/DMS_Current
```

Render **auto-deploy** nếu bật trong Settings → **Auto-Deploy: Yes** (mặc định với Blueprint).

Theo dõi log: Dashboard → Service → **Logs** / **Events**.

---

## 8. Custom domain (tuỳ chọn)

1. Service → **Settings** → **Custom Domains**
2. Thêm domain (vd: `dms-mockup.finviet.com.vn`)
3. Cấu hình DNS CNAME trỏ về `*.onrender.com` theo hướng dẫn Render
4. Bật **Force HTTPS**

---

## 9. Kiểm tra sau deploy

```bash
# Health
curl https://<tên-service>.onrender.com/health

# Mock API
curl https://<tên-service>.onrender.com/api/dashboard/summary
```

Trình duyệt:
- Mở `/` → dashboard Portal
- Mở `/mobile/main.html` → Salesman App
- F12 → Network: request `/api/*` trả 200

---

## 10. Xử lý sự cố

| Triệu chứng | Cách xử lý |
|-------------|------------|
| Build Docker fail | Xem **Logs** → thiếu file `mockups/` hoặc `server/mock` chưa commit |
| 502 / Deploy failed | Kiểm tra `/health` — server phải listen `PORT` env (đã hỗ trợ) |
| Trang trắng, API lỗi | Đặt `MOCK_API_ENABLED=true` |
| Chờ rất lâu lần đầu | Free tier cold start — đợi hoặc nâng Starter |
| `Module not found` | Dùng Docker (Cách A/B), không cần package pip |

---

## 11. So sánh với deploy khác

| Phương án | Khi nào dùng |
|-----------|--------------|
| **Render (file này)** | Demo public, team remote, auto-deploy từ GitHub |
| `production.cmd` | LAN nội bộ Windows, không cần internet |
| `docker compose` | VPS riêng, kiểm soát full server |
| GitHub Pages | Chỉ HTML tĩnh — **không** có Mock API |

Chi tiết deploy tổng quát: [DEPLOY.md](../DEPLOY.md) (thư mục workspace gốc).

---

## Change History

| Ngày | Phiên bản | Mô tả |
|------|-----------|-------|
| 08/07/2026 | 1.0 | Thêm hướng dẫn Render + Blueprint `render.yaml` |
