'use client';

import React from 'react';
import Image from 'next/image';
import {
    Globe, Monitor, Gamepad2, ExternalLink, MapPin, Loader2, Save, Pencil, ZoomIn, Star, Trophy, ArrowRight, Gift, Users, X, Search
} from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

interface IntroSectionProps {
    configData: any;
    configError?: string | null;
    isEditing: boolean;
    isSaving: boolean;
    setIsEditing: (val: boolean) => void;
    handleSaveConfig: () => void;
    updateNovokosinoRow: (rowIndex: number, colIndex: number, val: string) => void;
    updateAltufevoRow: (rowIndex: number, colIndex: number, val: string) => void;
    setZoomedImage: (val: string | null) => void;
    setActiveSection?: (val: string) => void;
}

export const IntroSection = ({
    configData, configError, isEditing, isSaving, setIsEditing, handleSaveConfig, 
    updateNovokosinoRow, updateAltufevoRow, setZoomedImage, setActiveSection
}: IntroSectionProps) => {

    const SITES = [
        { label: 'Новокосино', url: 'https://cyberx-novokosino.ru', hint: 'Мониторинг свободных мест в клубе', color: '#FF2E63', icon: 'Monitor' },
        { label: 'Алтуфьево', url: 'https://cyberx.moscow/', hint: 'Официальный сайт клуба Алтуфьево', color: '#0ea5e9', icon: 'Globe' },
        { label: 'Автосимулятор', url: 'https://cyberx.moscow/cyberracing', hint: 'Сайт автосимулятора CyberRacing', color: '#8b5cf6', icon: 'Gamepad2' },
    ];

    const BONUS_SYSTEM_DATA = [
        { status: 'Бронза', hours: '1-56', bonus: '1%', bdBonus: '0', badgeColor: 'bg-[#CD7F32]/10 text-[#8B4513] border-[#CD7F32]/30', glow: 'group-hover:bg-[#CD7F32]/5' },
        { status: 'Серебро', hours: '57-167', bonus: '3%', bdBonus: '100', badgeColor: 'bg-slate-400/10 text-slate-600 border-slate-400/30', glow: 'group-hover:bg-slate-400/5' },
        { status: 'Золото', hours: '168-334', bonus: '5%', bdBonus: '200', badgeColor: 'bg-[#FFD700]/10 text-[#DAA520] border-[#FFD700]/40', glow: 'group-hover:bg-[#FFD700]/10' },
        { status: 'Платина', hours: '335-603', bonus: '10%', bdBonus: '300', badgeColor: 'bg-[#E5E4E2]/50 text-[#718096] border-[#B0C4DE]', glow: 'group-hover:bg-[#B0C4DE]/10' },
        { status: 'Бриллиант', hours: '604+', bonus: '20%', bdBonus: '400', badgeColor: 'bg-[#00F0FF]/10 text-[#0ea5e9] border-[#00F0FF]/40', glow: 'group-hover:bg-[#00F0FF]/5' },
    ];

    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="0" label="Раздел" />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-4">
                Введение
            </h2>
            <p className="font-chakra text-slate-600 text-sm md:text-base leading-relaxed mb-10 max-w-3xl">
                Здесь собраны все ключевые ресурсы, схемы и справочная информация для работы. Используй эти материалы для быстрого доступа к необходимой информации на смене.
            </p>

            {/* Сайты клуба */}
            <div className="mb-12">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                    <Globe size={14} />
                    Ресурсы и сайты
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SITES.map((site) => {
                        const Icon = site.icon === 'Monitor' ? Monitor : site.icon === 'Globe' ? Globe : Gamepad2;
                        return (
                            <a key={site.url} href={site.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-4 p-6 rounded-3xl border border-slate-200 bg-white hover:border-[#FF2E63]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${site.color}15`, color: site.color }}><Icon size={20} /></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#FF2E63]/10 transition-colors"><ExternalLink size={14} className="text-slate-400 group-hover:text-[#FF2E63] transition-colors" /></div>
                                </div>
                                <div>
                                    <div className="font-tactic font-black text-slate-900 uppercase italic text-base mb-1.5">{site.label}</div>
                                    <div className="font-chakra text-slate-500 text-xs leading-relaxed mb-3">{site.hint}</div>
                                    <div className="text-xs font-chakra font-bold truncate opacity-80" style={{ color: site.color }}>{site.url.replace('https://', '')}</div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

                {/* Группы гостей */}
                <div>
                    <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                        <Trophy size={14} />
                        Группы гостей и бонусы
                    </div>

                    {/* Что такое бонусы */}
                    <div className="mb-8 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 shadow-sm relative overflow-hidden text-sm font-chakra text-slate-700 leading-relaxed">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Trophy size={100} />
                        </div>
                        <h3 className="font-tactic font-black uppercase text-lg text-indigo-900 mb-3 flex items-center gap-2">
                            <Star className="text-indigo-500 fill-indigo-500/20" size={18} />
                            Что такое бонусы?
                        </h3>
                        <p className="mb-4">
                            Бонусы — это дополнительный баланс клиента, отображаемый рядом с основным в личном кабинете. Бонусы начисляются по специальным предложениям клуба и при каждой игровой сессии клиента в зависимости от его статуса в системе лояльности. <strong className="text-indigo-600 bg-indigo-100/50 px-1.5 py-0.5 rounded border border-indigo-200">1 бонус = 1 рубль</strong>.
                        </p>

                        <div className="bg-white p-4 rounded-2xl border border-indigo-100 mb-4">
                            <strong className="text-indigo-900 block mb-2 uppercase tracking-wide text-xs font-bold">Условия использования бонусов:</strong>
                            <ul className="space-y-2">
                                <li className="flex gap-2 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                    <span>Чтобы бонусами можно было платить, клиент должен пройти <strong className="text-indigo-700">полную регистрацию</strong> у администратора (показать документ, удостоверяющий личность).</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                    <span>Администратор в клубе проверяет данные и завершает регистрацию (подтверждает аккаунт).</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex gap-3 items-center bg-rose-50 border border-rose-100 text-rose-800 p-3 sm:p-4 rounded-2xl">
                            <div className="w-8 h-8 shrink-0 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                                <X size={16} strokeWidth={3} />
                            </div>
                            <span><strong>Ограничения:</strong> Бонусами <strong className="uppercase">нельзя</strong> оплачивать автосимуляторы и PS5 зону.</span>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                            <div className="hidden sm:grid grid-cols-4 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400">
                            <div>Твой статус</div>
                            <div className="text-center">Кол-во часов</div>
                            <div className="text-center">Бонус</div>
                            <div className="text-right text-[#FF2E63]">Бонус на ДР</div>
                            </div>
                            
                            <div className="flex flex-col">
                                {BONUS_SYSTEM_DATA.map((item, index) => (
                                    <div key={item.status} className={`group flex flex-col sm:grid sm:grid-cols-4 gap-4 px-6 py-4 sm:items-center transition-all duration-300 ${index !== BONUS_SYSTEM_DATA.length - 1 ? 'border-b border-slate-100' : ''} ${item.glow}`}>
                                    <div className="flex justify-between items-center sm:block">
                                        <span className="sm:hidden text-[10px] font-chakra font-bold uppercase tracking-widest text-slate-400">Статус</span>
                                        <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-xl border ${item.badgeColor} font-tactic font-black uppercase italic text-sm transition-transform group-hover:scale-105`}>{item.status}</div>
                                    </div>
                                    <div className="flex justify-between items-center sm:block sm:text-center">
                                        <span className="sm:hidden text-[10px] font-chakra font-bold uppercase tracking-widest text-slate-400">Кол-во часов</span>
                                        <div className="font-chakra font-bold text-slate-700 text-lg">{item.hours}</div>
                                    </div>
                                    <div className="flex justify-between items-center sm:block sm:text-center">
                                        <span className="sm:hidden text-[10px] font-chakra font-bold uppercase tracking-widest text-slate-400">Бонус</span>
                                        <div className="relative inline-flex items-center justify-center">
                                            <div className="absolute inset-0 bg-[#FF2E63] rounded-full blur-[6px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <div className="relative font-tactic font-black italic text-[#FF2E63] text-xl">{item.bonus}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center sm:block sm:text-right">
                                        <span className="sm:hidden text-[10px] font-chakra font-bold uppercase tracking-widest text-[#FF2E63]">Бонус на ДР</span>
                                        <div className="inline-flex flex-col items-center justify-center min-w-[60px] ml-auto">
                                            <div className="font-tactic font-black italic text-slate-900 text-xl group-hover:text-[#FF2E63] transition-colors">{item.bdBonus}</div>
                                            <div className="h-0.5 w-full bg-slate-200 group-hover:bg-[#FF2E63]/30 mt-1 transition-colors rounded-full overflow-hidden">
                                                <div className="h-full bg-[#FF2E63]" style={{ width: item.bdBonus === '0' ? '0%' : '100%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                            </div>
                    </div>
                    <p className="mt-4 text-[11px] font-chakra font-medium text-slate-500 italic max-w-2xl">
                        * Подробная таблица часов, статусов и бонусов на День Рождения. Используй её для информирования гостей о преимуществах лояльности клубу.
                    </p>
                </div>

                {/* Списание бонусов */}
                <div className="mt-12">
                    <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#FF2E63] mb-5">
                        <Trophy size={14} />
                        Списание бонусных баллов
                    </div>
                    <div className="rounded-3xl border border-[#FF2E63]/20 bg-gradient-to-br from-[#FF2E63]/5 to-transparent p-6 sm:p-8 shadow-sm">
                        <p className="font-chakra text-slate-700 text-sm leading-relaxed mb-6">
                            Оплата тарифов бонусными баллами доступна для обоих клубов (Новокосино и Алтуфьево) на одинаковых условиях. Разрешенный процент списания зависит от выбранного тарифа:
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-[#FF2E63]/30 hover:shadow-md transition-all">
                                <div className="text-[10px] font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Базовый тариф</div>
                                <div className="font-tactic font-black italic text-slate-900 text-2xl mb-1">1 ЧАС</div>
                                <div className="mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-[#FF2E63]/10 text-[#FF2E63] font-chakra font-bold text-sm border border-[#FF2E63]/20">Списание 20%</div>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-[#FF2E63]/30 hover:shadow-md transition-all">
                                <div className="text-[10px] font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Пакет</div>
                                <div className="font-tactic font-black italic text-slate-900 text-2xl mb-1">3 ЧАСА</div>
                                <div className="mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-[#FF2E63]/10 text-[#FF2E63] font-chakra font-bold text-sm border border-[#FF2E63]/20">Списание 20%</div>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-[#FF2E63]/30 hover:shadow-md transition-all">
                                <div className="text-[10px] font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Пакет</div>
                                <div className="font-tactic font-black italic text-slate-900 text-2xl mb-1">5 ЧАСОВ</div>
                                <div className="mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-orange-500/10 text-orange-600 font-chakra font-bold text-sm border border-orange-500/20">Списание 15%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Акции */}
                <div className="mt-12 mb-12">
                    <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-fuchsia-500 mb-5">
                        <Gift size={14} />
                        Актуальные Акции
                    </div>
                    <div className="rounded-3xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/10 via-slate-950 to-slate-900 p-1 shadow-md overflow-hidden relative">
                        <div className="bg-slate-950/80 backdrop-blur-md rounded-[22px] p-6 sm:p-8 relative z-10 border border-fuchsia-500/20">
                            
                            <h3 className="font-tactic font-black italic text-3xl md:text-5xl text-white mb-2 uppercase tracking-wide drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]">ПОЛУЧИ СВОЙ БОНУС</h3>
                            <p className="font-chakra text-fuchsia-200 text-sm mb-6 max-w-2xl">
                                Единые акции, действующие в обоих клубах:
                            </p>

                            {/* Приветственный бонус */}
                            <div className="mb-8 flex flex-col sm:flex-row items-center gap-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-500/50 transition-colors">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-500/30">
                                    <Star size={28} className="text-emerald-400 fill-emerald-500/50" />
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="font-tactic font-black italic text-xl text-emerald-400 uppercase tracking-wide">Базовая регистрация</h4>
                                    <p className="font-chakra text-emerald-100 text-sm mt-1">
                                        Дарим <strong className="text-white bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">400 бонусов</strong> на баланс абсолютно всем гостям при успешной регистрации в клубе!
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-slate-800 hover:border-fuchsia-500/50 rounded-2xl p-5 flex flex-row md:flex-col justify-between items-center text-center transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                                    <div className="text-[10px] sm:mb-2 font-chakra font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-300">Пополнение</div>
                                    <div className="font-tactic font-black italic tracking-widest text-white text-2xl mb-1">1000 ₽</div>
                                    <div className="mt-0 sm:mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 font-tactic italic uppercase tracking-wider text-sm border border-fuchsia-500/50 shadow-[0_0_10px_rgba(217,70,239,0.3)]">Бонус +100</div>
                                </div>
                                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-slate-800 hover:border-fuchsia-400/60 rounded-2xl p-5 flex flex-row md:flex-col justify-between items-center text-center transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                                    <div className="text-[10px] sm:mb-2 font-chakra font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-300">Пополнение</div>
                                    <div className="font-tactic font-black italic tracking-widest text-white text-2xl mb-1">2000 ₽</div>
                                    <div className="mt-0 sm:mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 font-tactic italic uppercase tracking-wider text-sm border border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.4)]">Бонус +250</div>
                                </div>
                                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-slate-800 hover:border-fuchsia-300/70 rounded-2xl p-5 flex flex-row md:flex-col justify-between items-center text-center transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                                    <div className="text-[10px] sm:mb-2 font-chakra font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-300">Пополнение</div>
                                    <div className="font-tactic font-black italic tracking-widest text-white text-2xl mb-1">3000 ₽</div>
                                    <div className="mt-0 sm:mt-3 inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 font-tactic italic uppercase tracking-wider text-sm border border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.5)]">Бонус +350</div>
                                </div>
                            </div>

                            {/* Реферальная программа */}
                            <div className="mt-8 pt-8 border-t border-fuchsia-500/20">
                                <h4 className="font-tactic font-black italic text-xl md:text-2xl text-white mb-6 uppercase tracking-wide flex items-center gap-3">
                                    <Users size={24} className="text-[#0ea5e9]" /> 
                                    Реферальная система <span className="text-[#0ea5e9]">«Пригласить друга»</span>
                                </h4>

                                <div className="mb-6 bg-slate-900/60 border border-slate-700/70 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                                   <div className="w-12 h-12 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0 border border-[#0ea5e9]/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                                       <Search size={20} />
                                   </div>
                                   <div>
                                       <div className="font-tactic font-black italic text-sm text-[#0ea5e9] uppercase tracking-wider mb-1">Где клиент может найти промокод?</div>
                                       <div className="font-chakra text-sm text-slate-300 leading-relaxed">
                                            После логина на клиентском ПК <strong className="text-white bg-slate-800 border border-slate-600 px-2 py-0.5 rounded mx-1 whitespace-normal sm:whitespace-nowrap">в Личном Кабинете (раздел «Пригласить друга»)</strong> гость получает свой уникальный код и делится им со своими друзьями.
                                       </div>
                                   </div>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-slate-900/80 rounded-2xl p-5 md:p-6 border border-slate-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]">
                                        <div className="text-[10px] sm:mb-4 font-chakra font-bold uppercase tracking-[0.2em] text-[#0ea5e9] bg-[#0ea5e9]/10 inline-block px-3 py-1 rounded-lg">Что получает приглашенный друг:</div>
                                        <ul className="space-y-4 font-chakra text-sm text-slate-300">
                                            <li className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] mt-2 shrink-0 shadow-[0_0_8px_#0ea5e9]" />
                                                <span className="leading-relaxed">При регистрации в клубе в приложении или за ПК друг вводит промокод того, кто его пригласил.</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] mt-2 shrink-0 shadow-[0_0_8px_#0ea5e9]" />
                                                <span>Стандартный приветственный бонус <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded">400 бонусов</strong>.</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] mt-2 shrink-0 shadow-[0_0_8px_#0ea5e9]" />
                                                <span>Плюс дополнительно <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded">400 бонусов</strong> за регистрацию по промокоду.</span>
                                            </li>
                                            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-3 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20">
                                                <Trophy className="text-emerald-400 shrink-0" size={16} />
                                                <span className="text-emerald-400 font-bold tracking-wide">В сумме: 800 стартовых бонусов!</span>
                                            </div>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-900/80 rounded-2xl p-5 md:p-6 border border-slate-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]">
                                        <div className="text-[10px] sm:mb-4 font-chakra font-bold uppercase tracking-[0.2em] text-fuchsia-400 bg-fuchsia-400/10 inline-block px-3 py-1 rounded-lg">Что получает тот, кто пригласил:</div>
                                        <ul className="space-y-4 font-chakra text-sm text-slate-300">
                                            <li className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-2 shrink-0 shadow-[0_0_8px_#e879f9]" />
                                                <span className="leading-relaxed">За каждого друга, который зарегистрировался по его коду, он получает <strong className="text-white">5%</strong> от <u>всех</u> пополнений баланса друга.</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-2 shrink-0 shadow-[0_0_8px_#e879f9]" />
                                                <span>Начисления идут <strong className="text-white">автоматически в виде бонусов</strong> с каждого пополнения.</span>
                                            </li>
                                            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl">
                                                <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-tactic text-xs text-white">i</div>
                                                <span className="text-slate-400 italic">Например: друг пополнил баланс на 1000 рублей, пригласивший получит <strong className="text-white">50 бонусов</strong>.</span>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* Схемы залов и Оборудование */}
            <div className="mb-12">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400">
                        <MapPin size={14} />
                        Схемы залов и оборудование
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {/* Новокосино */}
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden p-2">
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF2E63] shadow-[0_0_8px_rgba(255,46,99,0.5)]" />
                                <span className="font-chakra font-black text-[11px] uppercase tracking-widest text-slate-700">Новокосино</span>
                            </div>
                            
                            {/* Edit Config Button */}
                            <button
                                onClick={() => isEditing ? handleSaveConfig() : setIsEditing(true)}
                                disabled={isSaving || !configData}
                                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-chakra font-black uppercase tracking-widest transition-all ${
                                    isEditing 
                                        ? 'bg-green-500 text-white shadow-md shadow-green-500/20 hover:bg-green-600'
                                        : 'border border-slate-200 bg-white text-slate-500 hover:text-[#FF2E63] hover:border-[#FF2E63]/30'
                                }`}
                            >
                                {isSaving ? <Loader2 size={14} className="animate-spin" /> : isEditing ? <Save size={14} /> : <Pencil size={14} />}
                                <span>{isSaving ? 'Сохранение...' : isEditing ? 'Сохранить конфиг' : 'Редактировать конфиг'}</span>
                            </button>
                        </div>
                        
                        {/* Карта */}
                        <div 
                            className="relative border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-4 mb-4 mx-2 cursor-zoom-in group/map"
                            onClick={() => setZoomedImage('/instruktsiya/novokos_schema_new.png')}
                        >
                            <Image src="/instruktsiya/novokos_schema_new.png" alt="Схема зала Новокосино" width={800} height={600} className="w-full max-w-[500px] h-auto object-contain mix-blend-multiply group-hover/map:scale-[1.02] transition-transform duration-300" />
                            <div className="absolute top-3 right-3 p-2 bg-white/80 rounded-xl shadow-sm text-slate-500 opacity-0 group-hover/map:opacity-100 transition-opacity">
                                <ZoomIn size={16} />
                            </div>
                        </div>
                        
                        {/* Конфигурация */}
                        <div className="px-2 pb-3">
                            <div className="flex items-center justify-between px-2 mb-4">
                                <div className="text-[10px] font-chakra font-black uppercase tracking-[0.3em] text-slate-400">Конфигурация ПК</div>
                                
                                {/* Mobile edit button */}
                                <button
                                    onClick={() => isEditing ? handleSaveConfig() : setIsEditing(true)}
                                    className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-lg ${isEditing ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'}`}
                                >
                                    {isSaving ? <Loader2 size={14} className="animate-spin" /> : isEditing ? <Save size={14} /> : <Pencil size={14} />}
                                </button>
                            </div>

                            <div className="overflow-x-auto pb-2 scroll-smooth">
                                {configError ? (
                                    <div className="py-10 flex flex-col items-center justify-center text-red-500 gap-3 bg-red-50/50 rounded-2xl mx-2 border border-red-100">
                                        <div className="font-chakra font-bold text-sm uppercase tracking-widest">Ошибка загрузки</div>
                                        <div className="text-xs">{configError}</div>
                                    </div>
                                ) : !configData ? (
                                    <div className="py-10 flex flex-col items-center justify-center text-slate-400 gap-3">
                                        <Loader2 size={24} className="animate-spin" />
                                        <span className="text-xs font-chakra font-bold uppercase tracking-widest text-current">Загрузка конфигурации...</span>
                                    </div>
                                ) : (
                                    <table className="w-full text-left border-collapse min-w-[900px]">
                                        <thead>
                                            <tr>
                                                <th className="py-3 px-4 border-b border-slate-200 font-chakra font-bold text-[10px] uppercase tracking-widest text-slate-400">Оборудование</th>
                                                {configData.novokosino.headers.map((h: any, i: number) => (
                                                    <th key={i} className="py-3 px-4 border-b border-slate-200">
                                                        <div className="font-chakra font-bold text-sm text-slate-900">{h.title}</div>
                                                        <div className="font-chakra font-black text-[10px] text-[#FF2E63] uppercase mt-0.5">{h.subtitle}</div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {configData.novokosino.rows.map((row: any, i: number) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                    <td className="py-3 px-4 border-b border-slate-100 font-chakra font-bold text-xs uppercase tracking-wider text-slate-500 whitespace-nowrap">
                                                        {row.label}
                                                    </td>
                                                    {row.values.map((v: string, idx: number) => (
                                                        <td key={idx} className="py-2 px-4 border-b border-slate-100 font-chakra text-sm">
                                                            {isEditing ? (
                                                                <input 
                                                                    type="text" 
                                                                    value={v} 
                                                                    onChange={(e) => updateNovokosinoRow(i, idx, e.target.value)}
                                                                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#FF2E63] focus:ring-1 focus:ring-[#FF2E63]/20 transition-all font-sans"
                                                                />
                                                            ) : (
                                                                <span className="text-slate-800">{v}</span>
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            
                            {/* PlayStation 5 Zones */}
                            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4 px-2">
                                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#00439C] mb-1 w-full">
                                    <Gamepad2 size={14} />
                                    Игровые зоны PS5
                                </div>
                                <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex-1 min-w-[250px]">
                                    <div className="w-8 h-8 rounded-lg bg-[#00439C]/10 flex items-center justify-center text-[#00439C]">
                                        <Monitor size={18} />
                                    </div>
                                    <div>
                                        <div className="font-chakra font-bold text-sm text-slate-900">PS5 Общий зал</div>
                                        <div className="font-chakra text-xs text-slate-500 mt-0.5">ТВ 65" 4K</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex-1 min-w-[250px]">
                                    <div className="w-8 h-8 rounded-lg bg-[#FF2E63]/10 flex items-center justify-center text-[#FF2E63]">
                                        <Star size={18} />
                                    </div>
                                    <div>
                                        <div className="font-chakra font-bold text-sm text-slate-900">PS5 VIP комната</div>
                                        <div className="font-chakra text-xs text-slate-500 mt-0.5">ТВ 75" 4K + Диван</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Алтуфьево */}
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden p-2">
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9] shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                                <span className="font-chakra font-black text-[11px] uppercase tracking-widest text-slate-700">Алтуфьево</span>
                            </div>
                            
                            {/* Edit Config Button */}
                            <button
                                onClick={() => isEditing ? handleSaveConfig() : setIsEditing(true)}
                                disabled={isSaving || !configData}
                                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-chakra font-black uppercase tracking-widest transition-all ${
                                    isEditing 
                                        ? 'bg-green-500 text-white shadow-md shadow-green-500/20 hover:bg-green-600'
                                        : 'border border-slate-200 bg-white text-slate-500 hover:text-[#0ea5e9] hover:border-[#0ea5e9]/30'
                                }`}
                            >
                                {isSaving ? <Loader2 size={14} className="animate-spin" /> : isEditing ? <Save size={14} /> : <Pencil size={14} />}
                                <span>{isSaving ? 'Сохранение...' : isEditing ? 'Сохранить конфиг' : 'Редактировать конфиг'}</span>
                            </button>
                        </div>
                        <div 
                            className="relative border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-4 mb-4 mx-2 cursor-zoom-in group/map"
                            onClick={() => setZoomedImage('/instruktsiya/altufevo_schema_new.png')}
                        >
                            <Image src="/instruktsiya/altufevo_schema_new.png" alt="Схема зала Алтуфьево" width={800} height={600} className="w-full max-w-[500px] h-auto object-contain mix-blend-multiply group-hover/map:scale-[1.02] transition-transform duration-300" />
                            <div className="absolute top-3 right-3 p-2 bg-white/80 rounded-xl shadow-sm text-slate-500 opacity-0 group-hover/map:opacity-100 transition-opacity">
                                <ZoomIn size={16} />
                            </div>
                        </div>

                        {/* Конфигурация Алтуфьево */}
                        <div className="px-2 pb-3">
                            <div className="flex items-center justify-between px-2 mb-4">
                                <div className="text-[10px] font-chakra font-black uppercase tracking-[0.3em] text-slate-400">Конфигурация ПК</div>
                                
                                {/* Mobile edit button */}
                                <button
                                    onClick={() => isEditing ? handleSaveConfig() : setIsEditing(true)}
                                    className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-lg ${isEditing ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'}`}
                                >
                                    {isSaving ? <Loader2 size={14} className="animate-spin" /> : isEditing ? <Save size={14} /> : <Pencil size={14} />}
                                </button>
                            </div>

                            <div className="overflow-x-auto pb-2 scroll-smooth">
                                {!configData ? (
                                    <div className="py-10 flex flex-col items-center justify-center text-slate-400 gap-3">
                                        <Loader2 size={24} className="animate-spin" />
                                        <span className="text-xs font-chakra font-bold uppercase tracking-widest text-current">Загрузка конфигурации...</span>
                                    </div>
                                ) : (
                                    <table className="w-full text-left border-collapse min-w-[700px]">
                                        <thead>
                                            <tr>
                                                <th className="py-3 px-4 border-b border-slate-200 font-chakra font-bold text-[10px] uppercase tracking-widest text-slate-400">Оборудование</th>
                                                {configData.altufevo?.headers.map((h: any, i: number) => (
                                                    <th key={i} className="py-3 px-4 border-b border-slate-200">
                                                        <div className="font-chakra font-bold text-sm text-slate-900">{h.title}</div>
                                                        <div className="font-chakra font-black text-[10px] text-[#0ea5e9] uppercase mt-0.5">{h.subtitle}</div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {configData.altufevo?.rows.map((row: any, i: number) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                    <td className="py-3 px-4 border-b border-slate-100 font-chakra font-bold text-xs uppercase tracking-wider text-slate-500 whitespace-nowrap">
                                                        {row.label}
                                                    </td>
                                                    {row.values.map((v: string, idx: number) => (
                                                        <td key={idx} className="py-2 px-4 border-b border-slate-100 font-chakra text-sm">
                                                            {isEditing ? (
                                                                <input 
                                                                    type="text" 
                                                                    value={v} 
                                                                    onChange={(e) => updateAltufevoRow(i, idx, e.target.value)}
                                                                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all font-sans"
                                                                />
                                                            ) : (
                                                                <span className="text-slate-800">{v}</span>
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            
                            {/* PlayStation 5 Zones */}
                            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4 px-2">
                                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-[#00439C] mb-1 w-full">
                                    <Gamepad2 size={14} />
                                    Игровые зоны PS5
                                </div>
                                <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex-1 min-w-[250px]">
                                    <div className="w-8 h-8 rounded-lg bg-[#00439C]/10 flex items-center justify-center text-[#00439C]">
                                        <Monitor size={18} />
                                    </div>
                                    <div>
                                        <div className="font-chakra font-bold text-sm text-slate-900">PS5 Общий зал</div>
                                        <div className="font-chakra text-xs text-slate-500 mt-0.5">ТВ 65" 4K</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex-1 min-w-[250px]">
                                    <div className="w-8 h-8 rounded-lg bg-[#FF2E63]/10 flex items-center justify-center text-[#FF2E63]">
                                        <Star size={18} />
                                    </div>
                                    <div>
                                        <div className="font-chakra font-bold text-sm text-slate-900">PS5 VIP комната</div>
                                        <div className="font-chakra text-xs text-slate-500 mt-0.5">ТВ 75" 4K + Диван</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
