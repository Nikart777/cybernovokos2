import React from 'react';
import { Sparkles, Trash2, ShieldCheck, AlertCircle, Bot, CalendarClock, Keyboard, Gamepad2, Monitor, MessageSquareText } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

export function Section11() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="11" label="Раздел" />
            
            <div className="mb-10">
                <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 block">
                    Уборка и <span className="text-cyan-500">Контроль</span>
                </h2>
                <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                    Правила поддержания чистоты в клубе и регламент плановых проверок оборудования по автоматизированным уведомлениям.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* УБОРКА АДМИНИСТРАТОРОМ */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm flex flex-col h-full">
                    <div className="flex flex-col mb-4 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="font-tactic font-black uppercase text-xl text-slate-900">Уборка администратором</h3>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                                <div className="text-[10px] font-tactic font-black uppercase text-slate-400 mb-1">Ночная смена</div>
                                <div className="font-tactic font-black text-cyan-500 text-lg italic">07:00</div>
                            </div>
                            <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                                <div className="text-[10px] font-tactic font-black uppercase text-slate-400 mb-1">Дневная смена</div>
                                <div className="font-tactic font-black text-cyan-500 text-lg italic">10:00</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-cyan-50 text-cyan-800 p-3 rounded-lg text-xs font-bold uppercase tracking-widest text-center mb-4 flex gap-2 items-center justify-center">
                        💡 Включи технический свет и делай уборку по чек-листу
                    </div>

                    <div className="font-chakra text-sm text-slate-700 space-y-4 flex-1">
                        <div>
                            <strong className="block text-slate-900 mb-1 uppercase text-xs tracking-wider border-b border-slate-100 pb-1">✅ ПК Места (обязательно)</strong>
                            <ul className="list-disc list-inside space-y-1 ml-1 text-slate-600">
                                <li>Мышь и амбушюры (влажными салфетками)</li>
                                <li>Протереть коврик → повесить на спинку кресла</li>
                                <li>При наличии крошек/грязи протереть стол полностью (и за монитором)</li>
                                <li>Монитор: ВЫКЛЮЧИТЬ, с фонариком, протирать спреем только следы пальцев</li>
                                <li>Стул придвинут, наушники на крючке, на клавиатуре влажная салфетка</li>
                            </ul>
                        </div>
                        <div>
                            <strong className="block text-slate-900 mb-1 uppercase text-xs tracking-wider border-b border-slate-100 pb-1">🎮 PS5 Зона (обязательно)</strong>
                            <ul className="list-disc list-inside space-y-1 ml-1 text-slate-600">
                                <li>Джойстики (протирать влажными после каждого гостя)</li>
                                <li>Бочка на месте, лежат 2 салфетки, диван чистый</li>
                            </ul>
                        </div>
                        <div>
                            <strong className="block text-slate-900 mb-1 uppercase text-xs tracking-wider border-b border-slate-100 pb-1">🏎 Автосимы (обязательно)</strong>
                            <ul className="list-disc list-inside space-y-1 ml-1 text-slate-600">
                                <li>Руль, платформа, педали (верх и бока)</li>
                                <li>Продуть зону педалей и за ними</li>
                            </ul>
                        </div>
                        <div>
                            <strong className="block text-slate-900 mb-1 uppercase text-xs tracking-wider border-b border-slate-100 pb-1">⚡ Быстрые точки</strong>
                            <ul className="list-disc list-inside space-y-1 ml-1 text-slate-600">
                                <li>Дверца холодильника (средством для стекла)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-4 bg-slate-900 text-white font-tactic text-xs uppercase p-3 rounded-xl shadow-md">
                        После уборки выключи тех. свет и поставь ✅ в чат
                    </div>
                </div>

                {/* ПРИХОДЯЩАЯ УБОРЩИЦА */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                <Trash2 size={20} />
                            </div>
                            <h3 className="font-tactic font-black uppercase text-xl text-slate-900">Приходящая уборщица</h3>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 font-chakra text-sm">
                                <span className="font-bold text-slate-700">ЛЕТО <span className="text-slate-400 text-xs font-normal">(май-авг)</span></span>
                                <span className="text-slate-600"><strong>1 раз</strong> в день (утро)</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 font-chakra text-sm">
                                <span className="font-bold text-slate-700">ЗИМА <span className="text-slate-400 text-xs font-normal">(сен-апр)</span></span>
                                <span className="text-slate-600"><strong>2 раза</strong> в день (утро, вечер)</span>
                            </div>
                            <div className="text-center text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-2">
                                Вынос мусора всегда 2 раза в день!
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex gap-3 text-sm font-chakra text-indigo-900">
                        <ShieldCheck className="shrink-0 text-indigo-500" size={20} />
                        <div>
                            <strong>Контроль:</strong> Администратор обязан делать переучет: жидкое мыло, бумага. Делать замечания в WhatsApp или жаловаться руководству при невыходе по графику.
                        </div>
                    </div>
                </div>
            </div>

            {/* НОВОВВЕДЕНИЕ: ПЛАНОВЫЕ ПРОВЕРКИ */}
            <div className="relative rounded-3xl bg-slate-900 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Bot size={180} className="text-white" />
                </div>
                
                <div className="p-6 md:p-10 relative z-10 text-white border-b border-white/10">
                    <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-chakra font-black uppercase tracking-widest mb-4 animate-pulse">
                        <AlertCircle size={14} /> Нововведение
                    </div>
                    <h3 className="font-tactic font-black uppercase text-2xl md:text-3xl italic mb-3">Автоматические напоминания</h3>
                    <p className="font-chakra text-slate-300 text-sm md:text-base max-w-2xl">
                        В рабочий чат теперь приходят автоматические напоминания о плановых проверках оборудования и товаров. Это строго обязательная часть работы.
                    </p>
                </div>

                <div className="p-6 md:p-10 bg-slate-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">🍔</div>
                            <div>
                                <div className="text-xs font-chakra font-bold text-slate-400 mb-1 flex items-center gap-1"><CalendarClock size={12}/> Каждый понедельник (11:00)</div>
                                <div className="font-chakra font-bold text-sm text-slate-200">Сроки годности и ротация сендвичей/чиабатт</div>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0"><Keyboard size={20}/></div>
                            <div>
                                <div className="text-xs font-chakra font-bold text-slate-400 mb-1 flex items-center gap-1"><CalendarClock size={12}/> 1-е число, раз в 2 месяца (11:00)</div>
                                <div className="font-chakra font-bold text-sm text-slate-200">Проверка кейкапов и тест мышей на дабл-клик</div>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0"><Gamepad2 size={20}/></div>
                            <div>
                                <div className="text-xs font-chakra font-bold text-slate-400 mb-1 flex items-center gap-1"><CalendarClock size={12}/> 2-е число, раз в 3 месяца (11:00)</div>
                                <div className="font-chakra font-bold text-sm text-slate-200">Проверка джойстиков и осмотр вентиляторов ПК</div>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0"><Monitor size={20}/></div>
                            <div>
                                <div className="text-xs font-chakra font-bold text-slate-400 mb-1 flex items-center gap-1"><CalendarClock size={12}/> 3-е число, раз в полгода (11:00)</div>
                                <div className="font-chakra font-bold text-sm text-slate-200">Проверка мониторов (битые пиксели, цвета)</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                            <MessageSquareText size={24} />
                        </div>
                        <div>
                            <h4 className="font-tactic font-black uppercase text-red-400 text-sm mb-2">Отчет — подтверждение выполнения</h4>
                            <p className="font-chakra text-slate-300 text-sm leading-relaxed">
                                После каждой проверки вы обязаны отписаться в этот чат с результатами. Укажите: <span className="text-white bg-black/20 px-1.5 py-0.5 rounded">номера проблемных ПК</span>, <span className="text-white bg-black/20 px-1.5 py-0.5 rounded">тип проблемы</span> и приложите <span className="text-white bg-black/20 px-1.5 py-0.5 rounded">фото</span>. Без отчёта проверка считается не проведённой!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 10/14
                </p>
            </div>
        </section>
    );
}



