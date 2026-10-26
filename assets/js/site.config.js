/* =========================================================================
 * assets/js/site.config.js — CARACTER.com configuration.
 *
 * Everything a business decision touches lives here, so the build never needs
 * editing to change an address, a domain or a flag. Mirrors the pattern proven
 * on the FURI MONSTER build in this workspace.
 * ========================================================================= */
(function (root) {
  'use strict';

  var CFG = {
    brand: 'CARACTER',
    domain: 'caracter.com',
    url: 'https://caracter.com',                      /* no trailing slash */

    /* Status of the domain: UNCONFIRMED. caracter.com did not respond during
     * checking and ownership and the trade mark position are unresolved. The
     * site is built and reviewed locally until that is settled — see the
     * specification, section 3.2. Nothing in the build depends on this value. */
    domainStatus: 'unconfirmed',

    tagline: {
      en: 'Where characters become business.',
      'zh-Hant': '讓角色成為生意。',
      'zh-Hans': '让角色成为生意。',
      th: 'ที่ที่ตัวละครกลายเป็นธุรกิจ',
      ja: 'キャラクターが、ビジネスになる場所。'
    },
    subline: {
      en: 'Create stories. Connect creators. License IP. Grow commerce.',
      'zh-Hant': '創作故事。連結創作者。授權 IP。帶動生意。',
      'zh-Hans': '创作故事。连接创作者。授权 IP。带动生意。',
      th: 'สร้างเรื่องราว เชื่อมนักสร้างสรรค์ ให้สิทธิ์ IP และเติบโตทางการค้า',
      ja: '物語をつくる。作り手をつなぐ。IPを許諾する。商いを育てる。'
    },
    positioning: {
      en: 'A B2B platform that turns licensed characters into content, campaigns and product — with the rights, the production and the supply chain coordinated in one place.',
      'zh-Hant': '一個 B2B 平台，把授權角色變成內容、活動與商品 —— 權利、製作與供應鏈在同一個地方協調。',
      'zh-Hans': '一个 B2B 平台，把授权角色变成内容、活动与商品 —— 权利、制作与供应链在同一个地方协调。',
      th: 'แพลตฟอร์ม B2B ที่เปลี่ยนตัวละครที่ได้สิทธิ์ให้เป็นคอนเทนต์ แคมเปญ และสินค้า โดยดูแลสิทธิ์ การผลิต และซัพพลายเชนไว้ในที่เดียว',
      ja: '許諾されたキャラクターを、コンテンツ・キャンペーン・商品に変えるB2Bプラットフォーム。権利、制作、サプライチェーンを一か所で束ねます。'
    },

    locales: ['en', 'zh-Hant', 'zh-Hans', 'th', 'ja'],
    defaultLocale: 'en',

    /* Contact routing. Each address owns one desk; the forms route by kind so
     * an enquiry never lands in the wrong inbox. */
    contact: {
      general: 'hello@caracter.com',
      licensing: 'licensing@caracter.com',
      partners: 'partners@caracter.com',
      suppliers: 'suppliers@caracter.com',
      press: 'press@caracter.com',
      /* Chat channels — same desk as commercialisation.ai / 港樓金融財商. */
      whatsapp: '85297398018',
      whatsappDisplay: '9739 8018',
      wechatId: 'RWAtokenization',
      wechatName: {
        en: 'Ganglou Finance',
        'zh-Hant': '港樓金融財商',
        'zh-Hans': '港楼金融财商',
        th: 'Ganglou Finance',
        ja: '港樓金融財商'
      },
      wechatQr: 'assets/img/wechat/qr-ganglou.png',
      whatsappPrefill: {
        en: 'Hi, I would like to enquire about CARACTER (caracter.com / catracter.com).',
        'zh-Hant': '你好，想查詢 CARACTER（caracter.com／catracter.com）。',
        'zh-Hans': '你好，想查询 CARACTER（caracter.com／catracter.com）。',
        th: 'สวัสดี ต้องการสอบถามเกี่ยวกับ CARACTER (caracter.com / catracter.com)',
        ja: 'こんにちは。CARACTER（caracter.com / catracter.com）について問い合わせたいです。'
      }
    },

    forms: {
      /* Empty until a form service is configured. The fallback builds a
       * pre-filled mailto so the visitor's typing is not thrown away — the
       * pattern built and tested on the FURI MONSTER site. */
      endpoint: '',
      routeByKind: {
        partnership: 'partners',
        ip: 'licensing',
        creator: 'partners',
        supplier: 'suppliers',
        rfq: 'suppliers',
        brief: 'partners',
        press: 'press'
      },
      fallbackNote: {
        en: 'This form is not connected to our inbox yet. Send it as an email instead and we will reply:',
        'zh-Hant': '此表單尚未接上收件匣。請改用電郵送出，我們會回覆你：',
        'zh-Hans': '此表单尚未接上收件箱。请改用邮件送出，我们会回复你：',
        th: 'แบบฟอร์มนี้ยังไม่ได้เชื่อมต่อกับกล่องจดหมายของเรา กรุณาส่งเป็นอีเมลแทน แล้วเราจะตอบกลับ:',
        ja: 'このフォームはまだ受信箱に接続されていません。代わりにメールでお送りください。返信します：'
      }
    },

    analytics: {
      /* Nothing third-party loads before consent. Empty until configured. */
      ga4: ''
    },

    /* Market-context links used on the positioning pages. All attributed. */
    market: {
      updated: '2026-10'
    }
  };

  root.FM = root.FM || {};
  root.FM.config = CFG;
  if (typeof module !== 'undefined' && module.exports) module.exports = CFG;
})(typeof globalThis !== 'undefined' ? globalThis : this);
