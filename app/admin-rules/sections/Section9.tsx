import React from 'react';
import Image from 'next/image';
import { ClipboardList, Camera, CheckCircle2, Calculator, CreditCard, Receipt, FileSignature, MonitorCheck, Refrigerator, Smartphone, ZoomIn } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const SHIFT_CLOSE_STEPS = [
    {
        title: "Краткий отчет на терминале",
        description: "Сделать краткий отчет на банковском терминале. Сверить общую сумму с суммой безналичных в программе. Суммы должны быть одинаковые.",
        icon: CreditCard,
        color: "text-blue-500",
        bgColor: "bg-blue-50"
    },
    {
        title: "Фото ПО «Текущий отчет»",
        description: "Сделать фото окна программы с итогами смены (текущий отчет) СТРОГО до нажатия кнопки «Закрыть смену».",
        icon: MonitorCheck,
        color: "text-indigo-500",
        bgColor: "bg-indigo-50",
        requiresPhoto: true,
        images: ['/instruktsiya/programma-zakritie.jpg']
    },
    {
        title: "Сверка итогов терминала",
        description: "На банковском терминале закрыть смену (сверка итогов).",
        icon: Receipt,
        color: "text-purple-500",
        bgColor: "bg-purple-50"
    },
    {
        title: "Закрытие в Langame",
        description: "Нажать «Закрыть смену» в программе langame.",
        icon: MonitorCheck,
        color: "text-slate-500",
        bgColor: "bg-slate-50"
    },
    {
        title: "Фото чеков",
        description: "Сделать фото распечатанного чека кассы и банковского терминала рядом.",
        icon: Camera,
        color: "text-violet-500",
        bgColor: "bg-violet-50",
        requiresPhoto: true,
        images: ['/instruktsiya/cheki.jpg']
    },
    {
        title: "Лист учета смен",
        description: "Полностью заполнить лист учета смен, поставить подпись и сделать фото документа.",
        icon: FileSignature,
        color: "text-fuchsia-500",
        bgColor: "bg-fuchsia-50",
        requiresPhoto: true,
        images: ['/instruktsiya/list-otchetnosti.jpg']
    },
    {
        title: "Фото витрины",
        description: "Отправить общее фото заполненного холодильника и витрины с товарами.",
        icon: Refrigerator,
        color: "text-pink-500",
        bgColor: "bg-pink-50",
        requiresPhoto: true,
        images: ['/instruktsiya/holodilnik.jpg', '/instruktsiya/vitrina.jpg']
    },
    {
        title: "Рабочее место",
        description: "Оставить после себя порядок. Отправить фото убранного рабочего места администратора.",
        icon: CheckCircle2,
        color: "text-emerald-500",
        bgColor: "bg-emerald-50",
        requiresPhoto: true
    }
];

interface Section9Props {
    setZoomedImage?: (url: string) => void;
}

export function Section9({ setZoomedImage }: Section9Props) {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="9" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3">
                        Закрытие <span className="text-teal-500">Смены</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Детальная отчетность — залог отсутствия штрафов и правильного расчета зарплаты. Все нижеперечисленные действия и фотографии необходимо отправлять в рабочий чат.
                    </p>
                </div>
                <div className="shrink-0 bg-slate-900 rounded-3xl p-4 md:px-6 flex items-center justify-center gap-4 text-white shadow-xl shadow-teal-500/10">
                    <Smartphone size={32} className="text-teal-400" />
                    <div>
                        <div className="text-[10px] font-chakra font-black uppercase tracking-widest text-teal-400 mb-1">Куда отправлять?</div>
                        <div className="font-tactic font-black text-lg md:text-xl italic">РАБОЧИЙ ЧАТ</div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 mb-12 shadow-sm">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                    <ClipboardList className="text-teal-500" size={24} />
                    <h3 className="font-tactic font-black text-xl md:text-2xl uppercase italic text-slate-900">Чек-лист закрытия</h3>
                </div>

                <div className="relative">
                    {/* Vertical Line for Timeline */}
                    <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-slate-100 hidden sm:block"></div>
                    
                    <div className="space-y-6">
                        {SHIFT_CLOSE_STEPS.map((step, idx) => {
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
                                    <div className={`flex-1 rounded-2xl border bg-slate-50 p-5 md:p-6 transition-colors ${step.requiresPhoto ? 'border-indigo-100 group-hover:border-indigo-300 group-hover:bg-indigo-50/30' : 'border-slate-100 group-hover:border-teal-200 group-hover:bg-white'} `}>
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div>
                                                <h4 className="font-tactic font-black uppercase text-sm md:text-base text-slate-800 mb-2 flex items-center gap-2">
                                                    {step.title}
                                                </h4>
                                                <p className="font-chakra text-slate-600 text-sm leading-relaxed">
                                                    {step.description}
                                                </p>
                                                {step.images && step.images.length > 0 && (
                                                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x">
                                                        {step.images.map((imgUrl, i) => (
                                                            <div 
                                                                key={i} 
                                                                className="relative shrink-0 border border-slate-200 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1 cursor-zoom-in group/img shadow-sm hover:shadow hover:border-indigo-300 transition-all snap-start"
                                                                onClick={() => setZoomedImage?.(imgUrl)}
                                                            >
                                                                <Image 
                                                                    src={imgUrl} 
                                                                    alt={`${step.title} Пример ${i + 1}`} 
                                                                    width={200} 
                                                                    height={150} 
                                                                    className="h-[100px] w-auto object-contain rounded-lg group-hover/img:opacity-90 transition-opacity" 
                                                                />
                                                                <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg shadow-sm text-slate-600 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                                    <ZoomIn size={14} />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Badge Requires Photo */}
                                            {step.requiresPhoto ? (
                                                <div className="shrink-0 inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200/50 self-start">
                                                    <Camera size={14} />
                                                    <span className="text-[10px] sm:text-xs font-chakra font-black uppercase tracking-wider">Сделать фото</span>
                                                </div>
                                            ) : (
                                                <div className="shrink-0 inline-flex items-center gap-2 bg-slate-200 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-300 self-start">
                                                    <Icon size={14} />
                                                    <span className="text-[10px] sm:text-xs font-chakra font-black uppercase tracking-wider">Действие</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 8/14
                </p>
            </div>
        </section>
    );
}



