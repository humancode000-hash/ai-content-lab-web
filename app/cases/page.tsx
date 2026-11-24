import { ExtraHomeCasesBlock } from "../../components/ExtraHomeCasesBlock";
"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Lang, siteData } from "@/lib/siteData";

export default function CasesPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

  const t = siteData[lang];
  const cp = t.casesPage;

  const handleOrderSimilar = (title: string) => {
    setSelectedTopic(`Кейс / комплект: ${title}`);
    document.getElementById("case-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#090D18] text-white">
      <SiteHeader lang={lang} onLangChange={setLang} />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">{cp.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">{cp.title}</h1>
        <p className="mt-4 max-w-2xl text-slate-400">{cp.subtitle}</p>

        <div className="mt-12 space-y-10">
          {t.cases.map((c, idx) => (
            <article
              key={c.id}
              className="rounded-3xl border border-white/10 bg-[#111B2B] p-7 sm:p-9"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  0{idx + 1} • {c.category}
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {c.productExample}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{c.title}</h2>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-cyan-400/35 bg-gradient-to-br from-[#142942] to-[#0B1322] p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                    {cp.coverPreviewLabel}
                  </p>
                  <p className="mt-3 text-xl font-black leading-snug text-white sm:text-2xl">
                    {c.coverHeadline}
                  </p>
                  <div className="mt-4 inline-block rounded-lg bg-cyan-400/15 px-3 py-1.5 text-xs font-semibold text-cyan-200">
                    {c.coverBadge}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#090D18]/80 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {cp.slidesLabel}
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm text-slate-200">
                    {c.slideBullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#090D18]/70 p-5">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    {cp.beforeLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{c.beforeText}</p>
                </div>

                <div className="rounded-2xl border border-cyan-400/25 bg-[#090D18,
  {
    id: "organizer-cosmetics",
    num: "04",
    category: "ДОМ И ХРАНЕНИЕ • ПОРЯДОК НА ПОЛКЕ",
    format: "Фото/Видео Было-Стало + Карточка + Reels + SEO",
    title: "Органайзер для косметики и уходовых средств",
    beforePhoto: "/cases/organizer-before.svg",
    afterPhoto: "/cases/organizer-after.svg",
    before: "Флаконы, баночки и уход стоят вперемешку на полке, тусклый кадр и нет акцента на ярусах и отсеках.",
    after: [
      "Чистая подача с понятным разделением под флаконы и мелочи",
      "Сразу закрыты вопросы вместимости, обзора и порядка",
      "Готовый сценарий Reels/Shorts и SEO-текст под маркетплейс"
    ],
    reel: "0–3с (Было): хаос на полке, баночки мешают друг другу. 3–18с (Стало): быстрая раскладка по отсекам и аккуратный порядок — подробности в карточке.",
    seo: "Органайзер для косметики и уходовых средств с удобными отсеками для флаконов, баночек и аксессуаров: аккуратное хранение и порядок дома или в подарок."
  },
  {
    id: "vacuum-bags-pump",
    num: "05",
    category: "ДОМ И ХРАНЕНИЕ • ЭКОНОМИЯ МЕСТА",
    format: "Фото/Видео Было-Стало + Карточка + Reels + SEO",
    title: "Вакуумные пакеты с ручным насосом для хранения вещей",
    beforePhoto: "/cases/vacuum-before.svg",
    afterPhoto: "/cases/vacuum-after.svg",
    before: "Серое фото пакета без показа экономии места и объёма, неясно про насос и размеры в комплекте.",
    after: [
      "Наглядное до/после: вещи сжимаются до компактного объёма",
      "Крупно показаны комплект с насосом, размеры и защита от пыли",
      "Готовый сценарий Reels/Shorts и SEO-описание под поиск"
    ],
    reel: "0–3с (Было): объёмные вещи не помещаются в шкаф или чемодан. 3–18с (Стало): укладка, откачка воздуха насосом и компактный блок — детали в карточке.",
    seo: "Вакуумные пакеты с ручным насосом для компактного хранения одежды, пледов и вещей в шкафу или чемодане: экономия места и защита от пыли и влаги."
  }]/70 p-5">
                  <p className="text-xs font-semibold uppercase text-cyan-400">
                    {cp.afterLabel}
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-200">
                    {c.afterHighlights.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase text-cyan-400">
                    {cp.reelsLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{c.reelsScript}</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase text-cyan-400">
                    {cp.seoLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{c.seoText}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOrderSimilar(c.title)}
                className="mt-7 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                {cp.orderSimilarBtn}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="case-form" className="mx-auto max-w-4xl scroll-mt-24 px-5 pb-20">
        <LeadForm lang={lang} initialTopic={selectedTopic} />
      </section>

      <SiteFooter lang={lang} />
    
      <ExtraHomeCasesBlock />
</main>
  );
}
