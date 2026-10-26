/* =========================================================================
 * tools/check.js — CARACTER build verification (zero dependencies).
 *
 *   node tools/check.js
 *
 * Checks what can be verified without a browser: every link and asset resolves,
 * no placeholder survived, every page carries its metadata, the five locales
 * have identical key sets, the English layer holds no CJK, and the Thai/
 * Japanese translation debt is reported rather than hidden.
 * ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..');
const JS = path.join(SITE, 'assets', 'js');

require(path.join(JS, 'site.config.js'));
require(path.join(JS, 'data.js'));
require(path.join(JS, 'i18n.js'));
const FM = globalThis.FM;

const problems = [];
const notes = [];

function pages(dir, out) {
  out = out || [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    if (e.name.startsWith('_') || e.name === 'node_modules') return;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) pages(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  });
  return out;
}

const files = pages(SITE).filter(f => !/[\\/](src|tools|_extract)[\\/]/.test(f));
const allFiles = new Set();
(function walk(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    if (e.name === 'node_modules' || e.name.startsWith('.')) return;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else allFiles.add(path.relative(SITE, p).replace(/\\/g, '/'));
  });
})(SITE);

const URL_RE = /(?:href|src)="([^"]+)"/g;
const CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;

let linkCount = 0;
files.forEach(f => {
  const rel = path.relative(SITE, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');

  /* no unresolved fragment or translation placeholder */
  const leftover = html.match(/\{\{[^}]*\}\}/);
  if (leftover) problems.push(rel + ': unresolved placeholder ' + leftover[0].slice(0, 40));

  /* metadata */
  if (!/<title>[^<]{10,}<\/title>/.test(html)) problems.push(rel + ': no usable <title>');
  const desc = html.match(/<meta name="description" content="([^"]*)"/);
  if (!desc || desc[1].length < 40) problems.push(rel + ': meta description missing or too short');
  if (!/<link rel="canonical" href="https:\/\/caracter\.com\//.test(html)) problems.push(rel + ': canonical missing or not absolute');
  if (!/property="og:image" content="https:\/\/caracter\.com\//.test(html)) problems.push(rel + ': og:image missing');
  if (!/application\/ld\+json/.test(html)) problems.push(rel + ': no JSON-LD');
  if (!/data-root="/.test(html)) problems.push(rel + ': <html> has no data-root prefix');

  /* five-language runs: every .t span must be one of the five locales */
  const spans = [...html.matchAll(/class="t" data-l="([A-Za-z-]+)"/g)].map(m => m[1]);
  const bad = spans.filter(l => FM.config.locales.indexOf(l) === -1);
  if (bad.length) problems.push(rel + ': ' + bad.length + ' language span(s) with an unknown locale');

  /* the English layer must not hold CJK */
  const enSpans = [...html.matchAll(/class="t" data-l="en">([\s\S]*?)<\/span>/g)].map(m => m[1]);
  const cjk = enSpans.filter(s => CJK.test(s));
  if (cjk.length) problems.push(rel + ': English layer holds CJK in ' + cjk.length + ' string(s), e.g. "' + cjk[0].slice(0, 30) + '"');

  /* every internal link and asset must resolve */
  const dir = path.dirname(f);
  [...html.matchAll(URL_RE)].forEach(m => {
    let u = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(u)) return;
    u = u.split('#')[0].split('?')[0];
    if (!u) return;
    linkCount++;
    const target = path.resolve(dir, u);
    const relTarget = path.relative(SITE, target).replace(/\\/g, '/');
    if (!fs.existsSync(target)) problems.push(rel + ': dead link → ' + m[1]);
    else if (relTarget.startsWith('..')) problems.push(rel + ': link escapes the site root → ' + m[1]);
  });
});

/* the five locales must have identical key sets */
(() => {
  const d = FM.i18n.dict;
  const base = Object.keys(d.en).sort();
  Object.keys(d).forEach(loc => {
    const keys = Object.keys(d[loc]).sort();
    if (keys.join('|') !== base.join('|')) {
      const missing = base.filter(k => keys.indexOf(k) === -1);
      const extra = keys.filter(k => base.indexOf(k) === -1);
      problems.push('i18n[' + loc + ']: ' + (missing.length ? 'missing ' + missing.slice(0, 4).join(', ') : '') +
        (extra.length ? ' extra ' + extra.slice(0, 4).join(', ') : ''));
    }
  });
  notes.push('i18n keys: ' + base.length + ' × ' + Object.keys(d).length + ' locales');
})();

/* configuration state, reported on every run */
if (FM.config.forms.endpoint) notes.push('forms.endpoint is set — forms deliver');
else notes.push('forms.endpoint is EMPTY — forms validate and then offer a pre-filled email instead');
if (FM.config.analytics.ga4) notes.push('GA4 id is set');
else notes.push('GA4 id is EMPTY — no analytics collected');
if (FM.config.domainStatus !== 'confirmed') {
  notes.push('DOMAIN STATUS: ' + FM.config.domainStatus + ' — ' + FM.config.domain +
    ' is published as a concept build until ownership and the trade mark position are confirmed');
}

/* Thai/Japanese translation debt */
(() => {
  const miss = path.join(__dirname, 'mt-page-text.missing.json');
  let n = 0, p = 0;
  try {
    const j = JSON.parse(fs.readFileSync(miss, 'utf8'));
    n = j._counts.distinct; p = j._counts.pages;
  } catch (e) { notes.push('no outstanding Thai/Japanese list — run `node tools/build.js` first'); }
  if (n > 0) notes.push('Thai/Japanese: ' + n + ' string(s) across ' + p + ' page(s) still fall back to English ' +
    '(see tools/mt-page-text.missing.json)');
})();

console.log(`\nCARACTER build check — ${files.length} pages, ${linkCount} internal links\n${'─'.repeat(62)}`);
if (notes.length) { console.log('\nNotes:'); notes.forEach(n => console.log('  · ' + n)); }
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  problems.slice(0, 40).forEach(p => console.log('  ✗ ' + p));
  if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
  process.exit(1);
}
console.log('\n✓ all checks passed');
