/**
 * POST /api/enquiry — CARACTER enquiry relay.
 * Prefer WEB3FORMS_ACCESS_KEY (env). Fallback: FormSubmit AJAX to enquiry inbox.
 */
const TO = 'commercialisation.ai@gmail.com';

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      const ct = String(req.headers['content-type'] || '');
      if (ct.includes('application/json')) {
        try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); }
        return;
      }
      // x-www-form-urlencoded / multipart already parsed by Vercel when present
      if (req.body && typeof req.body === 'object') { resolve(req.body); return; }
      const params = new URLSearchParams(raw);
      const obj = {};
      for (const [k, v] of params.entries()) obj[k] = v;
      resolve(obj);
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://catracter.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  let data;
  try { data = await readBody(req); } catch (e) {
    return res.status(400).json({ ok: false, message: 'Invalid body' });
  }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const message = String(data.message || '').trim();
  const company = String(data.company || '').trim();
  const type = String(data.type || data.enquiry_type || 'Other').trim();
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: 'Name, email and message are required' });
  }

  const subject = `CARACTER enquiry — ${type}`;
  const payload = {
    name, email, message, company, type,
    subject,
    from_name: name,
    replyto: email,
    botcheck: '',
    source: 'catracter.com/api/enquiry'
  };

  const key = process.env.WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_KEY || '';
  let upstream;
  try {
    if (key) {
      upstream = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: key, ...payload })
      });
    } else {
      upstream = await fetch(`https://formsubmit.co/ajax/${TO}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: 'https://catracter.com',
          Referer: 'https://catracter.com/contact.html'
        },
        body: JSON.stringify({
          ...payload,
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
          _replyto: email
        })
      });
    }
    const text = await upstream.text();
    let body;
    try { body = JSON.parse(text); } catch (_) { body = { raw: text }; }
    const ok = upstream.ok && (body.success === true || body.success === 'true' || body.message === 'Email sent successfully!' || /success/i.test(String(body.message || '')));
    if (!ok) {
      return res.status(502).json({ ok: false, message: body.message || 'Upstream form provider failed', provider: key ? 'web3forms' : 'formsubmit', detail: body });
    }
    return res.status(200).json({ ok: true, success: true, message: 'Enquiry sent', to: TO });
  } catch (err) {
    return res.status(500).json({ ok: false, message: String(err && err.message || err) });
  }
};
