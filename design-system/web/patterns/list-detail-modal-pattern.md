# Pattern — List + Modal chi tiết [WEB]

> **Đã gộp vào chuẩn hệ thống:** xem **`portal-crud-list-modal-pattern.md`** (Create + Edit + Detail + Import).  
> File này giữ ghi chú pattern chuyên biệt (ticket hỗ trợ…). Màn list CRUD thông thường → dùng pattern mới.

> Dùng cho màn **danh sách + popup chi tiết** (vd: Xử lý yêu cầu hỗ trợ).  
> **Không** dùng switcher dev nhiều màn; **không** màn empty riêng; **không** chuyển tab chi tiết.

## 1. Khung trang

```
body.portal-page                    ← KHÔNG has-portal-switcher
├── #portal-chrome-root             ← Header ecodms + menu L1–L4 + Back
└── .portal-page-body
    ├── nav.portal-breadcrumb
    ├── h1.portal-page-title
    ├── .portal-card.portal-query-filter
    ├── .portal-card.portal-protable   ← tabs trạng thái + bảng
    └── #detailModal.modal-overlay     ← popup, display:none mặc định
```

## 2. Tìm kiếm chính

- **Chỉ một ô:** `Mã yêu cầu hỗ trợ` (không gộp NPP/MST).

```html
<div class="portal-field">
  <label class="portal-field__label" for="fCode">Tìm theo</label>
  <div class="portal-field__control portal-input-search-wrap">
    <input class="portal-input" id="fCode" type="text" placeholder="Mã yêu cầu hỗ trợ"/>
  </div>
</div>
```

## 3. Filter — Ngày (một field range + calendar)

Xem **`design-system/web/components/date-range-picker.md`** và snippet `mockups/templates/web-date-range-picker-snippet.html`.

- Class: `.portal-date-range.portal-date-range--picker` hoặc `data-date-range-picker`
- Asset: `_shared/portal-date-range-picker.css` + `_shared/portal-date-range-picker.js`

## 4. Filter — Select nhân viên (search)

- Placeholder = tên field (`Nhân viên tiếp nhận`, `Nhân viên chăm sóc`).
- **Không** dùng option `Tất cả`.
- **Không chọn** = không áp dụng điều kiện lọc.

```html
<div class="portal-field">
  <label class="portal-field__label">Nhân viên tiếp nhận</label>
  <div class="portal-field__control portal-select-wrap">
    <select class="portal-select">
      <option value="" selected>Nhân viên tiếp nhận</option>
      <option value="nv1">0909090909 — Anh Thái</option>
    </select>
  </div>
</div>
```

## 5. Filter — Field phụ thuộc loại ticket

- Field **NPP đã ký xác nhận** đặt **cuối** grid filter.
- Chỉ hiển thị khi `Loại ticket = Onboarding Nhà Phân Phối`; loại khác → `display:none`.

```html
<div class="portal-field" id="filterNppSigned" data-show-when="onboarding">
  <label class="portal-field__label">NPP đã ký xác nhận</label>
  <div class="portal-field__control portal-select-wrap">
    <select class="portal-select">
      <option value="">NPP đã ký xác nhận</option>
      <option value="yes">Có</option>
      <option value="no">Không</option>
    </select>
  </div>
</div>
```

## 6. Bảng — Cột đặc thù

| Cột | Quy tắc |
|-----|---------|
| **NPP đã ký xác nhận** | Onboarding: badge Có/Không; loại khác: `—` |
| **Tùy chỉnh** (đổi từ Trao đổi) | Icon person → Chọn nhân viên tiếp nhận |

```html
<th>Tùy chỉnh</th>
...
<td class="col-custom">
  <button type="button" class="portal-icon-btn" title="Chọn nhân viên tiếp nhận">👤</button>
</td>
```

## 7. Modal chi tiết

- Mở bằng click **Mã yêu cầu** → `openDetailModal(id)` — **không** chuyển tab/switcher.
- List phía sau: `opacity` + `pointer-events:none` (tuỳ chọn).
- Form chi tiết:
  - **Bỏ** field Lý do (Onboarding).
  - **Thêm** section **Trao đổi với người tạo phiếu** (chat readonly + ô nhập + Gửi).
- Footer modal: chỉ `Thoát` | **`Lưu`** (một nút lưu — xử lý theo trạng thái đã chọn).
- **Lý do từ chối duyệt:** chỉ hiện + bắt buộc khi Trạng thái = **Từ chối**.

### Tooltip trạng thái (hover, không click)

- Icon ⓘ **chỉ hiện khi hover** — `pointer-events: none`, không click được.
- Hiển thị khi Trạng thái = Đang xử lý / Đã giải quyết.

| Giá trị | Tooltip |
|---------|---------|
| Đang xử lý | Chọn Đang xử lý → hệ thống gen PDF hợp đồng cho nhân viên xác nhận ký. Trạng thái vẫn Đang xử lý cho đến khi phiếu chuyển trạng thái → Đã giải quyết. |
| Đã giải quyết | Chọn Đã giải quyết = gửi dữ liệu phiếu + file đã ký sang CMS để tạo NPP. |

```html
<span class="portal-tip-host" tabindex="-1">
  <span class="portal-tip-icon">ⓘ</span>
  <span class="portal-tip-bubble" role="tooltip">Nội dung tooltip…</span>
</span>
```

## 8. Nút hành động modal

| Nút | Mô tả |
|-----|--------|
| **Thoát** | Đóng popup |
| **Lưu** | Lưu trạng thái + ghi chú (+ lý do từ chối nếu có). Hệ thống xử lý theo trạng thái: gen PDF (Đang xử lý), gửi CMS (Đã giải quyết), v.v. |

## 9. Tham chiếu mockup

- `mockups/web/ho-tro-phan-mem/xu-ly-yeu-cau/MS-W-HT01-xu-ly-yeu-cau-onboarding-npp.html`
- Snippet HTML: `mockups/templates/web-list-detail-modal-snippet.html`
