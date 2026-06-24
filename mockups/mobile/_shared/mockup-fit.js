/**
 * Scale mockup phone + dev bars to fit browser viewport (no page scroll).
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
