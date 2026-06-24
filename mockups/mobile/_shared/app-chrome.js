/* Bottom tab navigation */
(function() {
  var NAV_ICONS = {
    visit: '<svg viewBox="0 0 24 24"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><circle cx="12" cy="11" r="2.5"/></svg>',
    report: '<svg viewBox="0 0 24 24"><path d="M4 20V4"/><path d="M8 16v-6"/><path d="M12 16V8"/><path d="M16 16v-9"/><path d="M20 16V5"/></svg>',
    order: '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 4h2l2.5 12h11l2-8H6"/></svg>',
    more: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>'
  };

  function switchTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(function(p) {
      p.classList.toggle('active', p.id === 'tab-' + tabId);
    });
    document.querySelectorAll('.nav-item').forEach(function(n) {
      n.classList.toggle('active', n.getAttribute('data-tab') === tabId);
    });
    var statusBar = document.querySelector('.status-bar');
    if (statusBar) {
      var primaryTabs = ['bao-cao', 'don-hang', 'khac'];
      statusBar.classList.toggle('on-primary', primaryTabs.indexOf(tabId) >= 0);
    }
  }

  function initBottomNav() {
    var nav = document.getElementById('bottom-nav');
    if (!nav || typeof MENU === 'undefined') return;
    nav.innerHTML = '';
    MENU.forEach(function(tab) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-item' + (tab.id === 'vieng-tham' ? ' active' : '');
      btn.setAttribute('data-tab', tab.id);
      btn.innerHTML = (NAV_ICONS[tab.icon] || '') + '<span>' + tab.label + '</span>';
      if (tab.badge) {
        var b = document.createElement('span');
        b.className = 'nav-badge';
        b.textContent = tab.badge;
        btn.appendChild(b);
      }
      btn.addEventListener('click', function() { switchTab(tab.id); });
      nav.appendChild(btn);
    });
  }

  window.AppChrome = { switchTab: switchTab };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initBottomNav();
      if (location.hash) {
        var tab = location.hash.replace('#', '');
        if (tab) switchTab(tab);
      }
      if (window.fitMockup) window.fitMockup();
    });
  } else {
    initBottomNav();
    if (location.hash) {
      var tab = location.hash.replace('#', '');
      if (tab) switchTab(tab);
    }
    if (window.fitMockup) window.fitMockup();
  }
})();
