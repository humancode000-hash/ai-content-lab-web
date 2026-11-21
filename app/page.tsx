"use client";

import Link from "next/link";
import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Lang, siteData } from "@/lib/siteData";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

  const t = siteData[lang];
  const h = t.home;

  const handleOrderClick = (topic: string) => {
    setSelectedTopic(topic);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#090D18] text-white">
      <SiteHeader lang={lang} onLangChange={setLang} />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:py-28">
          <p className="mb-5 text-xs font-bold tracking-[0.22em] text-cyan-400 sm:text-sm">
            {h.eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
            {h.title}
            <br />
            <span className="text-cyan-400">{h.accent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-xl">
            {h.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#packages"
              className="inline-flex rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              {h.primaryCta} →
            </a>
            <Link
              href="/cases"
              className="inline-flex rounded-xl border border-white/15 px-7 py-4 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              {h.secondaryCta}
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
            {h.metrics.map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-[#111B2B]/90 px-5 py-4"
              >
                <p className="text-xl font-black text-cyan-400">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-cyan-400">{h.servicesEyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{h.servicesTitle}</h2>
            <p className="mt-3 max-w-2xl text-slate-400">{h.servicesSubtitle}</p>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            {h.allServicesBtn}
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((s) => (
            <article
              key={s.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111B2B] p-7 transition hover:-translate-y-1 hover:border-cyan-400/60"
            >
              <div>
                <div className="text-4xl" aria-hidden="true">
                  {s.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{s.shortDesc}</p>
              </div>
              <div className="mt-6">
                <p className="font-bold text-cyan-400">{s.price}</p>
                <button
                  type="button"
                  onClick={() => handleOrderClick(`${s.name} (${s.price})`)}
                  className="mt-4 inline-block rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold transition group-hover:border-cyan-400 group-hover:text-cyan-400"
                >
                  {h.orderBtn} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 border-y border-white/10 bg-[#0D1422] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-sm font-bold text-cyan-400">{h.packagesEyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{h.packagesTitle}</h2>
          <p className="mt-3 max-w-2xl text-slate-400">{h.packagesSubtitle}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.packages.map((p) => (
              <article
                key={p.id}
                className={`flex flex-col justify-between rounded-2xl border p-7 ${
                  p.popular ? "border-cyan-400 bg-[#14263A]" : "border-white/10 bg-[#111B2B]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-300">
                      {p.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-cyan-400">{p.price}</span>
                    <span className="text-xs text-slate-400">{p.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    {p.items.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleOrderClick(`${p.name} — ${p.price} ${p.period}`)}
                  className="mt-8 block w-full rounded-xl bg-cyan-400 px-5 py-3 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  {h.orderBtn}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">{h.jarvisTitle}</h2>
        <p className="mt-3 max-w-2xl text-slate-400">{h.jarvisSubtitle}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {h.jarvisSteps.map(([number, title, desc]) => (
            <div key={number} className="border-l-2 border-cyan-400 pl-5">
              <p className="text-3xl font-black text-cyan-400">{number}</p>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-7 text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0D1422] px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold text-cyan-400">{h.casePreviewEyebrow}</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{h.casePreviewTitle}</h2>
              <p className="mt-2 max-w-2xl text-slate-400">{h.casePreviewSubtitle}</p>
            </div>
            <Link
              href="/cases"
              className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              {h.casePreviewBtn}
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.cases.map((c) => (
              <article
                key={c.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111B2B] p-7"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {c.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{c.title}</h3>
                  <p className="mt-3 rounded-xl bg-cyan-400/10 p-3 text-sm font-semibold text-cyan-200">
                    {c.coverHeadline}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {c.afterHighlights.slice(0, 2).map((point) => (
                      <li key={point}>✓ {point}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/cases"
                  className="mt-6 inline-block text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  {h.casePreviewBtn}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{h.contactTitle}</h2>
          <p className="mt-3 text-slate-400">{h.contactSubtitle}</p>
        </div>
        <LeadForm lang={lang} initialTopic={selectedTopic} />
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
