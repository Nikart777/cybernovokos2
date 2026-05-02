import React from 'react';
import Image from 'next/image';
import { Moon, Terminal, Download, ShieldAlert, Cpu, Gamepad2, HardDrive, AlertTriangle, Wallpaper, ExternalLink, MonitorDown, ArrowDown } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';
import { PcMonitorWidget } from '../components/PcMonitorWidget';

export function Section12({ setZoomedImage }: { setZoomedImage?: (src: string | null) => void }) {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="12" label="Раздел" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <Moon className="text-indigo-500 hidden sm:block" size={48} />
                        Обновления <span className="text-indigo-500">ПК</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Инструкция для ночных администраторов: техническое обслуживание инфраструктуры клуба и обязательное обновление ПО.
                    </p>
                </div>
            </div>

            {/* ТЕХНИЧЕСКИЙ РЕЖИМ */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm mb-8">
                <div className="bg-slate-900 p-6 flex items-center gap-4 border-b border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Terminal size={24} />
                    </div>
                    <div>
                        <h3 className="font-tactic font-black text-xl uppercase italic text-white mb-1">Технический режим (Лангар)</h3>
                        <p className="font-chakra text-slate-400 text-sm">Управление ПК через чат</p>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-6">
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                                <h4 className="text-xs font-chakra font-bold text-indigo-400 uppercase tracking-widest mb-2">Активация режима</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-indigo-100/50 shadow-sm">
                                        <span className="font-chakra text-sm text-slate-600">Один конкретный ПК</span>
                                        <code className="bg-slate-800 text-indigo-400 font-mono text-sm px-3 py-1 rounded-lg font-bold">$teh 14</code>
                                    </div>
                                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-indigo-100/50 shadow-sm">
                                        <span className="font-chakra text-sm text-slate-600">Все свободные ПК</span>
                                        <code className="bg-slate-800 text-indigo-400 font-mono text-sm px-3 py-1 rounded-lg font-bold">$teh all</code>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                                    <h4 className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mb-1">Длительность</h4>
                                    <div className="font-tactic font-black text-xl text-slate-700 italic">100 мин</div>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                                    <h4 className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mb-1">Выход из режима</h4>
                                    <div className="font-chakra text-sm font-bold text-slate-700">ПКМ по значку LG → Тех. стоп</div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/3 flex flex-col gap-4">
                            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 flex items-start gap-3">
                                <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={20}/>
                                <div>
                                    <h4 className="font-tactic font-black text-sm uppercase text-rose-900 mb-1">Обязательное условие</h4>
                                    <p className="font-chakra text-rose-700 text-xs leading-relaxed">Перед отправкой команды в чат обязательно укажите <strong>подробную причину</strong> перехода в тех. режим.</p>
                                </div>
                            </div>
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-start gap-3">
                                <ShieldAlert className="text-orange-500 shrink-0 mt-0.5" size={20}/>
                                <div>
                                    <h4 className="font-tactic font-black text-sm uppercase text-orange-900 mb-1">Сбой системы</h4>
                                    <p className="font-chakra text-orange-700 text-xs leading-relaxed">Если ПК не перевелись в технический режим — незамедлительно сообщить руководству.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* ОБНОВЛЕНИЕ ИГР */}
                <div className="rounded-3xl bg-slate-900 text-white overflow-hidden shadow-sm flex flex-col">
                    <div className="p-6 md:p-8 flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Gamepad2 className="text-emerald-400" size={28} />
                            <h3 className="font-tactic font-black text-2xl uppercase italic">Обновление игр</h3>
                        </div>
                        
                        <div className="space-y-4 font-chakra text-sm text-slate-300">
                            <p className="leading-relaxed">
                                После перехода в тех. режим начните обновление во всех лаунчерах: <strong>Steam, Lesta Games, VK Play, Riot Client</strong>.
                            </p>
                            
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <strong className="text-white block mb-2">Особые случаи:</strong>
                                <ul className="list-disc list-inside space-y-1 ml-1">
                                    <li><span className="text-emerald-400">Valorant</span> и <span className="text-emerald-400">LoL</span> обновляются кликом по иконке игры (без захода в лаунчер).</li>
                                    <li>Апдейт <strong>FaceIT</strong> и очистка дисков выполняются параллельно загрузкам игр.</li>
                                </ul>
                            </div>

                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mt-4">
                                <strong className="text-white block mb-2 uppercase text-[10px] tracking-widest text-emerald-400">Обязательный список обновлений:</strong>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-white/10 border border-white/5 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">CS2 <span className="opacity-50 font-normal">Steam</span></span>
                                    <span className="bg-white/10 border border-white/5 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">Dota 2 <span className="opacity-50 font-normal">Steam</span></span>
                                    <span className="bg-white/10 border border-white/5 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">PUBG: BATTLEGROUNDS <span className="opacity-50 font-normal">Steam</span></span>
                                    <span className="bg-white/10 border border-white/5 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">Apex Legends <span className="opacity-50 font-normal">Steam</span></span>
                                    <span className="bg-white/10 border border-white/5 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">Valorant <span className="opacity-50 font-normal">Riot</span></span>
                                    <span className="bg-white/10 border border-white/5 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">League of Legends <span className="opacity-50 font-normal">Riot</span></span>
                                    <span className="bg-white/10 border border-white/5 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">Мир Танков <span className="opacity-50 font-normal">Lesta</span></span>
                                    <span className="bg-white/10 border border-white/5 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">Fortnite <span className="opacity-50 font-normal">Epic</span></span>
                                </div>
                            </div>

                            <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-xl p-4 mt-4">
                                <h4 className="font-bold text-indigo-300 uppercase tracking-widest text-[10px] mb-2">Авторизация Steam</h4>
                                <p className="mb-2">Используйте <strong>Steam Guard на рабочем телефоне</strong>.</p>
                                <div className="text-xs text-indigo-200 bg-indigo-900/50 px-3 py-1.5 rounded inline-block border border-indigo-500/20">
                                    Один аккаунт Guard = не более 5 устройств одновременно!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-4 border-t border-slate-700/50">
                        <a href="#" className="flex justify-center items-center gap-2 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-chakra font-bold transition-colors">
                            Открыть таблицу аккаунтов
                        </a>
                    </div>
                </div>

                {/* ОБНОВЛЕНИЕ ДРАЙВЕРОВ */}
                <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
                    <div className="p-6 md:p-8 flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Cpu className="text-blue-500" size={28} />
                            <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-900">Драйвера (SDI)</h3>
                        </div>

                        <div className="space-y-4 font-chakra text-sm text-slate-600">
                            <p className="leading-relaxed">
                                Установка драйверов производится строго через утилиту <strong>Snappy Driver Installer (SDI)</strong>, версия Portable.
                            </p>

                            <ol className="list-decimal list-inside space-y-3 ml-1">
                                <li>Скачать с <a href="https://sdi-tool.org/" target="_blank" className="text-blue-500 font-bold hover:underline">sdi-tool.org</a> в папку «Загрузки».</li>
                                <li>Запустить файл <code>SDI_R2408</code> (версия SDI Lite).</li>
                                <li>Выбрать сканирование — загрузить <span className="font-bold text-slate-800">индексы новых паков</span>.</li>
                                <li className="text-rose-600 font-bold bg-rose-50 px-2 py-1 -ml-2 rounded">
                                    ОБЯЗАТЕЛЬНО создать точку восстановления!
                                </li>
                                <li>Выделить нужные драйвера вручную и установить.</li>
                                <li>Перезагрузить ПК и проверить корректность работы.</li>
                            </ol>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-4 border-t border-slate-100">
                        <div className="flex gap-2 p-3 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl font-chakra text-xs">
                            <Download className="shrink-0" size={16} />
                            <span>SDI работает без установки, скачивать заново на каждый ПК не нужно — можно использовать с флешки.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ОШИБКА БУФЕРА ОВЕРЛЕЯ */}
            <div className="rounded-3xl border border-rose-200 bg-white overflow-hidden shadow-sm mb-12">
                <div className="bg-rose-50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-100">
                    <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="font-tactic font-black text-xl uppercase italic text-rose-900 mb-1">Переполнение буфера оверлея</h3>
                            <p className="font-chakra text-rose-600 text-sm">Внезапное сообщение о перезагрузке ПК у гостя</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 font-chakra text-slate-700 text-sm leading-relaxed space-y-4">
                    <p>
                        Иногда у гостей поверх игры появляется плашка: <strong>«Буфер оверлея переполнен. Обратитесь к администратору, компьютер скоро перезагрузится»</strong>. Пугаться не нужно! Это техническая особенность бездисковой системы — она срабатывает, когда клиент, находясь в своем обычного сеансе, начинает скачивать огромное обновление для игры. Буфер временного файла забивается, и система сбрасывается.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] mb-3">Алгоритм решения:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-slate-600 ml-1 font-medium">
                            <li>Перезагрузить ПК. Завершить пакет гостя и остановить его время.</li>
                            <li>Перевести компьютер в <strong>Технический режим</strong> (команда <code>$teh [номер]</code> в чат).</li>
                            <li>Провести все необходимые обновления этой крупной игры, пока мы находимся в тех. режиме.</li>
                            <li>Выключить Технический режим, дать гостю снова зайти под своим аккаунтом.</li>
                            <li>Рассчитать потерянное гостем время в Калькуляторе компенсаций.</li>
                            <li className="text-rose-600 font-bold bg-rose-50/50 p-2 rounded -ml-2 inline-block">Отправить в рабочий чат шаблон со скриншотом калькулятора, указав причину: <br/><em>«Решение проблемы по буферу оверлея»</em>.</li>
                        </ol>
                    </div>
                </div>
            </div>

            {/* ФИРМЕННЫЕ ОБОИ CYBERX */}
            <div className="rounded-3xl border border-violet-200 bg-white overflow-hidden shadow-sm mb-12">
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-violet-500/30">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 backdrop-blur-sm">
                            <MonitorDown size={24} />
                        </div>
                        <div>
                            <h3 className="font-tactic font-black text-xl uppercase italic text-white mb-1">Фирменные обои CyberX</h3>
                            <p className="font-chakra text-violet-200 text-sm">Установка и синхронизация обоев с сервером</p>
                        </div>
                    </div>
                    <a
                        href="https://disk.yandex.ru/d/u6XlLKp3r4SO0Q"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-chakra font-bold text-sm transition-all border border-white/20 shrink-0"
                    >
                        <ExternalLink size={16} />
                        Открыть на Яндекс.Диске
                    </a>
                </div>

                <div className="p-6 md:p-8 font-chakra text-slate-700 text-sm leading-relaxed space-y-6">
                    <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
                        <h4 className="font-bold text-violet-900 uppercase tracking-widest text-[11px] mb-3 flex items-center gap-2">
                            <AlertTriangle size={14} className="text-violet-500" />
                            Когда необходима установка обоев
                        </h4>
                        <ul className="space-y-2 text-violet-800">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-1.5" />
                                <span>После <strong>переустановки Windows</strong> на компьютере</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-1.5" />
                                <span>Если обои на данном ПК <strong>отличаются от обоев на других компьютерах</strong> клуба</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] mb-4 flex items-center gap-2">
                            <ArrowDown size={14} className="text-indigo-500" />
                            Пошаговая инструкция
                        </h4>
                        <ol className="list-decimal list-inside space-y-3 text-slate-600 ml-1 font-medium">
                            <li>
                                Скачайте папку с обоями по ссылке: <a href="https://disk.yandex.ru/d/u6XlLKp3r4SO0Q" target="_blank" rel="noopener noreferrer" className="text-violet-600 font-bold hover:underline inline-flex items-center gap-1">Яндекс.Диск <ExternalLink size={12} /></a>
                            </li>
                            <li>
                                Сохраните скачанную папку на <strong>диск C:\</strong> компьютера.
                            </li>
                            <li>
                                Запустите файл <code className="bg-slate-800 text-emerald-400 font-mono text-sm px-2 py-0.5 rounded font-bold">runme.bat</code> из скачанной папки.
                            </li>
                            <li>
                                Введите, какой клуб — <code className="bg-slate-800 text-amber-400 font-mono text-sm px-2 py-0.5 rounded font-bold">1</code> (CyberX 1) или <code className="bg-slate-800 text-amber-400 font-mono text-sm px-2 py-0.5 rounded font-bold">2</code> (CyberX 2).
                            </li>
                            <li>
                                Введите <strong>номер ПК</strong> (например, <code className="bg-slate-800 text-amber-400 font-mono text-sm px-2 py-0.5 rounded font-bold">14</code>).
                            </li>
                            <li className="text-emerald-700 font-bold bg-emerald-50/50 p-2 rounded -ml-2">
                                Нажмите <strong>Enter</strong> — обои установятся и будут автоматически синхронизироваться с сервером.
                            </li>
                        </ol>
                    </div>

                    {/* Пример обоев */}
                    <div>
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3">Пример фирменных обоев:</h4>
                        <div 
                            className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md cursor-zoom-in group"
                            onClick={() => setZoomedImage?.('/instruktsiya/29may.jpeg')}
                        >
                            <Image
                                src="/instruktsiya/29may.jpeg"
                                alt="Пример фирменных обоев CyberX Community"
                                width={1920}
                                height={1080}
                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <span className="font-chakra text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg">Нажмите для увеличения</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 p-3 bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-xl font-chakra text-xs">
                        <Download className="shrink-0 mt-0.5" size={16} />
                        <span>После установки обои будут автоматически обновляться с сервера при появлении новых акций и праздников. Повторная установка не требуется.</span>
                    </div>
                </div>
            </div>

            {/* МОНИТОРИНГ ПК */}
            <PcMonitorWidget />

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4">
                <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Раздел 11/14
                </p>
            </div>
        </section>
    );
}



