import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PromoLanding from "@/components/PromoLanding";
import SchemaMarkup from "@/components/SchemaMarkup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "400-800 бонусов CyberX и промокод друга в Новокосино",
  description:
    "Получите 400 бонусов CyberX Новокосино за регистрацию или 800 с промокодом друга. Пригласившему начисляется 5% бонусами от всех пополнений друга.",
  keywords: [
    "cyberx промокод",
    "cyberx промокод на первое посещение",
    "кибер х промокод",
    "промокод cyberx",
    "CyberX Новокосино промокод",
    "400 бонусов CyberX",
    "800 бонусов CyberX",
    "приведи друга CyberX",
    "реферальный промокод CyberX",
    "компьютерный клуб первое посещение",
  ],
  alternates: {
    canonical: "https://cyberx-novokosino.ru/promo",
  },
  openGraph: {
    title: "До 800 бонусов CyberX Новокосино с промокодом друга",
    description: "400 бонусов за регистрацию, ещё 400 по коду друга и 5% пригласившему от будущих пополнений.",
    url: "https://cyberx-novokosino.ru/promo",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "До 800 бонусов CyberX Новокосино",
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
    question: "Как получить 800 бонусов по промокоду друга?",
    answer:
      "Новый гость получает 400 стандартных бонусов за регистрацию и ещё 400 после ввода уникального кода друга. Всего 800 бонусов на старт. Код находится в личном кабинете пригласившего гостя на ПК клуба, в разделе «Пригласить друга».",
  },
  {
    question: "Что получает тот, кто пригласил друга?",
    answer:
      "Пригласившему гостю всегда начисляются 5% бонусами от всех пополнений друга. Например, при пополнении на 1 000 ₽ вы получите 50 бонусов.",
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
