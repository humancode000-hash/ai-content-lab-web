"use client";

import { FormEvent, useEffect, useState } from "react";
import { Lang, siteData, STUDIO_CONTACTS } from "@/lib/siteData";

interface LeadFormProps {
  lang: Lang;
  initialTopic?: string;
}

export function LeadForm({ lang, initialTopic }: LeadFormProps) {
  const t = siteData[lang];
  const f = t.form;

  const [selectedTopic, setSelectedTopic] = useState<string>(
    initialTopic || f.topicDefault
  );
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTopic) {
      setSelectedTopic(initialTopic);
      setSubmitted(false);
      setCopied(false);
      setError(null);
    }
  }, [initialTopic]);

  const getPlainLeadText = () => {
    return [
      "Заявка — AI CONTENT LAB",
      `Направление: ${selectedTopic}`,
      name.trim() ? `Имя: ${name.trim()}` : null,
      contact.trim() ? `Контакт: ${contact.trim()}` : null,
      comment.trim() ? `Детали: ${comment.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const whatsappHref = `https://wa.me/${STUDIO_CONTACTS.whatsappPhone}?text=${encodeURIComponent(
    getPlainLeadText()
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getPlainLeadText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError(f.errorRequired);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          topic: selectedTopic,
          comment: comment.trim(),
          lang,
        }),
      });
    } catch {
      // Не блокируем отправку даже при сетевой ошибке
    } finally {
      setLoading(false);
      setSubmitted(true);
      setCopied(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setCopied(false);
    setName("");
    setContact("");
    setComment("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-[#111B2B] px-6 py-10 sm:px-10 sm:py-12">
      {submitted ? (
        <div className="rounded-2xl border border-cyan-400/30 bg-[#090D18]/80 p-6 text-center">
          <p className="text-xl font-bold text-cyan-400">{f.successTitle}</p>
          <p className="mt-2 text-sm text-slate-300">{f.successText}</p>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-white/5 p-4 text-left text-xs text-slate-200">
            {getPlainLeadText()}
          </pre>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              {f.openWhatsappBtn}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              {copied ? f.copiedBtn : f.copyBtn}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-slate-400 transition hover:text-white"
            >
              {f.resetBtn}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-200">
              {f.topicLabel}
            </label>
            <select
              id="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#090D18] px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value={f.topicDefault}>{f.topicDefault}</option>
              {!t.services.some((s) => `${s.name} (${s.price})` === selectedTopic) &&
                !t.packages.some((p) => `${p.name} — ${p.price} ${p.period}` === selectedTopic) &&
                selectedTopic !== f.topicDefault && (
                  <option value={selectedTopic}>{selectedTopic}</option>
                )}
              {t.services.map((s) => {
                const label = `${s.name} (${s.price})`;
                return (
                  <option key={s.id} value={label}>
                    {label}
                  </option>
                );
              })}
              {t.packages.map((p) => {
                const label = `${p.name} — ${p.price} ${p.period}`;
                return (
                  <option key={p.id} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                {f.nameLabel} *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={f.namePlaceholder}
                className="mt-2 w-full rounded-xl border border-white/15 bg-[#090D18] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-input" className="block text-sm font-medium text-slate-200">
                {f.phoneLabel} *
              </label>
              <input
                id="contact-input"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={f.phonePlaceholder}
                className="mt-2 w-full rounded-xl border border-white/15 bg-[#090D18] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-slate-200">
              {f.commentLabel}
            </label>
            <textarea
              id="comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={f.commentPlaceholder}
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#090D18] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-rose-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
          >
            {loading ? f.submitting : f.submit}
          </button>
        </form>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-6 text-sm">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/15 px-5 py-2.5 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
        >
          {f.directWhatsappBtn}
        </a>
      </div>
    </div>
  );
}
