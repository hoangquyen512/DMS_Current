# Spacing — [APP] Salesman Mobile

> Grid **4px**. Token CSS trong `mockup-tokens.css` và class utility trong `app-components.css`.

---

## Spacing scale

| Token | px | CSS var | Use case |
|-------|-----|---------|----------|
| `xs` | 4 | `--space-xs` | Gap icon–text, chip padding dọc |
| `sm` | 8 | `--space-sm` | Gap card trong list, margin section |
| `md` | 12 | `--space-md` | Padding card, gap trong row |
| `lg` | 16 | `--space-lg` | Padding ngang màn, header |
| `xl` | 20 | `--space-xl` | Padding lớn trong modal |
| `2xl` | 24 | `--space-2xl` | Khoảng section |

---

## Layout chuẩn

| Vùng | Giá trị |
|------|---------|
| Status bar | 44px (`--mockup-status-h`) |
| App header (có back) | min 56px, padding `12px 16px` |
| Bottom tab bar | 64px |
| Padding ngang content | 12–16px |
| Margin card list | `8px 12px` |
| Gap giữa 2 button footer | 8px |

---

## Border radius

| Token CSS | px | Use case |
|-----------|-----|----------|
| `--radius-sm` | 4 | Badge nhỏ |
| `--radius-md` | 6 | Input, icon hit area |
| `--radius-lg` | 8 | Button, stat card |
| `--radius-xl` | 12 | Card, KPI item |
| `--radius-2xl` | 16 | Bottom sheet top |
| `--radius-full` | 9999px | Search pill, chip, tab segment |

---

## Shadow

| Token CSS | Giá trị | Use case |
|-----------|---------|----------|
| `--shadow-sm` | `0 1px 3px rgba(26,20,31,.04)` | Card list |
| `--shadow-nav` | `0 -2px 8px rgba(15,23,42,.06)` | Bottom nav |
| `--shadow-md` | `0 4px 12px rgba(26,20,31,.08)` | FAB, popup |

---

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Đồng bộ NativeWind border_radius_* |
