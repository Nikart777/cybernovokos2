import Header from "@/components/Header";
import Hero from "@/components/HeroNew";
import ZonesPreview from "@/components/ZonesPreview";
import PromotionsNew from "@/components/PromotionsNew";
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
  title: "CyberX Новокосино | Главная | Цены, Промокоды, RTX 5070",
  description: "Ищете компьютерный клуб в Новокосино (Москва)? ✅ Забирай промокод на первое посещение! ⚡ Топовые игровые ПК на RTX 5070, мониторы 400 Гц. 📍 ул. Новокосинская, 32. 🕒 Работаем 24/7. Смотреть цены...",
  alternates: {
    canonical: "https://cyberx-novokosino.ru",
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
    <main className="min-h-screen flex flex-col bg-[#050505] text-white relative">
      <Header />
      <Hero />
      {pricingData && <ZonesPreview pricingData={pricingData} />}
      <PromotionsNew />
      <Reviews />
      <FAQ />
      <Contacts />
      <SEOBlock />
      <Footer />
    </main>
  );
}
