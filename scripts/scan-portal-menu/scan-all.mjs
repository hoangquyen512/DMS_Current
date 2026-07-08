/**
 * Quét TOÀN BỘ menu portal dev — thu thập URL + component profile từng màn.
 * Chạy: npm install && npx playwright install chromium && npm run scan
 * Cấu hình: copy ../extract-portal-design/.env.example → .env
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../../design-system/web/extract');
const OUT_FILE = path.join(OUT_DIR, 'portal-menu-full-scan.json');

const L1_MENUS = [
  'Quản trị',
  'Mua hàng',
  'Giám sát',
  'Danh mục',
  'Báo cáo',
  'Hỗ trợ phần mềm',
];

function loadEnv() {
  const candidates = [
    path.join(__dirname, '.env'),
    path.join(__dirname, '../extract-portal-design/.env'),
  ];
  const out = { ...process.env };
  for (const envPath of candidates) {
    if (!fs.existsSync(envPath)) continue;
    for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i > 0) out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
    }
  }
  return out;
}

async function login(page, env) {
  const loginUrl = env.PORTAL_LOGIN_URL || 'https://dms-portal-dev.finviet.com.vn/auth/login/';
  await page.goto(loginUrl, { waitUntil: 'networkidle', timeout: 90000 });
  const sso = page.locator('button:has-text("Đăng nhập bằng SSO"), a:has-text("SSO")').first();
  if (await sso.count()) await sso.click();
  await page.waitForTimeout(2000);
  if (page.url().includes('eco-account') || page.url().includes('authentication')) {
    const user = env.PORTAL_USER;
    const pass = env.PORTAL_PASS;
    if (!user || !pass) throw new Error('Thiếu PORTAL_USER / PORTAL_PASS trong .env');
    for (const sel of ['input[type="tel"]', 'input[name="phone"]', 'input[name="username"]']) {
      const el = page.locator(sel).first();
      if (await el.count()) { await el.fill(user); break; }
    }
    await page.locator('input[type="password"]').first().fill(pass);
    await page.locator('button:has-text("Đăng nhập"), button[type="submit"]').first().click();
    await page.waitForLoadState('networkidle', { timeout: 90000 }).catch(() => {});
  }
  await page.goto(new URL('/dashboard/', loginUrl).href, { waitUntil: 'networkidle', timeout: 90000 });
}

async function collectMenuLinks(page) {
  const items = new Map();
  const add = (entry) => {
    if (!entry.href || !entry.text) return;
    if (!entry.href.startsWith('/')) return;
    const key = entry.href.split('?')[0];
    if (!items.has(key)) items.set(key, entry);
  };

  for (const branch of L1_MENUS) {
    const l1 = page.locator('.ant-menu-submenu-title', { hasText: branch }).first();
    if (!(await l1.count())) continue;
    await l1.hover();
    await page.waitForTimeout(500);

    const popup = page.locator('.ant-menu-submenu-popup:visible').last();
    const l2Links = popup.locator('a[href^="/"]');
    const l2Count = await l2Links.count();
    for (let i = 0; i < l2Count; i++) {
      const a = l2Links.nth(i);
      const text = (await a.innerText()).trim();
      const href = await a.getAttribute('href');
      add({ branch, text, href });
    }

    const nested = popup.locator('.ant-menu-submenu-title');
    const nCount = await nested.count();
    for (let i = 0; i < nCount; i++) {
      const nt = nested.nth(i);
      const group = (await nt.innerText()).trim();
      await nt.hover();
      await page.waitForTimeout(350);
      const subPopup = page.locator('.ant-menu-submenu-popup:visible').last();
      const subLinks = subPopup.locator('a[href^="/"]');
      const sCount = await subLinks.count();
      for (let j = 0; j < sCount; j++) {
        const a = subLinks.nth(j);
        const text = (await a.innerText()).trim();
        const href = await a.getAttribute('href');
        add({ branch, group, text, href });
      }
    }
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);
  }

  add({ branch: 'Dashboard', text: 'Bảng điều khiển', href: '/dashboard/' });
  return [...items.values()].sort((a, b) => a.href.localeCompare(b.href));
}

function scanPageProfile() {
  const q = (s) => document.querySelectorAll(s).length;
  const cols = [...document.querySelectorAll('.ant-table-thead th')]
    .map((th) => th.innerText?.trim().replace(/\s+/g, ' '))
    .filter(Boolean);
  const btns = [...new Set([...document.querySelectorAll('.ant-btn')].map((b) => b.innerText?.trim()).filter(Boolean))];
  const fields = [...document.querySelectorAll('.ant-form-item')]
    .map((item) => {
      const label = item.querySelector('.ant-form-item-label label')?.innerText?.trim();
      let type = 'unknown';
      if (item.querySelector('.ant-select-multiple')) type = 'select-multiple';
      else if (item.querySelector('.ant-tree-select')) type = 'tree-select';
      else if (item.querySelector('.ant-select')) type = 'select-single';
      else if (item.querySelector('.ant-picker-range')) type = 'date-range';
      else if (item.querySelector('.ant-picker')) type = 'datepicker';
      else if (item.querySelector('.ant-switch')) type = 'switch';
      else if (item.querySelector('.ant-checkbox')) type = 'checkbox';
      else if (item.querySelector('.ant-radio')) type = 'radio';
      else if (item.querySelector('.ant-input-number')) type = 'input-number';
      else if (item.querySelector('.ant-upload')) type = 'upload';
      else if (item.querySelector('textarea')) type = 'textarea';
      else if (item.querySelector('.ant-input')) type = 'input-text';
      return label ? { label, type } : null;
    })
    .filter(Boolean);

  let screenType = 'other';
  if (document.title === 'Error') screenType = 'error';
  else if (q('.ant-table') > 0) screenType = 'list';
  else if (q('.ant-tree') > 0) screenType = 'tree';
  else if (q('.ant-switch') > 2) screenType = 'config';

  return {
    title: document.title,
    url: location.href,
    screenType,
    tableColumns: cols,
    filterFields: fields,
    buttons: btns,
    components: {
      table: q('.ant-table'),
      select: q('.ant-select'),
      selectMultiple: q('.ant-select-multiple'),
      picker: q('.ant-picker'),
      pickerRange: q('.ant-picker-range'),
      switch: q('.ant-switch'),
      checkbox: q('.ant-checkbox'),
      upload: q('.ant-upload'),
      tree: q('.ant-tree'),
      pagination: q('.ant-pagination'),
      tabs: q('.ant-tabs'),
      modal: q('.ant-modal'),
      drawer: q('.ant-drawer'),
    },
  };
}

async function main() {
  const env = loadEnv();
  const origin = new URL(env.PORTAL_LOGIN_URL || 'https://dms-portal-dev.finviet.com.vn/auth/login/').origin;

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: false, slowMo: 40 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    console.log('Đăng nhập...');
    await login(page, env);

    console.log('Thu thập menu...');
    const menuItems = await collectMenuLinks(page);
    console.log(`Tìm thấy ${menuItems.length} màn hình`);

    const pages = [];
    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      const url = item.href.startsWith('http') ? item.href : origin + item.href;
      console.log(`[${i + 1}/${menuItems.length}] ${item.branch} → ${item.text} (${item.href})`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
      await page.waitForTimeout(2500);
      const profile = await page.evaluate(scanPageProfile);
      pages.push({ ...item, ...profile });
    }

    const report = {
      scannedAt: new Date().toISOString(),
      origin,
      menuCount: menuItems.length,
      menuItems,
      pages,
      summary: {
        byBranch: Object.fromEntries(
          L1_MENUS.map((b) => [b, pages.filter((p) => p.branch === b).length])
        ),
        screenTypes: pages.reduce((acc, p) => {
          acc[p.screenType] = (acc[p.screenType] || 0) + 1;
          return acc;
        }, {}),
      },
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(report, null, 2), 'utf8');
    console.log('Done →', OUT_FILE);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
