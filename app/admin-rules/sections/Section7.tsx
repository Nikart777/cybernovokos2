import React from 'react';
import { Calculator, Clock, FileText, Ban, AlertOctagon, Phone, Link2 } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

export function Section7() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="7" label="Раздел" />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-6">
                <span className="text-violet-600">Компенсации</span> клиентам
            </h2>
            
            <p className="font-chakra text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                Начисления баланса как компенсации проводятся руководством строго с 09:00 до 23:00. Для исключения ошибок внедрена система автоматизированного расчета.
            </p>

            {/* За что компенсируем */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-8 shadow-sm">
                <h3 className="font-tactic font-black uppercase text-lg text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                        <AlertOctagon size={16} />
                    </div>
                    За что положена компенсация?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                        <h4 className="font-tactic font-black text-sm uppercase text-slate-800 mb-2">Не обновлена игра из списка обязательных</h4>
                        <p className="font-chakra text-sm text-slate-600 mb-2">
                            Если клиент жалуется на то, что не обновлена базовая игра (CS2, Dota 2, Valorant и др.) — происходит <strong>сброс сессии клиента</strong> и перевод ПК в <strong>Технический режим</strong> для обновления.
                        </p>
                        <div className="text-[10px] font-chakra font-bold text-violet-600 uppercase tracking-widest bg-violet-50 inline-block px-2 py-1 rounded">См. Раздел «Обновления ПК»</div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                        <h4 className="font-tactic font-black text-sm uppercase text-slate-800 mb-2">Установка большой игры</h4>
                        <p className="font-chakra text-sm text-slate-600">
                            Если клиент хочет скачать/установить крупную игру: попросите его <strong className="text-violet-600">не играть и просто ожидать</strong>. Когда игра установится, клиент должен подойти к вам для точного расчета времени ожидания и компенсации.
                        </p>
                    </div>
                </div>
            </div>
            {/* Карточка калькулятора */}
            <div className="mb-10 text-center sm:text-left rounded-3xl bg-violet-600 shadow-xl shadow-violet-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Calculator size={160} className="text-white" />
                </div>
                <div className="relative p-6 md:p-8 text-white z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h3 className="font-tactic font-black text-2xl uppercase italic mb-2">Автоматизированный расчет</h3>
                        <p className="font-chakra text-violet-100/90 text-sm md:text-base max-w-lg mb-4">
                            Система сама умножит время на актуальную цену минуты именно для этого дня и часа.
                        </p>
                    </div>
                    <a 
                        href="https://cyberx-novokosino.ru/calculator" 
                        target="_blank" 
                        rel="noreferrer"
                        className="group inline-flex items-center justify-center gap-3 bg-white text-violet-600 px-8 py-4 rounded-2xl font-chakra font-black uppercase tracking-widest hover:bg-violet-50 transition-colors shadow-lg shadow-black/10"
                    >
                        <Calculator size={20} />
                        <span>Открыть калькулятор</span>
                        <Link2 size={16} className="text-violet-400 group-hover:text-violet-600 transition-colors" />
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Как происходит расчет */}
                <div>
                    <h4 className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                        <Clock size={14} />
                        Инструкция по калькулятору
                    </h4>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-tactic text-xs italic">1</div>
                                <p className="font-chakra text-sm text-slate-600">Перейдите в калькулятор по ссылке выше.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-tactic text-xs italic">2</div>
                                <p className="font-chakra text-sm text-slate-600">Выделите: <strong>Клуб</strong>, <strong>Зону</strong>, <strong>Наличие брони у гостя</strong>, <strong>Тариф клиента</strong>, и <strong>Потраченное время</strong>, которое нужно компенсировать.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-tactic text-xs italic">3</div>
                                <p className="font-chakra text-sm text-slate-600">Нажмите <strong>«Рассчитать компенсацию»</strong>.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Шаблон заявки */}
                <div>
                    <h4 className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-cyan-600 mb-5">
                        <FileText size={14} />
                        Шаблон для рабочего чата
                    </h4>
                    <div className="rounded-3xl border border-cyan-200 bg-cyan-50/50 p-6 shadow-sm">
                        <p className="font-chakra text-slate-600 text-sm mb-4">
                            Заявки на компенсацию принимаются <strong>ТОЛЬКО</strong> по следующему шаблону:
                        </p>
                        <div className="bg-white rounded-2xl p-4 border border-cyan-100 space-y-3 font-chakra text-sm">
                            <div className="flex items-center gap-3 text-slate-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                <span>Скриншот или фото расчета из калькулятора</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                <span>Причина компенсации</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                <span>Аккаунт (логин) гостя, куда начислять</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-start gap-3 bg-red-50 text-red-600 p-3 rounded-xl text-xs font-chakra font-bold">
                            <Ban className="shrink-0" size={16} />
                            <span>В любом другом виде (расчет текстом, "начислите 150 рублей") заявки приниматься <strong>не будут</strong>!</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Важные правила после 23:00 и возвраты */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-violet-300 transition-colors">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h4 className="font-tactic font-black uppercase text-sm mb-2 text-slate-900">Действия после 23:00</h4>
                        <p className="font-chakra text-slate-600 text-sm leading-relaxed mb-3">
                            После 23:00 администратор <strong>самостоятельно</strong> пополняет баланс клиента пропорционально времени ожидания.
                        </p>
                        <ul className="text-xs font-chakra text-slate-500 space-y-2">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-violet-400 rounded-full"/> Пробить как наличные</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-violet-400 rounded-full"/> Оформить инкассацию на сумму компенсации (без подтверждения в чате — штраф)</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-violet-400 rounded-full"/> Написать в рабочий чат скрин, причину и аккаунт</li>
                        </ul>
                    </div>
                </div>

                <div className="group flex gap-4 p-6 rounded-3xl bg-[#FF2E63]/5 border border-[#FF2E63]/20 hover:border-[#FF2E63]/40 transition-colors">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#FF2E63]/10 flex items-center justify-center text-[#FF2E63]">
                        <AlertOctagon size={24} />
                    </div>
                    <div>
                        <h4 className="font-tactic font-black uppercase text-sm mb-2 text-[#FF2E63]">Запрет на возвраты</h4>
                        <p className="font-chakra text-[#8F1A3A] text-sm leading-relaxed mb-3">
                            Возвраты деньгами <strong>не производятся</strong> (прописано в правилах для клиентов).
                        </p>
                        <div className="text-xs font-chakra text-[#8F1A3A]/80 font-medium">
                            Возврат возможен <strong>только</strong> по согласованию с руководством в случаях оказания откровенно некачественной услуги или введения клиента в заблуждение.
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 6/14
                </p>
                {/* Optional navigation back/forward depending on future sections */}
            </div>
        </section>
    );
}



