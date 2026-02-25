import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificateHero from "@/components/certificate/CertificateHero";
import CertificateAbout from "@/components/certificate/CertificateAbout";
import GiftCalculator from "@/components/GiftCalculator";
import CertificateZones from "@/components/certificate/CertificateZones";
import CertificateHappinessScale from "@/components/certificate/CertificateHappinessScale";
import CertificateSteps from "@/components/certificate/CertificateSteps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подарок парню: подарочный сертификат в компьютерный клуб | CyberX Новокосино",
  description: "Ищете оригинальный подарок парню или мужчине на 23 февраля или день рождения? Подарочные сертификаты в компьютерный клуб CyberX Новокосино на любой номинал.",
  alternates: {
    canonical: "https://cyberx-novokosino.ru/certificate",
  },
  keywords: "подарок парню, что подарить мужчине, оригинальный подарок парню, подарок на 23 февраля парню, подарок на день рождения парню, сертификат",
};

export default function CertificatePage() {
  const telegramUrl = "https://t.me/CyberXNovokos";
  const telegramText = encodeURIComponent("Здравствуйте! Хочу приобрести подарочный сертификат в ваш киберклуб.");

  return (
    <main className="min-h-screen flex flex-col bg-[#050505] text-slate-100 overflow-x-hidden relative">
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
        <CertificateAbout telegramUrl={telegramUrl} telegramText={telegramText} />

        {/* ZONES GALLERY for CERTIFICATES*/}
        <CertificateZones />

        <GiftCalculator />

        <CertificateHappinessScale />
        <CertificateSteps telegramUrl={telegramUrl} telegramText={telegramText} />

      </div>

      <Footer />
    </main>
  );
}
