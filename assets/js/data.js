/* =========================================================================
 * assets/js/data.js — all CARACTER content, in every authored language.
 *
 * L() deliberately does NOT fill Thai or Japanese when they are omitted. That
 * was a lesson from the FURI MONSTER build: filling the gap with English makes
 * it impossible for the build to tell a translation from a fallback, and 322
 * strings shipped as English under a Thai label undetected. Here a missing
 * th/ja is visible, reported by tools/build.js, and filled from
 * tools/mt-page-text.json.
 * ========================================================================= */
(function (root) {
  'use strict';

  function L(en, ht, hs, th, ja) {
    var o = { en: en, 'zh-Hant': ht || en, 'zh-Hans': hs || ht || en };
    if (th) o.th = th;
    if (ja) o.ja = ja;
    return o;
  }

  /* ------------------------------------------------------------------ *
   * The six groups the platform connects
   * ------------------------------------------------------------------ */
  var GROUPS = [
    {
      id: 'ip-owners', slug: 'ip-owners', index: 1, accent: '#E8A33D',
      name: L('IP owners', 'IP 擁有者', 'IP 拥有者', 'เจ้าของ IP', 'IPホルダー'),
      question: L('Will I lose control of my IP?', '我會失去 IP 的控制權嗎？', '我会失去 IP 的控制权吗？',
        'ฉันจะเสียการควบคุม IP ไหม?', 'IPのコントロールを失いませんか？'),
      brings: L('Characters, artwork, story and rights', '角色、美術、故事與權利', '角色、美术、故事与权利',
        'ตัวละคร งานศิลป์ เรื่องราว และสิทธิ์', 'キャラクター、アート、物語、権利'),
      needs: L('Revenue without building production or retail; brand-safe use', '不必自建製作與零售就能有收入；品牌安全的使用方式',
        '不必自建制作与零售就能有收入；品牌安全的使用方式', 'รายได้โดยไม่ต้องสร้างระบบผลิตหรือค้าปลีกเอง และการใช้ที่ปลอดภัยต่อแบรนด์',
        '制作も小売も自前で持たずに収益を。そしてブランドセーフな使われ方。'),
      does: L('A rights-cleared catalogue, defined licensing terms, campaign coordination and royalty reporting',
        '權利清楚的目錄、明確的授權條款、活動協調與版稅報告',
        '权利清楚的目录、明确的授权条款、活动协调与版税报告',
        'แคตตาล็อกที่สิทธิ์ชัดเจน เงื่อนไขการให้สิทธิ์ที่ระบุชัด การประสานแคมเปญ และรายงานค่าลิขสิทธิ์',
        '権利が整理されたカタログ、明確な許諾条件、キャンペーン調整、ロイヤルティ報告'),
      benefit: L('Your characters earn without you hiring a studio or funding inventory.',
        '你的角色開始賺錢，而你不必請製作團隊，也不必壓貨。',
        '你的角色开始赚钱，而你不必请制作团队，也不必压货。',
        'ตัวละครของคุณสร้างรายได้ โดยคุณไม่ต้องจ้างสตูดิโอหรือลงทุนสต็อก',
        'スタジオを雇わず、在庫も抱えずに、キャラクターが収益を生みます。'),
      firstStep: L('Submit your IP for review', '提交你的 IP 以供審核', '提交你的 IP 以供审核',
        'ส่ง IP ของคุณมาให้ตรวจสอบ', 'IPを審査に提出する'),
      href: 'partner/submit-ip.html'
    },
    {
      id: 'brands', slug: 'brands', index: 2, accent: '#5FD3C4',
      name: L('Brands', '品牌', '品牌', 'แบรนด์', 'ブランド'),
      question: L('Will this sell my product?', '這能幫我賣出產品嗎？', '这能帮我卖出产品吗？',
        'สิ่งนี้จะช่วยขายสินค้าของฉันได้ไหม?', '商品は売れますか？'),
      brings: L('Budget, product and market access', '預算、產品與市場通路', '预算、产品与市场通路',
        'งบประมาณ สินค้า และช่องทางตลาด', '予算、商品、市場へのアクセス'),
      needs: L('Content that converts, characters that fit, and low risk', '能帶來轉換的內容、合適的角色、低風險',
        '能带来转化的内容、合适的角色、低风险', 'คอนเทนต์ที่เปลี่ยนยอดขาย ตัวละครที่เหมาะ และความเสี่ยงต่ำ',
        '成果につながるコンテンツ、適合するキャラクター、低いリスク。'),
      does: L('Matched IP, AI campaign production, creator distribution and measurement',
        '配對的 IP、AI 活動製作、創作者發佈與成效量度',
        '配对的 IP、AI 活动制作、创作者发布与成效量度',
        'IP ที่จับคู่ให้ การผลิตแคมเปญด้วย AI การกระจายผ่านครีเอเตอร์ และการวัดผล',
        'IPマッチング、AIによるキャンペーン制作、クリエイター配信、効果測定'),
      benefit: L('One brief becomes a licensed campaign with content, creators and a measured result.',
        '一份簡報，變成一個有內容、有創作者、有量度結果的授權活動。',
        '一份简报，变成一个内容、创作者、量度结果俱全的授权活动。',
        'บรีฟเดียวกลายเป็นแคมเปญที่ได้สิทธิ์ พร้อมคอนเทนต์ ครีเอเตอร์ และผลที่วัดได้',
        '1本のブリーフが、コンテンツとクリエイターと測定結果を備えた許諾キャンペーンになります。'),
      firstStep: L('Start a campaign brief', '開始撰寫活動簡報', '开始撰写活动简报',
        'เริ่มเขียนบรีฟแคมเปญ', 'キャンペーンブリーフを始める'),
      href: 'partner/become-a-partner.html'
    },
    {
      id: 'mcn', slug: 'mcn', index: 3, accent: '#C08CE8',
      name: L('MCN & KOL', 'MCN 與 KOL', 'MCN 与 KOL', 'MCN และ KOL', 'MCN・KOL'),
      question: L('May my creators use these characters?', '我的創作者可以使用這些角色嗎？', '我的创作者可以使用这些角色吗？',
        'ครีเอเตอร์ของฉันใช้ตัวละครเหล่านี้ได้ไหม?', 'うちのクリエイターはこのキャラクターを使えますか？'),
      brings: L('Audience, credibility and conversion', '觀眾、可信度與轉換力', '观众、可信度与转化力',
        'ผู้ชม ความน่าเชื่อถือ และการเปลี่ยนยอดขาย', 'オーディエンス、信頼、コンバージョン'),
      needs: L('Characters they may legally use, and paid campaigns', '可合法使用的角色，以及有償的活動',
        '可合法使用的角色，以及有偿的活动', 'ตัวละครที่ใช้ได้อย่างถูกกฎหมาย และแคมเปญที่มีค่าตอบแทน',
        '合法的に使えるキャラクターと、報酬のある案件'),
      does: L('Licensed campaign kits, clear usage terms, creator registration and briefing',
        '授權活動素材包、清楚的使用條款、創作者登記與簡報',
        '授权活动素材包、清楚的使用条款、创作者登记与简报',
        'ชุดแคมเปญที่ได้สิทธิ์ เงื่อนไขการใช้ที่ชัดเจน การลงทะเบียนครีเอเตอร์ และการบรีฟ',
        '許諾済みのキャンペーンキット、明確な利用条件、クリエイター登録、ブリーフ'),
      benefit: L('Creators get material they can use without asking permission every time.',
        '創作者拿到可以直接用的素材，不必每次問准。',
        '创作者拿到可以直接用的素材，不必每次问准。',
        'ครีเอเตอร์ได้สื่อที่ใช้ได้เลย โดยไม่ต้องขออนุญาตทุกครั้ง',
        '毎回許可を取らなくても使える素材が、クリエイターに届きます。'),
      firstStep: L('Register your creator bench', '登記你的創作者名單', '登记你的创作者名单',
        'ลงทะเบียนกลุ่มครีเอเตอร์ของคุณ', 'クリエイター名簿を登録する'),
      href: 'partner/creators.html'
    },
    {
      id: 'producers', slug: 'producers', index: 4, accent: '#7FA8F0',
      name: L('AI content producers', 'AI 內容製作', 'AI 内容制作', 'ผู้ผลิตคอนเทนต์ AI', 'AIコンテンツ制作者'),
      question: L('Is there paid work?', '有償的工作在哪裡？', '有偿的工作在哪里？',
        'มีงานที่มีค่าตอบแทนไหม?', '報酬のある仕事はありますか？'),
      brings: L('Tooling, prompt craft and post-production', '工具、提示技巧與後期製作', '工具、提示技巧与后期制作',
        'เครื่องมือ ฝีมือการเขียนพรอมป์ต และโพสต์โปรดักชัน', 'ツール、プロンプト設計、ポストプロダクション'),
      needs: L('Briefs, cleared source material and payment', '簡報、權利清楚的原始素材，以及付款',
        '简报、权利清楚的原始素材，以及付款', 'บรีฟ ต้นฉบับที่สิทธิ์ชัดเจน และการจ่ายเงิน',
        'ブリーフ、権利処理済みの素材、支払い'),
      does: L('Briefs with rights attached, an approval workflow and delivery standards',
        '附帶權利的簡報、審批流程與交付標準',
        '附带权利的简报、审批流程与交付标准',
        'บรีฟที่แนบสิทธิ์มาด้วย ขั้นตอนการอนุมัติ และมาตรฐานการส่งมอบ',
        '権利が付いたブリーフ、承認フロー、納品基準'),
      benefit: L('You are never asked to generate a character you have no right to use.',
        '你永遠不會被要求生成一個你無權使用的角色。',
        '你永远不会被要求生成一个你无权使用的角色。',
        'คุณจะไม่ถูกขอให้สร้างตัวละครที่คุณไม่มีสิทธิ์ใช้',
        '使う権利のないキャラクターを作らされることはありません。'),
      firstStep: L('Join the production bench', '加入製作名單', '加入制作名单',
        'เข้าร่วมทีมผลิต', '制作ベンチに参加する'),
      href: 'partner/become-a-partner.html'
    },
    {
      id: 'manufacturers', slug: 'manufacturers', index: 5, accent: '#E8C33D',
      name: L('Manufacturers', '製造商', '制造商', 'ผู้ผลิต', '製造パートナー'),
      question: L('Are these real orders?', '這些是真實訂單嗎？', '这些是真实订单吗？',
        'พวกนี้เป็นออร์เดอร์จริงไหม?', 'これは実際の受注ですか？'),
      brings: L('Capacity, tooling, materials and compliance', '產能、模具、材料與合規', '产能、模具、材料与合规',
        'กำลังการผลิต แม่พิมพ์ วัสดุ และการปฏิบัติตามข้อกำหนด', '生産能力、金型、素材、コンプライアンス'),
      needs: L('Qualified demand, clear specifications and predictable orders', '合格的需求、清楚的規格，以及可預期的訂單',
        '合格的需求、清楚的规格，以及可预期的订单', 'ความต้องการที่ผ่านการคัดกรอง สเปกที่ชัดเจน และออร์เดอร์ที่คาดการณ์ได้',
        '質の高い引き合い、明確な仕様、見通せる受注'),
      does: L('RFQ matched to capability, a specification pack, and a sample and inspection process',
        '按能力配對的 RFQ、規格包，以及樣辦與驗貨流程',
        '按能力配对的 RFQ、规格包，以及样办与验货流程',
        'RFQ ที่จับคู่กับศักยภาพ ชุดสเปก และกระบวนการตัวอย่างกับตรวจรับ',
        '能力に合わせたRFQ、仕様パッケージ、サンプルと検査のプロセス'),
      benefit: L('You are matched on documents and capability, not on a badge.',
        '配對是根據文件與能力，不是一個徽章。',
        '配对是根据文件与能力，不是一个徽章。',
        'คุณถูกจับคู่จากเอกสารและศักยภาพ ไม่ใช่จากตราสัญลักษณ์',
        'バッジではなく、書類と能力でマッチングされます。'),
      firstStep: L('Register your factory', '登記你的工廠', '登记你的工厂',
        'ลงทะเบียนโรงงานของคุณ', '工場を登録する'),
      href: 'partner/suppliers.html'
    },
    {
      id: 'distribution', slug: 'distribution', index: 6, accent: '#F07A8A',
      name: L('Distribution partners', '國際分銷夥伴', '国际分销伙伴', 'พันธมิตรจัดจำหน่าย', '国際流通パートナー'),
      question: L('Can I take a territory?', '我可以拿一個地區嗎？', '我可以拿一个地区吗？',
        'ฉันขอสิทธิ์พื้นที่หนึ่งได้ไหม?', 'ある地域を担当できますか？'),
      brings: L('Channels, territories and logistics', '通路、地區與物流', '通路、地区与物流',
        'ช่องทาง พื้นที่ และโลจิสติกส์', 'チャネル、地域、物流'),
      needs: L('Exclusive-worthy product and reliable supply', '值得獨家的產品，以及可靠的供應',
        '值得独家的产品，以及可靠的供应', 'สินค้าที่ควรค่าแก่การเป็นผู้แทนจำหน่ายรายเดียว และการจัดหาที่เชื่อถือได้',
        '独占に値する商品と、安定した供給'),
      does: L('Territory-scoped offers, market-fit matching and documented compliance',
        '限定地區的方案、市場契合度配對與合規文件',
        '限定地区的方案、市场契合度配对与合规文件',
        'ข้อเสนอเฉพาะพื้นที่ การจับคู่ความเหมาะของตลาด และเอกสารการปฏิบัติตามข้อกำหนด',
        '地域単位の提案、市場適合のマッチング、文書化されたコンプライアンス'),
      benefit: L('You know the supply and the compliance position before you commit.',
        '在承諾之前，你就知道供應與合規狀況。',
        '在承诺之前，你就知道供应与合规状况。',
        'คุณรู้สถานะการจัดหาและการปฏิบัติตามข้อกำหนดก่อนตัดสินใจ',
        'コミットする前に、供給とコンプライアンスの状況が分かります。'),
      firstStep: L('Discuss a territory', '洽談地區授權', '洽谈地区授权',
        'คุยเรื่องพื้นที่', '地域について相談する'),
      href: 'partner/become-a-partner.html'
    }
  ];

  /* ------------------------------------------------------------------ *
   * The two commercial routes
   * ------------------------------------------------------------------ */
  var ROUTES = [
    {
      id: 'digital', accent: '#5FD3C4',
      name: L('Digital route', '數位路線', '数字路线', 'เส้นทางดิจิทัล', 'デジタル・ルート'),
      claim: L('Licence to measurable revenue', '從授權到可量度的收入', '从授权到可量度的收入',
        'จากสิทธิ์สู่รายได้ที่วัดได้', '許諾から、測定できる収益へ'),
      steps: [
        L('Brief', '簡報', '简报', 'บรีฟ', 'ブリーフ'),
        L('Licence', '授權', '授权', 'ให้สิทธิ์', '許諾'),
        L('AI production', 'AI 製作', 'AI 制作', 'ผลิตด้วย AI', 'AI制作'),
        L('Creator campaign', '創作者活動', '创作者活动', 'แคมเปญครีเอเตอร์', 'クリエイター施策'),
        L('Measured result', '量度結果', '量度结果', 'ผลที่วัดได้', '測定結果')
      ],
      body: L('Content produced under licence, distributed by creators, and measured against sales rather than views.',
        '授權下製作內容，由創作者發佈，並以銷售而非觀看數來衡量。',
        '授权下制作内容，由创作者发布，并以销售而非观看数来衡量。',
        'คอนเทนต์ที่ผลิตภายใต้สิทธิ์ เผยแพร่โดยครีเอเตอร์ และวัดด้วยยอดขายไม่ใช่ยอดชม',
        '許諾のもとで制作し、クリエイターが届け、再生数ではなく売上で測る。'),
      time: L('Weeks to first revenue', '數週內有首筆收入', '数周内有首笔收入',
        'รายได้แรกภายในไม่กี่สัปดาห์', '最初の収益まで数週間'),
      exposure: L('Low — creative and coordination only', '低 —— 只有創作與協調成本', '低 —— 只有创作与协调成本',
        'ต่ำ — เฉพาะงานสร้างสรรค์และการประสานงาน', '低 — 制作と調整のみ')
    },
    {
      id: 'physical', accent: '#E8A33D',
      name: L('Physical route', '實體路線', '实体路线', 'เส้นทางสินค้าจริง', 'フィジカル・ルート'),
      claim: L('Licence to a product on a shelf', '從授權到上架的商品', '从授权到上架的商品',
        'จากสิทธิ์สู่สินค้าบนชั้นวาง', '許諾から、棚に並ぶ商品へ'),
      steps: [
        L('Requirement', '需求', '需求', 'ความต้องการ', '要件'),
        L('Licence', '授權', '授权', 'ให้สิทธิ์', '許諾'),
        L('Supplier match', '供應商配對', '供应商配对', 'จับคู่ผู้ผลิต', 'サプライヤー選定'),
        L('Sample & inspect', '樣辦與驗貨', '样办与验货', 'ตัวอย่างและตรวจรับ', 'サンプルと検査'),
        L('Fulfilment', '交付', '交付', 'การส่งมอบ', '納品')
      ],
      body: L('A requirement brief matched to manufacturers on capability, quality, cost and target market, with samples and inspection documented.',
        '把需求簡報按能力、品質、成本與目標市場配對製造商，並完整記錄樣辦與驗貨。',
        '把需求简报按能力、品质、成本与目标市场配对制造商，并完整记录样办与验货。',
        'บรีฟความต้องการที่จับคู่ผู้ผลิตตามศักยภาพ คุณภาพ ต้นทุน และตลาดเป้าหมาย พร้อมเอกสารตัวอย่างและการตรวจรับ',
        '要件を、能力・品質・コスト・対象市場で製造者とマッチング。サンプルと検査は記録に残します。'),
      time: L('One production cycle, typically 8–16 weeks', '一個生產週期，通常 8–16 週', '一个生产周期，通常 8–16 周',
        'หนึ่งรอบการผลิต ปกติ 8–16 สัปดาห์', '1生産サイクル、通常8〜16週間'),
      exposure: L('High — inventory and tooling, so we stay out of it in Phase 1', '高 —— 庫存與模具，所以第一期我們不介入',
        '高 —— 库存与模具，所以第一期我们不介入', 'สูง — สต็อกและแม่พิมพ์ ในระยะแรกเราจึงไม่เข้าไปถือ',
        '高 — 在庫と金型。だから第1期は関与しません。')
    }
  ];

  /* ------------------------------------------------------------------ *
   * AI Studio — four products, not eleven tools
   * ------------------------------------------------------------------ */
  var STUDIO = [
    {
      id: 'short-drama', slug: 'short-drama', accent: '#5FD3C4',
      name: L('AI short drama', 'AI 短劇', 'AI 短剧', 'ละครสั้น AI', 'AIショートドラマ'),
      deliverable: L('An episodic character series', '一個角色系列劇集', '一个角色系列剧集',
        'ซีรีส์ตัวละครแบบตอน', 'キャラクターの連続ドラマ'),
      body: L('A scripted arc, produced with licensed characters, cut for vertical platforms and localised per market. The supplied StarRise proposal describes a 60-episode format with 30 product placements over roughly six months — that is a format we can quote and scale, not a project already delivered.',
        '一個劇本弧線，用授權角色製作，切成直式平台版本，並按市場本地化。所提供的 StarRise 方案描述一個 60 集、30 個產品置入、約六個月的格式 —— 那是我們可以報價並按比例調整的格式，不是已經交付的專案。',
        '一个剧本弧线，用授权角色制作，切成竖屏平台版本，并按市场本地化。所提供的 StarRise 方案描述一个 60 集、30 个产品置入、约六个月的格式 —— 那是我们可以报价并按比例调整的格式，不是已经交付的项目。',
        'โครงเรื่องที่เขียนไว้ ผลิตด้วยตัวละครที่ได้สิทธิ์ ตัดสำหรับแพลตฟอร์มแนวตั้ง และแปลเป็นท้องถิ่นตามตลาด ข้อเสนอ StarRise ที่ให้มาระบุรูปแบบ 60 ตอน พร้อมการวางสินค้า 30 จุด ในราวหกเดือน — นั่นคือรูปแบบที่เราเสนอราคาและปรับขนาดได้ ไม่ใช่โครงการที่ส่งมอบแล้ว',
        '脚本のある連続もの。許諾キャラクターで制作し、縦型プラットフォーム用に編集、市場ごとにローカライズ。提供されたStarRise提案は全60話・商品タイアップ30件・約6か月という形式です。これは見積もって規模を合わせられる形式であり、納品実績ではありません。'),
      includes: [
        L('Format and episode count', '格式與集數', '格式与集数', 'รูปแบบและจำนวนตอน', '形式と話数'),
        L('Scripted arc with character continuity', '有角色連貫性的劇本弧線', '有角色连贯性的剧本弧线', 'โครงเรื่องที่ตัวละครต่อเนื่องกัน', 'キャラクターの一貫性を保つ脚本'),
        L('AI-generated visuals and voice, with human review', 'AI 生成畫面與聲音，並經人手審核', 'AI 生成画面与声音，并经人手审核', 'ภาพและเสียงที่สร้างด้วย AI พร้อมการตรวจทานโดยมนุษย์', 'AI生成の映像と音声。人による確認つき'),
        L('Vertical cut-downs and subtitles per market', '直式裁切版本與各市場字幕', '竖屏裁切版本与各市场字幕', 'เวอร์ชันแนวตั้งและคำบรรยายแยกตามตลาด', '縦型カットと市場別字幕')
      ]
    },
    {
      id: 'brand-video', slug: 'brand-video', accent: '#7FA8F0',
      name: L('AI brand video', 'AI 品牌影片', 'AI 品牌视频', 'วิดีโอแบรนด์ AI', 'AIブランド映像'),
      deliverable: L('A campaign video pack', '一套活動影片素材', '一套活动视频素材',
        'ชุดวิดีโอแคมเปญ', 'キャンペーン映像パック'),
      body: L('One hero film plus vertical cut-downs, static key visuals and copy variants — all produced from licensed assets and approved by a human before delivery.',
        '一支主片，加上直式裁切版本、平面主視覺與文案變體 —— 全部由授權素材製作，並在交付前經人手審批。',
        '一支主片，加上竖屏裁切版本、平面主视觉与文案变体 —— 全部由授权素材制作，并在交付前经人手审批。',
        'ภาพยนตร์หลักหนึ่งเรื่อง พร้อมตัดแนวตั้ง ภาพนิ่งหลัก และข้อความหลายแบบ — ผลิตจากสื่อที่ได้สิทธิ์และผ่านการอนุมัติโดยมนุษย์ก่อนส่งมอบ',
        'ヒーロー映像1本に、縦型カット、キービジュアル、コピー違い。すべて許諾素材から制作し、納品前に人が承認します。'),
      includes: [
        L('Hero film', '主片', '主片', 'ภาพยนตร์หลัก', 'ヒーロー映像'),
        L('Vertical cut-downs for social', '社交平台直式版本', '社交平台竖屏版本', 'เวอร์ชันแนวตั้งสำหรับโซเชียล', 'SNS用縦型カット'),
        L('Static key visuals', '平面主視覺', '平面主视觉', 'ภาพนิ่งหลัก', 'キービジュアル'),
        L('Copy variants in each market language', '各市場語言的文案變體', '各市场语言的文案变体', 'ข้อความหลายแบบในภาษาของแต่ละตลาด', '市場言語ごとのコピー違い')
      ]
    },
    {
      id: 'live-and-avatar', slug: 'live-and-avatar', accent: '#C08CE8',
      name: L('AI live, avatar & service', 'AI 直播、分身與客服', 'AI 直播、分身与客服', 'AI ไลฟ์ อวตาร และบริการ', 'AIライブ・アバター・接客'),
      deliverable: L('An always-on channel', '一個全天候運作的通道', '一个全天候运作的通道',
        'ช่องทางที่ทำงานตลอดเวลา', '常時稼働のチャネル'),
      body: L('AI live broadcast, an avatar presenter, AI customer service and AI call handling, wired into WhatsApp or another channel. This is where the NFC tap-to-WhatsApp capability, already proposed in the JETSOPRICE material, belongs — as an operational service rather than a headline.',
        'AI 直播、分身主播、AI 客服與 AI 電話處理，接上 WhatsApp 或其他通道。這就是 JETSOPRICE 材料中已提出的 NFC 一碰即開 WhatsApp 能力應該出現的位置 —— 作為一項營運服務，而不是標題。',
        'AI 直播、分身主播、AI 客服与 AI 电话处理，接上 WhatsApp 或其他通道。这就是 JETSOPRICE 材料中已提出的 NFC 一碰即开 WhatsApp 能力应该出现的位置 —— 作为一项营运服务，而不是标题。',
        'AI ไลฟ์ อวตารผู้ประกาศ AI บริการลูกค้า และการรับสายด้วย AI เชื่อมกับ WhatsApp หรือช่องทางอื่น นี่คือที่ที่ความสามารถ NFC แตะแล้วเปิด WhatsApp ซึ่งเสนอไว้แล้วในวัสดุ JETSOPRICE ควรอยู่ — เป็นบริการปฏิบัติการ ไม่ใช่พาดหัว',
        'AIライブ、アバター出演、AI接客、AI電話対応をWhatsAppなどのチャネルに接続。JETSOPRICE資料ですでに提案されているNFCタップ→WhatsAppは、見出しではなく運用サービスとしてここに入ります。'),
      includes: [
        L('AI live broadcast hosting', 'AI 直播主持', 'AI 直播主持', 'การจัดไลฟ์ด้วย AI', 'AIライブの進行'),
        L('Avatar presenter', '分身主播', '分身主播', 'อวตารผู้ประกาศ', 'アバター出演'),
        L('AI customer service', 'AI 客服', 'AI 客服', 'บริการลูกค้าด้วย AI', 'AI接客'),
        L('Tap-to-chat via NFC or QR', '經 NFC 或 QR 一碰即聊', '经 NFC 或 QR 一碰即聊', 'แตะเพื่อแชทผ่าน NFC หรือ QR', 'NFC/QRでタップしてチャット')
      ]
    },
    {
      id: 'localisation', slug: 'localisation', accent: '#E8C33D',
      name: L('Localisation', '本地化', '本地化', 'การแปลเป็นท้องถิ่น', 'ローカライズ'),
      deliverable: L('One campaign, many markets', '一個活動，多個市場', '一个活动，多个市场',
        'หนึ่งแคมเปญ หลายตลาด', '1つの施策を多数市場へ'),
      body: L('Script, voice and on-screen text adapted per market with local review. Machine translation alone is never delivered as final copy, and the page says so before anyone asks.',
        '劇本、聲音與畫面文字按市場改編，並經當地審閱。機器翻譯本身永遠不會作為最終文案交付 —— 這句話寫在頁面上，不必等客戶問。',
        '剧本、声音与画面文字按市场改编，并经当地审阅。机器翻译本身永远不会作为最终文案交付 —— 这句话写在页面上，不必等客户问。',
        'บท เสียง และข้อความบนจอ ปรับตามตลาดพร้อมการตรวจทานในท้องถิ่น เราไม่ส่งงานแปลด้วยเครื่องเพียงลำพังเป็นงานสุดท้าย และหน้าเว็บระบุไว้ก่อนถูกถาม',
        '脚本・音声・画面上のテキストを市場ごとに調整し、現地で確認。機械翻訳だけを最終稿として納品することはなく、その旨を先に明記しています。'),
      includes: [
        L('Market-specific script adaptation', '按市場改編劇本', '按市场改编剧本', 'ปรับบทตามตลาด', '市場別の脚本調整'),
        L('Voice and subtitle production', '聲音與字幕製作', '声音与字幕制作', 'การผลิตเสียงและคำบรรยาย', '音声と字幕の制作'),
        L('Cultural review before release', '發佈前的文化審閱', '发布前的文化审阅', 'การตรวจทานเชิงวัฒนธรรมก่อนเผยแพร่', '公開前の文化的レビュー'),
        L('Per-market disclosure text', '各市場的披露文字', '各市场的披露文字', 'ข้อความเปิดเผยตามตลาด', '市場別の開示表記')
      ]
    }
  ];

  /* ------------------------------------------------------------------ *
   * Supply chain
   * ------------------------------------------------------------------ */
  var MATCH_CRITERIA = [
    {
      id: 'requirement',
      name: L('Product requirement', '產品需求', '产品需求', 'ความต้องการสินค้า', '製品要件'),
      rfq: L('Category, materials, tolerances, dimensions, target cost', '類別、材料、公差、尺寸、目標成本',
        '类别、材料、公差、尺寸、目标成本', 'หมวดหมู่ วัสดุ ค่าความคลาดเคลื่อน ขนาด ต้นทุนเป้าหมาย',
        'カテゴリー、素材、公差、寸法、目標コスト'),
      supplier: L('Categories, processes, tooling, minimum and maximum volume', '類別、工藝、模具、最小與最大產量',
        '类别、工艺、模具、最小与最大产量', 'หมวดหมู่ กระบวนการ แม่พิมพ์ ปริมาณต่ำสุดและสูงสุด',
        'カテゴリー、工法、金型、最小・最大ロット'),
      rule: L('Category and process must intersect, and volume must sit inside capacity',
        '類別與工藝必須有交集，產量必須在產能之內', '类别与工艺必须有交集，产量必须在产能之内',
        'หมวดหมู่และกระบวนการต้องตรงกัน และปริมาณต้องอยู่ในศักยภาพ', 'カテゴリーと工法が一致し、数量が能力内であること')
    },
    {
      id: 'capability',
      name: L('Manufacturing capability', '製造能力', '制造能力', 'ศักยภาพการผลิต', '製造能力'),
      rfq: L('Quantity, launch date, complexity', '數量、上市日期、複雜度', '数量、上市日期、复杂度',
        'จำนวน วันเปิดตัว ความซับซ้อน', '数量、発売日、複雑さ'),
      supplier: L('Monthly capacity, lead time, in-house versus subcontracted', '月產能、交期、自製與外發比例',
        '月产能、交期、自制与外发比例', 'กำลังการผลิตต่อเดือน ระยะเวลา สัดส่วนผลิตเองกับจ้างช่วง',
        '月間能力、リードタイム、内製と外注の比率'),
      rule: L('Lead time must fit the launch date, and capacity must cover the run',
        '交期必須符合上市日期，產能必須足以完成這批生產', '交期必须符合上市日期，产能必须足以完成这批生产',
        'ระยะเวลาต้องทันวันเปิดตัว และศักยภาพต้องพอสำหรับการผลิต', 'リードタイムが発売日に間に合い、能力が生産量を満たすこと')
    },
    {
      id: 'quality',
      name: L('Quality standards', '品質標準', '品质标准', 'มาตรฐานคุณภาพ', '品質基準'),
      rfq: L('Destination certifications, age grading', '目的地認證、年齡分級', '目的地认证、年龄分级',
        'การรับรองปลายทาง การแบ่งช่วงอายุ', '仕向地の認証、対象年齢'),
      supplier: L('Certifications held, audit date, defect history', '持有認證、審核日期、不良紀錄',
        '持有认证、审核日期、不良纪录', 'การรับรองที่มี วันตรวจประเมิน ประวัติของเสีย',
        '保有認証、監査日、不良履歴'),
      rule: L('Every required certification must be held, and the audit must be inside its validity period',
        '所有必需認證必須具備，審核必須在有效期內', '所有必需认证必须具备，审核必须在有效期内',
        'ต้องมีการรับรองที่จำเป็นครบ และการตรวจประเมินต้องยังอยู่ในอายุ', '必要な認証をすべて保有し、監査が有効期限内であること')
    },
    {
      id: 'cost',
      name: L('Cost', '成本', '成本', 'ต้นทุน', 'コスト'),
      rfq: L('Target unit cost, target retail, margin', '目標單位成本、目標零售價、毛利',
        '目标单位成本、目标零售价、毛利', 'ต้นทุนต่อหน่วยเป้าหมาย ราคาขายเป้าหมาย กำไร',
        '目標単価、目標小売価格、粗利'),
      supplier: L('Quotation structure, minimum order, tooling cost', '報價結構、最低訂量、模具費',
        '报价结构、最低订量、模具费', 'โครงสร้างใบเสนอราคา ปริมาณสั่งขั้นต่ำ ค่าแม่พิมพ์',
        '見積構造、最低発注量、金型費'),
      rule: L('The quoted unit cost must sit inside the band, or be flagged as out of band rather than silently accepted',
        '報價必須在範圍之內；超出範圍要明確標示，而不是默默接受', '报价必须在范围之内；超出范围要明确标示，而不是默默接受',
        'ต้นทุนต่อหน่วยต้องอยู่ในช่วง หรือถูกธงไว้ว่าเกินช่วง ไม่ใช่ยอมรับเงียบ ๆ',
        '見積単価が範囲内であること。外れる場合は黙って受け入れず、明示します')
    },
    {
      id: 'market',
      name: L('Target market', '目標市場', '目标市场', 'ตลาดเป้าหมาย', '対象市場'),
      rfq: L('Destination, labelling and language rules', '目的地、標籤與語言規定', '目的地、标签与语言规定',
        'ปลายทาง กฎการติดฉลากและภาษา', '仕向地、表示と語学の規則'),
      supplier: L('Export experience, destination compliance evidence', '出口經驗、目的地合規證明',
        '出口经验、目的地合规证明', 'ประสบการณ์ส่งออก หลักฐานการปฏิบัติตามข้อกำหนดปลายทาง',
        '輸出実績、仕向地のコンプライアンス証拠'),
      rule: L('Prior shipment evidence to that market, or a documented compliance path',
        '曾在該市場出貨的證明，或有文件記錄的合規路徑', '曾在该市场出货的证明，或有文件记录的合规路径',
        'หลักฐานการเคยส่งไปตลาดนั้น หรือเส้นทางการปฏิบัติตามข้อกำหนดที่บันทึกไว้',
        'その市場への出荷実績、または文書化されたコンプライアンス経路')
    }
  ];

  var RFQ_STATES = [
    ['draft', 'Brand', L('Form started', '開始填寫', '开始填写', 'เริ่มกรอก', '記入開始'), L('Submitted', '已提交', '已提交', 'ส่งแล้ว', '提出済み'), '—'],
    ['received', 'CARACTER', L('Submitted and routed', '已提交並分流', '已提交并分流', 'ส่งและส่งต่อแล้ว', '提出・振り分け済み'), L('Screened', '已初篩', '已初筛', 'คัดกรองแล้ว', '一次審査済み'), L('Reference number', '案號', '案号', 'เลขที่อ้างอิง', '参照番号')],
    ['licensed', 'IP owner + brand', L('IP selected', '已選定 IP', '已选定 IP', 'เลือก IP แล้ว', 'IP選定済み'), L('Licence executed', '授權已簽署', '授权已签署', 'ลงนามสิทธิ์แล้ว', '許諾契約締結'), L('Licence term sheet', '授權條款清單', '授权条款清单', 'สรุปเงื่อนไขสิทธิ์', '許諾条件書')],
    ['spec', 'CARACTER + brand', L('Licence in place', '授權已到位', '授权已到位', 'มีสิทธิ์แล้ว', '許諾あり'), L('Spec pack approved', '規格包已核准', '规格包已核准', 'อนุมัติชุดสเปกแล้ว', '仕様パッケージ承認'), L('Product specification', '產品規格書', '产品规格书', 'สเปกสินค้า', '製品仕様書')],
    ['shortlist', 'CARACTER', L('Spec approved', '規格已核准', '规格已核准', 'อนุมัติสเปกแล้ว', '仕様承認済み'), L('Two to four suppliers accept', '兩至四家供應商接受', '两至四家供应商接受', 'ผู้ผลิต 2–4 รายตอบรับ', '2〜4社が受諾'), L('Matched list with reasons', '附理由的配對名單', '附理由的配对名单', 'รายชื่อที่จับคู่พร้อมเหตุผล', '理由付きの候補リスト')],
    ['quoting', 'Suppliers', L('Suppliers invited', '已邀請供應商', '已邀请供应商', 'เชิญผู้ผลิตแล้ว', 'サプライヤー招請'), L('Quotations compared', '報價已比較', '报价已比较', 'เปรียบเทียบใบเสนอราคาแล้ว', '見積比較済み'), L('Quotation comparison', '報價比較表', '报价比较表', 'ตารางเปรียบเทียบราคา', '見積比較表')],
    ['sampling', 'Supplier + brand', L('Supplier selected', '已選定供應商', '已选定供应商', 'เลือกผู้ผลิตแล้ว', 'サプライヤー選定'), L('Sample approved', '樣辦已核准', '样办已核准', 'อนุมัติตัวอย่างแล้ว', 'サンプル承認'), L('Sample approval record', '樣辦核准紀錄', '样办核准纪录', 'บันทึกการอนุมัติตัวอย่าง', 'サンプル承認記録')],
    ['inspection', 'Third party / CARACTER', L('Pre-production or pre-shipment', '產前或出貨前', '产前或出货前', 'ก่อนผลิตหรือก่อนส่ง', '生産前または出荷前'), L('Passed with report', '通過並附報告', '通过并附报告', 'ผ่านพร้อมรายงาน', '合格・報告あり'), L('Inspection report', '驗貨報告', '验货报告', 'รายงานตรวจรับ', '検査報告書')],
    ['production', 'Supplier', L('Inspection passed', '驗貨通過', '验货通过', 'ตรวจรับผ่าน', '検査合格'), L('Goods ready', '貨物完成', '货物完成', 'สินค้าพร้อม', '商品完成'), L('Production status', '生產狀態', '生产状态', 'สถานะการผลิต', '生産状況')],
    ['fulfilment', 'Distributor', L('Goods ready', '貨物完成', '货物完成', 'สินค้าพร้อม', '商品完成'), L('Delivered per Incoterm', '按國貿條規交付', '按国贸条规交付', 'ส่งมอบตาม Incoterm', 'インコタームズに従い納品'), L('Shipping documents', '出貨文件', '出货文件', 'เอกสารการขนส่ง', '船積書類')],
    ['closed', 'CARACTER', L('Delivered', '已交付', '已交付', 'ส่งมอบแล้ว', '納品済み'), L('Settled', '已結算', '已结算', 'ชำระแล้ว', '精算済み'), L('Settlement statement', '結算對帳單', '结算对账单', 'ใบสรุปการชำระ', '精算書')]
  ];

  /* ------------------------------------------------------------------ *
   * IP catalogue — the first licensable collection
   * ------------------------------------------------------------------ */
  var COLLECTIONS = [
    {
      id: 'furi-monster', slug: 'furi-monster', accent: '#FEC82A',
      name: L('FURI MONSTER', 'FURI MONSTER', 'FURI MONSTER', 'FURI MONSTER', 'FURI MONSTER'),
      cn: L('The Six Guardians', '六位守護者', '六位守护者', 'ผู้พิทักษ์ทั้งหก', '6人の守護者'),
      status: 'open',
      proposition: L('Six guardians, one for each way anger has to move: seen, understood, expressed, released, transformed. A complete emotional framework, not a set of cute mascots.',
        '六位守護者，對應憤怒必須走過的五個階段：被看見、被理解、被表達、被釋放、被轉化。這是一套完整的情緒框架，不是一堆可愛吉祥物。',
        '六位守护者，对应愤怒必须走过的五个阶段：被看见、被理解、被表达、被释放、被转化。这是一套完整的情绪框架，不是一堆可爱吉祥物。',
        'ผู้พิทักษ์หกตน หนึ่งคนต่อหนึ่งวิธีที่ความโกรธต้องเคลื่อนไป: ถูกมองเห็น เข้าใจ แสดงออก ปล่อยวาง และเปลี่ยนรูป นี่คือกรอบอารมณ์ที่สมบูรณ์ ไม่ใช่ชุดมาสคอตน่ารัก',
        '6人の守護者。怒りが通る5つの道——見られる、理解される、表現される、手放される、変わる——に1人ずつ。かわいいマスコットの集合ではなく、感情のフレームワークです。'),
      audience: L('Education and wellbeing partners, family and teen products, retail gifting, content platforms',
        '教育與身心健康夥伴、家庭與青少年產品、零售禮品、內容平台',
        '教育与身心健康伙伴、家庭与青少年产品、零售礼品、内容平台',
        'พันธมิตรด้านการศึกษาและสุขภาวะ สินค้าสำหรับครอบครัวและวัยรุ่น ของขวัญค้าปลีก แพลตฟอร์มคอนเทนต์',
        '教育・ウェルビーイング、家族・ティーン向け商品、ギフト、コンテンツプラットフォーム'),
      territories: L('Worldwide, by category', '全球，按類別', '全球，按类别', 'ทั่วโลก แยกตามหมวดหมู่', '全世界、カテゴリー別'),
      media: L('Animation, comics, social content, packaging, plush, vinyl figures, stationery, apparel',
        '動畫、漫畫、社交內容、包裝、毛絨、搪膠公仔、文具、服裝',
        '动画、漫画、社交内容、包装、毛绒、搪胶公仔、文具、服装',
        'แอนิเมชัน การ์ตูน คอนเทนต์โซเชียล บรรจุภัณฑ์ ตุ๊กตาไวนิล เครื่องเขียน เสื้อผ้า',
        'アニメ、コミック、SNSコンテンツ、パッケージ、ぬいぐるみ、ソフビ、文具、アパレル')
    }
  ];

  var CHARACTERS = [
    {
      slug: 'furi-prince', collection: 'furi-monster', index: 1, accent: '#6AC9CD',
      name: L('Furi Prince', '皇子', '皇子', 'ฟูริ พรินซ์', 'フーリー・プリンス'),
      cn: L('皇子', '皇子', '皇子', 'ฟูริ พรินซ์', 'フーリー・プリンス'),
      role: L('Guardian of Memory', '記憶守護者', '记忆守护者', 'ผู้พิทักษ์ความจำ', '記憶の守り手'),
      symbol: L('Memory', '記憶', '记忆', 'ความจำ', '記憶'),
      line: L('I keep what must not be forgotten.', '我保留那些不能被忘記的。', '我保留那些不能被忘记的。',
        'ฉันเก็บสิ่งที่ไม่ควรถูกลืม', '忘れてはいけないものを、僕は覚えている。'),
      personality: L('Quiet, watchful, carries too much', '沉默、警覺、背負太多', '沉默、警觉、背负太多',
        'เงียบ จับตาอยู่เสมอ แบกรับไว้มากเกินไป', '静か、見守る、抱えこみすぎる'),
      suitable: L('Heritage brands, memorial and reflection campaigns, stationery, archive-led storytelling',
        '傳承品牌、紀念與反思類活動、文具、以檔案為主的故事',
        '传承品牌、纪念与反思类活动、文具、以档案为主的故事',
        'แบรนด์ที่เน้นมรดก แคมเปญรำลึกและทบทวน เครื่องเขียน การเล่าเรื่องจากคลังข้อมูล',
        '老舗・記念・内省型キャンペーン、文具、記録に基づく物語'),
      notSuitable: L('Loud novelty promotions, gambling, alcohol, anything requiring it to look foolish',
        '喧鬧的新奇促銷、賭博、酒精，以及任何需要它顯得滑稽的用途',
        '喧闹的新奇促销、赌博、酒精，以及任何需要它显得滑稽的用途',
        'โปรโมชันตลกโฉก เชิงพนัน แอลกอฮอล์ และการใช้ที่ต้องทำให้ดูตลก',
        '騒がしい新奇プロモ、ギャンブル、アルコール、滑稽に見せる用途'),
      licensing: 'open'
    },
    {
      slug: 'pinki', collection: 'furi-monster', index: 2, accent: '#F389A0',
      name: L('Pinki', '平奇', '平奇', 'พิงกิ้', 'ピンキー'),
      cn: L('平奇', '平奇', '平奇', 'พิงกิ้', 'ピンキー'),
      role: L('Guardian of Connection', '連結守護者', '连结守护者', 'ผู้พิทักษ์ความเชื่อมโยง', 'つながりの守り手'),
      symbol: L('Heartbeat', '心跳', '心跳', 'เสียงหัวใจ', '鼓動'),
      line: L('I keep the proof that something here is still alive.', '我保留這裡還有生命活著的證據。',
        '我保留这里还有生命活着的证据。', 'ฉันเก็บหลักฐานว่ายังมีบางสิ่งที่นี่ยังมีชีวิต',
        'ここにまだ生きているものがある証拠を、私は持っている。'),
      personality: L('Warm, over-extended, says yes too often', '溫暖、過度付出、太常說好', '温暖、过度付出、太常说好',
        'อบอุ่น ให้เกินตัว พูดว่าได้บ่อยเกินไป', '温かい、抱えすぎる、つい「はい」と言う'),
      suitable: L('Messaging and chat platforms, friendship and community campaigns, gifting, food and drink',
        '通訊與聊天平台、友誼與社群活動、禮品、食品飲料',
        '通讯与聊天平台、友谊与社群活动、礼品、食品饮料',
        'แพลตฟอร์มแชทและข้อความ แคมเปญมิตรภาพและชุมชน ของขวัญ อาหารและเครื่องดื่ม',
        'メッセージ・チャット、友情・コミュニティ施策、ギフト、飲食品'),
      notSuitable: L('Isolation themes, competitions that punish loyalty, anything about being alone',
        '孤立主題、懲罰忠誠的競賽、任何關於孤單的用途',
        '孤立主题、惩罚忠诚的竞赛、任何关于孤单的用途',
        'ธีมความโดดเดี่ยว การแข่งขันที่ลงโทษความภักดี และเรื่องการอยู่คนเดียว',
        '孤立を主題にしたもの、忠誠を罰する企画、ひとりぼっちを扱う用途'),
      licensing: 'open'
    },
    {
      slug: 'winggo', collection: 'furi-monster', index: 3, accent: '#73FFC7',
      name: L('Winggo', '溫果', '温果', 'วิงโก้', 'ウィンゴ'),
      cn: L('溫果', '溫果', '温果', 'วิงโก้', 'ウィンゴ'),
      role: L("Guardian of Nature's Light", '自然之光守護者', '自然之光守护者', 'ผู้พิทักษ์แสงแห่งธรรมชาติ', '自然の光の守り手'),
      symbol: L('Light of Nature', '自然之光', '自然之光', 'แสงแห่งธรรมชาติ', '自然の光'),
      line: L('I spend daylight one horizon at a time.', '我把日光一個地平線一個地平線地用。',
        '我把日光一个地平线一个地平线地用。', 'ฉันใช้แสงกลางวันไปทีละขอบฟ้า',
        '昼の光を、地平線ひとつぶんずつ使う。'),
      personality: L('Small, stubborn, the one you learn on', '細小、固執、最適合練手的那隻', '细小、固执、最适合练手的那只',
        'ตัวเล็ก ดื้อ และเป็นตัวที่ไว้ฝึก', '小さくて頑固。最初に覚える子'),
      suitable: L('Outdoor and travel, energy and sustainability, childrenswear, light-hearted family content',
        '戶外與旅遊、能源與永續、童裝、輕鬆的家庭內容',
        '户外与旅游、能源与永续、童装、轻松的家庭内容',
        'กลางแจ้งและการเดินทาง พลังงานและความยั่งยืน เสื้อผ้าเด็ก คอนเทนต์ครอบครัวสบาย ๆ',
        'アウトドア・旅行、エネルギー・サステナビリティ、子ども服、軽やかな家族向け'),
      notSuitable: L('Anything that positions nature as a backdrop to be consumed',
        '任何把自然當成可消耗背景的用途', '任何把自然当成可消耗背景的用途',
        'การใช้ที่ทำให้ธรรมชาติเป็นเพียงฉากหลังที่บริโภคได้', '自然を消費する背景として扱う用途'),
      licensing: 'open'
    },
    {
      slug: 'fluffu', collection: 'furi-monster', index: 4, accent: '#C099C6',
      name: L('Fluffu', '芙芙', '芙芙', 'ฟลัฟฟู่', 'フラッフ'),
      cn: L('芙芙', '芙芙', '芙芙', 'ฟลัฟฟู่', 'フラッフ'),
      role: L('Guardian of Growth', '成長守護者', '成长守护者', 'ผู้พิทักษ์การเติบโต', '成長の守り手'),
      symbol: L('Seed', '種子', '种子', 'เมล็ดพันธุ์', '種'),
      line: L('Asleep, unopened, waiting for ground worth planting in.', '睡著、未開、等待值得種下的土壤。',
        '睡着、未开、等待值得种下的土壤。', 'หลับอยู่ ยังไม่เปิด รอดินที่คู่ควรจะหว่านลงไป',
        '眠ったまま、開かずに、植えるに値する地面を待っている。'),
      personality: L('Soft, patient, asks for nothing', '柔軟、有耐性、不要求什麼', '柔软、有耐性、不要求什么',
        'นุ่มนวล อดทน ไม่เรียกร้องสิ่งใด', 'やわらかく、忍耐強く、何も求めない'),
      suitable: L('Wellbeing and mindfulness, sleep and comfort products, therapy and counselling services, soft goods',
        '身心健康與靜觀、睡眠與舒適產品、治療與輔導服務、軟性商品',
        '身心健康与静观、睡眠与舒适产品、治疗与辅导服务、软性商品',
        'สุขภาวะและการเจริญสติ สินค้าด้านการนอนและความสบาย บริการบำบัดและให้คำปรึกษา สินค้าผ้านุ่ม',
        'ウェルビーイング・マインドフルネス、睡眠・快適グッズ、カウンセリング、ソフトグッズ'),
      notSuitable: L('Urgency-driven sales, anything that demands a fast decision',
        '以急迫感推動的銷售、任何要求快速決定的用途', '以急迫感推动的销售、任何要求快速决定的用途',
        'การขายที่เร่งเร้า และการใช้ที่บังคับให้ตัดสินใจเร็ว', '即決を迫る販売、急かす用途'),
      licensing: 'open'
    },
    {
      slug: 'boxo', collection: 'furi-monster', index: 5, accent: '#F5A661',
      name: L('Boxo', '盒子', '盒子', 'บอกโซ่', 'ボクソー'),
      cn: L('盒子', '盒子', '盒子', 'บอกโซ่', 'ボクソー'),
      role: L('Guardian of the Cycle', '循環守護者', '循环守护者', 'ผู้พิทักษ์วัฏจักร', '循環の守り手'),
      symbol: L('Material Cycle', '物質循環', '物质循环', 'วัฏจักรวัตถุ', '素材の循環'),
      line: L('Everything destroyed is still available to be rebuilt.', '所有被毀掉的，都仍然可以被重建。',
        '所有被毁掉的，都仍然可以被重建。', 'ทุกสิ่งที่ถูกทำลายยังนำกลับมาสร้างใหม่ได้',
        '壊されたものはすべて、まだ建て直せる。'),
      personality: L('Cheerful on the surface, compressed underneath', '表面開朗，內裡被壓縮', '表面开朗，内里被压缩',
        'ร่าเริงภายนอก อัดแน่นอยู่ข้างใน', '表面は明るく、内側は圧縮されている'),
      suitable: L('Recycling and circular-economy programmes, packaging partnerships, workplace culture, stationery',
        '回收與循環經濟計劃、包裝合作、職場文化、文具',
        '回收与循环经济计划、包装合作、职场文化、文具',
        'โครงการรีไซเคิลและเศรษฐกิจหมุนเวียน ความร่วมมือด้านบรรจุภัณฑ์ วัฒนธรรมที่ทำงาน เครื่องเขียน',
        'リサイクル・循環経済、パッケージ提携、職場文化、文具'),
      notSuitable: L('Single-use disposable positioning, greenwashing claims without evidence',
        '一次性即棄定位、沒有證據的漂綠宣稱', '一次性即弃定位、没有证据的漂绿宣称',
        'จุดยืนแบบใช้ครั้งเดียวทิ้ง และการอ้างรักษ์สิ่งแวดล้อมโดยไม่มีหลักฐาน',
        '使い捨ての訴求、根拠のないグリーンウォッシュ'),
      licensing: 'open'
    },
    {
      slug: 'bubi', collection: 'furi-monster', index: 6, accent: '#F6A6B8',
      name: L('Bubi', '布比', '布比', 'บูบี', 'ブビ'),
      cn: L('布比', '布比', '布比', 'บูบี', 'ブビ'),
      role: L('Guardian of Feeling', '感受守護者', '感受守护者', 'ผู้พิทักษ์ความรู้สึก', '感情の守り手'),
      symbol: L('Water & Emotion', '水與情緒', '水与情绪', 'น้ำและอารมณ์', '水と感情'),
      line: L('The last ocean, and the insistence that feelings move rather than stay.',
        '最後的海洋，以及「情緒會流動，不會停留」這份堅持。',
        '最后的海洋，以及「情绪会流动，不会停留」这份坚持。',
        'มหาสมุทรแห่งสุดท้าย และความยืนยันว่าความรู้สึกต้องเคลื่อนไป ไม่ใช่หยุดอยู่',
        '最後の海。そして、感情はとどまらず動くものだという主張。'),
      personality: L('Gentle until empty, then honest', '溫柔直到耗盡，然後誠實', '温柔直到耗尽，然后诚实',
        'อ่อนโยนจนหมดแรง แล้วจึงซื่อตรง', 'やさしい。尽きたとき、正直になる'),
      suitable: L('Beauty and personal care, hydration and wellness, mental-health campaigns, plush and lifestyle',
        '美妝與個人護理、補水與健康、心理健康活動、毛絨與生活雜貨',
        '美妆与个人护理、补水与健康、心理健康活动、毛绒与生活杂货',
        'ความงามและของใช้ส่วนตัว การเติมน้ำและสุขภาวะ แคมเปญสุขภาพจิต ตุ๊กตาและไลฟ์สไตล์',
        'ビューティ・パーソナルケア、水分・ウェルネス、メンタルヘルス施策、ぬいぐるみ・ライフスタイル'),
      notSuitable: L('Anything that treats exhaustion as a strength to be sold',
        '任何把「耗盡」當成可販賣之優點的用途', '任何把「耗尽」当成可贩卖之优点的用途',
        'การใช้ที่ทำให้ความอ่อนล้าเป็นจุดขายว่าเป็นความแข็งแกร่ง', '疲弊を「強さ」として売る用途'),
      licensing: 'open'
    }
  ];

  /* ------------------------------------------------------------------ *
   * Trust principles — the promises on /trust/
   * ------------------------------------------------------------------ */
  var TRUST = [
    {
      title: L('Rights first', '權利優先', '权利优先', 'สิทธิ์ต้องมาก่อน', '権利が先'),
      body: L('No asset leaves the platform without a recorded approval. Every licence records who approved which character, for which use, on what date.',
        '沒有記錄在案的批核，任何素材都不會離開平台。每一份授權都記錄：誰批准了哪個角色、用於什麼用途、在什麼日期。',
        '没有记录在案的批核，任何素材都不会离开平台。每一份授权都记录：谁批准了哪个角色、用于什么用途、在什么日期。',
        'ไม่มีสื่อใดออกจากแพลตฟอร์มโดยไม่มีการอนุมัติที่บันทึกไว้ ทุกสัญญาสิทธิ์บันทึกว่าใครอนุมัติตัวละครใด เพื่อการใช้งานใด ในวันที่เท่าไร',
        '記録された承認なしに素材が外へ出ることはありません。誰が、どのキャラクターを、どの用途に、いつ承認したかを記録します。')
    },
    {
      title: L('AI is disclosed, never disguised', 'AI 一定揭露，絕不假裝', 'AI 一定揭露，绝不假装', 'เปิดเผยการใช้ AI ไม่ปกปิด', 'AIは開示し、偽らない'),
      body: L('Every AI-assisted output carries the same four facts: what was AI-assisted, which tool, what a human reviewed, and what the viewer should not infer.',
        '每一份 AI 協助的產出都附帶同樣四項事實：哪部分由 AI 協助、用什麼工具、人手審核了什麼、觀看者不應推論什麼。',
        '每一份 AI 协助的产出都附带同样四项事实：哪部分由 AI 协助、用什么工具、人手审核了什么、观看者不应推论什么。',
        'ทุกผลงานที่ AI ช่วยผลิตจะระบุสี่ข้อเหมือนกัน: ส่วนใดใช้ AI ช่วย เครื่องมือใด มนุษย์ตรวจอะไร และผู้ชมไม่ควรสรุปอะไร',
        'AI支援の成果物には必ず同じ4点を添えます。どこをAIが支援したか、どのツールか、人が何を確認したか、視聴者が誤解してはいけないこと。')
    },
    {
      title: L('Evidence, not badges', '看證據，不看徽章', '看证据，不看徽章', 'ดูหลักฐาน ไม่ดูตรา', 'バッジではなく証拠'),
      body: L('A manufacturer is matched on documents, approved samples and inspection reports. A verification badge alone is not evidence of product quality, and we say so publicly.',
        '製造商是靠文件、已核准樣辦與驗貨報告來配對。單一個認證徽章不是產品品質的證據，我們公開這樣說。',
        '制造商是靠文件、已核准样办与验货报告来配对。单一个认证徽章不是产品品质的证据，我们公开这样说。',
        'ผู้ผลิตถูกจับคู่ด้วยเอกสาร ตัวอย่างที่อนุมัติแล้ว และรายงานตรวจรับ ตรารับรองอย่างเดียวไม่ใช่หลักฐานคุณภาพสินค้า และเราพูดแบบนี้ต่อสาธารณะ',
        '製造者は書類、承認サンプル、検査報告で選びます。認証バッジだけでは品質の証拠になりません。そう明記します。')
    },
    {
      title: L('No derivatives, no surprises', '不做衍生物，不出意外', '不做衍生物，不出意外', 'ไม่สร้างงานดัดแปลง ไม่มีเรื่องไม่คาดคิด', '派生物なし、想定外なし'),
      body: L('We do not create derivative characters, including AI variants. No sub-licensing without written permission. No model training on licensed assets without separate consent.',
        '我們不創作衍生角色，包括 AI 變體。未經書面同意不做轉授權。未經另外同意，不用授權素材訓練模型。',
        '我们不创作衍生角色，包括 AI 变体。未经书面同意不做转授权。未经另外同意，不用授权素材训练模型。',
        'เราไม่สร้างตัวละครดัดแปลง รวมถึงตัวแปรที่ AI สร้าง ไม่ให้สิทธิ์ช่วงโดยไม่มีความยินยอมเป็นลายลักษณ์อักษร และไม่ฝึกโมเดลด้วยสื่อที่ได้สิทธิ์โดยไม่ได้รับความยินยอมแยก',
        'AIのバリエーションを含め、派生キャラクターは作りません。書面の許可なく再許諾はしません。別途の同意なく許諾素材でモデルを学習しません。')
    },
    {
      title: L('A stated takedown clock', '明確的下架時限', '明确的下架时限', 'กรอบเวลาถอดออกที่ชัดเจน', '削除までの期限を明示'),
      body: L('When a use must stop, we state the number of working days it will take and we document when it was done.',
        '當某項使用必須停止，我們會說明需要幾個工作日，並記錄實際完成時間。',
        '当某项使用必须停止，我们会说明需要几个工作日，并记录实际完成时间。',
        'เมื่อการใช้ต้องหยุด เราระบุจำนวนวันทำการที่จะใช้ และบันทึกว่าเสร็จเมื่อไร',
        '利用を止める必要が出たとき、所要営業日数を明示し、実際に完了した日を記録します。')
    }
  ];

  /* Things we will never do with a licensed character. */
  var NEVER = [
    L('Create derivative characters, including AI-generated variants', '創作衍生角色，包括 AI 生成的變體', '创作衍生角色，包括 AI 生成的变体',
      'สร้างตัวละครดัดแปลง รวมถึงตัวแปรที่ AI สร้าง', '派生キャラクターの制作（AI生成のバリエーションを含む）'),
    L('Use in weapons, gambling, tobacco, adult content or political endorsement', '用於武器、賭博、煙草、成人內容或政治背書',
      '用于武器、赌博、烟草、成人内容或政治背书', 'ใช้ในอาวุธ การพนัน ยาสูบ เนื้อหาผู้ใหญ่ หรือการสนับสนุนทางการเมือง',
      '武器、ギャンブル、たばこ、成人向け、政治的推薦での使用'),
    L('Sub-license to a third party without written permission', '未經書面同意轉授權給第三方', '未经书面同意转授权给第三方',
      'ให้สิทธิ์ช่วงแก่บุคคลที่สามโดยไม่มีความยินยอมเป็นลายลักษณ์อักษร', '書面の許可なく第三者へ再許諾すること'),
    L('Train a model on licensed assets without separate, explicit permission', '未經另外的明確同意，用授權素材訓練模型',
      '未经另外的明确同意，用授权素材训练模型', 'ฝึกโมเดลด้วยสื่อที่ได้สิทธิ์โดยไม่ได้รับความยินยอมแยกและชัดเจน',
      '別途の明確な許可なく許諾素材でモデルを学習すること'),
    L('Use a real person\'s voice or likeness without a separate release', '未經另外的授權使用真人聲音或肖像',
      '未经另外的授权使用真人声音或肖像', 'ใช้เสียงหรือภาพลักษณ์ของบุคคลจริงโดยไม่มีหนังสือยินยอมแยก',
      '別途の許諾なく実在の人物の声や肖像を使うこと'),
    L('Go beyond the stated territory, term or media', '超出所載地區、期限或媒體範圍', '超出所载地区、期限或媒体范围',
      'เกินกว่าพื้นที่ ระยะเวลา หรือสื่อที่ระบุไว้', '定められた地域・期間・媒体を超えること')
  ];

  /* ------------------------------------------------------------------ */
  var data = {
    groups: GROUPS,
    routes: ROUTES,
    studio: STUDIO,
    matchCriteria: MATCH_CRITERIA,
    rfqStates: RFQ_STATES,
    collections: COLLECTIONS,
    characters: CHARACTERS,
    trust: TRUST,
    never: NEVER,
    bySlug: function (slug) {
      for (var i = 0; i < CHARACTERS.length; i++) if (CHARACTERS[i].slug === slug) return CHARACTERS[i];
      return null;
    },
    groupBySlug: function (slug) {
      for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].slug === slug) return GROUPS[i];
      return null;
    },
    studioBySlug: function (slug) {
      for (var i = 0; i < STUDIO.length; i++) if (STUDIO[i].slug === slug) return STUDIO[i];
      return null;
    },
    charactersOf: function (collectionId) {
      return CHARACTERS.filter(function (c) { return c.collection === collectionId; });
    }
  };

  root.FM = root.FM || {};
  root.FM.data = data;
  root.FM.L = L;
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
})(typeof globalThis !== 'undefined' ? globalThis : this);
