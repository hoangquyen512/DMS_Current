/**
 * Cấu hình Portal → App tài xế (mockup bridge)
 * Key localStorage: dms_portal_config
 * Portal lưu → App đọc khi mở / khi nhận sự kiện storage
 */
(function (root) {
  var STORAGE_KEY = 'dms_portal_config';
  var STORAGE_META_KEY = 'dms_portal_config_meta';

  var DEFAULT_CONFIG = {
    DRIVER_APP_MODE: true,
    SHOW_DEBT_ON_LIST: true,
    ENABLE_DRIVER_OCR: true
  };

  function normalize(raw) {
    var cfg = Object.assign({}, DEFAULT_CONFIG);
    if (!raw || typeof raw !== 'object') return cfg;
    if (typeof raw.DRIVER_APP_MODE === 'boolean') cfg.DRIVER_APP_MODE = raw.DRIVER_APP_MODE;
    if (typeof raw.SHOW_DEBT_ON_LIST === 'boolean') cfg.SHOW_DEBT_ON_LIST = raw.SHOW_DEBT_ON_LIST;
    if (typeof raw.ENABLE_DRIVER_OCR === 'boolean') cfg.ENABLE_DRIVER_OCR = raw.ENABLE_DRIVER_OCR;
    return cfg;
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? normalize(JSON.parse(raw)) : normalize(null);
    } catch (e) {
      return normalize(null);
    }
  }

  function save(config, meta) {
    var cfg = normalize(config);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    if (meta) {
      try {
        localStorage.setItem(STORAGE_META_KEY, JSON.stringify(meta));
      } catch (e) { /* ignore */ }
    }
    try {
      window.dispatchEvent(new CustomEvent('dms-portal-config-changed', { detail: cfg }));
    } catch (e) { /* ignore */ }
    return cfg;
  }

  function loadMeta() {
    try {
      var raw = localStorage.getItem(STORAGE_META_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function formatDateTime(d) {
    d = d || new Date();
    var pad = function (n) { return ('0' + n).slice(-2); };
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  root.DriverPortalConfig = {
    STORAGE_KEY: STORAGE_KEY,
    DEFAULT_CONFIG: DEFAULT_CONFIG,
    load: load,
    save: save,
    loadMeta: loadMeta,
    normalize: normalize,
    formatDateTime: formatDateTime
  };
})(typeof window !== 'undefined' ? window : globalThis);
