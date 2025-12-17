import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter } from "next/font/google"; 
import JsonLd from "@/components/JsonLd"; // Импортируем компонент разметки
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
    yandex: '', 
    google: '', 
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
        <JsonLd /> {/* Вставляем JSON-LD разметку */}
        {children}
      </body>
    </html>
  );
}