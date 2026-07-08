/**
 * [APP/ECOM] Kết hợp thanh toán — logic dùng chung FE + BE (mockup + reference impl).
 * paymentMethod detail: QR | CASH | BANK_TRANSFER | DEBT
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.MixedPayment = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var METHOD = {
    QR: 'QR',
    CASH: 'CASH',
    BANK_TRANSFER: 'BANK_TRANSFER',
    DEBT: 'DEBT'
  };

  var METHOD_KEYS = ['qr', 'cash', 'transfer', 'debt'];

  var KEY_TO_METHOD = {
    qr: METHOD.QR,
    cash: METHOD.CASH,
    transfer: METHOD.BANK_TRANSFER,
    debt: METHOD.DEBT
  };

  var UI_STATUS = {
    EMPTY: 'EMPTY',
    OK: 'OK',
    SHORT: 'SHORT',
    OVER: 'OVER'
  };

  var PAYMENT_STATUS = {
    UNPAID: 'UNPAID',
    PARTIALLY_PAID: 'PARTIALLY_PAID',
    PAID: 'PAID',
    DEBT: 'DEBT'
  };

  var MSG = {
    NEGATIVE: 'Số tiền không được nhỏ hơn 0.',
    OVER_TOTAL: 'Tổng tiền thanh toán không được vượt số tiền cần thu.',
    SHORT: 'Còn thiếu {amount}. Vui lòng chọn thêm phương thức hoặc ghi công nợ.',
    OVER: 'Vượt {amount} so với số tiền cần thu.',
    NO_METHOD: 'Vui lòng chọn ít nhất một phương thức thanh toán.',
    ZERO_SELECTED: 'Vui lòng nhập số tiền cho phương thức đã chọn.',
    QR_NOT_PAID: 'Vui lòng chạm xác nhận đã quét QR.',
    CASH_NOT_CONFIRMED: 'Vui lòng chạm xác nhận đã thu tiền mặt.',
    TRANSFER_NOT_CONFIRMED: 'Vui lòng chạm xác nhận đã chuyển khoản.',
    DEBT_NOT_CONFIRMED: 'Vui lòng chạm xác nhận ghi nợ.',
    TRANSFER_REF_REQUIRED: 'Vui lòng nhập mã giao dịch chuyển khoản.',
    DEBT_NOTE_REQUIRED: 'Vui lòng nhập ghi chú công nợ.',
    DEBT_LIMIT: 'Công nợ vượt hạn mức cho phép.',
    NOT_BALANCED: 'Tổng tiền các phương thức phải bằng số tiền cần thu.'
  };

  function toNumber(value) {
    if (typeof value === 'number' && !isNaN(value)) return Math.round(value);
    return Math.round(Number(String(value || '').replace(/[^\d-]/g, '') || 0));
  }

  function createEmptyState() {
    return {
      selected: { qr: false, cash: false, transfer: false, debt: false },
      amounts: { qr: 0, cash: 0, transfer: 0, debt: 0 },
      userEdited: { qr: false, cash: false, transfer: false, debt: false },
      transferRef: '',
      debtNote: '',
      debtDueDate: ''
    };
  }

  function cloneState(state) {
    state = state || createEmptyState();
    return {
      selected: {
        qr: !!state.selected && !!state.selected.qr,
        cash: !!state.selected && !!state.selected.cash,
        transfer: !!state.selected && !!state.selected.transfer,
        debt: !!state.selected && !!state.selected.debt
      },
      amounts: {
        qr: toNumber(state.amounts && state.amounts.qr),
        cash: toNumber(state.amounts && state.amounts.cash),
        transfer: toNumber(state.amounts && state.amounts.transfer),
        debt: toNumber(state.amounts && state.amounts.debt)
      },
      userEdited: {
        qr: !!(state.userEdited && state.userEdited.qr),
        cash: !!(state.userEdited && state.userEdited.cash),
        transfer: !!(state.userEdited && state.userEdited.transfer),
        debt: !!(state.userEdited && state.userEdited.debt)
      },
      transferRef: String(state.transferRef || ''),
      debtNote: String(state.debtNote || ''),
      debtDueDate: String(state.debtDueDate || '')
    };
  }

  function countSelected(state) {
    return METHOD_KEYS.filter(function (k) { return state.selected[k]; }).length;
  }

  function sumOtherAmounts(state, exceptKey) {
    return METHOD_KEYS.reduce(function (sum, k) {
      if (k === exceptKey) return sum;
      return sum + (state.selected[k] ? toNumber(state.amounts[k]) : 0);
    }, 0);
  }

  function getRemainingAmount(state, totalPayable) {
    totalPayable = toNumber(totalPayable);
    var handled = computeTotals(state, totalPayable).totalHandledAmount;
    return totalPayable - handled;
  }

  function computeTotals(state, totalPayable) {
    state = cloneState(state);
    totalPayable = toNumber(totalPayable);
    var qrAmount = state.selected.qr ? state.amounts.qr : 0;
    var cashAmount = state.selected.cash ? state.amounts.cash : 0;
    var bankTransferAmount = state.selected.transfer ? state.amounts.transfer : 0;
    var debtAmount = state.selected.debt ? state.amounts.debt : 0;
    var totalPaidAmount = qrAmount + cashAmount + bankTransferAmount;
    var totalHandledAmount = totalPaidAmount + debtAmount;
    var remainingAmount = totalPayable - totalHandledAmount;
    var uiStatus = UI_STATUS.EMPTY;
    if (totalPayable <= 0) {
      uiStatus = UI_STATUS.OK;
    } else if (totalHandledAmount === 0 && countSelected(state) === 0) {
      uiStatus = UI_STATUS.EMPTY;
    } else if (remainingAmount > 0) {
      uiStatus = UI_STATUS.SHORT;
    } else if (remainingAmount < 0) {
      uiStatus = UI_STATUS.OVER;
    } else {
      uiStatus = UI_STATUS.OK;
    }
    return {
      totalPayableAmount: totalPayable,
      qrAmount: qrAmount,
      cashAmount: cashAmount,
      bankTransferAmount: bankTransferAmount,
      debtAmount: debtAmount,
      totalPaidAmount: totalPaidAmount,
      totalHandledAmount: totalHandledAmount,
      remainingAmount: remainingAmount,
      uiStatus: uiStatus
    };
  }

  function derivePaymentStatus(totals) {
    if (totals.totalPayableAmount <= 0) return PAYMENT_STATUS.PAID;
    if (totals.totalPaidAmount === 0 && totals.debtAmount === totals.totalPayableAmount) return PAYMENT_STATUS.DEBT;
    if (totals.totalPaidAmount > 0 && totals.debtAmount > 0) return PAYMENT_STATUS.PARTIALLY_PAID;
    if (totals.totalPaidAmount === totals.totalPayableAmount && totals.debtAmount === 0) return PAYMENT_STATUS.PAID;
    if (totals.totalPaidAmount === 0 && totals.debtAmount === 0) return PAYMENT_STATUS.UNPAID;
    return PAYMENT_STATUS.PARTIALLY_PAID;
  }

  function toggleMethod(state, methodKey, totalPayable, enable) {
    state = cloneState(state);
    if (METHOD_KEYS.indexOf(methodKey) < 0) return state;
    totalPayable = toNumber(totalPayable);

    if (enable === false || state.selected[methodKey]) {
      state.selected[methodKey] = false;
      state.amounts[methodKey] = 0;
      state.userEdited[methodKey] = false;
      if (methodKey === 'transfer') state.transferRef = '';
      if (methodKey === 'debt') {
        state.debtNote = '';
        state.debtDueDate = '';
      }
      return redistributeAutoAmounts(state, totalPayable);
    }

    state.selected[methodKey] = true;
    state.userEdited[methodKey] = false;

    if (countSelected(state) === 1) {
      state.amounts[methodKey] = totalPayable;
      return state;
    }

    var others = sumOtherAmounts(state, methodKey);
    state.amounts[methodKey] = Math.max(0, totalPayable - others);
    return state;
  }

  function setAmount(state, methodKey, rawAmount, totalPayable) {
    state = cloneState(state);
    if (!state.selected[methodKey]) return state;
    var amount = Math.max(0, toNumber(rawAmount));
    state.amounts[methodKey] = amount;
    return state;
  }

  /**
   * Giữ nguyên số user đã nhập (userEdited); phần còn lại chia cho các ô auto.
   */
  function redistributeAutoAmounts(state, totalPayable) {
    state = cloneState(state);
    totalPayable = toNumber(totalPayable);
    var selected = METHOD_KEYS.filter(function (k) { return state.selected[k]; });
    if (selected.length === 0) return state;
    if (selected.length === 1) {
      state.amounts[selected[0]] = totalPayable;
      return state;
    }

    var lockedSum = 0;
    selected.forEach(function (k) {
      if (state.userEdited[k]) lockedSum += toNumber(state.amounts[k]);
    });

    var autoKeys = selected.filter(function (k) { return !state.userEdited[k]; });
    var remainder = Math.max(0, totalPayable - lockedSum);

    if (autoKeys.length === 0) return state;

    if (autoKeys.length === 1) {
      state.amounts[autoKeys[0]] = remainder;
      return state;
    }

    var each = Math.floor(remainder / autoKeys.length);
    var assigned = 0;
    autoKeys.forEach(function (k, i) {
      if (i === autoKeys.length - 1) {
        state.amounts[k] = remainder - assigned;
      } else {
        state.amounts[k] = each;
        assigned += each;
      }
    });
    return state;
  }

  function setAmountWithUserEdit(state, methodKey, rawAmount, totalPayable) {
    state = cloneState(state);
    if (!state.selected[methodKey]) return state;
    totalPayable = toNumber(totalPayable);
    var amount = Math.max(0, Math.min(toNumber(rawAmount), totalPayable));
    state.amounts[methodKey] = amount;
    state.userEdited[methodKey] = true;
    return redistributeAutoAmounts(state, totalPayable);
  }

  /** @deprecated dùng setAmountWithUserEdit + redistributeAutoAmounts */
  function autoFillOthersAfterEdit(state, editedKey, totalPayable) {
    state = cloneState(state);
    if (!state.selected[editedKey]) return state;
    state.userEdited[editedKey] = true;
    return redistributeAutoAmounts(state, totalPayable);
  }

  /** @deprecated dùng redistributeAutoAmounts */
  function rebalanceSelectedEvenly(state, totalPayable) {
    state = cloneState(state);
    METHOD_KEYS.forEach(function (k) { state.userEdited[k] = false; });
    return redistributeAutoAmounts(state, totalPayable);
  }

  function useRemaining(state, methodKey, totalPayable) {
    state = cloneState(state);
    if (!state.selected[methodKey]) return state;
    totalPayable = toNumber(totalPayable);
    var others = sumOtherAmounts(state, methodKey);
    state.amounts[methodKey] = Math.max(0, totalPayable - others);
    state.userEdited[methodKey] = true;
    return state;
  }

  function formatMsg(template, amount) {
    return template.replace('{amount}', String(amount));
  }

  /**
   * Validate mixed payment — dùng cho FE realtime và BE reference.
   * @param {object} input
   * @param {number} input.totalPayableAmount
   * @param {object} input.state — mixed payment state
   * @param {boolean} [input.qrPaymentConfirmed]
   * @param {boolean} [input.transferConfirmed]
   * @param {boolean} [input.requireTransferRef]
   * @param {boolean} [input.requireDebtNote]
   * @param {function} [input.debtLimitValidator] — (debtAmount) => error|null
   * @param {boolean} [input.forAmountCheck] — skip confirm flags
   */
  function validateMixedPayment(input) {
    input = input || {};
    var state = cloneState(input.state);
    var total = toNumber(input.totalPayableAmount);
    var totals = computeTotals(state, total);
    var errors = [];
    var warnings = [];

    if (total <= 0) {
      return {
        valid: true,
        errors: [],
        warnings: [],
        totals: totals,
        paymentStatus: PAYMENT_STATUS.PAID,
        uiStatus: UI_STATUS.OK
      };
    }

    var selectedCount = countSelected(state);
    if (selectedCount === 0) {
      errors.push(MSG.NO_METHOD);
    }

    METHOD_KEYS.forEach(function (key) {
      if (!state.selected[key]) return;
      if (state.amounts[key] < 0) errors.push(MSG.NEGATIVE);
      if (state.selected[key] && state.amounts[key] <= 0) errors.push(MSG.ZERO_SELECTED);
    });

    if (totals.remainingAmount > 0) {
      errors.push(formatMsg(MSG.SHORT, totals.remainingAmount));
    } else if (totals.remainingAmount < 0) {
      errors.push(formatMsg(MSG.OVER, Math.abs(totals.remainingAmount)));
    }

    if (totals.totalHandledAmount > total) {
      errors.push(MSG.OVER_TOTAL);
    }

    if (totals.uiStatus === UI_STATUS.OK && totals.totalHandledAmount !== total) {
      errors.push(MSG.NOT_BALANCED);
    }

    if (state.selected.transfer && state.amounts.transfer > 0 && input.requireTransferRef && !String(state.transferRef || '').trim()) {
      errors.push(MSG.TRANSFER_REF_REQUIRED);
    }

    if (state.selected.debt && state.amounts.debt > 0 && input.requireDebtNote && !String(state.debtNote || '').trim()) {
      errors.push(MSG.DEBT_NOTE_REQUIRED);
    }

    if (state.selected.debt && state.amounts.debt > 0 && typeof input.debtLimitValidator === 'function') {
      var debtErr = input.debtLimitValidator(state.amounts.debt);
      if (debtErr) errors.push(debtErr);
    }

    if (!input.forAmountCheck && !input.skipPaymentConfirmation) {
      if (state.selected.qr && state.amounts.qr > 0 && !input.qrPaymentConfirmed) {
        errors.push(MSG.QR_NOT_PAID);
      }
      if (state.selected.cash && state.amounts.cash > 0 && !input.cashPaymentConfirmed) {
        errors.push(MSG.CASH_NOT_CONFIRMED);
      }
      if (state.selected.transfer && state.amounts.transfer > 0 && !input.transferConfirmed) {
        errors.push(MSG.TRANSFER_NOT_CONFIRMED);
      }
      if (state.selected.debt && state.amounts.debt > 0 && !input.debtConfirmed) {
        errors.push(MSG.DEBT_NOT_CONFIRMED);
      }
    }

    var unique = errors.filter(function (e, i, a) { return a.indexOf(e) === i; });

    return {
      valid: unique.length === 0 && totals.uiStatus === UI_STATUS.OK,
      errors: unique,
      warnings: warnings,
      totals: totals,
      paymentStatus: derivePaymentStatus(totals),
      uiStatus: totals.uiStatus
    };
  }

  function buildPaymentsPayload(state, totalPayable, meta) {
    state = cloneState(state);
    meta = meta || {};
    var totals = computeTotals(state, totalPayable);
    var payments = [];

    if (state.selected.qr && totals.qrAmount > 0) {
      payments.push({
        paymentMethod: METHOD.QR,
        amount: totals.qrAmount,
        transactionRef: meta.qrTransactionCode || '',
        paymentStatus: meta.qrPaymentConfirmed ? 'SUCCESS' : 'PENDING',
        note: meta.qrNote || ''
      });
    }
    if (state.selected.cash && totals.cashAmount > 0) {
      payments.push({
        paymentMethod: METHOD.CASH,
        amount: totals.cashAmount,
        paymentStatus: meta.cashPaymentConfirmed ? 'CONFIRMED' : 'PENDING'
      });
    }
    if (state.selected.transfer && totals.bankTransferAmount > 0) {
      payments.push({
        paymentMethod: METHOD.BANK_TRANSFER,
        amount: totals.bankTransferAmount,
        transactionRef: meta.transferTransactionRef || state.transferRef || '',
        paymentStatus: meta.transferConfirmed ? 'CONFIRMED' : 'PENDING'
      });
    }
    if (state.selected.debt && totals.debtAmount > 0) {
      payments.push({
        paymentMethod: METHOD.DEBT,
        amount: totals.debtAmount,
        paymentStatus: meta.debtConfirmed ? 'DEBT_RECORDED' : 'PENDING',
        debtDueDate: state.debtDueDate || null
      });
    }

    return {
      deliveryOrderId: meta.deliveryOrderId || '',
      totalPayableAmount: totals.totalPayableAmount,
      totalPaidAmount: totals.totalPaidAmount,
      totalDebtAmount: totals.debtAmount,
      totalHandledAmount: totals.totalHandledAmount,
      paymentMethod: 'MIXED',
      paymentStatus: derivePaymentStatus(totals),
      payments: payments
    };
  }

  function stateToLegacyAmounts(state) {
    state = cloneState(state);
    return {
      payQrAmount: state.selected.qr ? state.amounts.qr : 0,
      payCashAmount: state.selected.cash ? state.amounts.cash : 0,
      payTransferAmount: state.selected.transfer ? state.amounts.transfer : 0,
      payCreditAmount: state.selected.debt ? state.amounts.debt : 0
    };
  }

  function syncStateFromLegacyAmounts(state, legacy) {
    state = cloneState(state);
    legacy = legacy || {};
    var map = {
      qr: toNumber(legacy.payQrAmount),
      cash: toNumber(legacy.payCashAmount),
      transfer: toNumber(legacy.payTransferAmount),
      debt: toNumber(legacy.payCreditAmount)
    };
    METHOD_KEYS.forEach(function (k) {
      state.selected[k] = map[k] > 0;
      state.amounts[k] = map[k];
    });
    return state;
  }

  return {
    METHOD: METHOD,
    METHOD_KEYS: METHOD_KEYS,
    KEY_TO_METHOD: KEY_TO_METHOD,
    UI_STATUS: UI_STATUS,
    PAYMENT_STATUS: PAYMENT_STATUS,
    MSG: MSG,
    toNumber: toNumber,
    createEmptyState: createEmptyState,
    cloneState: cloneState,
    countSelected: countSelected,
    getRemainingAmount: getRemainingAmount,
    computeTotals: computeTotals,
    derivePaymentStatus: derivePaymentStatus,
    toggleMethod: toggleMethod,
    setAmount: setAmount,
    setAmountWithUserEdit: setAmountWithUserEdit,
    redistributeAutoAmounts: redistributeAutoAmounts,
    autoFillOthersAfterEdit: autoFillOthersAfterEdit,
    rebalanceSelectedEvenly: rebalanceSelectedEvenly,
    useRemaining: useRemaining,
    validateMixedPayment: validateMixedPayment,
    buildPaymentsPayload: buildPaymentsPayload,
    stateToLegacyAmounts: stateToLegacyAmounts,
    syncStateFromLegacyAmounts: syncStateFromLegacyAmounts
  };
});

if (typeof module !== 'undefined' && module.exports && require.main === module) {
  var MP = module.exports;
  var assert = function (cond, msg) {
    if (!cond) throw new Error(msg || 'Assertion failed');
  };

  var total = 1000000;
  var s = MP.createEmptyState();
  s = MP.toggleMethod(s, 'cash', total, true);
  assert(s.amounts.cash === total, 'single cash fills total');

  s = MP.toggleMethod(s, 'cash', total, true);
  s = MP.toggleMethod(s, 'qr', total, true);
  assert(s.amounts.qr === total, 'qr alone after cash off');

  s = MP.createEmptyState();
  s = MP.toggleMethod(s, 'cash', total, true);
  s = MP.setAmount(s, 'cash', 300000, total);
  s = MP.toggleMethod(s, 'qr', total, true);
  assert(s.amounts.qr === 700000, 'qr gets remainder');

  s = MP.createEmptyState();
  s = MP.toggleMethod(s, 'cash', total, true);
  s = MP.toggleMethod(s, 'qr', total, true);
  s = MP.setAmountWithUserEdit(s, 'cash', 400000, total);
  assert(s.amounts.cash === 400000, 'userEdited cash kept');
  assert(s.amounts.qr === 600000, 'auto qr gets remainder');

  s = MP.createEmptyState();
  s = MP.toggleMethod(s, 'cash', total, true);
  s = MP.toggleMethod(s, 'qr', total, true);
  s = MP.toggleMethod(s, 'transfer', total, true);
  s = MP.setAmountWithUserEdit(s, 'cash', 400000, total);
  s = MP.setAmountWithUserEdit(s, 'qr', 200000, total);
  assert(s.amounts.cash === 400000 && s.amounts.qr === 200000, 'both user amounts kept');
  assert(s.amounts.transfer === 400000, 'auto transfer gets leftover');
  assert(s.amounts.cash + s.amounts.qr + s.amounts.transfer === total, '3 methods sum equals total');

  s = MP.createEmptyState();
  s = MP.toggleMethod(s, 'cash', total, true);
  s = MP.setAmount(s, 'cash', 300000, total);
  s = MP.toggleMethod(s, 'transfer', total, true);
  s = MP.setAmount(s, 'transfer', 400000, total);
  s = MP.toggleMethod(s, 'debt', total, true);
  assert(s.amounts.debt === 300000, 'debt auto remainder');

  var v1 = MP.validateMixedPayment({
    totalPayableAmount: total,
    state: s,
    skipPaymentConfirmation: true,
    forAmountCheck: false
  });
  assert(v1.valid, 'case 6 valid');

  s = MP.createEmptyState();
  s = MP.toggleMethod(s, 'cash', total, true);
  s = MP.setAmount(s, 'cash', 700000, total);
  var v2 = MP.validateMixedPayment({ totalPayableAmount: total, state: s, forAmountCheck: true });
  assert(!v2.valid && v2.uiStatus === MP.UI_STATUS.SHORT, 'case 8 short');

  s = MP.createEmptyState();
  s = MP.toggleMethod(s, 'cash', total, true);
  s = MP.setAmount(s, 'cash', 700000, total);
  s = MP.toggleMethod(s, 'qr', total, true);
  s = MP.setAmount(s, 'qr', 500000, total);
  var v3 = MP.validateMixedPayment({ totalPayableAmount: total, state: s, forAmountCheck: true });
  assert(!v3.valid && v3.uiStatus === MP.UI_STATUS.OVER, 'case 9 over');

  console.log('mixed-payment: all self-tests passed');
}
