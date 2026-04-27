import React from 'react';
import { Trophy, Flame, Ban, TrendingUp, Sun, Moon, AlertTriangle, MonitorPlay, Camera, MessageSquare, Star, Plus, Minus, DollarSign } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const DAY_SHIFT = [
    { range: '0 — 1 499 ₽', percent: '5%', status: '🩸 FIRST BLOOD' },
    { range: '1 500+ ₽', percent: '10%', status: '💪 DOMINATING' },
    { range: '2 600+ ₽', percent: '20%', status: '😈 GODLIKE' },
    { range: '3 700+ ₽', percent: '25%', status: '👑 RAMPAGE' },
];

const NIGHT_SHIFT = [
    { range: '0 — 1 099 ₽', percent: '5%', status: '🩸 FIRST BLOOD' },
    { range: '1 100+ ₽', percent: '10%', status: '💪 DOMINATING' },
    { range: '1 600+ ₽', percent: '20%', status: '😈 GODLIKE' },
    { range: '2 700+ ₽', percent: '25%', status: '👑 RAMPAGE' },
];

export function Section8() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="8" label="Раздел" />
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3">
                        Система <span className="text-emerald-500">Премий</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Твой крутой доход строится на «скиллах» и активных продажах. Чем активнее смена — тем больше денег!
                    </p>
                </div>
                <div className="shrink-0 bg-emerald-50 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-3xl p-4 flex items-center justify-center gap-4 text-emerald-900 shadow-sm">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div className="text-xs font-chakra font-black uppercase tracking-widest text-emerald-600/80 mb-0.5">Базовый фикс</div>
                        <div className="font-tactic font-black text-xl md:text-2xl italic">2 500 ₽</div>
                    </div>
                </div>
            </div>

            {/* ГЛАВНАЯ МОТИВАЦИЯ */}
            <div className="mb-12 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between group border border-blue-400/30">
                <div className="absolute -right-4 -top-4 opacity-[0.07] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                    <Trophy size={200} />
                </div>
                <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full font-chakra font-bold text-xs uppercase tracking-widest backdrop-blur-sm border border-white/20">
                        <Star size={14} className="text-yellow-400 fill-yellow-400/50" />
                        Топовая мотивация
                    </div>
                    <h3 className="font-tactic font-black text-2xl md:text-4xl italic uppercase drop-shadow-sm">
                        Бесплатный <span className="text-yellow-400">аккаунт</span>
                    </h3>
                    <p className="font-chakra text-blue-100 text-sm md:text-base leading-relaxed">
                        Стабильно работаешь и показываешь крутые результаты? <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded">Через 3 месяца</strong> после начала работы администратор может получить персональный аккаунт на <strong className="text-white border-b-2 border-yellow-400">абсолютно бесплатное пользование клубом</strong>!
                    </p>
                </div>
                <div className="shrink-0 relative z-10 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-2xl md:rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner group-hover:bg-white/20 transition-all duration-300 group-hover:-translate-y-2">
                    <MonitorPlay size={48} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                </div>
            </div>

            {/* БЛОК БАРА И ЛК */}
            <div className="relative mb-12 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <Flame size={200} />
                </div>
                
                <div className="p-6 md:p-8 relative z-10">
                    <h3 className="font-tactic font-black uppercase italic text-2xl mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">🍔</span>
                        Премия за продажи бара
                    </h3>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm mt-1">
                                <MonitorPlay size={20} />
                            </div>
                            <div>
                                <h4 className="font-tactic font-black text-amber-900 uppercase text-sm mb-2">Очень важно: Личный Кабинет</h4>
                                <p className="font-chakra text-slate-700 text-sm mb-3">
                                    Продажи через <strong>Личный кабинет гостя</strong> напрямую учитываются в вашей выручке! Обязательно рассказывайте об этой функции клиентам — это удобно для них и моментально повышает ваш итоговый чек.
                                </p>
                                <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-chakra font-bold">
                                    <AlertTriangle size={14} />
                                    <span>ВНИМАНИЕ: Заказ из ЛК необходимо строго обязательно приносить гостю за его компьютер!</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Дневная смена */}
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                                <Sun size={20} className="text-blue-500" />
                                <span className="font-tactic font-black text-blue-900 uppercase italic">Дневная смена</span>
                            </div>
                            <div className="p-2">
                                {DAY_SHIFT.map((tier, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group">
                                        <div className="font-chakra text-sm font-bold text-slate-700">{tier.range}</div>
                                        <div className="flex items-center gap-4">
                                            <div className="font-tactic font-black text-[10px] md:text-xs uppercase text-slate-400 group-hover:text-blue-500 transition-colors w-24 text-right">
                                                {tier.status}
                                            </div>
                                            <div className="w-14 text-right font-tactic font-black text-emerald-500 text-lg italic">
                                                {tier.percent}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ночная смена */}
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                                <Moon size={20} className="text-indigo-500" />
                                <span className="font-tactic font-black text-indigo-900 uppercase italic">Ночная смена</span>
                            </div>
                            <div className="p-2">
                                {NIGHT_SHIFT.map((tier, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group">
                                        <div className="font-chakra text-sm font-bold text-slate-700">{tier.range}</div>
                                        <div className="flex items-center gap-4">
                                            <div className="font-tactic font-black text-[10px] md:text-xs uppercase text-slate-400 group-hover:text-indigo-500 transition-colors w-24 text-right">
                                                {tier.status}
                                            </div>
                                            <div className="w-14 text-right font-tactic font-black text-emerald-500 text-lg italic">
                                                {tier.percent}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* ДОП. БОНУСЫ */}
                <div>
                    <h4 className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                        <Trophy size={14} />
                        Дополнительные Бонусы и Штрафы
                    </h4>
                    <div className="space-y-4">
                        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-start gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">🎟️</div>
                            <div>
                                <h5 className="font-tactic font-black text-sm uppercase text-slate-900">Продажа абонементов</h5>
                                <p className="font-chakra text-slate-600 text-sm mt-1 mb-2">За каждую активную продажу абонемента начисляется бонус.</p>
                                <span className="inline-flex items-center gap-1 font-chakra font-black text-xs uppercase tracking-wider text-violet-600 bg-violet-50 px-2 py-1 rounded-md">
                                    <Plus size={12}/> 10% от стоимости
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-sm flex items-start gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Star size={64}/></div>
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <MessageSquare size={20} />
                            </div>
                            <div className="relative z-10">
                                <h5 className="font-tactic font-black text-sm uppercase text-slate-900">Положительный отзыв</h5>
                                <p className="font-chakra text-slate-600 text-sm mt-1 mb-2">Крутой, развернутый отзыв клиента (Яндекс / 2GIS) с ФОТО и указанием Вашего Имени.</p>
                                <span className="inline-flex items-center gap-1 font-chakra font-black text-xs uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                    <Plus size={12}/> 250 ₽
                                </span>
                            </div>
                        </div>

                        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 shadow-sm flex items-start gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-white text-rose-500 shadow-sm flex items-center justify-center">
                                <Ban size={20} />
                            </div>
                            <div>
                                <h5 className="font-tactic font-black text-sm uppercase text-rose-900">Негативный отзыв</h5>
                                <p className="font-chakra text-rose-700/80 text-sm mt-1 mb-2">Если получен обоснованно плохой отзыв из-за косяков на смене, штрафуется каждый администратор.</p>
                                <span className="inline-flex items-center gap-1 font-chakra font-black text-xs uppercase tracking-wider text-white bg-rose-500 px-2 py-1 rounded-md">
                                    <Minus size={12}/> 150 ₽
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ПРОБКОВЫЙ СБОР */}
                <div>
                    <h4 className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-rose-500 mb-5">
                        <Ban size={14} />
                        Пробковый сбор
                    </h4>
                    <div className="rounded-3xl border-2 border-rose-100 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-start gap-4">
                            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mt-1 shrink-0">
                                <span className="font-tactic font-black text-xl line-through">🥤</span>
                            </div>
                            <div>
                                <h5 className="font-tactic font-black text-rose-900 uppercase italic text-lg mb-2">Полный запрет с 1 мая</h5>
                                <p className="font-chakra text-slate-600 text-sm leading-relaxed mb-4">
                                    Вводится полный запрет на принесенные с собой напитки и еду без оплаты пробкового взноса.
                                </p>
                                <div className="inline-flex items-center gap-2 bg-rose-600 text-white rounded-xl px-4 py-2 font-chakra font-bold text-sm shadow-md shadow-rose-600/20">
                                    <span>Размер взноса:</span> <span className="font-tactic italic text-lg ml-1">100 ₽</span> <span className="text-xs font-normal opacity-80">(с клиента)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-slate-100 pt-5 space-y-3">
                            <p className="font-chakra text-sm font-bold text-slate-700 w-full mb-3">Ваша дисциплина в этом вопросе напрямую влияет на увеличение выплат за ваш бар!</p>
                            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 shrink-0 flex items-center justify-center"><Camera size={12} /></div>
                                <p className="font-chakra text-xs text-slate-600 leading-relaxed">Постоянный мониторинг по камерам видеонаблюдения и обязательный регулярный физический обход игровых залов.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ИТОГОВЫЙ РАСЧЕТ FORMULA */}
            <div className="rounded-3xl bg-slate-900 text-white overflow-hidden shadow-xl shadow-slate-900/20">
                <div className="p-6 md:px-10 md:py-8 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
                            <DollarSign size={14} />
                            Калькуляция
                        </h4>
                        <h3 className="font-tactic font-black uppercase italic text-2xl md:text-3xl text-white">Итоговый расчет</h3>
                    </div>
                </div>
                <div className="p-6 md:p-10 bg-gradient-to-br from-slate-900 to-slate-800">
                    <p className="font-chakra text-slate-400 text-sm md:text-base mb-6 text-center md:text-left">
                        Ваша итоговая зарплата вычисляется просто и прозрачно:
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-4 gap-x-2 md:gap-x-4 font-tactic font-black text-sm md:text-lg uppercase">
                        <span className="px-4 py-2 bg-white/10 rounded-xl border border-white/5 shadow-inner">Оклад</span>
                        <span className="text-emerald-400"><Plus size={20}/></span>
                        <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/20">Бар</span>
                        <span className="text-emerald-400"><Plus size={20}/></span>
                        <span className="px-4 py-2 bg-violet-500/20 text-violet-400 rounded-xl border border-violet-500/20">Абонементы</span>
                        <span className="text-rose-400"><Minus size={20}/></span>
                        <span className="px-4 py-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20">Штрафы</span>
                        <span className="text-emerald-400"><Plus size={20}/></span>
                        <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/20 flex gap-2 items-center">
                            Отзывы <Star size={16}/>
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 7/14
                </p>
            </div>
        </section>
    );
}



