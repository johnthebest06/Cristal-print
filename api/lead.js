// Приём заявки с сайта «Кристалл Принт» и пересылка её в Telegram и на почту.
// Работает как серверная функция Vercel (файл api/lead.js). На GitHub Pages не выполняется —
// там это просто файл, в нём нет ни ключей, ни адресов.
//
// Ключи задаются в настройках проекта на Vercel (Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID   — заявка приходит в Telegram
//   RESEND_API_KEY, MAIL_TO                 — заявка приходит письмом (необязательно)
//   MAIL_FROM                               — отправитель письма (необязательно)
//   ALLOW_ORIGIN                            — откуда можно слать заявки, например https://cristalprint.ru
//
// Канал включается сам, как только заданы его переменные. Если ни один канал не настроен,
// заявка не принимается — сайт тогда предложит посетителю отправить её почтой или в мессенджер.

const MAX = 1000;
const FIELDS = [
  ['product', 'Продукция'], ['format', 'Формат/вид'], ['paper', 'Материал'], ['print', 'Печать'],
  ['pages', 'Страниц'], ['qty', 'Тираж'], ['finish', 'Обработка'],
  ['name', 'Имя'], ['phone', 'Телефон'], ['email', 'E-mail'], ['company', 'Организация'],
  ['message', 'Комментарий']
];

function clean(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, MAX);
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return null;

  async function post(chatId) {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    });
    return response.json().catch(() => ({}));
  }

  let body = await post(chat);
  // Группа, ставшая супергруппой, меняет id — отправляем на новый, заявку не теряем
  const moved = body.parameters && body.parameters.migrate_to_chat_id;
  if (body.ok === false && moved) {
    body = await post(moved);
    if (body.ok) return `telegram (новый TELEGRAM_CHAT_ID: ${moved})`;
  }
  if (body.ok === false) throw new Error('telegram: ' + (body.description || 'неизвестная ошибка'));
  return 'telegram';
}

async function sendMail(text, lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.MAIL_TO;
  if (!key || !to) return null;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || 'Кристалл Принт <onboarding@resend.dev>',
      to: [to],
      reply_to: lead.email || undefined,
      subject: `Заявка с сайта — ${lead.product || 'расчёт'}, ${lead.name}`,
      text
    })
  });
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error('mail: ' + response.status + ' ' + body.slice(0, 200));
  }
  return 'mail';
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'только POST' });
  }

  let data = req.body;
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch (e) { data = null; }
  }
  if (!data || typeof data !== 'object') return res.status(400).json({ error: 'не разобрали запрос' });

  // Ловушки для роботов: скрытое поле и слишком быстрая отправка
  if (clean(data.website)) return res.status(200).json({ ok: true });
  const seconds = Number(data.seconds) || 0;
  if (seconds > 0 && seconds < 3) return res.status(200).json({ ok: true });

  const lead = {};
  FIELDS.forEach(([key]) => { lead[key] = clean(data[key]); });
  if (!lead.name || !lead.phone) return res.status(400).json({ error: 'не заполнены обязательные поля' });
  if (!data.consent) return res.status(400).json({ error: 'нет согласия на обработку данных' });

  const when = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  const lines = ['Заявка с сайта cristalprint.ru', ''];
  FIELDS.forEach(([key, label]) => { if (lead[key]) lines.push(`${label}: ${lead[key]}`); });
  lines.push('', `Страница: ${clean(data.page)}`, `Время: ${when} (МСК)`);
  const text = lines.join('\n');

  const results = await Promise.allSettled([sendTelegram(text), sendMail(text, lead)]);
  const delivered = results.filter(r => r.status === 'fulfilled' && r.value).map(r => r.value);
  const failed = results.filter(r => r.status === 'rejected').map(r => r.reason && r.reason.message);
  if (failed.length) console.error('Канал не сработал:', failed.join(' | '));
  if (!delivered.length) {
    console.error('Заявка никуда не ушла:', text.replace(/\n/g, ' / '));
    return res.status(500).json({ error: 'не удалось передать заявку' });
  }
  return res.status(200).json({ ok: true, delivered });
};
