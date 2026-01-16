import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ZoneHeader from "@/components/ZoneHeader";
import Zones from "@/components/Zones";
import PriceHeader from "@/components/PriceHeader";
import Prices from "@/components/Prices";
import PromoHeader from "@/components/PromoHeader";
import Promotions from "@/components/Promotions";
import AimControl from "@/components/AimControl";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import ClubMap from "@/components/ClubMap";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";
import { PricingData } from "./lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberX Новокосино | Компьютерный клуб в Москве | ТЦ Новокосино 24/7",
  description: "Лучший игровой клуб в Москве (Новокосино). Мощные ПК с RTX 5070, мониторы 400Гц, VIP-зоны, PS5 и автосимуляторы. Уютная атмосфера и топовое железо 24/7.",
  alternates: {
    canonical: "https://cyberx-novokosino.ru",
  },
};

export default function Home() {
  // Читаем данные для блока цен на сервере
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

      <ZoneHeader />
      <Zones />

      {/* Переместил карту загруженности сюда, сразу после зон */}
      <ClubMap />

      <PriceHeader />
      {pricingData && <Prices data={pricingData} />}

      <PromoHeader />
      <Promotions />

      <AimControl />

      <Reviews />

      <FAQ />

      <Contacts />
      <Footer />
    </main>
  );
}