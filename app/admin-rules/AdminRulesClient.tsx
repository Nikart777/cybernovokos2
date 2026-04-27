'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Shield, X, Search, ArrowRight } from 'lucide-react';

import { IntroSection } from './sections/IntroSection';
import { Section1 } from './sections/Section1';
import { Section2 } from './sections/Section2';
import { Section3 } from './sections/Section3';
import { Section4 } from './sections/Section4';
import { Section5 } from './sections/Section5';
import { Section6 } from './sections/Section6';
import { Section7 } from './sections/Section7';
import { Section8 } from './sections/Section8';
import { Section9 } from './sections/Section9';
import { Section10 } from './sections/Section10';
import { Section11 } from './sections/Section11';
import { Section12 } from './sections/Section12';
import { Section13 } from './sections/Section13';
import { Section14 } from './sections/Section14';
import { Section15 } from './sections/Section15';
import { Section16 } from './sections/Section16';
import { Section17 } from './sections/Section17';
import { Section18 } from './sections/Section18';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SECTIONS_NAV = [
    { id: 'intro', label: 'Введение', keywords: 'контакты руководства сисадмин пароли доступ реквизиты инн ооо регламент рабочий чат' },
    { id: 'section1', label: '1. Общие положения', keywords: 'внешний вид форма бейджик опоздание еда напитки курение телефон сон сменщик график' },
    { id: 'section2', label: '2. Обязанности', keywords: 'встреча гостей приветствие регистрация посадка вытяжка кондиционер сдача смены касса музыка' },
    { id: 'section3', label: '3. Открытие смены', keywords: 'открытие смены инвентаризация холодильник витрина касса пересчет товаров включение проверка уборка' },
    { id: 'section4', label: '4. Бронирование', keywords: 'бронь телефон отмена предоплата бронирование чек вк соцсети перенос времени' },
    { id: 'section5', label: '5. Пополнение баланса', keywords: 'оплата перевод пополнение сбер тинькофф qr сбп наличные безнал терминал обман мошенник' },
    { id: 'section6', label: '6. Управление баром', keywords: 'бар продажа холодильник инвентаризация микроволновка сэндвич энергетик сроки годности списание' },
    { id: 'section7', label: '7. Компенсации', keywords: 'компенсация возврат манибэк лаг вылет перезагрузка фризы жалоба клиент недоволен доплата' },
    { id: 'section8', label: '8. Система премий', keywords: 'премия выручка план бонус kpi мотивация зарплата порог' },
    { id: 'section9', label: '9. Закрытие смены', keywords: 'закрытие смены инкассация подсчет кассы сейф отчет excel таблица эксель терминал z-отчет x-отчет' },
    { id: 'section10', label: '10. Форс-мажор', keywords: 'пожар полиция скорая драка конфликт пьяный неадекват кража нет света отключили интернет потоп роутер свич' },
    { id: 'section11', label: '11. Уборка и контроль', keywords: 'уборка чек-лист пыль мусор монитор мышка клавиатура туалет бумага мыло проверка свет' },
    { id: 'section12', label: '12. Обновления ПК', keywords: 'обновление игр стим steam cs dota valorant pubg тех режим sdi драйвера диски лан гейм' },
    { id: 'section13', label: '13. Зона TV (PS5)', labelSearch: 'Зона TV (PS5)', keywords: 'тв tv пс5 ps5 плойка консоль телевизор джойстик геймпад fifa ufc mk мортал комбат аккаунт' },
    { id: 'section14', label: '14. Технические вопросы', keywords: 'техподдержка синий экран фейсит faceit windows bios secure boot память ошибки мышь сенсор звук' },
    { id: 'section15', label: '15. Подарочные сертификаты', keywords: 'сертификат подарочный подарок номинал активация' },
    { id: 'section16', label: '16. Нарушения и штрафы', keywords: 'штраф увольнение наказание вычет несход касса опоздание грязь нарушение' },
    { id: 'section17', label: '17. Автосимуляторы', keywords: 'автосим руль педали база коробка передач моза moza pit house assetto corsa carx forza beamng dirt rally city car driving' },
    { id: 'section18', label: '18. План стажировки', keywords: 'стажировка стажер план тестирование тест обучение 3-4 часа начало' },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function AdminRulesClient() {
    const [activeSection, setActiveSection] = useState(SECTIONS_NAV[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Search logic
    const activeSearchQuery = searchQuery.trim().toLowerCase();
    const searchResults = activeSearchQuery.length > 0 
        ? SECTIONS_NAV.filter(s => 
            s.label.toLowerCase().includes(activeSearchQuery) || 
            (s.keywords && s.keywords.toLowerCase().includes(activeSearchQuery))
          )
        : [];
    const [configData, setConfigData] = useState<any>(null);
    const [configError, setConfigError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // UI state
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/configs')
            .then(async res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                const text = await res.text();
                try {
                    return JSON.parse(text);
                } catch (err) {
                    throw new Error(`JSON Parse Error: ${text.substring(0, 50)}...`);
                }
            })
            .then(data => {
                if (data.error) throw new Error(data.error);
                setConfigData(data);
                setConfigError(null);
            })
            .catch(err => {
                console.error("Config fetch error:", err);
                setConfigError(err.message || 'Unknown error occurred');
            });
    }, []);

    const handleSaveConfig = async () => {
        setIsSaving(true);
        try {
            await fetch('/api/configs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(configData)
            });
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to save", err);
        } finally {
            setIsSaving(false);
        }
    };

    const updateNovokosinoRow = (rowIndex: number, colIndex: number, val: string) => {
        const newData = { ...configData };
        newData.novokosino.rows[rowIndex].values[colIndex] = val;
        setConfigData(newData);
    };

    const updateAltufevoRow = (rowIndex: number, colIndex: number, val: string) => {
        const newData = { ...configData };
        newData.altufevo.rows[rowIndex].values[colIndex] = val;
        setConfigData(newData);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
            {/* ── HERO ── */}
            <header className="relative bg-white border-b border-slate-200 overflow-visible pt-10 pb-8 mb-8 shadow-sm">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF2E63]/5 blur-[100px]" />
                    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(#FF2E63 1px, transparent 1px), linear-gradient(90deg, #FF2E63 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs font-chakra font-bold uppercase tracking-widest">
                        <Link href="/" className="hover:text-slate-800 transition-colors">Главная</Link>
                        <ChevronRight size={12} />
                        <span className="text-[#FF2E63]">Инструкция администратора</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-end mb-6">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF2E63]/20 bg-[#FF2E63]/5 mb-4">
                                <Shield size={12} className="text-[#FF2E63]" />
                                <span className="font-chakra font-bold text-[10px] uppercase tracking-widest text-[#FF2E63]">Официальный документ</span>
                            </div>

                            <h1 className="font-tactic font-black text-3xl md:text-5xl uppercase italic leading-tight mb-2">
                                <span className="text-slate-900">Должностная </span>
                                <span className="text-[#FF2E63]">инструкция</span>
                            </h1>
                            <p className="font-chakra font-bold text-slate-400 text-xs md:text-sm uppercase tracking-widest">
                                Администратора компьютерного клуба CYBERX COMMUNITY
                            </p>
                        </div>
                        
                        {/* Правый блок: Быстрые ссылки, Поиск + Кнопка */}
                        <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row items-center gap-4 relative">
                            <div className="hidden xl:flex items-center gap-3 mr-2">
                                <a 
                                    href="https://cyberx-novokosino.ru/mouse-test" 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="h-10 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-chakra font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center border border-slate-200 z-20 whitespace-nowrap"
                                >
                                    Контроль мышек
                                </a>
                                <a 
                                    href="https://cyberx-novokosino.ru/calculator" 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="h-10 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-chakra font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center border border-slate-200 z-20 whitespace-nowrap"
                                >
                                    Калькулятор компенсаций
                                </a>
                                <a 
                                    href="https://docs.google.com/spreadsheets/d/1HU1dAuhUMZZsCLSwuMlyUPsVl0_VExCAiVNpQVp2Gzc/edit?usp=sharing" 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="h-10 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-chakra font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center border border-rose-200 z-20 whitespace-nowrap"
                                >
                                    Таблица штрафов (Новокосино)
                                </a>
                            </div>

                            <Link 
                                href="/admin-test" 
                                className="w-full sm:w-auto h-12 px-6 bg-[#FF2E63] hover:bg-[#E62A5A] text-white font-chakra font-bold text-sm uppercase tracking-wider rounded-2xl transition-all shadow-[0_5px_20px_-5px_rgba(255,46,99,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(255,46,99,0.5)] flex items-center justify-center gap-2 z-20"
                            >
                                ПРОЙТИ ТЕСТ <ArrowRight size={16} />
                            </Link>

                            <div className="w-full sm:w-80 relative">
                                <div className="relative z-20">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Поиск по разделам..."
                                        value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-[#FF2E63] focus:ring-1 focus:ring-[#FF2E63]/50 rounded-2xl outline-none font-chakra text-sm transition-all shadow-sm"
                                />
                            </div>
                            {/* Выпадающий список поиска */}
                            {activeSearchQuery.length > 0 && (
                                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden font-chakra text-sm flex flex-col z-[100]">
                                    {searchResults.length > 0 ? (
                                        <div className="max-h-[300px] overflow-y-auto [scrollbar-width:thin]">
                                            {searchResults.map(s => (
                                                <button
                                                    key={s.id}
                                                    onClick={() => {
                                                        setActiveSection(s.id);
                                                        setSearchQuery('');
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors flex flex-col"
                                                >
                                                    <span className="font-bold text-slate-800">{s.label}</span>
                                                    <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">{s.keywords}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-slate-500 text-center bg-slate-50/50">Ничего не найдено</div>
                                    )}
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                    {/* Mobile Tabs */}
                    <div className="flex lg:hidden overflow-x-auto pb-4 gap-3 snap-x scrollbar-hide">
                        {SECTIONS_NAV.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    setActiveSection(s.id);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`shrink-0 px-4 py-2.5 rounded-xl border text-xs font-chakra font-bold uppercase tracking-widest transition-all snap-start ${
                                    activeSection === s.id
                                        ? 'border-[#FF2E63] bg-[#FF2E63]/10 text-[#FF2E63]'
                                        : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300 hover:text-slate-800 shadow-sm'
                                }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>
            <div className="container mx-auto px-4">
                <div className="flex gap-8 lg:gap-12 relative">

                    {/* ── SIDEBAR (десктоп) ── */}
                    <aside className="hidden lg:block w-56 shrink-0">
                        <div className="sticky top-28">
                            <div className="text-[10px] font-chakra font-black uppercase tracking-[0.3em] text-slate-400 mb-4 px-3">Навигация</div>
                            <nav className="flex flex-col gap-2 max-h-[calc(100vh-140px)] overflow-y-auto pb-8 pr-2 [scrollbar-width:thin]">
                                {SECTIONS_NAV.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => {
                                            setActiveSection(s.id);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all text-xs font-chakra font-bold uppercase tracking-wider ${
                                            activeSection === s.id
                                                ? 'bg-white text-[#FF2E63] shadow-md border border-slate-200 ring-1 ring-[#FF2E63]/20'
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-white/60 border border-transparent hover:border-slate-200'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full transition-all ${activeSection === s.id ? 'bg-[#FF2E63] scale-125 shadow-[0_0_8px_rgba(255,46,99,0.5)]' : 'bg-slate-300 group-hover:scale-125 group-hover:bg-[#FF2E63]/50'}`} />
                                        {s.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* ── MAIN CONTENT ── */}
                    <main className="flex-1 min-w-0">
                        {activeSection === 'intro' && (
                            <IntroSection
                                configData={configData}
                                configError={configError}
                                isEditing={isEditing}
                                isSaving={isSaving}
                                setIsEditing={setIsEditing}
                                handleSaveConfig={handleSaveConfig}
                                updateNovokosinoRow={updateNovokosinoRow}
                                updateAltufevoRow={updateAltufevoRow}
                                setZoomedImage={setZoomedImage}
                            />
                        )}

                        {activeSection === 'section1' && <Section1 />}
                        {activeSection === 'section2' && <Section2 />}
                        {activeSection === 'section3' && <Section3 />}
                        {activeSection === 'section4' && <Section4 />}
                        {activeSection === 'section5' && <Section5 />}
                        {activeSection === 'section6' && (
                            <Section6 setZoomedImage={setZoomedImage} configData={configData} isEditing={isEditing} updateNovokosinoRow={updateNovokosinoRow} updateAltufevoRow={updateAltufevoRow} />
                        )}
                        {activeSection === 'section7' && <Section7 />}
                        {activeSection === 'section8' && <Section8 />}
                        {activeSection === 'section9' && <Section9 setZoomedImage={setZoomedImage} />}
                        {activeSection === 'section10' && <Section10 setZoomedImage={setZoomedImage} />}
                        {activeSection === 'section11' && <Section11 />}
                        {activeSection === 'section12' && <Section12 />}
                        {activeSection === 'section13' && <Section13 />}
                        {activeSection === 'section14' && <Section14 />}
                        {activeSection === 'section15' && <Section15 />}
                        {activeSection === 'section16' && <Section16 />}
                        {activeSection === 'section17' && <Section17 setActiveSection={setActiveSection} />}
                        {activeSection === 'section18' && <Section18 />}

                        {/* Pagination Button */}
                        {(() => {
                            const currentIndex = SECTIONS_NAV.findIndex(s => s.id === activeSection);
                            if (currentIndex >= 0 && currentIndex < SECTIONS_NAV.length - 1) {
                                const nextSection = SECTIONS_NAV[currentIndex + 1];
                                return (
                                    <div className="mt-16 border-t border-slate-200 pt-10 pb-4 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <button
                                            onClick={() => {
                                                setActiveSection(nextSection.id);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="group w-full max-w-3xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-[#FF2E63] hover:to-rose-600 border-2 border-slate-800 hover:border-[#FF2E63] text-white p-6 sm:p-8 rounded-[2rem] transition-all duration-300 shadow-lg hover:shadow-[0_10px_35px_rgba(255,46,99,0.3)] flex items-center justify-between"
                                        >
                                            <div className="text-left flex flex-col gap-1 pr-4">
                                                <span className="font-chakra text-slate-400 group-hover:text-rose-100 text-sm font-bold uppercase tracking-[0.2em] transition-colors mb-2">Ознакомлен</span>
                                                <span className="font-tactic font-black italic text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide leading-none">ПЕРЕЙТИ ДАЛЕЕ</span>
                                                <span className="font-chakra text-slate-500 group-hover:text-rose-200 text-xs sm:text-sm font-bold mt-4 transition-colors flex items-center gap-2">
                                                    Следующий раздел: <span className="text-rose-400 group-hover:text-white transition-colors">{nextSection.label}</span>
                                                </span>
                                            </div>
                                            <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]">
                                                <ArrowRight size={40} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </button>
                                    </div>
                                );
                            }
                            return null;
                        })()}
                    </main>
                </div>
            </div>

            {/* ── IMAGE ZOOM MODAL ── */}
            {zoomedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-zoom-out animate-in fade-in duration-200"
                    onClick={() => setZoomedImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                        onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
                    >
                        <X size={24} />
                    </button>
                    <div className="relative bg-white rounded-3xl p-2 shadow-2xl flex items-center justify-center cursor-default" onClick={e => e.stopPropagation()}>
                        <Image 
                            src={zoomedImage} 
                            alt="Увеличенная схема" 
                            width={1920} 
                            height={1080} 
                            className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain rounded-2xl bg-slate-50" 
                            unoptimized
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
