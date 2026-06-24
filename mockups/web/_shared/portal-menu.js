/* Menu L1/L2/L3 — dùng chung main.html và trang con */
var L1_ICONS = {
  'Quản trị': '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></svg>',
  'Mua hàng': '<svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></svg>',
  'Giám sát': '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 20h8"/><path d="M12 18v2"/><path d="M7 9h4M7 12h7"/></svg>',
  'Danh mục': '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  'Báo cáo': '<svg viewBox="0 0 24 24"><path d="M4 20V4"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-8"/><path d="M20 16V6"/></svg>',
  'Hỗ trợ phần mềm': '<svg viewBox="0 0 24 24"><path d="M4 14a8 8 0 0 1 16 0"/><path d="M4 14v3a2 2 0 0 0 2 2h1"/><path d="M20 14v3a2 2 0 0 1-2 2h-1"/><path d="M12 20v2"/><circle cx="12" cy="11" r="1"/></svg>'
};

function portalBase() {
  return document.body.getAttribute('data-portal-base') || '';
}

function resolvePortalHref(href) {
  if (!href) return null;
  return portalBase() + href;
}

function hasChildren(node) {
  return node.children && node.children.length > 0;
}

function createMenuItemEl(node) {
  var kids = hasChildren(node);
  var href = resolvePortalHref(node.href || null);
  var el = document.createElement(kids ? 'div' : (href ? 'a' : 'div'));
  el.className = 'mega-item';
  if (!kids && href) {
    el.href = href;
    el.classList.add('is-link', 'has-href');
  } else if (!kids) {
    el.classList.add('is-leaf');
  }
  var label = document.createElement('span');
  label.textContent = node.label;
  el.appendChild(label);
  if (node.href) {
    var badge = document.createElement('span');
    badge.className = 'mockup-badge';
    badge.textContent = 'MOCKUP';
    label.appendChild(badge);
  }
  if (kids) {
    var chev = document.createElement('span');
    chev.className = 'chevron';
    chev.textContent = '›';
    el.appendChild(chev);
  }
  return el;
}

function buildMenuRow(node) {
  var row = document.createElement('div');
  row.className = 'menu-row';
  row.appendChild(createMenuItemEl(node));
  if (hasChildren(node)) {
    row.classList.add('has-flyout');
    var flyout = document.createElement('div');
    flyout.className = 'menu-flyout';
    node.children.forEach(function(child) {
      flyout.appendChild(buildMenuRow(child));
    });
    row.appendChild(flyout);
  }
  return row;
}

function buildMegaMenu(l1) {
  var mega = document.createElement('div');
  mega.className = 'mega-menu';
  mega.id = 'mega-' + l1.id;
  var list = document.createElement('div');
  list.className = 'mega-l2-list';
  l1.children.forEach(function(l2) {
    list.appendChild(buildMenuRow(l2));
  });
  mega.appendChild(list);
  return mega;
}

function renderPortalMenu(navEl) {
  if (!navEl || typeof MENU === 'undefined') return;
  navEl.innerHTML = '';
  MENU.forEach(function(l1) {
    var item = document.createElement('div');
    item.className = 'nav-l1-item';
    var iconWrap = document.createElement('span');
    iconWrap.className = 'nav-l1-icon';
    iconWrap.innerHTML = L1_ICONS[l1.label] || '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>';
    item.appendChild(iconWrap);
    var label = document.createElement('span');
    label.className = 'nav-l1-label';
    label.textContent = l1.label;
    item.appendChild(label);
    var mega = buildMegaMenu(l1);
    item.appendChild(mega);
    item.addEventListener('mouseenter', function() {
      document.querySelectorAll('.nav-l1-item').forEach(function(n) { n.classList.remove('open'); });
      document.querySelectorAll('.mega-menu').forEach(function(n) { n.classList.remove('open'); });
      item.classList.add('open');
      mega.classList.add('open');
    });
    item.addEventListener('mouseleave', function(e) {
      if (!mega.contains(e.relatedTarget)) {
        item.classList.remove('open');
        mega.classList.remove('open');
      }
    });
    mega.addEventListener('mouseleave', function(e) {
      if (!item.contains(e.relatedTarget)) {
        item.classList.remove('open');
        mega.classList.remove('open');
      }
    });
    navEl.appendChild(item);
  });
}
