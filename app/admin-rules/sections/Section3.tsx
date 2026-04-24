import React from 'react';
import { DoorOpen, LayoutGrid, MonitorCheck, Refrigerator, Calculator, ClipboardList, AlertCircle, ShieldCheck } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const SHIFT_OPEN_STEPS = [
    {
        title: "Осмотр зала и проверка периферии",
        description: "Пройти по всему залу, проверить наличие всей периферии на каждом рабочем месте, убедиться в отсутствии мусора, крошек и оставленных вещей.",
        icon: LayoutGrid,
        color: "text-amber-500",
        bgColor: "bg-amber-50"
    },
    {
        title: "Открытие смены в Langame",
        description: "Зайти в программу администрирования Langame под своей учетной записью и открыть смену.",
        icon: MonitorCheck,
        color: "text-blue-500",
        bgColor: "bg-blue-50"
    },
    {
        title: "Пересчет товара (Витрины и Холодильник)",
        description: "Пересчитать все товары в холодильнике и на витринах. Строго сверить фактическое количество с остатками в программе.",
        icon: Refrigerator,
        color: "text-emerald-500",
        bgColor: "bg-emerald-50"
    },
    {
        title: "Пересчет наличных",
        description: "Пересчитать наличные денежные средства в кассе и сверить сумму с данными в программе.",
        icon: Calculator,
        color: "text-purple-500",
        bgColor: "bg-purple-50"
    }
];

export function Section3() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="3" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <DoorOpen className="text-amber-500 hidden sm:block" size={48} />
                        Открытие <span className="text-amber-500">Смены</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Правильное открытие смены гарантирует отсутствие недостач и проблем в течение всего рабочего дня. Следуйте строго по этому чек-листу.
                    </p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 mb-12 shadow-sm">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                    <ClipboardList className="text-amber-500" size={24} />
                    <h3 className="font-tactic font-black text-xl md:text-2xl uppercase italic text-slate-900">Чек-лист открытия</h3>
                </div>

                <div className="relative">
                    {/* Vertical Line for Timeline */}
                    <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-slate-100 hidden sm:block"></div>
                    
                    <div className="space-y-6">
                        {SHIFT_OPEN_STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 group">
                                    {/* Number / Timeline Node */}
                                    <div className="shrink-0 z-10 flex items-center space-x-4 sm:space-x-0">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.bgColor} border-4 border-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                            <span className={`font-tactic font-black text-lg md:text-2xl italic ${step.color}`}>{idx + 1}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Content Card */}
                                    <div className="flex-1 rounded-2xl border bg-slate-50 p-5 md:p-6 transition-colors border-slate-100 group-hover:border-amber-200 group-hover:bg-white">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div>
                                                <h4 className="font-tactic font-black uppercase text-sm md:text-base text-slate-800 mb-2 flex items-center gap-2">
                                                    {step.title}
                                                </h4>
                                                <p className="font-chakra text-slate-600 text-sm leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                            
                                            <div className="shrink-0 inline-flex items-center gap-2 bg-slate-200 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-300 self-start group-hover:bg-amber-100 group-hover:text-amber-700 group-hover:border-amber-200 transition-colors">
                                                <Icon size={14} />
                                                <span className="text-[10px] sm:text-xs font-chakra font-black uppercase tracking-wider">Действие</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-amber-100 flex flex-col md:flex-row gap-4 bg-amber-50 p-4 md:p-6 rounded-2xl border border-amber-200/50">
                    <div className="shrink-0 text-amber-500 flex items-center justify-center">
                        <AlertCircle size={32} />
                    </div>
                    <div>
                        <div className="font-tactic font-black uppercase text-slate-900 mb-2">При выявлении недостач:</div>
                        <p className="font-chakra text-slate-600 text-sm leading-relaxed">
                            Если при пересчете товара или наличных обнаружены расхождения, вы <strong>обязаны</strong> незамедлительно зафиксировать это и сообщить в общий чат.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 3/16
                </p>
            </div>
        </section>
    );
}

