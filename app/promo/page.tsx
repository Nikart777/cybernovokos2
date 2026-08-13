import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PromoLanding from "@/components/PromoLanding";
import SchemaMarkup from "@/components/SchemaMarkup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "400 бонусов CyberX на первое посещение в Новокосино",
  description:
    "400 приветственных бонусов CyberX Новокосино за первую регистрацию. Бронируйте игровое место в приложении, оплачивайте до 20% бонусами и копите кэшбэк до 20%.",
  keywords: [
    "cyberx промокод",
    "cyberx промокод на первое посещение",
    "кибер х промокод",
    "промокод cyberx",
    "CyberX Новокосино промокод",
    "400 бонусов CyberX",
    "компьютерный клуб первое посещение",
  ],
  alternates: {
    canonical: "https://cyberx-novokosino.ru/promo",
  },
  openGraph: {
    title: "400 бонусов CyberX Новокосино на первое посещение",
    description: "Регистрируйтесь в приложении, получайте 400 бонусов и бронируйте игровое место.",
    url: "https://cyberx-novokosino.ru/promo",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "400 бонусов CyberX Новокосино",
      },
    ],
  },
};

const faqSchemaItems = [
  {
    question: "Как получить 400 бонусов CyberX?",
    answer:
      "Зарегистрируйтесь в приложении CyberX и выберите CyberX Новокосино. После регистрации на бонусный баланс сразу начисляются 400 бонусов.",
  },
  {
    question: "Можно ли потратить бонусы в первый визит?",
    answer:
      "Да. Бонусы доступны сразу после регистрации. 1 бонус равен 1 рублю, ими можно оплатить до 20% стоимости игрового времени. На DRIVE X бонусы не действуют.",
  },
  {
    question: "Как работают группы гостей и кэшбэк?",
    answer:
      "После каждой игровой сессии растет ваш уровень Киберкэш. Бронза действует до 24 часов, Серебро с 25, Золото с 90, Платина с 350, Бриллиант с 604 часов. Кэшбэк растет от 3% до 20%, а бонус на день рождения от 0 до 400 бонусов.",
  },
  {
    question: "Какие автобонусы начисляются при пополнении?",
    answer:
      "Для подходящих групп гостей бонусы начисляются автоматически: +100 при пополнении от 1 000 ₽, +250 от 2 000 ₽ и +350 от 3 000 ₽. Точный уровень и диапазон пополнения указаны в таблице на странице.",
  },
  {
    question: "Есть ли промокод CyberX на первое посещение?",
    answer:
      "400 стартовых бонусов выдаются за первую регистрацию. Если у вас есть код друга, укажите его при регистрации: это отдельная реферальная программа с дополнительными условиями.",
  },
];

export default function PromoPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSchemaItems.map((item) => ({
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
