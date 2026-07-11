import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificateScrollStory from "@/components/certificate/CertificateScrollStory";
import CertificateZonesImmersive from "@/components/certificate/CertificateZonesImmersive";
import CertificateTiers from "@/components/certificate/CertificateTiers";
import GiftCalculator from "@/components/GiftCalculator";
import CertificateSteps from "@/components/certificate/CertificateSteps";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Купить подарочный сертификат в компьютерный клуб в Новокосино",
  description: "Подарочный сертификат CyberX Новокосино для игры на ПК, PS5, автосимулятора и бара клуба. Электронный сертификат на любой номинал. Москва, ул. Новокосинская, 32.",
  alternates: {
    canonical: "https://cyberx-novokosino.ru/certificate",
  },
  keywords: "купить сертификат в компьютерный клуб, подарочный сертификат компьютерный клуб, сертификат CyberX Новокосино, подарок парню, что подарить мужчине, оригинальный подарок парню, подарок на 23 февраля парню, подарок на день рождения парню, сертификат",
};

export default function CertificatePage() {
  const telegramUrl = "https://t.me/CyberXNovokos";
  const telegramText = encodeURIComponent("Здравствуйте! Хочу приобрести подарочный сертификат в ваш киберклуб.");
  const certificateSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://cyberx-novokosino.ru/certificate#gift-certificate",
    name: "Подарочный сертификат CyberX Новокосино",
    description: "Электронный подарочный сертификат в компьютерный клуб CyberX Новокосино. Подходит для игровых зон ПК, PS5, автосимулятора и бара клуба.",
    image: "https://cyberx-novokosino.ru/certificates.webp",
    brand: {
      "@type": "Brand",
      name: "CyberX Новокосино",
    },
    category: "Подарочные сертификаты",
    areaServed: {
      "@type": "City",
      name: "Москва",
    },
    offers: {
      "@type": "Offer",
      url: "https://cyberx-novokosino.ru/certificate",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name: "CyberX Новокосино",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Новокосинская улица, 32",
          addressLocality: "Москва",
          addressCountry: "RU",
        },
      },
    },
  };
  const certificateFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "На что можно потратить подарочный сертификат CyberX Новокосино?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Сертификат можно использовать для оплаты игровых зон клуба: ПК, PS5, автосимулятора, закрытых комнат, а также бара, напитков и снеков.",
        },
      },
      {
        "@type": "Question",
        name: "Можно ли купить сертификат онлайн?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, сертификат оформляется онлайн через Telegram клуба. Мы согласуем номинал, подготовим электронный сертификат и начислим сумму на аккаунт получателя.",
        },
      },
      {
        "@type": "Question",
        name: "Где находится компьютерный клуб?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CyberX Новокосино находится в Москве по адресу: улица Новокосинская, 32, рядом с метро Новокосино.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#050505] text-slate-100 overflow-x-clip relative">
      <SchemaMarkup schema={certificateSchema} />
      <SchemaMarkup schema={certificateFaqSchema} />
      <Header />

      {/* Intro: card → value → nominal → "что такое CyberX" (lead-in to zones) */}
      <CertificateScrollStory />

      {/* Immersive zones (contained multi-image slides) */}
      <CertificateZonesImmersive telegramUrl={telegramUrl} telegramText={telegramText} />

      {/* Immersive nominal tiers: рад / очень счастлив / носит на руках */}
      <CertificateTiers />

      {/* Interactive calculator (needs clicks — kept as a normal section) */}
      <div id="calculator">
        <GiftCalculator />
      </div>

      <CertificateSteps telegramUrl={telegramUrl} telegramText={telegramText} />

      {/* SEO copy — real page text for crawlers, visually calm */}
      <section className="px-6 py-16 relative z-10 border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-tactic italic uppercase font-black text-white mb-5">
            Сертификат в компьютерный клуб в Новокосино
          </h2>
          <div className="grid gap-5 md:grid-cols-3 text-sm md:text-base text-slate-300 font-inter leading-relaxed">
            <p>
              Подарочный сертификат CyberX Новокосино подходит для тех, кто хочет подарить не вещь, а вечер в игровом клубе: мощные ПК, PS5, приватные комнаты, автосимулятор и бар.
            </p>
            <p>
              Номинал можно выбрать под конкретный сценарий: пару часов после работы, ночной пакет, игру вдвоем, командный bootcamp или заезд на автосимуляторе.
            </p>
            <p>
              Клуб находится в Москве по адресу Новокосинская, 32. Сертификат оформляется онлайн, а сумма начисляется на аккаунт получателя в приложении CyberX.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
