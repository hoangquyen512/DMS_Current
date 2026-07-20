/* Inject portal header — Back → main.html */
(function() {
  function initPortalChrome() {
    var base = document.body.getAttribute('data-portal-base') || '';
    var mainHref = base + 'main.html';
    var appHref = base ? (base + '../mobile/main.html') : '../mobile/main.html';
    var mount = document.getElementById('portal-chrome-root');
    if (!mount) return;

    if (!document.querySelector('link[rel="icon"][data-portal-favicon]')) {
      var favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = base + '_shared/salesman-app-icon.png';
      favicon.setAttribute('data-portal-favicon', '1');
      document.head.appendChild(favicon);
    }

    var header = document.createElement('header');
    header.className = 'portal-header';
    header.innerHTML =
      '<div class="header-top">' +
        '<button type="button" class="portal-back-btn" title="Về Dashboard" aria-label="Về Dashboard">←</button>' +
        '<a class="brand" href="' + mainHref + '">' +
          '<div class="brand-icon"><svg viewBox="0 0 32 32" aria-hidden="true">' +
            '<polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="#f5c518"/>' +
            '<rect x="11" y="11" width="10" height="10" rx="1.5" fill="#fff" opacity="0.95"/>' +
          '</svg></div><span class="brand-name">ecodms</span></a>' +
        '<nav class="nav-l1" id="navL1"></nav>' +
        '<div class="header-right">' +
          '<a class="header-app-link" href="' + appHref + '" title="Mở Salesman App (mockup mobile)">' +
            '<img class="header-app-link__icon" src="' + base + '_shared/salesman-app-icon.png" alt="" aria-hidden="true"/><span>Salesman App</span></a>' +
          '<span class="header-tag company">Công ty: FINVIET</span>' +
          '<span class="header-tag role">Vai trò: Admin</span>' +
          '<button class="header-icon-btn" title="Thông báo">🔔</button>' +
          '<button class="header-icon-btn" title="Hồ sơ">👤</button>' +
          '<button class="header-user-btn">Quyên CPH BA</button>' +
        '</div></div>';

    mount.appendChild(header);

    var backBtn = header.querySelector('.portal-back-btn');
    if (backBtn) backBtn.addEventListener('click', function() { window.location.href = mainHref; });

    renderPortalMenu(document.getElementById('navL1'));

    var basePath = base + '_shared/portal-mockup-widgets.js';
    if (!document.querySelector('script[data-portal-widgets]')) {
      var widgetScript = document.createElement('script');
      widgetScript.src = basePath;
      widgetScript.setAttribute('data-portal-widgets', '1');
      widgetScript.defer = true;
      document.body.appendChild(widgetScript);
    }

    var dateCssHref = base + '_shared/portal-date-range-picker.css';
    if (!document.querySelector('link[data-portal-date-picker]')) {
      var dateCss = document.createElement('link');
      dateCss.rel = 'stylesheet';
      dateCss.href = dateCssHref;
      dateCss.setAttribute('data-portal-date-picker', '1');
      document.head.appendChild(dateCss);
    }

    var dateJsPath = base + '_shared/portal-date-range-picker.js';
    if (!document.querySelector('script[data-portal-date-picker]')) {
      var dateScript = document.createElement('script');
      dateScript.src = dateJsPath;
      dateScript.setAttribute('data-portal-date-picker', '1');
      dateScript.defer = true;
      document.body.appendChild(dateScript);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortalChrome);
  } else {
    initPortalChrome();
  }
})();
