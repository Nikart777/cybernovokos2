"use client";

import { useState } from "react";
import { Calculator, ArrowRight, RotateCcw, Send, Check } from "lucide-react";

export default function GiftCalculator() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        party: 0,
        duration: 0,
        comfort: 0
    });

    const QUESTIONS = [
        {
            id: 1,
            field: "party" as const,
            title: "С кем он обычно играет?",
            subtitle: "От этого зависит, сколько компьютеров понадобится.",
            options: [
                { label: "Один (Соло)", val: 1, icon: "👤", desc: "Волк-одиночка" },
                { label: "С лучшим другом", val: 2, icon: "👥", desc: "Дуо-катка" },
                { label: "С командой", val: 5, icon: "🎮", desc: "Фулл стак (5 чел)" }
            ]
        },
        {
            id: 2,
            field: "duration" as const,
            title: "Как долго он просидит за ПК?",
            subtitle: "Пакеты времени всегда выгоднее почасовой оплаты.",
            options: [
                { label: "Пару часиков", val: 500, icon: "⏱️", desc: "Быстрая игра после работы" },
                { label: "Всю ночь", val: 1000, icon: "🌙", desc: "Легендарный ночной пакет" },
                { label: "Зависнет надолго", val: 2500, icon: "🔥", desc: "Выходные напролет" }
            ]
        },
        {
            id: 3,
            field: "comfort" as const,
            title: "Какой уровень комфорта?",
            subtitle: "У нас есть разные залы с разным железом.",
            options: [
                { label: "Общий зал (Standard)", val: 1, icon: "🖥️", desc: "Стандартная зона, шумно и весело" },
                { label: "Private / Bootcamp", val: 1.5, icon: "👑", desc: "Закрытая комната, топ-железо RTX 40xx" }
            ]
        }
    ];

    const handleSelect = (field: 'party' | 'duration' | 'comfort', value: number) => {
        setAnswers(prev => ({ ...prev, [field]: value }));
        if (step < 3) {
            setTimeout(() => setStep(step + 1), 300);
        } else {
            setTimeout(() => setStep(4), 300);
        }
    };

    const calculateTotal = () => {
        // Basic logic to recommend a certificate amount
        let raw = answers.duration * answers.party * answers.comfort;

        // Safety caps and floors
        if (raw < 500) raw = 500;

        // Round to nearest 500
        return Math.ceil(raw / 500) * 500;
    };

    const reset = () => {
        setStep(1);
        setAnswers({ party: 0, duration: 0, comfort: 0 });
    };

    const total = calculateTotal();
    const telegramText = encodeURIComponent(`Здравствуйте! Я рассчитала номинал подарка в вашем калькуляторе: ${total} руб. Хочу приобрести сертификат.`);

    return (
        <div className="w-full max-w-4xl mx-auto rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
            {/* Top Cyber Line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00F0FF] via-[#FF2E63] to-[#B900FF]"></div>

            <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#FF2E63]/20 flex items-center justify-center border border-[#FF2E63]/30 text-[#FF2E63] shadow-[0_0_15px_rgba(255,46,99,0.2)]">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-tactic italic text-white uppercase tracking-wide">
                            КАЛЬКУЛЯТОР ПОДАРКА
                        </h2>
                        <p className="text-slate-400 font-inter text-sm md:text-base mt-1">
                            Не знаете, сколько подарить? Ответьте на 3 вопроса о его привычках.
                        </p>
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="flex gap-2 mb-10">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${num === 1 ? 'from-[#00F0FF] to-[#0099FF]' : num === 2 ? 'from-[#FF2E63] to-[#FF0040]' : 'from-[#B900FF] to-[#8000FF]'} transition-all duration-700 ease-out`}
                                style={{ width: step >= num || step === 4 ? '100%' : '0%' }}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* QUESTIONS STAGE */}
                {step <= 3 && (
                    <div className="animate-fade-in">
                        {QUESTIONS.map((q, idx) => (
                            q.id === step && (
                                <div key={q.id} className="space-y-6">
                                    <div className="bg-white/5 inline-block px-4 py-1 rounded-full border border-white/10 mb-2">
                                        <span className="text-[#00F0FF] font-chakra font-bold text-xs tracking-widest uppercase">Шаг {q.id} из 3</span>
                                    </div>
                                    <h3 className="text-2xl font-tactic italic text-white tracking-wide">{q.title}</h3>
                                    <p className="text-slate-400 font-inter text-sm">{q.subtitle}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                                        {q.options.map((opt, i) => {
                                            const isSelected = answers[q.field] === opt.val;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSelect(q.field, opt.val)}
                                                    className={`flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${isSelected
                                                            ? "bg-white/10 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)] -translate-y-1"
                                                            : "bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5"
                                                        }`}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute top-3 right-3 text-[#00F0FF]">
                                                            <Check className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                    <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">{opt.icon}</span>
                                                    <span className="text-white font-chakra font-bold uppercase tracking-wider mb-2">{opt.label}</span>
                                                    <span className="text-slate-500 font-inter text-xs leading-relaxed">{opt.desc}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}

                {/* RESULT STAGE */}
                {step === 4 && (
                    <div className="animate-fade-in flex flex-col items-center text-center py-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF2E63]/20 to-[#B900FF]/20 border border-[#FF2E63]/50 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,46,99,0.3)] relative group">
                            <div className="absolute inset-0 bg-[#FF2E63] rounded-full blur-2xl opacity-20 animate-[pulse_3s_ease-in-out_infinite]"></div>
                            <span className="text-5xl">🎯</span>
                        </div>

                        <h3 className="text-slate-300 font-chakra uppercase tracking-widest text-sm mb-4">Рекомендуемый номинал:</h3>
                        <div className="text-5xl md:text-7xl font-tactic italic font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF2E63] to-[#B900FF] drop-shadow-[0_0_20px_rgba(255,46,99,0.3)] mb-8 tracking-tighter">
                            {total} ₽
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                            <a
                                href={`https://t.me/CyberXNovokos?text=${telegramText}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-[#FF2E63] text-white font-chakra font-bold uppercase py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(255,46,99,0.4)] hover:shadow-[0_0_30px_rgba(255,46,99,0.6)] hover:scale-105"
                            >
                                <Send className="w-5 h-5" /> Заказать
                            </a>
                            <button
                                onClick={reset}
                                className="w-full sm:w-auto p-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-5 h-5" /> <span className="sm:hidden font-chakra uppercase">Пересчитать</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
