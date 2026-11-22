"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, Dices, ShieldAlert, Sparkles, Tablet } from "lucide-react";
import { DROPX_PRIZES, ONLINE_BOOKING_URL, type DropXPrize } from "./promoData";
import { StoryReveal } from "./MotionPrimitives";

const FILTER_TABS: Array<{ id: "all" | DropXPrize["category"]; label: string }> = [
  { id: "all", label: "Все 15 призов" },
  { id: "top", label: "Топ-дроп и статусы" },
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
  const crateScale = useTransform(crateScroll, [0, 0.5, 1], [0.95, 1.03, 0.98]);
  const crateY = useTransform(crateScroll, [0, 1], [14, -14]);

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
    window.setTimeout(() => setSpinning(false), reduceMotion ? 200 : 2500);
  };

  const visiblePrizes =
    filter === "all" ? DROPX_PRIZES : DROPX_PRIZES.filter((prize) => prize.category === filter);

  // Center the winning card (pl-2 = 8px, slot = 132px + 10px gap, half card = 66px) under left-1/2.
  const targetOffsetPx = -(WINNER_INDEX * 142 + 8 + 66 - cassetteWidth / 2);

  return (
    <section id="dropx" className="relative scroll-mt-32 px-4 py-14 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1760px]">
        <div
          ref={crateRef}
          className="relative overflow-hidden rounded-[22px] border border-[#D5FF39]/30 bg-[#08090C] p-5 sm:p-8 lg:p-12"
        >
          {/* Subtle obsidian/volt atmosphere strictly scoped to DropX */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(213,255,57,0.14),transparent_36%),radial-gradient(circle_at_12%_88%,rgba(255,46,99,0.1),transparent_32%)]"
          />

          {/* Top Split Stage: 700r Hook + Real DropX Crate Artwork */}
          <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
            <StoryReveal className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D5FF39] px-3 py-1 font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-[#090909]">
                  <Dices size={13} />
                  Фирменная рулетка DropX
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-chakra text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">
                  Только в CyberX Новокосино
                </span>
              </div>

              <h2 className="mt-5 text-balance font-tactic text-3xl font-black uppercase italic leading-[0.96] text-white sm:text-5xl xl:text-6xl">
                Пополни от <span className="text-[#D5FF39]">700 ₽</span> —
                <span className="block">забери дроп в клубе.</span>
              </h2>

              <p className="mt-4 max-w-2xl font-chakra text-sm leading-relaxed text-white/75 sm:text-base">
                Любой гость с разовым пополнением основного баланса от <strong className="text-white">700 ₽</strong>{" "}
                <span className="text-white/50">(технический порог в системе — от 699 ₽)</span> может подойти к планшету{" "}
                <strong className="text-[#D5FF39]">DropX</strong> в клубе и открыть кейс с гарантированным призом.
              </p>

              {/* Terminal 3-step condition strip */}
              <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                <div className="rounded-[14px] border border-white/15 bg-black/45 p-3.5">
                  <span className="font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-[#D5FF39]">
                    01 // От 700 ₽ сегодня
                  </span>
                  <p className="mt-1.5 font-chakra text-xs leading-relaxed text-white/75">
                    Одним платежом на основной баланс за сутки по МСК (чеки не складываются).
                  </p>
                </div>
                <div className="rounded-[14px] border border-white/15 bg-black/45 p-3.5">
                  <span className="font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-[#D5FF39]">
                    02 // На планшете DropX
                  </span>
                  <p className="mt-1.5 font-chakra text-xs leading-relaxed text-white/75">
                    Введи свой номер аккаунта у стойки. Следующий дроп — через 24 часа.
                  </p>
                </div>
                <div className="rounded-[14px] border border-white/15 bg-black/45 p-3.5">
                  <span className="font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-[#D5FF39]">
                    03 // Выдача сразу
                  </span>
                  <p className="mt-1.5 font-chakra text-xs leading-relaxed text-white/75">
                    Бонусы придут сами. Бар, время, статус или X2 активируются сегодня до 23:59 МСК.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={handlePreviewSpin}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D5FF39] px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#e4ff73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] motion-reduce:transform-none"
                >
                  <Dices size={16} />
                  {spinning ? "Лента крутится..." : "Крутить превью ленты"}
                </button>
                <a
                  href={ONLINE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5FF39]"
                >
                  Занять ПК или ночной пакет 700 ₽
                  <ArrowRight size={15} />
                </a>
              </div>
            </StoryReveal>

            {/* Right stage: DropX obsidian crate visual with scroll parallax + interactive roulette preview cassette */}
            <div className="min-w-0 space-y-4">
              <motion.div
                style={reduceMotion ? undefined : { scale: crateScale, y: crateY }}
                className="relative mx-auto overflow-hidden rounded-[18px] border border-[#D5FF39]/25 bg-[#050608]"
              >
                <div className="relative aspect-[1.45] w-full">
                  <Image
                    src="/images/promo/dropx/hero.webp"
                    alt="Официальный кейс DropX CyberX Новокосино"
                    fill
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,12,0.05)_40%,rgba(8,9,12,0.92)_100%)]" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="font-chakra text-[10px] font-black uppercase tracking-[0.15em] text-[#D5FF39]">
                        Планшет на ресепшене · 15 призов
                      </span>
                      <p className="mt-0.5 font-tactic text-lg font-black uppercase italic text-white sm:text-2xl">
                        DROP X КЕЙС
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#D5FF39]/40 bg-black/75 px-3 py-1 font-chakra text-[11px] font-bold text-[#D5FF39]">
                      <Tablet size={13} />
                      от 700 ₽
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Mobile-friendly DropX Cassette Preview */}
              <div className="w-full min-w-0 rounded-[18px] border border-white/15 bg-[#050608] p-3.5 sm:p-4">
                <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-chakra text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">
                    Превью ленты DropX (демо)
                  </span>
                  <span className="inline-flex items-center gap-1 font-chakra text-[10px] font-bold text-[#D5FF39]">
                    <Sparkles size={11} />
                    {spinning ? "Выбираем дроп..." : `Дроп: ${wonPrize.title}`}
                  </span>
                </div>

                <div
                  ref={cassetteViewportRef}
                  className="relative w-full max-w-full overflow-hidden rounded-[12px] border border-white/10 bg-[#0b0d12] py-3"
                >
                  {/* Center selector laser line */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[2px] -translate-x-1/2 bg-[#D5FF39] shadow-[0_0_14px_#D5FF39]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0b0d12] to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0b0d12] to-transparent"
                  />

                  <motion.div
                    key={spinSeed}
                    initial={reduceMotion ? { x: targetOffsetPx } : { x: 0 }}
                    animate={{ x: targetOffsetPx }}
                    transition={
                      reduceMotion
                        ? { duration: 0.1 }
                        : { duration: 2.35, ease: [0.12, 0.9, 0.2, 1] }
                    }
                    className="flex w-max gap-[10px] pl-2"
                  >
                    {reelItems.map((item, idx) => {
                      const isTarget = idx === WINNER_INDEX && !spinning;
                      return (
                        <div
                          key={`${spinSeed}-${idx}-${item.id}`}
                          className={`flex w-[132px] shrink-0 flex-col rounded-[10px] border p-2 transition-colors ${
                            isTarget
                              ? "border-[#D5FF39] bg-[#D5FF39]/15"
                              : "border-white/10 bg-[#12151d]"
                          }`}
                        >
                          <div className="relative mx-auto h-16 w-full overflow-hidden rounded-[8px] bg-black/55">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              loading="eager"
                              sizes="132px"
                              className="object-contain p-1"
                            />
                          </div>
                          <span className="mt-2 block truncate font-tactic text-xs font-black uppercase italic text-white">
                            {item.title}
                          </span>
                          <span className="block truncate font-chakra text-[10px] text-white/55">
                            {item.rarity}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Live note for the won preview prize */}
                <div className="mt-3 flex items-start justify-between gap-3 rounded-[12px] border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                  <div className="min-w-0">
                    <span className="block font-tactic text-xs font-black uppercase italic text-[#D5FF39]">
                      {wonPrize.title} — {wonPrize.subtitle}
                    </span>
                    <p className="mt-0.5 font-chakra text-[11px] leading-snug text-white/65">
                      {wonPrize.note}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePreviewSpin}
                    className="shrink-0 rounded-full border border-[#D5FF39]/40 bg-[#D5FF39]/10 px-3 py-1.5 font-chakra text-[10px] font-black uppercase tracking-wider text-[#D5FF39] hover:bg-[#D5FF39]/20"
                  >
                    Ещё
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 15 Official DropX Prizes Gallery with Mobile Filter Tabs */}
          <div className="relative mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <span className="font-chakra text-[11px] font-bold uppercase tracking-[0.16em] text-[#D5FF39]">
                  Каталог призов DropX
                </span>
                <h3 className="mt-1 font-tactic text-2xl font-black uppercase italic text-white sm:text-3xl">
                  Что может выпасть с пополнения от 700 ₽
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {FILTER_TABS.map((tab) => {
                  const activeTab = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFilter(tab.id)}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 font-chakra text-[11px] font-bold uppercase tracking-wider transition ${
                        activeTab
                          ? "bg-[#D5FF39] text-[#090909]"
                          : "border border-white/15 bg-white/[0.03] text-white/65 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {visiblePrizes.map((prize) => {
                const isTop = prize.category === "top";
                return (
                  <article
                    key={prize.id}
                    className={`group flex min-w-0 flex-col overflow-hidden rounded-[14px] border p-3 transition hover:-translate-y-0.5 motion-reduce:transform-none ${
                      isTop
                        ? "border-[#D5FF39]/35 bg-gradient-to-b from-[#D5FF39]/10 to-[#0e1015]"
                        : "border-white/10 bg-[#0d0f14]"
                    }`}
                  >
                    <div className="relative aspect-[1.15] w-full overflow-hidden rounded-[10px] bg-black/60">
                      <Image
                        src={prize.image}
                        alt={prize.title}
                        fill
                        loading="eager"
                        sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 18vw"
                        className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <span
                      className={`mt-2.5 font-chakra text-[10px] font-black uppercase tracking-[0.12em] ${
                        isTop ? "text-[#D5FF39]" : "text-white/45"
                      }`}
                    >
                      {prize.weightLabel}
                    </span>
                    <h4 className="mt-0.5 font-tactic text-sm font-black uppercase italic leading-tight text-white sm:text-base">
                      {prize.title}
                    </h4>
                    <p className="mt-1 font-chakra text-[11px] leading-snug text-white/60">
                      {prize.subtitle}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Honest Rule Disclosures */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2.5 rounded-[14px] border border-white/10 bg-black/40 p-3.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-[#D5FF39]" />
                <p className="font-chakra text-xs leading-relaxed text-white/65">
                  <strong className="text-white">Успеть до 23:59 МСК:</strong> автоматические бонусы приходят сами, а напитки, сэндвичи, время, годовые статусы и X2 нужно забрать/активировать у администратора в тот же день до полуночи.
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-[14px] border border-white/10 bg-black/40 p-3.5">
                <ShieldAlert size={16} className="mt-0.5 shrink-0 text-[#FF2E63]" />
                <p className="font-chakra text-xs leading-relaxed text-white/65">
                  <strong className="text-white">Важные детали:</strong> отменённые платежи не участвуют; энергетик выдаётся только гостям 18+; если выпавший статус «Золото»/«Платина» уже не выше вашего, статус сохраняется без замены приза.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
