import React from 'react';
import Image from 'next/image';
import { Smartphone, Shield, Zap, PhoneCall, Monitor, Key, CreditCard, Info, X, Clock, Lock } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

export function Section4() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="4" label="Раздел" />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-10">
                Онлайн <span className="text-[#0ea5e9]">Бронирование</span>
            </h2>

            {/* Приложение - Главный акцент */}
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 overflow-hidden mb-12 shadow-2xl flex flex-col md:flex-row items-center gap-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF2E63]/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-gradient-to-b from-[#0ea5e9] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.3)] animate-pulse-slow">
                    <Smartphone size={80} className="text-white drop-shadow-lg" />
                </div>
                
                <div className="relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                        <Shield size={14} className="text-[#00F0FF]" />
                        <span className="font-chakra font-bold text-[10px] sm:text-xs uppercase tracking-widest text-[#00F0FF]">Единственный способ брони</span>
                    </div>
                    <h3 className="font-tactic font-black text-3xl md:text-4xl uppercase italic text-white mb-4">
                        Только через <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0ea5e9]">App CYBERX</span>
                    </h3>
                    <p className="font-chakra text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                        Мы не принимаем брони по телефону или через социальные сети. Это полностью автоматизированный процесс, предоставляющий гостям <strong className="text-white border-b border-[#FF2E63]">скидку 5%</strong> на весь прайс-лист.
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 text-xs font-chakra font-bold text-white bg-black/40 px-4 py-2.5 rounded-xl border border-white/10">
                            <Smartphone size={16} className="opacity-70" />
                            App Store
                        </div>
                        <div className="flex items-center gap-2 text-xs font-chakra font-bold text-white bg-black/40 px-4 py-2.5 rounded-xl border border-white/10">
                            <Smartphone size={16} className="opacity-70" />
                            Google Play
                        </div>
                    </div>
                </div>
            </div>

            {/* Чек-лист Админа */}
            <div className="mb-14">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#FF2E63] mb-6">
                    <Zap size={14} />
                    Действия администратора
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-5 group-hover:scale-110 transition-transform"><PhoneCall size={24} /></div>
                        <div className="font-tactic font-black text-slate-900 uppercase italic text-sm mb-3">Звонки = В App</div>
                        <p className="font-chakra text-slate-500 text-sm leading-relaxed">По телефону и в чате <strong>не бронируем</strong>. Обязательно объясняем, что все делается только в приложении.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-5 group-hover:scale-110 transition-transform"><Monitor size={24} /></div>
                        <div className="font-tactic font-black text-slate-900 uppercase italic text-sm mb-3">Сопровождение</div>
                        <p className="font-chakra text-slate-500 text-sm leading-relaxed">Подсказывайте гостям каждый шаг установки и регистрации, если у них возникают трудности.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 mb-5 group-hover:scale-110 transition-transform"><Key size={24} /></div>
                        <div className="font-tactic font-black text-slate-900 uppercase italic text-sm mb-3">Код активации</div>
                        <p className="font-chakra text-slate-500 text-sm leading-relaxed">Для запуска забронированного ПК гость должен ввести сгенерированный в приложении код.</p>
                    </div>
                </div>
            </div>

            {/* ПОДРОБНЫЙ ПУТЬ БРОНИРОВАНИЯ */}
            <div className="mb-14">
                <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-8 border-b-2 border-slate-100 pb-4">
                    Подробный путь бронирования
                </h3>

                <div className="space-y-6">
                    {/* Шаг 1 */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#0ea5e9] text-white font-tactic font-black italic flex items-center justify-center shadow-lg shadow-[#0ea5e9]/30 border-2 border-white relative z-10 z-[1]">1</div>
                        <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 pb-2 relative before:absolute before:-left-[30px] before:top-10 before:bottom-[-24px] before:w-0.5 before:bg-slate-200 z-[0]">
                            <h4 className="font-tactic font-black uppercase text-slate-900 mb-3">Установка приложения</h4>
                            <ul className="list-disc pl-5 space-y-2 font-chakra text-slate-600 text-sm">
                                <li>Откройте App Store или Google Play.</li>
                                <li>В поиске наберите "CyberX".</li>
                                <li>Установите официальное приложение CyberX.</li>
                                <li><strong>Ссылки для клиента:</strong><br />
                                    Короткая: <a href="https://clck.ru/3CmFQa" className="text-[#0ea5e9] underline">https://clck.ru/3CmFQa</a><br />
                                    Трекер: <a href="https://redirect.appmetrica.yandex.com/serve/965634439310753772" className="text-[#0ea5e9] underline break-all">https://redirect.appmetrica.yandex.com/serve/965634439310753772</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Шаг 2 */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#0ea5e9] text-white font-tactic font-black italic flex items-center justify-center shadow-lg shadow-[#0ea5e9]/30 border-2 border-white relative z-10 z-[1]">2</div>
                        <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 pb-2 relative before:absolute before:-left-[30px] before:top-10 before:bottom-[-24px] before:w-0.5 before:bg-slate-200 z-[0]">
                            <h4 className="font-tactic font-black uppercase text-slate-900 mb-3">Вход и регистрация</h4>
                            <ul className="list-disc pl-5 space-y-2 font-chakra text-slate-600 text-sm">
                                <li>Откройте приложение CyberX.</li>
                                <li>Нажмите "Войти в приложение".</li>
                                <li>Введите номер телефона и пройдите регистрацию.</li>
                                <li>Заполните необходимые данные (имя и т.п.).</li>
                            </ul>
                        </div>
                    </div>

                    {/* Шаг 3 */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#0ea5e9] text-white font-tactic font-black italic flex items-center justify-center shadow-lg shadow-[#0ea5e9]/30 border-2 border-white relative z-10 z-[1]">3</div>
                        <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 pb-2 relative before:absolute before:-left-[30px] before:top-10 before:bottom-[-24px] before:w-0.5 before:bg-slate-200 z-[0]">
                            <h4 className="font-tactic font-black uppercase text-slate-900 mb-3">Выбор клуба</h4>
                            <ul className="list-disc pl-5 space-y-2 font-chakra text-slate-600 text-sm">
                                <li>Внутри приложения нажмите "Выбрать клуб" или "Добавить клуб".</li>
                                <li>Откройте карту.</li>
                                <li>Найдите клуб рядом с метро "Новокосино" с названием <strong>"CYBERX Новокосино"</strong>.</li>
                                <li>Нажмите на клуб и выберите его.</li>
                                <li>Нажмите кнопку "Забронировать".</li>
                            </ul>
                        </div>
                    </div>

                    {/* Шаг 4 */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#0ea5e9] text-white font-tactic font-black italic flex items-center justify-center shadow-lg shadow-[#0ea5e9]/30 border-2 border-white relative z-10 z-[1]">4</div>
                        <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 pb-2 relative before:absolute before:-left-[30px] before:top-10 before:bottom-[-24px] before:w-0.5 before:bg-slate-200 z-[0]">
                            <h4 className="font-tactic font-black uppercase text-slate-900 mb-3">Завершение регистрации для брони</h4>
                            <ul className="list-disc pl-5 space-y-2 font-chakra text-slate-600 text-sm">
                                <li>Если приложение просит "дозаполнить" профиль, нужно завершить регистрацию: заполнить недостающие поля (например, имя).</li>
                                <li><strong className="text-[#FF2E63]">Без завершения регистрации бронь может не оформиться.</strong></li>
                            </ul>
                        </div>
                    </div>

                    {/* Шаг 5 и 6 (Объединенные под одной цифрой или логикой) */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#0ea5e9] text-white font-tactic font-black italic flex items-center justify-center shadow-lg shadow-[#0ea5e9]/30 border-2 border-white relative z-10 z-[1]">5</div>
                        <div className="flex-1 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 pb-4 relative before:absolute before:-left-[30px] before:top-10 before:bottom-[-24px] before:w-0.5 before:bg-slate-200 z-[0]">
                            <h4 className="font-tactic font-black uppercase text-slate-900 mb-3">Выбор даты, тарифов и мест</h4>
                            <div className="space-y-4 font-chakra text-slate-600 text-sm">
                                <div>
                                    <strong>Для ПК и TV:</strong> Выберите дату посещения, затем нужный поминутный тариф или пакет. На открывшейся карте выберите свободные зоны (можно выбрать сразу несколько ПК или TV) и нажмите "Далее".
                                </div>
                                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
                                    <strong className="block mb-1">Специфика АВТОСИМУЛЯТОРОВ:</strong>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Обязательно выберите раздел <strong>"Пакеты времени"</strong>.</li>
                                        <li>Внизу появятся пакеты: "Автосим 1 час", "Автосим 2 часа", "Автосим 3 часа" — выберите нужный и нажмите "Далее".</li>
                                        <li>На карте клуба можно выбрать до 4-х автосимов одновременно на один аккаунт.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Шаг 8 (Финал) */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white font-tactic font-black italic flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white relative z-10">6</div>
                        <div className="flex-1 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 sm:p-6 pb-2">
                            <h4 className="font-tactic font-black uppercase text-emerald-900 mb-3">Пополнение баланса и подтверждение</h4>
                            <ul className="list-disc pl-5 space-y-2 font-chakra text-emerald-800 text-sm">
                                <li>Если на балансе недостаточно средств, приложение предложит пополнить баланс.</li>
                                <li>После пополнения удобным способом (карта, СБП), <strong>подтвердите бронь</strong>.</li>
                                <li>В приложении (во вкладке "Мой клуб") появится <strong>код бронирования</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ блоки по бронированию */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                        <h4 className="font-tactic font-black uppercase text-indigo-900 text-sm mb-3">Использование кода брони</h4>
                        <ul className="list-disc pl-4 space-y-2 font-chakra text-indigo-800 text-xs">
                            <li>Код нужно вводить на <strong>каждом</strong> арендованном устройстве.</li>
                            <li><strong>Если друзья без аккаунтов:</strong> приходите за 5-10 минут, каждый регистрирует аккаунт за свободным ПК, вводит ваш общий код брони, бронь активируется у всех.</li>
                        </ul>
                    </div>
                    <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
                        <h4 className="font-tactic font-black uppercase text-rose-900 text-sm mb-3">Решение проблем</h4>
                        <ul className="list-disc pl-4 space-y-2 font-chakra text-rose-800 text-xs">
                            <li><strong>Не открывается магазин по ссылке:</strong> попросите зайти в App Store / Google Play и вбить вручную "CyberX".</li>
                            <li><strong>Зависает на заставке:</strong> проверить VPN. Если включен — выключить; если выключен — попробовать включить. Если не помогает, уточнить вопросы по оплате.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Финансовые правила */}
            <div className="mb-10">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#0ea5e9] mb-6">
                    <Shield size={14} />
                    Правила и условия
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-[#0ea5e9]/30 transition-colors">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm"><CreditCard size={18} /></div>
                        <div>
                            <div className="font-chakra font-bold text-slate-900 text-sm mb-1 uppercase tracking-wider">Оплата онлайн</div>
                            <p className="font-chakra text-slate-500 text-xs mt-1">Оплата производится только внутри приложения. Бронь <strong className="text-green-600">автоматически активируется</strong> ровно в назначенное время.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-[#FF2E63]/30 transition-colors">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm"><Info size={18} /></div>
                        <div>
                            <div className="font-chakra font-bold text-slate-900 text-sm mb-1 uppercase tracking-wider">Пропуск брони</div>
                            <p className="font-chakra text-slate-500 text-xs mt-1 text-[#FF2E63] font-medium">Деньги за пропущенные гостем бронирования не возвращаются.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-[#0ea5e9]/30 transition-colors">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm"><X size={18} /></div>
                        <div>
                            <div className="font-chakra font-bold text-slate-900 text-sm mb-1 uppercase tracking-wider">Бесплатная отмена</div>
                            <p className="font-chakra text-slate-500 text-xs mt-1">Возможна за <strong className="text-slate-800">24 часа</strong> до начала посадки. Гость осуществляет отмену <strong>самостоятельно в приложении</strong>.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-[#0ea5e9]/30 transition-colors">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm"><Clock size={18} /></div>
                        <div>
                            <div className="font-chakra font-bold text-slate-900 text-sm mb-1 uppercase tracking-wider">Перенос времени</div>
                            <p className="font-chakra text-slate-500 text-xs mt-1">Допускается не позднее чем за <strong className="text-slate-800">2 часа</strong> до начала (при технической возможности и свободных ПК).</p>
                        </div>
                    </div>
                </div>

                {/* Скриншот правил из приложения */}
                <div className="mt-6 mb-2 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center p-2 sm:p-4">
                    <Image 
                        src="/instruktsiya/bookingrules.jpg" 
                        alt="Правила бронирования в приложении" 
                        width={600} 
                        height={800} 
                        className="w-full max-w-[400px] h-auto rounded-xl shadow-md" 
                        unoptimized
                    />
                </div>

                <div className="mt-4 flex items-center gap-4 p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm"><Lock size={18} /></div>
                    <div>
                        <div className="font-chakra font-bold text-indigo-900 text-sm mb-1 uppercase tracking-wider">Спецобслуживание</div>
                        <p className="font-chakra text-indigo-700/80 text-xs mt-1">Возможна полная аренда клуба для турниров и закрытых мероприятий (согласуется исключительно с руководством).</p>
                    </div>
                </div>
            </div>
        </section>
    );
}



