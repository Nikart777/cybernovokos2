import React from "react";
import { Send, Gamepad2 } from "lucide-react";
import SlotMachineNumber from "@/components/SlotMachineNumber";

export default function CertificateAbout({ telegramUrl, telegramText }: { telegramUrl: string, telegramText: string }) {
    return (
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
                                Наш подарочный сертификат — универсальный ключ в кибервселенную. Порадуйте любимого мужчину: офрмите подарочный сертификат CYBERX GIFT, а он сам решит, во что играть: мощнейшие ПК, расслабляющая зона PS5 или адреналиновый автосимулятор. Мы просто переведем всю сумму на его аккаунт в приложении клуба, и он сможет тратить ее на что угодно — будь то игра одному или бронь всего зала с друзьями!
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

                                    {/* Decorative Crosses */}
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
                                        <div className="flex items-baseline text-[3.5rem] min-[360px]:text-[4.5rem] md:text-[5.5rem] font-tactic italic font-black leading-none tracking-tighter whitespace-nowrap drop-shadow-[0_0_20px_rgba(255,46,99,0.5)]">
                                            <SlotMachineNumber />
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

                    {/* Premium Action Button */}
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
    );
}
