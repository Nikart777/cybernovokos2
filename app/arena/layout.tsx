import type { Metadata } from "next";
import NotificationSystem from "@/components/NotificationSystem";

export const metadata: Metadata = {
  title: "Арена Дуэлей | CyberX Новокосино",
  description: "Создавай лобби, ищи соперников и играй на интерес. Локальные турниры CS2, Dota 2, FIFA и UFC прямо в клубе на Новокосинской.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Арена Дуэлей — CyberX Новокосино",
    description: "Брось вызов другим игрокам клуба! Создай дуэль и докажи, кто здесь главный.",
    images: ['/og-image.jpg'],
  }
};

export default function ArenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NotificationSystem />
      {children}
    </>
  );
}