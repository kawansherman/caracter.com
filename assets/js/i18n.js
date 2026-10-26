/* =========================================================================
 * assets/js/i18n.js — CARACTER interface strings.
 *
 * Chrome and UI wording only; page content lives in data.js. Every key exists in
 * all five locales, and tools/check.js fails if one is missing, so a language
 * can never silently show another language's label.
 * ========================================================================= */
(function (root) {
  'use strict';

  var LOCALES = [
    { id: 'en', label: 'EN', name: 'English' },
    { id: 'zh-Hant', label: '繁中', name: '繁體中文' },
    { id: 'zh-Hans', label: '简中', name: '简体中文' },
    { id: 'th', label: 'ไทย', name: 'ภาษาไทย' },
    { id: 'ja', label: '日本語', name: '日本語' }
  ];

  var DICT = {
    en: {
      'nav.explore': 'Explore IP', 'nav.studio': 'AI Studio', 'nav.solutions': 'Solutions',
      'nav.supply': 'Supply Chain', 'nav.how': 'How it works', 'nav.cases': 'Cases',
      'nav.partner': 'Partner with us', 'nav.about': 'About', 'nav.trust': 'Trust', 'nav.contact': 'Contact',
    'nav.why': 'Why CARACTER',
      'nav.portal': 'Sign in', 'nav.more': 'More', 'nav.menu': 'Menu', 'nav.close': 'Close',
      'nav.skip': 'Skip to content', 'nav.lang': 'Language',
      'cta.startCollaboration': 'Start a collaboration',
      'cta.exploreCharacters': 'Explore characters',
      'cta.talkToUs': 'Talk to us',
      'cta.readMore': 'Read more', 'cta.all': 'All',
      'cta.viewCharacter': 'View character', 'cta.requestLicence': 'Request a licence',
      'cta.startRfq': 'Start an RFQ', 'cta.allGroups': 'All six groups',
      'status.open': 'Open for licensing', 'status.byApplication': 'By application',
      'status.firstParty': 'First-party only',
      'label.group': 'Group', 'label.deliverable': 'Deliverable', 'label.includes': 'What you receive',
      'label.question': 'The question', 'label.brings': 'What you bring', 'label.needs': 'What you need',
      'label.does': 'What CARACTER does', 'label.firstStep': 'First step',
      'label.territories': 'Territories', 'label.media': 'Permitted media',
      'label.suitable': 'Good fit for', 'label.notSuitable': 'Not permitted',
      'label.role': 'Role', 'label.symbol': 'Guardian of', 'label.personality': 'Personality',
      'label.status': 'Licensing status', 'label.audience': 'Built for', 'label.collection': 'Collection',
      'form.name': 'Name', 'form.email': 'Email', 'form.company': 'Company', 'form.role': 'Role',
      'form.market': 'Market', 'form.message': 'Message', 'form.type': 'Enquiry type',
      'form.send': 'Send', 'form.required': 'Required', 'form.consent': 'I agree that CARACTER may contact me about this enquiry.',
      'form.success': 'Thank you — we have your message.',
      'form.error': 'Please check the highlighted fields.',
      'form.mailtoCta': 'Open this in your email app — your message is already written',
      'form.mailtoTruncated': 'Your message was long, so it is shortened here. The full text is still in the form above.',
      'form.note': 'We reply within three working days. Submitting this form does not create a licence or a confidentiality obligation.',
      'footer.platform': 'Platform', 'footer.groups': 'Who it is for', 'footer.company': 'Company',
      'footer.legal': 'Legal', 'footer.rights': 'All rights reserved.',
      'footer.domainNote': 'Concept build. Domain ownership and trade mark position are not yet confirmed.',
      'footer.mtNotice': 'Thai and Japanese page text is machine translated. Character names stay in Latin script, and a translation may not carry the original tone.',
      'legal.privacy': 'Privacy', 'legal.terms': 'Terms', 'legal.ai': 'AI notice', 'legal.licensing': 'Licensing policy',
      'a11y.lang': 'Change language', 'a11y.menu': 'Open menu',
      'p404.title': 'This link has no character', 'p404.text': 'The page you asked for is not here.',
      'p404.home': 'Back to home', 'p404.explore': 'Explore the catalogue',
      'note.translation': 'Machine translated'
    },
    'zh-Hant': {
      'nav.explore': '探索 IP', 'nav.studio': 'AI 製作室', 'nav.solutions': '解決方案',
      'nav.supply': '供應鏈', 'nav.how': '合作流程', 'nav.cases': '案例',
      'nav.partner': '與我們合作', 'nav.about': '關於', 'nav.trust': '信任與治理', 'nav.contact': '聯絡',
    'nav.why': '為何是 CARACTER',
      'nav.portal': '登入', 'nav.more': '更多', 'nav.menu': '選單', 'nav.close': '關閉',
      'nav.skip': '跳至內容', 'nav.lang': '語言',
      'cta.startCollaboration': '開始合作',
      'cta.exploreCharacters': '探索角色',
      'cta.talkToUs': '與我們洽談',
      'cta.readMore': '了解更多', 'cta.all': '全部',
      'cta.viewCharacter': '查看角色', 'cta.requestLicence': '申請授權',
      'cta.startRfq': '開始 RFQ', 'cta.allGroups': '全部六個群組',
      'status.open': '開放授權', 'status.byApplication': '需申請',
      'status.firstParty': '僅限自家',
      'label.group': '群組', 'label.deliverable': '交付內容', 'label.includes': '你會收到什麼',
      'label.question': '他們最想問', 'label.brings': '你帶來什麼', 'label.needs': '你需要什麼',
      'label.does': 'CARACTER 做什麼', 'label.firstStep': '第一步',
      'label.territories': '地區', 'label.media': '可用媒體',
      'label.suitable': '適合用途', 'label.notSuitable': '不允許用途',
      'label.role': '角色定位', 'label.symbol': '守護', 'label.personality': '性格',
      'label.status': '授權狀態', 'label.audience': '適合對象', 'label.collection': '系列',
      'form.name': '姓名', 'form.email': '電子郵件', 'form.company': '公司', 'form.role': '職位',
      'form.market': '市場', 'form.message': '訊息', 'form.type': '查詢類型',
      'form.send': '送出', 'form.required': '必填', 'form.consent': '我同意 CARACTER 就此次查詢與我聯絡。',
      'form.success': '謝謝 —— 我們已收到你的訊息。',
      'form.error': '請檢查標示的欄位。',
      'form.mailtoCta': '用你的電郵應用程式開啟 —— 你的內容已經寫好',
      'form.mailtoTruncated': '你的訊息較長，這裡已縮短。完整內容仍然在上方表單中。',
      'form.note': '我們會在三個工作日內回覆。提交此表單不構成授權，也不構成保密義務。',
      'footer.platform': '平台', 'footer.groups': '適合誰', 'footer.company': '公司',
      'footer.legal': '法律', 'footer.rights': '版權所有。',
      'footer.domainNote': '概念建置版本。域名擁有權與商標狀況尚未確認。',
      'footer.mtNotice': '泰文與日文頁面文字為機器翻譯。角色名稱一律保留拉丁字母寫法，譯文未必能傳達原文語氣。',
      'legal.privacy': '隱私', 'legal.terms': '條款', 'legal.ai': 'AI 說明', 'legal.licensing': '授權政策',
      'a11y.lang': '切換語言', 'a11y.menu': '開啟選單',
      'p404.title': '這條連結沒有角色', 'p404.text': '你要找的頁面不在這裡。',
      'p404.home': '返回首頁', 'p404.explore': '探索目錄',
      'note.translation': '機器翻譯'
    },
    'zh-Hans': {
      'nav.explore': '探索 IP', 'nav.studio': 'AI 制作室', 'nav.solutions': '解决方案',
      'nav.supply': '供应链', 'nav.how': '合作流程', 'nav.cases': '案例',
      'nav.partner': '与我们合作', 'nav.about': '关于', 'nav.trust': '信任与治理', 'nav.contact': '联系',
    'nav.why': '为何是 CARACTER',
      'nav.portal': '登录', 'nav.more': '更多', 'nav.menu': '菜单', 'nav.close': '关闭',
      'nav.skip': '跳至内容', 'nav.lang': '语言',
      'cta.startCollaboration': '开始合作',
      'cta.exploreCharacters': '探索角色',
      'cta.talkToUs': '与我们洽谈',
      'cta.readMore': '了解更多', 'cta.all': '全部',
      'cta.viewCharacter': '查看角色', 'cta.requestLicence': '申请授权',
      'cta.startRfq': '开始 RFQ', 'cta.allGroups': '全部六个群组',
      'status.open': '开放授权', 'status.byApplication': '需申请',
      'status.firstParty': '仅限自家',
      'label.group': '群组', 'label.deliverable': '交付内容', 'label.includes': '你会收到什么',
      'label.question': '他们最想问', 'label.brings': '你带来什么', 'label.needs': '你需要什么',
      'label.does': 'CARACTER 做什么', 'label.firstStep': '第一步',
      'label.territories': '地区', 'label.media': '可用媒体',
      'label.suitable': '适合用途', 'label.notSuitable': '不允许用途',
      'label.role': '角色定位', 'label.symbol': '守护', 'label.personality': '性格',
      'label.status': '授权状态', 'label.audience': '适合对象', 'label.collection': '系列',
      'form.name': '姓名', 'form.email': '电子邮件', 'form.company': '公司', 'form.role': '职位',
      'form.market': '市场', 'form.message': '信息', 'form.type': '查询类型',
      'form.send': '发送', 'form.required': '必填', 'form.consent': '我同意 CARACTER 就此次查询与我联系。',
      'form.success': '谢谢 —— 我们已收到你的信息。',
      'form.error': '请检查标示的字段。',
      'form.mailtoCta': '用你的邮件应用打开 —— 你的内容已经写好',
      'form.mailtoTruncated': '你的信息较长，这里已缩短。完整内容仍然在上方表单中。',
      'form.note': '我们会在三个工作日内回复。提交此表单不构成授权，也不构成保密义务。',
      'footer.platform': '平台', 'footer.groups': '适合谁', 'footer.company': '公司',
      'footer.legal': '法律', 'footer.rights': '版权所有。',
      'footer.domainNote': '概念构建版本。域名所有权与商标状况尚未确认。',
      'footer.mtNotice': '泰文与日文页面文字为机器翻译。角色名称一律保留拉丁字母写法，译文未必能传达原文语气。',
      'legal.privacy': '隐私', 'legal.terms': '条款', 'legal.ai': 'AI 说明', 'legal.licensing': '授权政策',
      'a11y.lang': '切换语言', 'a11y.menu': '打开菜单',
      'p404.title': '这条链接没有角色', 'p404.text': '你要找的页面不在这里。',
      'p404.home': '返回首页', 'p404.explore': '探索目录',
      'note.translation': '机器翻译'
    },
    th: {
      'nav.explore': 'สำรวจ IP', 'nav.studio': 'สตูดิโอ AI', 'nav.solutions': 'โซลูชัน',
      'nav.supply': 'ซัพพลายเชน', 'nav.how': 'ขั้นตอนการทำงาน', 'nav.cases': 'กรณีศึกษา',
      'nav.partner': 'ร่วมงานกับเรา', 'nav.about': 'เกี่ยวกับ', 'nav.trust': 'ความไว้วางใจ', 'nav.contact': 'ติดต่อ',
    'nav.why': 'ทำไมต้อง CARACTER',
      'nav.portal': 'เข้าสู่ระบบ', 'nav.more': 'เพิ่มเติม', 'nav.menu': 'เมนู', 'nav.close': 'ปิด',
      'nav.skip': 'ข้ามไปที่เนื้อหา', 'nav.lang': 'ภาษา',
      'cta.startCollaboration': 'เริ่มความร่วมมือ',
      'cta.exploreCharacters': 'สำรวจตัวละคร',
      'cta.talkToUs': 'คุยกับเรา',
      'cta.readMore': 'อ่านต่อ', 'cta.all': 'ทั้งหมด',
      'cta.viewCharacter': 'ดูตัวละคร', 'cta.requestLicence': 'ขอสิทธิ์ใช้งาน',
      'cta.startRfq': 'เริ่ม RFQ', 'cta.allGroups': 'ทั้งหกกลุ่ม',
      'status.open': 'เปิดให้ขอสิทธิ์', 'status.byApplication': 'ต้องยื่นขอ',
      'status.firstParty': 'เฉพาะของเรา',
      'label.group': 'กลุ่ม', 'label.deliverable': 'สิ่งที่ส่งมอบ', 'label.includes': 'สิ่งที่คุณจะได้รับ',
      'label.question': 'คำถามที่เขาถามบ่อย', 'label.brings': 'คุณมีอะไร', 'label.needs': 'คุณต้องการอะไร',
      'label.does': 'CARACTER ทำอะไร', 'label.firstStep': 'ก้าวแรก',
      'label.territories': 'พื้นที่', 'label.media': 'สื่อที่อนุญาต',
      'label.suitable': 'เหมาะกับ', 'label.notSuitable': 'ไม่อนุญาต',
      'label.role': 'บทบาท', 'label.symbol': 'ผู้พิทักษ์', 'label.personality': 'บุคลิก',
      'label.status': 'สถานะสิทธิ์', 'label.audience': 'เหมาะสำหรับ', 'label.collection': 'คอลเลกชัน',
      'form.name': 'ชื่อ', 'form.email': 'อีเมล', 'form.company': 'บริษัท', 'form.role': 'ตำแหน่ง',
      'form.market': 'ตลาด', 'form.message': 'ข้อความ', 'form.type': 'ประเภทการติดต่อ',
      'form.send': 'ส่ง', 'form.required': 'จำเป็น', 'form.consent': 'ฉันยินยอมให้ CARACTER ติดต่อกลับเกี่ยวกับการสอบถามนี้',
      'form.success': 'ขอบคุณ — เราได้รับข้อความของคุณแล้ว',
      'form.error': 'กรุณาตรวจสอบช่องที่ระบุ',
      'form.mailtoCta': 'เปิดในแอปอีเมลของคุณ — ข้อความเขียนไว้แล้ว',
      'form.mailtoTruncated': 'ข้อความของคุณยาว จึงถูกย่อตรงนี้ ข้อความเต็มยังอยู่ในแบบฟอร์มด้านบน',
      'form.note': 'เราตอบกลับภายในสามวันทำการ การส่งแบบฟอร์มนี้ไม่ทำให้เกิดสัญญาสิทธิ์หรือหน้าที่รักษาความลับ',
      'footer.platform': 'แพลตฟอร์ม', 'footer.groups': 'เหมาะกับใคร', 'footer.company': 'บริษัท',
      'footer.legal': 'กฎหมาย', 'footer.rights': 'สงวนลิขสิทธิ์',
      'footer.domainNote': 'เวอร์ชันคอนเซปต์ กรรมสิทธิ์โดเมนและสถานะเครื่องหมายการค้ายังไม่ยืนยัน',
      'footer.mtNotice': 'ข้อความหน้าเว็บภาษาไทยและภาษาญี่ปุ่นแปลด้วยเครื่อง ชื่อตัวละครคงเป็นอักษรละติน และคำแปลอาจไม่คงน้ำเสียงเดิม',
      'legal.privacy': 'ความเป็นส่วนตัว', 'legal.terms': 'ข้อกำหนด', 'legal.ai': 'ประกาศ AI', 'legal.licensing': 'นโยบายสิทธิ์',
      'a11y.lang': 'เปลี่ยนภาษา', 'a11y.menu': 'เปิดเมนู',
      'p404.title': 'ลิงก์นี้ไม่มีตัวละคร', 'p404.text': 'ไม่พบหน้าที่คุณขอ',
      'p404.home': 'กลับหน้าแรก', 'p404.explore': 'สำรวจแคตตาล็อก',
      'note.translation': 'แปลด้วยเครื่อง'
    },
    ja: {
      'nav.explore': 'IPを探す', 'nav.studio': 'AIスタジオ', 'nav.solutions': 'ソリューション',
      'nav.supply': 'サプライチェーン', 'nav.how': '進め方', 'nav.cases': '事例',
      'nav.partner': 'パートナーになる', 'nav.about': '会社情報', 'nav.trust': '信頼と統治', 'nav.contact': 'お問い合わせ',
    'nav.why': 'CARACTERが選ばれる理由',
      'nav.portal': 'ログイン', 'nav.more': 'その他', 'nav.menu': 'メニュー', 'nav.close': '閉じる',
      'nav.skip': '本文へスキップ', 'nav.lang': '言語',
      'cta.startCollaboration': '協業を始める',
      'cta.exploreCharacters': 'キャラクターを見る',
      'cta.talkToUs': '相談する',
      'cta.readMore': '詳しく見る', 'cta.all': 'すべて',
      'cta.viewCharacter': 'キャラクターを見る', 'cta.requestLicence': '許諾を相談する',
      'cta.startRfq': 'RFQを始める', 'cta.allGroups': '6つのグループ',
      'status.open': '許諾受付中', 'status.byApplication': '申請制',
      'status.firstParty': '自社限定',
      'label.group': 'グループ', 'label.deliverable': '成果物', 'label.includes': '納品内容',
      'label.question': 'よくある質問', 'label.brings': '持ち込むもの', 'label.needs': '必要なもの',
      'label.does': 'CARACTERが担うこと', 'label.firstStep': '最初の一歩',
      'label.territories': '地域', 'label.media': '利用可能な媒体',
      'label.suitable': '適する用途', 'label.notSuitable': '認められない用途',
      'label.role': '役割', 'label.symbol': '守るもの', 'label.personality': '性格',
      'label.status': '許諾状況', 'label.audience': '対象', 'label.collection': 'コレクション',
      'form.name': 'お名前', 'form.email': 'メールアドレス', 'form.company': '会社名', 'form.role': '役職',
      'form.market': '市場', 'form.message': 'ご用件', 'form.type': 'お問い合わせ種別',
      'form.send': '送信', 'form.required': '必須', 'form.consent': 'このお問い合わせについて、CARACTERからの連絡に同意します。',
      'form.success': 'ありがとうございます。メッセージを受け取りました。',
      'form.error': '印の付いた項目をご確認ください。',
      'form.mailtoCta': 'メールアプリで開く — 本文はすでに書かれています',
      'form.mailtoTruncated': '本文が長いため、ここでは短縮しています。全文は上のフォームに残っています。',
      'form.note': '3営業日以内に返信します。このフォームの送信は許諾契約や守秘義務を生むものではありません。',
      'footer.platform': 'プラットフォーム', 'footer.groups': '対象', 'footer.company': '会社',
      'footer.legal': '法務', 'footer.rights': 'All rights reserved.',
      'footer.domainNote': 'コンセプトビルドです。ドメインの所有権と商標の状況は未確認です。',
      'footer.mtNotice': 'タイ語と日本語のページ本文は機械翻訳です。キャラクター名はラテン文字のまま表記し、原文の語調が伝わらない場合があります。',
      'legal.privacy': 'プライバシー', 'legal.terms': '利用規約', 'legal.ai': 'AIについて', 'legal.licensing': '許諾ポリシー',
      'a11y.lang': '言語を切り替える', 'a11y.menu': 'メニューを開く',
      'p404.title': 'このリンクにはキャラクターがいません', 'p404.text': 'お探しのページはここにありません。',
      'p404.home': 'ホームに戻る', 'p404.explore': 'カタログを見る',
      'note.translation': '機械翻訳'
    }
  };

  var current = 'en';

  function t(key, locale) {
    var d = DICT[locale || current] || DICT.en;
    if (d[key] !== undefined) return d[key];
    if (DICT.en[key] !== undefined) return DICT.en[key];
    return key;
  }
  function setLocale(loc) {
    if (!DICT[loc]) loc = 'en';
    current = loc;
    try { root.localStorage.setItem('ca.locale', loc); } catch (e) {}
    if (root.document && root.document.documentElement) {
      root.document.documentElement.setAttribute('lang', loc);
    }
    return current;
  }
  function getLocale() { return current; }
  function detect() {
    var stored = null;
    try { stored = root.localStorage.getItem('ca.locale'); } catch (e) {}
    if (stored && DICT[stored]) return stored;
    var nav = (root.navigator && (root.navigator.language || root.navigator.userLanguage)) || 'en';
    if (/^zh\b/i.test(nav)) return (/hans|cn|sg|my/i.test(nav) ? 'zh-Hans' : 'zh-Hant');
    if (/^th\b/i.test(nav)) return 'th';
    if (/^ja\b/i.test(nav)) return 'ja';
    return 'en';
  }
  function pick(field, locale) {
    if (field === null || field === undefined) return '';
    if (typeof field === 'string') return field;
    var loc = locale || current;
    return field[loc] !== undefined ? field[loc] : (field.en || '');
  }

  var api = {
    locales: LOCALES, dict: DICT, t: t, pick: pick,
    setLocale: setLocale, getLocale: getLocale, detect: detect
  };
  root.FM = root.FM || {};
  root.FM.i18n = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
