import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter } from "next/font/google"; 
import Script from "next/script";
import JsonLd from "@/components/JsonLd"; 
import "./globals.css";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cyberx-novokosino.ru'),
  title: {
    default: "Компьютерный клуб CyberX Новокосино | Автосимуляторы & RTX 5070",
    template: "%s | CyberX Новокосино"
  },
  description: "Лучший кибер клуб в Новокосино на ул. Новокосинская 32. Мощные ПК (RTX 4060/5070), профессиональные автосимуляторы (руль и педали), зона PS5 с диванами и BootCamp. Работаем круглосуточно!",
  keywords: [
    "Компьютерный клуб Новокосино",
    "CyberX Новокосино",
    "Автосимуляторы Москва",
    "ПК клуб с рулем и педалями",
    "Симрейсинг",
    "Аренда PS5 Новокосино",
    "RTX 5070",
    "Кибер клуб Москва",
    "Игровой клуб 24/7"
  ],
  // Canonical ссылка (защита от дублей)
  alternates: {
    canonical: 'https://cyberx-novokosino.ru',
  },
  // Иконки и Манифест (PWA)
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Добавьте эту картинку в public, если есть
  },
  openGraph: {
    title: "CyberX Новокосино — Киберспортивное пространство",
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
    yandex: 'cd200b561d2e01f0', // Сюда код верификации Яндекс.Вебмастер
    google: 'IZVh2DMG0VJFUAK_GWOa5xpAq8v1PoooDPuaRl8O2RM', // Сюда код верификации Google Search Console 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${chakra.variable} ${inter.variable} bg-cyber-bg font-inter antialiased`}>
        {/* Яндекс.Метрика */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(105894251, "init", { // !!! ЗАМЕНИТЕ XXXXXXXX НА ВАШ ID !!!
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
        
        <JsonLd />
        {children}
      </body>
    </html>
  );
}