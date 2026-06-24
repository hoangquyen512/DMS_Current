# Component Inventory — WEB Portal

> Component library cho DMS Web Portal, dựa trên style mặc định của Visily (modern enterprise web).
> Mỗi component có file riêng mô tả chi tiết.

---

## 📚 Components có sẵn

### Form Inputs (cho việc nhập liệu)
| Component | File | Mô tả |
|-----------|------|-------|
| **Button** | `buttons.md` | 6 variants (Primary, Secondary, Tertiary, Danger, Text, Icon) |
| **Input/Form Field** | `inputs.md` | Text, Number, Date, Select, Textarea, File upload, Switch, Checkbox, Radio |
| **Dropdown/Select** | `dropdowns.md` | Single, Multi, Searchable, Async, Tree, Action Menu |

### Data Display
| Component | File | Mô tả |
|-----------|------|-------|
| **Table** | `tables.md` | Bảng dữ liệu với sort, filter, pagination, bulk action |

### Overlay
| Component | File | Mô tả |
|-----------|------|-------|
| **Modal/Dialog** | `modals.md` | Modal nhỏ/vừa/lớn, Drawer, Confirm dialog |

### Filter / Search
| Component | File | Mô tả |
|-----------|------|-------|
| **Filter & Search Bar** | `filters.md` | Search box + Filter dropdowns + Reset, Advanced filter, Saved filters |

---

## 🚧 Components nên bổ sung sau

Khi gặp use case cần dùng → tạo file mô tả:

| Component | File suggest | Use case |
|-----------|--------------|----------|
| Badge / Tag / Chip | `badges.md` | Status, Category, Tag |
| Tabs | `tabs.md` | Phân chia nội dung trên cùng 1 page |
| Breadcrumb | `breadcrumbs.md` | Navigation path |
| Pagination | `pagination.md` | Phân trang (đã có 1 phần trong tables.md) |
| Card | `cards.md` | Card display info dạng block |
| Avatar | `avatars.md` | Hình đại diện user/object |
| Toast/Notification | `toasts.md` | Thông báo nhẹ ở góc màn hình |
| Empty state | `empty-states.md` | Khi không có dữ liệu |
| Skeleton loader | `skeletons.md` | Loading placeholder |
| Tooltip | `tooltips.md` | Giải thích nhẹ khi hover |
| Stepper / Wizard | `steppers.md` | Form nhiều bước |
| Date picker | `date-pickers.md` | Đã có 1 phần trong inputs.md |
| Color picker | `color-pickers.md` | (nếu cần) |
| Rich text editor | `rich-text.md` | (nếu cần) |
| Drag & drop | `drag-drop.md` | (nếu cần) |
| Calendar / Schedule | `calendar.md` | (nếu cần) |

---

## 📐 Cách Claude dùng inventory này

Khi viết spec UI cho 1 màn hình:

1. **Đọc pattern màn hình tương ứng** (`patterns/web/list-screen.md`, `form-screen.md`, ...)
2. **Đọc inventory này** (file hiện tại) để biết component nào có sẵn
3. **Đọc file component cụ thể** để biết rule sử dụng
4. **Apply tokens** (`tokens/colors.md`, `typography.md`, `spacing.md`)
5. **KHÔNG đề xuất component mới** khi đã có sẵn — phải tái sử dụng

Nếu pattern hiện có không cover được case → đánh dấu `[CẦN BỔ SUNG DESIGN SYSTEM]` thay vì tự bịa.

---

## 🎨 Style tổng thể

DMS Web Portal theo style:
- **Modern, clean enterprise** — không quá decorative
- **Information-dense** — cần hiển thị nhiều data
- **Functional first** — UI phục vụ task, không trang trí
- **Consistent** — pattern lặp lại nhất quán giữa các màn hình
- **Accessible** — keyboard navigation, contrast đầy đủ

Tham khảo các sản phẩm cùng style:
- Salesforce Lightning
- Atlassian Jira / Confluence
- Notion
- Linear
- Modern admin templates (Tailwind UI, shadcn/ui)
