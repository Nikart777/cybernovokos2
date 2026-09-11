import React from 'react';
import Image from 'next/image';
import {
    KeyRound,
    Gamepad2,
    Monitor,
    MousePointerClick,
    Search,
    CheckCircle2,
    AlertTriangle,
    User,
    ZoomIn,
    ArrowRight,
    ExternalLink,
} from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const ISSUE_STEPS = [
    {
        title: 'Найти ПК гостя',
        description: '«Управление ПК» → найти карточку ПК гостя (ПК занят, идёт таймер).',
        icon: Monitor,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
        images: [{ src: '/instruktsiya/langame-pc-card.webp', width: 1912, height: 996 }],
    },
    {
        title: 'Открыть меню карточки',
        description: 'Нажать стрелку-меню в углу карточки → пункт «Игр. аккаунты».',
        icon: MousePointerClick,
        color: 'text-teal-500',
        bgColor: 'bg-teal-50',
        images: [{ src: '/instruktsiya/langame-pc-menu.webp', width: 297, height: 488 }],
    },
    {
        title: 'Выбрать аккаунт',
        description: 'В окне «Активировать игровой аккаунт на N» ввести название игры в поиск или выбрать лаунчер (Steam, Epic Games, Battle.net…).',
        icon: Search,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        images: [{ src: '/instruktsiya/langame-pc-account-modal.webp', width: 1907, height: 994 }],
    },
    {
        title: 'Подтвердить выдачу',
        description: 'Нажать зелёную кнопку нужного аккаунта → подтвердить. Аккаунт закрепится за ПК, лаунчер/игра запустятся сами по настройке запуска.',
        icon: KeyRound,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
    },
    {
        title: 'Проверить вход',
        description: (
            <>
                Проверить на ПК гостя: лаунчер открылся и вошёл <strong className="text-slate-900">без ручного ввода логина/пароля</strong>. В Админ ПО аккаунт отображается как занятый. Если просит пароль — см. блок «Если аккаунт не выдаётся».
            </>
        ),
        icon: CheckCircle2,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
    },
];

export function Section8({ setZoomedImage, onNavigate }: { setZoomedImage?: (src: string | null) => void; onNavigate?: (sectionId: string) => void }) {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="8" label="Раздел" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-3 flex items-center gap-4">
                        <KeyRound className="text-emerald-500 hidden sm:block" size={48} />
                        Игровые <span className="text-emerald-500">аккаунты</span>
                    </h2>
                    <p className="font-chakra text-slate-600 text-sm md:text-base max-w-2xl">
                        Как выдать гостю клубный аккаунт (Steam, Epic, Battle.net и др.) через Админ ПО Langame и что делать, если аккаунт не выдаётся.
                    </p>
                </div>
            </div>

            {/* БЛОК A — ГЛАВНОЕ */}
            <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 shadow-sm mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="text-emerald-400" size={24} />
                    <h3 className="font-tactic font-black text-xl md:text-2xl uppercase italic">Главное</h3>
                </div>
                <ul className="space-y-4 font-chakra text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-tactic font-black text-xs italic mt-0.5">1</span>
                        <span>Аккаунт выдаётся <strong className="text-white">только на занятый ПК</strong>. ПК свободен → сначала посадить гостя (начать сеанс), потом выдавать.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-tactic font-black text-xs italic mt-0.5">2</span>
                        <span>Выданный аккаунт становится <strong className="text-white">занятым</strong>: другой гость его не получит, пока он используется на этом ПК.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-tactic font-black text-xs italic mt-0.5">3</span>
                        <span>Игры, аккаунты и настройки запуска на домене настраивает руководство. На смене админ только <strong className="text-white">выдаёт</strong>.</span>
                    </li>
                </ul>
            </div>

            {/* БЛОК B — ВЫДАЧА АККАУНТА НА ПК ГОСТЯ */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 mb-12 shadow-sm">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                    <Gamepad2 className="text-emerald-500" size={24} />
                    <h3 className="font-tactic font-black text-xl md:text-2xl uppercase italic text-slate-900">Выдача аккаунта на ПК гостя</h3>
                </div>

                <div className="relative">
                    <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-slate-100 hidden sm:block"></div>

                    <div className="space-y-6">
                        {ISSUE_STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 group">
                                    {/* Number / Timeline Node */}
                                    <div className="shrink-0 z-10 flex items-center space-x-4 sm:space-x-0">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.bgColor} border-4 border-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                            <span className={`font-tactic font-black text-lg md:text-2xl italic ${step.color}`}>{idx + 1}</span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50 p-5 md:p-6 group-hover:border-emerald-200 group-hover:bg-white transition-colors">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <h4 className="font-tactic font-black uppercase text-sm md:text-base text-slate-800 flex items-center gap-2">
                                                {step.title}
                                            </h4>
                                            <div className="shrink-0 inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200/50">
                                                <Icon size={14} />
                                                <span className="text-[10px] sm:text-xs font-chakra font-black uppercase tracking-wider">Шаг {idx + 1}</span>
                                            </div>
                                        </div>
                                        <p className="font-chakra text-slate-600 text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                        {step.images && step.images.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-4">
                                                {step.images.map((img, i) => {
                                                    const isPortrait = img.height > img.width;
                                                    return (
                                                        <div
                                                            key={i}
                                                            className={`relative border border-slate-200 rounded-xl overflow-hidden bg-white cursor-zoom-in group/img shadow-sm hover:shadow-md hover:border-emerald-300 transition-all ${isPortrait ? 'w-full max-w-[280px]' : 'w-full max-w-2xl'}`}
                                                            onClick={() => setZoomedImage?.(img.src)}
                                                        >
                                                            <Image
                                                                src={img.src}
                                                                alt={`${step.title} — пример`}
                                                                width={img.width}
                                                                height={img.height}
                                                                unoptimized
                                                                className="w-full h-auto object-contain group-hover/img:opacity-90 transition-opacity"
                                                            />
                                                            <div className="absolute top-3 right-3 p-2 bg-white/90 rounded-lg shadow-sm text-slate-600 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                                <ZoomIn size={16} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* БЛОК C — ДВА СПРАВОЧНИКА В МЕНЮ СЛЕВА */}
            <div className="space-y-8 mb-6">
                {/* Аккаунты игр */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Gamepad2 className="text-emerald-500" size={22} />
                        <h3 className="font-tactic font-black text-lg uppercase italic text-slate-900">Аккаунты игр</h3>
                    </div>
                    <p className="font-chakra text-slate-600 text-sm leading-relaxed mb-6 max-w-3xl">
                        Список игр клуба. Кнопка «Занять» напротив игры — система сама подберёт свободный аккаунт под игру и запустит её на ПК. Найти игру: поиск или кнопка «Полный список игр».
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { src: '/instruktsiya/langame-accounts-games.webp', width: 1912, height: 995, alt: 'Вкладка «Аккаунты игр» — таблица игр с кнопками «Занять»', caption: 'Список игр с кнопками «Занять»' },
                            { src: '/instruktsiya/langame-accounts-games-list.webp', width: 1914, height: 996, alt: 'Вкладка «Аккаунты игр» с раскрытым «Полным списком игр»', caption: '«Полный список игр»' },
                        ].map((img, i) => (
                            <div key={i}>
                                <div
                                    className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 cursor-zoom-in group/img shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
                                    onClick={() => setZoomedImage?.(img.src)}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        width={img.width}
                                        height={img.height}
                                        unoptimized
                                        className="w-full h-auto object-contain group-hover/img:opacity-90 transition-opacity"
                                    />
                                    <div className="absolute top-3 right-3 p-2 bg-white/90 rounded-lg shadow-sm text-slate-600 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                        <ZoomIn size={16} />
                                    </div>
                                </div>
                                <p className="text-xs font-chakra text-slate-400 mt-2 text-center">{img.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Аккаунты лаунчеров */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Monitor className="text-teal-500" size={22} />
                        <h3 className="font-tactic font-black text-lg uppercase italic text-slate-900">Аккаунты лаунчеров</h3>
                    </div>
                    <p className="font-chakra text-slate-600 text-sm leading-relaxed mb-6 max-w-3xl">
                        Нужны, когда требуется аккаунт конкретного лаунчера (Steam, Epic, Battle.net, Riot…), а не отдельная игра. Выбрать лаунчер сверху → «Занять». Колонка «Доступные игры» показывает, что привязано к аккаунту.
                    </p>
                    <div className="max-w-2xl">
                        <div
                            className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 cursor-zoom-in group/img shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
                            onClick={() => setZoomedImage?.('/instruktsiya/langame-accounts-launchers.webp')}
                        >
                            <Image
                                src="/instruktsiya/langame-accounts-launchers.webp"
                                alt="Вкладка «Аккаунты лаунчеров» — фильтр по лаунчерам и таблица Имя / Лаунчер / Статус / Доступные игры"
                                width={1909}
                                height={997}
                                unoptimized
                                className="w-full h-auto object-contain group-hover/img:opacity-90 transition-opacity"
                            />
                            <div className="absolute top-3 right-3 p-2 bg-white/90 rounded-lg shadow-sm text-slate-600 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <ZoomIn size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-xs font-chakra font-bold text-slate-400 uppercase tracking-widest mb-12 flex items-center gap-2">
                <User size={14} className="text-slate-400" /> С этими вкладками работают только администраторы
            </p>

            {/* БЛОК D — ГОСТЬ МОЖЕТ САМ */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <User className="text-emerald-500" size={22} />
                    <h3 className="font-tactic font-black text-xl uppercase italic text-slate-900">Гость может сам</h3>
                </div>
                <p className="font-chakra text-slate-600 text-sm leading-relaxed mb-6 max-w-3xl">
                    В личном кабинете на ПК есть кнопка «Выбрать игру». Гость выбирает игру → аккаунт выдаётся и игра запускается автоматически. Если свободного аккаунта нет, гость подойдёт к вам — выдать вручную (см. «Выдача аккаунта на ПК гостя» выше) или предложить другую игру.
                </p>
                <div
                    className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md cursor-zoom-in group"
                    onClick={() => setZoomedImage?.('/instruktsiya/langame-lk-choose-game.webp')}
                >
                    <Image
                        src="/instruktsiya/langame-lk-choose-game.webp"
                        alt="Кнопка «Выбрать игру» в личном кабинете гостя на ПК"
                        width={1803}
                        height={1012}
                        unoptimized
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="font-chakra text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                            <ZoomIn size={12} /> Нажмите для увеличения
                        </span>
                    </div>
                </div>
            </div>

            {/* БЛОК E — ЕСЛИ АККАУНТ НЕ ВЫДАЁТСЯ */}
            <div className="rounded-3xl border border-amber-200 bg-white overflow-hidden shadow-sm mb-12">
                <div className="bg-amber-50 p-6 flex items-center gap-4 border-b border-amber-100">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="font-tactic font-black text-xl uppercase italic text-amber-900 mb-1">Если аккаунт не выдаётся</h3>
                        <p className="font-chakra text-amber-700 text-sm">Частые причины и что делать на смене</p>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-4 font-chakra text-sm">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                        <p className="text-slate-800 font-bold">Аккаунт «занят» или его нет среди зелёных кнопок</p>
                        <p className="text-slate-600 mt-1 flex items-start gap-2">
                            <ArrowRight size={14} className="shrink-0 mt-0.5 text-slate-400" />
                            Используется на другом ПК или отключён. Выбрать другой аккаунт/игру или дождаться освобождения.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                        <p className="text-slate-800 font-bold">Игры нет в списке (ни в Админ ПО, ни в ЛК гостя)</p>
                        <p className="text-slate-600 mt-1 flex items-start gap-2">
                            <ArrowRight size={14} className="shrink-0 mt-0.5 text-slate-400" />
                            На домене нет игры, аккаунта, привязки или настройки запуска. На смене не чинится: сообщить руководству / техподдержке Langame.
                        </p>
                        <button
                            onClick={() => onNavigate?.('section15')}
                            className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded hover:bg-emerald-200 transition-colors"
                        >
                            Раздел 15: Техподдержка Langame <ArrowRight size={10} />
                        </button>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                        <p className="text-slate-800 font-bold">Игра/лаунчер открылись, но автовход не сработал (просит логин и пароль)</p>
                        <p className="text-slate-600 mt-1 flex items-start gap-2">
                            <ArrowRight size={14} className="shrink-0 mt-0.5 text-slate-400" />
                            На гостевом ПК нет .NET Desktop Runtime 6.0. Установить, перезагрузить ПК и выдать аккаунт заново. Если не получается — сисадмин.
                        </p>
                        <a
                            href="https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-desktop-6.0.36-windows-x64-installer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700 transition-colors"
                        >
                            <ExternalLink size={10} /> Скачать .NET Desktop Runtime 6.0
                        </a>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                        <p className="text-slate-800 font-bold">Steam просит код Guard</p>
                        <p className="text-slate-600 mt-1 flex items-start gap-2">
                            <ArrowRight size={14} className="shrink-0 mt-0.5 text-slate-400" />
                            Steam Guard на рабочем телефоне; один Guard — не более 5 устройств.
                        </p>
                        <button
                            onClick={() => onNavigate?.('section13')}
                            className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded hover:bg-emerald-200 transition-colors"
                        >
                            Раздел 13: Обновления ПК <ArrowRight size={10} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ИСТОЧНИК */}
            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-end">
                <a
                    href="https://wiki.langame.ru/books/langame-software/page/vydaca-akkauntov-s-admin-po-i-s-licnogo-kabineta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-chakra font-bold text-slate-400 hover:text-emerald-600 transition-colors"
                >
                    Источник: wiki.langame.ru <ExternalLink size={12} />
                </a>
            </div>
        </section>
    );
}
