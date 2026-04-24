import React from 'react';
import { ShieldAlert, Receipt, Sparkles, BrainCog, AlertOctagon, Frown } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

export function Section16() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="16" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <ShieldAlert className="text-red-500 hidden sm:block" size={48} />
                        Нарушения и <span className="text-red-500">штрафы</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Система материальной и дисциплинарной ответственности за несоблюдение стандартов и правил клуба CYBERX.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                {/* ФИНАНСОВЫЕ НАРУШЕНИЯ */}
                <div className="bg-white rounded-3xl border border-rose-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-rose-50 p-5 flex items-center gap-3 border-b border-rose-100">
                        <Receipt className="text-rose-600" size={24} />
                        <h3 className="font-tactic font-black text-lg uppercase text-rose-900">Касса и Финансы</h3>
                    </div>
                    <div className="p-5 font-chakra text-sm">
                        <ul className="divide-y divide-rose-100">
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Несход наличных в кассе</span>
                                <span className="font-bold text-rose-600 whitespace-nowrap ml-4">Сумма несхода</span>
                            </li>
                            <li className="flex justify-between items-start py-3">
                                <div className="text-slate-700">
                                    <span className="block mb-1">Несход при инвентаризации бара</span>
                                    <span className="text-xs text-rose-800 bg-rose-100/50 border border-rose-200 rounded px-2 py-1 inline-block mt-0.5 leading-tight">
                                        <strong>Систематический</strong> (если руководство приехало &gt;2 раз и есть несходы) = <strong className="font-black">Сумма несхода × 2</strong>
                                    </span>
                                </div>
                                <span className="font-bold text-rose-600 whitespace-nowrap ml-4 mt-0.5">Сумма несхода</span>
                            </li>
                            <li className="flex justify-between items-start py-3">
                                <div className="text-slate-700">
                                    <span className="block mb-1">Инкассация наличных без согласования</span>
                                    <span className="text-xs text-rose-800 bg-rose-100/50 border border-rose-200 rounded px-2 py-1 inline-block mt-0.5 leading-tight">
                                        В том числе, если оформлена трата на нужды клуба (инвентарь, бумага), но <strong>нет отчетного чека</strong>
                                    </span>
                                </div>
                                <span className="font-bold text-rose-600 whitespace-nowrap ml-4 mt-0.5">Сумма инкассации</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Возврат денег клиенту без согласования руководства</span>
                                <span className="font-bold text-rose-600 whitespace-nowrap ml-4">Сумма возврата</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Не проведена доплата в программе за PS5 (>2/4 чел)</span>
                                <span className="font-bold text-rose-600 whitespace-nowrap ml-4">300 ₽</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ЧИСТОТА И ПОРЯДОК */}
                <div className="bg-white rounded-3xl border border-orange-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-orange-50 p-5 flex items-center gap-3 border-b border-orange-100">
                        <Sparkles className="text-orange-600" size={24} />
                        <h3 className="font-tactic font-black text-lg uppercase text-orange-900">Порядок и Чистота</h3>
                    </div>
                    <div className="p-5 font-chakra text-sm">
                        <ul className="divide-y divide-orange-100">
                            <li className="flex justify-between items-start py-3">
                                <div className="text-slate-700">
                                    <strong className="block mb-1 text-slate-900">Грязное игровое место ПК:</strong>
                                    Стул не придвинут, наушники не крючке, монитор не придвинут к стене, крошки на столе, <u className="decoration-orange-400">нет влажной салфетки на клавиатуре</u>.
                                </div>
                                <span className="font-bold text-orange-600 whitespace-nowrap ml-4">200 ₽ / ПК</span>
                            </li>
                            <li className="flex justify-between items-start py-3">
                                <div className="text-slate-700">
                                    <strong className="block mb-1 text-slate-900">Грязная зона TV (PS5):</strong>
                                    Бочка сдвинута, мусор на столе/диване/полу, нет 2 влажных салфеток.
                                </div>
                                <span className="font-bold text-orange-600 whitespace-nowrap ml-4">200 ₽ / TV</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Грязные джойстики</span>
                                <span className="font-bold text-orange-600 whitespace-nowrap ml-4">100 ₽ / шт</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Неаккуратная выкладка товара в холодильнике</span>
                                <span className="font-bold text-orange-600 whitespace-nowrap ml-4">200 ₽</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Отсутствие актуальных ценников</span>
                                <span className="font-bold text-orange-600 whitespace-nowrap ml-4">50 ₽ / ценник</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* РАБОЧИЙ ПРОЦЕСС */}
                <div className="bg-white rounded-3xl border border-violet-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-violet-50 p-5 flex items-center gap-3 border-b border-violet-100">
                        <BrainCog className="text-violet-600" size={24} />
                        <h3 className="font-tactic font-black text-lg uppercase text-violet-900">Рабочий Процесс</h3>
                    </div>
                    <div className="p-5 font-chakra text-sm">
                        <ul className="divide-y divide-violet-100">
                            <li className="flex justify-between items-start py-3 gap-4">
                                <span className="text-slate-700 w-2/3">Жалоба на бездействие (проблема клиента описана в правилах, но админ не применил решение и не обратился в техподдержку)</span>
                                <span className="font-bold text-violet-600 whitespace-nowrap">1 000 ₽</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Не обновлены обязательные игры на ПК</span>
                                <span className="font-bold text-violet-600 whitespace-nowrap ml-4">200 ₽ / ПК</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Куртка на кресле администратора</span>
                                <span className="font-bold text-violet-600 whitespace-nowrap ml-4">400 ₽</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700">Отсутствие фоновой музыки в клубе</span>
                                <span className="font-bold text-violet-600 whitespace-nowrap ml-4">600 ₽</span>
                            </li>
                            <li className="flex justify-between items-center py-3">
                                <span className="text-slate-700 font-bold text-rose-600">Посетитель спит в клубе без оплаченного времени</span>
                                <span className="font-black text-rose-600 whitespace-nowrap ml-4">3 000 ₽</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* КРИТИЧЕСКИЕ НАРУШЕНИЯ */}
                <div className="bg-slate-900 rounded-3xl shadow-[0_0_20px_rgba(225,29,72,0.3)] overflow-hidden flex flex-col border border-red-900 mt-0 lg:-mt-12 relative z-10 lg:scale-105">
                    <div className="bg-red-600 p-5 flex items-center gap-3">
                        <AlertOctagon className="text-white" size={28} />
                        <h3 className="font-tactic font-black text-xl uppercase italic text-white flex-1 drop-shadow-md">КРИТИЧЕСКИЕ НАРУШЕНИЯ</h3>
                    </div>
                    <div className="p-6 font-chakra text-sm space-y-6">
                        
                        {/* Сон на рабочем месте */}
                        <div className="border-b border-slate-700 pb-5">
                            <h4 className="font-bold text-rose-400 mb-3 text-base flex items-center gap-2 uppercase tracking-wide">
                                <Frown size={18} /> Сон на рабочем месте
                            </h4>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-4 items-center bg-white/5 p-2 rounded-lg">
                                    <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs font-bold uppercase w-20 text-center">1й раз</span>
                                    <span className="text-slate-300">Строгое предупреждение</span>
                                </div>
                                <div className="flex gap-4 items-center bg-white/5 p-2 rounded-lg">
                                    <span className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-bold uppercase w-20 text-center">2й раз</span>
                                    <span className="text-orange-300 font-bold">Штраф 5 000 ₽</span>
                                </div>
                                <div className="flex gap-4 items-center bg-red-900/40 p-2 rounded-lg border border-red-500/20">
                                    <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase w-20 text-center">3й раз</span>
                                    <span className="text-red-400 font-black">Увольнение (без з/п)</span>
                                </div>
                            </div>
                        </div>

                        {/* Увольнения */}
                        <ul className="space-y-4">
                            <li>
                                <div className="text-slate-300 mb-1">Воровство: Взятие денег из кассы на свои нужды без согласования руководства</div>
                                <div className="text-red-400 font-black uppercase text-xs tracking-widest bg-red-950 inline-block px-3 py-1 border border-red-900 rounded">Увольнение</div>
                            </li>
                            <li>
                                <div className="text-slate-300 mb-1">Нахождение на рабочем месте в нетрезвом состоянии</div>
                                <div className="text-red-400 font-black uppercase text-xs tracking-widest bg-red-950 inline-block px-3 py-1 border border-red-900 rounded">Увольнение</div>
                            </li>
                            <li>
                                <div className="text-slate-300 mb-1">Невыход на смену без предупреждения менее чем за 2 дня</div>
                                <div className="text-red-400 font-black uppercase text-xs tracking-widest bg-red-950 inline-block px-3 py-1 border border-red-900 rounded">Увольнение (без з/п)</div>
                            </li>
                            <li>
                                <div className="text-slate-300 mb-1">Уведомление об увольнении менее чем за 14 дней</div>
                                <div className="text-red-400 font-black flex items-center flex-wrap gap-2 uppercase text-xs tracking-widest mt-2">
                                    <span className="bg-red-950 px-3 py-1 border border-red-900 rounded">Увольнение без з/п</span> 
                                    <span className="text-slate-500 lowercase">или</span> 
                                    <span className="bg-orange-950 text-orange-400 px-3 py-1 border border-orange-900 rounded">50% от з/п</span>
                                    <span className="text-slate-500 normal-case tracking-normal ml-1">(на усмотрение рук-ва)</span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>

        </section>
    );
}



