"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CLUB_REASONS, ONLINE_BOOKING_URL } from "./promoData";
import { StoryReveal } from "./MotionPrimitives";

export default function ClubReasonsSection() {
  const [selectedId, setSelectedId] = useState(CLUB_REASONS[0].id);
  const reduceMotion = useReducedMotion();
  const active = CLUB_REASONS.find((r) => r.id === selectedId) ?? CLUB_REASONS[0];

  return (
    <section
      id="reasons"
      className="scroll-mt-32 border-t border-white/10 bg-[#0A0A0C] px-4 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <StoryReveal>
          <h2 className="max-w-3xl text-balance font-tactic text-3xl font-black uppercase italic leading-[0.98] text-white sm:text-5xl">
            Бонусы — повод зайти.{" "}
            <span className="text-white/45">Железо заставляет остаться.</span>
          </h2>
        </StoryReveal>

        {/* Architectural split stage: Clean photo + 4-row hairline index selector */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:gap-12">
          {/* Pure edge-to-edge photography, caption outside */}
          <div className="min-w-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-[#111] sm:aspect-[16/11]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? false : { opacity: 0.15, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0.15 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={active.image}
                    alt={active.imageAlt}
                    fill
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 54vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h3 className="font-tactic text-xl font-black uppercase italic leading-tight text-white sm:text-2xl">
                  {active.title} <span className="text-white/50">{active.muted}</span>
                </h3>
                <p className="mt-2 max-w-xl font-chakra text-sm leading-relaxed text-white/65">
                  {active.summary}
                </p>
              </div>
              <Link
                href={active.ctaHref}
                className="inline-flex shrink-0 items-center gap-2 font-chakra text-xs font-bold uppercase tracking-[0.12em] text-[#FF2E63] transition-colors hover:text-white"
              >
                {active.ctaLabel}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Minimal 4-row hairline scenario selector */}
          <div className="flex min-w-0 flex-col justify-between">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {CLUB_REASONS.map((reason) => {
                const isSelected = reason.id === active.id;
                return (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => setSelectedId(reason.id)}
                    className={`group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2E63] sm:py-5 ${
                      isSelected ? "text-white" : "text-white/50 hover:text-white/85"
                    }`}
                  >
                    <span className="truncate font-tactic text-lg font-black uppercase italic sm:text-2xl">
                      {reason.tab}
                    </span>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-chakra text-xs font-bold tabular-nums text-white/60">
                        {reason.price}
                      </span>
                      <ArrowRight
                        size={15}
                        className={`transition-transform duration-200 ${
                          isSelected
                            ? "translate-x-0 text-[#FF2E63]"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={ONLINE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#FF2E63] px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:bg-[#ff5380] active:scale-[0.98]"
              >
                Занять место онлайн
                <ArrowRight size={15} />
              </a>
              <Link
                href="/prices"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-white/20 px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white transition hover:border-white/50"
              >
                Все цены клуба
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
