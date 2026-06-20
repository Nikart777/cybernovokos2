"use client";

import { MapPin, Phone, Clock, MessageSquare, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  {
    icon: Phone,
    label: "ТЕЛЕФОН",
    value: "+7 (985) 128-95-38",
    sub: "Бронь / Поддержка",
    href: "tel:+79851289538"
  },
  {
    icon: MessageSquare,
    label: "ТЕЛЕГРАМ",
    value: "@CyberXNovokos",
    sub: "Онлайн Администратор",
    href: "https://t.me/CyberXNovokos"
  },
  {
    icon: MapPin,
    label: "ЛОКАЦИЯ",
    value: "НОВОКОСИНСКАЯ 32",
    sub: "ТЦ Новокосино, 2 этаж",
    href: "https://yandex.ru/maps/-/CTATeV~u"
  },
  {
    icon: Clock,
    label: "ГРАФИК",
    value: "24 / 7",
    sub: "Без выходных",
    href: null
  }
];

export default function Contacts() {
  return (
    <section id="contacts" className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-t-2 border-white/5">
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,46,99,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto max-w-[1400px] px-4 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-chakra font-black text-[10px] text-[#FF2E63] tracking-widest uppercase bg-[#111] border border-[#FF2E63]/20 px-2 py-1 skew-x-[-6deg]">
              <span className="block skew-x-[6deg]">НА СВЯЗИ</span>
            </span>
          </div>
          <h2 className="font-tactic font-black text-4xl md:text-7xl text-white uppercase leading-[0.85] italic">
            КОНТАКТЫ <br className="hidden md:block" />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>И ЛОКАЦИЯ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Contacts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-max">
            {contacts.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-[#0A0A0A] border-2 border-white/10 hover:border-[#FF2E63] transition-colors p-6 skew-x-[-6deg]"
              >
                  <div className="skew-x-[6deg]">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-[#111] border border-white/10 flex items-center justify-center text-[#FF2E63] group-hover:scale-110 transition-transform">
                            <c.icon size={20} />
                        </div>
                        <div className="font-chakra font-black text-[9px] text-white/30 uppercase tracking-widest">
                            {c.label}
                        </div>
                    </div>
                    
                    <div className="font-tactic italic font-black text-xl text-white uppercase mb-1">
                        {c.value}
                    </div>
                    <div className="font-chakra text-[10px] font-bold text-white/50 uppercase tracking-widest">
                        {c.sub}
                    </div>

                    {c.href && (
                        <a href={c.href} target={c.href.startsWith('http') ? '_blank' : '_self'} className="absolute inset-0 z-10" />
                    )}

                    {c.href && (
                        <div className="absolute bottom-4 right-4 text-white/20 group-hover:text-[#FF2E63] transition-colors">
                            <ChevronRight size={20} />
                        </div>
                    )}
                  </div>
              </motion.div>
            ))}

            <div className="sm:col-span-2">
                <a
                  href="https://yandex.ru/maps/-/CTATeV~u"
                  target="_blank"
                  className="group relative w-full inline-flex items-center justify-center gap-4 px-8 py-5 bg-[#FF2E63] border-2 border-[#FF2E63] skew-x-[-6deg] hover:bg-transparent hover:text-[#FF2E63] transition-colors"
                >
                  <div className="skew-x-[6deg] flex items-center gap-4">
                      <span className="font-tactic font-black italic text-sm md:text-lg text-white group-hover:text-[#FF2E63] uppercase">ПОСТРОИТЬ МАРШРУТ</span>
                      <MapPin size={20} className="text-white group-hover:text-[#FF2E63]" />
                  </div>
                </a>
            </div>
          </div>

          {/* Map */}
          <div className="relative w-full h-[400px] lg:h-full min-h-[400px] border-2 border-white/10 bg-[#111] overflow-hidden" 
               style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.867178%2C55.742007&z=17&pt=37.867178,55.742007,pm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              title="CyberX Новокосино на Яндекс.Картах"
            />
            
            {/* Overlay grid on map edges */}
            <div className="absolute inset-0 pointer-events-none border-[10px] border-[#050505]" />
          </div>

        </div>
      </div>
    </section>
  );
}
