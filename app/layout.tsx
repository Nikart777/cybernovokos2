import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { Chakra_Petch, Inter } from 'next/font/google';
import Script from "next/script";
import StickyBar from "@/components/StickyBar";
import BookingModal from "@/components/BookingModal";
import PromoModals from "@/components/PromoModals";
import LegalModals from "@/components/LegalModals";
import SchemaMarkup from "@/components/SchemaMarkup";
import ChatBot from "@/components/ChatBot";

// Локальные шрифты Tactic Sans
const tacticSans = localFont({
    src: [
        { path: './fonts/TacticSansExd-Lgt.woff', weight: '300', style: 'normal' },
        { path: './fonts/TacticSansExd-Reg.woff', weight: '400', style: 'normal' },
        { path: './fonts/TacticSansExd-Bld.woff', weight: '700', style: 'normal' },
        { path: './fonts/TacticSansExd-Blk.woff', weight: '900', style: 'normal' },
        { path: './fonts/TacticSansExd-Ult.woff', weight: '950', style: 'normal' },
    ],
    variable: '--font-tactic'
});

const chakra = Chakra_Petch({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-chakra'
});

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-inter'
});

export const viewport: Viewport = {
    themeColor: '#050505',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL('https://cyberx-novokosino.ru'),
    title: {
        default: "CyberX Новокосино | Компьютерный клуб Москва | 24/7",
        template: "%s | CyberX Новокосино"
    },
    description: "Лучший компьютерный клуб в Новокосино (Москва). RTX 5070, 400Гц, PS5 Lounge и профессиональные автосимуляторы. Работаем круглосуточно 24/7. Пакеты от 100 руб.",
    keywords: ["компьютерный клуб Новокосино", "CyberX Москва", "киберклуб ВАО", "где поиграть в PS5 Москва", "симрейсинг Новокосино", "компьютерный клуб рядом"],
    authors: [{ name: "CyberX Novokosino" }],
    creator: "CyberX Novokosino",
    publisher: "CyberX Novokosino",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: "https://cyberx-novokosino.ru",
        title: "CyberX Новокосино | Топовый компьютерный клуб в Москве",
        description: "RTX 5070, PS5, Sim Racing. Играй на профессиональном железе 24/7.",
        siteName: "CyberX Новокосино",
        images: [{
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "CyberX Новокосино"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "CyberX Новокосино | Компьютерный клуб 24/7",
        description: "Играй на мощных ПК в Новокосино. Ул. Новокосинская, 32.",
        images: ["/og-image.jpg"],
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
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'cd200b561d2e01f0',
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'IZVh2DMG0VJFUAK_GWOa5xpAq8v1PoooDPuaRl8O2RM',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "CyberX Новокосино",
        "image": "https://cyberx-novokosino.ru/og-image.jpg",
        "@id": "https://cyberx-novokosino.ru",
        "url": "https://cyberx-novokosino.ru",
        "telephone": "+79851289538",
        "priceRange": "100RUB - 1000RUB",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Новокосинская, 32",
            "addressLocality": "Москва",
            "postalCode": "111673",
            "addressCountry": "RU"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 55.742007,
            "longitude": 37.867178
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://vk.com/cyberx_novokosino"
        ]
    };

    return (
        <html lang="ru" className={`${tacticSans.variable} ${chakra.variable} ${inter.variable}`}>
            <head>
                <SchemaMarkup schema={businessSchema} />
                {/* Yandex.Metrika counter */}
                <Script id="yandex-metrika" strategy="afterInteractive">
                    {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=105894251", "ym");

            ym(105894251, "init", {
                  ssr:true,
                  webvisor:true,
                  clickmap:true,
                  ecommerce:"dataLayer",
                  accurateTrackBounce:true,
                  trackLinks:true
            });
          `}
                </Script>
            </head>
            <body className="bg-[#050505] text-white selection:bg-[#FF2E63] selection:text-white antialiased overflow-x-hidden">
                {children}
                <noscript><div><img src="https://mc.yandex.ru/watch/105894251" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>

                {/* Глобальные UI компоненты */}
                <StickyBar />
                <ChatBot />
                <BookingModal />
                <PromoModals />
                <LegalModals />
            </body>
        </html>
    );
}
