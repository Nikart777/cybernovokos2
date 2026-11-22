"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Minus, Plus, Smartphone } from "lucide-react";
import ClubReasonsSection from "./promo/ClubReasonsSection";
import DropXRouletteSection from "./promo/DropXRouletteSection";
import { MobileStoryRail, StoryReveal } from "./promo/MotionPrimitives";
import { PROMO_FAQS } from "./promo/faqData";
import {
  ACTIVATION_STEPS,
  APP_DOWNLOAD_URL,
  BOOKING_FORMATS,
  LOYALTY_LEVELS,
  ONLINE_BOOKING_URL,
  REFERRAL_STEPS,
  STORY_CHAPTERS,
  TOPUP_BONUSES,
} from "./promo/promoData";

function AppStoreLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <a
      href={APP_DOWNLOAD_URL}
      target="_blank"
      rel="nofollow noopener noreferrer"
      data-cta="cyberx-app"
      className={className}
    >
      {children}
      <span className="sr-only"> (откроется в новой вкладке)</span>
    </a>
  );
}

export default function PromoLanding() {
  const reduceMotion = useReducedMotion();
  const [selectedRankId, setSelectedRankId] = useState(LOYALTY_LEVELS[4].id);
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  const phoneStageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: phoneScroll } = useScroll({
    target: phoneStageRef,
    offset: ["start end", "end start"],
  });
  const phoneParallaxY = useTransform(phoneScroll, [0, 1], [32, -32]);

  const heroMediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroMediaRef,
    offset: ["start start", "end start"],
  });
  const heroMediaY = useTransform(heroScroll, [0, 1], [0, -20]);

  const selectedRank =
    LOYALTY_LEVELS.find((lvl) => lvl.id === selectedRankId) ?? LOYALTY_LEVELS[4];

  return (
    <div className="overflow-x-clip bg-[#050505] text-white">
      {/* HERO OPENING STAGE: Clean architectural split, zero nested boxes or pill badges */}
      <section
        id="start"
        className="scroll-mt-32 px-4 pb-12 pt-20 md:px-10 md:pb-20 md:pt-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14">
          <motion.div
            className="min-w-0"
            initial={reduceMotion ? false : { opacity: 0.01, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-balance font-tactic text-[clamp(2.4rem,10.5vw,3.15rem)] font-black uppercase italic leading-[0.94] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              400 бонусов на старт.{" "}
              <span className="text-white/45">800 — с другом.</span>
            </h1>

            <p className="mt-5 max-w-lg font-chakra text-sm leading-relaxed text-white/70 sm:text-base">
              Установи приложение и забери <strong className="text-white">400 ₽</strong>, приходи в залы с RTX 5070 и 400 Гц, а при пополнении от{" "}
              <strong className="text-[#D5FF39]">700 ₽</strong> крути рулетку DropX в клубе.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[4px] bg-[#FF2E63] px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:bg-[#ff5380] active:scale-[0.98]">
                <Smartphone size={16} />
                Скачать + 400 ₽
                <ArrowRight size={15} />
              </AppStoreLink>
              <a
                href={ONLINE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-white/20 px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-white transition hover:border-white/55"
              >
                Бронь по email
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Clean tabular data bar — no boxes, hairline divider */}
            <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-4">
              <div>
                <dt className="font-chakra text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Бонус новичка
                </dt>
                <dd className="mt-1 font-tactic text-xl font-black italic text-white">400 ₽</dd>
              </div>
              <div>
                <dt className="font-chakra text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Оплата бонусами
                </dt>
                <dd className="mt-1 font-tactic text-xl font-black italic text-white">до 20%</dd>
              </div>
              <div>
                <dt className="font-chakra text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  DropX в клубе
                </dt>
                <dd className="mt-1 font-tactic text-xl font-black italic text-[#D5FF39]">от 700 ₽</dd>
              </div>
              <div>
                <dt className="font-chakra text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Киберкэш
                </dt>
                <dd className="mt-1 font-tactic text-xl font-black italic text-[#FF2E63]">до 20%</dd>
              </div>
            </dl>
          </motion.div>

          {/* Clean edge-to-edge hero media, caption line underneath */}
          <div ref={heroMediaRef} className="min-w-0">
            <motion.div
              style={reduceMotion ? undefined : { y: heroMediaY }}
              className="overflow-hidden rounded-[4px] bg-[#111]"
            >
              <div className="relative aspect-[1.2] w-full">
                <Image
                  src="/images/promo/hero-bonus-app-v2.webp"
                  alt="Два друга получают бонус и выбирают игровое место в CyberX Новокосино"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky mobile & desktop story chapter navigation */}
      <MobileStoryRail chapters={STORY_CHAPTERS} />

      {/* BAND 01: CLUB REASONS */}
      <ClubReasonsSection />

      {/* BAND 02: DROPX ROULETTE FROM 700 RUBLES */}
      <DropXRouletteSection />

      {/* BAND 03: FIRST VISIT STEPS + PARALLAX PHONE */}
      <section
        id="booking"
        className="scroll-mt-32 border-t border-white/10 bg-[#0A0A0C] px-4 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <StoryReveal>
            <h2 className="max-w-3xl text-balance font-tactic text-3xl font-black uppercase italic leading-[0.98] text-white sm:text-5xl">
              Как забрать 400 бонусов.{" "}
              <span className="text-white/45">И сесть за ПК за минуту.</span>
            </h2>
          </StoryReveal>

          {/* Flat 4-column typographic timeline separated by hairline rules */}
          <div className="mt-10 grid gap-8 border-y border-white/10 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVATION_STEPS.map((step) => (
              <article key={step.num} className="min-w-0">
                <span className="font-tactic text-4xl font-black italic text-[#FF2E63]">
                  {step.num}
                </span>
                <h3 className="mt-3 font-tactic text-lg font-black uppercase italic text-white">
                  {step.title}
                </h3>
                <p className="mt-2 font-chakra text-sm leading-relaxed text-white/60">
                  {step.text}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-4 font-chakra text-xs text-white/50">
            На автосимуляторы{" "}
            <Link href="/simracing" className="text-white underline decoration-[#00F0FF] underline-offset-4">
              DRIVE X
            </Link>{" "}
            бонусы не списываются — оплата только основным балансом.
          </p>

          {/* Split Phone App Preview Stage (Scroll parallax on /popup.webp) */}
          <div
            ref={phoneStageRef}
            className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
          >
            <div className="min-w-0">
              <h3 className="text-balance font-tactic text-3xl font-black uppercase italic leading-[1.0] text-white sm:text-5xl">
                Бронь без звонков.{" "}
                <span className="text-white/45">Через приложение или почту.</span>
              </h3>
              <p className="mt-4 max-w-lg font-chakra text-sm leading-relaxed text-white/65 sm:text-base">
                В приложении видны свободные места и ваши 400 бонусов. А если не хочется ставить приложение прямо сейчас — бронируйте за 30 секунд через браузер по email.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:bg-[#ff5380]">
                  <Smartphone size={15} />
                  Приложение (+400 ₽)
                  <ArrowRight size={15} />
                </AppStoreLink>
                <a
                  href={ONLINE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-white/20 px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white transition hover:border-white/55"
                >
                  Онлайн-бронь по email
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[4px] bg-[#111] pt-6 sm:min-h-[460px]">
              <motion.div
                style={reduceMotion ? undefined : { y: phoneParallaxY }}
                className="relative"
              >
                <Image
                  src="/popup.webp"
                  alt="Экран бронирования в приложении CyberX Новокосино"
                  width={1680}
                  height={3232}
                  sizes="(max-width: 1024px) 75vw, 32vw"
                  className="h-[420px] w-auto max-w-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.75)] sm:h-[520px]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 04: REFERRAL 400 + 400 = 800 & 5% FOREVER */}
      <section
        id="referral"
        className="scroll-mt-32 border-t border-white/10 bg-[#050505] px-4 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
            <div className="min-w-0">
              <div className="relative aspect-[1.2] w-full overflow-hidden rounded-[4px] bg-[#111]">
                <Image
                  src="/images/promo/referral-friends-v2.webp"
                  alt="Друзья обсуждают реферальный бонус CyberX"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-[58%_center]"
                />
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-balance font-tactic text-3xl font-black uppercase italic leading-[0.98] text-white sm:text-5xl">
                Другу — 800 на старт.{" "}
                <span className="text-white/45">Тебе — 5% всегда.</span>
              </h2>

              <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {REFERRAL_STEPS.map((step) => (
                  <div key={step.num} className="grid grid-cols-[40px_1fr] gap-4 py-4">
                    <span className="font-tactic text-xl font-black italic text-[#00F0FF]">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-tactic text-base font-black uppercase italic text-white sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1 font-chakra text-sm text-white/60">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:bg-[#ff5380]">
                  Ввести код в приложении
                  <ArrowRight size={15} />
                </AppStoreLink>
                <Link
                  href="/certificate"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-white/20 px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white transition hover:border-white/55"
                >
                  Подарить сертификат
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 05: CYBERCASH LOYALTY TABLE + AUTOBONUSES */}
      <section
        id="cashback"
        className="scroll-mt-32 border-t border-white/10 bg-[#0A0A0C] px-4 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <StoryReveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
            <div className="min-w-0">
              <h2 className="text-balance font-tactic text-3xl font-black uppercase italic leading-[0.98] text-white sm:text-5xl">
                Кэшбэк до 20%.{" "}
                <span className="text-white/45">Плюс автобонус при пополнении.</span>
              </h2>
              <p className="mt-4 max-w-lg font-chakra text-sm leading-relaxed text-white/65 sm:text-base">
                Ранг растёт по часам в клубе, а «Золото» или «Платину» на год можно сразу выбить в рулетке DropX.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:bg-[#ff5380]">
                  Пополнить в приложении
                  <ArrowRight size={15} />
                </AppStoreLink>
                <Link
                  href="/prices"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-white/20 px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white transition hover:border-white/55"
                >
                  Цены залов
                </Link>
              </div>
            </div>

            <div className="relative aspect-[1.65] w-full overflow-hidden rounded-[4px] bg-[#111]">
              <Image
                src="/images/promo/loyalty-topup-v2.webp"
                alt="Гость CyberX пополняет игровой баланс в приложении"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center"
              />
            </div>
          </StoryReveal>

          {/* Clean Interactive Rank Bar (Mobile concise tab view + Desktop data matrix) */}
          <div className="mt-12 sm:hidden">
            <div className="flex gap-4 overflow-x-auto border-b border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {LOYALTY_LEVELS.map((lvl) => {
                const isSel = lvl.id === selectedRank.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedRankId(lvl.id)}
                    className={`shrink-0 border-b-2 pb-2.5 font-chakra text-xs font-bold uppercase tracking-wider transition-colors ${
                      isSel ? "text-white" : "border-transparent text-white/45"
                    }`}
                    style={isSel ? { borderColor: lvl.color, color: lvl.color } : undefined}
                  >
                    {lvl.name}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-4 py-5">
              <div>
                <span className="block font-chakra text-[10px] uppercase tracking-wider text-white/45">
                  Кэшбэк
                </span>
                <strong
                  className="font-tactic text-4xl font-black italic"
                  style={{ color: selectedRank.color }}
                >
                  {selectedRank.cashback}
                </strong>
              </div>
              <div>
                <span className="block font-chakra text-[10px] uppercase tracking-wider text-white/45">
                  Условие
                </span>
                <strong className="font-tactic text-2xl font-black italic text-white">
                  {selectedRank.hours}
                </strong>
              </div>
              <div>
                <span className="block font-chakra text-[10px] uppercase tracking-wider text-white/45">
                  Бонус на ДР
                </span>
                <strong className="font-chakra text-sm font-bold text-white">
                  {selectedRank.birthdayBonus}
                </strong>
              </div>
              <div>
                <span className="block font-chakra text-[10px] uppercase tracking-wider text-white/45">
                  Скидка на бар
                </span>
                <strong className="font-chakra text-sm font-bold text-white">
                  {selectedRank.shopDiscount}
                </strong>
              </div>
            </div>
          </div>

          {/* Desktop 5-Column Clean Hairline Matrix (No heavy cards) */}
          <div className="mt-12 hidden grid-cols-5 border-y border-white/15 sm:grid">
            {LOYALTY_LEVELS.map((level, i) => (
              <div
                key={level.id}
                className={`py-6 ${i > 0 ? "border-l border-white/10 pl-6" : "pr-4"}`}
              >
                <span
                  className="font-chakra text-xs font-black uppercase tracking-[0.14em]"
                  style={{ color: level.color }}
                >
                  {level.name}
                </span>
                <strong className="mt-3 block font-tactic text-5xl font-black italic text-white">
                  {level.cashback}
                </strong>
                <div className="mt-4 space-y-1 font-chakra text-xs text-white/60">
                  <p>{level.hours}</p>
                  <p>ДР: {level.birthdayBonus}</p>
                  <p>Бар: {level.shopDiscount}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Auto Top-up Strip */}
          <div className="mt-10 grid gap-6 border-b border-white/10 pb-8 md:grid-cols-3">
            {TOPUP_BONUSES.map((item) => (
              <div key={item.bonus} className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-4 md:border-t-0 md:pt-0">
                <div>
                  <strong className="font-tactic text-3xl font-black italic text-[#FF2E63]">
                    {item.bonus}
                  </strong>
                  <span className="ml-1.5 font-chakra text-xs font-bold uppercase text-white/45">
                    бонусов
                  </span>
                  <p className="mt-1 font-chakra text-xs text-white/55">{item.access}</p>
                </div>
                <span className="font-tactic text-base font-black italic text-white">
                  {item.balance}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Zone Formats Row */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {BOOKING_FORMATS.map((format) => (
              <Link key={format.label} href={format.href} className="group min-w-0">
                <div className="relative aspect-[1.45] w-full overflow-hidden rounded-[4px] bg-[#111]">
                  <Image
                    src={format.src}
                    alt={format.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 32vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="font-tactic text-lg font-black uppercase italic text-white">
                    {format.label}
                  </span>
                  <span className="font-chakra text-xs text-white/50">{format.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 06: SEO-SAFE FAQ ACCORDION */}
      <section
        id="faq"
        className="scroll-mt-32 border-t border-white/10 bg-[#050505] px-4 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <h2 className="font-tactic text-3xl font-black uppercase italic leading-none text-white sm:text-4xl">
              Частые вопросы
            </h2>
            <p className="mt-3 font-chakra text-sm text-white/55">
              Бонусы, промокод друга, рулетка DropX и Киберкэш.
            </p>
            <Link
              href="/contacts"
              className="mt-5 inline-flex items-center gap-2 font-chakra text-xs font-bold uppercase tracking-[0.14em] text-white/75 underline decoration-[#FF2E63] underline-offset-4 hover:text-white"
            >
              Контакты и как добраться
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {PROMO_FAQS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:text-[#FF2E63]"
                  >
                    <h3 className="font-chakra text-sm font-bold text-white sm:text-base">
                      {item.question}
                    </h3>
                    {isOpen ? (
                      <Minus size={16} className="shrink-0 text-[#FF2E63]" />
                    ) : (
                      <Plus size={16} className="shrink-0 text-white/45" />
                    )}
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-60"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 font-chakra text-sm leading-relaxed text-white/60">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CLOSING STATEMENT (Generous pb-28 clears mobile StickyBar) */}
      <section className="border-t border-white/10 bg-[#0A0A0C] px-4 pb-28 pt-14 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">
          <div>
            <h2 className="text-balance font-tactic text-3xl font-black uppercase italic leading-[0.98] text-white sm:text-5xl">
              400 на старт. <span className="text-[#D5FF39]">DropX от 700 ₽.</span>
            </h2>
            <p className="mt-3 max-w-md font-chakra text-sm text-white/65">
              CyberX Новокосино · Новокосинская ул., 32 · Круглосуточно.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-white px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:bg-[#FF2E63]">
                Скачать CyberX + 400
                <ArrowRight size={15} />
              </AppStoreLink>
              <a
                href={ONLINE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-white/20 px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-white transition hover:border-white/55"
              >
                Онлайн-бронь ПК
              </a>
            </div>
          </div>

          <div className="relative aspect-[1.85] w-full overflow-hidden rounded-[4px] bg-[#111]">
            <Image
              src="/images/promo/promo-team-cta-v2.webp"
              alt="Друзья играют в команде в клубе CyberX Новокосино"
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
