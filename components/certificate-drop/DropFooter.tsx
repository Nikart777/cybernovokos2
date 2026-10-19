import Link from "next/link";
import { MapPinned } from "lucide-react";
import { GOOGLE_MAPS_URL } from "@/lib/googleBusiness";
import { MAPS_URL } from "./model";

// Slim footer for the certificate pages: address, phone and hours already sit
// in the final block above, so only brand, a short nav, socials and maps remain.

const NAV = [
    { name: "Главная", href: "/" },
    { name: "Игровые зоны", href: "/#zones" },
    { name: "Цены", href: "/prices" },
    { name: "Автосимуляторы", href: "/simracing" },
];

const MAPS = [
    { name: "Яндекс Карты", href: MAPS_URL },
    { name: "2ГИС", href: "https://go.2gis.com/EjmFC" },
    { name: "Google Карты", href: GOOGLE_MAPS_URL },
];

function TelegramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.75 6.73-2.91 8.07-3.48 3.84-1.63 4.63-1.91 5.15-1.92.12 0 .38.03.55.17.14.12.18.28.2.44.02.1.02.21.01.29z" />
        </svg>
    );
}

function TikTokIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

const SOCIALS = [
    { name: "Telegram-канал", href: "https://t.me/CyberXNovokos", icon: <TelegramIcon /> },
    { name: "Чат в Telegram", href: "https://t.me/cyberxn32", icon: <TelegramIcon /> },
    { name: "ВКонтакте", href: "https://vk.com/club224403383", icon: <span className="font-inter text-[13px] font-extrabold">VK</span> },
    { name: "TikTok", href: "https://www.tiktok.com/@cyberxnovokosino", icon: <TikTokIcon /> },
];

const iconBtn =
    "grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[#d9d3f5] transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

export default function DropFooter() {
    return (
        <footer className="relative border-t border-white/[0.07] bg-[#0a0817] font-inter">
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1.2fr] md:gap-8 lg:py-14">
                <div>
                    <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo new.png" alt="CyberX" className="h-7 w-auto" />
                    </Link>
                    <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-[#8f88b3]">
                        Компьютерный клуб в Новокосино: игровые ПК, PS5, автосимуляторы и бар.
                    </p>
                </div>

                <nav aria-label="Навигация по сайту">
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
                        {NAV.map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} className="text-[15px] text-[#c8c1ea] transition-colors hover:text-white">
                                    {l.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="space-y-6">
                    <div>
                        <p className="mb-3 text-[13px] text-[#8f88b3]">Мы в соцсетях</p>
                        <div className="flex flex-wrap gap-2.5">
                            {SOCIALS.map((x) => (
                                <a key={x.name} href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.name} title={x.name} className={iconBtn}>
                                    {x.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="mb-3 text-[13px] text-[#8f88b3]">Мы на картах</p>
                        <div className="flex flex-wrap gap-2.5">
                            {MAPS.map((m) => (
                                <a
                                    key={m.name}
                                    href={m.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-[14px] font-medium text-[#d9d3f5] transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <MapPinned className="h-4 w-4" aria-hidden />
                                    {m.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/[0.05]">
                <p className="mx-auto max-w-[1280px] px-4 py-5 text-[12px] text-[#6f6894] sm:px-6">© 2026 CyberX Новокосино</p>
            </div>
        </footer>
    );
}
