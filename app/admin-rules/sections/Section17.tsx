'use client';

import React from 'react';
import Image from 'next/image';
import { SectionBadge } from '../components/SectionBadge';
import { Gamepad2, Settings, MonitorPlay, Car, ArrowRight, ShieldAlert, Monitor, Video, Search } from 'lucide-react';

export const Section17 = () => {
    
    const altufevoGames = [
        { name: 'Assetto Corsa', desc: 'Универсальная игра с модами на графику, шашки по городу.', tags: ['Можно вдвоём', 'Свой сервер'] },
        { name: 'CarX Street Online', desc: 'Аркада, дрифт, свободная езда.', tags: ['Можно вдвоём'] },
        { name: 'Forza Horizon 5', desc: 'Город, гонки.', tags: ['Одиночный заезд'] },
        { name: 'Euro Truck Simulator 2', desc: 'Навыки дальнобойщика, длинные рейсы, фуры, грузы.', tags: ['Можно вдвоём'] },
        { name: 'BeamNG.drive', desc: 'Физика, краш-тесты, эксперименты.', tags: ['На одного'] },
        { name: 'DiRT Rally 2.0 / WRC 9', desc: 'Реалистичное ралли и бездорожье.', tags: ['Можно вдвоём'] },
        { name: 'City Car Driving', desc: 'Обучение вождению, экзамен ГАИ, билеты.', tags: ['На одного'] },
    ];

    const novokosinoGames = [
        { name: 'Assetto Corsa', desc: 'Универсальная игра с модами на графику, шашки по городу.', tags: ['Можно вдвоём', 'Свой сервер'] },
        { name: 'CarX Street Online', desc: 'Аркада, дрифт, свободная езда.', tags: ['Можно вдвоём'] },
        { name: 'Forza Horizon 5', desc: 'Город, гонки.', tags: ['Одиночный заезд'] },
        { name: 'Euro Truck Simulator 2', desc: 'Навыки дальнобойщика, длинные рейсы, фуры, грузы.', tags: ['Можно вдвоём'] },
        { name: 'BeamNG.drive', desc: 'Физика, краш-тесты, эксперименты.', tags: ['На одного'] },
        { name: 'Assetto Corsa DiRT Rally 2.0', desc: 'Реалистичное ралли и бездорожье.', tags: ['Можно вдвоём'] },
        { name: 'City Car Driving', desc: 'Обучение вождению, экзамен ГАИ, билеты.', tags: ['На одного'] },
        { name: 'Wreckfest 2', desc: 'Краш-гонки, разрушения и драйв.', tags: ['Можно вдвоём'] },
    ];

    const guides = [
        { title: 'Гайд по коробке передач (Алтуфьево)', url: 'https://t.me/c/2257113342/6960/10602', color: 'orange' },
        { title: 'Dirt Rally 2.0 вдвоем', url: 'https://t.me/c/2257113342/6960/7069', color: 'emerald' },
        { title: 'Euro Truck Simulator 2 вдвоем', url: 'https://t.me/c/2257113342/6960/6968', color: 'sky' },
        { title: 'Гайд CAR STREET X', url: 'https://t.me/c/2257113342/6960/6967', color: 'indigo' },
        { title: 'Настройка руля MOZA (Pit House)', url: 'https://t.me/c/2257113342/6960/6966', color: 'rose' },
        { title: 'Assetto Corsa: Одиночная игра', url: 'https://t.me/c/2257113342/6960/6962', color: 'fuchsia' },
        { title: 'Assetto Corsa: Игра вдвоем / Сервер', url: 'https://t.me/c/2257113342/6960/6963', color: 'purple' },
    ];

    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="17" label="Автосимуляторы" />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-6 drop-shadow-sm">
                Автосимуляторы
            </h2>
            <p className="font-chakra text-slate-600 text-sm md:text-base leading-relaxed mb-10 max-w-4xl bg-slate-50 p-5 border-l-4 border-[#8b5cf6] rounded-r-2xl shadow-sm">
                Зона автосимуляторов — это отдельный сегмент с продвинутым оборудованием (рули, педали, коробки передач, базы <strong className="text-slate-800">MOZA</strong>). Администратор должен уметь ориентировать гостей по бронированию, запуску игр, настройке руля через MOZA Pit House и соединению в мультиплеер.
            </p>

            {/* Бронирование */}
            <div className="mb-12">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#8b5cf6] mb-5">
                    <MonitorPlay size={14} />
                    Порядок бронирования
                </div>
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden group hover:border-[#8b5cf6]/30 transition-colors">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                        <Gamepad2 size={200} />
                    </div>
                    
                    <div className="flex-1 z-10">
                        <h3 className="font-tactic font-black italic text-2xl text-slate-900 mb-4 uppercase">Как забронировать?</h3>
                        <div className="space-y-4 font-chakra text-sm sm:text-base text-slate-600">
                            <p>
                                Бронирование автосимуляторов работает строго через <strong className="text-slate-900">Приложение CyberX</strong>, аналогично обычным ПК.
                            </p>
                            <ol className="list-decimal list-inside space-y-3 mt-4 text-slate-700 font-medium">
                                <li className="pl-2">Клиент открывает приложение и выбирает клуб.</li>
                                <li className="pl-2">В разделе посадки клиент выбирает <strong className="text-[#0ea5e9]">«Пакеты времени»</strong>.</li>
                                <li className="pl-2">Среди доступных пакетов необходимо найти <strong className="text-[#FF2E63] bg-[#FF2E63]/10 px-2 py-0.5 rounded">Автосим 1 час</strong>, <strong className="text-[#FF2E63] bg-[#FF2E63]/10 px-2 py-0.5 rounded">Автосим 2 часа</strong> или <strong className="text-[#FF2E63] bg-[#FF2E63]/10 px-2 py-0.5 rounded">Автосим 3 часа</strong>. Доступны только пакеты на 1, 2 и 3 часа.</li>
                                <li className="pl-2">Нажать <strong className="text-white bg-gradient-to-r from-[#FF2E63] to-[#8b5cf6] px-3 py-0.5 rounded shadow-sm">Далее</strong> и завершить оплату.</li>
                            </ol>
                            <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 text-orange-800 text-sm">
                                <ShieldAlert className="shrink-0 text-orange-500 mt-0.5" size={18} />
                                <p>Автосимуляторы оплачиваются <strong>только основными деньгами</strong> (оплата бонусами не принимается!).</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[350px] shrink-0 bg-slate-100 rounded-3xl overflow-hidden border-4 border-slate-900 shadow-xl relative aspect-[9/16]">
                        {/* Fallback image inside */}
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-chakra text-sm text-center p-4 bg-slate-800">
                            <div>
                                <Search className="mx-auto mb-2 opacity-50" size={32} />
                                Изображение бронирования<br/><span className="text-xs opacity-70">public/instruktsiya/autosim_booking.jpg</span>
                            </div>
                        </div>
                        <Image 
                            src="/instruktsiya/autosim_booking.jpg" 
                            alt="Бронирование автосимулятора" 
                            fill 
                            className="object-cover z-10 relative"
                            onError={(e) => {
                                // hide image if it fails to load so fallback shows
                                (e.target as HTMLElement).style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Видео Инструкции */}
            <div className="mb-12">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                    <Video size={14} />
                    Обучающие видео и гайды
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guides.map((guide, idx) => (
                        <a 
                            key={idx} 
                            href={guide.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden bg-white border border-slate-200 hover:border-blue-400 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3"
                        >
                            <div className={`absolute top-0 right-0 w-16 h-16 bg-${guide.color}-500/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none transition-transform group-hover:scale-150`}></div>
                            <div className={`w-10 h-10 rounded-xl bg-${guide.color}-50 text-${guide.color}-500 flex items-center justify-center shrink-0`}>
                                {guide.title.includes('MOZA') ? <Settings size={20} /> : <MonitorPlay size={20} />}
                            </div>
                            <h4 className="font-tactic italic uppercase text-slate-800 text-sm">{guide.title}</h4>
                            <div className="mt-auto flex items-center text-xs font-chakra font-bold tracking-widest text-[#0ea5e9] uppercase group-hover:gap-2 transition-all">
                                Смотреть в Telegram <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </a>
                    ))}
                </div>
                <div className="mt-4 text-xs font-chakra text-slate-500 bg-blue-50 text-blue-800 p-3 rounded-xl border border-blue-100 flex items-start gap-2">
                    <ShieldAlert className="shrink-0 mt-0.5" size={14} />
                    Обязательно изучите инструкции по <strong>MOZA Pit House</strong>. Это базовая программа для настройки отдачи руля, педалей и профилей игр. Если руль кажется "каменным" или ведет себя странно — проблема решается перезагрузкой профиля в Pit House.
                </div>
            </div>

            {/* Игры Алтуфьево */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#0ea5e9]">
                        <Car size={14} />
                        Что по играм в Алтуфьево?
                    </div>
                </div>
                <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-md">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {altufevoGames.map((game, i) => (
                            <div key={i} className="flex flex-col p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h5 className="font-tactic italic text-white uppercase">{game.name}</h5>
                                    <div className="flex flex-wrap gap-1 justify-end shrink-0">
                                        {game.tags.map((tag, t) => (
                                            <span key={t} className={`text-[10px] uppercase font-chakra font-bold px-2 py-0.5 rounded border ${tag.includes('вдвоём') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : tag === 'Свой сервер' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' : 'bg-slate-700/50 text-slate-300 border-slate-600'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="font-chakra text-sm text-slate-400">{game.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Игры Новокосино */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#FF2E63]">
                        <Car size={14} />
                        Что по играм в Новокосино?
                    </div>
                </div>
                <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-md border-t-4 border-[#FF2E63]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {novokosinoGames.map((game, i) => (
                            <div key={i} className="flex flex-col p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h5 className="font-tactic italic text-white uppercase">{game.name}</h5>
                                    <div className="flex flex-wrap gap-1 justify-end shrink-0">
                                        {game.tags.map((tag, t) => (
                                            <span key={t} className={`text-[10px] uppercase font-chakra font-bold px-2 py-0.5 rounded border ${tag.includes('вдвоём') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : tag === 'Свой сервер' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' : 'bg-slate-700/50 text-slate-300 border-slate-600'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="font-chakra text-sm text-slate-400">{game.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </section>
    );
};
