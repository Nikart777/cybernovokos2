"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { STEAM_COCKTAILS, ORDER_HOURS, PENALTIES, type MenuTheme } from "@/data/hookah-menu";

/**
 * Цвет позиции: classic — холодная сталь, premium — золото,
 * остальные — цвет своего фрукта. В покое цвет держит цена,
 * при наведении (или когда на позиции остановился круг) он
 * забирает название, линию и заливку экрана.
 * `ring` — кольцо плашки, живёт только в мобильной вёрстке.
 */
const THEMES: Record<MenuTheme, { accent: string; ring: string; wash: string }> = {
    classic: {
        accent: "#C7CEDB",
        ring: "0 0 0 1px rgba(255,255,255,0.08)",
        wash: "none",
    },
    premium: {
        accent: "#FFD700",
        ring: "0 0 0 1px rgba(255,215,0,0.35), 0 14px 50px rgba(255,215,0,0.10)",
        wash: "linear-gradient(115deg, rgba(255,215,0,0.12) 0%, rgba(255,215,0,0.02) 42%, transparent 70%)",
    },
    grapefruit: {
        accent: "#FF9166",
        ring: "0 0 0 1px rgba(255,112,67,0.32), 0 14px 50px rgba(255,112,67,0.10)",
        wash: "linear-gradient(115deg, rgba(255,112,67,0.14) 0%, rgba(255,112,67,0.02) 42%, transparent 70%)",
    },
    pomegranate: {
        accent: "#EC3B6B",
        ring: "0 0 0 1px rgba(168,23,66,0.55), 0 14px 50px rgba(168,23,66,0.14)",
        wash: "linear-gradient(115deg, rgba(168,23,66,0.20) 0%, rgba(168,23,66,0.03) 42%, transparent 70%)",
    },
};

/** Индексы позиций, участвующих в круге — перезабивки исключены. */
const DRAW_POOL = STEAM_COCKTAILS.reduce<number[]>((acc, item, i) => {
    if (!item.refill) acc.push(i);
    return acc;
}, []);

/** Пауза перед стартом, чтобы страница успела проявиться. */
const START_DELAY = 320;

/** Сколько держим подсветку на выпавшей позиции, прежде чем вернуть остальные. */
const HOLD_DELAY = 700;

/** Ровно один круг по вариантам, каждый шаг длиннее предыдущего — круг затухает. */
function buildSchedule() {
    const delays: number[] = [];
    let d = 200;
    for (let i = 0; i < DRAW_POOL.length; i += 1) {
        delays.push(Math.round(d));
        d *= 1.45;
    }
    return delays;
}

export default function MenuStage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    // Круг проходит один раз при загрузке. Подсветка ничего не скрывает:
    // если скрипт не отработает, все позиции просто остаются видимыми.
    // Гарда по ref здесь быть не должно: под StrictMode эффект монтируется
    // дважды, и гард пережил бы очистку таймеров — круг не запустился бы вовсе.
    // Очистка сама делает повторный прогон безопасным.
    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        const offset = Math.floor(Math.random() * DRAW_POOL.length);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setActiveIndex(DRAW_POOL[offset]);
            return;
        }

        const delays = buildSchedule();
        let elapsed = START_DELAY;

        timers.push(setTimeout(() => setIsDrawing(true), START_DELAY));

        delays.forEach((delay, step) => {
            elapsed += delay;
            const idx = DRAW_POOL[(offset + step) % DRAW_POOL.length];
            timers.push(setTimeout(() => setActiveIndex(idx), elapsed));
        });

        // Держим выпавшую позицию подсвеченной, потом возвращаем остальным яркость.
        timers.push(setTimeout(() => setIsDrawing(false), elapsed + HOLD_DELAY));

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <>
            {/* ── Шапка: название слева, часы справа ── */}
            <header className="order-1 lg:flex lg:items-start lg:justify-between lg:gap-10 lg:border-b lg:border-white/[0.07] lg:pb-[clamp(0.75rem,2.4vh,1.75rem)]">
                <h1
                    className={`font-tactic text-[2.4rem] font-black uppercase italic leading-[0.88] text-white min-[380px]:text-[2.9rem] md:text-[4.5rem] lg:text-[clamp(1.4rem,3.6vh,2.4rem)]${
                        isDrawing ? " menu-title-glitch" : ""
                    }`}
                >
                    Паровые
                    <br className="lg:hidden" /> <span className="menu-title-outline">коктейли</span>
                </h1>

                <div className="mt-12 flex flex-col gap-5 md:mt-16 lg:mt-0 lg:shrink-0 lg:flex-row lg:items-start lg:gap-[clamp(1.25rem,2.5vw,2.5rem)]">
                    {/* Возрастное ограничение — обязательная маркировка */}
                    <span
                        aria-label="Строго 18 плюс"
                        className="inline-flex shrink-0 skew-x-[-12deg] items-center self-start border border-[#FF2E63]/60 bg-[#FF2E63]/10 px-3 py-1.5 lg:px-[clamp(0.6rem,1.4vh,0.9rem)] lg:py-[clamp(0.3rem,0.9vh,0.55rem)]"
                    >
                        <span className="block skew-x-[12deg] font-tactic text-base font-black italic leading-none text-[#FF2E63] lg:text-[clamp(0.8rem,2vh,1.25rem)]">
                            18+
                        </span>
                    </span>

                    <section className="lg:shrink-0">
                        <span className="inline-block skew-x-[-12deg] bg-[#111] px-3 py-1.5 shadow-border lg:hidden">
                            <span className="block skew-x-[12deg] font-chakra text-[9px] font-black uppercase tracking-[0.3em] text-[#FF2E63] md:text-[10px]">
                                Заказы принимаются
                            </span>
                        </span>

                        <div className="mt-4 inline-block w-full max-w-[22rem] skew-x-[-12deg] bg-[#111]/90 px-5 py-4 shadow-border lg:mt-0 lg:w-auto lg:max-w-none lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none">
                            <div className="flex skew-x-[12deg] flex-col gap-2 lg:flex-row lg:gap-[clamp(1rem,2vw,2rem)]">
                                {ORDER_HOURS.map((row) => (
                                    <div
                                        key={row.days}
                                        className="flex items-baseline justify-between gap-4 lg:flex-col lg:items-end lg:justify-start lg:gap-1"
                                    >
                                        <span className="font-chakra text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 md:text-xs lg:text-[clamp(8px,1.15vh,10px)]">
                                            {row.days}
                                        </span>
                                        <span className="font-tactic text-sm font-black uppercase italic tabular-nums text-white md:text-lg lg:text-[clamp(0.75rem,1.7vh,1rem)]">
                                            {row.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </header>

            {/* ── Позиции ── */}
            <ul
                className={`menu-list order-3 mt-14 flex list-none flex-col gap-4 md:mt-20 md:gap-5 lg:order-2 lg:mt-0 lg:min-h-0 lg:flex-1 lg:justify-between lg:gap-0${
                    isDrawing ? " is-drawing" : ""
                }`}
            >
                {STEAM_COCKTAILS.map((item, i) => {
                    const theme = THEMES[item.theme];
                    // Перезабивка — не самостоятельный выбор, поэтому строкой мельче.
                    const scale = item.refill
                        ? "text-sm min-[380px]:text-base md:text-lg lg:text-[clamp(1rem,2.9vh,1.9rem)]"
                        : "text-base min-[380px]:text-lg md:text-2xl lg:text-[clamp(1.5rem,5.2vh,3.5rem)]";

                    return (
                        <li
                            key={item.name}
                            className={`menu-row relative overflow-hidden bg-[#0B0B0D] p-4 md:p-5 lg:overflow-visible lg:bg-transparent lg:px-0 lg:pb-[clamp(0.5rem,1.6vh,1.25rem)] lg:pt-0${
                                activeIndex === i ? " is-active" : ""
                            }`}
                            style={
                                {
                                    "--accent": theme.accent,
                                    "--ring": theme.ring,
                                } as CSSProperties
                            }
                        >
                            {/* Цветовая заливка плашки — только в мобильной вёрстке */}
                            {theme.wash !== "none" && (
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 lg:hidden"
                                    style={{ backgroundImage: theme.wash }}
                                />
                            )}

                            <div className="relative flex items-baseline gap-4 lg:gap-10">
                                <h2
                                    className={`menu-row__name font-tactic font-black uppercase italic leading-[0.95] ${scale} ${
                                        item.refill ? "text-white/60" : "text-white"
                                    }`}
                                >
                                    {item.name}
                                </h2>

                                <span
                                    aria-hidden="true"
                                    className="mx-2 mb-[0.3em] flex-1 self-end border-b border-dotted border-white/20 lg:hidden"
                                />

                                <span
                                    className={`menu-row__price ml-auto whitespace-nowrap font-tactic font-black uppercase italic tabular-nums ${scale}`}
                                    style={{ color: theme.accent, opacity: item.refill ? 0.6 : 1 }}
                                >
                                    {item.price.toLocaleString("ru-RU")} ₽
                                </span>
                            </div>

                            {item.description && (
                                <p className="menu-row__desc relative mt-2 max-w-[70ch] break-words font-inter text-[11px] leading-relaxed text-white/55 md:text-[13px] lg:mt-[clamp(0.25rem,0.9vh,0.6rem)] lg:text-[clamp(11px,1.45vh,14px)]">
                                    {item.description}
                                </p>
                            )}
                        </li>
                    );
                })}
            </ul>

            {/* Подвал: как заказать + штрафы за инвентарь */}
            <div className="order-2 mt-6 flex flex-col gap-3 lg:order-3 lg:mt-[clamp(0.75rem,2.4vh,1.75rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <p className="flex items-center gap-3 font-chakra text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 md:text-xs lg:text-[clamp(9px,1.3vh,11px)]">
                    <span aria-hidden="true" className="h-[1px] w-6 shrink-0 bg-[#FF2E63]" />
                    Для заказа обратитесь к администратору
                </p>

                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-chakra text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 md:text-[11px] lg:text-[clamp(8px,1.2vh,10px)]">
                    <span className="text-[#FF2E63]">Штраф</span>
                    {PENALTIES.map((row) => (
                        <span key={row.label}>
                            {row.label} —{" "}
                            <span className="text-white/70">{row.price.toLocaleString("ru-RU")} ₽</span>
                        </span>
                    ))}
                </p>
            </div>
        </>
    );
}
