/**
 * [APP/ECOM] Thanh toán kết hợp — validation dùng chung FE + BE (mockup + reference impl).
 * paymentMethod: CASH | QR | MIXED
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.PaymentMixedValidation = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var PaymentMethod = { CASH: 'CASH', QR: 'QR', MIXED: 'MIXED' };

  var MSG = {
    TOTAL_MISMATCH: 'Tổng số tiền thanh toán không khớp với số tiền cần thu.',
    CASH_OVER: 'Số tiền tiền mặt không được lớn hơn tổng tiền cần thanh toán.',
    QR_OVER: 'Số tiền chuyển khoản không được lớn hơn tổng tiền cần thanh toán.',
    NEGATIVE: 'Số tiền thanh toán không được nhỏ hơn 0.',
    INCOMPLETE: 'Vui lòng nhập đầy đủ số tiền thanh toán.',
    MIXED_CASH_ZERO: 'Số tiền tiền mặt phải lớn hơn 0 khi chọn thanh toán kết hợp.',
    MIXED_QR_ZERO: 'Số tiền chuyển khoản phải lớn hơn 0 khi chọn thanh toán kết hợp.',
    CASH_ONLY_QR: 'Nếu chỉ thu tiền mặt, vui lòng chọn phương thức Tiền mặt.',
    QR_ONLY_CASH: 'Nếu chỉ chuyển khoản QR, vui lòng chọn phương thức Chuyển khoản QR Code.',
    QR_NOT_PAID: 'Vui lòng xác nhận khách đã quét QR chuyển khoản thành công.',
    METHOD_REQUIRED: 'Vui lòng chọn phương thức thanh toán.'
  };

  function toNumber(value) {
    if (typeof value === 'number' && !isNaN(value)) return value;
    return Number(String(value || '').replace(/[^\d-]/g, '') || 0);
  }

  function normalizeMethod(method, legacyPayMode) {
    if (method) return String(method).toUpperCase();
    if (legacyPayMode === 'cash') return PaymentMethod.CASH;
    if (legacyPayMode === 'mixed') return PaymentMethod.MIXED;
    return PaymentMethod.QR;
  }

  /**
   * @param {object} input
   * @param {string} input.paymentMethod - CASH | QR | MIXED
   * @param {number} input.paymentCashAmount
   * @param {number} input.paymentQrAmount
   * @param {number} input.totalPayableAmount
   * @param {boolean} [input.qrPaymentConfirmed] - true khi QR đã thành công (nếu có phần QR)
   * @param {boolean} [input.skipPaymentWhenZero] - default true
   */
  function validatePayment(input) {
    input = input || {};
    var method = normalizeMethod(input.paymentMethod, input.legacyPayMode);
    var cash = toNumber(input.paymentCashAmount);
    var qr = toNumber(input.paymentQrAmount);
    var total = toNumber(input.totalPayableAmount);
    var skipZero = input.skipPaymentWhenZero !== false;
    var errors = [];

    if (skipZero && total <= 0) {
      return { valid: true, errors: [], paymentMethod: method, paymentCashAmount: 0, paymentQrAmount: 0, paymentTotalAmount: 0 };
    }

    if (!method || (method !== PaymentMethod.CASH && method !== PaymentMethod.QR && method !== PaymentMethod.MIXED)) {
      errors.push(MSG.METHOD_REQUIRED);
    }

    if (cash < 0 || qr < 0) {
      errors.push(MSG.NEGATIVE);
    }

    if (method === PaymentMethod.CASH) {
      if (qr !== 0) errors.push(MSG.CASH_ONLY_QR);
      if (cash !== total) errors.push(MSG.TOTAL_MISMATCH);
      if (cash > total) errors.push(MSG.CASH_OVER);
    } else if (method === PaymentMethod.QR) {
      if (cash !== 0) errors.push(MSG.QR_ONLY_CASH);
      if (qr !== total) errors.push(MSG.TOTAL_MISMATCH);
      if (qr > total) errors.push(MSG.QR_OVER);
      if (input.qrPaymentConfirmed === false && qr > 0 && !input.skipQrConfirmation) errors.push(MSG.QR_NOT_PAID);
    } else if (method === PaymentMethod.MIXED) {
      if (cash <= 0) errors.push(MSG.MIXED_CASH_ZERO);
      if (qr <= 0) errors.push(MSG.MIXED_QR_ZERO);
      if (cash + qr !== total) errors.push(MSG.TOTAL_MISMATCH);
      if (cash > total) errors.push(MSG.CASH_OVER);
      if (qr > total) errors.push(MSG.QR_OVER);
      if (cash === total && qr === 0) errors.push(MSG.CASH_ONLY_QR);
      if (qr === total && cash === 0) errors.push(MSG.QR_ONLY_CASH);
      if (input.qrPaymentConfirmed === false && qr > 0 && !input.skipQrConfirmation) errors.push(MSG.QR_NOT_PAID);
    }

    if (total > 0 && cash + qr === 0) {
      errors.push(MSG.INCOMPLETE);
    }

    var unique = errors.filter(function (e, i, a) { return a.indexOf(e) === i; });

    return {
      valid: unique.length === 0,
      errors: unique,
      paymentMethod: method,
      paymentCashAmount: cash,
      paymentQrAmount: qr,
      paymentTotalAmount: total
    };
  }

  function calcComplement(total, editedAmount, editedField) {
    total = toNumber(total);
    var amount = toNumber(editedAmount);
    if (amount < 0) amount = 0;
    if (amount > total) amount = total;
    if (editedField === 'cash') {
      return { cashAmount: amount, qrAmount: total - amount };
    }
    return { cashAmount: total - amount, qrAmount: amount };
  }

  function buildTransferNote(orderCode, customerCode) {
    var oc = String(orderCode || '').trim() || 'DLO';
    var cc = String(customerCode || '').trim() || 'CH';
    return 'THANHTOAN_' + oc + '_' + cc;
  }

  return {
    PaymentMethod: PaymentMethod,
    MSG: MSG,
    toNumber: toNumber,
    validatePayment: validatePayment,
    calcComplement: calcComplement,
    buildTransferNote: buildTransferNote,
    normalizeMethod: normalizeMethod
  };
});

if (typeof module !== 'undefined' && module.exports && require.main === module) {
  var V = module.exports;
  var assert = function (cond, msg) {
    if (!cond) throw new Error(msg || 'Assertion failed');
  };
  var cases = [
    { m: 'CASH', t: 1000000, c: 1000000, q: 0, ok: true },
    { m: 'QR', t: 1000000, c: 0, q: 1000000, qrOk: true, ok: true },
    { m: 'MIXED', t: 1000000, c: 400000, q: 600000, qrOk: true, ok: true },
    { m: 'MIXED', t: 1000000, c: 1000000, q: 0, ok: false },
    { m: 'MIXED', t: 1000000, c: 0, q: 1000000, ok: false },
    { m: 'MIXED', t: 1000000, c: 700000, q: 400000, ok: false },
    { m: 'MIXED', t: 1000000, c: 700000, q: 200000, ok: false },
    { m: 'CASH', t: 1000000, c: -1, q: 0, ok: false }
  ];
  cases.forEach(function (tc, i) {
    var r = V.validatePayment({
      paymentMethod: tc.m,
      paymentCashAmount: tc.c,
      paymentQrAmount: tc.q,
      totalPayableAmount: tc.t,
      qrPaymentConfirmed: tc.qrOk !== false && tc.q > 0
    });
    assert(r.valid === tc.ok, 'case ' + i + ' expected ' + tc.ok + ' got ' + r.valid + ' ' + r.errors.join(';'));
  });
  console.log('payment-mixed-validation: all self-tests passed');
}
