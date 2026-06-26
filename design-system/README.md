# Design System — DMS

> Tài liệu Design System dùng cho Claude khi gen UI spec và HTML mockup.
> **Tokens + Web components**: đã có từ portal dev live — xem `web/`.
> **Mobile components**: đã có từ APK v1.9.21 — xem `mobile/`.

---

## 📂 Cấu trúc

```
design-system/
├── README.md                  ← File này
├── tokens/                    ← Design tokens cơ bản
│   ├── colors.md              ← Color palette + semantic mapping
│   ├── typography.md          ← Text styles (heading, body, label...)
│   └── spacing.md             ← Spacing scale + border-radius + shadow
├── components/
│   ├── web/                   ← Web Portal components
│   │   ├── _index.md          ← Inventory tất cả component
│   │   ├── buttons.md         ← Button (6 variants, 4 sizes, 6 states)
│   │   ├── inputs.md          ← Input/Form field (14 loại)
│   │   ├── tables.md          ← Table với sort/filter/pagination
│   │   ├── modals.md          ← Modal/Dialog/Drawer/Confirm
│   │   ├── filters.md         ← Filter bar + Advanced filter
│   │   └── dropdowns.md       ← Select/Multi-select/Action menu
│   ├── web/                   ← Hub DS Portal (portal dev live)
│   │   ├── README.md
│   │   ├── tokens/
│   │   └── components/
│   └── mobile/
└── patterns/                  ← Screen patterns (layout hoàn chỉnh)
    ├── web/
    │   ├── list-screen.md     ← Danh sách + filter + table + pagination
    │   ├── form-screen.md     ← Modal form / Full-page form
    │   └── detail-screen.md   ← Chi tiết + tabs + actions
    └── mobile/
        ├── list-screen.md     ← Header + search + filter chips + cards
        ├── form-screen.md     ← Header + form + footer button
        └── detail-screen.md   ← Header + sections + badges
```

---

## 🔄 Cập nhật Mobile Design System từ Figma

Khi Figma ECO-design-system có update:
1. Mở `scripts/extract_figma.py`, đảm bảo `FIGMA_TOKEN` và `FIGMA_FILE_KEY` đúng
2. Click đúp `scripts/run_figma_extract.bat`
3. File `tokens/colors.md`, `tokens/typography.md`, `components/mobile/_index.md` được cập nhật

---

## 📚 Cách Claude sử dụng Design System

Khi gen HTML mockup hoặc mô tả UI trong spec:

1. **Pattern**: đọc `patterns/[platform]/[loại].md` → lấy layout chuẩn
2. **Components**: đọc `components/[platform]/_index.md` → biết component có sẵn
3. **Chi tiết component**: đọc file cụ thể (vd `buttons.md`) → biết rules, states
4. **Tokens**: đọc `tokens/colors.md` + `typography.md` → apply đúng style
5. **KHÔNG đề xuất component/pattern mới** khi đã có sẵn

---

## ⚙️ Rules khi Claude gen HTML mockup

- Dùng CSS class có sẵn trong `mockups/templates/` — KHÔNG bịa class mới
- Apply color tokens (Primary/500, Neutral/700...) đúng semantic meaning
- Apply typography tokens (Body/Default 14px, Label/Default 14px Medium...)
- Apply spacing tokens (padding 16px = lg, gap 8px = sm...)
- Multi-state trong 1 file: Default + Empty + Error cạnh nhau
- Sample data thực tế, có ý nghĩa nghiệp vụ
