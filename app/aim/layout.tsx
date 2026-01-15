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
