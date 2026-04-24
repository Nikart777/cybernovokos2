import React from 'react';
import { Tv, Gamepad2, Settings, ListChecks, Sofa, AlertTriangle, MonitorPlay, Zap, KeyRound } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const ACTIVATION_STEPS = [
    { text: 'Пополнить баланс гостя.', icon: Zap },
    { text: 'Пробить «Доплата TV 100р/чел» если: обычное ТВ (> 2 гостей) или VIP TV Комната (> 4 гостей).', icon: AlertTriangle, highlight: true },
    { text: 'Нажать «Активировать ТВ» в Langame.', icon: MonitorPlay },
    { text: 'Выбрать нужный тариф.', icon: ListChecks },
    { text: 'Нажать «Отправить код».', icon: Settings },
    { text: 'Ввести код, который пришел клиенту.', icon: KeyRound },
    { text: 'Взять джойстики, проводить гостей и выбрать верный аккаунт (PSStandart/PSVIP).', icon: Gamepad2, highlight: true }
];

export function Section13() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="13" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <Tv className="text-blue-600 hidden sm:block" size={48} />
                        Зона <span className="text-blue-600">TV (PS5)</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Инструкция по работе с консольной зоной: алгоритм активации, контроль чистоты и список установленных игр.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* АКТИВАЦИЯ */}
                <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col h-full">
                    <div className="bg-blue-600 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-700 text-white">
                        <div className="flex items-center gap-3">
                            <Gamepad2 size={24} />
                            <h3 className="font-tactic font-black text-xl uppercase italic">Активация сеанса</h3>
                        </div>
                    </div>
                    
                    <div className="p-6 md:p-8 flex-1 bg-slate-50 relative">
                        <ol className="relative border-l-2 border-blue-100 ml-3 space-y-6">
                            {ACTIVATION_STEPS.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <li key={idx} className="ml-6">
                                        <span className={`absolute -left-[17px] flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-slate-50 ${step.highlight ? 'bg-blue-600 text-white' : 'bg-white text-blue-400 border border-blue-100 shadow-sm'}`}>
                                            <Icon size={14} />
                                        </span>
                                        <div className={`text-sm font-chakra mt-1 ${step.highlight ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                                            {step.text}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>

                {/* УБОРКА */}
                <div className="flex flex-col h-full">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm group hover:border-cyan-300 transition-colors h-full flex flex-col justify-center">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="shrink-0 w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-500 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                <Sofa size={32} />
                            </div>
                            <div>
                                <h4 className="font-tactic font-black text-2xl uppercase text-slate-900 mb-2">Порядок после гостя</h4>
                                <p className="font-chakra text-slate-600 leading-relaxed md:text-lg">
                                    Обязательная проверка зоны: очистить диван, пол, бочки и сам ТВ.
                                </p>
                            </div>
                        </div>
                        <ul className="grid grid-cols-1 gap-3 text-sm font-chakra font-bold text-cyan-700 bg-cyan-50/50 p-6 rounded-2xl border border-cyan-100">
                            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-400"/>Тщательно протереть всё влажными салфетками</li>
                            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-400"/>Поставить все геймпады на зарядную станцию</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* РЕШЕНИЕ ПРОБЛЕМ */}
            <div className="mb-12">
                <h4 className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-5 ml-2">
                    <Settings size={14} /> Технические инструкции
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Баг Лангейма */}
                    <div className="rounded-3xl border border-orange-200 bg-orange-50/50 p-6 shadow-sm flex flex-col h-full">
                        <h4 className="flex items-center gap-2 font-chakra font-black text-orange-500 uppercase tracking-widest text-[10px] mb-3">
                            <AlertTriangle size={14} /> Langame
                        </h4>
                        <h3 className="font-tactic font-black text-slate-900 uppercase text-sm mb-2">Статус «Соединение»</h3>
                        <p className="font-chakra text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                            Если телевизоры "зависли" при подключении, перезапустите систему:
                        </p>
                        <div className="bg-white border border-orange-100 text-slate-700 p-3 rounded-xl shadow-sm text-xs font-chakra font-bold flex flex-col gap-2">
                            <span className="text-orange-600 line-through">1. Закрыть Langame на ПК админа</span>
                            <span className="text-emerald-600">2. Залогиниться заново</span>
                        </div>
                    </div>

                    {/* Замок на играх */}
                    <div className="rounded-3xl border border-violet-200 bg-violet-50/50 p-6 shadow-sm flex flex-col h-full">
                        <h4 className="flex items-center gap-2 font-chakra font-black text-violet-500 uppercase tracking-widest text-[10px] mb-3">
                            <AlertTriangle size={14} /> PlayStation 5
                        </h4>
                        <h3 className="font-tactic font-black text-slate-900 uppercase text-sm mb-2">Замок на играх (FIFA, UFC)</h3>
                        <p className="font-chakra text-slate-600 text-[13px] leading-relaxed mb-4 flex-1">
                            Если игры не запускаются (висит замок), восстановите лицензии:
                        </p>
                        <ol className="text-xs font-chakra font-bold text-slate-700 bg-white border border-violet-100 p-3 rounded-xl shadow-sm space-y-1">
                            <li>1. Зайти в <span className="text-violet-600">PSVIP</span> (или CyberxA).</li>
                            <li>2. Настройки → Пользователи → Другое.</li>
                            <li>3. Включить <strong>«Общий доступ»</strong>.</li>
                            <li>4. Вернуться в PSStandart/CyberxB.</li>
                        </ol>
                    </div>

                    {/* Тест геймпада */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col h-full">
                        <h4 className="flex items-center gap-2 font-chakra font-black text-slate-400 uppercase tracking-widest text-[10px] mb-3">
                            <Gamepad2 size={14} /> Периферия
                        </h4>
                        <h3 className="font-tactic font-black text-slate-900 uppercase text-sm mb-2">Проверка джойстика</h3>
                        <p className="font-chakra text-slate-600 text-[13px] leading-relaxed mb-4">
                            Подключите геймпад к ПК по Type-C кабелю и откройте один из тестеров:
                        </p>
                        <div className="flex flex-col gap-2 font-chakra text-xs font-bold w-full mb-3">
                            <a href="https://mitinogame.ru/gamepad-tester/" target="_blank" className="bg-slate-50 text-blue-600 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 px-3 py-2 rounded-lg transition-colors truncate">mitinogame.ru/gamepad-tester/</a>
                            <a href="https://online-controller-tester.vercel.app/" target="_blank" className="bg-slate-50 text-blue-600 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 px-3 py-2 rounded-lg transition-colors truncate">online-controller-tester.vercel.app</a>
                        </div>
                        <ul className="text-[11px] font-chakra text-slate-500 space-y-1 bg-slate-50 p-2 rounded-lg mt-auto">
                            <li>Осторожно повращайте стики по кругу и диагоналям не до упора. Курсор на экране должен идти <strong>плавно, без рывков</strong>.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* СПИСОК ИГР */}
            <div className="rounded-3xl bg-slate-900 text-white overflow-hidden shadow-sm mb-12">
                <div className="p-6 border-b border-slate-800">
                    <h3 className="font-tactic font-black text-xl uppercase italic">Библиотека игр PS5</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                    <div className="p-6 md:p-8 bg-slate-900/50">
                        <h4 className="font-chakra font-bold uppercase tracking-widest text-emerald-400 text-xs mb-4">📍 Клуб Новокосино</h4>
                        <div className="flex flex-wrap gap-2">
                            {['FIFA 26', 'UFC 5', 'Mortal Kombat 1', 'GTA 5', 'NHL 26', 'NBA 26', 'Split Fiction', 'It Takes Two'].map(game => (
                                <span key={game} className="bg-white/10 border border-white/5 px-3 py-1.5 rounded-lg text-sm font-chakra font-bold">{game}</span>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 md:p-8 bg-slate-900 flex flex-col">
                        <h4 className="font-chakra font-bold uppercase tracking-widest text-violet-400 text-xs mb-4">📍 Клуб Алтуфьево</h4>
                        <div className="flex flex-wrap gap-2">
                            {['FIFA 26', 'UFC 5', 'Mortal Kombat 1', 'GTA 5'].map(game => (
                                <span key={game} className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-chakra">{game}</span>
                            ))}
                        </div>
                        <div className="mt-auto pt-6 text-[10px] text-slate-500 font-chakra uppercase tracking-widest">
                            Набор игр ограничен базовыми дисциплинами
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 12/14
                </p>
            </div>
        </section>
    );
}



