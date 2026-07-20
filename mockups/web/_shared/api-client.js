/**
 * API client dùng chung cho mockup Portal DMS (local dev).
 * Gọi qua Vite proxy: /api/* và /health
 */
(function (global) {
  var config = global.__DMS_CONFIG__ || {};
  var baseUrl = config.API_BASE_URL || '';

  function buildUrl(path) {
    if (path.charAt(0) !== '/') {
      path = '/' + path;
    }
    return baseUrl + path;
  }

  async function request(path, options) {
    var response = await fetch(buildUrl(path), options || {});

    if (!response.ok) {
      var errorBody = null;
      try {
        errorBody = await response.json();
      } catch (_err) {
        errorBody = { message: response.statusText };
      }

      var error = new Error(errorBody.message || 'API request failed');
      error.status = response.status;
      error.body = errorBody;
      throw error;
    }

    return response.json();
  }

  global.DMS_API = {
    baseUrl: baseUrl,
    health: function () {
      return request('/health');
    },
    getDashboardSummary: function () {
      return request('/api/dashboard/summary');
    },
    getOrders: function (query) {
      var suffix = '';
      if (query && query.status) {
        suffix = '?status=' + encodeURIComponent(query.status);
      }
      return request('/api/orders' + suffix);
    },
    getOrderById: function (id) {
      return request('/api/orders/' + encodeURIComponent(id));
    },
    getCustomers: function () {
      return request('/api/customers');
    },
    getProducts: function () {
      return request('/api/products');
    },
    getDeliveryRoutes: function () {
      return request('/api/delivery-routes');
    },
    getUserProfile: function () {
      return request('/api/user/profile');
    },
    getDeliveryStaff: function (query) {
      var params = new URLSearchParams();
      if (query) {
        Object.keys(query).forEach(function (key) {
          if (query[key] !== undefined && query[key] !== '' && query[key] !== null) {
            params.set(key, query[key]);
          }
        });
      }
      var qs = params.toString();
      return request('/api/delivery-staff' + (qs ? '?' + qs : ''));
    },
    getDeliveryStaffById: function (id) {
      return request('/api/delivery-staff/' + encodeURIComponent(id));
    },
    getAvailableDrivers: function (query) {
      var params = new URLSearchParams();
      if (query) {
        Object.keys(query).forEach(function (key) {
          if (query[key]) params.set(key, query[key]);
        });
      }
      var qs = params.toString();
      return request('/api/delivery-staff/available-drivers' + (qs ? '?' + qs : ''));
    },
    createDeliveryStaff: function (body) {
      return request('/api/delivery-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    },
    updateDeliveryStaff: function (id, body) {
      return request('/api/delivery-staff/' + encodeURIComponent(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    },
    deactivateDeliveryStaff: function (id, body) {
      return request('/api/delivery-staff/' + encodeURIComponent(id) + '/deactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body || {}),
      });
    },
    activateDeliveryStaff: function (id, body) {
      return request('/api/delivery-staff/' + encodeURIComponent(id) + '/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body || {}),
      });
    },
  };
})(window);
