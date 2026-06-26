/* Inject portal header — Back → main.html */
(function() {
  function initPortalChrome() {
    var base = document.body.getAttribute('data-portal-base') || '';
    var mainHref = base + 'main.html';
    var appHref = base ? (base + '../mobile/main.html') : '../mobile/main.html';
    var mount = document.getElementById('portal-chrome-root');
    if (!mount) return;

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
            '<span class="header-app-link__glyph" aria-hidden="true">📱</span><span>Salesman App</span></a>' +
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortalChrome);
  } else {
    initPortalChrome();
  }
})();
