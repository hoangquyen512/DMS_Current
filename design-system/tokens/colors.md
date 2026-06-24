# Colors — Web Portal Design System

> Design system cho DMS Web Portal, dựa trên style mặc định của Visily (modern enterprise web).
> BA điều chỉnh hex code nếu Visily/team có color brand riêng.

---

## 🎨 Color Palette

### Primary — Action chính, focus state
| Token | Hex | Khi dùng |
|-------|-----|----------|
| `Primary/50` | `#EFF6FF` | Background nhẹ (hover state, badge bg) |
| `Primary/100` | `#DBEAFE` | Background của active filter chip |
| `Primary/500` | `#3B82F6` | Button primary, link, focus border |
| `Primary/600` | `#2563EB` | Button primary hover |
| `Primary/700` | `#1D4ED8` | Button primary pressed |

### Neutral — Text, border, background
| Token | Hex | Khi dùng |
|-------|-----|----------|
| `Neutral/0` | `#FFFFFF` | Background page, card, modal |
| `Neutral/50` | `#F9FAFB` | Background page (alt), table header |
| `Neutral/100` | `#F3F4F6` | Background hover của row, divider nhẹ |
| `Neutral/200` | `#E5E7EB` | Border default của input, table |
| `Neutral/300` | `#D1D5DB` | Border của disabled input |
| `Neutral/500` | `#6B7280` | Text secondary, label, placeholder |
| `Neutral/700` | `#374151` | Text body |
| `Neutral/900` | `#111827` | Text heading, title |

### Success — Action thành công, status active
| Token | Hex | Khi dùng |
|-------|-----|----------|
| `Success/50` | `#ECFDF5` | Background của toast/badge success |
| `Success/500` | `#10B981` | Icon success, badge text, dot status |
| `Success/700` | `#047857` | Text trong toast success |

### Warning — Cảnh báo, lưu ý
| Token | Hex | Khi dùng |
|-------|-----|----------|
| `Warning/50` | `#FFFBEB` | Background warning toast/alert |
| `Warning/500` | `#F59E0B` | Icon warning |
| `Warning/700` | `#B45309` | Text warning |

### Error — Lỗi, validation, hủy
| Token | Hex | Khi dùng |
|-------|-----|----------|
| `Error/50` | `#FEF2F2` | Background error toast/alert |
| `Error/500` | `#EF4444` | Border input lỗi, icon error, button danger |
| `Error/600` | `#DC2626` | Button danger hover |
| `Error/700` | `#B91C1C` | Text error message |

### Info — Thông tin trung tính
| Token | Hex | Khi dùng |
|-------|-----|----------|
| `Info/50` | `#EFF6FF` | Background info toast |
| `Info/500` | `#3B82F6` | Icon info |
| `Info/700` | `#1D4ED8` | Text info |

---

## 📌 Quy tắc dùng màu

### Semantic — KHÔNG dùng tùy tiện
- **Primary**: chỉ cho action chính, KHÔNG cho decorative
- **Success/Error/Warning**: chỉ cho status/feedback, KHÔNG cho UI thường
- **Neutral**: nền tảng cho 80% UI

### Contrast — Đảm bảo accessibility
- Text trên nền trắng: dùng `Neutral/700` trở đi
- Text trên nền màu (Primary/500, Error/500): luôn dùng `Neutral/0` (white)
- Disabled text: `Neutral/300` trên `Neutral/100`

### Status mapping cho DMS
| Trạng thái nghiệp vụ | Color |
|----------------------|-------|
| Hoạt động / Active / Đã duyệt | `Success/500` |
| Chờ duyệt / Pending | `Warning/500` |
| Đã hủy / Bị từ chối / Lỗi | `Error/500` |
| Nháp / Draft / Tạm dừng | `Neutral/500` |

---

## ⚙️ Cách Claude áp dụng khi gen UI

Khi spec UI:
- Button "Lưu", "Tạo mới", "Duyệt" → dùng Primary
- Button "Xóa", "Từ chối" → dùng Error (Danger variant)
- Button "Hủy", "Quay lại" → Neutral với border
- Status badge → dùng Success/Warning/Error/Neutral theo mapping ở trên
- Border input default: `Neutral/200`, focus: `Primary/500`, error: `Error/500`
