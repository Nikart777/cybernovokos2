import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter } from "next/font/google"; 
import localFont from "next/font/local"; // <--- Импортируем загрузчик локальных шрифтов
import Script from "next/script";
import JsonLd from "@/components/JsonLd"; 
import "./globals.css";

// 1. Подключаем Google шрифты
const chakra = Chakra_Petch({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-chakra',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
  display: 'swap',
});

// 2. Подключаем локальный Tactic Sans "железобетонно"
const tactic = localFont({
  src: [
    {
      path: './fonts/TacticSansExd-Lgt.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/TacticSansExd-Reg.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/TacticSansExd-Bld.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/TacticSansExd-Blk.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/TacticSansExd-Ult.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-tactic', // Эта переменная пойдет в CSS
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cyberx-novokosino.ru'),
  title: {
    default: "Компьютерный клуб CyberX Новокосино | PS5, Автосимуляторы & RTX 5070",
    template: "%s | CyberX Новокосино"
  },
  description: "Лучший кибер клуб в Новокосино на ул. Новокосинская 32. Мощные ПК (RTX 4060/5070), профессиональные автосимуляторы, зона PS5 с диванами. Работаем круглосуточно!",
  keywords: [
    "Компьютерный клуб Новокосино",
    "CyberX Новокосино",
    "Компьютерный клуб рядом",
    "Автосимуляторы Москва",
    "Симрейсинг",
    "Аренда PS5 Новокосино",
    "RTX 5070",
    "Кибер клуб Москва",
    "Игровой клуб 24/7"
  ],
  alternates: {
    canonical: 'https://cyberx-novokosino.ru',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "CyberX Новокосино — Топовый компьютерный клуб",
    description: "RTX 5070, Автосимуляторы, PS5 и BootCamp. Залетай в игру на Новокосинской 32!",
    url: 'https://cyberx-novokosino.ru',
    siteName: 'CyberX Novokosino',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CyberX Novokosino Interior',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    yandex: 'cd200b561d2e01f0',
    google: 'IZVh2DMG0VJFUAK_GWOa5xpAq8v1PoooDPuaRl8O2RM',
  },
};

const GA_MEASUREMENT_ID = 'G-T6L6MKR798';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      {/* 3. Добавляем tactic.variable в className body */}
      <body className={`${chakra.variable} ${inter.variable} ${tactic.variable} bg-cyber-bg font-inter antialiased`}>
        <JsonLd />
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Яндекс.Метрика */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
             (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
             m[i].l=1*new Date();
             for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
             k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
             (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

             ym(105894251, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
             });
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/105894251" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}