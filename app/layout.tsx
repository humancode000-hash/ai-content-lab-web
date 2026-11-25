import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  verification: {
    other: {
      "...": "...",
      "admitad-verification": "admitad_verification_code",
    },
  },
  title: "AI CONTENT LAB — AI-студия контента и автоматизации для бизнеса",
  description:
    "Создаём видео, Reels, дизайн, тексты, озвучку, презентации и AI-автоматизацию для бизнеса в Казахстане.",
  keywords: [
    "AI контент",
    "Reels",
    "нейросети для бизнеса",
    "AI автоматизация",
    "дизайн на заказ",
    "Алматы",
    "Казахстан",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#090D18] font-sans text-white selection:bg-cyan-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
