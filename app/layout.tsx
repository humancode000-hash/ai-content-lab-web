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
      {/* TRAVELPAYOUTS_DRIVE_START */}
<script
  data-noptimize="1"
  data-cfasync="false"
  data-wpfc-render="false"
  data-no-defer="1"
  data-cmp-ab="2"
  dangerouslySetInnerHTML={{
    __html: `
      (function () {
          var script = document.createElement("script");
          script.async = 1;
          script.setAttribute("data-cmp-ab","2");
          script.src = 'https://tpembars.com/NjA2MjIy.js?t=606222';
          document.head.appendChild(script);
      })();
    `,
  }}
/>
{/* TRAVELPAYOUTS_DRIVE_END */}
<body className="min-h-screen bg-[#090D18] font-sans text-white selection:bg-cyan-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}


