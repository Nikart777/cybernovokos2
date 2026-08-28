import React from 'react';
import { Gift, CreditCard, MessageCircle, AlertTriangle, PartyPopper, Phone, Send } from 'lucide-react';
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
                        Как принять заявку, объяснить механику сертификата и передать её руководителю.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* ДЛЯ КЛИЕНТОВ (Шаблоны) */}
                <div className="flex flex-col gap-6">
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden h-full">
                        <div className="bg-slate-900 p-6 flex items-center gap-3 text-white border-b border-slate-800">
                            <PartyPopper className="text-amber-400" size={24} />
                            <h3 className="font-tactic font-black text-xl uppercase italic">Как работает сертификат</h3>
                        </div>
                        <div className="p-6 md:p-8 flex-1 bg-slate-50 font-chakra text-sm text-slate-700 space-y-4">
                            <p className="font-bold text-slate-900">Объясните это клиенту при обращении по телефону или в Telegram:</p>
                            
                            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                                <p>🎁 Подарочный сертификат — это красивая электронная карточка с промокодом, привязанным к номеру телефона получателя.</p>
                                <p>Вы оплачиваете выбранный номинал, руководитель подтверждает оплату и сам отправляет сертификат по контактам, которые были получены при заявке.</p>
                                <p>Получатель регистрируется в приложении <strong>CYBERX</strong> или непосредственно в клубе, вводит промокод — и вся сумма зачисляется на его баланс.</p>
                                <p>✨ Средства можно тратить на любые зоны клуба и в онлайн-магазине: напитки, сэндвичи, снеки и другие товары.</p>
                                <hr className="border-slate-100 my-2" />
                                <p><strong>📝 Чтобы оформить заказ:</strong><br/>сообщите желаемый номинал и контакты получателя. Реквизиты для оплаты предоставит руководство.</p>
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
                                    Банк ВТБ — перевод по номеру телефона Никиты. <br/>
                                    <span className="text-xs font-normal text-amber-700">Запросите реквизиты у руководства.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ДЛЯ АДМИНОВ */}
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
                                    <Send size={16} /> 1. Сразу передайте заявку руководителю
                                </h4>
                                <p className="font-chakra text-sm text-slate-700">
                                    Как только клиент интересуется сертификатом по телефону или в Telegram, сообщите руководителю, что поступила заявка, и передайте <strong>контакты клиента</strong>.
                                </p>
                            </div>

                            <div className="bg-white border border-rose-100 rounded-2xl p-5">
                                <h4 className="font-chakra font-bold text-rose-900 mb-2 flex items-center gap-2">
                                    <Phone size={16} /> 2. Если клиент позвонил
                                </h4>
                                <p className="font-chakra text-sm text-slate-700">
                                    Коротко объясните механику: после оплаты руководитель подтвердит её и отправит сертификат получателю. Промокод активируется после регистрации в приложении CYBERX или непосредственно в клубе.
                                </p>
                            </div>

                            <div className="bg-white border border-rose-100 rounded-2xl p-5">
                                <h4 className="font-chakra font-bold text-rose-900 mb-2 flex items-center gap-2">
                                    <CreditCard size={16} /> 3. Дальше действует руководитель
                                </h4>
                                <p className="font-chakra text-sm text-slate-700">
                                    Администратор <strong>не принимает оплату, не активирует баланс и не отправляет сертификат получателю</strong>. После передачи заявки никаких дополнительных действий не требуется.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ВАЖНО ДЛЯ АДМИНА */}
            <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-6 flex items-center gap-3">
                <MessageCircle className="text-emerald-500" /> Что важно помнить
            </h3>
            
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 md:p-8 shadow-sm mb-12">
                <p className="font-chakra text-sm text-emerald-800 mb-4">
                    Эта информация нужна, чтобы уверенно ответить на вопросы. Отправлять её получателю не нужно.
                </p>
                <div className="bg-white rounded-2xl border border-emerald-100 p-5 font-chakra text-sm text-slate-700 space-y-4 shadow-sm">
                    <p className="font-bold text-emerald-600">Сертификат и промокод:</p>
                    <p>Руководитель отправляет получателю красивую карточку сертификата с промокодом, привязанным к его номеру телефона.</p>
                    
                    <div className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                        <p>Получатель регистрируется через приложение <strong>CYBERX</strong> или непосредственно в клубе.</p>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                        <div>
                            <p className="font-bold mb-2">После ввода промокода:</p>
                            <p>Номинал зачисляется на баланс. Им можно оплатить любые зоны клуба и покупки в онлайн-магазине, включая напитки, сэндвичи, снеки и другие товары.</p>
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



