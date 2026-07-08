"""
DMS Portal — Local dev server (Python stdlib)
Phục vụ mockup HTML tĩnh + Mock API trên cùng một port.
Không cần Node.js / npm.
"""

from __future__ import annotations

import json
import mimetypes
import os
import sys
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

ROOT = Path(os.environ.get("APP_ROOT", str(Path(__file__).resolve().parent.parent)))


def resolve_mockup_roots(app_root: Path) -> tuple[Path, Path]:
    """Hỗ trợ layout monorepo (DMS_Salesman_mockup/mockups) và repo mockup độc lập (mockups/)."""
    flat_web = app_root / "mockups" / "web"
    if flat_web.exists():
        return flat_web, app_root / "mockups" / "mobile"
    return (
        app_root / "DMS_Salesman_mockup" / "mockups" / "web",
        app_root / "DMS_Salesman_mockup" / "mockups" / "mobile",
    )


WEB_ROOT, MOBILE_ROOT = resolve_mockup_roots(ROOT)
MOCK_DATA_DIR = ROOT / "server" / "mock" / "data"


def load_env_file(file_path: Path) -> None:
    if not file_path.exists():
        return

    for raw_line in file_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def load_json(name: str) -> dict:
    file_path = MOCK_DATA_DIR / name
    with file_path.open(encoding="utf-8") as handle:
        return json.load(handle)


class DMSLocalHandler(BaseHTTPRequestHandler):
    server_version = "DMSLocal/1.0"

    def log_message(self, fmt: str, *args) -> None:
        print(f"[server] {self.address_string()} - {fmt % args}")

    def send_json(self, payload: dict, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def send_file(self, file_path: Path) -> None:
        if not file_path.exists() or not file_path.is_file():
            self.send_error(404, "File not found")
            return

        mime_type, _ = mimetypes.guess_type(str(file_path))
        if mime_type is None:
            mime_type = "application/octet-stream"

        data = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mime_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def handle_api(self, path: str, query: dict[str, list[str]]) -> None:
        mock_enabled = os.environ.get("MOCK_API_ENABLED", "true").lower() != "false"
        if not mock_enabled:
            self.send_json(
                {
                    "error": "Mock API disabled",
                    "message": "Đặt MOCK_API_ENABLED=true trong .env.local để bật mock API.",
                },
                status=503,
            )
            return

        if path == "/api/dashboard/summary":
            self.send_json(load_json("dashboard.json"))
            return

        if path == "/api/orders":
            data = load_json("orders.json")
            status = (query.get("status") or [None])[0]
            if status:
                filtered = [item for item in data["items"] if item.get("status") == status]
                data = {
                    **data,
                    "items": filtered,
                    "pagination": {
                        **data["pagination"],
                        "total": len(filtered),
                    },
                }
            self.send_json(data)
            return

        if path.startswith("/api/orders/"):
            order_id = unquote(path.split("/api/orders/", 1)[1])
            data = load_json("orders.json")
            order = next(
                (item for item in data["items"] if item["id"] == order_id or item["code"] == order_id),
                None,
            )
            if not order:
                self.send_json(
                    {
                        "error": "Not found",
                        "message": f"Không tìm thấy đơn hàng: {order_id}",
                    },
                    status=404,
                )
                return

            self.send_json(
                {
                    **order,
                    "lines": [
                        {
                            "sku": "SKU-CF-500G",
                            "productName": "Cà phê hòa tan 3in1 gói 500g",
                            "quantity": 4,
                            "unitPrice": 185000,
                            "amount": 740000,
                        },
                        {
                            "sku": "SKU-NT-1L",
                            "productName": "Nước tương đậu nành 1L",
                            "quantity": 12,
                            "unitPrice": 42000,
                            "amount": 504000,
                        },
                    ],
                    "deliveryNotes": "Giao buổi sáng, gọi trước 15 phút.",
                    "timeline": [
                        {"status": "new", "label": "Tạo đơn", "at": "2026-06-26T07:45:00+07:00"},
                        {"status": "processing", "label": "Xác nhận kho", "at": "2026-06-26T08:05:00+07:00"},
                        {"status": "delivering", "label": "Đang giao", "at": "2026-06-26T08:20:00+07:00"},
                    ],
                }
            )
            return

        if path == "/api/customers":
            self.send_json(load_json("customers.json"))
            return

        if path == "/api/products":
            self.send_json(load_json("products.json"))
            return

        if path == "/api/delivery-routes":
            self.send_json(load_json("routes.json"))
            return

        if path == "/api/user/profile":
            self.send_json(load_json("user-profile.json"))
            return

        self.send_json(
            {
                "error": "Not found",
                "message": "Endpoint mock API không tồn tại.",
            },
            status=404,
        )

    def resolve_static_file(self, request_path: str) -> Path | None:
        clean_path = unquote(request_path.split("?", 1)[0])

        if clean_path in ("", "/"):
            return WEB_ROOT / "main.html"

        if clean_path.startswith("/mobile/"):
            relative = clean_path[len("/mobile/") :]
            candidate = (MOBILE_ROOT / relative).resolve()
            if candidate.is_relative_to(MOBILE_ROOT.resolve()):
                return candidate
            return None

        # Alias /web/* → mockups/web/* (link từ mobile mockup: ../../web/main.html)
        if clean_path == "/web" or clean_path.startswith("/web/"):
            relative = "main.html" if clean_path == "/web" else clean_path[len("/web/") :]
            candidate = (WEB_ROOT / relative).resolve()
            if candidate.is_relative_to(WEB_ROOT.resolve()):
                return candidate
            return None

        candidate = (WEB_ROOT / clean_path.lstrip("/")).resolve()
        if candidate.is_relative_to(WEB_ROOT.resolve()):
            return candidate

        return None

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/health":
            self.send_json(
                {
                    "status": "ok",
                    "env": os.environ.get("APP_ENV", "local"),
                    "mockApiEnabled": os.environ.get("MOCK_API_ENABLED", "true").lower() != "false",
                    "runtime": "python",
                }
            )
            return

        if path.startswith("/api/"):
            self.handle_api(path, parse_qs(parsed.query))
            return

        static_file = self.resolve_static_file(path)
        if static_file is not None:
            self.send_file(static_file)
            return

        self.send_error(404, "Not found")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass

    load_env_file(ROOT / ".env.local")
    load_env_file(ROOT / ".env")

    port = int(os.environ.get("PORT", os.environ.get("APP_PORT", "3300")))
    app_env = os.environ.get("APP_ENV", "local")
    host = os.environ.get("APP_HOST", "0.0.0.0" if app_env == "production" else "127.0.0.1")
    mock_enabled = os.environ.get("MOCK_API_ENABLED", "true").lower() != "false"

    if not WEB_ROOT.exists():
        print(f"[server] Khong tim thay thu muc mockup web: {WEB_ROOT}")
        return 1

    if not MOCK_DATA_DIR.exists():
        print(f"[server] Khong tim thay thu muc mock data: {MOCK_DATA_DIR}")
        return 1

    try:
        httpd = ThreadingHTTPServer((host, port), DMSLocalHandler)
    except OSError as error:
        if getattr(error, "winerror", None) == 10048 or error.errno in (48, 98, 10048):
            print(f"[server] Port {port} dang duoc su dung.")
            print("[server] Doi port trong .env.local: APP_PORT=3301")
            return 1
        raise

    print("========================================")
    print(" DMS Portal - Server (Python)")
    print("========================================")
    print(f" Bind:   {host}:{port}")
    print(f" UI:     http://{host if host != '0.0.0.0' else 'localhost'}:{port}/main.html")
    print(f"         http://localhost:{port}/web/main.html  (alias)")
    print(f" Mobile: http://localhost:{port}/mobile/main.html")
    print(f" API:    http://localhost:{port}/api")
    print(f" Health: http://localhost:{port}/health")
    print(f" Env:    {app_env} | Mock API: {mock_enabled}")
    if host == "0.0.0.0":
        print(" LAN:    truy cap bang IP may host + port (mo firewall neu can)")
    print(" Nhan Ctrl+C de dung server.")
    print("========================================")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[server] Da dung server.")
    finally:
        httpd.server_close()

    return 0


if __name__ == "__main__":
    sys.exit(main())
