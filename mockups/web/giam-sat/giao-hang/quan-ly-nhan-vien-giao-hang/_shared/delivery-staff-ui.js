/**
 * [WEB] Delivery Staff Management — shared client logic (mockup)
 * Route convention: /delivery-staff, /delivery-staff/create, /delivery-staff/:id, /delivery-staff/:id/edit
 */
(function (global) {
  // Dữ liệu mẫu dùng khi mock API không khả dụng (mockup chạy độc lập).
  var SAMPLE_STAFF = [
    { id: 'ds-001', staffCode: 'TX-001', fullName: 'Nguyễn Văn Tài', phone: '0901234567', email: 'tai.nguyen@finviet.local', address: '123 Nguyễn Huệ, Q1, TP.HCM', companyCode: 'FV-DMS', companyName: 'Công ty TNHH Finviet DMS', distributorId: 'NPP-HCM-01', distributorName: 'NPP HCM 01', warehouseId: 'WH-HCM-01', warehouseName: 'Kho NPP HCM 01', routeIds: ['TGH-001'], routeNames: ['Tuyến Q1 — Bến Nghé'], vehicleType: 'Xe máy', licensePlate: '59-H1-12345', loadCapacity: 50, allowReceiveOrder: true, status: 'ACTIVE', assignedOrderCount: 3, linkedUserId: 'USR-TX-001', linkedUsername: 'tai.nguyen', note: 'Ca sáng Q1', createdAt: '2026-06-01T09:00:00+07:00', createdBy: 'admin.npp', updatedAt: '2026-06-14T10:15:00+07:00', updatedBy: 'admin.npp', version: 3 },
    { id: 'ds-002', staffCode: 'TX-002', fullName: 'Trần Minh Đức', phone: '0902345678', email: 'duc.tran@finviet.local', address: '45 Lê Văn Sỹ, Q3, TP.HCM', companyCode: 'FV-DMS', companyName: 'Công ty TNHH Finviet DMS', distributorId: 'NPP-HCM-01', distributorName: 'NPP HCM 01', warehouseId: 'WH-HCM-01', warehouseName: 'Kho NPP HCM 01', routeIds: ['TGH-002'], routeNames: ['Tuyến Q1 — Tân Định'], vehicleType: 'Xe máy', licensePlate: '59-F2-67890', loadCapacity: 45, allowReceiveOrder: true, status: 'ACTIVE', assignedOrderCount: 0, linkedUserId: 'USR-TX-002', linkedUsername: 'duc.tran', note: '', createdAt: '2026-06-02T10:15:00+07:00', createdBy: 'admin.npp', updatedAt: '2026-06-11T08:15:00+07:00', updatedBy: 'admin.npp', version: 2 },
    { id: 'ds-003', staffCode: 'TX-003', fullName: 'Lê Hoàng Nam', phone: '0903456789', email: 'nam.le@finviet.local', address: '88 Võ Văn Tần, Q3, TP.HCM', companyCode: 'FV-DMS', companyName: 'Công ty TNHH Finviet DMS', distributorId: 'NPP-HCM-01', distributorName: 'NPP HCM 01', warehouseId: 'WH-HCM-02', warehouseName: 'Kho NPP HCM 02', routeIds: ['TGH-005'], routeNames: ['Tuyến Q7 — Phú Mỹ Hưng'], vehicleType: 'Xe tải', licensePlate: '51C-34567', loadCapacity: 500, allowReceiveOrder: true, status: 'ACTIVE', assignedOrderCount: 2, linkedUserId: 'USR-TX-003', linkedUsername: 'nam.le', note: 'Xe tải nhỏ', createdAt: '2026-06-03T11:00:00+07:00', createdBy: 'admin.npp', updatedAt: '2026-06-12T14:30:00+07:00', updatedBy: 'admin.npp', version: 1 },
    { id: 'ds-004', staffCode: 'TX-004', fullName: 'Ngô Quốc Hùng', phone: '0904567890', email: 'hung.ngo@finviet.local', address: '12 Đồng Khởi, Biên Hòa, Đồng Nai', companyCode: 'FV-DMS', companyName: 'Công ty TNHH Finviet DMS', distributorId: 'NPP-HCM-02', distributorName: 'NPP HCM 02', warehouseId: 'WH-HCM-02', warehouseName: 'Kho NPP HCM 02', routeIds: ['TGH-003'], routeNames: ['Tuyến Đồng Nai — Biên Hòa'], vehicleType: 'Xe ba gác', licensePlate: '60C-11223', loadCapacity: 200, allowReceiveOrder: true, status: 'ACTIVE', assignedOrderCount: 0, linkedUserId: null, linkedUsername: null, note: 'Chưa liên kết tài khoản', createdAt: '2026-06-05T11:00:00+07:00', createdBy: 'admin.npp', updatedAt: '2026-06-14T16:20:00+07:00', updatedBy: 'admin.npp', version: 1 },
    { id: 'ds-005', staffCode: 'TX-005', fullName: 'Võ Thanh Sơn', phone: '0905678901', email: '', address: '56 Cách Mạng Tháng 8, Q10, TP.HCM', companyCode: 'FV-DMS', companyName: 'Công ty TNHH Finviet DMS', distributorId: 'NPP-HCM-02', distributorName: 'NPP HCM 02', warehouseId: 'WH-HCM-02', warehouseName: 'Kho NPP HCM 02', routeIds: [], routeNames: [], vehicleType: 'Xe máy', licensePlate: '59-B3-99887', loadCapacity: 40, allowReceiveOrder: false, status: 'INACTIVE', assignedOrderCount: 0, linkedUserId: 'USR-TX-005', linkedUsername: 'son.vo', note: 'Nghỉ phép dài hạn', createdAt: '2026-06-06T08:00:00+07:00', createdBy: 'admin.npp', updatedAt: '2026-06-10T09:00:00+07:00', updatedBy: 'admin.ho', version: 2 },
    { id: 'ds-006', staffCode: 'TX-006', fullName: 'Đỗ Minh Quân', phone: '0906789012', email: 'quan.do@finviet.local', address: '34 Trường Chinh, Q12, TP.HCM', companyCode: 'FV-DMS', companyName: 'Công ty TNHH Finviet DMS', distributorId: 'NPP-HCM-01', distributorName: 'NPP HCM 01', warehouseId: 'WH-HCM-01', warehouseName: 'Kho NPP HCM 01', routeIds: ['TGH-006'], routeNames: ['Tuyến Q12 — An Phú Đông'], vehicleType: 'Xe máy', licensePlate: '59-A1-55443', loadCapacity: 50, allowReceiveOrder: true, status: 'ACTIVE', assignedOrderCount: 0, linkedUserId: null, linkedUsername: null, note: '', createdAt: '2026-06-07T14:00:00+07:00', createdBy: 'admin.npp', updatedAt: '2026-06-13T11:45:00+07:00', updatedBy: 'admin.npp', version: 1 },
    { id: 'ds-007', staffCode: 'TX-007', fullName: 'Phạm Thị Hương', phone: '0907890123', email: 'huong.pham@finviet.local', address: '78 Hai Bà Trưng, Q1, TP.HCM', companyCode: 'FV-DMS', companyName: 'Công ty TNHH Finviet DMS', distributorId: 'NPP-HCM-01', distributorName: 'NPP HCM 01', warehouseId: 'WH-HCM-01', warehouseName: 'Kho NPP HCM 01', routeIds: ['TGH-001'], routeNames: ['Tuyến Q1 — Bến Nghé'], vehicleType: 'Xe máy', licensePlate: '59-H2-77665', loadCapacity: 45, allowReceiveOrder: false, status: 'ACTIVE', assignedOrderCount: 0, linkedUserId: 'USR-TX-007', linkedUsername: 'huong.pham', note: 'Tạm ngưng nhận đơn — bảo trì xe', createdAt: '2026-06-08T09:30:00+07:00', createdBy: 'admin.npp', updatedAt: '2026-06-15T08:00:00+07:00', updatedBy: 'admin.npp', version: 4 },
    { id: 'ds-008', staffCode: 'TX-008', fullName: 'Bùi Văn Phúc', phone: '0908901234', email: 'phuc.bui@finviet.local', address: '22 Nguyễn Thị Minh Khai, Q1, TP.HCM', companyCode: 'FV-DMS', companyName: 'Công ty TNHH Finviet DMS', distributorId: 'NPP-HCM-02', distributorName: 'NPP HCM 02', warehouseId: 'WH-HCM-02', warehouseName: 'Kho NPP HCM 02', routeIds: ['TGH-007'], routeNames: ['Tuyến Bình Dương — Thuận An'], vehicleType: 'Xe tải', licensePlate: '61C-88990', loadCapacity: 800, allowReceiveOrder: true, status: 'ACTIVE', assignedOrderCount: 0, linkedUserId: 'USR-TX-008', linkedUsername: 'phuc.bui', note: '', createdAt: '2026-06-09T10:00:00+07:00', createdBy: 'admin.ho', updatedAt: '2026-06-09T10:00:00+07:00', updatedBy: 'admin.ho', version: 1 }
  ];

  SAMPLE_STAFF.forEach(function (s) {
    s.companyCode = 'FV';
    s.companyName = 'Finviet';
    if (!s.username) {
      s.username = s.linkedUsername || (s.email ? s.email.split('@')[0] : '');
    }
    if (!s.distributorIds || !s.distributorIds.length) {
      s.distributorIds = s.distributorId ? [s.distributorId] : [];
    }
    if (!s.distributorNames || !s.distributorNames.length) {
      s.distributorNames = s.distributorName ? [s.distributorName] : [];
    }
    s.distributorId = s.distributorIds[0] || '';
    s.distributorName = s.distributorNames.join(', ');
    delete s.allowReceiveOrder;
  });
  // Demo chọn nhiều NPP
  SAMPLE_STAFF[0].distributorIds = ['NPP-HCM-01', 'NPP-HCM-02'];
  SAMPLE_STAFF[0].distributorNames = ['NPP HCM 01', 'NPP HCM 02'];
  SAMPLE_STAFF[0].distributorId = 'NPP-HCM-01';
  SAMPLE_STAFF[0].distributorName = 'NPP HCM 01, NPP HCM 02';

  var FALLBACK_DATA = null;

  var PERMISSIONS = {
    VIEW: 'DELIVERY_STAFF_VIEW',
    CREATE: 'DELIVERY_STAFF_CREATE',
    UPDATE: 'DELIVERY_STAFF_UPDATE',
    ACTIVATE: 'DELIVERY_STAFF_ACTIVATE',
    DEACTIVATE: 'DELIVERY_STAFF_DEACTIVATE',
    EXPORT: 'DELIVERY_STAFF_EXPORT',
    IMPORT: 'DELIVERY_STAFF_IMPORT',
    VIEW_DETAIL: 'DELIVERY_STAFF_VIEW_DETAIL',
  };

  var VEHICLE_TYPES = ['Xe máy', 'Xe tải', 'Xe ba gác', 'Khác'];
  var DISTRIBUTORS = [
    { id: 'NPP-HCM-01', name: 'NPP HCM 01' },
    { id: 'NPP-HCM-02', name: 'NPP HCM 02' },
  ];
  var WAREHOUSES = [
    { id: 'WH-HCM-01', name: 'Kho NPP HCM 01', distributorId: 'NPP-HCM-01' },
    { id: 'WH-HCM-02', name: 'Kho NPP HCM 02', distributorId: 'NPP-HCM-01' },
    { id: 'WH-HCM-02', name: 'Kho NPP HCM 02', distributorId: 'NPP-HCM-02' },
  ];
  var ROUTES = [
    { id: 'TGH-001', name: 'Tuyến Q1 — Bến Nghé' },
    { id: 'TGH-002', name: 'Tuyến Q1 — Tân Định' },
    { id: 'TGH-003', name: 'Tuyến Đồng Nai — Biên Hòa' },
    { id: 'TGH-004', name: 'Tuyến Q3 — Tân Bình' },
    { id: 'TGH-005', name: 'Tuyến Q7 — Phú Mỹ Hưng' },
    { id: 'TGH-006', name: 'Tuyến Q12 — An Phú Đông' },
    { id: 'TGH-007', name: 'Tuyến Bình Dương — Thuận An' },
  ];

  function formatDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function formatMoney(n) {
    if (!n && n !== 0) return '—';
    return Number(n).toLocaleString('vi-VN');
  }

  function statusLabel(status) {
    return status === 'ACTIVE' ? 'Đang hoạt động' : 'Ngưng hoạt động';
  }

  function receiveLabel(allow) {
    return allow ? 'Cho phép nhận đơn' : 'Tạm ngưng nhận đơn';
  }

  function statusTagClass(status) {
    return status === 'ACTIVE' ? 'portal-tag--success' : 'portal-tag--default';
  }

  function receiveTagClass(allow) {
    return allow ? 'portal-tag--success' : 'portal-tag--warning';
  }

  function staffUsername(s) {
    return (s && (s.username || s.linkedUsername)) || '';
  }

  function isUsernameTaken(companyCode, username, excludeStaffCode) {
    var u = String(username || '').trim().toLowerCase();
    if (!u || !companyCode) return false;
    return (FALLBACK_DATA || SAMPLE_STAFF).some(function (s) {
      if (excludeStaffCode && s.staffCode === excludeStaffCode) return false;
      return s.companyCode === companyCode && staffUsername(s).toLowerCase() === u;
    });
  }

  function validateForm(data, options) {
    var opts = options || {};
    var errors = [];
    if (!data.companyCode) {
      errors.push('Vui lòng chọn công ty.');
    }
    if (!data.username || !data.username.trim()) {
      errors.push('Vui lòng nhập username đăng nhập.');
    } else if (data.username.trim().length > 50) {
      errors.push('Username không được vượt quá 50 ký tự.');
    } else if (/\s/.test(data.username)) {
      errors.push('Username không được chứa khoảng trắng.');
    } else if (isUsernameTaken(data.companyCode, data.username, opts.excludeStaffCode)) {
      errors.push('Username đã tồn tại trong công ty đã chọn.');
    }
    if (!data.fullName || !data.fullName.trim()) {
      errors.push('Vui lòng nhập họ tên nhân viên giao hàng.');
    }
    if (!data.phone || !data.phone.trim()) {
      errors.push('Vui lòng nhập số điện thoại.');
    } else if (!/^0\d{9}$/.test(data.phone.replace(/\s/g, ''))) {
      errors.push('Số điện thoại không đúng định dạng.');
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Email không đúng định dạng.');
    }
    if (data.note && data.note.length > 500) {
      errors.push('Ghi chú không được vượt quá 500 ký tự.');
    }
    return errors;
  }

  function hasPermission(key) {
    var perms = (global.__DMS_PERMISSIONS__ || [
      'DELIVERY_STAFF_VIEW', 'DELIVERY_STAFF_CREATE', 'DELIVERY_STAFF_UPDATE',
      'DELIVERY_STAFF_ACTIVATE', 'DELIVERY_STAFF_DEACTIVATE', 'DELIVERY_STAFF_EXPORT',
      'DELIVERY_STAFF_IMPORT', 'DELIVERY_STAFF_VIEW_DETAIL',
    ]);
    return perms.indexOf(key) >= 0;
  }

  function filterSample(query) {
    var q = query || {};
    var items = (FALLBACK_DATA || SAMPLE_STAFF).slice();
    if (q.keyword) {
      var kw = String(q.keyword).toLowerCase();
      items = items.filter(function (s) {
        return [s.staffCode, s.fullName, s.phone, s.email, staffUsername(s), s.licensePlate]
          .join(' ').toLowerCase().indexOf(kw) >= 0;
      });
    }
    if (q.distributorIds) {
      var distFilter = q.distributorIds;
      items = items.filter(function (s) {
        var ids = s.distributorIds && s.distributorIds.length
          ? s.distributorIds
          : (s.distributorId ? [s.distributorId] : []);
        return ids.indexOf(distFilter) >= 0;
      });
    }
    if (q.routeIds) items = items.filter(function (s) { return (s.routeIds || []).indexOf(q.routeIds) >= 0; });
    if (q.status) items = items.filter(function (s) { return s.status === q.status; });
    if (q.fromDate) {
      var from = parseFilterDate(q.fromDate);
      if (from) items = items.filter(function (s) { return new Date(s.createdAt) >= from; });
    }
    if (q.toDate) {
      var to = parseFilterDate(q.toDate);
      if (to) {
        to.setHours(23, 59, 59, 999);
        items = items.filter(function (s) { return new Date(s.createdAt) <= to; });
      }
    }
    items.sort(function (a, b) { return new Date(b.updatedAt) - new Date(a.updatedAt); });

    var base = FALLBACK_DATA || SAMPLE_STAFF;
    var summary = {
      total: base.length,
      active: base.filter(function (s) { return s.status === 'ACTIVE'; }).length,
      inactive: base.filter(function (s) { return s.status === 'INACTIVE'; }).length,
      withOrders: base.filter(function (s) { return (s.assignedOrderCount || 0) > 0; }).length,
      withoutOrders: base.filter(function (s) { return (s.assignedOrderCount || 0) === 0; }).length,
    };
    var page = q.page || 1;
    var pageSize = q.pageSize || 20;
    var total = items.length;
    var paged = items.slice((page - 1) * pageSize, page * pageSize);
    return { items: paged, pagination: { page: page, pageSize: pageSize, total: total }, summary: summary };
  }

  function parseFilterDate(value) {
    var text = String(value || '').trim();
    if (!text) return null;
    var match = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (match) return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
    var date = new Date(text);
    return isNaN(date.getTime()) ? null : date;
  }

  function enrichSampleDetail(s) {
    if (!s) return null;
    var copy = JSON.parse(JSON.stringify(s));
    var count = copy.assignedOrderCount || 0;
    copy.stats = {
      assignedOrderCount: count,
      deliveringCount: Math.max(0, count - 1),
      completedToday: count > 0 ? 2 : 0,
      failedToday: 0,
      collectAmountToday: count > 0 ? 3450000 : 0,
    };
    copy.assignedOrders = [];
    for (var i = 0; i < count; i++) {
      copy.assignedOrders.push({
        id: 'DLO-2026' + String(600 + i),
        storeName: 'Cửa hàng ' + (i + 1),
        address: 'Q' + ((i % 9) + 1) + ', TP.HCM',
        totalAmount: 1200000 + i * 350000,
        statusLabel: i === 0 ? 'Đang giao' : 'Chờ giao',
        deliveryDate: '15/07/2026',
      });
    }
    copy.history = [
      { actionType: 'Cập nhật thông tin', note: 'Cập nhật thông tin phương tiện', createdAt: copy.updatedAt, createdBy: copy.updatedBy },
      { actionType: 'Tạo mới', note: 'Khởi tạo nhân viên giao hàng', createdAt: copy.createdAt, createdBy: copy.createdBy },
    ];
    return copy;
  }

  async function listStaff(query) {
    if (global.DMS_API && global.DMS_API.getDeliveryStaff) {
      try {
        var res = await global.DMS_API.getDeliveryStaff(query);
        if (res && res.items && res.items.length) return res;
      } catch (_e) { /* fallback */ }
    }
    return filterSample(query);
  }

  async function getStaff(id) {
    if (global.DMS_API && global.DMS_API.getDeliveryStaffById) {
      try {
        var res = await global.DMS_API.getDeliveryStaffById(id);
        if (res && res.staffCode) return res;
      } catch (_e) { /* fallback */ }
    }
    var found = (FALLBACK_DATA || SAMPLE_STAFF).find(function (s) { return s.staffCode === id; });
    return enrichSampleDetail(found || (FALLBACK_DATA || SAMPLE_STAFF)[0]);
  }

  async function getAvailableDrivers(query) {
    if (global.DMS_API && global.DMS_API.getAvailableDrivers) {
      try { return await global.DMS_API.getAvailableDrivers(query); } catch (_e) { /* fallback */ }
    }
    return { items: [] };
  }

  function formField(formEl, id) {
    return formEl.querySelector('#' + id) || document.getElementById(id);
  }

  function collectMultiDistributor(formEl) {
    var hidden = formField(formEl, 'createDistributorIds') || formField(formEl, 'editDistributorIds') || formField(formEl, 'distributorIds');
    var ids = [];
    var names = [];
    if (hidden && hidden.multiple) {
      Array.from(hidden.selectedOptions).forEach(function (opt) {
        if (!opt.value) return;
        ids.push(opt.value);
        names.push(opt.dataset.name || opt.textContent.trim());
      });
    }
    // Fallback: đọc tag UI nếu hidden chưa sync
    if (!ids.length) {
      var ms = formEl.querySelector('.portal-multi-select');
      if (ms) {
        ms.querySelectorAll('.portal-multi-select__tag').forEach(function (tag) {
          var v = tag.getAttribute('data-value');
          if (!v) return;
          ids.push(v);
          var text = tag.querySelector('.portal-multi-select__tag-text');
          names.push(text ? text.textContent.trim() : v);
        });
      }
    }
    return {
      distributorIds: ids,
      distributorNames: names,
      distributorId: ids[0] || '',
      distributorName: names.join(', '),
    };
  }

  function collectFormData(formEl) {
    if (!formEl) return {};
    var routeSel = formField(formEl, 'createRouteId') || formField(formEl, 'editRouteId') || formField(formEl, 'routeId');
    var companySel = formField(formEl, 'createCompanyCode') || formField(formEl, 'editCompanyCode') || formField(formEl, 'companyCode');
    var usernameEl = formField(formEl, 'createUsername') || formField(formEl, 'editUsername') || formField(formEl, 'username');
    var fullNameEl = formField(formEl, 'createFullName') || formField(formEl, 'editFullName') || formField(formEl, 'fullName');
    var phoneEl = formField(formEl, 'createPhone') || formField(formEl, 'editPhone') || formField(formEl, 'phone');
    var emailEl = formField(formEl, 'createEmail') || formField(formEl, 'editEmail') || formField(formEl, 'email');
    var addressEl = formField(formEl, 'createAddress') || formField(formEl, 'editAddress') || formField(formEl, 'address');
    var noteEl = formField(formEl, 'createNote') || formField(formEl, 'editNote') || formField(formEl, 'note');
    var plateEl = formField(formEl, 'createLicensePlate') || formField(formEl, 'editLicensePlate') || formField(formEl, 'licensePlate');
    var dist = collectMultiDistributor(formEl);
    return {
      username: usernameEl ? usernameEl.value : '',
      fullName: fullNameEl ? fullNameEl.value : '',
      phone: phoneEl ? phoneEl.value : '',
      email: emailEl ? emailEl.value : '',
      address: addressEl ? addressEl.value : '',
      note: noteEl ? noteEl.value : '',
      companyCode: companySel ? companySel.value : '',
      companyName: companySel && companySel.selectedOptions[0] ? companySel.selectedOptions[0].text : '',
      distributorIds: dist.distributorIds,
      distributorNames: dist.distributorNames,
      distributorId: dist.distributorId,
      distributorName: dist.distributorName,
      routeIds: routeSel && routeSel.value ? [routeSel.value] : [],
      routeNames: routeSel && routeSel.value && routeSel.selectedOptions[0] ? [routeSel.selectedOptions[0].dataset.name || routeSel.selectedOptions[0].text] : [],
      licensePlate: plateEl ? plateEl.value : '',
    };
  }

  function trimFormData(data) {
    var copy = Object.assign({}, data);
    ['username', 'fullName', 'phone', 'email', 'address', 'note', 'licensePlate'].forEach(function (k) {
      if (typeof copy[k] === 'string') copy[k] = copy[k].trim();
    });
    return copy;
  }

  async function createStaff(data) {
    var payload = trimFormData(data);
    payload.status = 'ACTIVE';
    if (global.DMS_API && global.DMS_API.createDeliveryStaff) {
      try { return await global.DMS_API.createDeliveryStaff(payload); } catch (e) { throw e; }
    }
    var base = FALLBACK_DATA || SAMPLE_STAFF;
    var maxNum = base.reduce(function (m, s) {
      var n = parseInt(String(s.staffCode || '').replace(/^TX-/, ''), 10);
      return isNaN(n) ? m : Math.max(m, n);
    }, 0);
    var newCode = 'TX-' + String(maxNum + 1).padStart(3, '0');
    var now = new Date().toISOString();
    var newStaff = Object.assign({}, payload, {
      id: 'ds-new-' + Date.now(),
      staffCode: newCode,
      assignedOrderCount: 0,
      distributorIds: payload.distributorIds || [],
      distributorNames: payload.distributorNames || [],
      distributorId: (payload.distributorIds && payload.distributorIds[0]) || payload.distributorId || '',
      distributorName: (payload.distributorNames && payload.distributorNames.length)
        ? payload.distributorNames.join(', ')
        : (payload.distributorName || ''),
      companyCode: payload.companyCode || 'FV',
      companyName: payload.companyName || 'Finviet',
      createdAt: now,
      createdBy: 'admin.mock',
      updatedAt: now,
      updatedBy: 'admin.mock',
      version: 1,
    });
    delete newStaff.allowReceiveOrder;
    SAMPLE_STAFF.unshift(newStaff);
    if (FALLBACK_DATA) FALLBACK_DATA.unshift(newStaff);
    return newStaff;
  }

  async function updateStaff(staffCode, data) {
    var payload = trimFormData(data);
    if (global.DMS_API && global.DMS_API.updateDeliveryStaff) {
      try { return await global.DMS_API.updateDeliveryStaff(staffCode, payload); } catch (e) { throw e; }
    }
    var list = FALLBACK_DATA || SAMPLE_STAFF;
    var found = list.find(function (s) { return s.staffCode === staffCode; });
    if (!found) {
      var err = new Error('Không tìm thấy nhân viên giao hàng.');
      throw err;
    }
    Object.keys(payload).forEach(function (k) {
      if (payload[k] !== undefined) found[k] = payload[k];
    });
    if (payload.distributorIds) {
      found.distributorIds = payload.distributorIds;
      found.distributorNames = payload.distributorNames || [];
      found.distributorId = payload.distributorIds[0] || '';
      found.distributorName = (payload.distributorNames || []).join(', ');
    }
    delete found.allowReceiveOrder;
    found.updatedAt = new Date().toISOString();
    found.updatedBy = 'admin.mock';
    found.version = (found.version || 0) + 1;
    return found;
  }

  function getBlockingOrders(staff) {
    if (!staff) return [];
    var count = staff.assignedOrderCount || 0;
    if (!count) return [];
    var orders = [];
    for (var i = 0; i < count; i++) {
      orders.push({
        id: 'DLO-2026' + String(600 + i),
        storeName: 'Cửa hàng ' + (i + 1),
        statusLabel: i === 0 ? 'Đang giao' : 'Chờ giao',
      });
    }
    return orders;
  }

  async function setStaffStatus(staffCode, status) {
    if (status === 'INACTIVE') {
      var list = FALLBACK_DATA || SAMPLE_STAFF;
      var found = list.find(function (s) { return s.staffCode === staffCode; });
      if (found && getBlockingOrders(found).length) {
        var err = new Error('Nhân viên đang có đơn hàng chưa hoàn tất. Không thể ngưng hoạt động.');
        err.code = 'HAS_OPEN_ORDERS';
        throw err;
      }
    }
    if (global.DMS_API) {
      if (status === 'ACTIVE' && global.DMS_API.activateDeliveryStaff) {
        try { return await global.DMS_API.activateDeliveryStaff(staffCode); } catch (e) { throw e; }
      }
      if (status === 'INACTIVE' && global.DMS_API.deactivateDeliveryStaff) {
        try { return await global.DMS_API.deactivateDeliveryStaff(staffCode); } catch (e) { throw e; }
      }
    }
    var list = FALLBACK_DATA || SAMPLE_STAFF;
    var found = list.find(function (s) { return s.staffCode === staffCode; });
    if (found) {
      found.status = status;
      found.updatedAt = new Date().toISOString();
      found.version = (found.version || 0) + 1;
    }
    return found;
  }

  function exportToCsv(items) {
    var headers = [
      'Mã nhân viên giao hàng', 'Username', 'Tên nhân viên giao hàng', 'Số điện thoại', 'Email',
      'Nhà phân phối', 'Tuyến giao hàng', 'Biển số xe',
      'Trạng thái hoạt động', 'Ngày tạo', 'Người tạo', 'Người cập nhật', 'Ngày cập nhật',
    ];
    var rows = items.map(function (s) {
      var distLabel = (s.distributorNames && s.distributorNames.length)
        ? s.distributorNames.join('; ')
        : (s.distributorName || '');
      return [
        s.staffCode, staffUsername(s), s.fullName, s.phone, s.email || '',
        distLabel, (s.routeNames || []).join('; '), s.licensePlate || '',
        statusLabel(s.status), formatDate(s.createdAt), s.createdBy || '',
        s.updatedBy || '', formatDate(s.updatedAt),
      ];
    });
    var csv = [headers].concat(rows).map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');
    var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    var today = new Date();
    var fn = 'Nhan_vien_giao_hang_' + today.getFullYear() +
      String(today.getMonth() + 1).padStart(2, '0') +
      String(today.getDate()).padStart(2, '0') + '.csv';
    a.href = URL.createObjectURL(blob);
    a.download = fn;
    a.click();
  }

  function downloadImportTemplate(mode) {
    var isUpdate = mode === 'UPDATE';
    var headers = isUpdate
      ? ['* Mã nhân viên giao hàng', '* Công ty', '* Username', '* Họ tên', '* Số điện thoại', 'Email', 'Nhà phân phối', 'Tuyến giao hàng', 'Biển số xe', 'Địa chỉ', 'Ghi chú']
      : ['* Công ty', '* Username', '* Họ tên', '* Số điện thoại', 'Email', 'Nhà phân phối', 'Tuyến giao hàng', 'Biển số xe', 'Địa chỉ', 'Ghi chú'];
    var sample = isUpdate
      ? ['TX-001', 'Finviet', 'tai.nguyen', 'Nguyễn Văn Tài', '0901234567', 'tai.nguyen@finviet.local', 'NPP HCM 01', 'Tuyến Q1 — Bến Nghé', '59-H1-12345', '123 Nguyễn Huệ, Q1', 'Cập nhật import']
      : ['Finviet', 'tx.demo', 'Nguyễn Văn Demo', '0901111222', 'demo@finviet.local', 'NPP HCM 01', 'Tuyến Q1 — Bến Nghé', '59-H1-00001', '123 Nguyễn Huệ, Q1', 'Mẫu import'];
    var csv = [headers, sample].map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');
    var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = isUpdate ? 'Mau_import_cap_nhat_nhan_vien_giao_hang.csv' : 'Mau_import_tao_moi_nhan_vien_giao_hang.csv';
    a.click();
  }

  function validateImportFile(file) {
    var errors = [];
    if (!file) {
      errors.push('Vui lòng chọn file import.');
      return errors;
    }
    var name = String(file.name || '').toLowerCase();
    var okExt = /\.(xlsx|xls|csv)$/.test(name);
    if (!okExt) {
      errors.push('Định dạng file không hợp lệ. Chỉ chấp nhận .xlsx, .xls hoặc .csv.');
    }
    if (file.size > 5 * 1024 * 1024) {
      errors.push('Dung lượng file không được vượt quá 5MB.');
    }
    return errors;
  }

  async function importStaffFromFile(file) {
    var errors = validateImportFile(file);
    if (errors.length) {
      var err = new Error(errors[0]);
      err.messages = errors;
      throw err;
    }
    if (global.DMS_API && global.DMS_API.importDeliveryStaff) {
      try { return await global.DMS_API.importDeliveryStaff(file); } catch (e) { throw e; }
    }
    // Mockup: giả lập import thành công 1 dòng mẫu
    return {
      successCount: 1,
      failCount: 0,
      message: 'Import thành công 1 nhân viên giao hàng.',
    };
  }

  global.DeliveryStaffUI = {
    PERMISSIONS: PERMISSIONS,
    VEHICLE_TYPES: VEHICLE_TYPES,
    DISTRIBUTORS: DISTRIBUTORS,
    WAREHOUSES: WAREHOUSES,
    ROUTES: ROUTES,
    formatDate: formatDate,
    formatMoney: formatMoney,
    statusLabel: statusLabel,
    receiveLabel: receiveLabel,
    statusTagClass: statusTagClass,
    receiveTagClass: receiveTagClass,
    validateForm: validateForm,
    collectFormData: collectFormData,
    trimFormData: trimFormData,
    createStaff: createStaff,
    updateStaff: updateStaff,
    setStaffStatus: setStaffStatus,
    isUsernameTaken: isUsernameTaken,
    staffUsername: staffUsername,
    hasPermission: hasPermission,
    listStaff: listStaff,
    getStaff: getStaff,
    getAvailableDrivers: getAvailableDrivers,
    getBlockingOrders: getBlockingOrders,
    exportToCsv: exportToCsv,
    downloadImportTemplate: downloadImportTemplate,
    validateImportFile: validateImportFile,
    importStaffFromFile: importStaffFromFile,
    setFallbackData: function (data) { FALLBACK_DATA = data; },
  };
})(window);
