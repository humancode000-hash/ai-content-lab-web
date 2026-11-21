"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lang, siteData } from "@/lib/siteData";

interface SiteHeaderProps {
  lang: Lang;
  onLangChange: (nextLang: Lang) => void;
}

export function SiteHeader({ lang, onLangChange }: SiteHeaderProps) {
  const pathname = usePathname();
  const t = siteData[lang].nav;

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/services", label: t.services },
    { href: "/cases", label: t.cases },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#090D18]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="text-lg font-black tracking-wider sm:text-xl">
          AI <span className="text-cyan-400">CONTENT LAB</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  active ? "font-semibold text-cyan-400" : "hover:text-cyan-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-full border border-white/10 p-1 text-sm">
            <button
              type="button"
              onClick={() => onLangChange("ru")}
              className={`rounded-full px-3 py-1 font-medium transition ${
                lang === "ru"
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => onLangChange("kz")}
              className={`rounded-full px-3 py-1 font-medium transition ${
                lang === "kz"
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              KZ
            </button>
          </div>

          <Link
            href="/contact"
            className="hidden rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:inline-flex"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
