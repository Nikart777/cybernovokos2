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
                            {contactMethods.map((item, idx) => (
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
                            ))}

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

                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                            className="inline-flex items-center gap-4 bg-[#FF2E63] px-8 py-5 rounded-2xl font-tactic font-black text-lg uppercase italic tracking-widest hover:scale-105 transition-all text-white"
                        >
                            <Smartphone size={24} />
                            Бронь в приложении
                            <ChevronRight size={20} />
                        </button>
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
