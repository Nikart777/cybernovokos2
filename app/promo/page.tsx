import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PromoLanding from "@/components/PromoLanding";
import SchemaMarkup from "@/components/SchemaMarkup";
import { PROMO_FAQS } from "@/components/promo/faqData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "400-800 бонусов CyberX, рулетка DropX от 700 ₽ и акции в Новокосино",
  description:
    "400 бонусов CyberX Новокосино за регистрацию, 800 с промокодом друга и беспроигрышный кейс рулетки DropX в клубе при пополнении от 700 ₽. Поводы прийти 24/7.",
  keywords: [
    "cyberx промокод",
    "cyberx промокод на первое посещение",
    "кибер х промокод",
    "промокод cyberx",
    "CyberX Новокосино промокод",
    "400 бонусов CyberX",
    "800 бонусов CyberX",
    "рулетка DropX CyberX",
    "приведи друга CyberX",
    "реферальный промокод CyberX",
    "компьютерный клуб первое посещение",
  ],
  alternates: {
    canonical: "https://cyberx-novokosino.ru/promo",
  },
  openGraph: {
    title: "До 800 бонусов и рулетка DropX от 700 ₽ — CyberX Новокосино",
    description:
      "400 бонусов за регистрацию, ещё 400 по коду друга, 5% от пополнений и рулетка призов DropX в клубе от 700 ₽.",
    url: "https://cyberx-novokosino.ru/promo",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Бонусы и рулетка DropX в CyberX Новокосино",
      },
    ],
  },
};

export default function PromoPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PROMO_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <SchemaMarkup schema={faqSchema} />
      <Header />
      <PromoLanding />
      <Footer />
    </main>
  );
}
