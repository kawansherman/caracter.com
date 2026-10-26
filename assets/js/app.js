/* =========================================================================
 * assets/js/app.js — locale switching, reveal-on-scroll, and the forms.
 *
 * The chrome is rebuilt on a language switch, because the header and footer are
 * generated from i18n strings at runtime rather than baked into each page.
 * ========================================================================= */
(function (root) {
  'use strict';

  var FM = root.FM = root.FM || {};
  var doc = root.document;
  var I = FM.i18n;

  function t(k) { return I ? I.t(k) : k; }
  function pick(f) { return I ? I.pick(f) : (f && f.en) || ''; }
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function track(n, p) { if (FM.analytics) FM.analytics.track(n, p); }

  /* ---------- locale ---------- */
  function applyLocale(loc) {
    I.setLocale(loc);
    doc.documentElement.setAttribute('data-locale', loc);
    doc.documentElement.setAttribute('lang', loc);
    $$('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-locale') === loc));
    });
    /* the header and footer are runtime-generated from these strings */
    if (FM.chrome && FM.chrome.mount) FM.chrome.mount();
  }

  function wireLocale() {
    doc.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.lang button');
      if (!b) return;
      var loc = b.getAttribute('data-locale');
      if (loc === I.getLocale()) return;
      applyLocale(loc);
      track('language_switch', { label: loc });
    });
  }

  /* ---------- reveal ---------- */
  function reduced() {
    try { return root.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }
  function wireReveal() {
    var els = $$('.reveal');
    if (!els.length) return;
    if (reduced() || !('IntersectionObserver' in root)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- forms ---------- */
  var MAILTO_MAX_URL = 1900;

  function fieldLabel(form, el) {
    if (!el.id) return el.name;
    var l = form.querySelector('label[for="' + el.id + '"]');
    return l ? l.textContent.trim() : el.name;
  }

  /* A mailto that carries what the visitor typed. The cap is on the ENCODED
   * length, not the raw text: a 1600-character body full of newlines encodes to
   * well over 2000 and no mail client will open it. */
  function buildMailto(form, addr, kind, status) {
    var parts = [];
    $$('input, textarea, select', form).forEach(function (el) {
      if (!el.name || el.type === 'hidden' || el.type === 'submit') return;
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
      var v = (el.value || '').trim();
      if (!v) return;
      parts.push(fieldLabel(form, el) + ': ' + v);
    });
    var body = parts.join('\n');
    var head = 'mailto:' + addr + '?subject=' +
      encodeURIComponent('CARACTER — ' + kind + ' enquiry');
    var url = head + (body ? '&body=' + encodeURIComponent(body) : '');
    var cut = false, guard = 0;
    while (url.length > MAILTO_MAX_URL && body.length > 0 && guard++ < 20) {
      cut = true;
      var over = url.length - MAILTO_MAX_URL;
      body = body.slice(0, Math.max(0, body.length - over - 24));
      url = head + (body ? '&body=' + encodeURIComponent(body) : '');
    }
    if (cut && status) status.appendChild(doc.createTextNode(' ' + t('form.mailtoTruncated')));
    return url;
  }

  function wireForms() {
    var forms = $$('form.form');
    if (!forms.length) return;
    forms.forEach(function (form) {
      var status = $('[data-status]', form);
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        /* required fields only; the browser's own bubbles are unreliable here */
        var bad = null;
        $$('[required]', form).forEach(function (el) {
          if (bad) return;
          var ok = el.type === 'checkbox' ? el.checked : (el.value || '').trim() !== '';
          if (!ok) bad = el;
        });
        if (bad) {
          bad.classList.add('is-bad');
          bad.focus();
          if (status) { status.className = 'form-status is-err'; status.textContent = t('form.error'); }
          return;
        }
        $$('.is-bad', form).forEach(function (el) { el.classList.remove('is-bad'); });

        var kind = form.getAttribute('data-form') || 'partnership';
        var endpoint = FM.config.forms.endpoint;

        if (!endpoint) {
          /* No endpoint. Do not look like it worked: say so plainly, and hand
           * the visitor a mailto that already contains what they typed. */
          if (status) {
            status.className = 'form-status is-err';
            status.textContent = '';
            status.appendChild(doc.createTextNode(pick(FM.config.forms.fallbackNote) + ' '));
            var route = (FM.config.forms.routeByKind || {})[kind] || 'general';
            var addr = FM.config.contact[route] || FM.config.contact.general || '';
            if (addr) {
              var a = doc.createElement('a');
              a.href = buildMailto(form, addr, kind, status);
              a.textContent = addr;
              a.title = t('form.mailtoCta');
              status.appendChild(a);
              status.appendChild(doc.createTextNode(' · ' + t('form.mailtoCta')));
            }
          }
          track('form_submit', { label: kind + '_no_endpoint' });
          return;
        }

        var data = new root.FormData(form);
        root.fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (status) {
              status.className = 'form-status ' + (r.ok ? 'is-ok' : 'is-err');
              status.textContent = t(r.ok ? 'form.success' : 'form.error');
            }
            if (r.ok) form.reset();
            track('form_submit', { label: kind });
          })
          .catch(function () {
            if (status) { status.className = 'form-status is-err'; status.textContent = t('form.error'); }
          });
      });
    });
  }

  function boot() {
    wireLocale();
    applyLocale(I.detect());
    wireReveal();
    wireForms();
  }

  FM.app = { boot: boot, applyLocale: applyLocale };

  if (doc) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
    else boot();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
