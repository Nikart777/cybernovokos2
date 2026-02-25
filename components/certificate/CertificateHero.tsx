import React from "react";

export default function CertificateHero() {
    return (
        <section className="relative px-6 py-16 md:py-24 flex flex-col items-center text-center overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10"></div>
                <img
                    className="w-full h-full object-cover opacity-50"
                    alt="CyberX Gaming Setup"
                    src="/zones/common-1.webp"
                />
            </div>

            <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
                <span className="inline-block text-[#00F0FF] font-chakra font-bold text-sm md:text-base tracking-widest uppercase bg-[#00F0FF]/10 px-4 py-2 rounded-full border border-[#00F0FF]/20 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    Оригинальный подарок парню... бессонная ночь в CyberX
                </span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-tactic italic uppercase font-black leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF] drop-shadow-[0_0_20px_rgba(255,46,99,0.4)]">
                    ЛУЧШИЙ ПОДАРОК ПАРНЮ <br className="hidden md:block" /> ДЛЯ НАСТОЯЩЕГО ГЕЙМЕРА
                </h1>

                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-inter font-medium leading-relaxed mb-4">
                    Не знаете, что подарить мужчине на 23 февраля или день рождения? Носки и пена — прошлый уровень. Дарите эмоции и адреналин, которые он точно оценит!
                </p>
            </div>
        </section>
    );
}
