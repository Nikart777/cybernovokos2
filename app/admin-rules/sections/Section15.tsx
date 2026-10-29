import React from 'react';
import Image from 'next/image';
import { Target, Monitor, Wrench, ShieldAlert, Cpu, HardDrive, Mouse, BotMessageSquare, AlertCircle, RefreshCw, Layers, FileDown, ExternalLink, Terminal, Usb, CheckCircle2, Camera } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

export function Section15() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="15" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <Wrench className="text-slate-600 hidden sm:block" size={48} />
                        Технические <span className="text-slate-600">вопросы</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Инструкции по восстановлению ПК при постоянной перезагрузке (лечебная флешка), системным ошибкам (FaceIT, Windows Update), проверке периферии и чистой установке гостевых ПК.
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
                        Технические вопросы и поддержка Langame
                    </h3>
                    <p className="font-chakra text-slate-700 text-sm leading-relaxed">
                        Технические вопросы необходимо задавать в <strong className="text-sky-600">чат техподдержки Langame</strong> через <strong className="text-slate-900">Admin ПО</strong> либо через приложение <strong className="text-slate-900">Langame Business</strong>.
                    </p>
                </div>
            </div>

            {/* ВЕЧНЫЙ РЕБУТ — ЛЕЧЕБНАЯ ФЛЕШКА */}
            <div className="mb-14">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <h3 className="font-tactic font-black text-2xl md:text-3xl uppercase italic text-slate-900 flex items-center gap-3">
                        <Usb className="text-[#FF2E63]" size={30} />
                        Компьютер постоянно перезагружается — <span className="text-[#FF2E63]">что делать</span>
                    </h3>
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-chakra font-black text-[11px] uppercase tracking-widest">
                        Единый алгоритм: Новокосино + Алтуфьево
                    </span>
                </div>

                <div className="bg-white border-2 border-rose-200 rounded-3xl overflow-hidden shadow-sm">
                    {/* Верхняя плашка + Схема */}
                    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950 p-6 md:p-8 text-white border-b border-slate-800">
                        <p className="font-chakra text-sm md:text-base text-slate-200 leading-relaxed max-w-3xl">
                            Если компьютер ушёл в <strong className="text-white">вечный ребут</strong> (постоянно перезагружается при включении), в обоих клубах используется <strong className="text-rose-400">специальная лечебная флешка</strong>. Нужно загрузиться с неё через Boot Menu и нажать <kbd className="px-1.5 py-0.5 bg-white/15 border border-white/25 rounded font-mono text-xs text-white">1</kbd> — дальше процесс полностью автоматизирован.
                        </p>

                        {/* СХЕМА ПРОЦЕССА (Визуальная блок-схема) */}
                        <div className="mt-7 pt-6 border-t border-white/10">
                            <div className="text-[10px] font-chakra font-black uppercase tracking-[0.25em] text-rose-400 mb-4">
                                Схема восстановления по шагам
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                {/* Шаг 1 */}
                                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="w-7 h-7 rounded-lg bg-[#FF2E63] text-white font-tactic font-black text-xs flex items-center justify-center">1</span>
                                        <Usb size={18} className="text-rose-400" />
                                    </div>
                                    <div className="font-tactic font-black uppercase italic text-sm text-white mb-1">Вставить флешку</div>
                                    <p className="font-chakra text-xs text-slate-300 leading-relaxed">
                                        Вставьте лечебную флешку в USB-разъём компьютера
                                    </p>
                                </div>

                                {/* Шаг 2 */}
                                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="w-7 h-7 rounded-lg bg-[#FF2E63] text-white font-tactic font-black text-xs flex items-center justify-center">2</span>
                                        <div className="flex items-center gap-1">
                                            <kbd className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono font-bold text-xs">F12</kbd>
                                            <span className="text-slate-500 text-xs">/</span>
                                            <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-slate-200 font-mono font-bold text-xs">F8</kbd>
                                        </div>
                                    </div>
                                    <div className="font-tactic font-black uppercase italic text-sm text-white mb-1">Открыть Boot Menu</div>
                                    <p className="font-chakra text-xs text-slate-300 leading-relaxed">
                                        При включении сразу часто жмите <strong className="text-amber-300">F12</strong> (GIGABYTE) или <strong className="text-white">F8</strong> (ASUS)
                                    </p>
                                </div>

                                {/* Шаг 3 */}
                                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="w-7 h-7 rounded-lg bg-[#FF2E63] text-white font-tactic font-black text-xs flex items-center justify-center">3</span>
                                        <kbd className="px-2 py-0.5 rounded bg-sky-400/20 border border-sky-400/40 text-sky-300 font-mono font-bold text-xs">Enter ↵</kbd>
                                    </div>
                                    <div className="font-tactic font-black uppercase italic text-sm text-white mb-1">Выбрать флешку</div>
                                    <p className="font-chakra text-xs text-slate-300 leading-relaxed">
                                        Строка с <code className="text-sky-300">UEFI</code> и <code className="text-sky-300">USB</code> (напр. <code className="text-sky-300">UEFI: USB Flash Disk</code>) → <strong className="text-white">Enter</strong>
                                    </p>
                                </div>

                                {/* Шаг 4 */}
                                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="w-7 h-7 rounded-lg bg-[#FF2E63] text-white font-tactic font-black text-xs flex items-center justify-center">4</span>
                                        <div className="flex items-center gap-1">
                                            <kbd className="px-2 py-0.5 rounded bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 font-mono font-bold text-xs">1</kbd>
                                            <span className="text-slate-500 text-xs">+</span>
                                            <kbd className="px-2 py-0.5 rounded bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 font-mono font-bold text-xs">Enter ↵</kbd>
                                        </div>
                                    </div>
                                    <div className="font-tactic font-black uppercase italic text-sm text-white mb-1">Нажать 1 и Enter</div>
                                    <p className="font-chakra text-xs text-slate-300 leading-relaxed">
                                        В окне восстановления нажмите <strong className="text-emerald-300">1</strong>, затем <strong className="text-emerald-300">Enter</strong>. Больше ничего вводить не нужно
                                    </p>
                                </div>

                                {/* Шаг 5 */}
                                <div className="relative bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-tactic font-black text-xs flex items-center justify-center">5</span>
                                        <CheckCircle2 size={18} className="text-emerald-400" />
                                    </div>
                                    <div className="font-tactic font-black uppercase italic text-sm text-emerald-300 mb-1">Ждать загрузки</div>
                                    <p className="font-chakra text-xs text-emerald-100/90 leading-relaxed">
                                        Питание не отключать, флешку оставить. Загрузилась Windows — сообщить технику
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Основное тело: Пошаговая инструкция + Схематичные экраны */}
                    <div className="p-6 md:p-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Левая колонка: точный текст инструкции */}
                            <div className="lg:col-span-6 space-y-3 font-chakra text-sm text-slate-700">
                                <div className="text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                    Пошаговая инструкция
                                </div>

                                <div className="flex gap-3.5 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200">
                                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <p className="leading-relaxed">
                                        Вставьте <strong>лечебную флешку</strong> в USB-разъём компьютера.
                                    </p>
                                </div>

                                <div className="flex gap-3.5 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200">
                                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <p className="leading-relaxed">
                                        При очередном включении сразу часто нажимайте кнопку:{' '}
                                        <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900">F12</kbd> на{' '}
                                        <a
                                            href="https://download.gigabyte.com/FileList/Manual/mb_manual_b760m-ds3h-series_1303_e.pdf"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#FF2E63] font-bold underline hover:opacity-80 inline-flex items-center gap-1"
                                        >
                                            GIGABYTE <ExternalLink size={12} />
                                        </a>
                                        , или{' '}
                                        <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900">F8</kbd> на{' '}
                                        <a
                                            href="https://dlcdnets.asus.com/pub/ASUS/mb/LGA1200/EX-B560M-V5/E17747_EX-B560M-V5_UM_WEB.pdf"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 font-bold underline hover:opacity-80 inline-flex items-center gap-1"
                                        >
                                            ASUS <ExternalLink size={12} />
                                        </a>
                                        .
                                    </p>
                                </div>

                                <div className="flex gap-3.5 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200">
                                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <p className="leading-relaxed">
                                        Появится список устройств — это <strong>Boot Menu</strong>. Выберите флешку: строку с <strong>UEFI</strong> и <strong>USB</strong> или названием флешки. Например: <code className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono font-bold text-slate-900">UEFI: USB Flash Disk</code>. Нажмите <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-900">Enter</kbd>.
                                    </p>
                                </div>

                                <div className="flex gap-3.5 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200">
                                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                                    <p className="leading-relaxed">
                                        Дождитесь окна восстановления с текстом. Нажмите <kbd className="px-1.5 py-0.5 bg-emerald-100 border border-emerald-300 rounded font-mono font-bold text-emerald-900">1</kbd>, затем <kbd className="px-1.5 py-0.5 bg-emerald-100 border border-emerald-300 rounded font-mono font-bold text-emerald-900">Enter</kbd>. <strong>Больше ничего вводить не нужно.</strong>
                                    </p>
                                </div>

                                <div className="flex gap-3.5 items-start p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">5</span>
                                    <p className="leading-relaxed text-emerald-950">
                                        <strong>Ждите.</strong> Компьютер сам перезагрузится. <strong>Питание не отключайте, флешку оставьте подключённой.</strong> Когда загрузится Windows — сообщите технику, дальше проверим мы.
                                    </p>
                                </div>
                            </div>

                            {/* Правая колонка: Схематичная визуализация экранов Boot Menu и Окна восстановления */}
                            <div className="lg:col-span-6 space-y-5">
                                <div className="text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                    Как это выглядит на экране (схема)
                                </div>

                                {/* Схема экрана 1: Boot Menu */}
                                <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 p-4 text-white font-mono text-xs shadow-md">
                                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                                        <span>ЭКРАН 1: BOOT MENU (после F12 / F8)</span>
                                        <span className="text-amber-400 font-bold">↑↓ Стрелки • Enter</span>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1.5">
                                        <div className="px-3 py-1.5 rounded text-slate-400 flex items-center justify-between">
                                            <span>Windows Boot Manager</span>
                                        </div>
                                        <div className="px-3 py-2 rounded-lg bg-[#FF2E63] text-white font-bold flex flex-wrap items-center justify-between gap-2 shadow-[0_0_15px_rgba(255,46,99,0.4)]">
                                            <span>► UEFI: USB Flash Disk</span>
                                            <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded uppercase">Выбрать → Enter ↵</span>
                                        </div>
                                        <div className="px-3 py-1.5 rounded text-slate-500">
                                            <span>Enter Setup</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Схема экрана 2: Окно восстановления */}
                                <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 p-4 text-white font-mono text-xs shadow-md">
                                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                                        <span className="flex items-center gap-1.5">
                                            <Terminal size={13} className="text-emerald-400" />
                                            ЭКРАН 2: ОКНО ВОССТАНОВЛЕНИЯ С ФЛЕШКИ
                                        </span>
                                        <span className="text-emerald-400 font-bold">Автоматический процесс</span>
                                    </div>
                                    <div className="bg-black border border-slate-800 rounded-xl p-3.5 space-y-2 text-slate-300 leading-relaxed">
                                        <div className="text-slate-400">=== ОКНО ВОССТАНОВЛЕНИЯ СИСТЕМЫ ===</div>
                                        <div className="text-emerald-400 font-bold">[1] Восстановление Windows (автоматически)</div>
                                        <div className="text-slate-500">[2] Выход</div>
                                        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                                            <span>
                                                Введите номер: <span className="inline-block px-2 py-0.5 bg-emerald-500 text-black font-bold rounded">1</span>
                                            </span>
                                            <span className="text-[11px] text-amber-300 font-sans font-bold">
                                                Нажмите «1» → «Enter» (больше ничего не вводить!)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Сценарии после перезагрузки (Развилка) */}
                        <div className="pt-4 border-t border-slate-200">
                            <div className="text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                                Что делать дальше после перезагрузки (3 варианта)
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-chakra text-sm">
                                {/* Вариант А */}
                                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs uppercase mb-3">
                                            <CheckCircle2 size={14} /> Загрузилась Windows
                                        </div>
                                        <p className="text-slate-800 leading-relaxed">
                                            Сообщите технику, что компьютер загрузился — <strong>дальше проверим мы</strong>.
                                        </p>
                                    </div>
                                </div>

                                {/* Вариант Б */}
                                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold text-xs uppercase mb-3">
                                            <RefreshCw size={14} /> Снова открылось меню флешки
                                        </div>
                                        <p className="text-slate-800 leading-relaxed">
                                            Выберите <code className="px-1.5 py-0.5 bg-white border border-amber-300 rounded font-mono font-bold text-slate-900">Windows Boot Manager</code> через то же <strong>Boot Menu</strong>.
                                        </p>
                                    </div>
                                </div>

                                {/* Вариант В */}
                                <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/70 p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs uppercase mb-3">
                                            <Camera size={14} /> Ошибка или снова перезагрузки
                                        </div>
                                        <p className="text-slate-800 leading-relaxed">
                                            Отправьте <strong>фото экрана и номер ПК технику</strong>. <strong className="text-rose-700 underline">Повторно восстановление не запускайте.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Обновление Windows & FACE IT */}
            <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-4 flex items-center gap-3">
                <RefreshCw className="text-blue-600" /> Windows Update и ошибки FaceIT
            </h3>

            {/* Папка с файлами */}
            <div className="mb-6 flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4">
                <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <FileDown size={20} />
                </div>
                <div className="flex-1">
                    <p className="font-chakra text-sm font-bold text-slate-800 mb-0.5">Необходимые файлы (батники)</p>
                    <p className="font-chakra text-xs text-slate-500">Папка на Яндекс.Диске — все нужные батники для обновления Windows</p>
                </div>
                <a
                    href="https://disk.yandex.ru/d/Mw_SCarHUTXTqg"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 font-chakra font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-xl"
                >
                    <ExternalLink size={14} /> Открыть папку
                </a>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {/* Способ 1 */}
                <div className="bg-white border text-sm font-chakra border-slate-200 rounded-3xl p-6 shadow-sm h-full flex flex-col">
                    <h4 className="font-tactic px-3 py-1 bg-blue-100 text-blue-800 rounded-lg inline-block text-xs uppercase tracking-widest self-start mb-4">Способ 1: Штатный сценарий</h4>
                    <p className="text-slate-500 text-xs mb-3">Все батники запускаются строго <strong className="text-blue-600">«От имени администратора»</strong>.</p>
                    <p className="text-slate-700 font-medium mb-3">Для обновления Windows необходимо:</p>
                    <ol className="space-y-2.5 text-slate-700 flex-1">
                        <li><strong className="text-blue-800">1.</strong> Перевести ПК в <strong>тех. режим</strong></li>
                        <li>
                            <strong className="text-blue-800">2.</strong> На рабочем столе от имени администратора запустить файл{' '}
                            <a href="https://disk.yandex.ru/d/SRH5BrK38WBxXg" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline">
                                <code>ON ВКЛЮЧИТЬ ОБНОВЛЕНИЯ</code> <ExternalLink size={11} />
                            </a>
                        </li>
                        <li><strong className="text-blue-800">3.</strong> Перезагрузить ПК</li>
                        <li><strong className="text-blue-800">4.</strong> Запустить обновления в <strong>Центре Обновлений Windows</strong></li>
                        <li><strong className="text-blue-800">5.</strong> После завершения всех обновлений — перезагрузить ПК и ещё раз запустить обновления, чтобы убедиться, что установлены все обновления Windows. Повторять данный шаг, пока не закончатся обновления.</li>
                        <li>
                            <strong className="text-red-600">6.</strong>{' '}
                            <strong className="text-red-600">После всех обновлений Windows не забудьте запустить{' '}
                            <a href="https://disk.yandex.ru/d/fWoNIPa-RMp33Q" target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 underline hover:text-red-500">
                                Off_all.bat <ExternalLink size={11} />
                            </a>{' '}
                            с рабочего стола от имени администратора.</strong>{' '}
                            <span className="text-red-500 text-xs font-bold">Если не запустить — ПК уйдёт в ребут, дальше только переустановка Windows.</span>
                        </li>
                        <li>
                            <strong className="text-blue-800">7.</strong> Вывести ПК из Тех. режима:{' '}
                            <span className="text-slate-600">ПКМ на красный значок <strong>«G»</strong> в трее (правый нижний угол) → <strong>«Тех. стоп»</strong></span>
                        </li>
                    </ol>

                    {/* Если не устанавливаются */}
                    <div className="mt-4 bg-orange-50 border border-orange-200 p-4 rounded-xl text-xs text-orange-900 space-y-2">
                        <p className="font-bold text-orange-800">⚠ Если обновления не устанавливаются (п.4):</p>
                        <p>Запустить <a href="https://disk.yandex.ru/d/AvcNBIQKXEyTzw" target="_blank" rel="noreferrer" className="font-bold text-orange-700 underline inline-flex items-center gap-0.5">wureset <ExternalLink size={10}/></a> — прогнать пункты <strong>2, 12 и 14</strong>, затем перезагрузить ПК.</p>
                    </div>

                    {/* Цикл обновлений */}
                    <div className="mt-3 bg-rose-50 border border-rose-200 p-4 rounded-xl text-sm text-rose-900 space-y-2">
                        <p className="font-bold text-rose-800">🔁 Если обновления идут, но после перезагрузки ошибка и цикл повторяется:</p>
                        <ol className="space-y-1 list-decimal list-inside text-rose-800">
                            <li>Удалить <strong>Faceit AC</strong> и <strong>Faceit</strong></li>
                            <li>В командной строке (от администратора) выполнить:</li>
                        </ol>
                        <div className="bg-slate-900 text-emerald-400 font-mono rounded-lg p-3 space-y-1 text-[11px] leading-relaxed">
                            <div>sfc /scannow</div>
                            <div>DISM /Online /Cleanup-Image /CheckHealth</div>
                            <div>DISM /Online /Cleanup-Image /ScanHealth</div>
                            <div>DISM /Online /Cleanup-Image /RestoreHealth</div>
                        </div>
                        <p className="text-rose-700">После этого перезагрузить ПК и установить обновления ещё раз.</p>
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
                            <span className="font-tactic text-base md:text-lg tracking-[0.05em] drop-shadow-md">См. в базе паролей клуба</span>
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

            {/* Настройка пароля BIOS при загрузке */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm mb-12">
                <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900 mb-4 flex items-center gap-3">
                    <Cpu className="text-rose-500" /> Запрос пароля BIOS при загрузке ПК
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 font-chakra text-sm text-slate-700 space-y-4">
                        <p>
                            Если при включении ПК Windows не загружается, а на экране появляется окно ввода пароля BIOS, это означает, что в настройках материнской платы сбит режим безопасности.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-5 space-y-2">
                            <h4 className="font-bold flex items-center gap-2">
                                <AlertCircle size={18} className="text-amber-600" /> Инструкция по исправлению:
                            </h4>
                            <ol className="list-decimal list-inside space-y-2.5 text-xs">
                                <li>
                                    При перезагрузке ПК зажмите и удерживайте клавишу <kbd className="px-1.5 py-0.5 bg-white border rounded text-slate-800">Del</kbd>, чтобы зайти в настройки BIOS. Если система просит пароль уже при входе в BIOS, введите стандартный пароль администратора (уточняйте в базе паролей клуба).
                                </li>
                                <li>
                                    В интерфейсе BIOS перейдите в расширенный режим <strong className="text-rose-600">Advanced Mode</strong> (обычно для этого нужно нажать клавишу <kbd className="px-1.5 py-0.5 bg-white border rounded text-slate-800">F2</kbd> или кликнуть по соответствующей кнопке на экране).
                                </li>
                                <li>
                                    В верхней панели меню перейдите в раздел (вкладку) <strong className="text-slate-900">Boot</strong>.
                                </li>
                                <li>
                                    Найдите строку (параметр) <strong className="text-rose-600">Security Option</strong> и обязательно выберите для неё значение <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-600 font-bold">Setup</code> (вместо значения <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600 font-bold">System</code>).
                                </li>
                                <li>
                                    <strong>Проверка пароля:</strong>
                                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-slate-600">
                                        <li>
                                            Если пароля в BIOS вообще не было установлено (например, настройки полностью сбросились к заводским), то в этом же разделе найдите параметр <strong className="text-slate-900">Set Administrator Password</strong> и установите стандартный пароль клуба (см. базу паролей).
                                        </li>
                                        <li>
                                            Если пароль уже был установлен ранее, ничего с паролями делать не нужно, просто переходите к сохранению.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Нажмите клавишу <kbd className="px-1.5 py-0.5 bg-white border rounded text-slate-800">F10</kbd> для сохранения настроек и перезагрузки.
                                </li>
                                <li>
                                    На экране появится окно подтверждения <strong className="text-slate-900">Save & Exit Setup</strong> с перечнем изменений. Убедитесь, что там указано <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">Security Option [System] → [Setup]</code> (как на картинке справа), и нажмите кнопку <strong className="text-emerald-600">Yes</strong>.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-md max-w-full bg-slate-950 p-1">
                            <Image
                                src="/instruktsiya/bios.jpg"
                                alt="Настройка Security Option в BIOS Gigabyte"
                                width={600}
                                height={450}
                                className="rounded-xl object-contain hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono mt-2 text-center uppercase tracking-wider block">
                            Экран сохранения настроек в BIOS Gigabyte
                        </span>
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
                            <li><strong className="text-violet-600">Langame:</strong> Сертификат + ПО.</li>
                        </ul>
                        <div className="mt-3 bg-violet-50 border border-violet-200 rounded-xl p-3 text-xs font-chakra text-violet-800">
                            <strong className="block mb-1 text-violet-700 uppercase tracking-wide">📩 После установки всех игр, программ и лаунчеров:</strong>
                            Написать в чат технической поддержки — для установки Langame на клиентский ПК.
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 15
                </p>
            </div>
        </section>
    );
}
