<<<<<<< HEAD
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aim God — Тренируй аим и забирай бонусы",
    description: "Играй в Aim God от CyberX Новокосино. Улучшай точность, ставь рекорды и получай бонусы на игровой баланс. Твой киберспортивный скилл начинается здесь!",
    keywords: ["Aim God", "тренировка аима", "бонусы CyberX", "кибер клуб Новокосино игра"],
    robots: {
        index: false,
        follow: false,
    },
};

export default function AimLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
=======
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aim Training | Проверка реакции | CyberX",
  description: "Проверь свою реакцию и точность в нашей мини-игре. Набери очки и получи промокод на бонусы в компьютерном клубе!",
  openGraph: {
    title: "Aim Training — Тренировка аима",
    description: "Мини-игра на реакцию от CyberX. Выбивай мишени, копи комбо и забирай призы на баланс.",
    images: ['/og-image.jpg'],
  }
};

export default function AimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f
