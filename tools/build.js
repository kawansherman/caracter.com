/* =========================================================================
 * tools/build.js — CARACTER.com static site generator (zero dependencies).
 *
 * Reads src/pages/*.html (flat pages, each with JSON front-matter) plus the
 * structured data in assets/js/data.js, and writes the finished site to the
 * folder root. Pages that repeat — 6 characters, 6 audience groups, 4 studio
 * capabilities, 4 partner forms, 4 legal pages — are GENERATED from data, so
 * adding a seventh character is a data edit and not a page build.
 *
 *   node tools/build.js            build
 *   node tools/build.js --check    verify output without writing
 *
 * Thai and Japanese page text: data.js deliberately leaves th/ja undefined when
 * they are not authored, and T() fills them from tools/mt-page-text.json. A
 * miss is REPORTED, never silently served as English — the mistake that shipped
 * 322 English strings under a Thai label on the FURI MONSTER build.
 * ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..');
const JS = path.join(SITE, 'assets', 'js');
const PAGES_DIR = path.join(SITE, 'src', 'pages');

require(path.join(JS, 'site.config.js'));
require(path.join(JS, 'data.js'));
require(path.join(JS, 'i18n.js'));

const FM = globalThis.FM;
const D = FM.data;
const I = FM.i18n;
const CFG = FM.config;
const LOCALES = CFG.locales;
const CHECK = process.argv.includes('--check');

/* ---------- Thai/Japanese translation table ------------------------------ */
const MT_PATH = path.join(__dirname, 'mt-page-text.json');
let MT = {};
try { MT = (JSON.parse(fs.readFileSync(MT_PATH, 'utf8')).runs) || {}; }
catch (e) {
  if (fs.existsSync(MT_PATH)) throw new Error('tools/mt-page-text.json is not valid JSON: ' + e.message);
  MT = {};
}
const MISSING = new Set();
const MISSING_BY_PAGE = new Map();
let PAGE = '(shared)';

function lookup(enText, locale) {
  const row = MT[enText];
  return (row && row[locale]) ? row[locale] : null;
}
function noteMissing(enText) {
  if (!enText) return;
  MISSING.add(enText);
  if (!MISSING_BY_PAGE.has(PAGE)) MISSING_BY_PAGE.set(PAGE, new Set());
  MISSING_BY_PAGE.get(PAGE).add(enText);
}

/* ---------- helpers ------------------------------------------------------ */
function esc(s) {
  return String(s === null || s === undefined ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function en(field) { return field && field.en ? field.en : String(field || ''); }

/* A five-language span run. */
function T(field, cls) {
  if (typeof field === 'string') field = { en: field };
  const out = {};
  let missing = false;
  LOCALES.forEach(l => {
    let v = field[l];
    if (v === undefined || v === '') {
      if (l === 'th' || l === 'ja') {
        const mt = lookup(field.en, l);
        if (mt === null) { missing = true; v = field.en; } else v = mt;
      } else v = field.en;
    }
    out[l] = v;
  });
  if (missing) noteMissing(field.en);
  return LOCALES.map(l =>
    `<span class="t" data-l="${l}">${esc(out[l])}</span>`).join('');
}
/* English only, for attributes and metadata. */
function E(field) { return esc(en(field)); }

function badge(status) {
  const map = {
    open: ['badge--open', 'status.open'],
    'by-application': ['badge--app', 'status.byApplication'],
    'first-party': ['badge--first', 'status.firstParty']
  };
  const m = map[status] || map['by-application'];
  return `<span class="badge ${m[0]}">${T({ en: I.t(m[1], 'en'), 'zh-Hant': I.t(m[1], 'zh-Hant'),
    'zh-Hans': I.t(m[1], 'zh-Hans'), th: I.t(m[1], 'th'), ja: I.t(m[1], 'ja') })}</span>`;
}

function shell(meta, body) {
  const root = meta.root || '';
  const canonPath = meta.canonical || meta.file;
  const canon = CFG.url + '/' + (canonPath === 'index.html' ? '' : canonPath);
  const og = CFG.url + '/assets/img/og/caracter.png';
  /* Append the brand only when the page title does not already name it —
     otherwise "About CARACTER" became "About CARACTER — CARACTER". */
  const title = /CARACTER/i.test(meta.title) ? meta.title : meta.title + ' — CARACTER';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': CFG.url + '/#org', name: 'CARACTER',
        alternateName: ['CARACTER.com', 'catracter.com'],
        url: CFG.url, slogan: en(CFG.tagline), description: en(CFG.positioning),
        email: CFG.contact.general,
        contactPoint: [{
          '@type': 'ContactPoint', contactType: 'sales', email: CFG.contact.general,
          availableLanguage: LOCALES
        }]
      },
      {
        '@type': 'WebSite', '@id': CFG.url + '/#website', url: CFG.url,
        name: 'CARACTER', inLanguage: LOCALES, publisher: { '@id': CFG.url + '/#org' }
      }
    ]
  };
  if (meta.jsonld) schema['@graph'] = schema['@graph'].concat(meta.jsonld);

  const hreflang = LOCALES.map(l =>
    `  <link rel="alternate" hreflang="${esc(l)}" href="${esc(canon)}">`
  ).join('\n') + `\n  <link rel="alternate" hreflang="x-default" href="${esc(canon)}">`;

  return `<!DOCTYPE html>
<html lang="en" data-locale="en" data-root="${root}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(meta.desc)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${esc(canon)}">
${hreflang}
  <meta name="theme-color" content="#FFFFFF">
  <meta property="og:type" content="${esc(meta.ogType || 'website')}">
  <meta property="og:site_name" content="CARACTER">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(meta.desc)}">
  <meta property="og:url" content="${esc(canon)}">
  <meta property="og:image" content="${esc(og)}">
  <meta property="og:image:alt" content="CARACTER — Where characters become business.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(meta.desc)}">
  <meta name="twitter:image" content="${esc(og)}">
  <link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${root}assets/css/style.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body data-page="${esc(meta.page || '')}">
  <a class="skip" href="#main">${T({ en: 'Skip to content', 'zh-Hant': I.t('nav.skip', 'zh-Hant'), 'zh-Hans': I.t('nav.skip', 'zh-Hans'), th: I.t('nav.skip', 'th'), ja: I.t('nav.skip', 'ja') })}</a>
  <header id="ca-header"></header>
  <div id="ca-menu"></div>

${body}

  <footer id="ca-footer"></footer>
  <script src="${root}assets/js/site.config.js"></script>
  <script src="${root}assets/js/analytics.js"></script>
  <script src="${root}assets/js/data.js"></script>
  <script src="${root}assets/js/i18n.js"></script>
  <script src="${root}assets/js/chrome.js"></script>
  <script src="${root}assets/js/app.js"></script>
  <script src="${root}assets/js/site-tools.js"></script>
</body>
</html>
`;
}

/* ---------- fragments ---------------------------------------------------- */
function groupCards() {
  return `<div class="grid grid-groups">${D.groups.map(g => `
    <a class="gcard" href="{{ROOT}}solutions/${g.slug}.html" style="--a:${g.accent}">
      <span class="gcard-n">${String(g.index).padStart(2, '0')}</span>
      <span class="gcard-name">${T(g.name)}</span>
      <span class="gcard-q">${T(g.question)}</span>
      <span class="gcard-b">${T(g.benefit)}</span>
      <span class="gcard-go">${T({ en: 'Read more', 'zh-Hant': '了解更多', 'zh-Hans': '了解更多', th: 'อ่านต่อ', ja: '詳しく見る' })} →</span>
    </a>`).join('')}</div>`;
}

function routePanels() {
  return `<div class="routes">${D.routes.map(r => `
    <article class="route" style="--a:${r.accent}">
      <p class="eyebrow">${T(r.name)}</p>
      <h3 class="route-claim">${T(r.claim)}</h3>
      <ol class="route-steps">${r.steps.map((s, i) => `
        <li><span class="rs-n">${i + 1}</span><span class="rs-t">${T(s)}</span></li>`).join('')}
      </ol>
      <p class="route-body">${T(r.body)}</p>
      <dl class="route-meta">
        <div><dt>${T({ en: 'Time to revenue', 'zh-Hant': '見收入時間', 'zh-Hans': '见收入时间', th: 'เวลาถึงรายได้', ja: '収益までの時間' })}</dt><dd>${T(r.time)}</dd></div>
        <div><dt>${T({ en: 'Exposure', 'zh-Hant': '風險曝露', 'zh-Hans': '风险暴露', th: 'ความเสี่ยง', ja: 'エクスポージャー' })}</dt><dd>${T(r.exposure)}</dd></div>
      </dl>
    </article>`).join('')}</div>`;
}

function characterCards() {
  return `<div class="grid grid-chars">${D.characters.map(c => `
    <a class="ccard" href="{{ROOT}}explore/${c.collection}/${c.slug}.html" style="--a:${c.accent}">
      <span class="ccard-art"><img src="{{ROOT}}assets/img/ip/furi-monster/${c.slug}.webp"
        alt="${E(c.name)} — ${E(c.role)}" loading="lazy" decoding="async" width="800" height="800"></span>
      <span class="ccard-body">
        <span class="ccard-name">${T(c.name)}</span>
        <span class="ccard-role">${T(c.role)}</span>
        <span class="ccard-line">${T(c.line)}</span>
      </span>
    </a>`).join('')}</div>`;
}

function ipCards() {
  return `<div class="grid grid-ip">${D.collections.map(col => {
    const first = D.charactersOf(col.id)[0];
    return `
    <a class="ipcard" href="{{ROOT}}explore/${col.slug}.html" style="--a:${col.accent}">
      <span class="ipcard-art"><img src="{{ROOT}}assets/img/ip/furi-monster/${first ? first.slug : 'furi-prince'}.webp"
        alt="${E(col.name)}" loading="lazy" decoding="async" width="800" height="800"></span>
      <span class="ipcard-body">
        <span class="ipcard-top">${badge(col.status)}</span>
        <span class="ipcard-name">${T(col.name)}</span>
        <span class="ipcard-cn">${T(col.cn)}</span>
        <span class="ipcard-prop">${T(col.proposition)}</span>
      </span>
    </a>`;
  }).join('')}</div>`;
}

function studioCards() {
  return `<div class="grid grid-studio">${D.studio.map(s => `
    <a class="scard" href="{{ROOT}}studio/${s.slug}.html" style="--a:${s.accent}">
      <span class="scard-name">${T(s.name)}</span>
      <span class="scard-del">${T(s.deliverable)}</span>
      <span class="scard-body">${T(s.body)}</span>
      <span class="scard-go">${T({ en: 'See the deliverable', 'zh-Hant': '查看交付內容', 'zh-Hans': '查看交付内容', th: 'ดูสิ่งที่ส่งมอบ', ja: '成果物を見る' })} →</span>
    </a>`).join('')}</div>`;
}

function criteriaTable() {
  return `<div class="tbl-wrap"><table class="tbl">
    <thead><tr>
      <th>${T({ en: 'Criterion', 'zh-Hant': '標準', 'zh-Hans': '标准', th: 'เกณฑ์', ja: '基準' })}</th>
      <th>${T({ en: 'Asked in the RFQ', 'zh-Hant': 'RFQ 中詢問', 'zh-Hans': 'RFQ 中询问', th: 'ถามใน RFQ', ja: 'RFQで聞くこと' })}</th>
      <th>${T({ en: 'Checked on the supplier', 'zh-Hant': '對供應商核對', 'zh-Hans': '对供应商核对', th: 'ตรวจกับผู้ผลิต', ja: 'サプライヤー側で確認' })}</th>
      <th>${T({ en: 'Match rule', 'zh-Hant': '配對規則', 'zh-Hans': '配对规则', th: 'กฎการจับคู่', ja: 'マッチング規則' })}</th>
    </tr></thead>
    <tbody>${D.matchCriteria.map(c => `<tr>
      <td><b>${T(c.name)}</b></td><td>${T(c.rfq)}</td><td>${T(c.supplier)}</td><td>${T(c.rule)}</td>
    </tr>`).join('')}</tbody></table></div>`;
}

function rfqTable() {
  return `<div class="tbl-wrap"><table class="tbl">
    <thead><tr>
      <th>${T({ en: 'State', 'zh-Hant': '狀態', 'zh-Hans': '状态', th: 'สถานะ', ja: '状態' })}</th>
      <th>${T({ en: 'Owner', 'zh-Hant': '負責', 'zh-Hans': '负责', th: 'ผู้รับผิดชอบ', ja: '担当' })}</th>
      <th>${T({ en: 'Entry', 'zh-Hant': '進入條件', 'zh-Hans': '进入条件', th: 'เงื่อนไขเข้า', ja: '開始条件' })}</th>
      <th>${T({ en: 'Exit', 'zh-Hant': '完成條件', 'zh-Hans': '完成条件', th: 'เงื่อนไขจบ', ja: '終了条件' })}</th>
      <th>${T({ en: 'Document', 'zh-Hant': '產生文件', 'zh-Hans': '产生文件', th: 'เอกสาร', ja: '書類' })}</th>
    </tr></thead>
    <tbody>${D.rfqStates.map(r => `<tr>
      <td><code>${esc(r[0])}</code></td><td>${esc(r[1])}</td><td>${T(r[2])}</td><td>${T(r[3])}</td><td>${esc(r[5])}</td>
    </tr>`).join('')}</tbody></table></div>`;
}

function trustList() {
  return `<div class="grid grid-trust">${D.trust.map(t => `
    <article class="tcard"><h3 class="tcard-t">${T(t.title)}</h3><p>${T(t.body)}</p></article>`).join('')}</div>`;
}

function neverList() {
  return `<ul class="never">${D.never.map(n => `<li>${T(n)}</li>`).join('')}</ul>`;
}

const FRAGMENTS = {
  GROUP_CARDS: groupCards,
  ROUTE_PANELS: routePanels,
  CHARACTER_CARDS: characterCards,
  IP_CARDS: ipCards,
  STUDIO_CARDS: studioCards,
  CRITERIA_TABLE: criteriaTable,
  RFQ_TABLE: rfqTable,
  TRUST_LIST: trustList,
  NEVER_LIST: neverList
};

/* ---------- fill --------------------------------------------------------- */
function fill(text, root) {
  /* Fragments first: a fragment's own markup contains {{ROOT}} links, so ROOT
   * has to be substituted AFTER expansion or every generated link keeps the
   * literal placeholder — which is exactly what the checker caught. */
  let out = text.replace(/\{\{([A-Z_]+)\}\}/g, (all, name) => {
    if (name === 'ROOT') return all;              /* handled on the next line */
    if (!FRAGMENTS[name]) throw new Error('unknown fragment {{' + name + '}} — have: ' + Object.keys(FRAGMENTS).join(', '));
    return FRAGMENTS[name]();
  });
  out = out.replace(/\{\{ROOT\}\}/g, root || '');
  out = out.replace(/\{\{T:([\s\S]*?)\}\}/g, (all, payload) => {
    const parts = payload.split('|').map(s => s.trim());
    const field = {
      en: parts[0],
      'zh-Hant': parts[1] || parts[0],
      'zh-Hans': parts[2] || parts[1] || parts[0]
    };
    if (parts[3]) field.th = parts[3];
    if (parts[4]) field.ja = parts[4];
    return T(field);
  });
  return out;
}

/* ---------- generated pages ---------------------------------------------- */
function crumb(root, items) {
  return `<p class="crumbs">${items.map((it, i) =>
    it.href ? `<a href="${root}${it.href}">${T(it.label)}</a>` : `<span>${T(it.label)}</span>`
  ).join('<span class="crumb-sep">/</span>')}</p>`;
}

function characterPages() {
  const out = [];
  D.collections.forEach(col => {
    D.charactersOf(col.id).forEach(c => {
      const file = `explore/${col.slug}/${c.slug}.html`;
      PAGE = file;
      const root = '../../';
      const body = `<main id="main">
  <section class="page-head" style="--a:${c.accent}">
    <div class="wrap">
      ${crumb(root, [
        { label: { en: 'Home', 'zh-Hant': '首頁', 'zh-Hans': '首页', th: 'หน้าแรก', ja: 'ホーム' }, href: 'index.html' },
        { label: { en: 'Explore IP', 'zh-Hant': '探索 IP', 'zh-Hans': '探索 IP', th: 'สำรวจ IP', ja: 'IPを探す' }, href: 'explore/index.html' },
        { label: col.name, href: 'explore/' + col.slug + '.html' },
        { label: c.name }
      ])}
      <div class="char-hero">
        <div class="char-hero-art">
          <img src="${root}assets/img/ip/furi-monster/${c.slug}.webp" alt="${E(c.name)}" width="800" height="800" decoding="async">
        </div>
        <div class="char-hero-text">
          <p class="eyebrow">${T(c.role)}</p>
          <h1 class="display">${T(c.name)}</h1>
          <p class="char-line">${T(c.line)}</p>
          <p class="lede">${T(c.personality)}</p>
          <div class="char-actions">
            <a class="btn btn--primary" href="${root}partner/become-a-partner.html">${T({ en: 'Request a licence', 'zh-Hant': '申請授權', 'zh-Hans': '申请授权', th: 'ขอสิทธิ์ใช้งาน', ja: '許諾を相談する' })}</a>
            <a class="btn" href="${root}explore/${col.slug}.html">${T({ en: 'Back to the collection', 'zh-Hant': '返回系列', 'zh-Hans': '返回系列', th: 'กลับไปที่คอลเลกชัน', ja: 'コレクションに戻る' })}</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="char-specs">
        <div class="spec"><p class="spec-k">${T({ en: 'Guardian of', 'zh-Hant': '守護', 'zh-Hans': '守护', th: 'ผู้พิทักษ์', ja: '守るもの' })}</p><p class="spec-v">${T(c.symbol)}</p></div>
        <div class="spec"><p class="spec-k">${T({ en: 'Licensing status', 'zh-Hant': '授權狀態', 'zh-Hans': '授权状态', th: 'สถานะสิทธิ์', ja: '許諾状況' })}</p><p class="spec-v">${badge(c.licensing)}</p></div>
        <div class="spec"><p class="spec-k">${T({ en: 'Collection', 'zh-Hant': '系列', 'zh-Hans': '系列', th: 'คอลเลกชัน', ja: 'コレクション' })}</p><p class="spec-v">${T(col.name)}</p></div>
      </div>
      <div class="grid grid-2 gap-lg" style="margin-top:clamp(28px,4vw,48px)">
        <div class="card card--ok">
          <h2 class="h3">${T({ en: 'Good fit for', 'zh-Hant': '適合用途', 'zh-Hans': '适合用途', th: 'เหมาะกับ', ja: '適する用途' })}</h2>
          <p>${T(c.suitable)}</p>
        </div>
        <div class="card card--no">
          <h2 class="h3">${T({ en: 'Not permitted', 'zh-Hant': '不允許用途', 'zh-Hans': '不允许用途', th: 'ไม่อนุญาต', ja: '認められない用途' })}</h2>
          <p>${T(c.notSuitable)}</p>
        </div>
      </div>
      <div class="notice" style="margin-top:26px">
        ${T({ en: 'Every use is subject to written approval. Browsing this page does not grant a licence, and a licence is only formed when both parties sign.',
          'zh-Hant': '所有用途均需書面批核。瀏覽此頁不構成授權，授權只在雙方簽署時成立。',
          'zh-Hans': '所有用途均需书面批核。浏览此页不构成授权，授权只在双方签署时成立。',
          th: 'ทุกการใช้ต้องได้รับการอนุมัติเป็นลายลักษณ์อักษร การเข้าชมหน้านี้ไม่ได้ให้สิทธิ์ และสิทธิ์จะเกิดเมื่อทั้งสองฝ่ายลงนามเท่านั้น',
          ja: '利用はすべて書面承認が必要です。このページの閲覧は許諾ではなく、許諾は双方の署名によってのみ成立します。' })}
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <p class="eyebrow">${T({ en: 'The other five', 'zh-Hant': '另外五位', 'zh-Hans': '另外五位', th: 'อีกห้าคน', ja: 'ほかの5人' })}</p>
      <div class="grid grid-mini">${D.charactersOf(col.id).filter(x => x.slug !== c.slug).map(o => `
        <a class="minicard" href="${root}explore/${col.slug}/${o.slug}.html" style="--a:${o.accent}">
          <img src="${root}assets/img/ip/furi-monster/${o.slug}.webp" alt="${E(o.name)}" width="200" height="200" loading="lazy" decoding="async">
          <span>${T(o.name)}</span>
        </a>`).join('')}</div>
    </div>
  </section>
</main>`;
      out.push({
        file,
        html: shell({
          file, root,
          page: 'explore',
          title: en(c.name) + ' — ' + en(c.role),
          desc: (en(c.role) + '. ' + en(c.line)).slice(0, 158),
          jsonld: [{
            '@type': 'CreativeWork', name: en(c.name), description: en(c.line),
            about: en(c.symbol), creator: { '@id': CFG.url + '/#org' }
          }]
        }, fill(body, root))
      });
    });
  });
  return out;
}

function groupPages() {
  return D.groups.map(g => {
    const file = `solutions/${g.slug}.html`;
    PAGE = file;
    const root = '../';
    const body = `<main id="main">
  <section class="page-head" style="--a:${g.accent}">
    <div class="wrap">
      ${crumb(root, [
        { label: { en: 'Home', 'zh-Hant': '首頁', 'zh-Hans': '首页', th: 'หน้าแรก', ja: 'ホーム' }, href: 'index.html' },
        { label: { en: 'Solutions', 'zh-Hant': '解決方案', 'zh-Hans': '解决方案', th: 'โซลูชัน', ja: 'ソリューション' }, href: 'solutions/index.html' },
        { label: g.name }
      ])}
      <p class="eyebrow">${T({ en: 'Who it is for', 'zh-Hant': '適合誰', 'zh-Hans': '适合谁', th: 'เหมาะกับใคร', ja: '対象' })}</p>
      <h1 class="display balance">${T(g.name)}</h1>
      <p class="q-lede">${T(g.question)}</p>
      <p class="lede">${T(g.benefit)}</p>
    </div>
  </section>
  <section class="section section--tight">
    <div class="wrap">
      <div class="grid grid-3">
        <div class="card"><p class="spec-k">${T({ en: 'What you bring', 'zh-Hant': '你帶來什麼', 'zh-Hans': '你带来什么', th: 'คุณมีอะไร', ja: '持ち込むもの' })}</p><p>${T(g.brings)}</p></div>
        <div class="card"><p class="spec-k">${T({ en: 'What you need', 'zh-Hant': '你需要什麼', 'zh-Hans': '你需要什么', th: 'คุณต้องการอะไร', ja: '必要なもの' })}</p><p>${T(g.needs)}</p></div>
        <div class="card"><p class="spec-k">${T({ en: 'What CARACTER does', 'zh-Hant': 'CARACTER 做什麼', 'zh-Hans': 'CARACTER 做什么', th: 'CARACTER ทำอะไร', ja: 'CARACTERが担うこと' })}</p><p>${T(g.does)}</p></div>
      </div>
      <div class="cta-band">
        <div>
          <p class="eyebrow">${T({ en: 'First step', 'zh-Hant': '第一步', 'zh-Hans': '第一步', th: 'ก้าวแรก', ja: '最初の一歩' })}</p>
          <h2 class="h3">${T(g.firstStep)}</h2>
        </div>
        <a class="btn btn--primary" href="${root}${g.href}">${T(g.firstStep)}</a>
      </div>
    </div>
  </section>
  <section class="section section--tight">
    <div class="wrap">
      <p class="eyebrow">${T({ en: 'The other five groups', 'zh-Hant': '另外五個群組', 'zh-Hans': '另外五个群组', th: 'อีกห้ากลุ่ม', ja: 'ほかの5グループ' })}</p>
      <div class="grid grid-mini">${D.groups.filter(x => x.slug !== g.slug).map(o => `
        <a class="minicard minicard--text" href="${root}solutions/${o.slug}.html" style="--a:${o.accent}">
          <span class="minicard-n">${String(o.index).padStart(2, '0')}</span><span>${T(o.name)}</span>
        </a>`).join('')}</div>
    </div>
  </section>
</main>`;
    return {
      file,
      html: shell({
        file, root, page: 'solutions',
        title: en(g.name),
        desc: (en(g.question) + ' ' + en(g.benefit)).slice(0, 158),
        jsonld: [{ '@type': 'Service', name: en(g.name), description: en(g.does), provider: { '@id': CFG.url + '/#org' } }]
      }, fill(body, root))
    };
  });
}

function studioPages() {
  return D.studio.map(s => {
    const file = `studio/${s.slug}.html`;
    PAGE = file;
    const root = '../';
    const body = `<main id="main">
  <section class="page-head" style="--a:${s.accent}">
    <div class="wrap">
      ${crumb(root, [
        { label: { en: 'Home', 'zh-Hant': '首頁', 'zh-Hans': '首页', th: 'หน้าแรก', ja: 'ホーム' }, href: 'index.html' },
        { label: { en: 'AI Studio', 'zh-Hant': 'AI 製作室', 'zh-Hans': 'AI 制作室', th: 'สตูดิโอ AI', ja: 'AIスタジオ' }, href: 'studio/index.html' },
        { label: s.name }
      ])}
      <p class="eyebrow">${T({ en: 'Deliverable', 'zh-Hant': '交付內容', 'zh-Hans': '交付内容', th: 'สิ่งที่ส่งมอบ', ja: '成果物' })}</p>
      <h1 class="display balance">${T(s.name)}</h1>
      <p class="lede">${T(s.deliverable)}</p>
    </div>
  </section>
  <section class="section section--tight">
    <div class="wrap">
      <div class="grid grid-2 gap-lg">
        <div>
          <h2 class="h3">${T({ en: 'What this is', 'zh-Hant': '這是什麼', 'zh-Hans': '这是什么', th: 'นี่คืออะไร', ja: 'これは何か' })}</h2>
          <p class="lede">${T(s.body)}</p>
        </div>
        <div class="card">
          <p class="spec-k">${T({ en: 'What you receive', 'zh-Hant': '你會收到什麼', 'zh-Hans': '你会收到什么', th: 'สิ่งที่คุณจะได้รับ', ja: '納品内容' })}</p>
          <ul class="tick">${s.includes.map(i => `<li>${T(i)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="notice notice--ai" style="margin-top:30px">
        <p class="spec-k">${T({ en: 'AI disclosure, applied to every output', 'zh-Hant': 'AI 披露，適用於每一份產出', 'zh-Hans': 'AI 披露，适用于每一份产出', th: 'การเปิดเผย AI ใช้กับทุกผลงาน', ja: 'すべての成果物に適用されるAI開示' })}</p>
        <ul class="disclose">
          <li>${T({ en: 'What was AI-assisted', 'zh-Hant': '哪部分由 AI 協助', 'zh-Hans': '哪部分由 AI 协助', th: 'ส่วนใดที่ AI ช่วย', ja: 'どこをAIが支援したか' })}</li>
          <li>${T({ en: 'Which tool was used', 'zh-Hant': '使用了哪個工具', 'zh-Hans': '使用了哪个工具', th: 'ใช้เครื่องมือใด', ja: 'どのツールを使ったか' })}</li>
          <li>${T({ en: 'What a human reviewed', 'zh-Hant': '人手審核了什麼', 'zh-Hans': '人手审核了什么', th: 'มนุษย์ตรวจอะไร', ja: '人が何を確認したか' })}</li>
          <li>${T({ en: 'What the viewer should not infer', 'zh-Hant': '觀看者不應推論什麼', 'zh-Hans': '观看者不应推论什么', th: 'ผู้ชมไม่ควรสรุปอะไร', ja: '視聴者が誤解してはいけないこと' })}</li>
        </ul>
      </div>
      <div class="cta-band">
        <div>
          <p class="eyebrow">${T({ en: 'Next step', 'zh-Hant': '下一步', 'zh-Hans': '下一步', th: 'ก้าวต่อไป', ja: '次の一歩' })}</p>
          <h2 class="h3">${T({ en: 'Tell us the objective, the market and the budget', 'zh-Hant': '告訴我們目標、市場與預算', 'zh-Hans': '告诉我们目标、市场与预算', th: 'บอกเป้าหมาย ตลาด และงบประมาณ', ja: '目的・市場・予算をお知らせください' })}</h2>
        </div>
        <a class="btn btn--primary" href="${root}partner/become-a-partner.html">${T({ en: 'Start a collaboration', 'zh-Hant': '開始合作', 'zh-Hans': '开始合作', th: 'เริ่มความร่วมมือ', ja: '協業を始める' })}</a>
      </div>
    </div>
  </section>
</main>`;
    return {
      file,
      html: shell({
        file, root, page: 'studio',
        title: en(s.name),
        desc: (en(s.deliverable) + ' ' + en(s.body)).slice(0, 158),
        jsonld: [{ '@type': 'Service', name: en(s.name), description: en(s.deliverable), provider: { '@id': CFG.url + '/#org' } }]
      }, fill(body, root))
    };
  });
}

/* Walk src/pages recursively: pages live in subdirectories (explore/, studio/,
 * supply-chain/, partner/, legal/) so the page URLs mirror the folder layout.
 * A top-level-only readdir silently dropped every nested page on the first
 * build — 22 pages became 6. */
function pageFiles(dir, out) {
  out = out || [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    if (e.name.startsWith('_')) return;              /* generator templates */
    const full = path.join(dir, e.name);
    if (e.isDirectory()) pageFiles(full, out);
    else if (e.name.endsWith('.html')) out.push(full);
  });
  return out;
}

function build() {
  const written = [];

  /* flat pages */
  pageFiles(PAGES_DIR).forEach(full => {
    const raw = fs.readFileSync(full, 'utf8');
    const m = raw.match(/<!--FM([\s\S]*?)-->/);
    if (!m) throw new Error('no FM front-matter in ' + path.relative(PAGES_DIR, full));
    const meta = JSON.parse(m[1]);
    const body = raw.slice(m[0].length);
    PAGE = meta.file || path.relative(PAGES_DIR, full).replace(/\\/g, '/');
    const root = meta.root || '';
    written.push({ file: meta.file || PAGE, html: shell(meta, fill(body, root)) });
  });

  /* generated pages */
  characterPages().forEach(p => written.push(p));
  groupPages().forEach(p => written.push(p));
  studioPages().forEach(p => written.push(p));

  /* sitemap / robots / llms.txt */
  const builtOn = new Date().toISOString().slice(0, 10);
  const pages = written.filter(w => w.file.endsWith('.html') && w.file !== '404.html');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(w => `  <url>
    <loc>${CFG.url}/${w.file === 'index.html' ? '' : w.file}</loc>
    <lastmod>${builtOn}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${w.file === 'index.html' ? '1.0' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>
`;
  written.push({ file: 'sitemap.xml', text: sitemap });

  const robots = `# CARACTER — ${CFG.domain}
User-agent: *
Allow: /
Disallow: /tools/
Disallow: /src/

# Answer engines / generative search crawlers are welcome.
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bytespider
Allow: /

Sitemap: ${CFG.url}/sitemap.xml
`;
  written.push({ file: 'robots.txt', text: robots });

  const llms = `# CARACTER

> A B2B platform where licensed character IP becomes content, campaigns and product.

${en(CFG.positioning)}

Site: ${CFG.url}
Brand: CARACTER (character licensing / IP × creative tech × brand collaboration)
Default language: English (${CFG.defaultLocale || 'en'}). Also: ${LOCALES.filter(l => l !== 'en').join(', ')} (in-page switch; same URLs).

## What CARACTER is

- B2B character-licensing platform: rights, AI content production, creator campaigns, and physical supply chain in one coordination layer.
- Not a consumer storefront and not an open licence catalogue. Visiting the site does not grant a licence.
- Primary public host today: ${CFG.domain}. Brand spelling remains CARACTER.

## Key facts

- Two commercial routes: digital (licence, AI content, creator campaigns, measured revenue) and physical (licence, supplier matching, samples, inspection, production, fulfilment).
- Six groups connected: ${D.groups.map(g => en(g.name)).join(', ')}.
- Demonstration collection on site: ${D.collections.map(c => en(c.name) + ' (' + en(c.status) + ')').join(', ')} — rights status: demonstration only, not an offer of a licence.
- Languages: ${LOCALES.join(', ')}. Built into the page; Google Translate is optional and loads only on request.
- Contact: ${CFG.contact.general}. WhatsApp / WeChat desks are published on the site for partnership enquiries.
- Play / games lobby (FURI MONSTER demos): ${CFG.url}/play.html
- Status: public marketing site live on ${CFG.domain}. Trade mark / brand-domain (caracter.com) ownership may still be separate from the live host.

## Machine-readable surfaces

- Sitemap: ${CFG.url}/sitemap.xml
- Robots: ${CFG.url}/robots.txt
- This file: ${CFG.url}/llms.txt
- JSON-LD Organization + WebSite on every HTML page
- In-page search index: ${CFG.url}/search-index.json (titles and headings only)

## Pages

${pages.map(w => `- [${w.file.replace('.html', '')}](${CFG.url}/${w.file === 'index.html' ? '' : w.file})`).join('\n')}

## Notes for citation (do not invent beyond these)

- Figures attributed to partners are partner-provided and not independently audited.
- AI-generated content carries a four-part disclosure: what was AI-assisted, which tool, what a human reviewed, and what should not be inferred.
- No licence is granted by visiting this site; a licence exists only when both parties sign.
- FURI MONSTER is an in-house demonstration. Trademark, copyright and commercial authorisation are not documented here, so it must not be described as available for licensing.
- Pricing is quoted per project; the site publishes no fee, rate or royalty figure.
- Analytics (when enabled) records aggregate events only; advertising storage is denied.
`;
  written.push({ file: 'llms.txt', text: llms });

  /* ---------- search index ---------------------------------------------- *
   * One entry per page, five locales, titles and headings only. Keeping it to
   * headings holds the file around 60-80 KB and keeps a match explainable:
   * every hit points at a heading the visitor can see. */
  const siStrip = (s) => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const siDec = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  const siPick = (block, loc) => {
    const m = block.match(new RegExp('data-l="' + loc + '">([\\s\\S]*?)</span>'));
    return m ? siDec(siStrip(m[1])).slice(0, 110) : '';
  };
  const searchPages = pages.map((w) => {
    const htmlSrc = w.html || w.text || '';
    const h1block = (htmlSrc.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1];
    const h2blocks = [...htmlSrc.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => m[1]);
    const titleRaw = (htmlSrc.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1];
    const bareTitle = siDec(titleRaw).replace(/\s+—\s+CARACTER\s*$/, '').trim().slice(0, 90);
    /* The word a visitor clicked to get here is the word they will search for,
       so each page also carries its own navigation label in all five locales. */
    const navKey = (f) => {
      const exact = {
        'about.html': 'nav.about', 'trust.html': 'nav.trust', 'contact.html': 'nav.contact',
        'how-it-works.html': 'nav.how', 'why-caracter.html': 'nav.why', 'play.html': 'nav.play'
      };
      if (exact[f]) return exact[f];
      if (f.indexOf('explore/') === 0) return 'nav.explore';
      if (f.indexOf('studio/') === 0) return 'nav.studio';
      if (f.indexOf('solutions/') === 0) return 'nav.solutions';
      if (f.indexOf('supply-chain/') === 0) return 'nav.supply';
      if (f.indexOf('partner/') === 0) return 'nav.partner';
      if (f.indexOf('cases/') === 0) return 'nav.cases';
      return null;
    };
    const key = navKey(w.file);
    const n = {};
    LOCALES.forEach((loc) => {
      const label = key ? I.t(key, loc) : '';
      n[loc] = {
        t: bareTitle,
        h: siPick(h1block, loc).slice(0, 90),
        k: [label].concat(h2blocks.map((b) => siPick(b, loc))).filter(Boolean).slice(0, 5)
      };
    });
    return { u: w.file, n };
  });
  written.push({
    file: 'search-index.json',
    text: JSON.stringify({ locales: LOCALES, built: builtOn, pages: searchPages })
  });

  /* write */
  let total = 0;
  written.forEach(w => {
    const dest = path.join(SITE, w.file);
    const content = w.text !== undefined ? w.text : w.html;
    total += content.length;
    if (CHECK) return;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, content, 'utf8');
  });

  return { written, total };
}

try {
  const res = build();
  const n = res.written.filter(w => w.file.endsWith('.html')).length;
  console.log(`${CHECK ? '[check]' : 'built'} ${res.written.length} files (${n} html pages), ${(res.total / 1024).toFixed(0)} KB`);

  const missing = [...MISSING].sort();
  const out = path.join(__dirname, 'mt-page-text.missing.json');
  const byPage = {};
  [...MISSING_BY_PAGE.keys()].sort().forEach(p => { byPage[p] = [...MISSING_BY_PAGE.get(p)].sort(); });
  fs.writeFileSync(out, JSON.stringify({
    _note: 'Outstanding Thai/Japanese strings, grouped by the page that first needs them. Fill th and ja, then merge the "runs" object into tools/mt-page-text.json.',
    _counts: { distinct: missing.length, pages: Object.keys(byPage).length },
    byPage,
    runs: missing.reduce((a, s) => { a[s] = { th: '', ja: '' }; return a; }, {})
  }, null, 2) + '\n', 'utf8');

  if (missing.length) {
    console.log(`  ${Object.keys(MT).length} Thai/Japanese string(s) in the table; ` +
      `${missing.length} distinct string(s) still fall back to English`);
  } else {
    console.log(`  all ${Object.keys(MT).length} Thai/Japanese string(s) resolved`);
  }
  if (process.env.CA_LIST) {
    res.written.filter(w => w.file.endsWith('.html')).forEach(w => console.log('  ' + w.file));
  }
} catch (e) {
  console.error('BUILD FAILED:', e.message);
  process.exit(1);
}
