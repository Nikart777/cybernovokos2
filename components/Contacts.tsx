'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Clock, Smartphone, ChevronRight } from 'lucide-react';

const contactMethods = [
    {
        icon: Phone,
        title: 'Телефон',
        value: '+7 (985) 128-95-38',
        href: 'tel:+79851289538',
        color: '#FF2E63'
    },
    {
        icon: MessageSquare,
        title: 'Telegram',
        value: '@CyberXNovokos',
        href: 'https://t.me/CyberXNovokos',
        color: '#00F0FF'
    },
    {
        icon: MapPin,
        title: 'Адрес',
        value: 'ул. Новокосинская, 32',
        href: 'https://yandex.ru/maps/-/CLhuNRiq',
        color: '#B900FF'
    },
    {
        icon: MessageSquare,
        title: 'Чат с админом',
        value: 'Написать на сайте',
        action: 'open-chat',
        color: '#FF2E63'
    }
];

const socialLinks = [
    {
        name: 'Telegram канал',
        url: 'https://t.me/CyberXNovokos',
        icon: 'telegram',
        color: '#FF2E63'
    },
    {
        name: 'Telegram чат',
        url: 'https://t.me/cyberxn32',
        icon: 'telegram',
        color: '#00F0FF'
    },
    {
        name: 'VKontakte',
        url: 'https://vk.com/club224403383',
        icon: 'vk',
        color: '#0077FF'
    },
    {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@cyberxnovokosino',
        icon: 'tiktok',
        color: '#FF2E63'
    },
    {
        name: 'Яндекс.Карты',
        url: 'https://yandex.ru/maps/-/CPA4UJ~I',
        icon: 'yandex',
        color: '#FFCC00'
    },
    {
        name: '2GIS',
        url: 'https://go.2gis.com/EjmFC',
        icon: '2gis',
        color: '#00D664'
    }
];

export default function Contacts() {
    return (
        <section id="contacts" className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <h2 className="font-tactic font-black text-4xl md:text-7xl uppercase italic text-white leading-none mb-6">
                                МЫ НА <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF]">КОННЕКТЕ</span>
                            </h2>
                            <p className="font-chakra font-bold text-white/40 uppercase tracking-widest max-w-md">
                                Приходи играть, бронируй место через приложение или просто заглядывай в гости 24/7.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {contactMethods.map((item, idx) =>
                                item.href ? (
                                    <motion.a
                                        key={idx}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl hover:border-white/20 transition-all group"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: `${item.color}10`, color: item.color }}
                                        >
                                            <item.icon size={24} />
                                        </div>
                                        <div className="font-chakra font-black text-[10px] uppercase text-white/30 tracking-widest mb-1">{item.title}</div>
                                        <div className="font-chakra font-black text-sm text-white uppercase tracking-wider">{item.value}</div>
                                    </motion.a>
                                ) : (
                                    <motion.button
                                        key={idx}
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-neutral-900/50 border border-[#FF2E63]/20 p-6 rounded-3xl hover:border-[#FF2E63]/50 transition-all group text-left"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: `${item.color}10`, color: item.color }}
                                        >
                                            <item.icon size={24} />
                                        </div>
                                        <div className="font-chakra font-black text-[10px] uppercase text-white/30 tracking-widest mb-1">{item.title}</div>
                                        <div className="font-chakra font-black text-sm text-white uppercase tracking-wider">{item.value}</div>
                                    </motion.button>
                                )
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                                className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl"
                            >
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-[#FF2E63]/10 text-[#FF2E63]">
                                    <Clock size={24} />
                                </div>
                                <div className="font-chakra font-black text-[10px] uppercase text-white/30 tracking-widest mb-1">Режим работы</div>
                                <div className="font-chakra font-black text-sm text-white uppercase tracking-wider italic">24/7 КРУГЛОСУТОЧНО</div>
                            </motion.div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                                className="inline-flex items-center gap-4 bg-[#FF2E63] px-8 py-5 rounded-2xl font-tactic font-black text-lg uppercase italic tracking-widest hover:scale-105 transition-all text-white shadow-[0_10px_30px_rgba(255,46,99,0.3)]"
                            >
                                <Smartphone size={24} />
                                Бронь в приложении
                                <ChevronRight size={20} />
                            </button>

                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                                className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl font-tactic font-black text-lg uppercase italic tracking-widest hover:bg-white/10 transition-all text-white"
                            >
                                <MessageSquare size={24} className="text-[#FF2E63]" />
                                Чат с админом
                            </button>
                        </div>

                        {/* Social Media Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 bg-gradient-to-br from-[#FF2E63]/10 to-[#B900FF]/10 border border-[#FF2E63]/30 p-8 rounded-3xl backdrop-blur-sm"
                        >
                            <h3 className="font-tactic font-black text-2xl uppercase text-white mb-6 flex items-center gap-3">
                                <span className="text-[#FF2E63]">•</span>
                                Мы в соцсетях
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {socialLinks.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:border-white/30 transition-all group flex flex-col items-center justify-center text-center gap-2"
                                        title={social.name}
                                    >
                                        <SocialIcon icon={social.icon} color={social.color} />
                                        <span className="font-chakra font-bold text-[9px] text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                                            {social.name}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[40px] overflow-hidden border border-white/10 group">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=37.867172%2C55.741887&z=17&pt=37.867172,55.741887,pm2rdm"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        ></iframe>
                        <div className="absolute inset-0 pointer-events-none border-[20px] border-[#050505] rounded-[40px]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function SocialIcon({ icon, color }: { icon: string; color: string }) {
    const size = 28;

    switch (icon) {
        case 'telegram':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.75 6.73-2.91 8.07-3.48 3.84-1.63 4.63-1.91 5.15-1.92.12 0 .38.03.55.17.14.12.18.28.2.44.02.1.02.21.01.29z" />
                </svg>
            );
        case 'vk':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.523-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                </svg>
            );
        case 'tiktok':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
            );
        case 'yandex':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
            );
        case '2gis':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.5c0 .83-.67 1.5-1.5 1.5H14v-2h1.5c.28 0 .5-.22.5-.5V13h-2.5c-.83 0-1.5-.67-1.5-1.5v-2c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v6zm-10 0V13H5.5c-.28 0-.5.22-.5.5v1h2V16H5.5c-.83 0-1.5-.67-1.5-1.5v-2C4 11.67 4.67 11 5.5 11h3c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5H7zm7-5.5h-2v1h2v-1z" />
                </svg>
            );
        default:
            return null;
    }
}
