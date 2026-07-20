# Component Inventory — [WEB] DMS Portal

> CSS class: `mockups/web/_shared/portal-components.css` (prefix `.portal-*`)  
> Bridge mockup cũ: `mockups/web/_shared/portal-mockup-bridge.css` (auto qua `portal-chrome.css`)  
> **Pattern list:** [`patterns/list-screen.md`](patterns/list-screen.md)  
> **Danh mục LIVE:** [`COMPONENT-INVENTORY-LIVE.md`](COMPONENT-INVENTORY-LIVE.md)

| Component | File | Class chính | Live portal |
|-----------|------|-------------|-------------|
| Navigation header | `navigation.md` | `portal-chrome.css` | ✅ |
| Breadcrumb | — | `.portal-breadcrumb` | ✅ |
| Button | — | `.portal-btn--primary`, `--default` | ✅ |
| Input / Search | — | `.portal-input-search-wrap`, `.portal-input` | ✅ |
| Select | `select.md` ⭐ | `.portal-select` + allowClear × (filter + Create/Edit) | ✅ |
| Date đơn | — | `.portal-input-date-wrap` | ✅ |
| Date range | `date-range-picker.md` ⭐ | `.portal-date-range` + allowClear × | ✅ |
| Multi-select | `multi-select.md` ⭐ | `.portal-multi-select` + `portal-mockup-widgets.js` | ✅ |
| QueryFilter | `patterns/list-screen.md` | `.portal-query-filter` + `.portal-filter-grid--4` | ✅ |
| ProTable | `patterns/list-screen.md` | `.portal-protable`, `.portal-table-alert` | ✅ |
| Table checkbox col | — | `.col-check` (alias `.checkbox-col`) | ✅ |
| Tag / Badge | `tags.md` | `.portal-tag--*` | ✅ |
| KPI card | — | `.portal-kpi-card` | ✅ Dashboard |
| Pagination | — | `.portal-pagination` | ✅ |
| Table actions | — | `.portal-table-actions`, `.portal-icon-btn` | ✅ |
| Copy cell | — | `.copy-cell`, `.copy-btn` | ✅ |
| Legacy bridge | `README-COMPONENTS.md` | `.filter-card`, `.btn-primary`, `.table-container` | ✅ auto |

Gallery: `mockups/web/components-gallery.html`

## Change History

| Phiên bản | Ngày | Mô tả |
|-----------|------|-------|
| 1.0 | 24/06/2026 | Từ portal dev live |
| 1.1 | 24/06/2026 | Link COMPONENT-INVENTORY-LIVE.md |
| 1.2 | 24/06/2026 | QueryFilter + ProTable + portal-mockup-bridge |
| 1.3 | 17/07/2026 | Multi-select chuẩn Ant Design — `multi-select.md` + snippet template |
| 1.4 | 17/07/2026 | Select one choice + Date range allowClear (nút ×) |
| 1.5 | 20/07/2026 | Create/Edit Select allowClear — template CRUD + select snippet + gallery |
