"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame, Sparkles } from "lucide-react";
import { CLUB_REASONS, ONLINE_BOOKING_URL } from "./promoData";
import { StoryReveal } from "./MotionPrimitives";

export default function ClubReasonsSection() {
  const [selectedId, setSelectedId] = useState(CLUB_REASONS[0].id);
  const reduceMotion = useReducedMotion();
  const active = CLUB_REASONS.find((r) => r.id === selectedId) ?? CLUB_REASONS[0];

  return (
    <section id="reasons" className="relative scroll-mt-32 px-4 py-14 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1760px]">
        <StoryReveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-chakra text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF2E63]">
              <Flame size={14} />
              Повод прийти сегодня · 24/7 у м. Новокосино
            </span>
            <h2 className="mt-3 text-balance font-tactic text-3xl font-black uppercase italic leading-[0.98] text-white sm:text-5xl md:text-6xl">
              Не только 400 бонусов.
              <span className="block text-white/45">Зачем едут к нам в зал.</span>
            </h2>
          </div>
          <p className="max-w-md font-chakra text-sm leading-relaxed text-white/60 md:text-base">
            Новокосинская ул., 32 (2 этаж, 5 мин от метро). Выбирай сценарий под вечер — от 400 Гц соло-каток до ночного пакета за 700 ₽.
          </p>
        </StoryReveal>

        {/* Interactive scenario tabs — mobile thumb carousel + desktop grid */}
        <div
          role="tablist"
          aria-label="Сценарии посещения клуба"
          className="mt-7 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-10 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible md:pb-0"
        >
          {CLUB_REASONS.map((reason, idx) => {
            const isSelected = reason.id === active.id;
            return (
              <button
                key={reason.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSelectedId(reason.id)}
                className={`group relative shrink-0 rounded-[14px] border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] md:px-5 md:py-4 ${
                  isSelected
                    ? "border-white/30 bg-[#121216] text-white"
                    : "border-white/10 bg-[#0a0a0c] text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="reason-active-bar"
                    className="absolute inset-x-4 top-0 h-[2px] rounded-full"
                    style={{ backgroundColor: reason.accent }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="block font-chakra text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
                  0{idx + 1} · {reason.priceBadge}
                </span>
                <span className="mt-1 block font-tactic text-sm font-black uppercase italic leading-tight sm:text-base">
                  {reason.tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Reason Storytelling Stage */}
        <div className="mt-4 overflow-hidden rounded-[20px] border border-white/15 bg-[#0b0b0e]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0.01, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-[1.08fr_0.92fr]"
            >
              {/* Photo stage first on mobile for visual storytelling */}
              <div className="relative min-h-[260px] min-w-0 overflow-hidden sm:min-h-[340px] lg:order-2 lg:min-h-[470px]">
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,14,0.08)_0%,rgba(11,11,14,0.88)_100%)] lg:bg-[linear-gradient(90deg,rgba(11,11,14,0.94)_0%,rgba(11,11,14,0.22)_46%,rgba(11,11,14,0.05)_100%)]" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 md:bottom-6 md:left-6 md:right-6">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-tactic text-xs font-black uppercase italic text-[#090909]"
                    style={{ backgroundColor: active.accent }}
                  >
                    <Sparkles size={13} />
                    {active.priceBadge}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {active.specs.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full border border-white/15 bg-black/70 px-3 py-1 font-chakra text-[11px] font-bold text-white/90 backdrop-blur-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Narrative copy */}
              <div className="flex min-w-0 flex-col justify-between p-5 sm:p-8 lg:order-1 lg:p-11">
                <div>
                  <span
                    className="font-chakra text-[11px] font-black uppercase tracking-[0.16em]"
                    style={{ color: active.accent }}
                  >
                    {active.kicker}
                  </span>
                  <h3 className="mt-3 text-balance font-tactic text-2xl font-black uppercase italic leading-[1.02] text-white sm:text-4xl">
                    {active.title}
                  </h3>

                  <div className="mt-5 rounded-[14px] border border-white/10 bg-white/[0.03] p-4">
                    <span className="block font-chakra text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                      Знакомо?
                    </span>
                    <p className="mt-1 font-chakra text-sm leading-relaxed text-white/75">{active.pain}</p>
                  </div>

                  <p className="mt-4 font-chakra text-sm leading-relaxed text-white/75 sm:text-base">
                    {active.benefit}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={ONLINE_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transform-none"
                  >
                    Забронировать место
                    <ArrowRight size={15} />
                  </a>
                  <Link
                    href={active.ctaHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    {active.ctaLabel}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile/Tablet Swipe Photo Deck of all 4 Club Reasons */}
        <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible">
          {CLUB_REASONS.map((reason) => {
            const isSelected = reason.id === active.id;
            return (
              <button
                key={reason.id}
                type="button"
                onClick={() => setSelectedId(reason.id)}
                className={`group relative flex min-w-[78%] snap-start items-center gap-3.5 rounded-[14px] border p-2.5 text-left transition sm:min-w-[46%] md:min-w-0 ${
                  isSelected
                    ? "border-white/30 bg-white/[0.07]"
                    : "border-white/10 bg-[#0a0a0c] hover:border-white/20"
                }`}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] border border-white/10">
                  <Image
                    src={reason.image}
                    alt={reason.tab}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <span className="block font-chakra text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                    {reason.priceBadge}
                  </span>
                  <strong className="mt-0.5 block truncate font-tactic text-sm font-black uppercase italic text-white">
                    {reason.tab}
                  </strong>
                  <span className="mt-1 inline-flex items-center gap-1 font-chakra text-[11px] font-bold text-white/60">
                    <CheckCircle2 size={12} style={{ color: reason.accent }} />
                    {isSelected ? "Выбрано" : "Подробнее"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
