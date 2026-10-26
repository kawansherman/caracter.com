/**
 * POST /api/enquiry — CARACTER enquiry relay → commercialisation.ai@gmail.com
 * Prefer RESEND_API_KEY (env). Fallback: FormSubmit AJAX hash. Mailto handled client-side.
 */
const TO = 'commercialisation.ai@gmail.com';
const FORMSUBMIT_ID = 'b34dc4f99f2ae624350fb4df8014f82b';

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length) {
      resolve(req.body);
      return;
    }
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      const ct = String(req.headers['content-type'] || '');
      if (ct.includes('application/json')) {
        try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); }
        return;
      }
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
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : '',
    `Type: ${type}`,
    `Source: catracter.com/api/enquiry`,
    '',
    message
  ].filter(Boolean).join('\n');

  const resendKey = process.env.RESEND_API_KEY || '';
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_KEY || '';

  try {
    // 1) Resend
    if (resendKey) {
      const upstream = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || process.env.NOTIFY_FROM || 'CARACTER <onboarding@resend.dev>',
          to: [TO],
          reply_to: email,
          subject,
          text
        })
      });
      const body = await upstream.json().catch(() => ({}));
      if (upstream.ok) {
        return res.status(200).json({ ok: true, success: true, message: 'Enquiry sent', provider: 'resend', to: TO, id: body.id });
      }
      // fall through
    }

    // 2) Web3Forms
    if (web3Key) {
      const upstream = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          name, email, message, company, type, subject,
          from_name: name, replyto: email, botcheck: ''
        })
      });
      const body = await upstream.json().catch(() => ({}));
      if (upstream.ok && (body.success === true || body.success === 'true')) {
        return res.status(200).json({ ok: true, success: true, message: 'Enquiry sent', provider: 'web3forms', to: TO });
      }
    }

    // 3) FormSubmit hash (may 522 when provider is down)
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const upstream = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ID}`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: 'https://catracter.com',
          Referer: 'https://catracter.com/contact.html'
        },
        body: JSON.stringify({
          name, email, message, company, type,
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
          _replyto: email
        })
      });
      const raw = await upstream.text();
      let body;
      try { body = JSON.parse(raw); } catch (_) { body = { raw }; }
      const ok = upstream.ok && (body.success === true || body.success === 'true' || /success/i.test(String(body.message || '')));
      if (ok) {
        return res.status(200).json({ ok: true, success: true, message: 'Enquiry sent', provider: 'formsubmit', to: TO });
      }
      return res.status(502).json({
        ok: false,
        message: body.message || 'Upstream form provider failed',
        provider: 'formsubmit',
        detail: body,
        hint: 'Set RESEND_API_KEY on Vercel project caracter-com for reliable delivery.'
      });
    } finally {
      clearTimeout(timer);
    }
  } catch (err) {
    return res.status(502).json({
      ok: false,
      message: String(err && err.message || err),
      hint: 'Set RESEND_API_KEY on Vercel project caracter-com, or retry when FormSubmit is up.'
    });
  }
};
