/**
 * [WEB] Date range picker — Ant Design RangePicker (2 tháng)
 * CSS: mockups/web/_shared/portal-date-range-picker.css
 */
(function (global) {
  var popupOwners = new WeakMap();
  var pickerRegistry = new WeakMap();

  function parseDate(str) {
    if (!str) return null;
    var s = String(str).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      var iso = s.split('-');
      return new Date(parseInt(iso[0], 10), parseInt(iso[1], 10) - 1, parseInt(iso[2], 10));
    }
    var parts = s.split(/[\/\-\.]/);
    if (parts.length !== 3) return null;
    var d = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var y = parseInt(parts[2], 10);
    if (!d || !m || !y) return null;
    if (y < 100) y += 2000;
    return new Date(y, m - 1, d);
  }

  function formatDate(date) {
    if (!date) return '';
    var pad = function (n) { return n < 10 ? '0' + n : n; };
    return pad(date.getDate()) + '/' + pad(date.getMonth() + 1) + '/' + date.getFullYear();
  }

  function formatMonthTitle(date) {
    var pad = function (n) { return n < 10 ? '0' + n : n; };
    return 'Th' + pad(date.getMonth() + 1) + ' ' + date.getFullYear();
  }

  function sameDay(a, b) {
    return !!(a && b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate());
  }

  function normalizeInputs(inputs) {
    Array.prototype.forEach.call(inputs, function (input) {
      if (input.type === 'date') {
        var iso = input.value;
        input.type = 'text';
        input.value = iso ? formatDate(parseDate(iso)) : '';
      }
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('autocomplete', 'off');
    });
  }

  function buildPopup(wrap) {
    var popup = document.createElement('div');
    popup.className = 'range-calendar-popup';
    popup.innerHTML =
      '<div class="range-calendar-toolbar">' +
        '<button type="button" data-cal-prev-year aria-label="Năm trước">«</button>' +
        '<button type="button" data-cal-prev-month aria-label="Tháng trước">‹</button>' +
        '<div class="range-calendar-titles">' +
          '<span class="range-calendar-title" data-cal-title-left></span>' +
          '<span class="range-calendar-title" data-cal-title-right></span>' +
        '</div>' +
        '<button type="button" data-cal-next-month aria-label="Tháng sau">›</button>' +
        '<button type="button" data-cal-next-year aria-label="Năm sau">»</button>' +
      '</div>' +
      '<div class="range-calendar-panels">' +
        '<div class="range-calendar-panel" data-panel="left">' +
          '<div class="range-calendar-weekdays">' +
            '<span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>' +
          '</div>' +
          '<div class="range-calendar-days" data-cal-grid-left></div>' +
        '</div>' +
        '<div class="range-calendar-panel" data-panel="right">' +
          '<div class="range-calendar-weekdays">' +
            '<span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>' +
          '</div>' +
          '<div class="range-calendar-days" data-cal-grid-right></div>' +
        '</div>' +
      '</div>' +
      '<div class="range-calendar-footer">' +
        '<button type="button" class="range-calendar-clear" data-cal-clear>Xóa</button>' +
      '</div>';
    wrap.appendChild(popup);
    popupOwners.set(popup, wrap);
    return popup;
  }

  function ensureClearFooter(popup) {
    if (!popup.querySelector('[data-cal-clear]')) {
      var footer = document.createElement('div');
      footer.className = 'range-calendar-footer';
      footer.innerHTML = '<button type="button" class="range-calendar-clear" data-cal-clear>Xóa</button>';
      popup.appendChild(footer);
    }
  }

  function clearSelection(wrap, dispatchEvent) {
    var entry = getRegistry(wrap);
    if (!entry) return false;
    entry.pickStart = null;
    entry.pickEnd = null;
    entry.fromInput.value = '';
    entry.toInput.value = '';
    syncClearButton(wrap);
    if (dispatchEvent !== false) {
      wrap.dispatchEvent(new CustomEvent('daterange:clear', { bubbles: true }));
      wrap.dispatchEvent(new CustomEvent('daterange:apply', { bubbles: true }));
    }
    return true;
  }

  function hasRangeValue(wrap) {
    var entry = getRegistry(wrap);
    if (!entry) return false;
    return !!(String(entry.fromInput.value || '').trim() || String(entry.toInput.value || '').trim());
  }

  function syncClearButton(wrap) {
    var entry = getRegistry(wrap);
    if (!entry || !entry.clearBtn) return;
    var show = hasRangeValue(wrap);
    wrap.classList.toggle('has-value', show);
    entry.clearBtn.hidden = !show;
  }

  function ensureInlineClearButton(wrap) {
    var existing = wrap.querySelector('.portal-date-range__clear');
    if (existing) return existing;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'portal-date-range__clear';
    btn.setAttribute('aria-label', 'Xóa khoảng thời gian');
    btn.title = 'Xóa';
    btn.innerHTML = '<span aria-hidden="true">×</span>';
    btn.hidden = true;
    var icon = wrap.querySelector('.portal-date-range__icon');
    if (icon && icon.parentNode === wrap) {
      wrap.insertBefore(btn, icon);
    } else {
      wrap.appendChild(btn);
    }
    return btn;
  }

  function getRegistry(wrap) {
    return pickerRegistry.get(wrap) || null;
  }

  function getPopupForWrap(wrap) {
    var entry = getRegistry(wrap);
    if (entry && entry.popup) return entry.popup;
    return wrap ? wrap.querySelector('.range-calendar-popup') : null;
  }

  function mountPopup(wrap, popup) {
    if (popup.parentNode !== document.body) {
      document.body.appendChild(popup);
    }
    popupOwners.set(popup, wrap);
  }

  function unmountPopup(wrap, popup) {
    if (popup && popup.parentNode === document.body && wrap) {
      wrap.appendChild(popup);
    }
    if (popup) {
      popup.style.left = '';
      popup.style.top = '';
      popup.style.width = '';
    }
  }

  function positionPopup(wrap, popup) {
    var rect = wrap.getBoundingClientRect();
    var popupWidth = Math.max(552, rect.width);
    var left = rect.left;
    var top = rect.bottom + 4;
    popup.style.width = popupWidth + 'px';
    if (left + popupWidth > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - popupWidth - 8);
    }
    var popupHeight = popup.offsetHeight || 340;
    if (top + popupHeight > window.innerHeight - 8) {
      top = Math.max(8, rect.top - popupHeight - 4);
    }
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
  }

  function commitSelection(wrap, dispatchEvent) {
    var entry = getRegistry(wrap);
    if (!entry || !entry.pickStart) return false;

    var start = entry.pickStart;
    var end = entry.pickEnd || entry.pickStart;
    var from = start <= end ? start : end;
    var to = start <= end ? end : start;

    entry.fromInput.value = formatDate(from);
    entry.toInput.value = formatDate(to);

    if (dispatchEvent !== false) {
      wrap.dispatchEvent(new CustomEvent('daterange:apply', { bubbles: true }));
    }
    syncClearButton(wrap);
    return true;
  }

  function closePopupForWrap(wrap, shouldCommit) {
    if (!wrap) return;
    var popup = getPopupForWrap(wrap);
    if (!popup || !popup.classList.contains('open')) return;

    if (shouldCommit) {
      commitSelection(wrap);
    }

    popup.classList.remove('open');
    wrap.classList.remove('is-calendar-open');
    unmountPopup(wrap, popup);
  }

  function renderMonthGrid(grid, year, month, pickStart, pickEnd, onDayClick) {
    grid.innerHTML = '';
    var first = new Date(year, month, 1);
    var startOffset = (first.getDay() + 6) % 7;
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var prevDays = new Date(year, month, 0).getDate();
    var i;

    for (i = 0; i < 42; i++) {
      var dayNum;
      var cellDate;
      var other = false;
      if (i < startOffset) {
        dayNum = prevDays - startOffset + i + 1;
        cellDate = new Date(year, month - 1, dayNum);
        other = true;
      } else if (i >= startOffset + daysInMonth) {
        dayNum = i - startOffset - daysInMonth + 1;
        cellDate = new Date(year, month + 1, dayNum);
        other = true;
      } else {
        dayNum = i - startOffset + 1;
        cellDate = new Date(year, month, dayNum);
      }

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'range-calendar-day' + (other ? ' is-other' : '');
      btn.textContent = dayNum;
      btn.dataset.y = String(cellDate.getFullYear());
      btn.dataset.m = String(cellDate.getMonth());
      btn.dataset.d = String(cellDate.getDate());

      if (sameDay(cellDate, pickStart)) btn.classList.add('is-start');
      if (sameDay(cellDate, pickEnd)) btn.classList.add('is-end');
      if (pickStart && pickEnd) {
        var min = pickStart < pickEnd ? pickStart : pickEnd;
        var max = pickStart < pickEnd ? pickEnd : pickStart;
        if (cellDate > min && cellDate < max) btn.classList.add('in-range');
        if (sameDay(pickStart, pickEnd) && sameDay(cellDate, pickStart)) {
          btn.classList.add('is-start', 'is-end');
        }
      }

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        onDayClick(new Date(
          parseInt(this.dataset.y, 10),
          parseInt(this.dataset.m, 10),
          parseInt(this.dataset.d, 10)
        ));
      });
      grid.appendChild(btn);
    }
  }

  function initRangePicker(wrap) {
    if (!wrap || wrap.dataset.rangePickerInit === '1') return;
    if (wrap.dataset.dateRangeCustom === '1') return;

    var inputs = wrap.querySelectorAll('.portal-date-range__input');
    if (inputs.length < 2) return;

    wrap.dataset.rangePickerInit = '1';
    wrap.classList.add('portal-date-range--picker');

    var fromInput = inputs[0];
    var toInput = inputs[1];
    normalizeInputs(inputs);

    var popup = wrap.querySelector('.range-calendar-popup');
    if (popup && popup.querySelector('[data-cal-grid-left]')) {
      ensureClearFooter(popup);
      popupOwners.set(popup, wrap);
    } else {
      if (popup) popup.remove();
      popup = buildPopup(wrap);
    }

    var clearInlineBtn = ensureInlineClearButton(wrap);

    var state = {
      popup: popup,
      fromInput: fromInput,
      toInput: toInput,
      clearBtn: clearInlineBtn,
      pickStart: null,
      pickEnd: null,
      viewDate: new Date()
    };
    pickerRegistry.set(wrap, state);

    var gridLeft = popup.querySelector('[data-cal-grid-left]');
    var gridRight = popup.querySelector('[data-cal-grid-right]');
    var titleLeft = popup.querySelector('[data-cal-title-left]');
    var titleRight = popup.querySelector('[data-cal-title-right]');

    function renderCalendar() {
      var leftMonth = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth(), 1);
      var rightMonth = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 1);
      titleLeft.textContent = formatMonthTitle(leftMonth);
      titleRight.textContent = formatMonthTitle(rightMonth);

      function onDayClick(d) {
        if (!state.pickStart || (state.pickStart && state.pickEnd)) {
          state.pickStart = d;
          state.pickEnd = null;
        } else if (d < state.pickStart) {
          state.pickEnd = state.pickStart;
          state.pickStart = d;
        } else {
          state.pickEnd = d;
        }
        renderCalendar();
        if (state.pickStart && state.pickEnd) {
          commitSelection(wrap);
          closePopupForWrap(wrap, false);
        }
      }

      renderMonthGrid(gridLeft, leftMonth.getFullYear(), leftMonth.getMonth(), state.pickStart, state.pickEnd, onDayClick);
      renderMonthGrid(gridRight, rightMonth.getFullYear(), rightMonth.getMonth(), state.pickStart, state.pickEnd, onDayClick);
    }

    function openPopup() {
      state.pickStart = parseDate(fromInput.value);
      state.pickEnd = toInput.value.trim() ? parseDate(toInput.value) : null;
      if (state.pickStart) {
        state.viewDate = new Date(state.pickStart.getFullYear(), state.pickStart.getMonth(), 1);
      } else {
        state.viewDate = new Date();
      }
      mountPopup(wrap, popup);
      popup.classList.add('open');
      wrap.classList.add('is-calendar-open');
      renderCalendar();
      positionPopup(wrap, popup);
    }

    wrap.addEventListener('click', function (e) {
      if (e.target.closest('.range-calendar-popup')) return;
      if (e.target.closest('.portal-date-range__clear')) return;
      e.stopPropagation();
      if (popup.classList.contains('open')) return;
      openPopup();
    });

    clearInlineBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      clearSelection(wrap);
      closePopupForWrap(wrap, false);
      if (popup.classList.contains('open')) {
        renderCalendar();
        positionPopup(wrap, popup);
      }
    });

    popup.querySelector('[data-cal-prev-year]').addEventListener('click', function (e) {
      e.stopPropagation();
      state.viewDate.setFullYear(state.viewDate.getFullYear() - 1);
      renderCalendar();
      positionPopup(wrap, popup);
    });
    popup.querySelector('[data-cal-next-year]').addEventListener('click', function (e) {
      e.stopPropagation();
      state.viewDate.setFullYear(state.viewDate.getFullYear() + 1);
      renderCalendar();
      positionPopup(wrap, popup);
    });
    popup.querySelector('[data-cal-prev-month]').addEventListener('click', function (e) {
      e.stopPropagation();
      state.viewDate.setMonth(state.viewDate.getMonth() - 1);
      renderCalendar();
      positionPopup(wrap, popup);
    });
    popup.querySelector('[data-cal-next-month]').addEventListener('click', function (e) {
      e.stopPropagation();
      state.viewDate.setMonth(state.viewDate.getMonth() + 1);
      renderCalendar();
      positionPopup(wrap, popup);
    });

    var clearBtn = popup.querySelector('[data-cal-clear]');
    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        clearSelection(wrap);
        renderCalendar();
        positionPopup(wrap, popup);
      });
    }

    syncClearButton(wrap);

    if (!wrap.dataset.rangePickerListeners) {
      wrap.dataset.rangePickerListeners = '1';
      window.addEventListener('resize', function () {
        if (popup.classList.contains('open')) positionPopup(wrap, popup);
      });
      window.addEventListener('scroll', function () {
        if (popup.classList.contains('open')) positionPopup(wrap, popup);
      }, true);
    }

    if (!document.documentElement.dataset.portalDatePickerDocClick) {
      document.documentElement.dataset.portalDatePickerDocClick = '1';
      document.addEventListener('mousedown', function (e) {
        document.querySelectorAll('.portal-date-range.is-calendar-open').forEach(function (el) {
          var popupEl = getPopupForWrap(el);
          if (!popupEl) return;
          if (el.contains(e.target) || popupEl.contains(e.target)) return;
          closePopupForWrap(el, true);
        });
      });
    }
  }

  function initAll(root) {
    var scope = root || document;
    scope.querySelectorAll('.portal-date-range--picker, .portal-date-range[data-date-range-picker], .portal-date-range[data-range-picker-init]').forEach(initRangePicker);
    scope.querySelectorAll('.portal-date-range:not([data-range-picker-init]):not([data-date-range-custom])').forEach(initRangePicker);
  }

  function closeAll(shouldCommit) {
    var commit = shouldCommit !== false;
    document.querySelectorAll('.portal-date-range.is-calendar-open').forEach(function (wrap) {
      closePopupForWrap(wrap, commit);
    });
  }

  global.PortalDateRangePicker = {
    init: initAll,
    initOne: initRangePicker,
    closeAll: closeAll,
    clear: function (wrap) { return clearSelection(wrap); },
    syncClear: syncClearButton
  };

  function boot() {
    initAll(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(typeof window !== 'undefined' ? window : this);
