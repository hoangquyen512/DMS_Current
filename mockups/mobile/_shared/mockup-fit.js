/**
 * Scale mockup phone + dev bars to fit browser viewport (no page scroll).
 * + inject icon DMS Portal (🌐) vào status bar nếu thiếu.
 */
(function () {
  var BODY_FIT =
    'mockup-page app-hub visit-page sub-page mockup-gallery'.split(' ');

  function shouldFit() {
    return BODY_FIT.some(function (c) {
      return document.body.classList.contains(c);
    });
  }

  function isMovable(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.classList.contains('mockup-viewport')) return false;
    return el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE';
  }

  function buildStage() {
    if (!shouldFit() || document.querySelector('.mockup-viewport')) return;

    var movable = Array.prototype.filter.call(document.body.children, isMovable);
    if (!movable.length) return;

    var viewport = document.createElement('div');
    viewport.className = 'mockup-viewport';
    var stage = document.createElement('div');
    stage.className = 'mockup-stage';

    document.body.appendChild(viewport);
    viewport.appendChild(stage);
    movable.forEach(function (el) {
      stage.appendChild(el);
    });
  }

  function updateScale() {
    var viewport = document.querySelector('.mockup-viewport');
    var stage = document.querySelector('.mockup-stage');
    if (!viewport || !stage) return;

    stage.style.transform = 'none';
    viewport.style.width = '';
    viewport.style.height = '';

    var w = stage.offsetWidth;
    var h = stage.offsetHeight;
    if (!w || !h) return;

    var pad = 12;
    var sx = (window.innerWidth - pad * 2) / w;
    var sy = (window.innerHeight - pad * 2) / h;
    var scale = Math.min(1, sx, sy);
    scale = Math.max(0.45, Math.round(scale * 1000) / 1000);

    stage.style.transform = 'scale(' + scale + ')';
    viewport.style.width = Math.ceil(w * scale) + 'px';
    viewport.style.height = Math.ceil(h * scale) + 'px';
  }

  function init() {
    if (!shouldFit()) return;
    buildStage();
    updateScale();
    window.fitMockup = updateScale;
    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', function () {
      setTimeout(updateScale, 100);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateScale);
    }
  }

  function resolvePortalHref() {
    var body = document.body;
    if (body && body.dataset.portalHref) return body.dataset.portalHref;
    var path = (location.pathname || '').replace(/\\/g, '/');
    var marker = '/mobile/';
    var idx = path.indexOf(marker);
    if (idx >= 0) {
      var after = path.slice(idx + marker.length);
      var depth = after.split('/').length - 1;
      var up = '';
      for (var i = 0; i <= depth; i++) up += '../';
      return up + 'web/main.html';
    }
    return '../web/main.html';
  }

  function createPortalLink(href) {
    var link = document.createElement('a');
    link.className = 'status-portal-link';
    link.href = href;
    link.title = 'DMS Portal';
    link.setAttribute('aria-label', 'Mở DMS Portal');
    link.textContent = '🌐';
    return link;
  }

  function injectStatusPortalLinks() {
    var href = resolvePortalHref();
    document.querySelectorAll('.status-bar').forEach(function (bar) {
      if (bar.querySelector('.status-portal-link')) return;
      var right = bar.querySelector('.status-right, .status-icons, .icons');
      if (right) {
        right.insertBefore(createPortalLink(href), right.firstChild);
        if (right.classList.contains('icons')) right.classList.add('status-icons');
        return;
      }
      var spans = bar.querySelectorAll(':scope > span');
      var last = spans[spans.length - 1];
      if (!last) return;
      var wrap = document.createElement('span');
      wrap.className = 'status-icons';
      bar.replaceChild(wrap, last);
      wrap.appendChild(createPortalLink(href));
      var signal = document.createElement('span');
      signal.innerHTML = last.innerHTML;
      wrap.appendChild(signal);
    });
  }

  window.injectStatusPortalLinks = injectStatusPortalLinks;

  function boot() {
    injectStatusPortalLinks();
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
