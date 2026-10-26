/* =========================================================================
 * assets/js/chrome.js — header, navigation, language switcher and footer,
 * built at runtime so a wording or link fix applies without a rebuild.
 * ========================================================================= */
(function (root) {
  'use strict';

  var FM = root.FM = root.FM || {};
  var doc = root.document;

  function t(k) { return FM.i18n ? FM.i18n.t(k) : k; }
  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function prefix() {
    var attr = doc && doc.documentElement ? doc.documentElement.getAttribute('data-root') : '';
    return attr || '';
  }

  /* Primary navigation. Every href here must exist — tools/check.js verifies it. */
  var NAV = [
    { page: 'explore', href: 'explore/index.html', key: 'nav.explore' },
    { page: 'studio', href: 'studio/index.html', key: 'nav.studio' },
    { page: 'solutions', href: 'solutions/index.html', key: 'nav.solutions' },
    { page: 'supply', href: 'supply-chain/index.html', key: 'nav.supply' },
    { page: 'how', href: 'how-it-works.html', key: 'nav.how' },
    { page: 'cases', href: 'cases/index.html', key: 'nav.cases' },
    { page: 'play', href: 'play.html', key: 'nav.play' }
  ];
  var UTIL = [
    { page: 'why', href: 'why-caracter.html', key: 'nav.why' },
    { page: 'about', href: 'about.html', key: 'nav.about' },
    { page: 'trust', href: 'trust.html', key: 'nav.trust' },
    { page: 'partner', href: 'partner/index.html', key: 'nav.partner' },
    { page: 'contact', href: 'contact.html', key: 'nav.contact' }
  ];

  function brandMark() {
    return '<svg class="mark" viewBox="0 0 44 44" role="img" aria-label="CARACTER">' +
      '<defs><linearGradient id="cagrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#1AA8B8"/><stop offset=".58" stop-color="#3D6AE8"/>' +
      '<stop offset="1" stop-color="#6B5CE6"/></linearGradient></defs>' +
      '<rect x="1.5" y="1.5" width="41" height="41" rx="9" fill="none" stroke="url(#cagrad)" stroke-width="2"/>' +
      '<path d="M28.5 15.2a8.2 8.2 0 1 0 0 13.6" fill="none" stroke="url(#cagrad)" stroke-width="3.2" stroke-linecap="round"/>' +
      '<circle cx="30.5" cy="22" r="2.6" fill="url(#cagrad)"/>' +
      '</svg>';
  }

  function langSwitch(pfx) {
    var cur = FM.i18n ? FM.i18n.getLocale() : 'en';
    var ls = FM.i18n ? FM.i18n.locales : [{ id: 'en', label: 'EN' }];
    return '<div class="lang" role="group" aria-label="' + esc(t('a11y.lang')) + '">' +
      ls.map(l => '<button type="button" data-locale="' + l.id + '"' +
        (l.id === cur ? ' aria-pressed="true"' : ' aria-pressed="false"') +
        ' title="' + esc(l.name) + '">' + esc(l.label) + '</button>').join('') +
      '</div>';
  }

  function headerHtml() {
    var p = prefix();
    var page = doc.body.getAttribute('data-page') || '';
    return '<div class="wrap header-in">' +
      '<a class="brand" href="' + p + 'index.html">' + brandMark() +
        '<span class="brand-t">CARACTER</span></a>' +
      '<nav class="nav" aria-label="Primary"><ul>' +
        NAV.map(n => '<li><a href="' + p + n.href + '"' +
          (n.page === page ? ' aria-current="page"' : '') + '>' + esc(t(n.key)) + '</a></li>').join('') +
      '</ul></nav>' +
      '<div class="tools">' +
        langSwitch(p).replace('class="lang"', 'class="lang lang--header"') +
        '<a class="btn btn--sm btn--primary hide-sm" href="' + p + 'partner/become-a-partner.html">' +
          esc(t('cta.startCollaboration')) + '</a>' +
        '<button class="btn btn--sm menu-btn" type="button" aria-expanded="false" aria-controls="ca-menu">' +
          esc(t('nav.menu')) + '</button>' +
      '</div>' +
    '</div>';
  }

  function menuHtml() {
    var p = prefix();
    return '<div class="drawer" role="dialog" aria-modal="true" aria-label="' + esc(t('nav.menu')) + '">' +
      '<div class="drawer-panel">' +
        '<div class="drawer-top">' +
          '<span class="drawer-t">' + esc(t('nav.menu')) + '</span>' +
          '<button class="btn btn--sm drawer-close" type="button">' + esc(t('nav.close')) + '</button>' +
        '</div>' +
        '<div class="drawer-lang">' +
          langSwitch(p).replace('class="lang"', 'class="lang lang--drawer"') +
        '</div>' +
        '<nav class="drawer-nav"><ul>' +
          NAV.concat(UTIL).map(n => '<li><a href="' + p + n.href + '">' + esc(t(n.key)) + '</a></li>').join('') +
        '</ul></nav>' +
        '<a class="btn btn--primary drawer-cta" href="' + p + 'partner/become-a-partner.html">' +
          esc(t('cta.startCollaboration')) + '</a>' +
      '</div>' +
    '</div>';
  }

  function footerHtml() {
    var p = prefix();
    function col(titleKey, items) {
      return '<div class="fcol"><h3>' + esc(t(titleKey)) + '</h3><ul>' +
        items.map(i => '<li><a href="' + p + i.href + '">' + esc(t(i.key)) + '</a></li>').join('') +
        '</ul></div>';
    }
    /* The group column must name the six groups, not repeat the nav label six
     * times — the first version pointed every entry at key 'nav.solutions' and
     * the footer read "Solutions / Solutions / Solutions…" on every page. */
    const groups = (FM.data && FM.data.groups) || [];
    function groupsCol() {
      return '<div class="fcol"><h3>' + esc(t('footer.groups')) + '</h3><ul>' +
        groups.map(g => '<li><a href="' + p + 'solutions/' + esc(g.slug) + '.html">' +
          esc(FM.i18n ? FM.i18n.pick(g.name) : g.slug) + '</a></li>').join('') +
        '</ul></div>';
    }

    return '<div class="wrap">' +
      '<div class="footer-grid">' +
        '<div class="fbrand">' + brandMark() +
          '<p class="fbrand-t">CARACTER</p>' +
          '<p class="fbrand-s">' + esc(FM.i18n ? FM.i18n.pick(FM.config.tagline) : '') + '</p>' +
          '<p class="fbrand-c"><a href="mailto:' + esc(FM.config.contact.general) + '">' +
            esc(FM.config.contact.general) + '</a></p>' +
        '</div>' +
        col('footer.platform', NAV) +
        groupsCol() +
        col('footer.company', UTIL) +
        col('footer.legal', [
          { href: 'legal/privacy.html', key: 'legal.privacy' },
          { href: 'legal/terms.html', key: 'legal.terms' },
          { href: 'legal/ai-notice.html', key: 'legal.ai' },
          { href: 'legal/licensing-policy.html', key: 'legal.licensing' }
        ]) +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© ' + new Date().getFullYear() + ' CARACTER. ' + esc(t('footer.rights')) + '</span>' +
        '<span class="mono tiny">' + langSwitch(p).replace('class="lang"', 'class="lang lang--footer"') + '</span>' +
      '</div>' +
      '<p class="tiny muted fnote">' + esc(t('footer.domainNote')) + '</p>' +
      '<p class="tiny muted fnote">' + esc(t('footer.mtNotice')) + '</p>' +
    '</div>';
  }

  function mount() {
    var h = doc.getElementById('ca-header');
    var m = doc.getElementById('ca-menu');
    var f = doc.getElementById('ca-footer');
    if (h) { h.className = 'site-header'; h.innerHTML = headerHtml(); }
    if (m) { m.className = 'drawer-host'; m.innerHTML = menuHtml(); }
    if (f) { f.className = 'site-footer'; f.innerHTML = footerHtml(); }

    /* menu open / close */
    var btn = doc.querySelector('.menu-btn');
    var drawer = doc.querySelector('.drawer');
    var close = doc.querySelector('.drawer-close');
    function open(on) {
      if (!drawer || !btn) return;
      drawer.classList.toggle('is-open', on);
      btn.setAttribute('aria-expanded', String(on));
      doc.documentElement.classList.toggle('is-locked', on);
      if (on && close) close.focus();
    }
    if (btn) btn.addEventListener('click', function () { open(!drawer.classList.contains('is-open')); });
    if (close) close.addEventListener('click', function () { open(false); });
    if (drawer) drawer.addEventListener('click', function (e) {
      if (e.target === drawer) open(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') open(false);
    });
  }

  FM.chrome = { mount: mount, prefix: prefix, esc: esc, NAV: NAV, UTIL: UTIL };

  if (doc) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
    else mount();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
