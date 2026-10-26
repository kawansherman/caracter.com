/* =========================================================================
 * assets/js/analytics.js — GA4 loader (gated on FM.config.analytics.ga4).
 *
 * Nothing third-party loads when the measurement id is empty. When set, gtag
 * runs with advertising storage denied so the privacy notice stays accurate:
 * aggregate measurement only, no ads profile.
 * ========================================================================= */
(function (root) {
  'use strict';

  var FM = root.FM = root.FM || {};
  var doc = root.document;

  function id() {
    var a = FM.config && FM.config.analytics;
    var raw = (a && (a.ga4 || a.gaMeasurementId || a.measurementId)) || '';
    raw = String(raw).trim();
    if (!/^G-[A-Z0-9]+$/i.test(raw)) return '';
    return raw.toUpperCase();
  }

  function track(name, params) {
    if (!root.gtag || !id()) return;
    try {
      root.gtag('event', name, params || {});
    } catch (e) { /* never break the page for analytics */ }
  }

  function boot() {
    var mid = id();
    if (!mid || !doc) return;

    root.dataLayer = root.dataLayer || [];
    root.gtag = root.gtag || function () { root.dataLayer.push(arguments); };
    root.gtag('js', new Date());
    root.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    root.gtag('config', mid, {
      anonymize_ip: true,
      send_page_view: true
    });

    var s = doc.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(mid);
    (doc.head || doc.documentElement).appendChild(s);
  }

  FM.analytics = { track: track, boot: boot, id: id };

  if (doc) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
    else boot();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
