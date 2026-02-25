import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contacts from "@/components/Contacts";
import { Send, Target, Users, Rocket, Heart, Crown, Monitor, Gamepad2, Coffee, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подарок парню: подарочный сертификат в компьютерный клуб | CyberX Новокосино",
  description: "Ищете оригинальный подарок парню или мужчине на 23 февраля или день рождения? Подарочные сертификаты в компьютерный клуб CyberX Новокосино на любой номинал.",
  alternates: {
    canonical: "https://cyberx-novokosino.ru/certificate",
  },
  keywords: "подарок парню, что подарить мужчине, оригинальный подарок парню, подарок на 23 февраля парню, подарок на день рождения парню, сертификат",
};

export default function CertificatePage() {
  const telegramUrl = "https://t.me/CyberXNovokos";
  const telegramText = encodeURIComponent("Здравствуйте! Хочу приобрести подарочный сертификат в ваш киберклуб.");

  return (
    <main className="min-h-screen flex flex-col bg-[#050505] text-slate-100 overflow-x-hidden relative">
      <Header />

      <div className="relative flex flex-col w-full z-10 pt-[90px]">
        {/* Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 46, 99, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(185, 0, 255, 0.4) 0px, transparent 50%)'
            }}
          />
        </div>

        {/* HERO SECTION */}
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



        {/* ABOUT CERTIFICATE & HAPPINESS SCALE */}
        <section className="px-6 py-12 md:py-20 relative z-10 mt-4 overflow-hidden">
          <div className="container mx-auto max-w-6xl relative">
            <div className="relative bg-gradient-to-br from-white/10 to-transparent backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B900FF]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00F0FF]/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#FF2E63]/10 rounded-full blur-[60px] -translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left Side: About Certificate */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-tactic italic uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 drop-shadow-sm">
                    Что такое <br /><span className="text-[#FF2E63]">сертификат</span> CyberX?
                  </h2>
                  <p className="text-lg md:text-xl text-white font-inter leading-relaxed bg-white/5 p-5 rounded-2xl border-l-4 border-[#00F0FF]">
                    Это не просто вещь, это оригинальная услуга и <span className="text-[#00F0FF] font-bold uppercase tracking-wider block mt-1">уникальные эмоции!</span>
                  </p>
                  <p className="text-base md:text-lg text-slate-300 font-inter leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Наш подарочный сертификат — универсальный ключ в кибервселенную. Порадуйте любимого мужчину: офрмите подарочный сертификат CYBERX GIFT, а он сам решит, во что играть: мощнейшие ПК, расслабляющая зона PS5 или адреналиновый автосимулятор.
                  </p>
                </div>

                <div className="flex lg:col-span-5 justify-center items-center mt-8 lg:mt-0 w-full px-2 sm:px-0">
                  <div className="relative group w-full max-w-[420px] aspect-[1.586/1]">
                    {/* Outer Glow */}
                    <div className="absolute inset-0 bg-[#FF2E63] rounded-[24px] md:rounded-[32px] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-[pulse_4s_ease-in-out_infinite]"></div>

                    {/* Card Container */}
                    <div className="relative w-full h-full bg-gradient-to-br from-[#1A0A0E] via-[#2A0815] to-[#0A0205] border border-white/20 rounded-[24px] md:rounded-[32px] overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500 shadow-[0_20px_50px_rgba(255,46,99,0.3)] flex flex-col justify-between p-5 sm:p-6 md:p-8">

                      {/* Premium Texture & Patterns */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                      {/* Decorative Crosses (CyberX Style) */}
                      <div className="absolute -top-12 -right-8 opacity-10 pointer-events-none">
                        <div className="text-[120px] font-tactic italic leading-none text-[#FF2E63]">X</div>
                      </div>
                      <div className="absolute -bottom-16 -left-12 opacity-5 pointer-events-none">
                        <div className="text-[150px] font-tactic italic leading-none text-[#FF2E63]">X</div>
                      </div>

                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF2E63]/30 to-transparent transform -rotate-45 pointer-events-none"></div>

                      {/* Header */}
                      <div className="relative z-10 flex justify-between items-start">
                        <div className="flex flex-col">
                          <img src="/logo new.png" alt="CyberX Logo" className="h-4 sm:h-5 md:h-6 w-auto mb-1.5 object-contain" />
                          <span className="font-tactic italic uppercase text-white/80 text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] block">Подарочный сертификат</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
                          <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#FF2E63]" />
                        </div>
                      </div>

                      {/* Value content */}
                      <div className="relative z-10 flex flex-col items-center justify-center flex-grow py-3">
                        <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-[#FF2E63] drop-shadow-[0_0_20px_rgba(255,46,99,0.5)] whitespace-nowrap">
                          <span className="text-[3.5rem] min-[360px]:text-[4.5rem] md:text-[5.5rem] font-tactic italic font-black leading-none tracking-tighter">5000</span>
                          <span className="text-[2rem] min-[360px]:text-[2.5rem] md:text-[3rem] font-tactic italic font-black ml-1 md:ml-2 leading-none text-[#FF2E63]">₽</span>
                        </div>
                        <div className="text-white/90 font-chakra font-bold tracking-[0.2em] md:tracking-[0.3em] mt-3 uppercase text-[8px] min-[360px]:text-[10px] md:text-sm drop-shadow-md">
                          CyberX Novokosino
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="relative z-10 flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="font-chakra text-white/50 text-[8px] sm:text-[9px] md:text-[10px] tracking-widest uppercase mb-1">VALID FOR ALL ZONES</span>
                          <span className="font-chakra text-white/80 text-[10px] sm:text-[11px] md:text-xs tracking-[0.2em] uppercase font-bold">No. 0001</span>
                        </div>

                        {/* EMV Chip Simulation */}
                        <div className="w-8 h-6 sm:w-10 sm:h-7 md:w-12 md:h-8 rounded-md border border-white/30 bg-gradient-to-br from-yellow-200/20 via-yellow-500/20 to-yellow-700/20 flex flex-col justify-evenly px-1 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] mix-blend-overlay"></div>
                          <div className="w-full h-[1px] bg-white/30"></div>
                          <div className="w-full h-[1px] bg-white/30"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Action Button (Moved below on Mobile) */}
              <div className="mt-10 md:mt-14 flex justify-center z-10 relative">
                <a
                  href={`${telegramUrl}?text=${telegramText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full md:w-auto items-center justify-center gap-3 bg-gradient-to-r from-[#FF2E63] to-[#B900FF] border border-white/10 text-white font-chakra italic uppercase py-5 px-10 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(255,46,99,0.4)] hover:shadow-[0_15px_40px_rgba(255,46,99,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out]" />
                  <Send className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>ОФОРМИТЬ В TELEGRAM</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section className="px-6 py-16 container mx-auto max-w-6xl space-y-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-2 bg-[#FF2E63]"></div>
            <h2 className="text-3xl md:text-4xl font-tactic italic uppercase font-black text-white tracking-tighter">
              ВАРИАНТЫ НОМИНАЛОВ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tier 1 */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-300 overflow-hidden group flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/10 rounded-full blur-[40px] group-hover:bg-[#00F0FF]/20 transition-all"></div>
              <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <Target className="w-40 h-40 text-[#00F0FF]" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[#00F0FF] font-chakra font-bold text-lg uppercase tracking-widest mb-2">START PACK</span>
                <h3 className="text-4xl font-tactic italic font-black text-white mb-4">2 000 ₽</h3>

                <p className="text-slate-300 font-inter mb-6 text-sm flex-grow">
                  Хватит на 14 часов игры в Общем зале или на всю ночь в комфортной зоне Solo Premium!
                </p>

                <a
                  href={`${telegramUrl}?text=${encodeURIComponent("Хочу заказать подарочный сертификат START PACK на 2000 рублей.")}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/50 hover:bg-[#00F0FF] hover:text-black font-chakra font-bold uppercase py-3 rounded-xl transition-all text-sm mt-auto"
                >
                  <Send className="w-4 h-4" /> Заказать
                </a>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="relative bg-[#B900FF]/5 backdrop-blur-sm rounded-3xl p-6 border border-[#B900FF]/30 hover:border-[#B900FF] transition-all duration-300 overflow-hidden group shadow-[0_0_20px_rgba(185,0,255,0.1)] lg:-translate-y-2 flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B900FF]/20 rounded-full blur-[40px] group-hover:bg-[#B900FF]/30 transition-all"></div>
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity -rotate-12">
                <Users className="w-40 h-40 text-[#B900FF]" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[#B900FF] font-chakra font-bold text-lg uppercase tracking-widest mb-2">Duo Zone</span>
                <h3 className="text-4xl font-tactic italic font-black text-white mb-4">3 000 ₽</h3>

                <p className="text-slate-300 font-inter mb-6 text-sm flex-grow">
                  Идеально для двоих: можно снять зону VIP Duo и играть вместе целый день! Отличный вариант для совместного отдыха.
                </p>

                <a
                  href={`${telegramUrl}?text=${encodeURIComponent("Хочу заказать подарочный сертификат DUO ZONE на 3000 рублей.")}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-[#B900FF] text-white font-chakra font-bold uppercase py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(185,0,255,0.3)] hover:shadow-[0_0_20px_rgba(185,0,255,0.5)] hover:scale-[1.02] text-sm mt-auto"
                >
                  <Send className="w-4 h-4" /> Заказать
                </a>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="relative bg-[#FF2E63]/5 backdrop-blur-sm rounded-3xl p-6 border border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all duration-300 overflow-hidden group flex flex-col lg:-translate-y-4 shadow-[0_0_20px_rgba(255,46,99,0.15)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2E63]/20 rounded-full blur-[40px] group-hover:bg-[#FF2E63]/30 transition-all"></div>
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-45">
                <Rocket className="w-40 h-40 text-[#FF2E63]" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[#FF2E63] font-chakra font-bold text-lg uppercase tracking-widest mb-2">Ultimate</span>
                <h3 className="text-4xl font-tactic italic font-black text-white mb-4">5 000 ₽</h3>

                <p className="text-slate-300 font-inter mb-6 text-sm flex-grow">
                  Ультимативный подарок: хватит на несколько VIP-ночей или на аренду целого Bootcamp для его команды друзей!
                </p>

                <a
                  href={`${telegramUrl}?text=${encodeURIComponent("Хочу заказать подарочный сертификат ULTIMATE на 5000 рублей.")}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-[#FF2E63] text-white font-chakra font-bold uppercase py-3 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,46,99,0.4)] text-sm mt-auto"
                >
                  <Send className="w-4 h-4" /> Заказать
                </a>
              </div>
            </div>

            {/* Tier Custom */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/20 border-dashed hover:border-white/50 transition-all duration-300 overflow-hidden group flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-all"></div>
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-[25deg]">
                <Gamepad2 className="w-40 h-40 text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-white/70 font-chakra font-bold text-lg uppercase tracking-widest mb-2">СВОЙ ВАРИАНТ</span>
                <h3 className="text-4xl font-tactic italic font-black text-white mb-4">Любая</h3>

                <p className="text-slate-300 font-inter mb-6 text-sm flex-grow">
                  Выбирай любую комфортную сумму. Администратор оформит сертификат с индивидуальным номиналом!
                </p>

                <a
                  href={`${telegramUrl}?text=${encodeURIComponent("Хочу заказать подарочный сертификат. Подскажите, как выбрать номинал?")}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 hover:bg-white hover:text-black font-chakra font-bold uppercase py-3 rounded-xl transition-all text-sm mt-auto"
                >
                  <Send className="w-4 h-4" /> Написать
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* HAPPINESS SCALE */}
        <section className="px-6 py-20 relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#FF2E63]/5 to-[#050505] border-t border-white/5">
          <div className="container mx-auto max-w-4xl relative z-10">
            <h2 className="text-3xl lg:text-4xl font-tactic italic uppercase font-bold text-white mb-16 text-center drop-shadow-md">
              ШКАЛА СЧАСТЬЯ ПАРНЯ
            </h2>

            <div className="relative pt-12 pb-8 px-4 md:px-0">
              {/* Line */}
              <div className="absolute top-[40%] left-0 w-full h-1 bg-slate-800 rounded-full -translate-y-1/2">
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-slate-600 via-[#B900FF] to-[#00F0FF] rounded-full opacity-50"></div>
              </div>

              {/* Points */}
              <div className="flex justify-between relative z-10 w-full lg:px-12">
                <div className="flex flex-col items-center gap-4 group w-1/3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 backdrop-blur-sm -translate-y-2">
                    <span className="text-2xl md:text-3xl">😊</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-sm md:text-base uppercase font-bold text-slate-300 font-tactic italic tracking-wider mb-1">Рад</span>
                    <span className="text-xs text-[#FF2E63] font-chakra font-bold">~ 1000 ₽</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 group w-1/3">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#FF2E63]/20 to-[#B900FF]/20 border border-[#B900FF]/50 flex items-center justify-center shadow-[0_0_20px_rgba(185,0,255,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(185,0,255,0.5)] backdrop-blur-sm -translate-y-4">
                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#FF2E63]" fill="currentColor" />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-base md:text-xl uppercase font-black text-white font-tactic italic tracking-wider mb-1 drop-shadow-md">Очень счастлив</span>
                    <span className="text-xs md:text-sm text-[#00F0FF] font-chakra font-bold">3000 ₽</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 group w-1/3">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#00F0FF]/30 to-[#B900FF]/30 border-2 border-[#00F0FF] flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(0,240,255,0.7)] backdrop-blur-md -translate-y-6">
                    <Crown className="w-10 h-10 md:w-14 md:h-14 text-[#00F0FF]" fill="currentColor" />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-lg md:text-2xl uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF] font-tactic italic tracking-wider mb-1 drop-shadow-lg text-center leading-tight">Готов носить на руках</span>
                    <span className="text-sm md:text-base text-[#FF2E63] font-chakra font-black tracking-widest mt-1">от 5000 ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ZONES GALLERY */}
        <section className="px-6 py-20 bg-background-dark/50 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-12 justify-end">
              <h2 className="text-3xl md:text-4xl font-tactic italic uppercase font-black text-white tracking-tighter text-right">
                ГДЕ ОН БУДЕТ ИГРАТЬ
              </h2>
              <div className="h-10 w-2 bg-[#00F0FF]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF2E63]/50 transition-colors">
                <img src="/zones/common-2.webp" alt="Общий зал" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-tactic italic text-white mb-1">ОБЩИЙ ЗАЛ</h3>
                  <p className="text-[#FF2E63] font-chakra font-bold text-xs md:text-sm tracking-wider">Рабочая лошадка киберспорта | Для всех</p>
                </div>
              </div>

              <div className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF2E63]/50 transition-colors">
                <img src="/zones/solo-premium-1.webp" alt="Solo Premium" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-tactic italic text-white mb-1">SOLO PREMIUM</h3>
                  <p className="text-[#FF2E63] font-chakra font-bold text-xs md:text-sm tracking-wider">Максимальный комфорт | Играем соло</p>
                </div>
              </div>

              <div className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#B900FF]/50 transition-colors">
                <img src="/zones/duo-1.webp" alt="VIP Duo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-tactic italic text-white mb-1">DUO ZONE</h3>
                  <p className="text-[#B900FF] font-chakra font-bold text-xs md:text-sm tracking-wider">Private Room | Для двоих | Лучшие эмоции</p>
                </div>
              </div>

              <div className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#00F0FF]/50 transition-colors bg-black/50">
                <img src="/zones/bootcamp-1.webp" alt="Bootcamp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-tactic italic text-white mb-1">VIP BOOTCAMP</h3>
                  <p className="text-[#00F0FF] font-chakra font-bold text-xs md:text-sm tracking-wider">Отдельная комната | Для команды из 5-и</p>
                </div>
              </div>

              <div className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#00F0FF]/50 transition-colors">
                <img src="/zones/ps5-1.webp" alt="PS5 Lounge" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-tactic italic text-white mb-1">PS5 LOUNGE</h3>
                  <p className="text-[#00F0FF] font-chakra font-bold text-xs md:text-sm tracking-wider">Мягкие диваны | Топовые игры</p>
                </div>
              </div>

              <div className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF7A00]/50 transition-colors">
                <img src="/zones/sim-1.webp" alt="Simracing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-tactic italic text-white mb-1">АВТОСИМУЛЯТОР</h3>
                  <p className="text-[#FF7A00] font-chakra font-bold text-xs md:text-sm tracking-wider">Полное погружение | Руль Moza R9</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION WITH STEPS */}
        <section className="px-6 py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF2E63]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B900FF]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
            <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-3xl"></div>
          </div>

          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-tactic italic uppercase font-black text-white mb-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              СДЕЛАЙ ЕГО ДЕНЬ <br />НЕЗАБЫВАЕМЫМ!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
              {/* Step 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-[#FF2E63]/50 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FF2E63]/10 rounded-full blur-2xl group-hover:bg-[#FF2E63]/20 transition-all"></div>
                <div className="text-5xl font-tactic italic text-white/5 absolute top-4 right-6 group-hover:text-white/10 transition-colors">1</div>
                <h3 className="text-xl font-tactic italic text-white mb-3 text-[#FF2E63] uppercase">Номинал</h3>
                <p className="text-slate-300 font-inter text-sm leading-relaxed relative z-10">
                  Выберите любую удобную для вас сумму. Чем больше сумма, тем дольше продлятся эмоции.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-[#B900FF]/50 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#B900FF]/10 rounded-full blur-2xl group-hover:bg-[#B900FF]/20 transition-all"></div>
                <div className="text-5xl font-tactic italic text-white/5 absolute top-4 right-6 group-hover:text-white/10 transition-colors">2</div>
                <h3 className="text-xl font-tactic italic text-white mb-3 text-[#B900FF] uppercase">Оформление</h3>
                <p className="text-slate-300 font-inter text-sm leading-relaxed relative z-10">
                  Напишите нам в Telegram. Мы пришлем реквизиты, а после оплаты создадим именной электронный дизайн.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-[#00F0FF]/50 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00F0FF]/10 rounded-full blur-2xl group-hover:bg-[#00F0FF]/20 transition-all"></div>
                <div className="text-5xl font-tactic italic text-white/5 absolute top-4 right-6 group-hover:text-white/10 transition-colors">3</div>
                <h3 className="text-xl font-tactic italic text-white mb-3 text-[#00F0FF] uppercase">Вручение</h3>
                <p className="text-slate-300 font-inter text-sm leading-relaxed relative z-10">
                  Разработаем поздравление и отправим подарок ему в личку в нужный момент, или отправим Вам, распечатайте и вручите лично!
                </p>
              </div>
            </div>

            <a
              href={`${telegramUrl}?text=${telegramText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#050505] font-chakra italic uppercase py-5 px-12 rounded-xl font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-105"
            >
              <Send className="w-6 h-6" />
              ПЕРЕЙТИ В TELEGRAM
            </a>

            <p className="mt-8 text-sm text-slate-500 font-inter">
              Или позвони администратору клуба: <a href="tel:+79851289538" className="text-white hover:text-[#FF2E63]">+7 (985) 128-95-38</a>
            </p>
          </div>
        </section>

        <Contacts />
      </div>
      <Footer />
    </main>
  );
}
