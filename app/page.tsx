import Header from "@/components/Header";
import Hero from "@/components/HeroNew";
import ZonesPreview from "@/components/ZonesPreview";
import PromotionsNew from "@/components/PromotionsNew";
import CertificateBanner from "@/components/CertificateBanner";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import SEOBlock from "@/components/SEOBlock";
import fs from "fs";
import path from "path";
import { PricingData } from "./lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "CyberX Новокосино | Главная | Цены, Промокоды, RTX 5070",
  },
  description: "Ищете компьютерный клуб в Новокосино (Москва)? ✅ Забирай промокод на первое посещение! ⚡ Топовые игровые ПК на RTX 5070, мониторы 400 Гц. 📍 ул. Новокосинская, 32. 🕒 Работаем 24/7. Смотреть цены...",
  alternates: {
    canonical: "https://cyberx-novokosino.ru/",
  },
};

export default function Home() {
  const filePath = path.join(process.cwd(), "data", "prices.json");
  let pricingData: PricingData | undefined;

  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    pricingData = JSON.parse(jsonData);
  } catch (e) {
    console.error("Error reading prices.json for Home page:", e);
  }

  return (
    <main className="min-h-screen flex flex-col bg-transparent text-white relative">
      {/* Единый стильный фон всей страницы */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#030305]">
        {/* Кибер-сетка с затуханием к краям */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 flex flex-col w-full">
        <Header />
        <Hero />
        {pricingData && <ZonesPreview pricingData={pricingData} />}
        <CertificateBanner />
        <PromotionsNew />
        <Reviews />
        <FAQ />
        <SEOBlock />
        <Contacts />
        <Footer />
      </div>
    </main>
  );
}
