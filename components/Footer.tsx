import Link from 'next/link';
import { MapPin, Phone, Instagram, ChevronRight, MapPinned } from 'lucide-react';

const links = [
    { name: 'Главная', href: '/' },
    { name: 'Цены', href: '/prices' },
    { name: 'Sim Racing', href: '/simracing' },
    { name: 'Контакты', href: '/contacts' },
];

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1 border-r border-white/5 pr-8">
                        <Link href="/" className="inline-block mb-6">
                            <div className="flex items-baseline">
                                <span className="font-tactic font-black text-2xl tracking-tighter text-white uppercase italic">CYBER</span>
                                <span className="font-tactic font-black text-3xl tracking-tighter text-[#FF2E63] italic -ml-1">X</span>
                            </div>
                        </Link>
                        <p className="text-white/40 text-xs font-chakra font-bold leading-relaxed mb-6 uppercase tracking-wider">
                            ТВОЯ ИГРОВАЯ ВСЕЛЕННАЯ <br /> В НОВОКОСИНО. ЛУЧШЕЕ ЖЕЛЕЗО <br /> И АТМОСФЕРА КИБЕРСПОРТА.
                        </p>
                        <h4 className="font-tactic font-black text-white uppercase mb-4 tracking-widest text-xs italic">Мы в соцсетях</h4>
                        <div className="flex flex-wrap items-center gap-3">
                            <a href="https://t.me/CyberXNovokos" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-[#FF2E63]/20 rounded-xl transition-all" title="Telegram канал">
                                <TelegramIcon size={18} className="text-[#FF2E63]" />
                            </a>
                            <a href="https://t.me/cyberxn32" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-[#FF2E63]/20 rounded-xl transition-all" title="Telegram чат">
                                <TelegramIcon size={18} className="text-[#00F0FF]" />
                            </a>
                            <a href="https://vk.com/club224403383" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 hover:bg-[#FF2E63]/20 rounded-xl transition-all flex items-center justify-center" title="VK">
                                <span className="text-[#0077FF] font-chakra font-black text-sm">VK</span>
                            </a>
                            <a href="https://www.tiktok.com/@cyberxnovokosino" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-[#FF2E63]/20 rounded-xl transition-all" title="TikTok">
                                <TikTokIcon size={18} className="text-[#FF2E63]" />
                            </a>
                            <a href="https://yandex.ru/maps/-/CPA4UJ~I" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-[#FF2E63]/20 rounded-xl transition-all" title="Яндекс.Карты">
                                <MapPinned size={18} className="text-[#FF2E63]" />
                            </a>
                            <a href="https://go.2gis.com/EjmFC" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 hover:bg-[#FF2E63]/20 rounded-xl transition-all flex items-center justify-center" title="2GIS">
                                <span className="text-[#00D664] font-chakra font-black text-xs">2GIS</span>
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className="font-tactic font-black text-white uppercase mb-8 tracking-widest text-sm italic">Навигация</h4>
                        <div className="flex flex-col gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="font-chakra font-bold text-xs uppercase text-white/40 hover:text-white transition-colors tracking-widest"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-tactic font-black text-white uppercase mb-8 tracking-widest text-sm italic">Контакты</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start gap-4">
                                    <MapPin size={20} className="text-[#FF2E63] mt-1 shrink-0" />
                                    <div>
                                        <div className="text-white font-chakra font-black text-xs uppercase tracking-widest mb-1">Адрес</div>
                                        <div className="text-white/40 font-chakra text-xs uppercase font-bold leading-relaxed">
                                            Москва, ул. Новокосинская, 32
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone size={20} className="text-[#FF2E63] mt-1 shrink-0" />
                                    <div>
                                        <div className="text-white font-chakra font-black text-xs uppercase tracking-widest mb-1">Телефон</div>
                                        <a href="tel:+79851289538" className="text-white/40 font-chakra text-xs uppercase font-bold hover:text-white transition-colors">
                                            +7 (985) 128-95-38
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="text-[10px] text-white/30 uppercase font-black mb-1">Режим работы</div>
                                    <div className="text-white font-tactic font-black text-lg skew-x-[-12deg] tracking-wider uppercase">
                                        КРУГЛОСУТОЧНО 24/7
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-8">
                    <p className="text-white/20 font-chakra text-[10px] uppercase font-bold tracking-widest order-2 md:order-1">
                        © 2026 CyberX Novokosino. Все права защищены.
                    </p>

                    <a
                        href="https://art-vision.online/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl transition-all duration-500 hover:bg-white hover:text-black overflow-hidden order-1 md:order-2"
                    >
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-chakra font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Сайт разработан</span>
                            <span className="text-xs font-tactic font-black uppercase tracking-tighter italic">ART.VISION</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#FF2E63] flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-700 shadow-[0_0_20px_rgba(255,46,99,0.3)]">
                            <ChevronRight size={20} className="text-white group-hover:text-black transition-colors" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF2E63] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </a>

                    <div className="flex gap-8 order-3">
                        <Link href="/privacy" className="text-white/20 font-chakra text-[10px] uppercase font-bold hover:text-white transition-colors tracking-widest">
                            Политика конфиденциальности
                        </Link>
                        <Link href="/terms" className="text-white/20 font-chakra text-[10px] uppercase font-bold hover:text-white transition-colors tracking-widest">
                            Оферта
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function TelegramIcon({ size, className }: any) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.75 6.73-2.91 8.07-3.48 3.84-1.63 4.63-1.91 5.15-1.92.12 0 .38.03.55.17.14.12.18.28.2.44.02.1.02.21.01.29z" />
        </svg>
    );
}

function TikTokIcon({ size, className }: any) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}
