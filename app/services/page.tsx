"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Lang, siteData } from "@/lib/siteData";

export default function ServicesPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

  const t = siteData[lang];
  const sp = t.servicesPage;

  const pickTopic = (topic: string) => {
    setSelectedTopic(topic);
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#090D18] text-white">
      <SiteHeader lang={lang} onLangChange={setLang} />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">{sp.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">{sp.title}</h1>
        <p className="mt-4 max-w-2xl text-slate-400">{sp.subtitle}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.services.map((s) => (
            <article
              key={s.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111B2B] p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-3xl" aria-hidden="true">
                    {s.icon}
                  </span>
                  <span className="text-xs text-slate-400">
                    {sp.turnaroundLabel} {s.turnaround}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold">{s.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{s.shortDesc}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {s.deliverables.map((d) => (
                    <li key={d}>✓ {d}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-lg font-bold text-cyan-400">{s.price}</p>
                <button
                  type="button"
                  onClick={() => pickTopic(`${s.name} (${s.price})`)}
                  className="mt-4 w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  {sp.chooseBtn}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0D1422] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{sp.packagesTitle}</h2>
          <p className="mt-3 text-slate-400">{sp.packagesSubtitle}</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
                  onClick={() => pickTopic(`${p.name} — ${p.price} ${p.period}`)}
                  className="mt-8 w-full rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  {sp.chooseBtn}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="order-form" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-16">
        <LeadForm lang={lang} initialTopic={selectedTopic} />
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
