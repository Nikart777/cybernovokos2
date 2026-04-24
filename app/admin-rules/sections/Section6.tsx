import React from 'react';
import Image from 'next/image';
import { Coffee, ClipboardCheck, Truck, Receipt, Container, Settings, Tags, ShoppingCart, Info, ZoomIn, MonitorPlay } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const BAR_TASKS = [
    {
        title: "Поставки",
        description: "Принимать поставки товаров и сверять фактически привезенный товар с накладной.",
        icon: Truck,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10"
    },
    {
        title: "Финансы",
        description: "Проводить расчеты с курьерами и делать инкассацию наличных в системе.",
        icon: Receipt,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },
    {
        title: "Мерчендайзинг",
        description: "Поддерживать заполненность холодильника и витрины, следить за расстановкой ценников.",
        icon: Tags,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        title: "Заказы клиентов",
        description: "Оперативно приносить товары, заказанные через ЛК, непосредственно к ПК гостя.",
        icon: ShoppingCart,
        color: "text-[#FF2E63]",
        bgColor: "bg-[#FF2E63]/10"
    },
    {
        title: "Учет",
        description: "Обязательно отмечать передачу товара клиенту в админ-панели.",
        icon: ClipboardCheck,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    }
];

interface Section6Props {
    setZoomedImage?: (url: string) => void;
}

export function Section6({ setZoomedImage }: Section6Props) {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="6" label="Раздел" />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-6">
                Управление <span className="text-amber-500">баром</span>
            </h2>
            
            <p className="font-chakra text-slate-600 text-sm md:text-base leading-relaxed mb-10 max-w-3xl">
                Бар — это не только способ пополнения баланса клиентов, но и важная часть премиального сервиса клуба. Администратор несет полную ответственность за ассортимент и выдачу товаров.
            </p>

            {/* Специальное внимание: Заказ из ЛК гостя */}
            <div className="mb-12">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#FF2E63] mb-6">
                    <MonitorPlay size={14} />
                    Заказы через Личный Кабинет Гостя
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden p-6">
                    <p className="font-chakra text-slate-700 text-sm md:text-base leading-relaxed mb-6 border-l-4 border-[#FF2E63] pl-4">
                        Гости могут самостоятельно заказывать еду и напитки **прямо во время игры**, не отрываясь от своего ПК, через встроенный магазин в Личном Кабинете (ЛК). Это сильно повышает выручку бара, так как клиентам не нужно вставать и идти к стойке. Напоминайте новым гостям об этой возможности!
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div 
                            className="relative border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 cursor-zoom-in group/img shadow-inner transition-colors hover:bg-slate-100"
                            onClick={() => setZoomedImage?.('/instruktsiya/bar-client-2.webp')}
                        >
                            <Image src="/instruktsiya/bar-client-2.webp" alt="Покупка через ЛК Шаг 1" width={600} height={400} className="w-full h-auto object-contain rounded-xl mix-blend-multiply group-hover/img:scale-[1.02] transition-transform duration-300" />
                            <div className="absolute top-4 right-4 p-2 bg-white/90 rounded-xl shadow-lg text-slate-600 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <ZoomIn size={16} />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/90 backdrop-blur-sm text-xs font-chakra font-bold text-slate-600 p-2 rounded-xl border border-slate-200/50 shadow-sm">
                                    <span className="text-[#FF2E63] mr-1">1.</span> Клиент открывает раздел МАГАЗИН
                                </div>
                            </div>
                        </div>

                        <div 
                            className="relative border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 cursor-zoom-in group/img shadow-inner transition-colors hover:bg-slate-100"
                            onClick={() => setZoomedImage?.('/instruktsiya/bar-client-1.webp')}
                        >
                            <Image src="/instruktsiya/bar-client-1.webp" alt="Покупка через ЛК Шаг 2" width={600} height={400} className="w-full h-auto object-contain rounded-xl mix-blend-multiply group-hover/img:scale-[1.02] transition-transform duration-300" />
                            <div className="absolute top-4 right-4 p-2 bg-white/90 rounded-xl shadow-lg text-slate-600 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <ZoomIn size={16} />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/90 backdrop-blur-sm text-xs font-chakra font-bold text-slate-600 p-2 rounded-xl border border-slate-200/50 shadow-sm">
                                    <span className="text-[#FF2E63] mr-1">2.</span> Добавляет товары в корзину и нажимает "Оплатить"
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Задачи бара */}
            <div className="mb-12">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                    <Coffee size={14} />
                    Обязанности по бару
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {BAR_TASKS.map((task, idx) => {
                        const Icon = task.icon;
                        return (
                            <div key={idx} className="group relative flex flex-col p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${task.bgColor} ${task.color} group-hover:scale-110 transition-transform`}>
                                    <Icon size={24} />
                                </div>
                                <div className="font-tactic font-black text-slate-900 uppercase italic text-base mb-2">
                                    {task.title}
                                </div>
                                <p className="font-chakra text-slate-500 text-sm leading-relaxed mb-2">
                                    {task.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Специальные заказы (Сэндвичи) */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-lg shadow-amber-500/20">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shadow-inner">
                    <Container size={28} />
                </div>
                <div>
                    <h3 className="font-tactic font-black uppercase italic text-xl mb-2 flex items-center gap-2">
                        Заказ сэндвичей
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-white text-amber-500 text-[10px] uppercase font-black not-italic tracking-wider animate-pulse">
                            Важно
                        </span>
                    </h3>
                    <p className="font-chakra text-white/90 text-sm md:text-base leading-relaxed mb-5 max-w-2xl">
                        Сэндвичи заказываются администратором самостоятельно через контакт «Великоросс сэндвичи», когда в остатке остается всего 3-4 штуки. 
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/20 border border-white/10 font-chakra font-medium text-sm">
                            <Settings size={14} className="text-white/60" />
                            <span>Контакт: <strong>Великоросс сэндвичи</strong></span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/20 border border-white/10 font-chakra font-medium text-sm">
                            <Info size={14} className="text-white/60" />
                            <span>Лимит: <strong>Не более 20 шт. за 1 заказ</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 5/14
                </p>
                {/* Optional navigation back/forward depending on future sections */}
            </div>
        </section>
    );
}



