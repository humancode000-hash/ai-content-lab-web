"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadForm } from "@/components/LeadForm";
import { ExtraHomeCasesBlock } from "@/components/ExtraHomeCasesBlock";
import { BeforeAfterMediaBlock, type VideoFrameStep } from "@/components/BeforeAfterMediaBlock";
import { siteData, type Lang } from "@/lib/siteData";

function cardSvg(tag: string, stroke: string, line1: string, line2: string) {
  const esc = (s: string) => s.replace(/[<>&"]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="340"><rect width="900" height="340" fill="#111622"/><rect x="24" y="24" width="852" height="292" rx="16" fill="#182032" stroke="${stroke}" stroke-width="2"/><text x="50" y="74" fill="${stroke}" font-family="Arial, sans-serif" font-size="22" font-weight="bold">${esc(tag)}</text><text x="50" y="136" fill="#f8fafc" font-family="Arial, sans-serif" font-size="20">${esc(line1)}</text><text x="50" y="186" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="17">${esc(line2)}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function makeFrames(title: string, headline: string, beforeText: string, highlights: string[]): VideoFrameStep[] {
  return [
    { slot: "0-3 сек", label: "БЫЛО", screenText: beforeText.slice(0, 68), visualNote: `Завязка «Было» для «${title}».` },
    { slot: "3-8 сек", label: "СТАЛО", screenText: headline, visualNote: highlights[0] || "Переход к чистому кадру и выгоде." },
    { slot: "8-13 сек", label: "СТАЛО", screenText: highlights[1] || "Детали применения и характеристики", visualNote: highlights[1] || "Показываем удобство использования." },
    { slot: "13-18 сек", label: "СТАЛО", screenText: highlights[2] || "Подробности в карточке товара", visualNote: "Финальный кадр и призыв в карточку." },
  ];
}

export default function CasesPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const t = siteData[lang];
  const cp = t.casesPage;

  return (
    <div className="min-h-screen bg-[#090D18] text-white">
      <SiteHeader lang={lang} onLangChange={setLang} />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400">{cp.eyebrow}</div>
          <h1 className="text-3xl font-bold text-white">{cp.title}</h1>
          <p className="text-neutral-300">{cp.subtitle}</p>
        </div>

        <div className="space-y-8">
          {t.cases.map((c, idx) => (
            <article key={`${c.title}-${idx}`} className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {String(idx + 1).padStart(2, "0")} • {c.category} • {c.productExample}
              </div>
              <h2 className="text-2xl font-bold text-white">{c.title}</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2">
                  <div className="text-xs font-semibold uppercase text-neutral-400">{cp.coverPreviewLabel}</div>
                  <div className="text-base font-bold text-white">{c.coverHeadline}</div>
                  <div className="text-sm text-neutral-300">{c.coverBadge}</div>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-1.5">
                  <div className="text-xs font-semibold uppercase text-neutral-400">{cp.slidesLabel}</div>
                  {c.slideBullets.map((s) => (
                    <div key={s} className="text-sm text-neutral-200">• {s}</div>
                  ))}
                </div>
              </div>

              <BeforeAfterMediaBlock
                title={c.title}
                beforeImage={cardSvg("ФОТО БЫЛО", "#fb7185", c.beforeText.slice(0, 62), c.title)}
                afterImage={cardSvg("ФОТО СТАЛО", "#34d399", c.coverHeadline, c.afterHighlights[0] || c.coverBadge)}
                beforeCaption={c.beforeText}
                afterCaption={c.afterHighlights.join(" • ")}
                reelScript={c.reelsScript}
                frames={makeFrames(c.title, c.coverHeadline, c.beforeText, c.afterHighlights)}
              />

              <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2 text-sm text-neutral-300">
                <p><strong className="text-white">{cp.reelsLabel}:</strong> {c.reelsScript}</p>
                <p><strong className="text-white">{cp.seoLabel}:</strong> {c.seoText}</p>
              </div>

              <a href="#order" className="inline-flex items-center rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-cyan-400">
                {cp.orderSimilarBtn}
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
