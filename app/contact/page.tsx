"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Lang, siteData } from "@/lib/siteData";

export default function ContactPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const cp = siteData[lang].contactPage;

  return (
    <main className="min-h-screen bg-[#090D18] text-white">
      <SiteHeader lang={lang} onLangChange={setLang} />

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">{cp.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">{cp.title}</h1>
          <p className="mt-4 text-slate-400">{cp.subtitle}</p>
        </div>

        <LeadForm lang={lang} />
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
