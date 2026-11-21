import Link from "next/link";
import { Lang, siteData } from "@/lib/siteData";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = siteData[lang];

  return (
    <footer className="border-t border-white/10 bg-[#070B14] px-5 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <span className="font-black text-white">AI CONTENT LAB</span> · {t.footer}
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="transition hover:text-cyan-400">
            {t.nav.home}
          </Link>
          <Link href="/services" className="transition hover:text-cyan-400">
            {t.nav.services}
          </Link>
          <Link href="/cases" className="transition hover:text-cyan-400">
            {t.nav.cases}
          </Link>
          <Link href="/contact" className="transition hover:text-cyan-400">
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
