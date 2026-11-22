"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  CircleDollarSign,
  Dices,
  Gift,
  Infinity as InfinityIcon,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Trophy,
  UsersRound,
} from "lucide-react";
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
  const phoneParallaxY = useTransform(phoneScroll, [0, 1], [34, -36]);
  const phoneRotate = useTransform(phoneScroll, [0, 0.5, 1], [-2, 0, 1.5]);

  const heroCardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroCardRef,
    offset: ["start start", "end start"],
  });
  const heroFloatY = useTransform(heroScroll, [0, 1], [0, -24]);

  const selectedRank =
    LOYALTY_LEVELS.find((lvl) => lvl.id === selectedRankId) ?? LOYALTY_LEVELS[4];

  return (
    <div className="overflow-x-clip bg-[#070707] text-white">
      {/* CHAPTER 1: OPENING HERO STAGE */}
      <section
        id="start"
        className="relative isolate scroll-mt-32 px-4 pb-12 pt-20 md:px-10 md:pb-20 md:pt-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_84%_20%,rgba(255,46,99,0.18),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(0,240,255,0.09),transparent_28%)]"
        />

        <div className="mx-auto grid max-w-[1760px] gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14">
          <motion.div
            className="min-w-0"
            initial={reduceMotion ? false : { opacity: 0.01, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <div className="flex items-stretch gap-3">
                <span className="w-[4px] shrink-0 -skew-y-12 bg-[#FF2E63]" aria-hidden="true" />
                <div>
                  <span className="block font-tactic text-sm font-black uppercase italic leading-none text-white sm:text-base">
                    Бонусы + Дроп
                  </span>
                  <span className="mt-1 block font-chakra text-[11px] font-bold text-white/50">
                    CyberX Новокосино · 24/7
                  </span>
                </div>
              </div>
              <a
                href="#dropx"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D5FF39]/40 bg-[#D5FF39]/15 px-3 py-1 font-chakra text-[11px] font-black uppercase tracking-wider text-[#D5FF39] transition hover:bg-[#D5FF39]/25"
              >
                <Dices size={13} />
                От 700 ₽ → DropX
              </a>
            </div>

            <h1 className="max-w-xl text-balance font-tactic text-[clamp(2.5rem,11.5vw,3.1rem)] font-black uppercase italic leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              400 бонусов
              <span className="block text-[#FF2E63]">на старт.</span>
              <span className="mt-1.5 block text-2xl text-white/85 sm:text-4xl lg:text-[2.65rem]">
                И рулетка с 700 ₽.
              </span>
            </h1>

            <p className="mt-5 max-w-lg font-chakra text-sm font-medium leading-relaxed text-white/70 sm:text-base md:text-lg">
              Забирай <strong className="text-white">400 ₽</strong> за регистрацию в приложении (или{" "}
              <strong className="text-white">800 ₽</strong> по коду друга), приходи в зал с 400 Гц и MOZA R12, а при пополнении от{" "}
              <strong className="text-[#D5FF39]">700 ₽</strong> открывай рулетку DropX прямо в клубе.
            </p>

            {/* Primary CTA vs crisp secondary pill — clear visual hierarchy */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AppStoreLink className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF2E63] py-2 pl-6 pr-2 font-tactic text-sm font-black uppercase italic tracking-wide text-[#090909] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] motion-reduce:transform-none">
                <Smartphone size={18} />
                Скачать + 400 ₽
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={17} />
                </span>
              </AppStoreLink>
              <a
                href={ONLINE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-white px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] active:scale-[0.98] motion-reduce:transform-none"
              >
                Бронь в браузере по email
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Right Bento Photo Stage + Floating DropX Proof Strip */}
          <div ref={heroCardRef} className="relative mx-auto w-full min-w-0 max-w-2xl lg:max-w-none">
            <motion.div
              style={reduceMotion ? undefined : { y: heroFloatY }}
              className="rounded-[26px] bg-white/[0.045] p-1.5 ring-1 ring-white/15"
            >
              <div className="group relative overflow-hidden rounded-[22px] bg-[#101010] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                <div className="relative aspect-[1.08] overflow-hidden sm:aspect-[1.24]">
                  <Image
                    src="/images/promo/hero-bonus-app-v2.webp"
                    alt="Два друга получают бонус и выбирают игровое место в CyberX Новокосино"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] motion-reduce:transform-none"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.05)_30%,rgba(7,7,7,0.92)_100%)]" />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-4 font-tactic text-[5.5rem] font-black italic leading-none text-transparent opacity-25 [-webkit-text-stroke:1px_rgba(255,255,255,0.45)] sm:text-[9rem]"
                  >
                    400
                  </span>

                  {/* Floating Mini DropX Crate Callout inside the framed stage */}
                  <a
                    href="#dropx"
                    className="absolute right-3 top-3 flex items-center gap-2.5 rounded-[14px] border border-[#D5FF39]/40 bg-black/80 px-3 py-2 backdrop-blur-md transition hover:border-[#D5FF39] sm:right-5 sm:top-5"
                  >
                    <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-[#D5FF39]/30">
                      <Image
                        src="/images/promo/dropx/hero.webp"
                        alt="DropX кейс"
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block font-chakra text-[9px] font-black uppercase tracking-wider text-[#D5FF39]">
                        Пополнение от 700 ₽
                      </span>
                      <strong className="block font-tactic text-xs font-black uppercase italic text-white">
                        Рулетка в клубе →
                      </strong>
                    </div>
                  </a>

                  <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                    <p className="max-w-md font-tactic text-2xl font-black uppercase italic leading-[1.02] text-white sm:text-3xl md:text-4xl">
                      Один вечер — тройная выгода
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <AppStoreLink className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 font-tactic text-[11px] font-black uppercase italic tracking-wide text-[#090909] transition-transform hover:translate-x-0.5">
                        Забрать 400 ₽
                        <ArrowRight size={14} />
                      </AppStoreLink>
                      <a
                        href="#reasons"
                        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 bg-black/60 px-4 font-chakra text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/10"
                      >
                        Зачем в зал
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4 compact KPI metrics across mobile 2x2 and desktop 4-col */}
                <div className="grid grid-cols-2 gap-3 bg-[#101010] p-4 sm:grid-cols-4 md:gap-4 md:p-5">
                  <div>
                    <span className="block font-chakra text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                      Курс
                    </span>
                    <strong className="font-tactic text-lg font-black italic text-white sm:text-xl">
                      1 б = 1 ₽
                    </strong>
                  </div>
                  <div>
                    <span className="block font-chakra text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                      Оплата бонусами
                    </span>
                    <strong className="font-tactic text-lg font-black italic text-white sm:text-xl">
                      до 20%
                    </strong>
                  </div>
                  <div>
                    <span className="block font-chakra text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                      DropX кейс
                    </span>
                    <strong className="font-tactic text-lg font-black italic text-[#D5FF39] sm:text-xl">
                      от 700 ₽
                    </strong>
                  </div>
                  <div>
                    <span className="block font-chakra text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                      Киберкэш
                    </span>
                    <strong className="font-tactic text-lg font-black italic text-[#FF2E63] sm:text-xl">
                      до 20%
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky mobile & desktop story chapter navigation right under fixed Header after Hero */}
      <MobileStoryRail chapters={STORY_CHAPTERS} />

      {/* CHAPTER 2: REASONS TO VISIT THE CLUB TODAY (WITH REAL ZONE PHOTOS) */}
      <ClubReasonsSection />

      {/* CHAPTER 3: DROPX ROULETTE FROM 700 RUBLES (OPENCLAW VERIFIED) */}
      <DropXRouletteSection />

      {/* CHAPTER 4: FIRST VISIT JOURNEY + PARALLAX PHONE PREVIEW */}
      <section id="booking" className="scroll-mt-32 px-4 py-14 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1760px]">
          <StoryReveal className="max-w-3xl">
            <span className="font-chakra text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF2E63]">
              Маршрут первого визита
            </span>
            <h2 className="mt-2 font-tactic text-3xl font-black uppercase italic leading-[1.0] sm:text-5xl md:text-6xl">
              От скачивания до посадки за ПК
            </h2>
            <p className="mt-4 font-chakra text-sm leading-relaxed text-white/65 sm:text-base md:text-lg">
              Никаких сложных квестов: ставишь приложение, получаешь 400 ₽, выбираешь место на карте зала и подключаешься.
            </p>
          </StoryReveal>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/10 sm:grid-cols-2 xl:mt-12 xl:grid-cols-4">
            {ACTIVATION_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isBonusStep = index === 1;

              return (
                <StoryReveal key={step.title} delay={index * 0.05} className="h-full">
                  <article
                    className={`group relative flex h-full min-h-[230px] flex-col overflow-hidden p-6 transition-colors md:min-h-[270px] md:p-7 ${
                      isBonusStep
                        ? "bg-[#FF2E63] text-[#090909]"
                        : "bg-[#0d0d0d] text-white hover:bg-[#121216]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center border [clip-path:polygon(0_0,100%_0,100%_72%,72%_100%,0_100%)] ${
                          isBonusStep
                            ? "border-black/20 bg-black/10"
                            : "border-[#FF2E63]/35 bg-[#FF2E63]/10 text-[#FF2E63]"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <span
                        className={`font-tactic text-3xl font-black italic leading-none ${
                          isBonusStep ? "text-black/30" : "text-white/15"
                        }`}
                      >
                        {step.num}
                      </span>
                    </div>

                    <div className="mt-7">
                      <h3 className="text-balance font-tactic text-xl font-black uppercase italic leading-none sm:text-2xl">
                        {step.title}
                      </h3>
                      <p
                        className={`mt-3 font-chakra text-sm leading-relaxed ${
                          isBonusStep ? "text-black/75" : "text-white/65"
                        }`}
                      >
                        {step.text}
                      </p>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-6">
                      {isBonusStep ? (
                        <strong className="font-tactic text-4xl font-black italic leading-none text-[#090909]">
                          400 ₽
                        </strong>
                      ) : (
                        <span className="font-chakra text-[10px] font-bold uppercase tracking-wider text-white/40">
                          Шаг {step.num}
                        </span>
                      )}
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 motion-reduce:transform-none ${
                          isBonusStep
                            ? "bg-[#090909] text-white"
                            : "bg-white/[0.06] text-[#FF2E63]"
                        }`}
                      >
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </article>
                </StoryReveal>
              );
            })}
          </div>

          <StoryReveal className="mt-6">
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.035] p-4 ring-1 ring-white/10 sm:p-5">
              <ShieldCheck className="mt-0.5 shrink-0 text-[#FF2E63]" size={19} />
              <p className="font-chakra text-sm leading-relaxed text-white/70">
                1 бонус = 1 ₽. Бонусами оплачивается до 20% игрового времени. Зона автосимуляторов{" "}
                <strong className="text-white">DRIVE X</strong> оплачивается только основным балансом.{" "}
                <Link
                  href="/simracing"
                  className="font-bold text-white underline decoration-[#00F0FF] underline-offset-4 transition-colors hover:text-[#00F0FF]"
                >
                  Подробнее о DRIVE X
                </Link>
                .
              </p>
            </div>
          </StoryReveal>

          {/* Framed Scroll-Scrubbed App Mockup Stage */}
          <div
            ref={phoneStageRef}
            className="mt-8 overflow-hidden rounded-[20px] border border-white/10 bg-[#090909]"
          >
            <div className="relative grid lg:grid-cols-[0.82fr_1.18fr]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_24%,rgba(0,240,255,0.14),transparent_25%),radial-gradient(circle_at_60%_76%,rgba(255,46,99,0.22),transparent_32%)]"
              />

              <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                <span className="font-chakra text-[11px] font-bold uppercase tracking-[0.16em] text-[#00F0FF]">
                  Бронь без звонков
                </span>
                <h3 className="mt-3 max-w-xl text-balance font-tactic text-3xl font-black uppercase italic leading-[1.0] text-white sm:text-5xl">
                  Выбери место заранее
                </h3>
                <p className="mt-4 max-w-xl font-chakra text-sm leading-relaxed text-white/70 sm:text-base">
                  Не хочешь ставить приложение прямо сейчас — жми быструю онлайн-бронь по email (код придёт на почту). Хочешь{" "}
                  <strong className="text-white">400 стартовых бонусов</strong> — ставь CyberX и выбирай клуб «Новокосино».
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transform-none">
                    <Smartphone size={16} />
                    Приложение (+400 ₽)
                    <ArrowRight size={15} />
                  </AppStoreLink>
                  <a
                    href={ONLINE_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    Онлайн-бронь по email
                    <ArrowRight size={15} />
                  </a>
                  <Link
                    href="/#zones"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/15"
                  >
                    Все залы
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5">
                  <div>
                    <strong className="font-tactic text-2xl font-black italic text-[#FF2E63] sm:text-3xl">
                      400 ₽
                    </strong>
                    <span className="ml-2 font-chakra text-xs font-bold text-white/55">
                      после регистрации
                    </span>
                  </div>
                  <div>
                    <strong className="font-tactic text-2xl font-black italic text-white sm:text-3xl">
                      24/7
                    </strong>
                    <span className="ml-2 font-chakra text-xs font-bold text-white/55">
                      работаем без выходных
                    </span>
                  </div>
                </div>
              </div>

              {/* Scroll-driven motion stage with real app screen + club photo */}
              <div className="relative min-h-[400px] overflow-hidden sm:min-h-[490px] lg:min-h-[590px]">
                <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[#FF2E63]" />
                <div className="absolute right-4 top-6 hidden aspect-[1.45] w-[58%] overflow-hidden rounded-[16px] border border-white/15 sm:block lg:right-8 lg:top-10">
                  <Image
                    src="/images/promo/bonus-app-v2.webp"
                    alt="Гость CyberX показывает бонус в приложении"
                    fill
                    sizes="(max-width: 1024px) 55vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>

                <motion.div
                  style={
                    reduceMotion ? undefined : { y: phoneParallaxY, rotate: phoneRotate }
                  }
                  className="relative mx-auto mt-6 flex justify-center lg:absolute lg:bottom-[-110px] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
                >
                  <Image
                    src="/popup.webp"
                    alt="Экран бронирования в приложении CyberX Новокосино"
                    width={1680}
                    height={3232}
                    sizes="(max-width: 1024px) 78vw, 34vw"
                    className="h-[460px] w-auto max-w-none drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)] sm:h-[580px] lg:h-[720px]"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 5: REFERRAL 400 + 400 = 800 & 5% FOREVER */}
      <section id="referral" className="relative isolate scroll-mt-32 px-4 py-14 md:px-10 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_50%,rgba(255,46,99,0.12),transparent_32%),radial-gradient(circle_at_84%_45%,rgba(0,240,255,0.08),transparent_30%)]"
        />
        <div className="mx-auto max-w-[1760px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0b0b0d]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <StoryReveal className="relative min-h-[340px] overflow-hidden lg:min-h-full">
              <Image
                src="/images/promo/referral-friends-v2.webp"
                alt="Два друга обсуждают реферальный бонус CyberX в игровом клубе"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[58%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.04)_35%,rgba(7,7,7,0.84)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,7,7,0.05)_45%,rgba(11,11,13,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-[#FF2E63] p-4 text-[#090909] md:p-7">
                <div>
                  <span className="block font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-black/65">
                    С кодом друга
                  </span>
                  <strong className="font-tactic text-2xl font-black uppercase italic leading-none sm:text-4xl">
                    400 + 400 = 800
                  </strong>
                </div>
                <InfinityIcon className="shrink-0" size={34} strokeWidth={2.4} aria-hidden="true" />
              </div>
            </StoryReveal>

            <div className="relative p-5 sm:p-8 lg:p-12">
              <StoryReveal>
                <span className="font-chakra text-[11px] font-bold uppercase tracking-[0.16em] text-[#00F0FF]">
                  Реферальная программа
                </span>
                <h2 className="mt-2 max-w-2xl font-tactic text-3xl font-black uppercase italic leading-[1.0] sm:text-5xl md:text-6xl">
                  Приведи друга.
                  <span className="block text-[#FF2E63]">Выгодно обоим.</span>
                </h2>
                <p className="mt-4 max-w-xl font-chakra text-sm leading-relaxed text-white/65 sm:text-base">
                  Играйте вдвоём в Duo-комнате или командой в Bootcamp: друг стартует с 800 бонусов, а тебе капает 5% со всех его пополнений.
                </p>
              </StoryReveal>

              <div className="mt-7 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.025]">
                {REFERRAL_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article
                      key={step.title}
                      className={`grid grid-cols-[42px_minmax(0,1fr)] gap-4 p-4 transition duration-200 hover:bg-[#FF2E63]/[0.055] md:grid-cols-[48px_minmax(0,1fr)] md:p-5 ${
                        index < REFERRAL_STEPS.length - 1 ? "border-b border-white/10" : ""
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center border border-[#FF2E63]/30 bg-[#FF2E63]/10 text-[#FF2E63] [clip-path:polygon(0_0,100%_0,100%_72%,72%_100%,0_100%)] md:h-12 md:w-12">
                        <Icon size={19} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-tactic text-base font-black uppercase italic leading-tight text-white sm:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 font-chakra text-sm leading-relaxed text-white/65">
                          {step.text}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-[16px] border border-[#00F0FF]/25 bg-[#00F0FF]/[0.055] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="shrink-0 text-[#00F0FF]" size={21} />
                  <p className="font-chakra text-xs font-bold leading-relaxed text-white/85 sm:text-sm">
                    Код друга находится в личном кабинете на игровом ПК в клубе
                  </p>
                </div>
                <strong className="shrink-0 font-tactic text-xl font-black uppercase italic text-[#00F0FF] sm:text-2xl">
                  5% всегда
                </strong>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] motion-reduce:transform-none">
                  <Smartphone size={16} />
                  Ввести код в приложении
                  <ArrowRight size={15} />
                </AppStoreLink>
                <Link
                  href="/certificate"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/15"
                >
                  <Gift size={16} className="text-[#FF2E63]" />
                  Подарить сертификат другу
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 6: CYBERCASH TIERS & TOP-UP AUTOBONUS STACKING */}
      <section id="cashback" className="scroll-mt-32 px-4 py-14 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1760px]">
          <StoryReveal className="max-w-4xl">
            <span className="font-chakra text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF2E63]">
              Программа лояльности Киберкэш
            </span>
            <h2 className="mt-2 font-tactic text-3xl font-black uppercase italic leading-[1.0] sm:text-5xl md:text-6xl">
              Играете больше.
              <span className="block text-[#FF2E63]">Возвращается больше.</span>
            </h2>
            <p className="mt-4 font-chakra text-sm leading-relaxed text-white/65 sm:text-base md:text-lg">
              Кэшбэк растёт с каждым часом в клубе от 3% до 20% — а статус «Золото» или «Платина» можно выбить сразу на 1 год в рулетке DropX.
            </p>
          </StoryReveal>

          <StoryReveal className="mt-8">
            <div className="relative min-h-[430px] overflow-hidden rounded-[18px] border border-white/10 bg-[#0d0d0d] sm:min-h-[390px]">
              <Image
                src="/images/promo/loyalty-topup-v2.webp"
                alt="Гость CyberX пополняет игровой баланс через мобильное приложение"
                fill
                sizes="(max-width: 640px) 100vw, 1400px"
                className="object-cover object-[34%_center] sm:object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.06)_14%,rgba(7,7,7,0.95)_66%,#070707_100%)] sm:bg-[linear-gradient(270deg,rgba(7,7,7,0.98)_0%,rgba(7,7,7,0.86)_46%,rgba(7,7,7,0.08)_78%)]" />
              <div className="relative flex min-h-[430px] items-end p-5 sm:min-h-[390px] sm:items-center sm:justify-end sm:p-10">
                <div className="max-w-lg sm:w-[48%]">
                  <h3 className="text-balance font-tactic text-2xl font-black uppercase italic leading-[1.02] text-white sm:text-4xl">
                    Пополнения работают вдвойне
                  </h3>
                  <p className="mt-3 font-chakra text-sm leading-relaxed text-white/75 sm:text-base">
                    Пополнение от <strong className="text-[#D5FF39]">700 ₽</strong> открывает рулетку DropX, а от <strong className="text-white">1 000 ₽</strong> на уровне «Серебро» и выше дополнительно начисляет автобонус без промокода.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] motion-reduce:transform-none">
                      <Smartphone size={16} />
                      Пополнить в приложении
                      <ArrowRight size={15} />
                    </AppStoreLink>
                    <Link
                      href="/prices"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black/60 px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/20 transition hover:bg-white/10"
                    >
                      Все цены клуба
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </StoryReveal>

          {/* Interactive Mobile Rank Inspector */}
          <div className="mt-6 rounded-[18px] border border-white/10 bg-[#0d0d0d] p-4 sm:hidden">
            <span className="block font-chakra text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
              Нажмите на статус, чтобы посмотреть привилегии
            </span>
            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {LOYALTY_LEVELS.map((lvl) => {
                const isSel = lvl.id === selectedRank.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedRankId(lvl.id)}
                    className={`shrink-0 rounded-full border px-3.5 py-2 font-chakra text-xs font-black uppercase tracking-wider transition ${
                      isSel
                        ? "text-[#090909]"
                        : "border-white/15 bg-white/[0.03] text-white/70"
                    }`}
                    style={
                      isSel
                        ? { backgroundColor: lvl.color, borderColor: lvl.color }
                        : undefined
                    }
                  >
                    {lvl.name} · {lvl.cashback}
                  </button>
                );
              })}
            </div>

            <div
              className="mt-3 rounded-[14px] border p-4"
              style={{
                borderColor: `${selectedRank.color}88`,
                background: `linear-gradient(145deg, ${selectedRank.color}26 0%, #101014 60%, #090909 100%)`,
              }}
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span
                    className="font-chakra text-xs font-black uppercase tracking-[0.13em]"
                    style={{ color: selectedRank.color }}
                  >
                    {selectedRank.name}
                  </span>
                  <strong className="mt-1 block font-tactic text-5xl font-black italic leading-none text-white">
                    {selectedRank.cashback}
                  </strong>
                  <span className="mt-1 block font-chakra text-xs text-white/55">
                    кэшбэк с каждой игры
                  </span>
                </div>
                <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 font-chakra text-[11px] font-bold text-white">
                  {selectedRank.hours}
                </span>
              </div>
              <p className="mt-4 font-chakra text-xs leading-relaxed text-white/75">
                {selectedRank.perkSummary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedRank.birthdayBonus && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 font-chakra text-[11px] font-bold text-white/85">
                    <Gift size={12} style={{ color: selectedRank.color }} />+
                    {selectedRank.birthdayBonus} ₽ на ДР
                  </span>
                )}
                {selectedRank.shopDiscount && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 font-chakra text-[11px] font-bold text-white/85">
                    <ShoppingBag size={12} style={{ color: selectedRank.color }} />
                    {selectedRank.shopDiscount}
                  </span>
                )}
                {selectedRank.dropxBoost && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D5FF39]/15 px-3 py-1.5 font-chakra text-[11px] font-bold text-[#D5FF39]">
                    <Dices size={12} />
                    DropX {selectedRank.dropxBoost}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Desktop / Tablet 5-Tier Grid */}
          <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12">
            {LOYALTY_LEVELS.map((level, index) => {
              const isDiamond = index === LOYALTY_LEVELS.length - 1;

              return (
                <StoryReveal
                  key={level.name}
                  delay={index * 0.04}
                  className={`h-full ${
                    isDiamond ? "sm:col-span-2 lg:col-span-4 xl:col-span-4" : "lg:col-span-2 xl:col-span-2"
                  }`}
                >
                  <article
                    className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[16px] border p-5 transition duration-300 hover:-translate-y-1 motion-reduce:transform-none md:p-6"
                    style={{
                      borderColor: `${level.color}${isDiamond ? "99" : "66"}`,
                      background: isDiamond
                        ? `linear-gradient(145deg, ${level.color}38 0%, #1a1015 42%, #090909 100%)`
                        : `linear-gradient(145deg, ${level.color}1f 0%, #111111 46%, #090909 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{ background: level.color }}
                    />
                    <span
                      className="font-chakra text-xs font-black uppercase tracking-[0.13em]"
                      style={{ color: level.color }}
                    >
                      {level.name}
                    </span>

                    <div
                      className={`mt-6 flex gap-4 ${
                        isDiamond ? "items-end justify-between" : "flex-col"
                      }`}
                    >
                      <div>
                        <strong
                          className={`block font-tactic font-black italic leading-none text-white ${
                            isDiamond ? "text-7xl" : "text-5xl"
                          }`}
                        >
                          {level.cashback}
                        </strong>
                        <span className="mt-2 block font-chakra text-xs font-bold text-white/55">
                          кэшбэк с игры
                        </span>
                      </div>
                      <span
                        className={`self-start rounded-full px-3 py-1 font-chakra text-[10px] font-black uppercase tracking-wide ${
                          isDiamond
                            ? "bg-[#FF2E63] text-[#090909]"
                            : "bg-white/[0.055] text-white/75 ring-1 ring-white/10"
                        }`}
                      >
                        {level.hours}
                      </span>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex flex-wrap gap-1.5">
                        {level.birthdayBonus ? (
                          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white/[0.055] px-2.5 font-chakra text-[10px] font-bold text-white/80 ring-1 ring-white/10">
                            <Gift size={12} style={{ color: level.color }} />+
                            {level.birthdayBonus} на ДР
                          </span>
                        ) : (
                          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white/[0.055] px-2.5 font-chakra text-[10px] font-bold text-white/70 ring-1 ring-white/10">
                            <BadgeCheck size={12} style={{ color: level.color }} />С первого визита
                          </span>
                        )}
                        {level.shopDiscount && (
                          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white/[0.055] px-2.5 font-chakra text-[10px] font-bold text-white/80 ring-1 ring-white/10">
                            <ShoppingBag size={12} style={{ color: level.color }} />
                            {level.shopDiscount}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </StoryReveal>
              );
            })}
          </div>

          {/* Top-up Auto-bonus Table */}
          <StoryReveal className="mt-6">
            <div className="rounded-[18px] border border-white/10 bg-[#0d0d0d] p-5 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="flex items-center gap-2.5 font-tactic text-xl font-black uppercase italic text-white sm:text-3xl">
                    <CircleDollarSign size={22} className="text-[#FF2E63]" />
                    Автобонусы за пополнение от 1 000 ₽
                  </h3>
                  <p className="mt-2 max-w-2xl font-chakra text-sm leading-relaxed text-white/60">
                    При пополнении одним платежом с уровня «Серебро» и выше бонусы приходят автоматически — и одновременно открывают доступ к рулетке DropX (порог от 700 ₽ уже выполнен).
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-px overflow-hidden rounded-[14px] border border-white/10 bg-white/10 md:grid-cols-3">
                {TOPUP_BONUSES.map((item, index) => (
                  <article
                    key={item.bonus}
                    className={`bg-[#111111] p-4 sm:p-6 ${
                      index === TOPUP_BONUSES.length - 1
                        ? "bg-[linear-gradient(135deg,rgba(255,46,99,0.16),#111111_65%)]"
                        : ""
                    }`}
                  >
                    <span className="font-tactic text-3xl font-black italic text-[#FF2E63] sm:text-4xl">
                      {item.bonus}
                    </span>
                    <span className="ml-1 font-chakra text-xs font-bold uppercase text-white/55">
                      бонусов
                    </span>
                    <strong className="mt-3 block font-tactic text-base font-black uppercase italic text-white sm:text-lg">
                      {item.balance}
                    </strong>
                    <span className="mt-1 block font-chakra text-xs leading-relaxed text-white/60">
                      {item.access}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </StoryReveal>
        </div>
      </section>

      {/* ZONES QUICK FORMAT STRIP */}
      <section className="px-4 py-10 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1760px] gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[20px] border border-white/10 bg-[#0d0d0d] p-6 md:p-9">
            <div>
              <UsersRound className="text-[#FF2E63]" size={26} />
              <h2 className="mt-5 font-tactic text-3xl font-black uppercase italic leading-none sm:text-5xl">
                Куда пойти с бонусами
              </h2>
              <p className="mt-4 max-w-xl font-chakra text-sm leading-relaxed text-white/65 sm:text-base">
                Общий зал от 150 ₽/ч, Bootcamp на 5 ПК, VIP Duo с RTX 4070 или Solo Pro с 400 Гц. Бронь занимает минуту по email или через приложение.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={ONLINE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] motion-reduce:transform-none"
              >
                Онлайн-бронь (код на email)
                <ArrowRight size={15} />
              </a>
              <Link
                href="/prices"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/15"
              >
                Прайс-лист
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {BOOKING_FORMATS.map((format) => (
              <Link
                key={format.label}
                href={format.href}
                className="group relative min-h-[200px] overflow-hidden rounded-[18px] border border-white/10 bg-[#090909] sm:min-h-[260px]"
              >
                <Image
                  src={format.src}
                  alt={format.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 18vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 motion-reduce:transform-none"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08)_22%,rgba(7,7,7,0.92)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-chakra text-[10px] font-bold uppercase tracking-wider text-white/65">
                    {format.note}
                  </span>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="font-tactic text-lg font-black uppercase italic text-white">
                      {format.label}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF2E63] text-[#090909] transition-transform group-hover:translate-x-0.5">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 7: FAQ ACCORDION (DOM MOUNTED FOR SEO/GEO + SMOOTH MOBILE TOGGLE) */}
      <section id="faq" className="scroll-mt-32 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <StoryReveal>
            <span className="font-chakra text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF2E63]">
              Условия без мелкого шрифта
            </span>
            <h2 className="mt-2 font-tactic text-3xl font-black uppercase italic leading-none sm:text-5xl">
              Частые вопросы по промо и DropX
            </h2>
            <p className="mt-4 max-w-md font-chakra text-sm leading-relaxed text-white/60 sm:text-base">
              Собрали всё про стартовые 400 ₽, промокод друга на 800 ₽, рулетку от 700 ₽ и статусы Киберкэш.
            </p>
            <Link
              href="/contacts"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <MapPin size={16} className="text-[#FF2E63]" />
              Новокосинская ул., 32 · Как пройти
              <ArrowRight size={15} />
            </Link>
          </StoryReveal>

          <div className="divide-y divide-white/10 overflow-hidden rounded-[18px] border border-white/10 bg-[#0d0d0d]">
            {PROMO_FAQS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={item.question} className="transition-colors hover:bg-white/[0.02]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00F0FF] md:px-6 md:py-5"
                  >
                    <h3 className="font-tactic text-base font-black uppercase italic leading-snug text-white sm:text-lg">
                      {item.question}
                    </h3>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#FF2E63] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-75"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 font-chakra text-sm leading-relaxed text-white/70 md:px-6">
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

      {/* FINAL CTA WITH GENEROUS BOTTOM PADDING ABOVE MOBILE STICKY BAR */}
      <section className="px-4 pb-28 pt-4 md:px-10 md:pb-24">
        <StoryReveal>
          <div className="relative mx-auto min-h-[380px] max-w-[1760px] overflow-hidden rounded-[20px] border border-[#FF2E63]/40 bg-[#090909] sm:min-h-[340px]">
            <Image
              src="/images/promo/promo-team-cta-v2.webp"
              alt="Друзья играют в команде в клубе CyberX Новокосино"
              fill
              sizes="(max-width: 640px) 100vw, 1400px"
              className="object-cover object-[66%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.12)_0%,rgba(7,7,7,0.95)_66%,#070707_100%)] sm:bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.96)_38%,rgba(7,7,7,0.28)_70%,rgba(7,7,7,0.08)_100%)]" />
            <div className="relative flex min-h-[380px] flex-col justify-end gap-6 p-6 sm:min-h-[340px] sm:max-w-[62%] sm:justify-center md:p-10">
              <div>
                <h2 className="text-balance font-tactic text-3xl font-black uppercase italic leading-[1.0] sm:text-5xl">
                  <span className="text-[#FF2E63]">400 бонусов</span> +{" "}
                  <span className="text-[#D5FF39]">DropX</span>.
                  <span className="block text-white">Залетай в клуб.</span>
                </h2>
                <p className="mt-3 max-w-xl font-chakra text-sm leading-relaxed text-white/75 sm:text-base">
                  Установи приложение для бонусов, пополни от 700 ₽ в клубе для дропа и выбирай зал по настроению.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-white px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#FF2E63] motion-reduce:transform-none">
                  <Gift size={17} />
                  Установить CyberX и забрать 400
                </AppStoreLink>
                <a
                  href={ONLINE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/55 px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  Забронировать ПК онлайн
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </StoryReveal>
      </section>
    </div>
  );
}
