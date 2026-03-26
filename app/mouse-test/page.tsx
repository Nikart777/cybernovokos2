import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MouseTestClient from "./MouseTestClient";

export const metadata: Metadata = {
    title: "Тест мыши на даблклик — Диагностика оборудования",
    description:
        "Бесплатный онлайн тестер мыши на даблклик (double click). Проверьте ЛКМ, ПКМ и СКМ на ложные двойные нажатия. Диагностика, критерии и рекомендации от CyberX Новокосино.",
    alternates: {
        canonical: "https://cyberx-novokosino.ru/mouse-test",
    },
    openGraph: {
        title: "Тест мыши на даблклик — CyberX Новокосино",
        description:
            "Проверь свою мышь на ложные двойные нажатия. Бесплатная онлайн диагностика оборудования.",
        url: "https://cyberx-novokosino.ru/mouse-test",
        type: "website",
    },
};

export default function MouseTestPage() {
    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white relative">
            <Header />
            <MouseTestClient />
            <Footer />
        </main>
    );
}
