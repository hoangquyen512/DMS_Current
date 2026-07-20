/**
 * [WEB] Widget mockup — Multi-select, Bộ lọc nâng cao CTTB (cùng dòng page title + popover)
 */
(function (global) {
  var ADVANCED_FIELD_RULES = [
    { key: 'company', re: /công ty/i, tagClass: 'portal-context-tag--company', icon: '🏢', tagType: 'company' },
    { key: 'region', re: /vùng/i, tagClass: 'portal-context-tag--region', icon: '🏭', tagType: 'region' },
    { key: 'group', re: /nhóm/i, tagClass: 'portal-context-tag--group', icon: '👤', tagType: 'group' },
    { key: 'channel', re: /kênh/i, tagClass: 'portal-context-tag--channel', icon: '🔒', tagType: 'channel' }
  ];

  function getFieldLabel(el) {
    var label = el.querySelector('.filter-label, .portal-field__label, label');
    return label ? label.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function matchAdvancedRule(label) {
    for (var i = 0; i < ADVANCED_FIELD_RULES.length; i++) {
      if (ADVANCED_FIELD_RULES[i].re.test(label)) return ADVANCED_FIELD_RULES[i];
    }
    return null;
  }

  function isAdvancedField(el) {
    return !!matchAdvancedRule(getFieldLabel(el));
  }

  function findPrimaryFilterCard() {
    return document.querySelector('.portal-query-filter, .filter-card, .search-card');
  }

  function findPageTitle(card) {
    var cursor = card;
    while (cursor) {
      var sib = cursor.previousElementSibling;
      while (sib) {
        if (sib.matches('.portal-page-title, .page-title, h1.page-title')) return sib;
        if (sib.matches('.portal-page-hd')) {
          var inHd = sib.querySelector('.portal-page-title, .page-title, h1.page-title');
          if (inHd) return inHd;
        }
        var nested = sib.querySelectorAll('.portal-page-title, .page-title, h1.page-title');
        if (nested.length && !sib.querySelector('.filter-card, .portal-query-filter, .search-card')) {
          return nested[nested.length - 1];
        }
        sib = sib.previousElementSibling;
      }
      cursor = cursor.parentElement;
      if (!cursor || cursor === document.documentElement) break;
    }
    return null;
  }

  function removeOrphanAdvancedBars() {
    document.querySelectorAll('.portal-advanced-bar[data-portal-advanced-bar]').forEach(function (bar) {
      bar.remove();
    });
  }

  function ensurePageHeaderRow(titleEl) {
    removeOrphanAdvancedBars();

    if (!titleEl) return null;

    var wrap = titleEl.closest('.portal-page-hd');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'portal-page-hd';
      titleEl.parentNode.insertBefore(wrap, titleEl);
      wrap.appendChild(titleEl);
    }

    var aside = wrap.querySelector('.portal-page-hd__aside');
    if (!aside) {
      aside = document.createElement('div');
      aside.className = 'portal-page-hd__aside';
      wrap.appendChild(aside);
    }

    var tagsEl = aside.querySelector('.portal-context-tags');
    if (!tagsEl) {
      tagsEl = document.createElement('div');
      tagsEl.className = 'portal-context-tags';
      tagsEl.setAttribute('data-context-tags', 'page');
      aside.appendChild(tagsEl);
    }

    var widgetMount = aside.querySelector('.portal-page-hd__filter-slot');
    if (!widgetMount) {
      widgetMount = document.createElement('div');
      widgetMount.className = 'portal-page-hd__filter-slot';
      aside.appendChild(widgetMount);
    } else if (widgetMount.parentNode === aside && widgetMount !== aside.lastElementChild) {
      aside.appendChild(widgetMount);
    }

    if (titleEl.style) {
      titleEl.style.marginBottom = '';
      titleEl.style.margin = '';
    }

    return { wrap: wrap, tagsEl: tagsEl, widgetMount: widgetMount };
  }

  function buildDefaultAdvancedFields() {
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="portal-advanced-filter__field" data-adv-key="company">' +
        '<label class="portal-field__label">* Công ty</label>' +
        '<select class="filter-select portal-select" data-adv-select="company">' +
          '<option value="" hidden>Công ty</option>' +
          '<option value="FVC" selected>FVC — Finviet Consumer</option>' +
          '<option value="ABI">ABI — Công ty ABI</option>' +
        '</select>' +
      '</div>' +
      '<div class="portal-advanced-filter__field" data-adv-key="region">' +
        '<label class="portal-field__label">Vùng</label>' +
        '<select class="filter-select portal-select" data-adv-select="region">' +
          '<option value="" selected hidden>Vùng</option>' +
          '<option value="MN">GR8098372 — Miền Nam</option>' +
          '<option value="MB">GR8098371 — Miền Bắc</option>' +
        '</select>' +
      '</div>' +
      '<div class="portal-advanced-filter__field" data-adv-key="group">' +
        '<label class="portal-field__label">Nhóm</label>' +
        '<select class="filter-select portal-select" data-adv-select="group">' +
          '<option value="" selected hidden>Nhóm</option>' +
          '<option value="DEVGR">(KENH_PHAN_PHOI_DEVGR6195980124) — Nhóm Thái test</option>' +
        '</select>' +
      '</div>';
    return wrap;
  }

  function setupFilterHeader(card, isPortalQuery) {
    card.classList.add('portal-filter-card--v2');
    card.dataset.advancedFilterV2 = '1';

    card.querySelectorAll('.portal-advanced-filter').forEach(function (node) {
      if (!node.closest('.portal-page-hd')) node.remove();
    });

    var toolbarRight = card.querySelector('.portal-filter-card__toolbar-right');
    if (toolbarRight) toolbarRight.remove();

    if (isPortalQuery) {
      var hd = card.querySelector('.portal-card__hd');
      if (!hd) {
        hd = document.createElement('div');
        hd.className = 'portal-card__hd';
        card.insertBefore(hd, card.firstChild);
      }
      hd.classList.remove('portal-filter-card__toolbar');
      if (!hd.querySelector('.portal-filter-card__title')) {
        var titleText = hd.textContent.trim() || 'Tìm kiếm theo';
        hd.textContent = '';
        var titleSpan = document.createElement('span');
        titleSpan.className = 'portal-filter-card__title';
        titleSpan.textContent = titleText;
        hd.appendChild(titleSpan);
      }
      return;
    }

    var old = card.querySelector('.portal-filter-advanced, .filter-advanced');
    if (old) old.remove();

    if (!card.querySelector('.portal-filter-card__toolbar')) {
      var toolbar = document.createElement('div');
      toolbar.className = 'portal-filter-card__toolbar';
      toolbar.innerHTML = '<span class="portal-filter-card__title">Tìm kiếm theo</span>';
      card.insertBefore(toolbar, card.firstChild);
    }
  }

  function createAdvancedFilterWidget(tagsEl) {
    var root = document.createElement('div');
    root.className = 'portal-advanced-filter';
    root.innerHTML =
      '<button type="button" class="portal-advanced-filter__btn" aria-expanded="false" aria-haspopup="dialog">' +
        '<span class="portal-advanced-filter__btn-icon" aria-hidden="true"></span>' +
        '<span>Bộ lọc</span>' +
      '</button>' +
      '<div class="portal-advanced-filter__popover" role="dialog" aria-label="Bộ lọc nâng cao" hidden>' +
        '<div class="portal-advanced-filter__popover-hd">' +
          '<span>Bộ lọc nâng cao</span>' +
          '<button type="button" class="portal-advanced-filter__info" title="Lọc theo Công ty, Vùng, Nhóm phân quyền">ⓘ</button>' +
        '</div>' +
        '<div class="portal-advanced-filter__popover-bd"></div>' +
        '<div class="portal-advanced-filter__popover-ft">' +
          '<button type="button" class="portal-btn portal-btn--default portal-advanced-filter__reset">Làm mới</button>' +
          '<button type="button" class="portal-btn portal-btn--primary portal-advanced-filter__confirm">Xác nhận</button>' +
        '</div>' +
      '</div>';
    root._pageTagsEl = tagsEl;
    return root;
  }

  function renderContextTags(tagsEl, popoverBd) {
    if (!tagsEl) return;
    tagsEl.innerHTML = '';
    popoverBd.querySelectorAll('[data-adv-select]').forEach(function (select) {
      if (!select.value) return;
      var opt = select.options[select.selectedIndex];
      var key = select.getAttribute('data-adv-select');
      var rule = ADVANCED_FIELD_RULES.filter(function (r) { return r.key === key; })[0] || ADVANCED_FIELD_RULES[0];
      var tag = document.createElement('span');
      tag.className = 'portal-context-tag ' + rule.tagClass;
      tag.innerHTML = '<span class="portal-context-tag__icon" aria-hidden="true">' + rule.icon + '</span>' +
        '<span class="portal-context-tag__text">' + opt.textContent.trim() + '</span>';
      tagsEl.appendChild(tag);
    });
  }

  function wireAdvancedFilterWidget(widget, popoverBd) {
    var btn = widget.querySelector('.portal-advanced-filter__btn');
    var pop = widget.querySelector('.portal-advanced-filter__popover');
    var resetBtn = widget.querySelector('.portal-advanced-filter__reset');
    var confirmBtn = widget.querySelector('.portal-advanced-filter__confirm');
    var pageTagsEl = widget._pageTagsEl;

    function closePopover() {
      pop.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }

    function openPopover() {
      pop.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (pop.hidden) openPopover();
      else closePopover();
    });

    resetBtn.addEventListener('click', function () {
      popoverBd.querySelectorAll('[data-adv-select], select').forEach(function (sel) {
        sel.selectedIndex = 0;
      });
    });

    confirmBtn.addEventListener('click', function () {
      renderContextTags(pageTagsEl, popoverBd);
      closePopover();
      widget.dispatchEvent(new CustomEvent('portal-advanced-filter-confirm', { bubbles: true }));
    });

    document.addEventListener('click', function (e) {
      if (!widget.contains(e.target)) closePopover();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopover();
    });
  }

  function extractAdvancedFields(card, popoverBd) {
    var extracted = [];
    card.querySelectorAll('.filter-field, .portal-field, .filter-group, .search-group').forEach(function (field) {
      if (isAdvancedField(field)) extracted.push(field);
    });

    if (extracted.length) {
      extracted.forEach(function (field) {
        var select = field.querySelector('select');
        var key = matchAdvancedRule(getFieldLabel(field));
        var wrap = document.createElement('div');
        wrap.className = 'portal-advanced-filter__field';
        wrap.setAttribute('data-adv-key', key ? key.key : 'company');
        var label = field.querySelector('.filter-label, .portal-field__label, label');
        if (label) wrap.appendChild(label.cloneNode(true));
        if (select) {
          select.setAttribute('data-adv-select', key ? key.key : 'company');
          wrap.appendChild(select);
        }
        popoverBd.appendChild(wrap);
        field.remove();
      });
    } else {
      popoverBd.appendChild(buildDefaultAdvancedFields());
    }
  }

  function initPageAdvancedFilter() {
    if (document.body.dataset.portalAdvancedBarInit === '1') return;

    var card = findPrimaryFilterCard();
    if (!card) return;

    var titleEl = findPageTitle(card);
    var mount = ensurePageHeaderRow(titleEl);
    if (!mount) return;

    if (mount.widgetMount.querySelector('.portal-advanced-filter')) {
      document.body.dataset.portalAdvancedBarInit = '1';
      return;
    }

    var widget = createAdvancedFilterWidget(mount.tagsEl);
    var popoverBd = widget.querySelector('.portal-advanced-filter__popover-bd');
    extractAdvancedFields(card, popoverBd);
    mount.widgetMount.appendChild(widget);
    wireAdvancedFilterWidget(widget, popoverBd);

    document.body.dataset.portalAdvancedBarInit = '1';
  }

  function relocateFilterActions(card) {
    var actions = card.querySelector('.filter-row .filter-actions, .filter-grid--4 .filter-actions, .portal-filter-grid .filter-actions');
    if (!actions || card.querySelector(':scope > .filter-actions') === actions) return;
    card.appendChild(actions);
  }

  function getMultiSelectValues(rootOrId) {
    var root = typeof rootOrId === 'string' ? document.getElementById(rootOrId) : rootOrId;
    if (!root) return [];
    return Array.from(root.querySelectorAll('.portal-multi-select__tag')).map(function (tag) {
      return tag.getAttribute('data-value');
    }).filter(function (v) { return v != null && v !== ''; });
  }

  function clearMultiSelect(rootOrId) {
    var root = typeof rootOrId === 'string' ? document.getElementById(rootOrId) : rootOrId;
    if (!root) return;
    root.querySelectorAll('.portal-multi-select__tag').forEach(function (tag) { tag.remove(); });
    var placeholder = root.querySelector('.portal-multi-select__placeholder');
    if (placeholder) placeholder.style.display = '';
    var hidden = root.querySelector('select.portal-multi-select__hidden');
    if (hidden) {
      Array.from(hidden.options).forEach(function (opt) { opt.selected = false; });
    }
    syncMultiSelectOptions(root);
    root.dispatchEvent(new CustomEvent('portal-multiselect-change', { bubbles: true }));
  }

  function setMultiSelectValues(rootOrId, values) {
    var root = typeof rootOrId === 'string' ? document.getElementById(rootOrId) : rootOrId;
    if (!root) return;
    clearMultiSelect(root);
    if (!values || !values.length) return;

    var tagsWrap = root.querySelector('.portal-multi-select__tags') || root.querySelector('.portal-multi-select__inner');
    var placeholder = root.querySelector('.portal-multi-select__placeholder');
    var hidden = root.querySelector('select.portal-multi-select__hidden');

    values.forEach(function (value) {
      if (root.querySelector('.portal-multi-select__tag[data-value="' + value + '"]')) return;
      var opt = root.querySelector('.portal-multi-select__option[data-value="' + value + '"]');
      var label = opt ? opt.textContent.trim() : String(value);
      var tag = document.createElement('span');
      tag.className = 'portal-multi-select__tag';
      tag.setAttribute('data-value', value);
      tag.innerHTML =
        '<span class="portal-multi-select__tag-text">' + label + '</span>' +
        '<button type="button" class="portal-multi-select__tag-remove" aria-label="Xóa">×</button>';
      if (placeholder && placeholder.parentNode === tagsWrap) tagsWrap.insertBefore(tag, placeholder);
      else tagsWrap.appendChild(tag);
      if (hidden) {
        Array.from(hidden.options).forEach(function (o) {
          if (o.value === value) o.selected = true;
        });
      }
    });

    if (placeholder) placeholder.style.display = root.querySelector('.portal-multi-select__tag') ? 'none' : '';
    syncMultiSelectOptions(root);
    root.dispatchEvent(new CustomEvent('portal-multiselect-change', { bubbles: true }));
  }

  function setMultiSelectDisabled(rootOrId, disabled) {
    var root = typeof rootOrId === 'string' ? document.getElementById(rootOrId) : rootOrId;
    if (!root) return;
    root.classList.toggle('is-disabled', !!disabled);
    root.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    if (disabled) root.classList.remove('is-open');
  }

  function syncMultiSelectOptions(root) {
    if (!root) return;
    var selected = Array.from(root.querySelectorAll('.portal-multi-select__tag')).map(function (tag) {
      return tag.getAttribute('data-value');
    });
    root.querySelectorAll('.portal-multi-select__option').forEach(function (opt) {
      var val = opt.getAttribute('data-value');
      if (val == null) return;
      var isSelected = selected.indexOf(val) >= 0;
      opt.classList.toggle('is-selected', isSelected);
      opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
  }

  function initMultiSelect(root) {
    if (root.dataset.multiSelectInit === '1') return;
    root.dataset.multiSelectInit = '1';

    var inner = root.querySelector('.portal-multi-select__inner');
    var tagsWrap = root.querySelector('.portal-multi-select__tags') || inner;
    var placeholder = root.querySelector('.portal-multi-select__placeholder');
    var hidden = root.querySelector('select.portal-multi-select__hidden');

    function syncHidden() {
      if (!hidden) return;
      var selected = Array.from(root.querySelectorAll('.portal-multi-select__tag')).map(function (tag) {
        return tag.getAttribute('data-value');
      });
      Array.from(hidden.options).forEach(function (opt) {
        opt.selected = selected.indexOf(opt.value) >= 0;
      });
      syncMultiSelectOptions(root);
      root.dispatchEvent(new CustomEvent('portal-multiselect-change', { bubbles: true }));
    }

    function updatePlaceholder() {
      if (!placeholder) return;
      placeholder.style.display = root.querySelector('.portal-multi-select__tag') ? 'none' : '';
    }

    function addTag(value, label) {
      if (root.querySelector('.portal-multi-select__tag[data-value="' + value + '"]')) return;
      var tag = document.createElement('span');
      tag.className = 'portal-multi-select__tag';
      tag.setAttribute('data-value', value);
      tag.innerHTML =
        '<span class="portal-multi-select__tag-text">' + label + '</span>' +
        '<button type="button" class="portal-multi-select__tag-remove" aria-label="Xóa">×</button>';
      if (placeholder && placeholder.parentNode === tagsWrap) tagsWrap.insertBefore(tag, placeholder);
      else tagsWrap.appendChild(tag);
      updatePlaceholder();
      syncHidden();
    }

    root.addEventListener('click', function (e) {
      if (root.classList.contains('is-disabled')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (e.target.closest('.portal-multi-select__tag-remove')) {
        e.stopPropagation();
        e.target.closest('.portal-multi-select__tag').remove();
        updatePlaceholder();
        syncHidden();
        return;
      }
      if (e.target.closest('.portal-multi-select__option')) {
        e.stopPropagation();
        var opt = e.target.closest('.portal-multi-select__option');
        if (opt.classList.contains('is-disabled') || opt.getAttribute('aria-disabled') === 'true') return;
        var value = opt.getAttribute('data-value');
        var existing = root.querySelector('.portal-multi-select__tag[data-value="' + value + '"]');
        if (existing) {
          existing.remove();
          updatePlaceholder();
          syncHidden();
        } else {
          addTag(value, opt.textContent.trim());
        }
        return;
      }
      if (!e.target.closest('.portal-multi-select__dropdown')) {
        var willOpen = !root.classList.contains('is-open');
        root.classList.toggle('is-open');
        if (willOpen) syncMultiSelectOptions(root);
      }
    });

    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) root.classList.remove('is-open');
    });

    updatePlaceholder();
    syncHidden();
  }

  var SELECT_ENHANCE_SELECTOR = 'select.portal-select, select.filter-select, select.search-select, select.form-select';

  function isPlaceholderOption(opt) {
    return !!(opt && (opt.hidden || opt.value === ''));
  }

  function getPlaceholderOption(select) {
    var found = null;
    Array.prototype.some.call(select.options, function (opt) {
      if (isPlaceholderOption(opt)) {
        found = opt;
        return true;
      }
      return false;
    });
    return found;
  }

  function getSelectFieldLabel(select) {
    var field = select.closest('.portal-field, .form-group, .form-field, .form-item, .ff, .filter-field');
    var label = field
      ? field.querySelector('.portal-field__label, .form-label, .filter-label, label')
      : null;
    if (!label && select.id) {
      label = document.querySelector('label[for="' + select.id + '"]');
    }
    if (!label) return '';
    return String(label.textContent || '')
      .replace(/\*/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isRequiredFormSelect(select) {
    if (select.required) return true;
    var flag = String(select.dataset.clearable || '').toLowerCase();
    if (flag === '0' || flag === 'false' || flag === 'no') return true;
    var field = select.closest('.portal-field, .form-group, .form-field, .form-item, .ff');
    if (!field) return false;
    if (field.querySelector('.req, .form-required, .required, .portal-req, .portal-field__req')) return true;
    var label = field.querySelector('.portal-field__label, .form-label, label');
    if (!label) return false;
    var text = String(label.textContent || '').trim();
    return text.indexOf('*') !== -1;
  }

  /** Select nằm trong Create / Edit (modal hoặc form trang) */
  function isCreateEditFormSelect(select) {
    if (!select) return false;
    if (select.closest('#createModal, #editModal, #createForm, #editForm')) return true;
    if (select.closest('.portal-form-grid, .portal-form-horizontal')) return true;
    if (select.closest('.portal-modal') && select.closest('form')) return true;
    if (select.classList.contains('form-select') && select.closest('.form-card, .form-grid, .form-group, .form-body')) {
      return true;
    }
    return false;
  }

  /**
   * Create/Edit — chuẩn bị allowClear:
   * - Field bắt buộc (*): data-clearable="false"
   * - Field tùy chọn: đảm bảo có option value="" (placeholder)
   */
  function prepareCreateEditSelectClearable(select) {
    if (!isCreateEditFormSelect(select)) return;
    if (isRequiredFormSelect(select)) {
      if (!select.dataset.clearable) select.dataset.clearable = 'false';
      return;
    }
    var first = select.options[0];
    if (first && first.value !== '' && !first.hidden) {
      var t = String(first.textContent || '').trim();
      if (/^[-–—.]{1,3}\s*Chọn/i.test(t) || /^Chọn\b/i.test(t) || /^—\s/.test(t)) {
        first.value = '';
        first.hidden = true;
      }
    }
    if (getPlaceholderOption(select)) return;
    var opt = document.createElement('option');
    opt.value = '';
    opt.hidden = true;
    opt.textContent = getSelectFieldLabel(select) || 'Chọn';
    var selectedBefore = select.selectedIndex;
    select.insertBefore(opt, select.firstChild);
    if (selectedBefore >= 0) {
      select.selectedIndex = selectedBefore + 1;
    }
  }

  function syncSelectClearUi(select) {
    if (!select) return;
    var ui = select.closest('.portal-select-ui');
    if (!ui) return;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setSelectValue(selectOrId, value) {
    var select = typeof selectOrId === 'string' ? document.getElementById(selectOrId) : selectOrId;
    if (!select) return;
    select.value = value == null ? '' : String(value);
    syncSelectClearUi(select);
  }

  function syncFormSelectsClear(root) {
    var scope = root || document;
    scope.querySelectorAll(SELECT_ENHANCE_SELECTOR).forEach(function (select) {
      if (select.closest('.portal-select-ui')) syncSelectClearUi(select);
    });
  }

  function initRoundedSelect(select) {
    if (!select || select.dataset.portalRoundedSelect === '1') return;
    if (select.multiple || select.getAttribute('size')) return;
    if (select.closest('.portal-multi-select')) return;
    if (select.classList.contains('portal-multi-select__hidden')) return;

    prepareCreateEditSelectClearable(select);

    select.dataset.portalRoundedSelect = '1';

    var ui = document.createElement('div');
    ui.className = 'portal-select-ui';
    select.parentNode.insertBefore(ui, select);
    ui.appendChild(select);

    var clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'portal-select-ui__clear';
    clearBtn.setAttribute('aria-label', 'Bỏ chọn');
    clearBtn.title = 'Bỏ chọn';
    clearBtn.innerHTML = '<span aria-hidden="true">×</span>';
    ui.appendChild(clearBtn);

    var panel = document.createElement('ul');
    panel.className = 'portal-select-ui__dropdown';
    panel.setAttribute('role', 'listbox');
    ui.appendChild(panel);

    function getPlaceholderOptionLocal() {
      return getPlaceholderOption(select);
    }

    /** Cho phép bỏ chọn khi có option placeholder (value="") — tắt bằng data-clearable="false" */
    function isClearable() {
      var flag = String(select.dataset.clearable || '').toLowerCase();
      if (flag === '0' || flag === 'false' || flag === 'no') return false;
      if (flag === '1' || flag === 'true' || flag === 'yes') return true;
      return !!getPlaceholderOptionLocal();
    }

    function hasSelectedValue() {
      var opt = select.options[select.selectedIndex];
      return !!(opt && !isPlaceholderOption(opt) && opt.value !== '');
    }

    function emitChange() {
      select.dispatchEvent(new Event('change', { bubbles: true }));
      select.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function clearSelection() {
      var placeholder = getPlaceholderOptionLocal();
      if (!placeholder) return false;
      Array.prototype.forEach.call(select.options, function (o) {
        o.selected = o === placeholder;
      });
      select.value = placeholder.value;
      emitChange();
      syncClearState();
      return true;
    }

    function selectOption(opt) {
      select.value = opt.value;
      Array.prototype.forEach.call(select.options, function (o) {
        o.selected = o === opt;
      });
      emitChange();
      syncClearState();
    }

    function syncClearState() {
      var clearable = isClearable();
      var hasValue = hasSelectedValue();
      ui.classList.toggle('is-clearable', clearable);
      ui.classList.toggle('has-value', hasValue);
      clearBtn.hidden = !(clearable && hasValue && !select.disabled);
      clearBtn.disabled = select.disabled;
    }

    function rebuild() {
      panel.innerHTML = '';
      var opts = Array.prototype.slice.call(select.options);
      var visible = opts.filter(function (opt) { return !isPlaceholderOption(opt); });
      if (!visible.length) {
        var empty = document.createElement('li');
        empty.className = 'portal-select-ui__empty';
        empty.textContent = 'Không có dữ liệu';
        panel.appendChild(empty);
        return;
      }
      visible.forEach(function (opt) {
        var li = document.createElement('li');
        li.className = 'portal-select-ui__option';
        li.setAttribute('role', 'option');
        li.textContent = opt.textContent;
        li.dataset.value = opt.value;
        var isSelected = opt.selected && !isPlaceholderOption(opt);
        if (isSelected) {
          li.classList.add('is-selected');
          li.setAttribute('aria-selected', 'true');
          if (isClearable()) li.title = 'Chọn lại để bỏ chọn';
        }
        if (opt.disabled) {
          li.style.opacity = '0.45';
          li.style.pointerEvents = 'none';
        }
        li.addEventListener('mousedown', function (e) {
          e.preventDefault();
          e.stopPropagation();
          /* Click lại option đang chọn → bỏ chọn (nếu clearable) */
          var currentlySelected = hasSelectedValue() && select.value === String(opt.value);
          if (currentlySelected && isClearable()) {
            clearSelection();
            closePanel();
            rebuild();
            return;
          }
          selectOption(opt);
          closePanel();
          rebuild();
        });
        panel.appendChild(li);
      });
    }

    function openPanel() {
      document.querySelectorAll('.portal-select-ui.is-open').forEach(function (el) {
        if (el !== ui) el.classList.remove('is-open');
      });
      syncClearState();
      rebuild();
      ui.classList.add('is-open');
    }

    function closePanel() {
      ui.classList.remove('is-open');
    }

    function togglePanel() {
      if (ui.classList.contains('is-open')) closePanel();
      else openPanel();
    }

    clearBtn.addEventListener('mousedown', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (select.disabled || !isClearable()) return;
      clearSelection();
      closePanel();
      rebuild();
      select.focus();
    });

    select.addEventListener('mousedown', function (e) {
      if (select.disabled) return;
      if (e.target === clearBtn || clearBtn.contains(e.target)) return;
      e.preventDefault();
      select.focus();
      togglePanel();
    });

    select.addEventListener('keydown', function (e) {
      if (select.disabled) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        openPanel();
      } else if (e.key === 'Escape') {
        closePanel();
      } else if ((e.key === 'Backspace' || e.key === 'Delete') && isClearable() && hasSelectedValue()) {
        e.preventDefault();
        clearSelection();
        rebuild();
      }
    });

    select.addEventListener('change', syncClearState);
    select.addEventListener('input', syncClearState);
    select.addEventListener('focus', syncClearState);

    // Cascade / JS rebuild options — keep panel in sync when opened
    var mo = new MutationObserver(function () {
      syncClearState();
      if (ui.classList.contains('is-open')) rebuild();
    });
    mo.observe(select, { childList: true, subtree: true, attributes: true });

    syncClearState();

    if (!document.documentElement.dataset.portalSelectUiDocClick) {
      document.documentElement.dataset.portalSelectUiDocClick = '1';
      document.addEventListener('mousedown', function (e) {
        document.querySelectorAll('.portal-select-ui.is-open').forEach(function (el) {
          if (!el.contains(e.target)) el.classList.remove('is-open');
        });
      });
    }
  }

  function initRoundedSelects(root) {
    var scope = root || document;
    scope.querySelectorAll(SELECT_ENHANCE_SELECTOR).forEach(initRoundedSelect);
  }

  function bindCreateEditSelectSync() {
    if (document.documentElement.dataset.portalSelectFormSync === '1') return;
    document.documentElement.dataset.portalSelectFormSync = '1';

    function syncFromModal(modal) {
      if (!modal) return;
      syncFormSelectsClear(modal);
    }

    document.addEventListener('click', function (e) {
      var overlay = e.target.closest('.portal-modal-overlay, .portal-modal');
      if (!overlay) return;
      setTimeout(function () {
        var openModal = document.querySelector('.portal-modal-overlay.open, .portal-modal-overlay.is-open, .portal-modal.open');
        if (openModal) syncFromModal(openModal);
      }, 0);
    }, true);

    if (typeof MutationObserver !== 'undefined') {
      var mo = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          var el = m.target;
          if (!el || !el.classList) return;
          if (
            el.classList.contains('portal-modal-overlay') ||
            el.classList.contains('portal-modal')
          ) {
            if (el.classList.contains('open') || el.classList.contains('is-open')) {
              syncFromModal(el);
            }
          }
        });
      });
      mo.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  function initAll() {
    document.querySelectorAll('.portal-multi-select').forEach(initMultiSelect);
    initRoundedSelects(document);
    bindCreateEditSelectSync();
    if (global.PortalDateRangePicker && global.PortalDateRangePicker.init) {
      global.PortalDateRangePicker.init(document);
    }
    initPageAdvancedFilter();
    document.querySelectorAll('.filter-card, .search-card').forEach(function (card) {
      setupFilterHeader(card, false);
      relocateFilterActions(card);
    });
    document.querySelectorAll('.portal-query-filter').forEach(function (card) {
      setupFilterHeader(card, true);
      var bd = card.querySelector('.portal-card__bd');
      if (bd) relocateFilterActions(bd);
    });
  }

  global.PortalMockupWidgets = {
    initMultiSelect: initMultiSelect,
    syncMultiSelectOptions: syncMultiSelectOptions,
    getMultiSelectValues: getMultiSelectValues,
    setMultiSelectValues: setMultiSelectValues,
    clearMultiSelect: clearMultiSelect,
    setMultiSelectDisabled: setMultiSelectDisabled,
    initRoundedSelect: initRoundedSelect,
    initRoundedSelects: initRoundedSelects,
    setSelectValue: setSelectValue,
    syncSelectClearUi: syncSelectClearUi,
    syncFormSelectsClear: syncFormSelectsClear,
    prepareCreateEditSelectClearable: prepareCreateEditSelectClearable,
    initPageAdvancedFilter: initPageAdvancedFilter,
    initAll: initAll
  };

  function wardStreetCheckToggle(checkSet, getItem, getStreetsForParent, key, checked, parentKeyField) {
    parentKeyField = parentKeyField || 'parentWardKey';
    var item = getItem(key);
    if (!item || !item.selectable) return;
    var parentKey = item[parentKeyField];
    if (checked) {
      checkSet.add(key);
      if (item.assignLevel === 'Phường') {
        getStreetsForParent(key).forEach(function (street) {
          checkSet.add(street.id || street.key);
        });
      } else if (item.assignLevel === 'Đường' && parentKey) {
        var streets = getStreetsForParent(parentKey);
        if (streets.length && streets.every(function (street) {
          return checkSet.has(street.id || street.key);
        })) {
          checkSet.add(parentKey);
        }
      }
    } else {
      checkSet.delete(key);
      if (item.assignLevel === 'Phường') {
        getStreetsForParent(key).forEach(function (street) {
          checkSet.delete(street.id || street.key);
        });
      } else if (item.assignLevel === 'Đường' && parentKey) {
        checkSet.delete(parentKey);
      }
    }
  }

  global.PortalWardStreetCheck = {
    toggle: wardStreetCheckToggle
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})(window);
