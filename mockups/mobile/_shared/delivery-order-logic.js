/**
 * [APP/ECOM] Logic chỉnh sửa đơn giao hàng + giao hàng một phần (reference FE/BE).
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.DeliveryOrderLogic = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var DeliveryStatus = {
    PENDING: 'wait',
    DELIVERING: 'delivering',
    PARTIAL: 'partial',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
  };

  var EDITABLE_STATUSES = [
    DeliveryStatus.PENDING,
    DeliveryStatus.DELIVERING,
    DeliveryStatus.PARTIAL
  ];

  var UNDELIVERED_REASONS = [
    { code: 'CUSTOMER_PARTIAL', label: 'Khách không nhận đủ hàng' },
    { code: 'RESCHEDULE', label: 'Khách hẹn giao lại' },
    { code: 'SHORT_ON_TRUCK', label: 'Hàng thiếu trên xe' },
    { code: 'DAMAGED', label: 'Hàng bị hư hỏng' },
    { code: 'WRONG_PRODUCT', label: 'Sai sản phẩm' },
    { code: 'WRONG_QTY', label: 'Sai số lượng' },
    { code: 'INSUFFICIENT_PAYMENT', label: 'Không đủ tiền thanh toán' },
    { code: 'STORE_CLOSED', label: 'Cửa hàng đóng cửa' },
    { code: 'NO_CONTACT', label: 'Không liên hệ được khách hàng' },
    { code: 'OTHER', label: 'Khác' }
  ];

  var MSG = {
    ORDER_NOT_FOUND: 'Không tìm thấy đơn giao hàng.',
    NOT_EDITABLE: 'Đơn giao hàng không ở trạng thái cho phép chỉnh sửa.',
    QTY_NEGATIVE: 'Số lượng giao thực tế không được nhỏ hơn 0.',
    QTY_OVER: 'Số lượng giao thực tế không được lớn hơn số lượng còn lại cần giao.',
    QTY_INTEGER: 'Sản phẩm này chỉ cho phép nhập số nguyên.',
    REASON_REQUIRED: 'Vui lòng chọn lý do giao thiếu / không giao.',
    REASON_NOTE_REQUIRED: 'Vui lòng nhập ghi chú khi chọn lý do Khác.',
    ALL_ZERO: 'Không thể xác nhận khi tất cả số lượng giao bằng 0 mà không có lý do không giao.',
    INVALID_PRODUCT: 'Sản phẩm không thuộc đơn giao hàng.',
    VERSION_CONFLICT: 'Dữ liệu đơn đã được cập nhật bởi người khác. Vui lòng tải lại.'
  };

  function toQty(value) {
    var n = Number(String(value || '').replace(',', '.'));
    return isNaN(n) ? 0 : n;
  }

  function cloneItems(items) {
    return (items || []).map(function (it) {
      return Object.assign({}, it);
    });
  }

  function calcLine(line, currentQty) {
    var ordered = toQty(line.orderedQty);
    var deliveredBefore = toQty(line.deliveredQty);
    var remaining = Math.max(0, ordered - deliveredBefore);
    var current = Math.max(0, toQty(currentQty !== undefined ? currentQty : line.currentDeliveryQty));
    if (current > remaining) current = remaining;
    var undelivered = Math.max(0, remaining - current);
    var unitPrice = toQty(line.unitPrice);
    return {
      productId: line.productId,
      orderedQty: ordered,
      deliveredQtyBefore: deliveredBefore,
      remainingQty: remaining,
      currentDeliveryQty: current,
      undeliveredQty: undelivered,
      deliveredQtyAfter: deliveredBefore + current,
      lineAmountThisTime: current * unitPrice,
      lineAmountTotalDelivered: (deliveredBefore + current) * unitPrice,
      lineAmountRemaining: undelivered * unitPrice
    };
  }

  function summarizeDelivery(items, linesInput) {
    var lines = (items || []).map(function (item) {
      var input = (linesInput || []).find(function (x) { return x.productId === item.productId; }) || {};
      var calc = calcLine(item, input.currentDeliveryQty);
      return Object.assign({}, item, calc, {
        undeliveredReasonCode: input.undeliveredReasonCode || '',
        undeliveredReasonNote: input.undeliveredReasonNote || ''
      });
    });

    var totalOrdered = 0;
    var totalDeliveredBefore = 0;
    var totalCurrent = 0;
    var totalUndeliveredAfter = 0;
    var totalAmountOrder = 0;
    var totalAmountThisTime = 0;
    var hasDeliveredThisTime = false;
    var hasUndelivered = false;
    var allZeroThisTime = true;

    lines.forEach(function (ln) {
      totalOrdered += ln.orderedQty;
      totalDeliveredBefore += ln.deliveredQtyBefore;
      totalCurrent += ln.currentDeliveryQty;
      totalUndeliveredAfter += ln.undeliveredQty;
      totalAmountOrder += ln.orderedQty * toQty(ln.unitPrice);
      totalAmountThisTime += ln.lineAmountThisTime;
      if (ln.currentDeliveryQty > 0) {
        hasDeliveredThisTime = true;
        allZeroThisTime = false;
      }
      if (ln.undeliveredQty > 0) hasUndelivered = true;
    });

    var status;
    if (!hasDeliveredThisTime && allZeroThisTime) {
      status = DeliveryStatus.FAILED;
    } else if (totalUndeliveredAfter > 0 || hasUndelivered) {
      status = totalCurrent > 0 ? DeliveryStatus.PARTIAL : DeliveryStatus.FAILED;
    } else {
      status = DeliveryStatus.DELIVERED;
    }

    return {
      lines: lines,
      totalOrderedQty: totalOrdered,
      totalDeliveredBeforeQty: totalDeliveredBefore,
      totalCurrentDeliveryQty: totalCurrent,
      totalUndeliveredQty: totalUndeliveredAfter,
      totalOrderAmount: totalAmountOrder,
      totalDeliveredAmountBefore: lines.reduce(function (s, ln) {
        return s + ln.deliveredQtyBefore * toQty(ln.unitPrice);
      }, 0),
      totalAmountThisTime: totalAmountThisTime,
      totalRemainingAmount: lines.reduce(function (s, ln) {
        return s + ln.lineAmountRemaining;
      }, 0),
      expectedStatus: status
    };
  }

  function applyCommonReasonToLines(items, linesInput, commonCode, commonNote) {
    var summary = summarizeDelivery(items, linesInput);
    return (linesInput || []).map(function (line) {
      var ln = summary.lines.find(function (x) { return x.productId === line.productId; });
      var out = Object.assign({}, line);
      if (ln && (ln.undeliveredQty > 0 || (ln.currentDeliveryQty === 0 && ln.remainingQty > 0))) {
        out.undeliveredReasonCode = commonCode || '';
        out.undeliveredReasonNote = commonNote || '';
      }
      return out;
    });
  }

  function validatePartialDelivery(order, items, linesInput, options) {
    options = options || {};
    var commonCode = options.commonUndeliveredReasonCode || '';
    var commonNote = options.commonUndeliveredReasonNote || '';
    var useCommonReason = options.useCommonReason !== false;
    var errors = [];
    if (!order) errors.push(MSG.ORDER_NOT_FOUND);
    if (order && EDITABLE_STATUSES.indexOf(order.status) < 0) {
      errors.push(MSG.NOT_EDITABLE);
    }

    var summary = summarizeDelivery(items, linesInput);
    var allZero = summary.totalCurrentDeliveryQty === 0;
    var hasShort = summary.lines.some(function (ln) { return ln.undeliveredQty > 0; });
    var needsReason = hasShort || allZero;

    summary.lines.forEach(function (ln) {
      var input = (linesInput || []).find(function (x) { return x.productId === ln.productId; });
      if (!input) {
        errors.push(MSG.INVALID_PRODUCT + ' (' + ln.productId + ')');
        return;
      }
      if (toQty(input.currentDeliveryQty) < 0) errors.push(MSG.QTY_NEGATIVE + ' · ' + ln.name);
      if (toQty(input.currentDeliveryQty) > ln.remainingQty) {
        errors.push(MSG.QTY_OVER + ' · ' + ln.name);
      }
      if (ln.integerOnly !== false) {
        var q = toQty(input.currentDeliveryQty);
        if (q % 1 !== 0) errors.push(MSG.QTY_INTEGER + ' · ' + ln.name);
      }
      if (!useCommonReason && ln.undeliveredQty > 0) {
        if (!input.undeliveredReasonCode) errors.push(MSG.REASON_REQUIRED + ' · ' + ln.name);
        if (input.undeliveredReasonCode === 'OTHER' && !(input.undeliveredReasonNote || '').trim()) {
          errors.push(MSG.REASON_NOTE_REQUIRED + ' · ' + ln.name);
        }
      }
    });

    if (useCommonReason && needsReason) {
      if (!commonCode) errors.push(MSG.REASON_REQUIRED);
      if (commonCode === 'OTHER' && !(commonNote || '').trim()) {
        errors.push(MSG.REASON_NOTE_REQUIRED);
      }
    }

    if (!useCommonReason && allZero) {
      var hasGlobalReason = (linesInput || []).some(function (x) { return x.undeliveredReasonCode; });
      if (!hasGlobalReason) errors.push(MSG.ALL_ZERO);
    }

    var unique = errors.filter(function (e, i, a) { return a.indexOf(e) === i; });
    var normalizedLines = useCommonReason && commonCode
      ? applyCommonReasonToLines(items, linesInput, commonCode, commonNote)
      : linesInput;
    var finalSummary = useCommonReason && commonCode
      ? summarizeDelivery(items, normalizedLines)
      : summary;

    return {
      valid: unique.length === 0,
      errors: unique,
      summary: finalSummary,
      normalizedLines: normalizedLines
    };
  }

  function isEditableStatus(status) {
    return EDITABLE_STATUSES.indexOf(status) >= 0;
  }

  function applyDeliveryAttempt(order, items, linesInput, meta) {
    meta = meta || {};
    var validation = validatePartialDelivery(order, items, linesInput, {
      commonUndeliveredReasonCode: meta.commonUndeliveredReasonCode,
      commonUndeliveredReasonNote: meta.commonUndeliveredReasonNote,
      useCommonReason: true
    });
    if (!validation.valid) return validation;

    var linesForAttempt = validation.normalizedLines || linesInput;
    var summary = validation.summary;
    var nextItems = (items || []).map(function (item) {
      var ln = summary.lines.find(function (x) { return x.productId === item.productId; });
      return Object.assign({}, item, {
        deliveredQty: ln.deliveredQtyAfter,
        currentDeliveryQty: 0
      });
    });

    var attempt = {
      attemptNo: (order.attemptCount || 0) + 1,
      deliveryStatus: summary.expectedStatus,
      deliveredAt: meta.deliveredAt || new Date().toISOString(),
      deliveredBy: meta.deliveredBy || '',
      deliveryNote: meta.deliveryNote || '',
      commonUndeliveredReasonCode: meta.commonUndeliveredReasonCode || '',
      commonUndeliveredReasonNote: meta.commonUndeliveredReasonNote || '',
      receiverName: meta.receiverName || '',
      receiverPhone: meta.receiverPhone || '',
      lines: summary.lines.map(function (ln) {
        return {
          productId: ln.productId,
          orderedQty: ln.orderedQty,
          previousDeliveredQty: ln.deliveredQtyBefore,
          deliveryQty: ln.currentDeliveryQty,
          remainingQty: ln.undeliveredQty,
          undeliveredReasonCode: ln.undeliveredReasonCode,
          undeliveredReasonNote: ln.undeliveredReasonNote,
          amount: ln.lineAmountThisTime
        };
      }),
      amountThisTime: summary.totalAmountThisTime,
      gps: meta.gps || null
    };

    return {
      valid: true,
      errors: [],
      summary: summary,
      nextOrder: Object.assign({}, order, {
        status: summary.expectedStatus,
        attemptCount: attempt.attemptNo,
        totalDeliveredAmount: summary.totalDeliveredAmountBefore + summary.totalAmountThisTime,
        totalRemainingAmount: summary.totalRemainingAmount,
        version: (order.version || 0) + 1,
        lastDeliveredAt: attempt.deliveredAt,
        lastDeliveredBy: attempt.deliveredBy
      }),
      nextItems: nextItems,
      attempt: attempt
    };
  }

  function validateEdit(order, patch, expectedVersion) {
    var errors = [];
    if (!order) errors.push(MSG.ORDER_NOT_FOUND);
    if (order && !isEditableStatus(order.status)) errors.push(MSG.NOT_EDITABLE);
    if (order && expectedVersion !== undefined && order.version !== expectedVersion) {
      errors.push(MSG.VERSION_CONFLICT);
    }
    return { valid: errors.length === 0, errors: errors, patch: patch || {} };
  }

  return {
    DeliveryStatus: DeliveryStatus,
    EDITABLE_STATUSES: EDITABLE_STATUSES,
    UNDELIVERED_REASONS: UNDELIVERED_REASONS,
    MSG: MSG,
    toQty: toQty,
    calcLine: calcLine,
    summarizeDelivery: summarizeDelivery,
    validatePartialDelivery: validatePartialDelivery,
    applyCommonReasonToLines: applyCommonReasonToLines,
    validateEdit: validateEdit,
    applyDeliveryAttempt: applyDeliveryAttempt,
    isEditableStatus: isEditableStatus,
    cloneItems: cloneItems
  };
});

if (typeof module !== 'undefined' && module.exports && require.main === module) {
  var L = module.exports;
  var items = [{ productId: 'A', name: 'SP A', orderedQty: 10, deliveredQty: 0, unitPrice: 10000, integerOnly: true }];
  var r1 = L.validatePartialDelivery({ status: 'delivering', version: 1 }, items, [
    { productId: 'A', currentDeliveryQty: 6 }
  ], { commonUndeliveredReasonCode: 'CUSTOMER_PARTIAL', useCommonReason: true });
  if (!r1.valid || r1.summary.expectedStatus !== L.DeliveryStatus.PARTIAL) {
    throw new Error('case partial failed');
  }
  var r2 = L.validatePartialDelivery({ status: 'delivering', version: 1 }, items, [
    { productId: 'A', currentDeliveryQty: 11 }
  ], { useCommonReason: true });
  if (r2.valid) throw new Error('case over qty should fail');
  var r3 = L.validatePartialDelivery({ status: 'delivering', version: 1 }, items, [
    { productId: 'A', currentDeliveryQty: 6 }
  ], { useCommonReason: true });
  if (r3.valid) throw new Error('case missing common reason should fail');
  console.log('delivery-order-logic: all self-tests passed');
}
