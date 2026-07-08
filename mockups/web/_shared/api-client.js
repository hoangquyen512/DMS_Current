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
  };
})(window);
