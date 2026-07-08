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
          '<option value="">Chọn công ty</option>' +
          '<option value="FVC" selected>FVC — Finviet Consumer</option>' +
          '<option value="ABI">ABI — Công ty ABI</option>' +
        '</select>' +
      '</div>' +
      '<div class="portal-advanced-filter__field" data-adv-key="region">' +
        '<label class="portal-field__label">Vùng</label>' +
        '<select class="filter-select portal-select" data-adv-select="region">' +
          '<option value="">Chọn vùng</option>' +
          '<option value="MN">GR8098372 — Miền Nam</option>' +
          '<option value="MB">GR8098371 — Miền Bắc</option>' +
        '</select>' +
      '</div>' +
      '<div class="portal-advanced-filter__field" data-adv-key="group">' +
        '<label class="portal-field__label">Nhóm</label>' +
        '<select class="filter-select portal-select" data-adv-select="group">' +
          '<option value="">Chọn nhóm</option>' +
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
        addTag(opt.getAttribute('data-value'), opt.textContent.trim());
        root.classList.remove('is-open');
        return;
      }
      if (!e.target.closest('.portal-multi-select__dropdown')) root.classList.toggle('is-open');
    });

    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) root.classList.remove('is-open');
    });

    updatePlaceholder();
    syncHidden();
  }

  function initAll() {
    document.querySelectorAll('.portal-multi-select').forEach(initMultiSelect);
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
