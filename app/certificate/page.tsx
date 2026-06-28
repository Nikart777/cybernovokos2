import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificateHero from "@/components/certificate/CertificateHero";
import CertificateAbout from "@/components/certificate/CertificateAbout";
import GiftCalculator from "@/components/GiftCalculator";
import CertificateZones from "@/components/certificate/CertificateZones";
import CertificateHappinessScale from "@/components/certificate/CertificateHappinessScale";
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
    <main className="min-h-screen flex flex-col bg-[#050505] text-slate-100 overflow-x-hidden relative">
      <SchemaMarkup schema={certificateSchema} />
      <SchemaMarkup schema={certificateFaqSchema} />
      <Header />

      <div className="relative flex flex-col w-full z-10 pt-[90px]">
        {/* Background Mesh for entire page */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 46, 99, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(185, 0, 255, 0.4) 0px, transparent 50%)'
            }}
          />
        </div>

        {/* Separated Components Layer */}
        <CertificateHero />
        <section className="px-6 py-12 relative z-10">
          <div className="container mx-auto max-w-5xl">
            <div className="border border-white/10 bg-white/[0.04] rounded-3xl p-6 md:p-10">
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
          </div>
        </section>
        <CertificateAbout telegramUrl={telegramUrl} telegramText={telegramText} />

        {/* ZONES GALLERY for CERTIFICATES*/}
        <CertificateZones />

        <div id="calculator">
          <GiftCalculator />
        </div>

        <CertificateHappinessScale />
        <CertificateSteps telegramUrl={telegramUrl} telegramText={telegramText} />

      </div>

      <Footer />
    </main>
  );
}
