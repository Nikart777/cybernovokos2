import React from 'react';
import { CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const SECTION2_RESPONSIBILITIES = [
    "Контролировать соблюдение правил посещения клуба клиентами.",
    "Соблюдать настоящие правила работы администратора.",
    "Предлагать клиенту напитки и снеки. Не «Вы хотите что-нибудь пить или перекусить?», а «Что хотите, напитки, снэки?».",
    "Контролировать чтобы всегда играла фоновая музыка.",
    "Иметь опрятный внешний вид, носить форму Cyberx и бейдж администратора.",
    "Проводить корректную передачу смены (раздел 8).",
    "Сообщать в рабочий чат о проблемах с оборудованием и иных происшествиях.",
    "При возникновении проблем с клиентскими ПК обратиться в техническую поддержку Langame через Telegram (круглосуточно).",
    "Быть всегда на связи и оперативно отвечать на запросы в рабочем чате. Иметь всегда при себе рабочий телефон.",
    "Отчитываться в чате о решении/причинах не решения рабочих задач, поставленных руководством.",
    "Контролировать состояние игровых мест (подробно в разделе чистота зала).",
    { 
        text: "Принимать входящие звонки для информирования клиентов о ценах, акциях. Перезванивать по пропущенным.", 
        link: "https://disk.yandex.ru/i/LpV4Axi3zOzlAw", 
        linkText: "Подробнее о звонках"
    }
];

const SECTION2_PROHIBITED = [
    "Передавать контакты руководителей посторонним лицам.",
    "Передавать наличные из кассы кому либо, кроме Руководства ЛИЧНО (Никита, Виталий).",
    "Невыход на смену без предупреждения минимум за 3 дня (увольнение).",
    "Вешать куртку на рабочее кресло.",
    "Проводить возврат денег клиенту без согласования руководства."
];

export function Section2() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="2" label="Раздел" />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-10">
                Обязанности <span className="text-[#FF2E63]">администратора</span>
            </h2>

            {/* Обязанности (Список) */}
            <div className="mb-14">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#0ea5e9] mb-6">
                    <CheckCircle2 size={14} />
                    Прямые обязанности
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden p-2 sm:p-4">
                    <div className="flex flex-col gap-3">
                        {SECTION2_RESPONSIBILITIES.map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] mt-0.5">
                                    <span className="font-tactic font-black text-xs italic">{i + 1}</span>
                                </div>
                                <div>
                                    <p className="font-chakra text-slate-700 text-sm leading-relaxed">
                                        {typeof item === 'string' ? item : (
                                            <>
                                                {item.text}
                                                <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-2 text-[#0ea5e9] hover:text-[#0284c7] font-bold text-xs uppercase tracking-wider transition-colors ml-1 border-b border-[#0ea5e9]/30 hover:border-[#0284c7]">
                                                    {item.linkText}
                                                    <ExternalLink size={10} />
                                                </a>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Строго запрещено */}
            <div className="mb-10">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#FF2E63] mb-6">
                    <AlertTriangle size={14} />
                    Строго запрещено
                </div>
                <div className="flex flex-col gap-3">
                    {SECTION2_PROHIBITED.map((item, i) => (
                        <div key={i} className="group relative flex items-center gap-4 p-5 rounded-2xl bg-[#FF2E63]/5 border border-[#FF2E63]/10 overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF2E63] scale-y-75 group-hover:scale-y-100 transition-transform origin-center rounded-r-sm" />
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#FF2E63] shadow-sm">
                                <AlertTriangle size={18} />
                            </div>
                            <p className="font-chakra font-medium text-[#8F1A3A] text-sm md:text-base leading-snug">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


