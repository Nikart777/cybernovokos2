import React from "react";
import { Heart, Crown } from "lucide-react";

export default function CertificateHappinessScale() {
    return (
        <section className="px-6 py-20 relative overflow-hidden bg-gradient-to-b from-[#050505] via-white/[0.02] to-[#050505] border-t border-white/5">
            <div className="container mx-auto max-w-6xl relative z-10">
                <h2 className="text-3xl lg:text-5xl font-tactic italic uppercase font-black text-white mb-16 text-center drop-shadow-md">
                    ПУТЬ К <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#B900FF]">СЕРДЦУ МУЖЧИНЫ</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Point 1 */}
                    <div className="relative group bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md overflow-hidden hover:border-[#FF2E63]/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2E63]/10 rounded-full blur-[40px] group-hover:bg-[#FF2E63]/20 transition-all"></div>
                        <div className="flex flex-col items-center text-center relative z-10">
                            <span className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">😊</span>
                            <span className="text-2xl uppercase font-black text-white font-tactic italic tracking-wider mb-2">Рад</span>
                            <span className="text-[#FF2E63] font-chakra font-bold mb-4">~ 1000 ₽</span>
                            <p className="text-slate-400 text-sm font-inter">Легкий знак внимания, который поднимет настроение на весь вечер.</p>
                        </div>
                    </div>

                    {/* Point 2 */}
                    <div className="relative group bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md overflow-hidden hover:border-[#B900FF]/50 transition-all duration-300 shadow-[0_0_20px_rgba(185,0,255,0.05)] lg:-translate-y-4">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#B900FF]/20 rounded-full blur-[40px] group-hover:bg-[#B900FF]/30 transition-all"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#B900FF]/5"></div>
                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="bg-[#B900FF]/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(185,0,255,0.2)]">
                                <Heart className="w-8 h-8 text-[#B900FF]" fill="currentColor" />
                            </div>
                            <span className="text-2xl uppercase font-black text-white font-tactic italic tracking-wider mb-2">Очень счастлив</span>
                            <span className="text-[#00F0FF] font-chakra font-bold mb-4">~ 3000 ₽</span>
                            <p className="text-slate-300 text-sm font-inter">Отличный подарок! Хватит на долгую катку с друзьями в хорошем зале.</p>
                        </div>
                    </div>

                    {/* Point 3 */}
                    <div className="relative group bg-gradient-to-br from-[#1A1A10] to-[#0A0A05] border border-yellow-500/30 p-8 rounded-3xl backdrop-blur-md overflow-hidden hover:border-yellow-500/80 transition-all duration-500 shadow-[0_0_30px_rgba(234,179,8,0.15)] lg:-translate-y-8">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay opacity-50"></div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-[40px] group-hover:bg-yellow-500/40 transition-all"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FF2E63]/20 rounded-full blur-[40px] group-hover:bg-[#FF2E63]/40 transition-all"></div>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="bg-yellow-500/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                                <Crown className="w-10 h-10 text-yellow-400" fill="currentColor" />
                            </div>
                            <span className="text-2xl uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 font-tactic italic tracking-wider mb-2 drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)]">Готов носить на руках</span>
                            <span className="text-[#FF2E63] font-chakra font-black tracking-widest mb-4">От 5000 ₽</span>
                            <p className="text-yellow-100/80 text-sm font-inter font-medium leading-relaxed">Максимальный восторг. VIP-обслуживание, лучшие консоли и полное погружение.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
