"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Dices } from "lucide-react";
import { DROPX_PRIZES, ONLINE_BOOKING_URL, type DropXPrize } from "./promoData";
import { StoryReveal } from "./MotionPrimitives";

const FILTER_TABS: Array<{ id: "all" | DropXPrize["category"]; label: string }> = [
  { id: "all", label: "Все 15" },
  { id: "top", label: "Топ и статусы" },
  { id: "bonus", label: "Бонусы 50–500" },
  { id: "bar_time", label: "Бар и время" },
];

const REEL_SLOTS = 28;
const WINNER_INDEX = 22;

export default function DropXRouletteSection() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<"all" | DropXPrize["category"]>("all");
  const [spinning, setSpinning] = useState(false);
  const [spinSeed, setSpinSeed] = useState(0);
  const [wonPrize, setWonPrize] = useState<DropXPrize>(DROPX_PRIZES[0]);
  const [cassetteWidth, setCassetteWidth] = useState(320);

  const cassetteViewportRef = useRef<HTMLDivElement>(null);
  const crateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (cassetteViewportRef.current) {
        setCassetteWidth(cassetteViewportRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { scrollYProgress: crateScroll } = useScroll({
    target: crateRef,
    offset: ["start end", "end start"],
  });
  const crateScale = useTransform(crateScroll, [0, 0.5, 1], [0.97, 1.02, 0.99]);

  const reelItems = useMemo(() => {
    const featuredIds = [
      "bonus-200",
      "energy",
      "status-gold",
      "bonus-100",
      "time-60",
      "double-catch",
      "sandwich",
      "bonus-500",
      "status-platinum",
      "balance-x2",
      "chocolate",
      "time-30",
    ];
    const items: DropXPrize[] = [];
    for (let i = 0; i < REEL_SLOTS; i++) {
      if (i === WINNER_INDEX) {
        items.push(wonPrize);
      } else {
        const pickId = featuredIds[(i + spinSeed) % featuredIds.length];
        items.push(DROPX_PRIZES.find((p) => p.id === pickId) ?? DROPX_PRIZES[0]);
      }
    }
    return items;
  }, [spinSeed, wonPrize]);

  const handlePreviewSpin = () => {
    if (spinning) return;
    const spotlightPool = [
      DROPX_PRIZES[0], // X2 баланса
      DROPX_PRIZES[1], // Платина
      DROPX_PRIZES[3], // Двойной улов
      DROPX_PRIZES[4], // 500 бонусов
      DROPX_PRIZES[10], // +1 час
      DROPX_PRIZES[12], // Энергетик
      DROPX_PRIZES[2], // Золото
    ];
    const nextWinner = spotlightPool[(spinSeed + 1) % spotlightPool.length];
    setWonPrize(nextWinner);
    setSpinSeed((n) => n + 1);
    setSpinning(true);
    window.setTimeout(() => setSpinning(false), reduceMotion ? 200 : 2400);
  };

  const visiblePrizes =
    filter === "all" ? DROPX_PRIZES : DROPX_PRIZES.filter((prize) => prize.category === filter);

  // Center the winning slot (pl-2 = 8px, item = 128px + 8px gap = 136px, half = 64px) under left-1/2
  const targetOffsetPx = -(WINNER_INDEX * 136 + 8 + 64 - cassetteWidth / 2);

  return (
    <section
      id="dropx"
      ref={crateRef}
      className="scroll-mt-32 border-t border-white/10 bg-[#050608] px-4 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <StoryReveal>
          <h2 className="max-w-4xl text-balance font-tactic text-3xl font-black uppercase italic leading-[0.96] text-white sm:text-5xl md:text-6xl">
            Рулетка DropX от <span className="text-[#D5FF39]">700 ₽</span>.{" "}
            <span className="text-white/45">Открой кейс в тот же день.</span>
          </h2>
        </StoryReveal>

        {/* Main Split: DropX Crate Render + 3 clean rules + action */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
          <motion.div
            style={reduceMotion ? undefined : { scale: crateScale }}
            className="min-w-0 overflow-hidden rounded-[4px] bg-[#0B0C10]"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/promo/dropx/hero.webp"
                alt="Кейс рулетки DropX CyberX Новокосино"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="min-w-0">
            <p className="max-w-xl font-chakra text-sm leading-relaxed text-white/75 sm:text-base">
              Один платёж на основной баланс от <strong className="text-white">700 ₽</strong>{" "}
              <span className="text-white/45">(в системе срабатывает от 699 ₽)</span> открывает один дроп на планшете DropX в клубе. Повторный — через 24 часа.
            </p>

            {/* Flat 3-column rules */}
            <div className="mt-8 grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-3">
              <div>
                <h3 className="font-tactic text-sm font-black uppercase italic text-[#D5FF39]">
                  От 700 ₽
                </h3>
                <p className="mt-2 font-chakra text-xs leading-relaxed text-white/65">
                  Одним чеком за сутки по МСК. Мелкие платежи не суммируются.
                </p>
              </div>
              <div>
                <h3 className="font-tactic text-sm font-black uppercase italic text-[#D5FF39]">
                  Планшет в клубе
                </h3>
                <p className="mt-2 font-chakra text-xs leading-relaxed text-white/65">
                  Введите номер аккаунта на стойке DropX и выберите кейс.
                </p>
              </div>
              <div>
                <h3 className="font-tactic text-sm font-black uppercase italic text-[#D5FF39]">
                  До 23:59 МСК
                </h3>
                <p className="mt-2 font-chakra text-xs leading-relaxed text-white/65">
                  Бонусы приходят сами. Бар, время, статус и X2 забирайте до полуночи.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handlePreviewSpin}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#D5FF39] px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:bg-[#e5ff78] active:scale-[0.98]"
              >
                <Dices size={15} />
                {spinning ? "Крутится лента..." : "Крутить превью ленты"}
              </button>
              <a
                href={ONLINE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-white/20 px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white transition hover:border-white/50"
              >
                Ночь 700 ₽ или бронь ПК
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Clean Unboxed Roulette Preview Strip */}
        <div className="mt-10 min-w-0 border-y border-white/10 py-5">
          <div className="mb-3 flex items-center justify-end">
            <span className="font-chakra text-xs font-bold text-[#D5FF39]">
              {spinning ? "Выбираем приз..." : `${wonPrize.title} — ${wonPrize.subtitle}`}
            </span>
          </div>

          <div
            ref={cassetteViewportRef}
            className="relative w-full max-w-full overflow-hidden bg-[#090B0E] py-3"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[2px] -translate-x-1/2 bg-[#D5FF39] shadow-[0_0_12px_#D5FF39]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#090B0E] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#090B0E] to-transparent"
            />

            <motion.div
              key={spinSeed}
              initial={reduceMotion ? { x: targetOffsetPx } : { x: 0 }}
              animate={{ x: targetOffsetPx }}
              transition={
                reduceMotion
                  ? { duration: 0.1 }
                  : { duration: 2.3, ease: [0.12, 0.9, 0.2, 1] }
              }
              className="flex w-max gap-2 pl-2"
            >
              {reelItems.map((item, idx) => {
                const isTarget = idx === WINNER_INDEX && !spinning;
                return (
                  <div
                    key={`${spinSeed}-${idx}-${item.id}`}
                    className={`flex w-[128px] shrink-0 flex-col border-b-2 bg-[#0E1015] p-2 ${
                      isTarget ? "border-[#D5FF39]" : "border-white/10"
                    }`}
                  >
                    <div className="relative h-16 w-full overflow-hidden bg-black/50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        loading="eager"
                        sizes="128px"
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="mt-2 block truncate font-tactic text-[11px] font-black uppercase italic text-white">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Minimal Underlined Tab Strip + Architectural 5-Col Prize Grid */}
        <div className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-tactic text-xl font-black uppercase italic text-white sm:text-2xl">
              Все 15 призов DropX
            </h3>

            <div className="flex flex-wrap gap-5 border-b border-white/10">
              {FILTER_TABS.map((tab) => {
                const activeTab = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilter(tab.id)}
                    className={`border-b-2 pb-2.5 font-chakra text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                      activeTab
                        ? "border-[#D5FF39] text-[#D5FF39]"
                        : "border-transparent text-white/45 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {visiblePrizes.map((prize) => (
              <article key={prize.id} className="group min-w-0">
                <div
                  className={`relative aspect-[1.2] w-full overflow-hidden rounded-[4px] border bg-[#0B0D12] ${
                    prize.highlight ? "border-[#D5FF39]/35" : "border-white/10"
                  }`}
                >
                  <Image
                    src={prize.image}
                    alt={prize.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 18vw"
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="mt-2.5 font-tactic text-sm font-black uppercase italic leading-tight text-white">
                  {prize.title}
                </h4>
                <p className="mt-0.5 font-chakra text-[11px] text-white/50">{prize.subtitle}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 border-t border-white/10 pt-4 font-chakra text-xs leading-relaxed text-white/45">
            Энергетик выдаётся только гостям 18+. Статусы «Золото» и «Платина» повышаются на 1 год (если ваш текущий статус ниже). Отменённые платежи не участвуют.
          </p>
        </div>
      </div>
    </section>
  );
}
