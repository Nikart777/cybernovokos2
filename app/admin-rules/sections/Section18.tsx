import React from 'react';
import { GraduationCap, LogIn, MonitorSpeaker, Users, LogOut, ArrowRight, Clock, Target } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

interface Section18Props {
    setActiveSection?: (id: string) => void;
}

export function Section18({ setActiveSection }: Section18Props) {
    const handleRef = (id: string) => {
        if (setActiveSection) {
            setActiveSection(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="18" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <GraduationCap className="text-indigo-500 hidden sm:block" size={48} />
                        План <span className="text-indigo-500">Стажировки</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl flex items-center gap-2">
                        <Clock className="text-slate-400" size={16} /> Расчетное время стажировки: <strong className="text-slate-800">3-4 часа</strong>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* ЭТАП 1 */}
                <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <LogIn size={100} />
                    </div>
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-tactic font-black text-xl italic flex items-center justify-center">1</div>
                        <h3 className="font-tactic font-black uppercase text-xl text-slate-900">Начало работы</h3>
                    </div>
                    
                    <ul className="space-y-4 font-chakra text-sm text-slate-600 relative z-10">
                        <li className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                <span><strong>Приемка залов с ПК</strong> <br/><span className="text-xs text-slate-500">Аккуратная расстановка кресел, наличие всей периферии.</span></span>
                            </div>
                        </li>
                        <li className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                <span><strong>Приемка зоны PS5</strong> <br/><span className="text-xs text-slate-500">Джойстики, диваны, плойки.</span></span>
                            </div>
                            <button onClick={() => handleRef('section13')} className="self-start text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-3 py-1 rounded inline-flex items-center gap-1 hover:bg-indigo-200 transition-colors">Перейти к 'Зона TV (PS5)' <ArrowRight size={10}/></button>
                        </li>
                        <li className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                <span><strong>Открытие смены</strong> <br/><span className="text-xs text-slate-500">Пересчет кассы и товара в баре (сверка со входом).</span></span>
                            </div>
                            <button onClick={() => handleRef('section3')} className="self-start text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-3 py-1 rounded inline-flex items-center gap-1 hover:bg-indigo-200 transition-colors">Перейти к 'Открытие смены' <ArrowRight size={10}/></button>
                        </li>
                    </ul>
                </div>

                {/* ЭТАП 2 */}
                <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:border-blue-200 hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <MonitorSpeaker size={100} />
                    </div>
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-blue-500 text-white font-tactic font-black text-xl italic flex items-center justify-center">2</div>
                        <h3 className="font-tactic font-black uppercase text-xl text-slate-900">ПО LANGAME</h3>
                    </div>
                    
                    <ul className="space-y-4 font-chakra text-sm text-slate-600 relative z-10">
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span><strong>Карта клуба:</strong> Назначение, функции управления ПК.</span>
                        </li>
                        <li className="flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                <span><strong>Пополнение баланса / Возвраты:</strong> Механизмы списания и внесения.</span>
                            </div>
                            <div className="pl-3.5 flex gap-2">
                                <button onClick={() => handleRef('section5')} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded hover:bg-slate-200 transition-colors">Раздел: Оплата</button>
                                <button onClick={() => handleRef('section7')} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded hover:bg-slate-200 transition-colors">Раздел: Компенсации</button>
                            </div>
                        </li>
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span><strong>Аккаунты:</strong> Выдача клубных аккаунтов (Steam, FaceIT) через панель Langame. Создание гостевых (одноразовых) аккаунтов в программе для клиентов, которые отказываются скачивать приложение и регистрироваться.</span>
                        </li>
                        <li className="flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                <span><strong>Онлайн-бронирование:</strong> Отслеживание, активация броней.</span>
                            </div>
                            <button onClick={() => handleRef('section4')} className="ml-3.5 self-start text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded hover:bg-slate-200 transition-colors">Раздел: Бронирование</button>
                        </li>
                        <li className="flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                <span><strong>Бар:</strong> Продажа, учет товаров, онлайн-магазин в клиенте (доставка к ПК). Заказ сэндвичей, приемка.</span>
                            </div>
                            <button onClick={() => handleRef('section6')} className="ml-3.5 self-start text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded hover:bg-slate-200 transition-colors">Раздел: Управление баром</button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* ЭТАП 3 */}
                <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:border-[#FF2E63]/30 hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <Users size={100} />
                    </div>
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-[#FF2E63] text-white font-tactic font-black text-xl italic flex items-center justify-center">3</div>
                        <h3 className="font-tactic font-black uppercase text-xl text-slate-900">Зал и Клиенты</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 font-chakra text-xs text-slate-600 relative z-10">
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Target size={14} className="text-[#FF2E63] shrink-0" /> Тарифы, статусы, кэшбек (Премии)
                            <button onClick={() => handleRef('section8')} className="ml-auto bg-slate-200 hover:bg-slate-300 p-1 rounded transition-colors"><ArrowRight size={12}/></button>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Target size={14} className="text-[#FF2E63] shrink-0" /> Акции и механизмы начисления
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg col-span-1 sm:col-span-2">
                            <Target size={14} className="text-[#FF2E63] shrink-0" /> Приветствие, регистрация клиента, звонки (Обязанности)
                            <button onClick={() => handleRef('section2')} className="ml-auto bg-slate-200 hover:bg-slate-300 p-1 rounded transition-colors"><ArrowRight size={12}/></button>
                        </div>
                        <div className="flex flex-col gap-1 p-2 bg-slate-50 rounded-lg col-span-1 sm:col-span-2">
                            <div className="flex items-center gap-2">
                                <Target size={14} className="text-[#FF2E63] shrink-0" /> <strong>Помощь клиентам (Техподдержка)</strong>
                                <button onClick={() => handleRef('section14')} className="ml-auto bg-slate-200 hover:bg-slate-300 p-1 rounded transition-colors"><ArrowRight size={12}/></button>
                            </div>
                            <span className="text-slate-500 pl-6">ФПС, звук, микрофон, клава, бинды в CS/Dota. Тех. режим.</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Target size={14} className="text-[#FF2E63] shrink-0" /> Обновление игр ПК
                            <button onClick={() => handleRef('section12')} className="ml-auto bg-slate-200 hover:bg-slate-300 p-1 rounded transition-colors"><ArrowRight size={12}/></button>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Target size={14} className="text-[#FF2E63] shrink-0" /> Фоновая музыка
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Target size={14} className="text-[#FF2E63] shrink-0" /> Регламент уборки
                            <button onClick={() => handleRef('section11')} className="ml-auto bg-slate-200 hover:bg-slate-300 p-1 rounded transition-colors"><ArrowRight size={12}/></button>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Target size={14} className="text-[#FF2E63] shrink-0" /> Штрафы и нарушения
                            <button onClick={() => handleRef('section16')} className="ml-auto bg-slate-200 hover:bg-slate-300 p-1 rounded transition-colors"><ArrowRight size={12}/></button>
                        </div>
                    </div>
                </div>

                {/* ЭТАП 4 */}
                <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 md:p-8 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
                        <LogOut size={100} className="text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-tactic font-black text-xl italic flex items-center justify-center">4</div>
                        <h3 className="font-tactic font-black uppercase text-xl text-emerald-950">Закрытие смены</h3>
                    </div>
                    
                    <ul className="space-y-4 font-chakra text-sm text-emerald-800 relative z-10">
                        <li className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span><strong>Отчётность:</strong> Лист учета смен, отчет по программе Z/X, сверка безнала, остатков бара, фото-отчеты холодильников и терминалов.</span>
                        </li>
                        <li className="flex gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span><strong>Таблица онлайн:</strong> Назначение, внесение данных о выручке за смену, расчет премии.</span>
                        </li>
                        <li>
                            <button onClick={() => handleRef('section9')} className="text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white px-4 py-2 rounded-xl border border-emerald-500 shadow-sm hover:bg-emerald-500 transition-colors flex items-center gap-2">
                                Перейти к 'Закрытие смены' <ArrowRight size={14}/>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-20 flex flex-col items-center gap-6 pb-12">
                <div className="flex items-center gap-3 text-slate-500 font-chakra uppercase tracking-widest text-sm font-bold">
                    <Target size={18} className="text-[#FF2E63]" />
                    <span>Финальный Этап</span>
                </div>
                
                <h3 className="font-tactic font-black text-3xl text-center text-slate-900 italic uppercase">
                    Проверка Знаний
                </h3>
                
                <p className="text-center text-slate-600 max-w-lg mb-4 font-chakra">
                    Пройдите итоговое тестирование из 18 сложных вопросов, чтобы подтвердить усвоение всех регламентов и готовность к полноценной работе.
                </p>

                <a 
                    href="/admin-test"
                    className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-10 py-5 rounded-full shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_50px_rgba(99,102,241,0.6)] transition-all transform hover:-translate-y-1 font-tactic italic uppercase tracking-wider text-xl overflow-hidden w-full max-w-md"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                    <span>Начать Технический Тест</span>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </a>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 18/18
                </p>
            </div>
        </section>
    );
}
