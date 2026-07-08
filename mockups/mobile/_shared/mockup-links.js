/**
 * Resolve cross-mockup links (Portal web entry) for http server vs file://
 */
(function () {
  var PORTAL_ENTRY_HTTP = '/main.html';

  function portalEntryHref() {
    if (location.protocol === 'http:' || location.protocol === 'https:') {
      return PORTAL_ENTRY_HTTP;
    }

    var path = decodeURIComponent(location.pathname).replace(/\\/g, '/');
    var marker = '/mockups/mobile/';
    var idx = path.indexOf(marker);
    if (idx < 0) {
      return '../../web/main.html';
    }

    var after = path.slice(idx + marker.length);
    var dirDepth = after.split('/').length - 1;
    var up = '';
    for (var i = 0; i < dirDepth + 1; i += 1) {
      up += '../';
    }
    return up + 'web/main.html';
  }

  function applyPortalLinks() {
    var href = portalEntryHref();
    document.querySelectorAll('.status-portal-link, [data-portal-entry]').forEach(function (el) {
      el.setAttribute('href', href);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPortalLinks);
  } else {
    applyPortalLinks();
  }
})();
