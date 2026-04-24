import React from 'react';
import { Wallet, Smartphone, Monitor, Mail, CreditCard, Percent } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const PAYMENT_METHODS = [
    {
        title: "Через администратора",
        percent: "40%",
        iconName: "Wallet",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20"
    },
    {
        title: "На гостевом ПК (СБП)",
        percent: "40%",
        iconName: "Monitor",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20"
    },
    {
        title: "В приложении CYBERX",
        percent: "20%",
        iconName: "Smartphone",
        color: "text-[#FF2E63]",
        bgColor: "bg-[#FF2E63]/10",
        borderColor: "border-[#FF2E63]/20"
    }
];

export function Section5() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="5" label="Раздел" />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-6">
                Пополнение <span className="text-[#0ea5e9]">баланса</span>
            </h2>
            
            <p className="font-chakra text-slate-600 text-sm md:text-base leading-relaxed mb-10 max-w-3xl">
                Важно понимать, каким образом клиенты пополняют баланс, чтобы оперативно помогать при возникновении вопросов и правильно вести отчетность.
            </p>

            <div className="mb-12">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                    <CreditCard size={14} />
                    Способы пополнения
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PAYMENT_METHODS.map((method, idx) => {
                        const Icon = method.iconName === 'Wallet' ? Wallet : method.iconName === 'Monitor' ? Monitor : Smartphone;
                        return (
                            <div key={idx} className={`relative flex flex-col p-6 rounded-3xl border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden ${method.borderColor}`}>
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <Percent size={80} className={method.color} />
                                </div>
                                
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${method.bgColor} ${method.color}`}>
                                    <Icon size={24} />
                                </div>
                                
                                <div className="font-tactic font-black text-slate-900 uppercase italic text-lg mb-2">
                                    {method.title}
                                </div>
                                
                                <div className="font-chakra font-bold text-slate-400 text-sm flex items-center gap-2 mt-auto pt-4">
                                    <span className={`px-2 py-1 rounded-md text-xs tracking-wider ${method.bgColor} ${method.color}`}>
                                        {method.percent}
                                    </span>
                                    <span>всех клиентов</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 flex items-start gap-4 shadow-lg border border-slate-800">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                    <Mail size={24} />
                </div>
                <div>
                    <h3 className="font-tactic font-black uppercase italic text-lg mb-2">Электронные чеки</h3>
                    <p className="font-chakra text-slate-300 text-sm leading-relaxed mb-4">
                        Обязательное условие: все электронные чеки должны быть отправлены на корпоративную почту клуба.
                    </p>
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/30 border border-white/10 font-chakra font-medium tracking-wide">
                        <span className="text-[#0ea5e9]">xmixerx11@outlook.com</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 4/4
                </p>
                {/* Optional navigation back/forward depending on future sections */}
            </div>
        </section>
    );
}



