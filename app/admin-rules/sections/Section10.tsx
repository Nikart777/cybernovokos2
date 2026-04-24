import React from 'react';
import Image from 'next/image';
import { AlertTriangle, PowerOff, ShieldAlert, Users, Server, MessageSquareWarning, Zap, ZoomIn } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const FORCE_MAJEURE_STEPS = [
    {
        title: "Сообщить руководству",
        description: "Незамедлительно уведомить руководство о происшествии в рабочем чате.",
        icon: ShieldAlert
    },
    {
        title: "Успокоить клиентов",
        description: "Принести извинения клиентам, сообщить об аварии на линии. Успокоить, что каждому будет начислена компенсация.",
        icon: Users
    },
    {
        title: "Сбор логнов",
        description: "Собрать у всех находящихся в клубе клиентов их логины (аккаунты) и отправить списком в чат для начисления.",
        icon: MessageSquareWarning
    },
    {
        title: "Восстановление работы",
        description: "Дождаться включения электричества. Подождать загрузки маршрутизаторов и роутера, после чего включить гостевые ПК.",
        icon: Server
    }
];

interface Section10Props {
    setZoomedImage?: (url: string) => void;
}

export function Section10({ setZoomedImage }: Section10Props) {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="10" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <AlertTriangle className="text-orange-500 hidden sm:block" size={48} />
                        Форс-<span className="text-orange-500">Мажор</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Инструкция по действиям в случае непредвиденных обстоятельств, таких как отключение электричества или падение интернет-соединения в клубе.
                    </p>
                </div>
            </div>

            <div className="rounded-3xl border border-orange-200 bg-orange-50/50 overflow-hidden shadow-sm mb-12">
                <div className="bg-orange-500 px-6 py-4 flex items-center justify-between border-b border-orange-600">
                    <div className="flex items-center gap-3 text-white">
                        <PowerOff className="animate-pulse" size={24} />
                        <h3 className="font-tactic font-black uppercase text-xl italic tracking-wider">Алгоритм при сбое (Свет / Интернет)</h3>
                    </div>
                </div>
                
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {FORCE_MAJEURE_STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                    <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-tactic font-black text-orange-500 italic mb-1">Шаг {idx + 1}</div>
                                        <h4 className="font-tactic font-black uppercase text-slate-900 text-sm mb-2">{step.title}</h4>
                                        <p className="font-chakra text-slate-600 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-6 border-t border-orange-200">
                        <div className="flex flex-col md:flex-row gap-6 p-6 sm:p-8 rounded-3xl bg-white border-2 border-orange-200 shadow-sm">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#FF2E63] shrink-0">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-chakra font-black uppercase tracking-widest text-[#FF2E63]">Важно для Новокосино</div>
                                        <h4 className="font-tactic font-black uppercase text-slate-900 text-lg">Проверка Электрощитка</h4>
                                    </div>
                                </div>
                                <p className="font-chakra text-slate-600 text-sm leading-relaxed">
                                    При проблемах с электричеством в первую очередь необходимо проверить состояние электрощитка. 
                                    Особое внимание обратите на <strong>два верхних главных автомата</strong> — они должны быть 
                                    подняты вверх, как и все остальные автоматы на панели.
                                </p>
                            </div>
                            <div className="shrink-0 w-full sm:w-64">
                                <div 
                                    className="relative rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 cursor-zoom-in group shadow-sm hover:shadow-md hover:border-orange-300 transition-all aspect-[4/3] flex items-center justify-center"
                                    onClick={() => setZoomedImage?.('/instruktsiya/electro-shitok.jpg')}
                                >
                                    <Image 
                                        src="/instruktsiya/electro-shitok.jpg" 
                                        alt="Электрощиток Новокосино" 
                                        fill
                                        className="object-cover group-hover:opacity-90 transition-opacity" 
                                    />
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-3 right-3 p-2 bg-white/95 rounded-xl shadow-sm text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105">
                                        <ZoomIn size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 9/14
                </p>
            </div>
        </section>
    );
}



