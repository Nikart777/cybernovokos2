import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Арена Дуэлей | CyberX Новокосино",
  description: "Создавай лобби, ищи соперников и играй на интерес. Локальные турниры CS2, Dota 2, FIFA и UFC прямо в клубе на Новокосинской.",
  openGraph: {
    title: "Арена Дуэлей — CyberX Новокосино",
    description: "Брось вызов другим игрокам клуба! Создай дуэль и докажи, кто здесь главный.",
    images: ['/og-image.jpg'], // Используем общее изображение или можно сделать уникальное для арены
  }
};

export default function ArenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}