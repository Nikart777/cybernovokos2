import React from 'react';
import { Gift, CreditCard, MessageCircle, AlertTriangle, MonitorSmartphone, Clock, PartyPopper } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

export function Section15() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="15" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <Gift className="text-pink-500 hidden sm:block" size={48} />
                        Подарочные <span className="text-pink-500">сертификаты</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Правила оформления, шаблоны ответов для клиентов и строгий алгоритм активации баланса через руководство.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* ДЛЯ КЛИЕНТОВ (Шаблоны) */}
                <div className="flex flex-col gap-6">
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden h-full">
                        <div className="bg-slate-900 p-6 flex items-center gap-3 text-white border-b border-slate-800">
                            <PartyPopper className="text-amber-400" size={24} />
                            <h3 className="font-tactic font-black text-xl uppercase italic">Оформление (Шаблон для клиента)</h3>
                        </div>
                        <div className="p-6 md:p-8 flex-1 bg-slate-50 font-chakra text-sm text-slate-700 space-y-4">
                            <p className="font-bold text-slate-900">Отправляйте этот текст при запросе покупки:</p>
                            
                            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                                <p>🎁 У нас можно приобрести электронные подарочные сертификаты!</p>
                                <p>Сам сертификат не имеет стоимости — Вы выбираете только номинал, который будет полностью зачислен на баланс получателя.</p>
                                <p>✨ <strong>Полная свобода:</strong> Сертификат распространяется на любую зону (STANDARD, BOOTCAMP, VIP, TV-зоны или зона автосимуляторов).</p>
                                <p>⏳ <em>Пример: сертификат на 5 000 ₽ — покроет примерно 30 часов игры.</em></p>
                                <hr className="border-slate-100 my-2" />
                                <p><strong>📝 Как оформить заказ:</strong><br/>Сообщите желаемый номинал, и мы вышлем реквизиты. (Действует только в нашем клубе).</p>
                                <p>После оплаты направьте нам:<br/>
                                📱 Номер телефона и Telegram-ник получателя<br/>
                                📅 Желаемую дату отправки<br/>
                                ✍️ Ваше имя и пожелания (от кого подарок)</p>
                            </div>

                            {/* Ссылки на сайты */}
                            <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl shadow-sm mt-4">
                                <h4 className="font-tactic text-indigo-800 uppercase text-xs mb-3">Страницы сертификатов на сайте</h4>
                                <div className="space-y-2 text-indigo-900 font-chakra font-bold text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-widest text-indigo-600/80">Алтуфьево</span>
                                        <a href="https://cyberx.moscow/certificate" target="_blank" rel="noreferrer" className="hover:text-indigo-600 underline">
                                            cyberx.moscow/certificate
                                        </a>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-widest text-indigo-600/80">Новокосино</span>
                                        <a href="https://cyberx-novokosino.ru/certificate" target="_blank" rel="noreferrer" className="hover:text-indigo-600 underline">
                                            cyberx-novokosino.ru/certificate
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Реквизиты и отчетность */}
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-4">
                                <h4 className="font-tactic text-amber-800 uppercase text-xs mb-2">Реквизиты для оплаты</h4>
                                <div className="text-amber-900 bg-amber-100/50 p-3 rounded-lg font-bold">
                                    Перевод на ВТБ по номеру телефона: <br/>
                                    <span className="text-lg">+7 (915) 481-00-81</span> (Никита Андреевич А.)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ДЛЯ АДМИНОВ (Строгие правила) */}
                <div className="flex flex-col gap-6">
                    <div className="rounded-3xl border-2 border-rose-100 bg-rose-50/50 p-6 md:p-8 shadow-sm h-full flex flex-col justify-center relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <AlertTriangle size={160} className="text-rose-600" />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <h3 className="font-tactic font-black text-2xl uppercase italic text-rose-600 mb-2 border-b-2 border-rose-200 pb-4">
                                🛑 АЛГОРИТМ ДЛЯ АДМИНА
                            </h3>

                            <div className="bg-white border border-rose-100 rounded-2xl p-5">
                                <h4 className="font-chakra font-bold text-rose-900 mb-2 flex items-center gap-2">
                                    <CreditCard size={16} /> 1. При продаже
                                </h4>
                                <p className="font-chakra text-sm text-slate-700">
                                    Обязательно написать руководству, <strong>какая планируется сумма и когда</strong> клиент собирается оплатить сертификат.
                                </p>
                            </div>

                            <div className="bg-white border border-rose-100 rounded-2xl p-5">
                                <h4 className="font-chakra font-bold text-rose-900 mb-2 flex items-center gap-2">
                                    <MonitorSmartphone size={16} /> 2. При активации
                                </h4>
                                <div className="font-chakra text-sm text-slate-700 space-y-3">
                                    <p className="bg-rose-50 text-rose-800 px-3 py-1 rounded-md text-xs font-bold inline-block mb-1">Время: 08:00 - 23:00</p>
                                    <ol className="list-decimal list-inside space-y-2">
                                        <li>Уточнить, зарегистрирован ли гость.</li>
                                        <li>Если нет — <strong className="text-rose-600">обязательная регистрация</strong> (только потом пополнение).</li>
                                        <li><strong>Сразу</strong> написать в общий чат: <br/>
                                            <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded block mt-1 text-xs">«Гость с сертификатом 5000 ₽ у меня, требуется пополнение»</code>
                                        </li>
                                        <li>Дождаться, когда будет удаленно пополнен баланс.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ИНСТРУКЦИЯ ПО АКТИВАЦИИ ДЛЯ КЛИЕНТА */}
            <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-6 flex items-center gap-3">
                <MessageCircle className="text-emerald-500" /> Инструкция для отправки получателю
            </h3>
            
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 md:p-8 shadow-sm mb-12">
                <p className="font-chakra text-sm text-emerald-800 mb-4">
                    Отправляйте этот текст вместе с сертификатом:
                </p>
                <div className="bg-white rounded-2xl border border-emerald-100 p-5 font-chakra text-sm text-slate-700 space-y-4 shadow-sm">
                    <p className="font-bold text-emerald-600">Как активировать сертификат:</p>
                    <p>Активация и зачисление средств на баланс доступны как на месте так и удаленно ежедневно с 08:00 до 23:00. Для этого понадобится всего пара шагов:</p>
                    
                    <div className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                        <p>Зарегистрируйтесь в системе через приложение <strong>CYBERX APP</strong> (при регистрации обязательно выберите наш клуб).</p>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                        <div>
                            <p className="font-bold mb-2">Активируйте баланс одним из удобных способов:</p>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2"><Clock size={14} className="text-emerald-500 mt-1 shrink-0"/> <span><strong>Удаленно:</strong> позвоните в клуб с телефона, который указан в сертификате и скажите что хотите пополнить баланс.</span></li>
                                <li className="flex items-start gap-2"><MonitorSmartphone size={14} className="text-emerald-500 mt-1 shrink-0"/> <span><strong>В клубе:</strong> просто покажите сертификат с экрана телефона администратору.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 flex justify-end">
                <p className="text-xs font-chakra font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                    Окончание инструкции
                </p>
            </div>
        </section>
    );
}



