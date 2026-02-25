import React from "react";
import { Send } from "lucide-react";

export default function CertificateSteps({ telegramUrl, telegramText }: { telegramUrl: string, telegramText: string }) {
    return (
        <section className="px-6 py-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF2E63]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B900FF]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
                <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-5xl relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-tactic italic uppercase font-black text-white mb-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    СДЕЛАЙ ЕГО ДЕНЬ <br />НЕЗАБЫВАЕМЫМ!
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {/* Step 1 */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-[#FF2E63]/50 transition-colors">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FF2E63]/10 rounded-full blur-2xl group-hover:bg-[#FF2E63]/20 transition-all"></div>
                        <div className="text-5xl font-tactic italic text-white/5 absolute top-4 right-6 group-hover:text-white/10 transition-colors">1</div>
                        <h3 className="text-xl font-tactic italic mb-3 text-[#FF2E63] uppercase">Номинал</h3>
                        <p className="text-slate-300 font-inter text-sm leading-relaxed relative z-10">
                            Выберите любую удобную для вас сумму в калькуляторе или самостоятельно.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-[#B900FF]/50 transition-colors">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#B900FF]/10 rounded-full blur-2xl group-hover:bg-[#B900FF]/20 transition-all"></div>
                        <div className="text-5xl font-tactic italic text-white/5 absolute top-4 right-6 group-hover:text-white/10 transition-colors">2</div>
                        <h3 className="text-xl font-tactic italic mb-3 text-[#B900FF] uppercase">Оформление</h3>
                        <p className="text-slate-300 font-inter text-sm leading-relaxed relative z-10">
                            Напишите нам в Telegram. Мы пришлем реквизиты, и создадим именной электронный дизайн!
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-[#00F0FF]/50 transition-colors">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00F0FF]/10 rounded-full blur-2xl group-hover:bg-[#00F0FF]/20 transition-all"></div>
                        <div className="text-5xl font-tactic italic text-white/5 absolute top-4 right-6 group-hover:text-white/10 transition-colors">3</div>
                        <h3 className="text-xl font-tactic italic mb-3 text-[#00F0FF] uppercase">Вручение</h3>
                        <p className="text-slate-300 font-inter text-sm leading-relaxed relative z-10">
                            Отправим сюрприз ему в личку, или вам для распечатки. В клубе мы просто переведем номинал сертификата ему на баланс в приложении CyberX, и он сможет тратить его как захочет: бронировать любые ПК или играть с друзьями!
                        </p>
                    </div>
                </div>

                <div className="mt-16 flex justify-center pb-8 border-t border-white/5 pt-12">
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
        </section>
    );
}
