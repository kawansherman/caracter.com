/* =========================================================================
 * assets/js/site-tools.js — search, the scripted assistant, and on-demand
 * Google Translate. Zero dependencies, no build step, no API keys.
 *
 * Design rules that come from the rest of this site:
 *  - Nothing third-party loads until the visitor asks for it. Google Translate
 *    is fetched only when the language control is used, and the UI says what
 *    that sends and to whom.
 *  - The assistant is labelled as scripted. It answers from text shipped with
 *    this site; it is not a live model and never invents a number.
 *  - Search reads a static index generated at build time. It therefore needs a
 *    server (or a host that serves .json); over file:// the browser blocks the
 *    fetch and the panel says so instead of failing silently.
 * ========================================================================= */
(function () {
  'use strict';

  var html = document.documentElement;
  var LOC = html.getAttribute('data-locale') || 'en';
  var ROOT = html.getAttribute('data-root') || '';

  /* ---------- labels ---------------------------------------------------- */
  var L = {
    search: { en: 'Search', 'zh-Hant': '搜尋', 'zh-Hans': '搜索', th: 'ค้นหา', ja: '検索' },
    searchTitle: { en: 'Search this site', 'zh-Hant': '搜尋本站', 'zh-Hans': '搜索本站', th: 'ค้นหาในเว็บไซต์', ja: 'サイト内検索' },
    searchPlaceholder: { en: 'Characters, licensing, supply chain…', 'zh-Hant': '角色、授權、供應鏈…', 'zh-Hans': '角色、授权、供应链…', th: 'ตัวละคร ลิขสิทธิ์ ซัพพลายเชน…', ja: 'キャラクター、ライセンス、サプライチェーン…' },
    noResults: { en: 'Nothing matched. Try "licensing", "RFQ" or "FURI".', 'zh-Hant': '沒有符合的結果。可試「授權」、「RFQ」或「FURI」。', 'zh-Hans': '没有符合的结果。可试“授权”、“RFQ”或“FURI”。', th: 'ไม่พบผลลัพธ์ ลองพิมพ์ "ลิขสิทธิ์" "RFQ" หรือ "FURI"', ja: '該当なし。「ライセンス」「RFQ」「FURI」をお試しください。' },
    offline: { en: 'Search needs the site served over http(s); file:// blocks the index.', 'zh-Hant': '搜尋需要以 http(s) 提供網站；file:// 會封鎖索引。', 'zh-Hans': '搜索需要以 http(s) 提供网站；file:// 会封锁索引。', th: 'การค้นหาต้องเปิดเว็บผ่าน http(s) เพราะ file:// บล็อกดัชนี', ja: '検索はhttp(s)配信が必要です（file://ではインデックスを読めません）。' },
    close: { en: 'Close', 'zh-Hant': '關閉', 'zh-Hans': '关闭', th: 'ปิด', ja: '閉じる' },

    chatOpen: { en: 'Ask CARACTER', 'zh-Hant': '問 CARACTER', 'zh-Hans': '问 CARACTER', th: 'ถาม CARACTER', ja: 'CARACTERに質問' },
    chatTitle: { en: 'Ask CARACTER', 'zh-Hant': '問 CARACTER', 'zh-Hans': '问 CARACTER', th: 'ถาม CARACTER', ja: 'CARACTERに質問' },
    chatNote: {
      en: 'Scripted assistant. Answers come from text on this site — not a live AI model, and it will not invent figures.',
      'zh-Hant': '腳本式助理。答案來自本站文字 —— 不是即時 AI 模型，也不會編造數字。',
      'zh-Hans': '脚本式助理。答案来自本站文字 —— 不是实时 AI 模型，也不会编造数字。',
      th: 'ผู้ช่วยแบบสคริปต์ คำตอบมาจากข้อความในเว็บไซต์นี้ ไม่ใช่โมเดล AI สด และจะไม่สร้างตัวเลขขึ้นเอง',
      ja: 'スクリプト式のアシスタントです。回答は本サイトの記述から生成され、稼働中のAIモデルではなく、数値を捏造しません。'
    },
    chatPlaceholder: { en: 'Type a question…', 'zh-Hant': '輸入問題…', 'zh-Hans': '输入问题…', th: 'พิมพ์คำถาม…', ja: '質問を入力…' },
    chatSend: { en: 'Send', 'zh-Hant': '送出', 'zh-Hans': '发送', th: 'ส่ง', ja: '送信' },
    chatFallback: {
      en: 'I do not have a scripted answer for that. These pages look closest:',
      'zh-Hant': '這個問題我沒有腳本答案。以下頁面最接近：',
      'zh-Hans': '这个问题我没有脚本答案。以下页面最接近：',
      th: 'ฉันไม่มีคำตอบสำเร็จรูปสำหรับคำถามนี้ หน้าเหล่านี้ใกล้เคียงที่สุด:',
      ja: 'その質問への定型回答はありません。近いページはこちらです：'
    },

    translate: { en: 'Other languages', 'zh-Hant': '其他語言', 'zh-Hans': '其他语言', th: 'ภาษาอื่น', ja: 'その他の言語' },
    translateNote: {
      en: 'Loads Google Translate, which sends this page text to Google. The five languages above are built in and need no third party.',
      'zh-Hant': '會載入 Google Translate，並把本頁文字傳送給 Google。上方五種語言是內建，不需第三方。',
      'zh-Hans': '会加载 Google Translate，并把本页文字发送给 Google。上方五种语言是内置，无需第三方。',
      th: 'จะโหลด Google Translate และส่งข้อความหน้านี้ไปยัง Google ภาษาทั้งห้าด้านบนมีในเว็บแล้ว ไม่ต้องใช้บุคคลที่สาม',
      ja: 'Google Translateを読み込み、このページの本文をGoogleへ送信します。上部の5言語は内蔵で、第三者を必要としません。'
    },

    waLabel: { en: 'WhatsApp', 'zh-Hant': 'WhatsApp', 'zh-Hans': 'WhatsApp', th: 'WhatsApp', ja: 'WhatsApp' },
    waEnquire: { en: 'Chat on WhatsApp', 'zh-Hant': 'WhatsApp 查詢', 'zh-Hans': 'WhatsApp 查询', th: 'คุยทาง WhatsApp', ja: 'WhatsAppで問い合わせ' },
    wxLabel: { en: 'WeChat', 'zh-Hant': '微信查詢', 'zh-Hans': '微信查询', th: 'WeChat', ja: 'WeChat' },
    wxModalTitle: { en: 'Add on WeChat', 'zh-Hant': '掃碼加微信', 'zh-Hans': '扫码加微信', th: 'เพิ่มใน WeChat', ja: 'WeChatで追加' },
    wxIdLabel: { en: 'WeChat ID', 'zh-Hant': '微信號', 'zh-Hans': '微信号', th: 'WeChat ID', ja: 'WeChat ID' },
    wxCopy: { en: 'Copy WeChat ID', 'zh-Hant': '複製微信號', 'zh-Hans': '复制微信号', th: 'คัดลอก WeChat ID', ja: 'WeChat IDをコピー' },
    wxCopied: { en: 'Copied', 'zh-Hant': '已複製', 'zh-Hans': '已复制', th: 'คัดลอกแล้ว', ja: 'コピーしました' },
    wxHint: {
      en: 'Scan the QR code with WeChat, or copy the ID and search to add.',
      'zh-Hant': '用微信掃二維碼，或複製微信號搜尋添加。',
      'zh-Hans': '用微信扫二维码，或复制微信号搜索添加。',
      th: 'สแกน QR ด้วย WeChat หรือคัดลอก ID แล้วค้นหาเพื่อเพิ่ม',
      ja: 'WeChatでQRをスキャンするか、IDをコピーして検索し追加してください。'
    }
  };
  function t(k) { var r = L[k]; return (r && (r[LOC] || r.en)) || k; }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------- markup helpers -------------------------------------------- */
  var CSS_ICON_SEARCH = '<svg viewBox="0 0 20 20" aria-hidden="true" width="14" height="14">' +
    '<circle cx="8.6" cy="8.6" r="5.6" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
    '<path d="M12.8 12.8 17 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  var CSS_ICON_CLOSE = '<svg viewBox="0 0 20 20" aria-hidden="true" width="14" height="14">' +
    '<path d="M5 5l10 10M15 5 5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  /* ---------- search ---------------------------------------------------- */
  var indexPromise = null;
  function loadIndex() {
    if (indexPromise) return indexPromise;
    indexPromise = fetch(ROOT + 'search-index.json', { credentials: 'omit' })
      .then(function (r) { if (!r.ok) throw new Error('index ' + r.status); return r.json(); });
    return indexPromise;
  }

  function scorePage(p, q) {
    var n = p.n[LOC] || p.n.en || {};
    var s = 0;
    if (n.t && n.t.toLowerCase().indexOf(q) !== -1) s += 6;
    if (n.h && n.h.toLowerCase().indexOf(q) !== -1) s += 4;
    (n.k || []).forEach(function (k) {
      if (k && k.toLowerCase().indexOf(q) !== -1) s += 2;
    });
    if (p.u.toLowerCase().indexOf(q.replace(/\s+/g, '')) !== -1) s += 1;
    return s;
  }

  function buildSearch() {
    var wrap = document.createElement('div');
    wrap.className = 'st-modal';
    wrap.hidden = true;
    wrap.innerHTML =
      '<div class="st-modal-card" role="dialog" aria-modal="true" aria-label="' + esc(t('searchTitle')) + '">' +
        '<div class="st-modal-head">' +
          '<label class="st-sr" for="st-q">' + esc(t('searchTitle')) + '</label>' +
          '<input id="st-q" class="st-input" type="search" autocomplete="off" placeholder="' + esc(t('searchPlaceholder')) + '">' +
          '<button class="st-icon" type="button" data-st-close aria-label="' + esc(t('close')) + '">' + CSS_ICON_CLOSE + '</button>' +
        '</div>' +
        '<ul class="st-results" id="st-results"></ul>' +
      '</div>';
    document.body.appendChild(wrap);

    var input = wrap.querySelector('#st-q');
    var list = wrap.querySelector('#st-results');

    function close() { wrap.hidden = true; }
    function open() {
      wrap.hidden = false;
      input.value = '';
      list.innerHTML = '';
      input.focus();
      loadIndex().catch(function () {
        list.innerHTML = '<li class="st-empty">' + esc(t('offline')) + '</li>';
      });
    }

    wrap.addEventListener('click', function (e) {
      if (e.target === wrap || e.target.closest('[data-st-close]')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !wrap.hidden) close();
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) &&
          wrap.hidden && !/^(input|textarea|select)$/i.test((e.target.tagName || ''))) {
        e.preventDefault(); open();
      }
    });

    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = input.value.trim().toLowerCase();
        if (!q) { list.innerHTML = ''; return; }
        loadIndex().then(function (data) {
          var hits = data.pages
            .map(function (p) { return { p: p, s: scorePage(p, q) }; })
            .filter(function (x) { return x.s > 0; })
            .sort(function (a, b) { return b.s - a.s; })
            .slice(0, 8);
          if (!hits.length) { list.innerHTML = '<li class="st-empty">' + esc(t('noResults')) + '</li>'; return; }
          list.innerHTML = hits.map(function (x) {
            var n = x.p.n[LOC] || x.p.n.en || {};
            return '<li><a href="' + ROOT + esc(x.p.u) + '">' +
              '<span class="st-r-t">' + esc(n.t || x.p.u) + '</span>' +
              '<span class="st-r-h">' + esc(n.h || '') + '</span></a></li>';
          }).join('');
        }).catch(function () {
          list.innerHTML = '<li class="st-empty">' + esc(t('offline')) + '</li>';
        });
      }, 120);
    });

    return { open: open };
  }

  /* ---------- scripted assistant ---------------------------------------- */
  /* Each entry answers from text that already exists on the site. Keep the
     answers identical in substance across languages, and never add a number
     that is not published elsewhere. */
  var KB = [
    {
      k: ['what', 'caracter', 'about', '係咩', '是什么', 'คืออะไร', 'とは', '公司'],
      a: {
        en: 'CARACTER is a B2B platform that turns licensed character IP into content, campaigns and product. It coordinates rights, production and supply chain, and it is a concept build: the domain and trade mark position are not yet confirmed.',
        'zh-Hant': 'CARACTER 是一個 B2B 平台，把授權角色 IP 變成內容、活動與商品，協調權利、製作與供應鏈。目前是概念建置版本：域名與商標狀態尚未確認。',
        'zh-Hans': 'CARACTER 是一个 B2B 平台，把授权角色 IP 变成内容、活动与商品，协调权利、制作与供应链。目前是概念构建版本：域名与商标状态尚未确认。',
        th: 'CARACTER เป็นแพลตฟอร์ม B2B ที่เปลี่ยนตัวละคร IP ที่ได้สิทธิ์ให้เป็นคอนเทนต์ แคมเปญ และสินค้า โดยประสานสิทธิ์ การผลิต และซัพพลายเชน ปัจจุบันเป็นเวอร์ชันแนวคิด โดเมนและสถานะเครื่องหมายการค้ายังไม่ยืนยัน',
        ja: 'CARACTERは、許諾されたキャラクターIPをコンテンツ・キャンペーン・商品に変えるB2Bプラットフォームです。権利、制作、サプライチェーンを調整します。現時点はコンセプト版で、ドメインと商標の状況は未確認です。'
      }
    },
    {
      k: ['furi', 'monster', 'character', 'character', '角色', 'ตัวละคร', 'キャラクター'],
      a: {
        en: 'FURI MONSTER is the demonstration collection: six guardians, one for each way anger has to move. Rights status is demonstration only — trademark, copyright and written commercial authorisation have not been reviewed, so nothing here is an offer of a licence.',
        'zh-Hant': 'FURI MONSTER 是示範系列：六位守護者，對應憤怒必須走過的六種方式。權利狀態僅供示範 —— 商標、著作權與商業使用的書面授權均未審查，因此本頁不構成授權要約。',
        'zh-Hans': 'FURI MONSTER 是示范系列：六位守护者，对应愤怒必须走过的六种方式。权利状态仅供示范 —— 商标、著作权与商业使用的书面授权均未审查，因此本页不构成授权要约。',
        th: 'FURI MONSTER คือคอลเลกชันสาธิต ผู้พิทักษ์หกตนสำหรับแต่ละทางที่ความโกรธต้องเคลื่อนผ่าน สถานะสิทธิ์เพื่อการสาธิตเท่านั้น ยังไม่ได้ตรวจสอบเครื่องหมายการค้า ลิขสิทธิ์ และหนังสืออนุญาตเชิงพาณิชย์ จึงไม่ถือเป็นการเสนอให้สิทธิ์',
        ja: 'FURI MONSTERはデモンストレーション用のコレクションで、怒りが通るべき六つの道に一人ずつ守護者がいます。権利状況はデモのみで、商標・著作権・商用の書面許諾は未確認のため、本サイトはライセンスの申込みを構成しません。'
      }
    },
    {
      k: ['licen', 'rights', 'royalt', '授權', '授权', 'ลิขสิทธ', 'ライセンス', '許諾'],
      a: {
        en: 'A licence states the character, the licensee, the territory, the term, the permitted media, the product categories, the approval gate and the royalty basis. Anything not stated is not licensed, and a licence exists only when a written agreement is signed.',
        'zh-Hant': '授權書載明角色、被授權方、地區、期限、許可媒體、產品類別、審核關卡與版稅計算基準。未載明者即未授權，而授權只在書面協議簽署後才存在。',
        'zh-Hans': '授权书载明角色、被授权方、地区、期限、许可媒体、产品类别、审核关卡与版税计算基准。未载明者即未授权，而授权只在书面协议签署后才存在。',
        th: 'สัญญาอนุญาตระบุตัวละคร ผู้รับอนุญาต อาณาเขต ระยะเวลา สื่อที่อนุญาต หมวดสินค้า ขั้นตอนอนุมัติ และฐานค่าลิขสิทธิ์ สิ่งที่ไม่ระบุถือว่าไม่อยู่ในสัญญา และสิทธิ์จะเกิดเมื่อลงนามในข้อตกลงเป็นลายลักษณ์อักษรเท่านั้น',
        ja: 'ライセンスには、キャラクター、被許諾者、地域、期間、許諾媒体、製品カテゴリー、承認ゲート、ロイヤルティの算定根拠を明記します。記載のないものは許諾されず、ライセンスは書面契約の署名によってのみ成立します。'
      }
    },
    {
      k: ['rfq', 'factory', 'manufactur', 'supplier', 'sample', '工廠', '工厂', 'โรงงาน', '工場'],
      a: {
        en: 'The physical route matches a requirement brief to manufacturers on five criteria, then quotes, samples, inspects and produces. Every step leaves a document. A supplier is not certified by the platform — credentials, samples and inspection reports are required per order.',
        'zh-Hant': '實體路線按五項準則把需求簡報匹配到製造商，然後報價、打樣、驗貨、生產。每一步都留下文件。供應商不是由平台認證 —— 每張訂單都要看證件、樣品與驗貨報告。',
        'zh-Hans': '实体路线按五项准则把需求简报匹配到制造商，然后报价、打样、验货、生产。每一步都留下文件。供应商不是由平台认证 —— 每张订单都要看证件、样品与验货报告。',
        th: 'เส้นทางสินค้าจริงจับคู่บรีฟความต้องการกับผู้ผลิตตามเกณฑ์ห้าข้อ แล้วเสนอราคา ทำตัวอย่าง ตรวจสอบ และผลิต ทุกขั้นตอนมีเอกสาร ผู้ผลิตไม่ได้รับการรับรองจากแพลตฟอร์ม ต้องดูเอกสาร ตัวอย่าง และรายงานตรวจสอบเป็นรายออเดอร์',
        ja: 'フィジカルルートは5つの基準で要件ブリーフをメーカーにマッチングし、見積、サンプル、検査、生産へ進みます。各段階で文書が残ります。サプライヤーがプラットフォームに認証されることはなく、案件ごとに証明書・サンプル・検査報告を求めます。'
      }
    },
    {
      k: ['price', 'cost', 'fee', 'how much', '價', '价', 'ราคา', '費用', 'いくら'],
      a: {
        en: 'Pricing is quoted per project; no fixed rate is published. Fee figures inside the internal specification are explicitly labelled as assumptions, not as prices. Ask for a quote with a defined scope and the number of deliverables.',
        'zh-Hant': '價格按項目報價，網站不公布固定費率。內部規格中的收費數字已明確標示為假設，不是價格。請連同明確範圍與交付件數量索取報價。',
        'zh-Hans': '价格按项目报价，网站不公布固定费率。内部规格中的收费数字已明确标示为假设，不是价格。请连同明确范围与交付件数量索取报价。',
        th: 'ราคาจะเสนอเป็นรายโปรเจกต์ ไม่มีการประกาศอัตราคงที่ ตัวเลขค่าบริการในสเปกภายในระบุชัดว่าเป็นสมมติฐาน ไม่ใช่ราคา กรุณาขอใบเสนอราคาพร้อมขอบเขตและจำนวนงานที่ชัดเจน',
        ja: '価格は案件ごとの見積で、固定料率は公開していません。内部仕様にある料金数値は前提値であり価格ではありません。範囲と成果物数を明示して見積をご依頼ください。'
      }
    },
    {
      k: ['ai', 'generat', 'disclos', 'label', 'deepfake', '標示', '标示', 'ฉลาก', '表示'],
      a: {
        en: 'AI is used for production and iteration, never to disguise that something is AI or to fabricate a result. Every output states what was AI-assisted, which tool, what a human reviewed, and what the viewer should not infer. Commercial disclosure and AI labels are part of the deliverable.',
        'zh-Hant': 'AI 用於製作與反覆調整，絕不用來隱瞞某內容是 AI 生成，或捏造結果。每件產出都會說明哪部分由 AI 輔助、用哪個工具、人手審核了什麼，以及觀眾不應推論什麼。商業披露與 AI 標籤是交付內容的一部分。',
        'zh-Hans': 'AI 用于制作与反复调整，绝不用来隐瞒某内容是 AI 生成，或捏造结果。每件产出都会说明哪部分由 AI 辅助、用哪个工具、人手审核了什么，以及观众不应推论什么。商业披露与 AI 标签是交付内容的一部分。',
        th: 'AI ใช้เพื่อการผลิตและการทำซ้ำ ไม่เคยใช้ปกปิดว่าสิ่งใดสร้างจาก AI หรือปั้นผลลัพธ์ขึ้นมา ทุกผลงานระบุว่าส่วนใดใช้ AI ช่วย เครื่องมือใด คนตรวจสอบอะไร และผู้ชมไม่ควรสรุปสิ่งใด การเปิดเผยข้อมูลเชิงพาณิชย์และป้าย AI เป็นส่วนหนึ่งของงานที่ส่งมอบ',
        ja: 'AIは制作と反復のために用い、AI製であることを隠すためや結果の捏造には用いません。各成果物に、どこをAIで支援したか、どのツールか、人が何を確認したか、視聴者が推測すべきでないことを明記します。商業的開示とAIラベルは成果物の一部です。'
      }
    }
  ];

  function buildChat() {
    var launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'st-launch';
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = '<span class="st-launch-dot" aria-hidden="true"></span>' + esc(t('chatOpen'));
    document.body.appendChild(launcher);

    var panel = document.createElement('div');
    panel.className = 'st-chat';
    panel.hidden = true;
    panel.innerHTML =
      '<div class="st-chat-head"><strong>' + esc(t('chatTitle')) + '</strong>' +
        '<button class="st-icon" type="button" data-chat-close aria-label="' + esc(t('close')) + '">' + CSS_ICON_CLOSE + '</button></div>' +
      '<div class="st-chat-log" id="st-log"><p class="st-chat-note">' + esc(t('chatNote')) + '</p></div>' +
      '<form class="st-chat-form"><label class="st-sr" for="st-msg">' + esc(t('chatPlaceholder')) + '</label>' +
        '<input id="st-msg" class="st-input" type="text" autocomplete="off" placeholder="' + esc(t('chatPlaceholder')) + '">' +
        '<button class="btn btn--sm btn--primary" type="submit">' + esc(t('chatSend')) + '</button></form>';
    document.body.appendChild(panel);

    var log = panel.querySelector('#st-log');
    var form = panel.querySelector('form');
    var input = panel.querySelector('#st-msg');

    function bubble(text, who) {
      var p = document.createElement('p');
      p.className = 'st-bubble st-bubble--' + who;
      p.textContent = text;
      log.appendChild(p);
      log.scrollTop = log.scrollHeight;
      return p;
    }

    function answer(q) {
      var s = q.toLowerCase();
      for (var i = 0; i < KB.length; i++) {
        for (var j = 0; j < KB[i].k.length; j++) {
          if (s.indexOf(KB[i].k[j]) !== -1) return KB[i].a[LOC] || KB[i].a.en;
        }
      }
      return null;
    }

    function reply(text) {
      bubble(text, 'bot');
    }

    function handle(q) {
      if (!q) return;
      bubble(q, 'me');
      var a = answer(q);
      if (a) { reply(a); return; }
      loadIndex().then(function (data) {
        var lq = q.toLowerCase();
        var hits = data.pages.map(function (p) { return { p: p, s: scorePage(p, lq) }; })
          .filter(function (x) { return x.s > 0; })
          .sort(function (a2, b2) { return b2.s - a2.s; }).slice(0, 3);
        var out = document.createElement('p');
        out.className = 'st-bubble st-bubble--bot';
        out.textContent = t('chatFallback');
        if (hits.length) {
          var ul = document.createElement('ul');
          ul.className = 'st-chat-links';
          hits.forEach(function (x) {
            var n = x.p.n[LOC] || x.p.n.en || {};
            var li = document.createElement('li');
            var a3 = document.createElement('a');
            a3.href = ROOT + x.p.u;
            a3.textContent = n.t || x.p.u;
            li.appendChild(a3);
            ul.appendChild(li);
          });
          out.appendChild(ul);
        }
        log.appendChild(out);
        log.scrollTop = log.scrollHeight;
      }).catch(function () { reply(t('offline')); });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.trim();
      input.value = '';
      handle(q);
    });

    launcher.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      launcher.setAttribute('aria-expanded', String(!panel.hidden));
      if (!panel.hidden) input.focus();
    });
    panel.querySelector('[data-chat-close]').addEventListener('click', function () {
      panel.hidden = true;
      launcher.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------- on-demand Google Translate -------------------------------- */
  var GT_CODES = { en: 'en', 'zh-Hant': 'zh-TW', 'zh-Hans': 'zh-CN', th: 'th', ja: 'ja' };

  function initTranslate() {
    var box = document.createElement('div');
    box.className = 'st-translate';
    box.innerHTML = '<button class="st-trans-btn" type="button">' + esc(t('translate')) + '</button>' +
      '<div class="st-trans-body" hidden><p class="tiny muted">' + esc(t('translateNote')) + '</p>' +
      '<div id="google_translate_element"></div></div>';
    var host = document.querySelector('.footer-bottom');
    (host || document.body).appendChild(box);

    box.querySelector('.st-trans-btn').addEventListener('click', function () {
      var body = box.querySelector('.st-trans-body');
      body.hidden = !body.hidden;
      if (body.hidden || window.__gtLoaded) return;
      window.__gtLoaded = true;
      window.__gtInit = function () {
        /* eslint-disable no-undef */
        new google.translate.TranslateElement({
          pageLanguage: GT_CODES[LOC] || 'en',
          includedLanguages: 'en,zh-TW,zh-CN,th,ja,ko,vi,id,ms,fr,de,es,pt,ar',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      };
      var s = document.createElement('script');
      s.src = 'https://translate.google.com/translate_a/element.js?cb=__gtInit';
      s.async = true;
      document.body.appendChild(s);
    });
  }


  /* ---------- WhatsApp + WeChat float (commercialisation.ai pattern) ---- */
  function buildContactDock() {
    var cfg = (window.FM && FM.config && FM.config.contact) || {};
    var wa = cfg.whatsapp;
    var wxId = cfg.wechatId;
    if (!wa && !wxId) return;

    var rootAttr = document.documentElement.getAttribute('data-root') || '';
    var qrRel = cfg.wechatQr || 'assets/img/wechat/qr-ganglou.png';
    var qr = rootAttr + qrRel;
    var wxName = '';
    if (cfg.wechatName) {
      wxName = (typeof cfg.wechatName === 'string')
        ? cfg.wechatName
        : (cfg.wechatName[LOC] || cfg.wechatName.en || '');
    }
    var prefill = '';
    if (cfg.whatsappPrefill) {
      prefill = (typeof cfg.whatsappPrefill === 'string')
        ? cfg.whatsappPrefill
        : (cfg.whatsappPrefill[LOC] || cfg.whatsappPrefill.en || '');
    }
    var waHref = wa
      ? ('https://wa.me/' + String(wa).replace(/\D/g, '') +
         (prefill ? ('?text=' + encodeURIComponent(prefill)) : ''))
      : '';
    var waDisplay = cfg.whatsappDisplay || wa || '';

    var ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">' +
      '<path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l6-1.6A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.6.9.9-3.5-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z"/></svg>';
    var ICON_WX = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">' +
      '<path fill="currentColor" d="M9.5 4C5.9 4 3 6.5 3 9.6c0 1.8 1 3.4 2.6 4.5l-.6 2.2 2.4-1.3c.7.2 1.4.3 2.1.3.2 0 .4 0 .6-.1-.1-.4-.2-.8-.2-1.2 0-2.9 2.7-5.3 6-5.3.3 0 .6 0 .9.1C15.9 6.1 13 4 9.5 4Zm-2.4 4.1a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4.1 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM16.4 9.8c-2.9 0-5.3 2-5.3 4.6 0 1.5.9 2.9 2.3 3.8l-.5 1.8 2-.9c.5.1 1 .2 1.5.2 2.9 0 5.3-2 5.3-4.5s-2.4-5-5.3-5Zm-1.7 3.4a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Zm3.4 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z"/></svg>';

    var dock = document.createElement('div');
    dock.className = 'ca-float-dock';
    dock.setAttribute('role', 'complementary');
    dock.setAttribute('aria-label', t('waEnquire') + ' / ' + t('wxLabel'));

    var html = '';
    if (wxId) {
      html += '<button type="button" class="ca-float-btn ca-float-btn--wechat" data-ca-wechat ' +
        'aria-haspopup="dialog" aria-expanded="false" aria-label="' + esc(t('wxLabel')) + '">' +
        ICON_WX + '<span class="ca-float-label">' + esc(t('wxLabel')) + '</span></button>';
    }
    if (waHref) {
      html += '<a class="ca-float-btn ca-float-btn--wa" href="' + esc(waHref) +
        '" target="_blank" rel="noopener noreferrer" aria-label="' +
        esc(t('waLabel') + ' ' + waDisplay) + '">' + ICON_WA +
        '<span class="ca-float-label">' + esc(t('waLabel')) +
        ' <span class="ca-float-num">' + esc(waDisplay) + '</span></span></a>';
    }
    dock.innerHTML = html;
    document.body.appendChild(dock);

    if (!wxId) return;

    var modal = document.createElement('div');
    modal.className = 'ca-wechat-modal';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="ca-wechat-card" role="dialog" aria-modal="true" aria-label="' + esc(t('wxModalTitle')) + '">' +
        '<div class="ca-wechat-head">' +
          '<strong>' + esc(t('wxModalTitle')) + '</strong>' +
          '<button type="button" class="st-icon" data-ca-wx-close aria-label="' + esc(t('close')) + '">' + CSS_ICON_CLOSE + '</button>' +
        '</div>' +
        '<p class="ca-wechat-hint">' + esc(t('wxHint')) + '</p>' +
        (wxName ? ('<p class="ca-wechat-name">' + esc(wxName) + '</p>') : '') +
        '<figure class="ca-wechat-fig">' +
          '<div class="ca-wechat-qr"><img src="' + esc(qr) + '" alt="' +
            esc((wxName || 'WeChat') + ' QR — ' + wxId) + '" width="220" height="282" decoding="async"></div>' +
          '<figcaption>' +
            '<p class="ca-wechat-idk">' + esc(t('wxIdLabel')) + '</p>' +
            '<p class="ca-wechat-id mono">' + esc(wxId) + '</p>' +
            '<button type="button" class="btn btn--sm ca-wechat-copy" data-ca-wx-copy>' + esc(t('wxCopy')) + '</button>' +
          '</figcaption>' +
        '</figure>' +
      '</div>';
    document.body.appendChild(modal);

    var openBtn = dock.querySelector('[data-ca-wechat]');
    var copyBtn = modal.querySelector('[data-ca-wx-copy]');

    function setOpen(on) {
      modal.hidden = !on;
      if (openBtn) openBtn.setAttribute('aria-expanded', String(on));
      document.documentElement.classList.toggle('ca-wechat-open', on);
    }
    if (openBtn) openBtn.addEventListener('click', function () { setOpen(modal.hidden); });
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-ca-wx-close]')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) setOpen(false);
    });
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var done = function () {
          copyBtn.textContent = t('wxCopied');
          setTimeout(function () { copyBtn.textContent = t('wxCopy'); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(wxId).then(done).catch(function () {
            window.prompt(t('wxIdLabel'), wxId);
          });
        } else {
          window.prompt(t('wxIdLabel'), wxId);
        }
      });
    }
  }

  /* ---------- mount ------------------------------------------------------ */
  function mount() {
    var search = buildSearch();
    var tools = document.querySelector('.site-header .tools');
    if (tools) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'st-icon st-search-btn';
      b.setAttribute('aria-label', t('search'));
      b.innerHTML = CSS_ICON_SEARCH;
      b.addEventListener('click', search.open);
      tools.insertBefore(b, tools.firstChild);
    }
    buildChat();
    buildContactDock();
    initTranslate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(mount, 0); });
  } else {
    setTimeout(mount, 0);
  }
})();
