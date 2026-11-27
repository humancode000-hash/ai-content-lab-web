'use client';

import React, { useEffect, useId, useState } from 'react';

const WHATSAPP_PHONE = '77000338978';

type Lang = 'ru' | 'kz';

// value уходит в сообщение владельцу (по-русски), label показывается клиенту на его языке.
const OPTIONS: { value: string; kz: string }[] = [
  { value: 'Карточки / контент для маркетплейса — подбор пакета', kz: 'Маркетплейс карточкалары / контент — пакет таңдау' },
  { value: 'Карточки для маркетплейсов (от 2 500 ₸ / шт)', kz: 'Маркетплейс карточкалары (2 500 ₸-ден / дана)' },
  { value: 'Reels и Shorts (от 5 000 ₸)', kz: 'Reels және Shorts (5 000 ₸-ден)' },
  { value: 'SEO и поисковые тексты (от 8 000 ₸)', kz: 'SEO және іздеу мәтіндері (8 000 ₸-ден)' },
  { value: 'Копирайтинг (от 1 500 ₸)', kz: 'Копирайтинг (1 500 ₸-ден)' },
  { value: 'AI-визуал и креативы (от 2 000 ₸)', kz: 'AI-визуал және креативтер (2 000 ₸-ден)' },
  { value: 'Конвейер с Джарвисом (от 15 000 ₸)', kz: 'Жарвиспен конвейер (15 000 ₸-ден)' },
  { value: 'ТЕСТ-СПРИНТ — 14 900 ₸ разовый пакет', kz: 'ТЕСТ-СПРИНТ — 14 900 ₸ бір реттік пакет' },
  { value: 'GROWTH ПОДПИСКА — 39 900 ₸ / месяц', kz: 'GROWTH ЖАЗЫЛЫМ — 39 900 ₸ / ай' },
  { value: 'SCALE ПОДПИСКА — 79 900 ₸ / месяц', kz: 'SCALE ЖАЗЫЛЫМ — 79 900 ₸ / ай' },
];

const TEXT: Record<
  Lang,
  {
    service: string;
    name: string;
    namePh: string;
    contact: string;
    contactPh: string;
    details: string;
    detailsPh: string;
    submit: string;
    direct: string;
    errName: string;
    errContact: string;
    opening: string;
    fallbackHint: string;
    fallbackBtn: string;
  }
> = {
  ru: {
    service: 'Услуга или пакет / подписка',
    name: 'Ваше имя *',
    namePh: 'Например, Асет',
    contact: 'Телефон или WhatsApp / Telegram *',
    contactPh: '+7 (777) 000-00-00 или @username',
    details: 'Маркетплейс, ссылка на товар или задача (необязательно)',
    detailsPh: 'Например: Kaspi / Wildberries / Ozon, 5 карточек, 8 Reels, SEO-тексты...',
    submit: 'Сформировать заявку',
    direct: 'Написать в WhatsApp напрямую',
    errName: 'Укажите имя.',
    errContact: 'Укажите телефон или контакт для связи.',
    opening: 'Открываем WhatsApp. Номер заявки: {ref}. Нажмите «Отправить» в чате, чтобы заявка дошла до нас.',
    fallbackHint: 'Если чат не открылся, нажмите кнопку ниже.',
    fallbackBtn: 'Открыть WhatsApp с заявкой',
  },
  kz: {
    service: 'Қызмет немесе пакет / жазылым',
    name: 'Атыңыз *',
    namePh: 'Мысалы, Асет',
    contact: 'Телефон немесе WhatsApp / Telegram *',
    contactPh: '+7 (777) 000-00-00 немесе @username',
    details: 'Маркетплейс, тауарға сілтеме немесе тапсырма (міндетті емес)',
    detailsPh: 'Мысалы: Kaspi / Wildberries / Ozon, 5 карточка, 8 Reels, SEO мәтіндер...',
    submit: 'Өтінім жасау',
    direct: 'WhatsApp-қа тікелей жазу',
    errName: 'Атыңызды көрсетіңіз.',
    errContact: 'Байланыс үшін телефон немесе контакт көрсетіңіз.',
    opening: 'WhatsApp ашылуда. Өтінім нөмірі: {ref}. Өтінім бізге жетуі үшін чатта «Жіберу» түймесін басыңыз.',
    fallbackHint: 'Чат ашылмаса, төмендегі түймені басыңыз.',
    fallbackBtn: 'Өтінімді WhatsApp-та ашу',
  },
};

export type LeadFormProps = {
  lang?: string;
  initialTopic?: string;
  initialService?: string;
  defaultService?: string;
  selectedService?: string;
  className?: string;
};

function normalizeLang(lang?: string): Lang {
  const l = String(lang ?? '').toLowerCase();
  return l === 'kz' || l === 'kk' ? 'kz' : 'ru';
}

function makeRef(): string {
  return Date.now().toString(36).slice(-5).toUpperCase();
}

type Status = { kind: 'idle' } | { kind: 'error'; text: string } | { kind: 'opened'; text: string; href: string };

export function LeadForm({
  lang,
  initialTopic,
  initialService,
  defaultService,
  selectedService,
  className = '',
}: LeadFormProps) {
  const L = normalizeLang(lang);
  const t = TEXT[L];
  const uid = useId();
  const ids = {
    service: `${uid}-service`,
    name: `${uid}-name`,
    contact: `${uid}-contact`,
    details: `${uid}-details`,
    status: `${uid}-status`,
  };

  const preset =
    initialTopic || selectedService || defaultService || initialService || OPTIONS[0].value;
  const [service, setService] = useState(preset);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [trap, setTrap] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  useEffect(() => {
    const nextTopic = initialTopic || selectedService || defaultService || initialService;
    if (nextTopic) {
      setService(nextTopic);
    }
  }, [initialTopic, selectedService, defaultService, initialService]);

  const known = OPTIONS.some((o) => o.value === service);

  const buildMessage = (ref: string) =>
    [
      `Здравствуйте! Новая заявка с сайта AI CONTENT LAB (№${ref}):`,
      `• Услуга / пакет: ${service}`,
      `• Имя: ${name.trim() || 'Не указано'}`,
      `• Контакт: ${contact.trim() || 'Не указан'}`,
      `• Задача / ссылка: ${details.trim() || 'Не указано'}`,
      `• Язык сайта: ${L.toUpperCase()}`,
    ].join('\n');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trap) return; // скрытое поле для ботов

    if (!name.trim()) {
      setStatus({ kind: 'error', text: t.errName });
      return;
    }
    if (contact.trim().length < 5) {
      setStatus({ kind: 'error', text: t.errContact });
      return;
    }

    const ref = makeRef();
    const message = buildMessage(ref);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    // 1. Сначала открываем WhatsApp: действие пользователя не должно зависеть от сервера.
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // 2. Копия текста в буфер обмена (не критично).
    try {
      navigator?.clipboard?.writeText(message).catch(() => {});
    } catch {
      // ничего
    }

    // 3. Служебная копия на сервер в фоне. Её сбой клиента не касается,
    //    и мы не сообщаем, что заявка «сохранена»: заявка считается принятой после отправки в WhatsApp.
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        signal: controller.signal,
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          topic: service,
          comment: `[${ref}] ${details.trim() || '—'}`,
          lang: L,
        }),
      })
        .catch(() => {})
        .finally(() => clearTimeout(timer));
    } catch {
      // ничего
    }

    setStatus({ kind: 'opened', text: t.opening.replace('{ref}', ref), href: waUrl });
  };

  const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    L === 'kz'
      ? 'Сәлеметсіз бе! AI CONTENT LAB-қа тапсырыс бергім келеді.'
      : 'Здравствуйте! Хочу оформить заказ в AI CONTENT LAB.'
  )}`;

  const fieldClass = 'w-full rounded-lg border px-3 py-2 bg-transparent';

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      <div>
        <label htmlFor={ids.service} className="block text-sm mb-1">
          {t.service}
        </label>
        <select
          id={ids.service}
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={fieldClass}
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black">
              {L === 'kz' ? opt.kz : opt.value}
            </option>
          ))}
          {service && !known && (
            <option value={service} className="text-black">
              {service}
            </option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor={ids.name} className="block text-sm mb-1">
          {t.name}
        </label>
        <input
          id={ids.name}
          type="text"
          required
          autoComplete="name"
          maxLength={100}
          placeholder={t.namePh}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={status.kind === 'error' && !name.trim() ? true : undefined}
          aria-describedby={status.kind === 'error' ? ids.status : undefined}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor={ids.contact} className="block text-sm mb-1">
          {t.contact}
        </label>
        <input
          id={ids.contact}
          type="text"
          required
          autoComplete="tel"
          maxLength={100}
          placeholder={t.contactPh}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-invalid={status.kind === 'error' && contact.trim().length < 5 ? true : undefined}
          aria-describedby={status.kind === 'error' ? ids.status : undefined}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor={ids.details} className="block text-sm mb-1">
          {t.details}
        </label>
        <textarea
          id={ids.details}
          rows={3}
          maxLength={1000}
          placeholder={t.detailsPh}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={fieldClass}
        />
      </div>

      {/* Скрытое поле-ловушка для ботов: людям не видно и недоступно с клавиатуры */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="rounded-lg px-4 py-2 font-medium bg-cyan-400 text-black">
          {t.submit}
        </button>

        <a
          href={directWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-4 py-2 border"
        >
          {t.direct}
        </a>
      </div>

      <div id={ids.status} aria-live="polite">
        {status.kind === 'error' && (
          <p role="alert" className="text-sm text-red-400">
            {status.text}
          </p>
        )}
        {status.kind === 'opened' && (
          <div className="space-y-2">
            <p className="text-sm text-cyan-300">{status.text}</p>
            <p className="text-sm opacity-80">{t.fallbackHint}</p>
            <a
              href={status.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-4 py-2 border"
            >
              {t.fallbackBtn}
            </a>
          </div>
        )}
      </div>
    </form>
  );
}

export default LeadForm;
