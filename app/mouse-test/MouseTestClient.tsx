'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mouse, RotateCcw, ChevronDown, Info, AlertTriangle, CheckCircle2,
    Ban, Shield, Zap, Target, BarChart3, HelpCircle, ArrowLeft, Settings2
} from 'lucide-react';

// ==================== TYPES ====================
interface ClickInterval {
    ms: number;
    isError: boolean;
    timestamp: number;
}

type ButtonType = 0 | 1 | 2;
type VerdictType = 'waiting' | 'ok' | 'warning' | 'danger';

// ==================== COMPONENT ====================
export default function MouseTestClient() {
    // === State ===
    const [lastClickTime, setLastClickTime] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [intervals, setIntervals] = useState<ClickInterval[]>([]);
    const threshold = 60;
    const [selectedButton, setSelectedButton] = useState<ButtonType>(0);
    const [statusText, setStatusText] = useState('Ожидание первого клика...');
    const [statusType, setStatusType] = useState<'idle' | 'ok' | 'error'>('idle');
    const [flashType, setFlashType] = useState<'idle' | 'ok' | 'error'>('idle');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    // Refs
    const lastClickTimeRef = useRef(0);
    const clickCountRef = useRef(0);
    const errorCountRef = useRef(0);
    const intervalsRef = useRef<ClickInterval[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logRef = useRef<HTMLDivElement>(null);

    const buttonNames: Record<ButtonType, string> = { 0: 'ЛКМ', 1: 'СКМ', 2: 'ПКМ' };

    // === Draw graph ===
    const drawGraph = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(5, 5, 5, 0.5)';
        ctx.beginPath();
        ctx.roundRect(0, 0, w, h, 8);
        ctx.fill();

        const data = intervalsRef.current;
        if (data.length < 1) {
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('График интервалов появится здесь...', w / 2, h / 2);
            return;
        }

        const maxMs = Math.max(300, ...data.map(i => i.ms));
        const barWidth = Math.max(3, Math.min(12, (w - 20) / data.length - 2));
        const displayCount = Math.min(data.length, Math.floor((w - 20) / (barWidth + 2)));
        const startIdx = data.length - displayCount;

        const thresholdY = h - (threshold / maxMs) * (h - 24) - 12;
        ctx.strokeStyle = 'rgba(255, 46, 99, 0.3)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(10, thresholdY);
        ctx.lineTo(w - 10, thresholdY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(255, 46, 99, 0.5)';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${threshold} мс`, w - 8, thresholdY - 4);

        for (let i = 0; i < displayCount; i++) {
            const point = data[startIdx + i];
            const x = 10 + i * (barWidth + 2);
            const barH = (point.ms / maxMs) * (h - 24);
            const y = h - barH - 12;

            if (point.isError) {
                const grad = ctx.createLinearGradient(x, y, x, y + barH);
                grad.addColorStop(0, 'rgba(255, 46, 99, 0.8)');
                grad.addColorStop(1, 'rgba(255, 46, 99, 0.3)');
                ctx.fillStyle = grad;
            } else {
                const grad = ctx.createLinearGradient(x, y, x, y + barH);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
                grad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
                ctx.fillStyle = grad;
            }

            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barH, 2);
            ctx.fill();
        }
    }, [threshold]);

    // === Handle click ===
    const handleClick = useCallback((e: React.MouseEvent) => {
        if (e.button !== selectedButton) return;

        const now = Date.now();
        const diff = now - lastClickTimeRef.current;

        clickCountRef.current++;
        setClickCount(clickCountRef.current);

        if (lastClickTimeRef.current !== 0) {
            const isError = diff <= threshold;
            const newInterval: ClickInterval = { ms: diff, isError, timestamp: now };
            intervalsRef.current = [...intervalsRef.current, newInterval];
            setIntervals([...intervalsRef.current]);

            if (isError) {
                errorCountRef.current++;
                setErrorCount(errorCountRef.current);
                setStatusText(`⚠️ ДАБЛКЛИК ОБНАРУЖЕН: ${diff} мс`);
                setStatusType('error');
                setFlashType('error');
            } else {
                setStatusText(`✓ Норма: ${diff} мс`);
                setStatusType('ok');
                setFlashType('ok');
            }

            setTimeout(() => setFlashType('idle'), 600);
        } else {
            setStatusText('Тест начат — продолжайте кликать...');
            setStatusType('idle');
        }

        lastClickTimeRef.current = now;
        setLastClickTime(now);
    }, [selectedButton, threshold]);

    // === Reset ===
    const resetTest = () => {
        lastClickTimeRef.current = 0;
        clickCountRef.current = 0;
        errorCountRef.current = 0;
        intervalsRef.current = [];
        setLastClickTime(0);
        setClickCount(0);
        setErrorCount(0);
        setIntervals([]);
        setStatusText('Ожидание первого клика...');
        setStatusType('idle');
        setFlashType('idle');
    };

    // === Select button ===
    const handleSelectButton = (btn: ButtonType) => {
        setSelectedButton(btn);
        resetTest();
    };

    // === Computed stats ===
    const validIntervals = intervals.filter(i => !i.isError).map(i => i.ms);
    const allMs = intervals.map(i => i.ms);
    const avgMs = validIntervals.length > 0
        ? Math.round(validIntervals.reduce((a, b) => a + b, 0) / validIntervals.length)
        : null;
    const minMs = allMs.length > 0 ? Math.min(...allMs) : null;
    const totalForVerdict = clickCount > 0 ? clickCount - 1 : 0;
    const errorPercent = totalForVerdict > 0 ? (errorCount / totalForVerdict * 100).toFixed(1) : '0';

    // === Verdict ===
    let verdict: VerdictType = 'waiting';
    if (totalForVerdict >= 20) {
        if (errorCount === 0) verdict = 'ok';
        else if (errorCount <= 2 && parseFloat(errorPercent) < 5) verdict = 'warning';
        else verdict = 'danger';
    }

    // === Draw graph on data change ===
    useEffect(() => {
        drawGraph();
    }, [intervals, drawGraph]);

    useEffect(() => {
        const handleResize = () => drawGraph();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [drawGraph]);

    // === Prevent context menu ===
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    // === Log entries (derived) ===
    const logEntries = intervals.map((item, idx) => ({
        num: idx + 2,
        ms: item.ms,
        isError: item.isError,
    })).reverse();

    // === FAQ data ===
    const faqItems = [
        {
            q: 'Что такое даблклик-брак?',
            a: 'Даблклик-брак — это аппаратная проблема мыши, при которой один физический клик регистрируется как два нажатия. Это происходит из-за износа микропереключателя (свитча). Контакт «отскакивает» и создаёт ложное нажатие менее чем за 50–80 мс после первого — это невозможно сделать вручную.',
        },
        {
            q: 'Почему порог именно 60 мс?',
            a: 'Человеческие мышцы не способны выполнить два отдельных осознанных клика быстрее, чем за 100–120 мс. Профессиональные геймеры при фастклике достигают 80–90 мс. Если интервал менее 60 мс — это с очень высокой вероятностью аппаратный даблклик.',
        },
        {
            q: 'Можно ли починить мышь с даблкликом?',
            a: 'Есть несколько вариантов: 1) Программное решение — DebounceFilter или DoubleClickFix (временная мера). 2) Замена микропереключателя — перепайка свича (Omron, Kailh, Huano). 3) Продувка сжатым воздухом. 4) Замена мыши — если бюджетная, проще купить новую.',
        },
        {
            q: 'Как отличить намеренный даблклик от бракованного?',
            a: 'Намеренный двойной клик обычно имеет интервал 100–500 мс между нажатиями. Бракованный даблклик происходит менее чем за 60 мс — физически невозможно так нажать осознанно. Также бракованный даблклик возникает непредсказуемо, не при каждом нажатии.',
        },
        {
            q: 'Стоит ли тестировать ПКМ и СКМ?',
            a: 'Да! Проблема может затронуть любую кнопку, хотя чаще всего страдает ЛКМ из-за интенсивного использования. В нашем тестере можно переключиться на проверку любой кнопки.',
        },
        {
            q: 'Какие мыши чаще всего подвержены даблклику?',
            a: 'Проблема наиболее распространена в мышах с переключателями Omron D2FC (Logitech, Razer и другие). Мыши с оптическими переключателями (Razer Optical, SteelSeries) практически не подвержены этой проблеме, так как используют ИК-луч вместо механического контакта.',
        },
    ];

    return (
        <div className="pt-24 pb-12">
            {/* ===== HERO SECTION ===== */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF2E63]/5 rounded-full blur-[120px]" />
                    <div className="absolute top-32 right-0 w-[400px] h-[300px] bg-[#B900FF]/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                        <Link href="/" className="text-white/30 text-xs font-chakra font-bold uppercase tracking-widest hover:text-white transition-colors">
                            Главная
                        </Link>
                        <span className="text-white/20">/</span>
                        <span className="text-[#FF2E63] text-xs font-chakra font-bold uppercase tracking-widest">
                            Тест мыши
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
                        <div className="relative">
                            <Image
                                src="/logo new.png"
                                alt="CyberX Novokosino"
                                width={200}
                                height={50}
                                className="h-10 md:h-12 w-auto object-contain"
                                priority
                            />
                            <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-transparent" />
                        </div>
                        <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF2E63]/10 border border-[#FF2E63]/20 rounded-full text-[10px] font-chakra font-black uppercase tracking-widest text-[#FF2E63]">
                                    <Shield size={12} />
                                    Диагностика оборудования
                                </span>
                            </div>
                            <h1 className="font-tactic font-black text-3xl md:text-5xl uppercase italic tracking-tighter text-white leading-none">
                                Тест мыши на <span className="text-[#FF2E63]">даблклик</span>
                            </h1>
                        </div>
                    </div>

                    <p className="text-white/40 font-chakra text-sm md:text-base max-w-2xl leading-relaxed mb-2 font-bold">
                        Делайте <span className="text-white/70">одиночные</span> клики в обычном темпе. Не нужно кликать быстро — бракованный свитч создаёт ложный повторный клик за 10–50 мс, что невозможно сделать вручную.
                    </p>
                </div>
            </section>

            {/* ===== MAIN TEST AREA ===== */}
            <section className="container mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 md:gap-5">

                    {/* LEFT: Click Zone */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`
                            relative border-2 rounded-3xl p-6 md:p-8
                            flex flex-col items-center justify-center min-h-[420px] md:min-h-[520px]
                            cursor-crosshair select-none overflow-hidden transition-all duration-300
                            ${flashType === 'error'
                                ? 'border-[#FF2E63]/50 bg-[#FF2E63]/[0.04] shadow-[0_0_80px_rgba(255,46,99,0.12)]'
                                : flashType === 'ok'
                                    ? 'border-[#00F0FF]/40 bg-[#00F0FF]/[0.02] shadow-[0_0_60px_rgba(0,240,255,0.08)]'
                                    : 'border-[#FF2E63]/20 bg-gradient-to-b from-[#FF2E63]/[0.03] via-transparent to-[#B900FF]/[0.02] shadow-[0_0_50px_rgba(255,46,99,0.06)]'}
                        `}
                        onMouseDown={handleClick}
                        onContextMenu={handleContextMenu}
                    >
                        {/* Pulsing corner accents for idle state */}
                        {flashType === 'idle' && (
                            <>
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FF2E63]/30 rounded-tl-3xl animate-pulse" />
                                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#FF2E63]/30 rounded-tr-3xl animate-pulse" />
                                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#FF2E63]/30 rounded-bl-3xl animate-pulse" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FF2E63]/30 rounded-br-3xl animate-pulse" />
                            </>
                        )}

                        {/* Top label — bright */}
                        <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#FF2E63]/20 border border-[#FF2E63]/30 flex items-center justify-center animate-pulse">
                                    <Mouse size={16} className="text-[#FF2E63]" />
                                </div>
                                <span className="font-chakra font-black text-xs uppercase tracking-widest text-[#FF2E63]/80">
                                    👆 Кликайте здесь
                                </span>
                            </div>
                            <span className="text-white/20 text-[10px] font-chakra font-bold uppercase tracking-widest hidden md:block">
                                Зона тестирования
                            </span>
                        </div>

                        {/* Button selector */}
                        <div className="flex gap-2 mb-6 mt-10">
                            {([0, 2, 1] as ButtonType[]).map((btn) => (
                                <button
                                    key={btn}
                                    data-button={btn}
                                    onClick={(e) => { e.stopPropagation(); handleSelectButton(btn); }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    className={`
                                        px-5 py-1.5 rounded-full text-[11px] font-chakra font-black uppercase tracking-widest
                                        border transition-all duration-200
                                        ${selectedButton === btn
                                            ? 'bg-[#FF2E63]/15 border-[#FF2E63]/30 text-[#FF2E63]'
                                            : 'bg-transparent border-white/10 text-white/30 hover:text-white/50 hover:border-white/20'
                                        }
                                    `}
                                >
                                    {buttonNames[btn]}
                                </button>
                            ))}
                        </div>

                        {/* Target circle — bigger and brighter */}
                        <div className={`
                            relative w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center
                            transition-all duration-200
                            ${flashType === 'error'
                                ? 'bg-[#FF2E63]/15 border-2 border-[#FF2E63]/50 shadow-[0_0_60px_rgba(255,46,99,0.25)]'
                                : flashType === 'ok'
                                    ? 'bg-[#00F0FF]/10 border-2 border-[#00F0FF]/40 shadow-[0_0_40px_rgba(0,240,255,0.15)]'
                                    : 'bg-[#FF2E63]/[0.04] border-2 border-[#FF2E63]/20 shadow-[0_0_30px_rgba(255,46,99,0.08)]'
                            }
                        `}>
                            {/* Spinning orbit */}
                            <div className="absolute inset-[-14px] rounded-full border border-dashed border-[#FF2E63]/10 animate-[spin_25s_linear_infinite]" />
                            <div className="absolute inset-[-30px] rounded-full border border-dashed border-[#B900FF]/5 animate-[spin_40s_linear_infinite_reverse]" />

                            <div className="text-4xl mb-1">
                                {flashType === 'error' ? '⚠️' : flashType === 'ok' ? '✅' : '🖱️'}
                            </div>
                            <div className="text-center text-xs text-white/50 font-chakra font-bold uppercase tracking-wider leading-relaxed">
                                {flashType === 'error'
                                    ? <>Даблклик!<br /><span className="text-[#FF2E63] text-sm font-black">{intervals.length > 0 ? `${intervals[intervals.length - 1].ms} мс` : ''}</span></>
                                    : flashType === 'ok'
                                        ? <>Норма<br /><span className="text-[#00F0FF] text-sm font-black">{intervals.length > 0 ? `${intervals[intervals.length - 1].ms} мс` : ''}</span></>
                                        : <><span className="text-white/70">Одиночные клики</span><br />{buttonNames[selectedButton]} — не спешите</>
                                }
                            </div>
                        </div>

                        {/* Bottom CTA hint for idle */}
                        <div className={`
                            mt-6 transition-colors
                            ${statusType === 'error' ? 'text-[#FF2E63]' :
                                statusType === 'ok' ? 'text-[#00F0FF]' :
                                    'text-[#FF2E63]/50'}
                        `}>
                            <div className="text-xs font-chakra font-bold uppercase tracking-wider text-center">
                                {statusText}
                            </div>
                            {statusType === 'idle' && (
                                <div className="text-[10px] font-chakra font-bold uppercase tracking-widest text-white/20 mt-2 text-center animate-pulse">
                                    ↓ Нажимайте в любом месте этого блока ↓
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* RIGHT: Results & Verdict Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Verdict Card — always visible */}
                        <div className={`
                            rounded-3xl p-6 md:p-8 border transition-all duration-500
                            ${verdict === 'ok' ? 'bg-emerald-500/[0.05] border-emerald-500/20' :
                                verdict === 'warning' ? 'bg-amber-500/[0.05] border-amber-500/20' :
                                    verdict === 'danger' ? 'bg-[#FF2E63]/[0.05] border-[#FF2E63]/20' :
                                        'bg-white/[0.02] border-white/[0.06]'}
                        `}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={verdict}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {/* Verdict header */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-4xl">
                                            {verdict === 'ok' ? '✅' : verdict === 'warning' ? '⚠️' : verdict === 'danger' ? '🚫' : '🔍'}
                                        </div>
                                        <div>
                                            <h3 className={`font-tactic font-black text-xl md:text-2xl uppercase italic tracking-tighter leading-none ${
                                                verdict === 'ok' ? 'text-emerald-400' :
                                                    verdict === 'warning' ? 'text-amber-400' :
                                                        verdict === 'danger' ? 'text-[#FF2E63]' :
                                                            'text-white/40'
                                            }`}>
                                                {verdict === 'ok' ? 'Мышь в порядке' :
                                                    verdict === 'warning' ? 'Есть подозрения' :
                                                        verdict === 'danger' ? 'Даблклик-брак' :
                                                            'Результат теста'}
                                            </h3>
                                            <p className="text-white/30 text-xs font-chakra font-bold uppercase tracking-widest mt-1">
                                                {verdict !== 'waiting' ? 'Диагноз установлен' : 'Нужно больше данных'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress bar for waiting state */}
                                    {verdict === 'waiting' && (
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white/30 text-[10px] font-chakra font-black uppercase tracking-widest">
                                                    Прогресс тестирования
                                                </span>
                                                <span className="text-white/50 text-xs font-chakra font-bold">
                                                    {Math.min(totalForVerdict, 20)} / 20 кликов
                                                </span>
                                            </div>
                                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-[#FF2E63] to-[#B900FF] rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(100, (totalForVerdict / 20) * 100)}%` }}
                                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                                />
                                            </div>
                                            <p className="text-white/20 text-[10px] font-chakra font-bold mt-2">
                                                {totalForVerdict === 0
                                                    ? 'Начните кликать в зоне тестирования слева'
                                                    : totalForVerdict < 20
                                                        ? `Осталось ещё ${20 - totalForVerdict} кликов для получения результата`
                                                        : 'Анализ завершён!'}
                                            </p>
                                        </div>
                                    )}

                                    {/* Verdict description */}
                                    {verdict !== 'waiting' && (
                                        <p className="text-white/40 text-sm font-chakra leading-relaxed mb-4">
                                            {verdict === 'ok'
                                                ? `За ${totalForVerdict} кликов не обнаружено ни одного ложного даблклика. Микропереключатель работает корректно.`
                                                : verdict === 'warning'
                                                    ? `Обнаружено ${errorCount} подозрительных кликов (${errorPercent}%). Мышь может изнашиваться. Повторите тест.`
                                                    : `Ошибок: ${errorCount} (${errorPercent}%). Мышь регулярно даблкликает. Рекомендуется замена свича или мыши.`
                                            }
                                        </p>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Всего кликов', value: clickCount, color: 'text-white' },
                                { label: 'Даблклики', value: errorCount, color: errorCount > 0 ? 'text-[#FF2E63]' : 'text-white/30' },
                                { label: 'Средний мс', value: avgMs !== null ? avgMs : '—', color: 'text-[#00F0FF]' },
                                { label: 'Минимум мс', value: minMs !== null ? minMs : '—', color: minMs !== null && minMs <= threshold ? 'text-[#FF2E63]' : 'text-[#B900FF]' },
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 md:p-4 text-center hover:border-white/10 transition-all"
                                >
                                    <div className={`font-tactic font-black text-xl md:text-3xl italic tracking-tighter ${stat.color}`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-white/30 text-[9px] font-chakra font-black uppercase tracking-widest mt-0.5">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Compact Log */}
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex-1 min-h-0">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 rounded bg-[#00F0FF]/10 flex items-center justify-center">
                                    <BarChart3 size={11} className="text-[#00F0FF]" />
                                </div>
                                <span className="font-chakra font-black text-[10px] uppercase tracking-widest text-white/40">
                                    Журнал событий
                                </span>
                            </div>
                            <div
                                ref={logRef}
                                className="max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/5 space-y-0.5"
                            >
                                {logEntries.length === 0 ? (
                                    <div className="flex items-center justify-center h-16 text-white/15 text-[10px] font-chakra font-bold uppercase tracking-wider">
                                        Кликните слева для начала теста
                                    </div>
                                ) : (
                                    logEntries.slice(0, 20).map((entry, idx) => (
                                        <div
                                            key={idx}
                                            className={`
                                                flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-mono
                                                ${entry.isError
                                                    ? 'text-[#FF2E63] bg-[#FF2E63]/[0.04]'
                                                    : 'text-white/30'
                                                }
                                            `}
                                        >
                                            <span className={`w-1 h-1 rounded-full shrink-0 ${entry.isError ? 'bg-[#FF2E63]' : 'bg-white/15'}`} />
                                            <span className="text-white/15 w-5 text-right">#{entry.num}</span>
                                            {entry.isError
                                                ? <span><strong>⚠️ {entry.ms} мс</strong></span>
                                                : <span>{entry.ms} мс</span>
                                            }
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== GRAPH (full width below) ===== */}
            <section className="container mx-auto px-4 mt-4">
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded bg-[#B900FF]/10 flex items-center justify-center">
                                <BarChart3 size={13} className="text-[#B900FF]" />
                            </div>
                            <span className="font-chakra font-black text-[10px] uppercase tracking-widest text-white/40">
                                График интервалов между кликами
                            </span>
                        </div>
                        <button
                            onClick={resetTest}
                            className="group flex items-center gap-2 px-5 py-2 bg-[#FF2E63] hover:bg-[#FF2E63]/80 rounded-xl font-chakra font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
                        >
                            <RotateCcw size={12} className="group-hover:-rotate-180 transition-transform duration-500" />
                            Сбросить
                        </button>
                    </div>
                    <div className="w-full h-[100px] md:h-[130px]">
                        <canvas ref={canvasRef} className="w-full h-full rounded-xl" />
                    </div>
                </div>
            </section>

            {/* ===== SEPARATOR ===== */}
            <div className="container mx-auto px-4 my-16">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* ===== HOW TO USE ===== */}
            <section className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#B900FF]/10 flex items-center justify-center">
                        <Info size={16} className="text-[#B900FF]" />
                    </div>
                    <h2 className="font-tactic font-black text-2xl md:text-3xl uppercase italic tracking-tighter">
                        Как пользоваться
                    </h2>
                </div>
                <p className="text-white/30 text-sm font-chakra font-bold uppercase tracking-wider mb-8">
                    Пошаговая инструкция для аккуратной проверки
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            step: 1,
                            icon: <Mouse size={20} />,
                            title: 'Подготовка',
                            text: 'Подключите мышь и положите руку в удобное положение. Убедитесь, что будете делать одиночные клики, не двойные.',
                        },
                        {
                            step: 2,
                            icon: <Target size={20} />,
                            title: 'Кликайте в обычном темпе',
                            text: 'Нажимайте кнопку мыши одиночными кликами в обычном рабочем темпе. Не торопитесь.',
                        },
                        {
                            step: 3,
                            icon: <Zap size={20} />,
                            title: 'Минимум 30 кликов',
                            text: 'Чем больше кликов — тем точнее результат. 30–50 кликов дадут достаточно данных для диагностики.',
                        },
                        {
                            step: 4,
                            icon: <CheckCircle2 size={20} />,
                            title: 'Оцените результат',
                            text: 'Система покажет вердикт. Красные записи — подозрительные даблклики от микропереключателя.',
                        },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#FF2E63]/10 border border-[#FF2E63]/20 flex items-center justify-center text-[#FF2E63] mb-4 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <div className="text-white/20 text-[10px] font-chakra font-black uppercase tracking-widest mb-1">
                                Шаг {item.step}
                            </div>
                            <h3 className="font-tactic font-black text-base uppercase italic tracking-tight text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-white/40 text-xs font-chakra leading-relaxed">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== SEPARATOR ===== */}
            <div className="container mx-auto px-4 my-16">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* ===== REFERENCE TABLE ===== */}
            <section className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center">
                        <BarChart3 size={16} className="text-[#00F0FF]" />
                    </div>
                    <h2 className="font-tactic font-black text-2xl md:text-3xl uppercase italic tracking-tighter">
                        Критерии диагностики
                    </h2>
                </div>
                <p className="text-white/30 text-sm font-chakra font-bold uppercase tracking-wider mb-8">
                    Как интерпретировать результаты тестирования
                </p>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/[0.06]">
                                    <th className="px-6 py-4 text-left text-[10px] font-chakra font-black uppercase tracking-widest text-white/30">Показатель</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-chakra font-black uppercase tracking-widest text-emerald-500/60">Норма</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-chakra font-black uppercase tracking-widest text-amber-500/60">Внимание</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-chakra font-black uppercase tracking-widest text-[#FF2E63]/60">Проблема</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/50 font-chakra text-xs">
                                {[
                                    {
                                        label: 'Даблклики / 50 кликов',
                                        ok: '0', okC: 'bg-emerald-500/10 text-emerald-400',
                                        warn: '1–2', warnC: 'bg-amber-500/10 text-amber-400',
                                        bad: '3+', badC: 'bg-[#FF2E63]/10 text-[#FF2E63]',
                                    },
                                    {
                                        label: 'Процент ошибок',
                                        ok: '0%', okC: 'bg-emerald-500/10 text-emerald-400',
                                        warn: '1–4%', warnC: 'bg-amber-500/10 text-amber-400',
                                        bad: '5%+', badC: 'bg-[#FF2E63]/10 text-[#FF2E63]',
                                    },
                                    {
                                        label: 'Минимальный интервал',
                                        ok: '> 60 мс', okC: 'bg-emerald-500/10 text-emerald-400',
                                        warn: '40–60 мс', warnC: 'bg-amber-500/10 text-amber-400',
                                        bad: '< 40 мс', badC: 'bg-[#FF2E63]/10 text-[#FF2E63]',
                                    },
                                    {
                                        label: 'Характер ошибок',
                                        ok: 'Нет', okC: 'bg-emerald-500/10 text-emerald-400',
                                        warn: 'Редко', warnC: 'bg-amber-500/10 text-amber-400',
                                        bad: 'Регулярно', badC: 'bg-[#FF2E63]/10 text-[#FF2E63]',
                                    },
                                ].map((row, idx) => (
                                    <tr key={idx} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.01] transition-colors">
                                        <td className="px-6 py-4 font-bold text-white/60">{row.label}</td>
                                        <td className="px-6 py-4"><span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-black ${row.okC}`}>{row.ok}</span></td>
                                        <td className="px-6 py-4"><span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-black ${row.warnC}`}>{row.warn}</span></td>
                                        <td className="px-6 py-4"><span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-black ${row.badC}`}>{row.bad}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ===== SEPARATOR ===== */}
            <div className="container mx-auto px-4 my-16">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* ===== FAQ ===== */}
            <section className="container mx-auto px-4 mb-16">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <HelpCircle size={16} className="text-amber-400" />
                    </div>
                    <h2 className="font-tactic font-black text-2xl md:text-3xl uppercase italic tracking-tighter">
                        Вопросы и ответы
                    </h2>
                </div>
                <p className="text-white/30 text-sm font-chakra font-bold uppercase tracking-wider mb-8">
                    Всё о проблеме даблклика
                </p>

                <div className="space-y-2">
                    {faqItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/10 transition-all"
                        >
                            <button
                                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="font-chakra font-black text-xs md:text-sm uppercase tracking-wider text-white/80 pr-4">
                                    {item.q}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`shrink-0 text-white/20 transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {expandedFaq === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-5 text-white/40 text-xs md:text-sm font-chakra leading-relaxed">
                                            {item.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
