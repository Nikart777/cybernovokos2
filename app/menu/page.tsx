import { Metadata } from "next";
import "./menu.css";
import SmokeBackground from "@/components/SmokeBackground";
import MenuStage from "./MenuStage";

export const metadata: Metadata = {
    // absolute — чтобы шаблон из root layout не дописывал название клуба
    title: { absolute: "Меню лаунж-зоны" },
    description: "Меню лаунж-зоны и часы приёма заказов.",
    alternates: {
        canonical: "https://cyberx-novokosino.ru/menu",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function MenuPage() {
    return (
        <main className="relative min-h-[100svh] bg-[#030305] text-white lg:h-[100dvh] lg:overflow-hidden">
            {/* Кибер-сетка — фон как на главной */}
            <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />
            </div>

            <SmokeBackground />

            <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col px-5 py-14 md:px-10 md:py-20 lg:h-full lg:px-[clamp(2rem,4.5vw,5rem)] lg:py-[clamp(1.75rem,4.5vh,3.25rem)]">
                <MenuStage />
            </div>
        </main>
    );
}
