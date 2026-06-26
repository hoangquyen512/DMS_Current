# Design Tokens — trích từ `app_1_9_21.apk`

> Nguồn: DMS Salesman App (eco-salesman) — React Native + NativeWind  
> Phương pháp: giải nén APK → phân tích `assets/index.android.bundle`

---

## Màu brand (Finviet)

| Token mockup | Hex | Ghi chú trong APK |
|--------------|-----|-------------------|
| `--app-primary` | `#009ADD` | `colors_brand_primary`, `#009ADD_UPDATE_PORTAL` |
| `--app-primary-dark` | `#058AD0` | Navigation / pressed state |
| `--app-primary-darker` | `#17629E` | Link / header đậm |
| `--app-primary-light` | `#E4EFF8` | `button_surface_light` nền |
| `--app-gradient-end` | `#57BAF7` | Gradient báo cáo |

**Lưu ý:** Mockup cũ dùng `#1a9ad6` — không khớp APK. Đã đổi sang `#009ADD`.

---

## Neutral

| Token | Hex |
|-------|-----|
| `--neutral-50` | `#F4F5F6` |
| `--neutral-100` | `#F0F3F7` |
| `--neutral-200` | `#DAE1E7` |
| `--neutral-500` | `#98A2B3` |
| `--neutral-600` | `#8B97A1` |
| `--neutral-700` | `#292D32` |
| `--neutral-900` | `#1A141F` |

---

## Semantic

| Token | Hex |
|-------|-----|
| `--success-500` | `#02B46E` |
| `--success-700` | `#059669` |
| `--error-500` | `#CC3B29` |
| `--warning-500` | `#F59E0B` |
| `--tab-inactive` | `#98A2B3` |

---

## Component (tên token trong bundle)

| Component | Token APK | CSS mockup |
|-----------|-----------|------------|
| Nút primary | `button_surface_brand` | `background: var(--app-primary)` |
| Nút light | `button_surface_light` | `background: var(--app-primary-light)` |
| Text nút tối | `button_text_darker` | `color: var(--neutral-700)` |
| Tab active | `tabBarActiveTintColor` | `color: var(--app-primary)` |
| Tab inactive | `tabBarInactiveTintColor` | `color: var(--tab-inactive)` |
| Bottom nav | — | height 64px (giữ nguyên mockup) |
| Hero cửa hàng | gradient `#d4edf9` → `#E4EFF8` | `.app-hero`, `--app-hero-gradient` |
| FAB / CTA shadow | `rgba(0,154,221,.35)` | `--app-shadow-primary` |
| Action tile hover | `rgba(0,154,221,.12)` | `--app-shadow-primary-sm` |

---

## Border radius (NativeWind `border_radius_*`)

| Token | px |
|-------|-----|
| `--radius-md` | 6 |
| `--radius-lg` | 8 |
| `--radius-xl` | 12 |
| `--radius-full` | 9999 |

---

## Typography

Font hệ thống Android: **Roboto** (mockup: `-apple-system, Roboto, sans-serif`).

| Token | px | Ghi chú |
|-------|-----|---------|
| `--text-xs` | 11 | Tab label |
| `--text-sm` | 12 | Caption |
| `--text-base` | 14 | Body |
| `--text-md` | 16 | Button |
| `--text-lg` | 18 | Tiêu đề phụ |

---

## File đã áp dụng

- `_shared/mockup-tokens.css` — nguồn token chính
- `_shared/app-chrome.css` — hub + tab bar
- Full-flow: TS00, TK00, BCVT00
- GH01, DL03 (tai-xe/), CH01

---

## Refresh khi có APK mới

1. Copy APK → giải nén (đổi đuôi `.zip`)
2. Quét `assets/index.android.bundle` với regex `#[0-9a-fA-F]{6}`
3. Tìm `colors_brand`, `button_surface_*`, `tabBar*TintColor`
4. Cập nhật `mockup-tokens.css`
