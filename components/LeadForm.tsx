'use client';

import React, { useEffect, useState } from 'react';

const WHATSAPP_PHONE = '77000338978';

const OPTIONS = [
  'Карточки / контент для маркетплейса — подбор пакета',
  'Карточки для маркетплейсов (от 2 500 ₸ / шт)',
  'Reels и Shorts (от 5 000 ₸)',
  'SEO и поисковые тексты (от 8 000 ₸)',
  'Копирайтинг (от 1 500 ₸)',
  'AI-визуал и креативы (от 2 000 ₸)',
  'Конвейер с Джарвисом (от 15 000 ₸)',
  'ТЕСТ-СПРИНТ — 14 900 ₸ разовый пакет',
  'GROWTH ПОДПИСКА — 39 900 ₸ / месяц',
  'SCALE ПОДПИСКА — 79 900 ₸ / месяц',
];

export type LeadFormProps = {
  lang?: string;
  initialTopic?: string;
  initialService?: string;
  defaultService?: string;
  selectedService?: string;
  className?: string;
};

export function LeadForm({
  initialTopic,
  initialService,
  defaultService,
  selectedService,
  lang,
  className = '',
}: LeadFormProps) {
  const preset = initialTopic || selectedService || defaultService || initialService || OPTIONS[0];
  const [service, setService] = useState(preset);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const nextTopic = initialTopic || selectedService || defaultService || initialService;
    if (nextTopic) {
      setService(nextTopic);
    }
  }, [initialTopic, selectedService, defaultService, initialService]);

  const buildMessage = (ref: string) => {
    return [
      `Здравствуйте! Новая заявка с сайта AI CONTENT LAB (№${ref}):`,
      `• Услуга / пакет: ${service}`,
      `• Имя: ${name.trim() || 'Не указано'}`,
      `• Контакт: ${contact.trim() || 'Не указан'}`,
      `• Задача / ссылка: ${details.trim() || 'Не указано'}`,
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = Date.now().toString(36).slice(-5).toUpperCase();
    const message = buildMessage(ref);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    // 1. Открываем WhatsApp сразу (иначе мобильные браузеры могут заблокировать окно)
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // 2. Копия текста в буфер обмена (не критично, ошибки игнорируем)
    try {
      navigator?.clipboard?.writeText(message).catch(() => {});
    } catch {
      // ничего
    }

    // 3. Сохраняем заявку в фоне, ошибки клиенту не показываем
    try {
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          topic: service,
          comment: `[${ref}] ${details.trim() || '—'}`,
          lang: String(lang || '').toLowerCase() === 'kz' ? 'kz' : 'ru',
        }),
      }).catch(() => {});
    } catch {
      // ничего
    }

    setStatusMsg(
      `Открываем WhatsApp... Если чат не открылся, нажмите «Написать в WhatsApp напрямую». Номер заявки: ${ref}`
    );
  };
  const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Здравствуйте! Хочу оформить заказ в AI CONTENT LAB.'
  )}`;

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm mb-1">Услуга или пакет / подписка</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 bg-transparent"
        >
          {OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="text-black">
              {opt}
            </option>
          ))}
          {service && !OPTIONS.includes(service) && (
            <option value={service} className="text-black">
              {service}
            </option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Ваше имя *</label>
        <input
          type="text"
          required
          placeholder="Например, Асет"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 bg-transparent"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Телефон или WhatsApp / Telegram *</label>
        <input
          type="text"
          required
          placeholder="+7 (777) 000-00-00 или @username"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 bg-transparent"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">
          Маркетплейс, ссылка на товар или задача (необязательно)
        </label>
        <textarea
          rows={3}
          placeholder="Например: Kaspi / Wildberries / Ozon, 5 карточек, 8 Reels, SEO-тексты..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 bg-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg px-4 py-2 font-medium bg-cyan-400 text-black"
        >
          Сформировать заявку
        </button>

        <a
          href={directWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-4 py-2 border"
        >
          Написать в WhatsApp напрямую
        </a>
      </div>

      {statusMsg && <p className="text-sm text-cyan-300">{statusMsg}</p>}
    </form>
  );
}

export default LeadForm;
