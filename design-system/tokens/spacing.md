# Spacing — Web Portal Design System

> Spacing tokens cho DMS Web Portal, theo grid 4px (Visily default).

---

## 📐 Spacing Tokens

| Token | Giá trị | Use case chính |
|-------|---------|----------------|
| `xs` | 4px | Khoảng giữa label và input, gap nhỏ giữa icon và text |
| `sm` | 8px | Padding nhỏ trong button, gap giữa các tag/chip |
| `md` | 12px | Gap mặc định giữa các phần tử cùng nhóm |
| `lg` | 16px | Padding mặc định trong card, gap giữa các field trong form |
| `xl` | 24px | Khoảng giữa các section, padding modal body |
| `2xl` | 32px | Padding outer của page, margin giữa các block lớn |
| `3xl` | 48px | Margin lớn (vd: section với hero) |
| `4xl` | 64px | Padding của empty state, large hero |

---

## 📦 Component Padding/Margin chuẩn

### Form
| Vị trí | Spacing |
|--------|---------|
| Khoảng cách giữa label và input | `xs` (4px) |
| Khoảng cách giữa các field | `lg` (16px) |
| Khoảng cách giữa các section trong form | `xl` (24px) |
| Padding modal body | `xl` (24px) |

### Page
| Vị trí | Spacing |
|--------|---------|
| Padding ngang của page | `2xl` (32px) |
| Margin top của H1 | `xl` (24px) |
| Margin bottom của H1 | `lg` (16px) |
| Margin giữa các section | `2xl` (32px) |

### Card / Block
| Vị trí | Spacing |
|--------|---------|
| Padding trong card | `lg` (16px) hoặc `xl` (24px) |
| Margin giữa các card | `lg` (16px) |
| Border radius card | `8px` |

### Button
| Size | Padding | Height |
|------|---------|--------|
| Small | 6px 12px | 28px |
| Medium | 8px 16px | 36px |
| Large | 12px 24px | 44px |
| Gap giữa 2 buttons | `sm` (8px) |

### Table
| Vị trí | Spacing |
|--------|---------|
| Padding cell | 12px 16px |
| Khoảng cách giữa rows | (border 1px là đủ) |
| Padding header | 12px 16px |

---

## 🎯 Border Radius

| Token | Giá trị | Use case |
|-------|---------|----------|
| `none` | 0 | Table cell, divider |
| `sm` | 4px | Input, small button, badge |
| `md` | 6px | Button, dropdown |
| `lg` | 8px | Card, modal |
| `xl` | 12px | Large card, sidebar |
| `full` | 9999px | Avatar, status dot, pill |

---

## 🌑 Shadow / Elevation

| Token | CSS | Use case |
|-------|-----|----------|
| `shadow/sm` | `0 1px 2px rgba(0,0,0,0.05)` | Input, table border alt |
| `shadow/md` | `0 4px 6px rgba(0,0,0,0.07)` | Card, dropdown |
| `shadow/lg` | `0 10px 15px rgba(0,0,0,0.10)` | Modal |
| `shadow/xl` | `0 20px 25px rgba(0,0,0,0.12)` | Popover, tooltip nổi |

---

## ⚙️ Quy tắc

- **Tuân thủ grid 4px**: mọi spacing là bội của 4
- **KHÔNG dùng spacing tùy ý**: vd 5px, 7px, 11px, 13px → sai chuẩn
- **Hierarchy spacing**: trong 1 cấp container, spacing phải nhất quán
