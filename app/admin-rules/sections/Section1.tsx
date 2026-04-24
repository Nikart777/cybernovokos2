import React from 'react';
import { Shield, CheckCircle2, UserCheck, Heart, Users, Trophy, Handshake, MapPin, Zap, BookOpen, Monitor, Star, AlertTriangle } from 'lucide-react';
import { SectionBadge } from '../components/SectionBadge';

const FOUR_RULES = [
    { icon: <UserCheck size={28} />, color: '#FF2E63', title: 'Каждый новый клиент — это постоянный клиент в будущем.', desc: 'Относись к каждому гостю как к будущему лояльному клиенту. Первое впечатление имеет решающее значение.' },
    { icon: <Heart size={28} />, color: '#0ea5e9', title: 'Клиенту должно быть комфортно.', desc: 'Создавай дружескую атмосферу, решай проблемы оперативно, будь лояльным и внимательным.' },
    { icon: <Users size={28} />, color: '#8b5cf6', title: 'Каждый клиент может привести компанию друзей.', desc: 'Один довольный гость = несколько новых. Работай с каждым так, как будто он приведёт 10 друзей.' },
    { icon: <Trophy size={28} />, color: '#f59e0b', title: 'Чем больше довольных клиентов, тем больше твоя премия.', desc: 'Твой доход напрямую зависит от качества работы с гостями. Сервис = деньги.' },
];

const GREET_STEPS = [
    { step: 1, title: 'Поздоровайся и уточни', desc: 'Поздоровайся, уточни впервые ли в клубе, что интересует (ПК или ТВ).', icon: <Handshake size={22} />, color: '#FF2E63' },
    { step: 2, title: 'Экскурсия и презентация', desc: 'Если позволяет время — покажи игровые зоны. Если нет — расскажи про оборудование, цены, акции, онлайн-бронирование.', icon: <MapPin size={22} />, color: '#0ea5e9' },
    { step: 3, title: 'Предложи приложение CYBERX', desc: 'Объясни, что так можно удобно бронировать ПК со скидкой для себя или сразу на компанию друзей.', icon: <Zap size={22} />, color: '#8b5cf6' },
    { step: 4, title: 'Помоги с регистрацией', desc: 'Помоги пройти регистрацию в приложении, добавить клуб в избранное.', icon: <UserCheck size={22} />, color: '#10b981' },
    { step: 5, title: 'Покажи как бронировать', desc: 'Покажи как забронировать ПК, пополнить баланс через приложение.', icon: <BookOpen size={22} />, color: '#f59e0b' },
    { step: 6, title: 'Проведи за ПК', desc: 'Проводи гостя за ПК, залогинься, покажи личный кабинет, онлайн магазин. Помоги стартовать сессию.', icon: <Monitor size={22} />, color: '#FF2E63' },
    { step: 7, title: 'Пожелай хорошей игры', desc: 'Пожелай хорошей игры и удались.', icon: <Star size={22} />, color: '#0ea5e9' },
];

export function Section1() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionBadge number="1" label="Раздел" />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase italic text-slate-900 mb-4">
                Общие положения
            </h2>
            <p className="font-chakra text-slate-600 text-sm md:text-base mb-10 leading-relaxed max-w-3xl">
                Администратор — не кассир. Работа с гостями — важнейшая задача. Необходимо грамотно работать с каждым новым клиентом, поддерживать дружескую атмосферу в клубе, быть лояльным и искать способы решения проблем.
            </p>

            {/* Ключевой тезис */}
            <div className="relative mb-12 p-8 rounded-3xl border-2 border-[#FF2E63]/10 bg-white shadow-lg overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF2E63]/5 rounded-full blur-3xl group-hover:bg-[#FF2E63]/10 transition-colors duration-700" />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#FF2E63] flex items-center justify-center text-white shadow-md shadow-[#FF2E63]/30">
                        <AlertTriangle size={32} />
                    </div>
                    <div>
                        <div className="font-tactic font-black text-slate-900 uppercase italic text-xl md:text-2xl mb-2">
                            Администратор — <span className="text-[#FF2E63]">не кассир!</span>
                        </div>
                        <p className="font-chakra font-medium text-slate-600 text-sm leading-relaxed max-w-xl">
                            Твоя главная задача — сделать так, чтобы каждый гость ушёл довольным и вернулся снова. Кассовые функции — лишь инструмент. Сервис — твоя настоящая профессия.
                        </p>
                    </div>
                </div>
            </div>

            {/* 4 правила */}
            <div className="mb-14">
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                    <Shield size={14} />
                    4 правила администратора
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {FOUR_RULES.map((rule, i) => (
                        <div key={i} className="relative flex flex-col gap-4 p-8 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all group overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-tactic font-black text-xl italic mb-6 transition-transform group-hover:-translate-y-1" style={{ backgroundColor: `${rule.color}10`, color: rule.color }}>{rule.icon}</div>
                                <div className="font-tactic font-black text-slate-900 uppercase italic text-base mb-3 leading-snug">{rule.title}</div>
                                <p className="font-chakra text-slate-500 text-sm leading-relaxed">{rule.desc}</p>
                            </div>
                            <div className="absolute -bottom-4 -right-2 font-tactic font-black text-9xl italic opacity-[0.03] pointer-events-none transition-transform group-hover:scale-110 group-hover:-rotate-6">{i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Как встретить нового клиента */}
            <div>
                <div className="flex items-center gap-2 text-xs font-chakra font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
                    <Handshake size={14} />
                    Как встретить нового клиента
                </div>

                <div className="relative max-w-4xl">
                    <div className="absolute left-7 top-6 bottom-10 w-0.5 bg-slate-200 hidden sm:block" />
                    <div className="flex flex-col gap-6">
                        {GREET_STEPS.map((s, i) => (
                            <div key={s.step} className="group relative sm:pl-20 flex flex-col sm:flex-row gap-5">
                                <div className="hidden sm:flex absolute left-0 top-3 w-14 h-14 rounded-full bg-white border-4 border-slate-50 items-center justify-center z-10 shadow-sm transition-transform group-hover:scale-110">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}15`, color: s.color }}>{s.step}</div>
                                </div>
                                <div className="flex-1 p-6 sm:p-7 rounded-3xl border border-slate-200 bg-white hover:shadow-md hover:border-slate-300 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="sm:hidden shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${s.color}10`, color: s.color }}>{s.icon}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span className="font-chakra font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-lg" style={{ color: s.color, backgroundColor: `${s.color}10` }}>Шаг {s.step}</span>
                                                <h3 className="font-tactic font-black text-slate-900 uppercase italic text-sm md:text-base">{s.title}</h3>
                                            </div>
                                            <p className="font-chakra text-slate-600 text-sm leading-relaxed mt-3">{s.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-3xl border border-green-200 bg-green-50">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-green-100 flex items-center justify-center"><CheckCircle2 size={28} className="text-green-600" /></div>
                    <div>
                        <div className="font-tactic font-black text-slate-900 uppercase italic text-base mb-1.5">Цель выполнена!</div>
                        <p className="font-chakra font-medium text-slate-600 text-sm">Гость установил приложение, зарегистрирован, знает как бронировать — и уже наслаждается игрой. Хорошая работа!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}


