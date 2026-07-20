# Pattern — Portal CRUD List + Modal [WEB] (chuẩn hệ thống)

> **Reference live mockup:** `mockups/web/giam-sat/giao-hang/quan-ly-nhan-vien-giao-hang/MS-W-DL04-danh-sach-nhan-vien-giao-hang.html`  
> **Nguồn UX:** dms-portal-dev (`/admin/users` + ProTable)  
> **Áp dụng:** Mọi màn **[WEB] danh sách có CRUD** từ nay — tạo mới mockup và enhance.  
> **Không** mass-rewrite toàn bộ mockup cũ trừ khi user yêu cầu.

## 0. Quy tắc vàng

| # | Quy tắc | Chi tiết |
|---|---------|----------|
| 1 | **Một file danh sách** | Entry = list HTML. Create / Edit / Detail / Import = **popup** trên list |
| 2 | **Không tách trang** | File `*-tao-moi-*`, `*-chinh-sua-*`, `*-chi-tiet-*` chỉ **redirect** `?create=1` / `?edit=` / `?detail=` |
| 3 | **Class `portal-*`** | QueryFilter + ProTable + Modal — không dùng style Ecom/`ds-*` |
| 4 | **Không dashboard KPI** | Không hàng summary card mặc định (trừ BA yêu cầu rõ) |
| 5 | **Import Excel chuẩn** | Form ngang `.portal-modal--import` — giống `/admin/users` |
| 6 | **Công ty đầu form** | `* Công ty` luôn field đầu; dấu `*` phía trước tên |

## 1. Cấu trúc trang List

```
body.portal-page
├── #portal-chrome-root
└── .portal-page-body
    └── main.portal-page-content
        ├── nav.portal-breadcrumb
        ├── .portal-page-hd          ← title + Bộ lọc nâng cao
        ├── .portal-card.portal-query-filter
        ├── .portal-card.portal-protable
        │   ├── .portal-protable__list-hd     ← tiêu đề danh sách (line-height 1.5, không cắt chân chữ)
        │   ├── .portal-protable__list-actions← Import | Export | + Tạo mới
        │   └── .portal-card__bd              ← table + pagination
        ├── #createModal
        ├── #editModal
        ├── #detailModal
        ├── #importModal.portal-modal--import
        └── #confirmModal
```

**Assets bắt buộc:**

```html
<link rel="stylesheet" href="{BASE}_shared/portal-tokens.css"/>
<link rel="stylesheet" href="{BASE}_shared/portal-fonts.css"/>
<link rel="stylesheet" href="{BASE}_shared/portal-components.css"/>
<link rel="stylesheet" href="{BASE}_shared/portal-chrome.css"/>
<script src="{BASE}menu-tree.js"></script>
<script src="{BASE}_shared/portal-menu.js"></script>
<script src="{BASE}_shared/portal-chrome.js"></script>
<script src="{BASE}_shared/portal-mockup-widgets.js"></script>
```

## 2. ProTable — actions

Thứ tự nút (trái → phải):

1. **Import Excel** (nếu có import)
2. **Export Excel** (nếu có export)
3. **+ Tạo mới** (`portal-btn--primary`)

**Không** dùng tab trạng thái trên ProTable (lọc status qua QueryFilter / Bộ lọc nâng cao).  
**Không** nút **Làm mới** trên list-actions (Làm mới chỉ ở QueryFilter và footer form Create).

Tiêu đề `.portal-protable__list-title`: `line-height: 1.5` (không cắt chân chữ g/y).

## 3. Popup Create / Edit

- Class: `.portal-modal.portal-modal--wide`
- Body: `.portal-modal__bd.portal-form-horizontal` + `.portal-form-grid`
- Footer Create: **Làm mới** | **Đồng ý**
- Footer Edit: **Hủy** | **Đồng ý**
- Dirty close → confirm *"Dữ liệu chưa lưu sẽ mất."*
- **Select one choice — allowClear:** mọi dropdown **tùy chọn** trong Create/Edit phải có nút **×** (placeholder `value=""`). Field bắt buộc (`* Công ty`…): `data-clearable="false"`. Khi gán value bằng JS dùng `PortalMockupWidgets.setSelectValue`. Spec: `design-system/web/components/select.md`
- Multi-select NPP/…: `.portal-multi-select` — khi mở có `z-index` nâng (đã có trong CSS)
  - Spec: `design-system/web/components/multi-select.md`
  - Snippet: `mockups/templates/web-multi-select-snippet.html`
  - Dropdown đánh dấu đã chọn (tick ✓); ô tự giãn theo số tag

## 4. Popup Detail

- Chỉ **xem**: thông tin cơ bản + khối nghiệp vụ liên quan
- Footer: **Đóng** | **Chỉnh sửa** (mở edit modal)
- **Không** nhồi dashboard / đơn đang gán / lịch sử trừ khi BA yêu cầu

## 5. Popup Import Excel (form ngang)

CSS: `.portal-modal--import` (~720px rộng) + `.portal-import-dropzone` (~168px cao).

```
Header: [icon] Import Excel | [dashed] Lấy file mẫu | ✕
Body:   vùng kéo-thả — "Chọn hoặc kéo file đến vị trí này"
Footer: [Tiến hành xử lý]  ← disabled đến khi có file
```

Copy snippet: `mockups/templates/web-portal-import-excel-snippet.html`

## 6. Deep-link

| Query | Hành động |
|-------|-----------|
| `?create=1` | Mở create modal |
| `?edit={id}` | Mở edit modal |
| `?detail={id}` | Mở detail modal |

Sau khi mở: `history.replaceState` xóa query.

## 7. Snippet & tài liệu liên quan

| File | Vai trò |
|------|---------|
| `mockups/templates/web-portal-crud-list-modal-snippet.html` | Khung list + 4 modal |
| `mockups/templates/web-portal-import-excel-snippet.html` | Import Excel ngang |
| `design-system/web/patterns/list-screen.md` | QueryFilter + ProTable chi tiết |
| `.claude/context/html-mockup-generation.md` | Rule agent gen mockup |

## 8. Checklist trước khi bàn giao mockup

- [ ] Portal chrome + breadcrumb
- [ ] Bộ lọc nâng cao
- [ ] Create / Edit / Detail = popup (không chuyển trang)
- [ ] Select Create/Edit: tùy chọn có nút ×; bắt buộc `data-clearable="false"`
- [ ] Import (nếu có) = form ngang chuẩn
- [ ] Không KPI dashboard mặc định
- [ ] `portal-*` only; multi-select / select dropdown không bị cắt
- [ ] Title list không mất chân chữ
