import React from 'react';
import { Gift, Globe, Smartphone, CheckCircle2, Sparkles } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

export function Section16() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="16" label="Раздел" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <Gift className="text-pink-500 hidden sm:block" size={48} />
                        Подарочные <span className="text-pink-500">сертификаты</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Сертификаты оформляются и оплачиваются клиентами самостоятельно онлайн на сайте. Задача администратора — направить гостя на сайт или подсказать, как активировать промокод.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* КАК РАБОТАЕТ СЕРТИФИКАТ И ССЫЛКИ */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden">
                    <div className="bg-slate-900 p-6 flex items-center gap-3 text-white border-b border-slate-800">
                        <Sparkles className="text-amber-400" size={24} />
                        <h3 className="font-tactic font-black text-xl uppercase italic">Как устроена покупка</h3>
                    </div>
                    <div className="p-6 md:p-8 flex-1 bg-slate-50 font-chakra text-sm text-slate-700 space-y-5">
                        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                            <p>
                                🎁 <strong>Полностью онлайн на сайте:</strong> клиент сам выбирает номинал (от 1 000 до 20 000 ₽), оформление и поздравление в конструкторе, после чего оплачивает заказ картой или через СБП.
                            </p>
                            <p>
                                ⚡ <strong>Мгновенная выдача:</strong> сразу после оплаты на экране и на электронной почте покупателя появляются готовый промокод и ссылка-сюрприз для получателя.
                            </p>
                            <p>
                                💳 <strong>Куда можно тратить:</strong> весь номинал зачисляется на баланс и действует на <strong>любые зоны клуба</strong> (ПК, VIP, Solo/Duo, Bootcamp, PS5, автосимулятор) и <strong>бар / онлайн-магазин</strong> (напитки, сэндвичи, снеки).
                            </p>
                        </div>

                        {/* Ссылки на сайты */}
                        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl shadow-sm">
                            <h4 className="font-tactic text-indigo-800 uppercase text-xs mb-3 flex items-center gap-2">
                                <Globe size={16} /> Страницы оформления сертификатов
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-indigo-900 font-chakra font-bold text-sm">
                                <a
                                    href="https://cyberx.moscow/certificate"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-white border border-indigo-100 rounded-xl p-3.5 hover:border-indigo-300 transition-colors flex flex-col"
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-indigo-500">Алтуфьево</span>
                                    <span className="underline mt-0.5">cyberx.moscow/certificate</span>
                                </a>
                                <a
                                    href="https://cyberx-novokosino.ru/certificate"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-white border border-indigo-100 rounded-xl p-3.5 hover:border-indigo-300 transition-colors flex flex-col"
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-indigo-500">Новокосино</span>
                                    <span className="underline mt-0.5">cyberx-novokosino.ru/certificate</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ЧТО ДЕЛАЕТ АДМИНИСТРАТОР */}
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 md:p-8 shadow-sm flex flex-col justify-between">
                    <div className="space-y-5">
                        <h3 className="font-tactic font-black text-2xl uppercase italic text-emerald-800 border-b border-emerald-200 pb-4 flex items-center gap-3">
                            <CheckCircle2 className="text-emerald-600" size={26} />
                            Памятка администратору
                        </h3>

                        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">
                            <h4 className="font-chakra font-bold text-slate-900 mb-1.5">
                                1. Если клиент хочет купить сертификат
                            </h4>
                            <p className="font-chakra text-sm text-slate-700">
                                Направьте его на страницу сертификатов нужного клуба (<strong>/certificate</strong>). Принимать оплату вручную на кассе или переводить на карту не нужно — всё оформляется онлайн на сайте за пару минут.
                            </p>
                        </div>

                        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">
                            <h4 className="font-chakra font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Smartphone size={16} className="text-emerald-600" />
                                2. Как получателю активировать промокод
                            </h4>
                            <div className="font-chakra text-sm text-slate-700 space-y-2.5">
                                <p>
                                    <strong>Онлайн в приложении:</strong> скачать приложение <strong>CYBERX</strong>, выбрать свой клуб, зарегистрироваться по номеру телефона и ввести промокод (баланс сразу доступен для онлайн-бронирования).
                                </p>
                                <p>
                                    <strong>Лично в клубе:</strong> сесть за любой свободный компьютер, зарегистрироваться или войти в аккаунт по номеру телефона и ввести промокод.
                                </p>
                            </div>
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
