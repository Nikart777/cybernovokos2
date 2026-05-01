import React from 'react';
import { Target, Monitor, Wrench, ShieldAlert, Cpu, HardDrive, Mouse, BotMessageSquare, AlertCircle, RefreshCw, Layers, FileDown } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

export function Section14() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="14" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <Wrench className="text-slate-600 hidden sm:block" size={48} />
                        Технические <span className="text-slate-600">вопросы</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Инструкции по сложным системным ошибкам (FaceIT, Windows Update), проверке периферии и чистой установке гостевых ПК.
                    </p>
                </div>
            </div>

            {/* AI Assistant */}
            <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 p-1">
                <div className="bg-slate-900/90 rounded-[22px] p-6 md:p-8 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-white border border-indigo-500/30">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/50">
                            <BotMessageSquare size={24} />
                        </div>
                        <div>
                            <h3 className="font-tactic font-black text-xl uppercase italic mb-1 flex items-center gap-2">
                                База знаний недостаточна?
                            </h3>
                            <p className="font-chakra text-indigo-200/80 text-sm leading-relaxed max-w-md mb-2">
                                При возникновении неизвестных ошибок в настройке ПК или играх обязательно обращайтесь в нейросеть (авторизация через Google на рабочем ПК).
                            </p>
                        </div>
                    </div>
                    <a 
                        href="https://chat.deepseek.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="shrink-0 font-chakra font-bold text-sm bg-indigo-600 hover:bg-indigo-500 transition-colors px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                    >
                        chat.deepseek.com
                    </a>
                </div>
            </div>

            {/* Поддержка Langame */}
            <div className="mb-12 bg-sky-50 border border-sky-200 rounded-3xl p-6 md:p-8 flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                    <Target size={24} />
                </div>
                <div>
                    <h3 className="font-tactic font-black text-xl uppercase italic mb-2 text-slate-900">
                        Программа управления клубом
                    </h3>
                    <p className="font-chakra text-slate-700 text-sm leading-relaxed">
                        Все технические вопросы, ошибки и баги, связанные <strong>исключительно с программой управления клубом Langame</strong>, необходимо задавать напрямую в <strong className="text-sky-600">чат техподдержки Langame в Telegram</strong>.
                    </p>
                </div>
            </div>

            {/* Обновление Windows & FACE IT */}
            <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-6 flex items-center gap-3">
                <RefreshCw className="text-blue-600" /> Windows Update и ошибки FaceIT
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {/* Вариант 1 (Штатный) */}
                <div className="bg-white border text-sm font-chakra border-slate-200 rounded-3xl p-6 shadow-sm h-full flex flex-col">
                    <h4 className="font-tactic px-3 py-1 bg-blue-100 text-blue-800 rounded-lg inline-block text-xs uppercase tracking-widest self-start mb-4">Способ 1: Штатный сценарий</h4>
                    <p className="text-slate-600 mb-4">Все батники запускаются строго <strong className="text-blue-600">«От имени администратора»</strong>.</p>
                    <ol className="space-y-2 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1">
                        <li><strong>0.</strong> Перевести ПК в Тех. режим.</li>
                        <li><strong>1.</strong> Запустить <code>ON ВКЛЮЧИТЬ ОБНОВЛЕНИЯ.bat</code>.</li>
                        <li><strong>2.</strong> Перезагрузить ПК в Тех. режиме.</li>
                        <li><strong>3.</strong> Провести обновления в Центре Обновлений.</li>
                        <li><strong>4.</strong> Обязательная перезагрузка.</li>
                        <li><strong>5.</strong> Запустить <code>off_all.bat</code> (после установки апдейтов).</li>
                        <li><strong>6.</strong> В центре отложить обновления на самый дальний срок.</li>
                        <li><strong>7.</strong> Перезагрузить → <strong>8.</strong> Вывести из тех. режима.</li>
                    </ol>
                    <div className="mt-4 bg-orange-50 border border-orange-100 p-3 rounded-xl text-xs text-orange-800">
                        <strong>Если скрипты не работают:</strong> <br/>
                        Ручное изменение в `gpedit.msc` → Админ. шаблоны → Компоненты WIndows → Центр обновлений.<br/>
                        Применить: <code>gpupdate /force</code> в cmd для прошивки политик без перезагрузки.
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Вариант 2 */}
                    <div className="bg-white border text-sm font-chakra border-slate-200 rounded-3xl p-6 shadow-sm">
                        <h4 className="font-tactic px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg inline-block text-xs uppercase tracking-widest mb-4">Способ 2: Через Восстановление</h4>
                        <ul className="space-y-2 text-slate-700 list-disc list-inside">
                            <li>Запуск `ON включить обновления` → Перезагрузка.</li>
                            <li>Открыть Центр обновлений (<strong>НЕ </strong>нажимать "Проверить").</li>
                            <li>Открыть Журнал обновлений → Восстановление.</li>
                            <li>В «Устранение неполадок...» нажать <strong className="text-indigo-600">«Переустановить сейчас»</strong> (без автоматической перезагрузки).</li>
                            <li>Вернуться в Центр (пойдет проверка и загрузка).</li>
                        </ul>
                        <div className="mt-3 text-xs bg-slate-50 p-2 rounded text-slate-500">
                            После установки: удалить `Windows.old` через очистку диска и запустить `off_all.bat`.
                        </div>
                    </div>

                    {/* Вариант 3 */}
                    <div className="bg-white border text-sm font-chakra border-slate-200 rounded-3xl p-6 shadow-sm">
                        <h4 className="font-tactic px-3 py-1 bg-teal-100 text-teal-800 rounded-lg inline-block text-xs uppercase tracking-widest mb-4">Способ 3: Ручная загрузка KB</h4>
                        <ul className="space-y-2 text-slate-700 list-disc list-inside">
                            <li>Включить ПК в Тех режим → Запустить `ON.bat`.</li>
                            <li>Скачать нужный пакет (например от 14.04 KB5082200) из <a href="https://www.catalog.update.microsoft.com/Home.aspx" target="_blank" className="text-teal-600 hover:underline font-bold">Catalog Update</a>.</li>
                            <li>Установить вручную → Перезагрузить → Запустить `Off.bat`.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Secure Boot & Memory Integrity */}
            <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-6 flex items-center gap-3">
                <ShieldAlert className="text-rose-500" /> Ошибки Античитов (BIOS)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-rose-50/50 border-2 border-rose-100 rounded-3xl p-6 shadow-sm">
                    <h4 className="font-tactic uppercase text-rose-600 mb-2">Secure Boot (FaceIT)</h4>
                    <p className="font-chakra text-sm text-slate-700 mb-4">
                        Если после нажатия "ОК" античит не запускается — удалить FaceIT в тех.режиме и установить заново.
                    </p>
                    
                    <div className="bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-2xl p-5 mb-5 flex items-center gap-4 shadow-[0_5px_20px_rgba(225,29,72,0.4)] border border-rose-400">
                        <div className="shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <ShieldAlert size={28} className="text-white drop-shadow-md" />
                        </div>
                        <div>
                            <span className="text-[10px] font-chakra font-bold uppercase tracking-widest text-rose-100 block mb-1">Пароль от BIOS (Новокосино)</span>
                            <span className="font-tactic text-3xl md:text-4xl tracking-[0.05em] drop-shadow-md">cyber 1</span>
                        </div>
                    </div>

                    <p className="font-chakra text-sm text-slate-700 mb-3 block">
                        <strong>Как включить в BIOS:</strong>
                    </p>
                    <ol className="font-chakra text-xs text-rose-800 space-y-2 bg-white/60 p-4 rounded-xl border border-rose-100">
                        <li>0. Вход в BIOS (DEL).</li>
                        <li>1. Вкладка SECURITY → Trusted computing.</li>
                        <li>2. Security Device Support = <strong className="text-emerald-600">Enabled</strong>. Сохранить (F10) и перезагрузить.</li>
                        <li>3. Снова BIOS → Trusted computing → Secure boot.</li>
                        <li>4. Secure boot mode: <strong className="text-indigo-600">Standard</strong>. Сохранить (F10) и перезагрузить.</li>
                        <li>5. Снова BIOS → Secure boot: <strong className="text-emerald-600">Enabled</strong>. Сохранить (F10).</li>
                    </ol>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
                    <h4 className="font-tactic uppercase text-slate-800 mb-2">Memory integrity</h4>
                    <ol className="font-chakra text-sm space-y-3 mb-6">
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Проверить, что включен Secure Boot.</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> В тех. режиме переустановить античит.</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Запустить от админа <a href="https://nikart777.github.io/medprogramcenter/Memory.bat" target="_blank" className="font-bold text-blue-600 underline">Memory.bat</a></li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Перезагрузить и завершить тех. режим.</li>
                    </ol>

                    <div className="mt-auto bg-slate-900 rounded-2xl p-4 text-white">
                        <h4 className="font-tactic text-xs tracking-widest text-slate-400 uppercase mb-2">Выход из Тех. Режима (Памятка)</h4>
                        <p className="text-xs font-chakra">
                            ПКМ на красный значок “G” в трее Windows → Выбрать <strong>«Тех. стоп»</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* МЫШКИ */}
            <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-6 flex items-center gap-3">
                <Mouse className="text-violet-600" /> Тест Игровых Мышей
            </h3>
            
            <div className="bg-violet-600 text-white rounded-3xl p-6 md:p-8 shadow-sm mb-12">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                    <h4 className="font-chakra font-bold text-lg">⚡️ Инструкция для админов</h4>
                    <a href="https://cyberx-novokosino.ru/mouse-test" target="_blank" rel="noreferrer" className="bg-white text-violet-700 font-tactic text-sm py-2 px-4 rounded-xl uppercase hover:bg-violet-50 transition-colors inline-block text-center">
                        Открыть тестер (Даблклик)
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-chakra text-sm">
                    <div className="bg-white/10 border border-white/20 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 font-black uppercase text-violet-200 text-xs tracking-widest">
                            <span className="bg-violet-800 w-6 h-6 rounded flex items-center justify-center">1</span> В ЗАЛЕ
                        </div>
                        <p className="leading-relaxed">
                            Гость жалуется на даблклик → Не спорим, не тестим при нём → Молча меняем на запасную!
                        </p>
                    </div>
                    <div className="bg-white/10 border border-white/20 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 font-black uppercase text-violet-200 text-xs tracking-widest">
                            <span className="bg-violet-800 w-6 h-6 rounded flex items-center justify-center">2</span> НА АДМИНКЕ
                        </div>
                        <p className="leading-relaxed mb-2">
                            Тестим на тестере (50-100 кликов).<br/>
                            <span className="text-rose-300">Красное (&lt;80мс)</span> = В ремонт.<br/>
                            <span className="text-emerald-300">Зеленое</span> = В запас.
                        </p>
                    </div>
                    <div className="bg-white/10 border border-white/20 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 font-black uppercase text-violet-200 text-xs tracking-widest">
                            <span className="bg-violet-800 w-6 h-6 rounded flex items-center justify-center">3</span> ТЕСТ СЕНСОРА
                        </div>
                        <p className="leading-relaxed">
                            На рабочем столе зажми ЛКМ и рисуй рамку выделения. Мигает/пропадает = сдох микрик на удержание (в ремонт).
                        </p>
                    </div>
                </div>

                <div className="mt-4 bg-violet-900/50 p-4 rounded-xl border border-violet-800/50 text-xs font-chakra">
                    <strong className="text-orange-300 uppercase">🛠 Бонус (Колесо дергается):</strong> Если колесико глючит, переверните мышь и с силой прокатайте колесиком по столу (без ковра) туда-сюда 15 секунд. Помогает в 8 из 10 случаев (выбивает пыль из энкодера).
                </div>
            </div>

            {/* ПЕРЕУСТАНОВКА WINDOWS */}
            <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-6 flex items-center gap-3">
                <HardDrive className="text-cyan-600" /> Переустановка Windows
            </h3>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm mb-12">
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h4 className="font-chakra font-bold text-slate-800 flex items-center gap-2">
                        <FileDown size={18} className="text-cyan-600" />
                        Инструкция и Образ
                    </h4>
                    <a href="https://disk.yandex.ru/i/uDqL3Ysv-BYZ1A" target="_blank" rel="noreferrer" className="text-sm font-chakra font-bold text-white bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors">
                        Смотреть Видеоинструкцию
                    </a>
                </div>
                
                <div className="p-6 md:p-8 font-chakra grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Этап 1 */}
                    <div className="space-y-4">
                        <h4 className="font-tactic uppercase text-sm text-slate-900">1. Подготовка</h4>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm">
                            <p className="mb-2 text-slate-600">На флешку с образом заранее закинуть:</p>
                            <ul className="space-y-1 text-slate-700">
                                <li>— Папку с тех. программами</li>
                                <li>— Папку с лаунчерами</li>
                                <li>— Сертификат, Langame ПО, пароли</li>
                            </ul>
                        </div>
                    </div>

                    {/* Этап 2 */}
                    <div className="space-y-4">
                        <h4 className="font-tactic uppercase text-sm text-slate-900">2. Установка Windows</h4>
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li><strong>Загрузка:</strong> F8 / F9 / Boot menu.</li>
                            <li><strong>Форматирование:</strong> Удалить ВСЕ старые разделы (вкл. системные).</li>
                            <li><strong>Установка:</strong> Выбрать диск размером <strong className="text-cyan-600">446-447 ГБ</strong> (НЕ большие на 800-900 ГБ).</li>
                        </ul>
                        <div className="text-xs bg-orange-50 border border-orange-100 p-2 rounded-lg text-orange-900">
                            Если не встали сетевые дрова: закрыть автоскрипт, поставить драйвер вручную с флешки, затем перезапустить скрипт настройки.
                        </div>
                    </div>

                    {/* Этап 3 */}
                    <div className="space-y-4">
                        <h4 className="font-tactic uppercase text-sm text-slate-900">3. Установка ПО</h4>
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li><strong className="text-emerald-600">Драйвера:</strong> Устанавливаются автоматически при первом запуске системы. Game Ready драйвер из Nvidia App.</li>
                            <li><strong className="text-indigo-600">Лаунчеры/Игры:</strong> Ставить строго НЕ на диск C. В Алтуфьево диск 1.8ТБ должен быть скрыт!</li>
                            <li><strong className="text-violet-600">Langame:</strong> Сертификат + ПО. <br/>
                            Домены: <br/>
                            <code>cyberx52.langamesftw.ru</code> (Алтуфьево) <br/>
                            <code>cyberx165.langame-pr.ru</code> (Новокосино)</li>
                        </ul>
                        <p className="text-xs font-bold text-rose-500 uppercase">UUID менять запрещено!</p>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 13/14
                </p>
            </div>
        </section>
    );
}



