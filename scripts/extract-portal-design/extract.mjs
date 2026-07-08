/**
 * Trích design system từ dms-portal-dev (sau SSO).
 * Chạy: npm install && npx playwright install chromium && npm run extract
 * Cấu hình: copy .env.example → .env
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../../design-system/web/extract');
const SCREEN_DIR = path.join(OUT_DIR, 'screenshots');

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return {};
  const out = {};
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i > 0) out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

const SELECTORS = {
  phone: [
    'input[name="phone"]',
    'input[name="username"]',
    'input[type="tel"]',
    'input[placeholder*="Số điện thoại"]',
    'input[placeholder*="số điện thoại"]',
    'input[placeholder*="Phone"]'
  ],
  password: ['input[name="password"]', 'input[type="password"]'],
  submit: [
    'button[type="submit"]',
    'button:has-text("Đăng nhập")',
    'button:has-text("Login")',
    '.ant-btn-primary'
  ],
  sso: [
    'button:has-text("SSO")',
    'a:has-text("SSO")',
    'button:has-text("Đăng nhập SSO")',
    'a:has-text("Đăng nhập SSO")',
    '[class*="sso"]'
  ]
};

async function clickFirst(page, list, timeout = 8000) {
  for (const sel of list) {
    const el = page.locator(sel).first();
    if (await el.count()) {
      try {
        await el.click({ timeout });
        return sel;
      } catch (_) { /* try next */ }
    }
  }
  return null;
}

async function fillFirst(page, list, value) {
  for (const sel of list) {
    const el = page.locator(sel).first();
    if (await el.count()) {
      await el.fill(value);
      return sel;
    }
  }
  return null;
}

async function extractComponentStyles(page) {
  return page.evaluate(() => {
    const pick = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        borderColor: cs.borderColor,
        borderRadius: cs.borderRadius,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        height: cs.height,
        padding: cs.padding,
        boxShadow: cs.boxShadow
      };
    };
    const q = (s) => document.querySelector(s);
    return {
      header: pick(q('.ant-pro-global-header') || q('.ant-layout-header')),
      btnPrimary: pick(q('.ant-btn-primary')),
      btnDefault: pick(q('.ant-btn-default')),
      input: pick(q('.ant-input')),
      tableHead: pick(q('.ant-table-thead th')),
      tableCell: pick(q('.ant-table-tbody td')),
      tagSuccess: pick(q('.ant-tag-success') || q('.ant-tag-green')),
      breadcrumb: pick(q('.ant-breadcrumb')),
      pageTitle: pick(q('.ant-page-header-heading-title') || q('.ant-pro-page-container-children-content h1'))
    };
  });
}

async function main() {
  const env = { ...process.env, ...loadEnv() };
  const loginUrl = env.PORTAL_LOGIN_URL || 'https://dms-portal-dev.finviet.com.vn/auth/login/';
  const user = env.PORTAL_USER;
  const pass = env.PORTAL_PASS;
  const samplePaths = (env.PORTAL_SAMPLE_PATHS || '/|/sale/news').split('|').map((s) => s.trim()).filter(Boolean);

  if (!user || !pass) {
    console.error('Thiếu PORTAL_USER / PORTAL_PASS trong scripts/extract-portal-design/.env');
    process.exit(1);
  }

  fs.mkdirSync(SCREEN_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: false, slowMo: 80 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const log = [];

  try {
    await page.goto(loginUrl, { waitUntil: 'networkidle', timeout: 60000 });
    await page.screenshot({ path: path.join(SCREEN_DIR, '01-login-portal.png'), fullPage: true });
    log.push({ step: 'portal_login', url: page.url() });

    const sso = await clickFirst(page, SELECTORS.sso);
    if (sso) {
      await page.waitForTimeout(2000);
      log.push({ step: 'click_sso', selector: sso, url: page.url() });
    }

    if (page.url().includes('eco-account') || page.url().includes('authentication')) {
      await page.screenshot({ path: path.join(SCREEN_DIR, '02-sso-page.png'), fullPage: true });
      const phoneSel = await fillFirst(page, SELECTORS.phone, user);
      const passSel = await fillFirst(page, SELECTORS.password, pass);
      log.push({ step: 'fill_credentials', phoneSel, passSel });
      const submitSel = await clickFirst(page, SELECTORS.submit);
      log.push({ step: 'submit', selector: submitSel });
      await page.waitForTimeout(5000);
      await page.waitForLoadState('networkidle', { timeout: 90000 }).catch(() => {});
    }

    await page.screenshot({ path: path.join(SCREEN_DIR, '03-after-login.png'), fullPage: true });
    log.push({ step: 'after_login', url: page.url() });

    const origin = new URL(loginUrl).origin;
    const samples = [];

    for (const p of samplePaths) {
      const url = p.startsWith('http') ? p : origin + p;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await page.waitForTimeout(1500);
      const safe = p.replace(/[^\w-]+/g, '_').slice(0, 40) || 'home';
      await page.screenshot({ path: path.join(SCREEN_DIR, `page-${safe}.png`), fullPage: true });
      const styles = await extractComponentStyles(page);
      const antClasses = await page.evaluate(() => {
        const set = new Set();
        document.querySelectorAll('[class]').forEach((el) => {
          el.className.toString().split(/\s+/).forEach((c) => {
            if (c.startsWith('ant-') || c.startsWith('ant-pro-')) set.add(c);
          });
        });
        return [...set].sort();
      });
      samples.push({ path: p, url: page.url(), styles, antClasses: antClasses.slice(0, 200) });
    }

    const report = {
      extractedAt: new Date().toISOString(),
      loginUrl,
      finalUrl: page.url(),
      log,
      samples
    };

    fs.writeFileSync(path.join(OUT_DIR, 'portal-live-snapshot.json'), JSON.stringify(report, null, 2), 'utf8');
    console.log('Done →', path.join(OUT_DIR, 'portal-live-snapshot.json'));
    console.log('Screenshots →', SCREEN_DIR);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
