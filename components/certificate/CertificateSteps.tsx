import React from "react";
import { Send } from "lucide-react";

export default function CertificateSteps({ telegramUrl, telegramText }: { telegramUrl: string, telegramText: string }) {
    return (
        <section className="px-6 py-24 relative overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(40% 40% at 85% 0%, rgba(255,46,99,0.12), transparent 70%), radial-gradient(40% 40% at 15% 100%, rgba(185,0,255,0.12), transparent 70%)",
                }}
            />

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
                            Начисление происходит автоматически через приложение CyberX! Мы отправим вам или получателю в личные сообщения сам сертификат + промокод, по которому будет производиться начисление.
                        </p>
                    </div>
                </div>

                {/* Final call to action */}
                <div className="mt-20 flex flex-col items-center gap-6 border-t border-white/5 pt-16">
                    <p className="font-chakra text-xs uppercase tracking-[0.35em] text-[#00F0FF]">
                        Осталось только написать
                    </p>
                    <h3 className="max-w-3xl font-tactic italic uppercase font-black text-white text-3xl md:text-5xl leading-[0.95]">
                        Подари эмоции,<br className="md:hidden" /> которые он <span className="text-[#FF2E63]">запомнит</span>
                    </h3>

                    <div className="relative mt-2">
                        {/* glow ring */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -inset-4 rounded-[28px] opacity-60 blur-2xl"
                            style={{ background: "linear-gradient(90deg, #FF2E63, #B900FF)" }}
                        />
                        <a
                            href={`${telegramUrl}?text=${telegramText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-[#FF2E63] to-[#B900FF] px-12 py-6 font-chakra italic font-black uppercase text-white text-xl md:text-2xl shadow-[0_18px_50px_rgba(255,46,99,0.5)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 -translate-x-full bg-white/25 group-hover:animate-[shine_0.75s_ease-in-out]" />
                            <Send className="h-6 w-6 md:h-7 md:w-7 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                            <span>Оформить в Telegram</span>
                        </a>
                    </div>

                    <p className="font-inter text-sm text-slate-400">Ответим за пару минут · оформим онлайн</p>
                </div>
            </div>
        </section>
    );
}
