"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadForm } from "@/components/LeadForm";
import { ExtraHomeCasesBlock } from "@/components/ExtraHomeCasesBlock";
import { siteData, type Lang } from "@/lib/siteData";

export default function CasesPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const t = siteData[lang];
  const cp = t.casesPage;

  return (
    <div className="min-h-screen bg-[#090D18] text-white">
      <SiteHeader lang={lang} onLangChange={setLang} />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {cp.eyebrow}
          </div>
          <h1 className="text-3xl font-bold text-white">{cp.title}</h1>
          <p className="text-neutral-300">{cp.subtitle}</p>
        </div>

        <div className="space-y-8">
          {t.cases.map((c, idx) => (
            <article
              key={`${c.title}-${idx}`}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-5"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {String(idx + 1).padStart(2, "0")} • {c.category} • {c.productExample}
              </div>
              <h2 className="text-2xl font-bold text-white">{c.title}</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2">
                  <div className="text-xs font-semibold uppercase text-neutral-400">
                    {cp.coverLabel}
                  </div>
                  <div className="text-base font-bold text-white">{c.coverHeadline}</div>
                  <div className="text-sm text-neutral-300">{c.coverBadge}</div>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-1.5">
                  <div className="text-xs font-semibold uppercase text-neutral-400">
                    {cp.slidesLabel}
                  </div>
                  {c.slideBullets.map((s) => (
                    <div key={s} className="text-sm text-neutral-200">
                      • {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2">
                  <div className="text-xs font-bold uppercase text-rose-300">
                    {cp.beforeLabel}
                  </div>
                  <p className="text-sm text-neutral-200">{c.beforeText}</p>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                  <div className="text-xs font-bold uppercase text-emerald-300">
                    {cp.afterLabel}
                  </div>
                  <ul className="space-y-1 text-sm text-emerald-100">
                    {c.afterHighlights.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2 text-sm text-neutral-300">
                <p>
                  <strong className="text-white">{cp.reelsLabel}:</strong> {c.reelsScript}
                </p>
                <p>
                  <strong className="text-white">{cp.seoLabel}:</strong> {c.seoText}
                </p>
              </div>

              <a
                href="#order"
                className="inline-flex items-center rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-cyan-400"
              >
                {cp.ctaBtn}
              </a>
            </article>
          ))}
        </div>

        <ExtraHomeCasesBlock />

        <section id="order" className="mt-14 pt-6 border-t border-neutral-800">
          <LeadForm lang={lang} />
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
