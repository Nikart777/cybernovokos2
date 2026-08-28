"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Copy,
  Gamepad2,
  Gift,
  Infinity,
  MapPin,
  Percent,
  ShoppingBag,
  ShieldCheck,
  Smartphone,
  Trophy,
  UserPlus,
  UsersRound,
  WalletCards,
} from "lucide-react";

const appLink = "/download";

function AppStoreLink({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <a
      href={appLink}
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

const activationSteps = [
  {
    icon: Smartphone,
    title: "Установите CyberX",
    text: "Создайте аккаунт и выберите клуб CyberX Новокосино.",
  },
  {
    icon: BadgeCheck,
    title: "Получите 400 бонусов",
    text: "Подарок сразу появится на бонусном балансе после регистрации.",
  },
  {
    icon: Gamepad2,
    title: "Выберите место и время",
    text: "Посмотрите свободные места, задайте дату и удобный интервал.",
  },
  {
    icon: WalletCards,
    title: "Подтвердите бронь",
    text: "Оплатите выбранное время. Бонусами можно закрыть до 20% игры.",
  },
];

const loyaltyLevels = [
  { name: "Бронза", hours: "до 24 часов", cashback: "3%", color: "#B77945" },
  { name: "Серебро", hours: "от 25 часов", cashback: "5%", birthdayBonus: "100", color: "#B9C2CA" },
  { name: "Золото", hours: "от 90 часов", cashback: "7%", birthdayBonus: "200", color: "#E6B84D" },
  { name: "Платина", hours: "от 350 часов", cashback: "10%", birthdayBonus: "300", shopDiscount: "5% в магазине", color: "#8FBDCD" },
  { name: "Бриллиант", hours: "от 604 часов", cashback: "20%", birthdayBonus: "400", shopDiscount: "10% в магазине", color: "#FF2E63" },
];

const topUpBonuses = [
  { bonus: "+100", balance: "1 000-1 999 ₽", access: "Серебро, Золото, Платина, Бриллиант" },
  { bonus: "+250", balance: "2 000-2 999 ₽", access: "Золото, Платина, Бриллиант" },
  { bonus: "+350", balance: "3 000-9 000 ₽", access: "Платина, Бриллиант" },
];

const referralSteps = [
  {
    icon: Copy,
    title: "Возьми промокод",
    text: "Зайди в личный кабинет на ПК в клубе, открой раздел «Пригласить друга» и скопируй свой уникальный код.",
  },
  {
    icon: UserPlus,
    title: "Друг получает 800",
    text: "400 стандартных бонусов за регистрацию и ещё 400 бонусов за твой промокод. Всего 800 на старт.",
  },
  {
    icon: Percent,
    title: "Ты получаешь 5%",
    text: "Пять процентов от всех пополнений друга начисляются тебе бонусами всегда. Пополнение на 1 000 ₽ принесёт тебе 50 бонусов.",
  },
];

const bookingFormats = [
  {
    src: "/zones/common-6.webp",
    alt: "Общий игровой зал CyberX Новокосино",
    label: "Общий зал",
    href: "/#zones",
  },
  {
    src: "/zones/ps5-1.webp",
    alt: "Две гостьи играют на PlayStation 5 в CyberX Новокосино",
    label: "PlayStation 5",
    href: "/prices",
  },
  {
    src: "/zones/sim-1.webp",
    alt: "Автосимулятор DRIVE X с рулём и двумя экранами",
    label: "DRIVE X",
    href: "/simracing",
  },
];

const faqs = [
  {
    question: "Как получить 400 бонусов CyberX?",
    answer:
      "Зарегистрируйтесь в приложении CyberX и выберите CyberX Новокосино. После регистрации на бонусный баланс сразу начисляются 400 бонусов.",
  },
  {
    question: "Можно ли потратить бонусы в первый визит?",
    answer:
      "Да. Бонусы доступны сразу после регистрации. 1 бонус равен 1 рублю, ими можно оплатить до 20% стоимости игрового времени. На DRIVE X бонусы не действуют.",
  },
  {
    question: "Как работают группы гостей и кэшбэк?",
    answer:
      "После каждой игровой сессии растет ваш уровень Киберкэш. Бронза действует до 24 часов, Серебро с 25, Золото с 90, Платина с 350, Бриллиант с 604 часов. Кэшбэк растет от 3% до 20%, а бонус на день рождения от 0 до 400 бонусов.",
  },
  {
    question: "Какие автобонусы начисляются при пополнении?",
    answer:
      "Для подходящих групп гостей бонусы начисляются автоматически: +100 при пополнении от 1 000 ₽, +250 от 2 000 ₽ и +350 от 3 000 ₽. Точный уровень и диапазон пополнения указаны в таблице на странице.",
  },
  {
    question: "Как получить 800 бонусов по промокоду друга?",
    answer:
      "Новый гость получает 400 стандартных бонусов за регистрацию и ещё 400 после ввода уникального кода друга. Всего 800 бонусов на старт. Код находится в личном кабинете пригласившего гостя на ПК клуба, в разделе «Пригласить друга».",
  },
  {
    question: "Что получает тот, кто пригласил друга?",
    answer:
      "Пригласившему гостю всегда начисляются 5% бонусами от всех пополнений друга. Например, при пополнении на 1 000 ₽ вы получите 50 бонусов.",
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: [0.98, 1], y: [6, 0] }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function PromoLanding() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden bg-[#070707] text-white">
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-24 md:px-10 md:pb-28 md:pt-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_22%,rgba(255,46,99,0.18),transparent_28%),radial-gradient(circle_at_8%_80%,rgba(0,240,255,0.1),transparent_25%)]" />

        <div className="mx-auto grid max-w-[1760px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-7 flex items-stretch gap-4">
              <span className="w-[5px] shrink-0 -skew-y-12 bg-[#FF2E63]" aria-hidden="true" />
              <div>
                <span className="block font-tactic text-lg font-black uppercase italic leading-none text-white">Бонус новичка</span>
                <span className="mt-1 block font-chakra text-xs font-bold text-white/45">CyberX Новокосино</span>
              </div>
            </div>
            <h1 className="max-w-xl font-tactic text-[clamp(2.75rem,14vw,3rem)] font-black uppercase italic leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              400 бонусов
              <span className="block text-[#FF2E63]">в подарок.</span>
            </h1>
            <p className="mt-6 max-w-lg font-chakra text-base font-medium leading-relaxed text-white/65 md:text-lg">
              Зарегистрируйтесь в приложении, получите 400 бонусов и сразу используйте их для игровых визитов.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <AppStoreLink className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF2E63] py-2 pl-6 pr-2 font-tactic text-sm font-black uppercase italic tracking-wide text-[#090909] transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707] active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none">
                <Smartphone size={19} />
                Скачать приложение
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/15 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowRight size={17} />
                </span>
              </AppStoreLink>
              <Link
                href="/prices"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white/[0.045] px-6 font-tactic text-sm font-black uppercase italic tracking-wide text-white ring-1 ring-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-white/[0.1] hover:ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none"
              >
                Смотреть зоны и цены
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-[32px] bg-white/[0.045] p-1.5 ring-1 ring-white/10">
              <AppStoreLink className="group relative block overflow-hidden rounded-[26px] bg-[#101010] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]">
                <div className="relative aspect-[1.2] overflow-hidden">
                  <Image
                    src="/images/promo/hero-bonus-app-v2.webp"
                    alt="Два друга получают бонус и выбирают игровое место в приложении CyberX"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] motion-reduce:transform-none"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.02)_34%,rgba(7,7,7,0.9)_100%)]" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-5 font-tactic text-[7rem] font-black italic leading-none text-transparent opacity-25 [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] sm:text-[10rem]"
                  >
                    400
                  </span>
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                    <p className="max-w-md font-tactic text-3xl font-black uppercase italic leading-[1.02] text-white md:text-4xl">Заберите бонус и выберите место</p>
                    <span className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 font-tactic text-[11px] font-black uppercase italic tracking-wide text-[#090909] transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      Скачать CyberX
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-[#101010] p-3 md:gap-4 md:p-5">
                  <div>
                    <span className="block font-chakra text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">1 бонус</span>
                    <strong className="font-tactic text-xl font-black italic text-white">1 ₽</strong>
                  </div>
                  <div>
                    <span className="block font-chakra text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">Оплата</span>
                    <strong className="font-tactic text-xl font-black italic text-white">до 20%</strong>
                  </div>
                  <div>
                    <span className="block font-chakra text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">Кэшбэк</span>
                    <strong className="font-tactic text-xl font-black italic text-[#FF2E63]">до 20%</strong>
                  </div>
                </div>
              </AppStoreLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1760px]">
          <Reveal className="max-w-3xl">
            <h2 className="font-tactic text-4xl font-black uppercase italic leading-[1.02] md:text-6xl">
              От регистрации до первой брони
            </h2>
            <p className="mt-5 font-chakra text-base leading-relaxed text-white/65 md:text-lg">
              Никаких лишних действий: каждый этап открывает следующий. Бонусы поступают на баланс сразу после регистрации.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 sm:grid-cols-2 xl:mt-16 xl:grid-cols-4">
            {activationSteps.map((step, index) => {
              const Icon = step.icon;
              const isBonusStep = index === 1;

              return (
                <Reveal key={step.title} delay={index * 0.06} className="h-full">
                  <article className={`group relative flex h-full min-h-[260px] flex-col overflow-hidden p-6 transition-colors md:min-h-[300px] md:p-8 ${isBonusStep ? "bg-[#FF2E63] text-[#090909]" : "bg-[#0d0d0d] text-white hover:bg-[#121212]"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center border [clip-path:polygon(0_0,100%_0,100%_72%,72%_100%,0_100%)] ${isBonusStep ? "border-black/20 bg-black/10" : "border-[#FF2E63]/35 bg-[#FF2E63]/10 text-[#FF2E63]"}`}>
                        <Icon size={21} />
                      </div>
                    </div>
                    <div className="mt-9">
                      <h3 className="text-balance font-tactic text-2xl font-black uppercase italic leading-none md:text-3xl">{step.title}</h3>
                      <p className={`mt-4 max-w-sm font-chakra text-sm leading-relaxed md:text-base ${isBonusStep ? "text-black/70" : "text-white/65"}`}>{step.text}</p>
                    </div>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                      {isBonusStep ? (
                        <div>
                          <span className="block font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-black/55">На баланс</span>
                          <strong className="mt-1 block font-tactic text-5xl font-black italic leading-none text-[#090909]">400 ₽</strong>
                        </div>
                      ) : null}
                      <span className={`ml-auto flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 motion-reduce:transform-none ${isBonusStep ? "bg-[#090909] text-white" : "bg-white/[0.06] text-[#FF2E63]"}`}>
                        <ArrowRight size={17} />
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8">
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.035] p-5 ring-1 ring-white/10">
              <ShieldCheck className="mt-0.5 shrink-0 text-[#FF2E63]" size={19} />
              <p className="font-chakra text-sm leading-relaxed text-white/65">
                1 бонус = 1 ₽. Бонусами можно оплатить до 20% игрового времени. DRIVE X оплачивается только основным балансом.{" "}
                <Link href="/simracing" className="font-bold text-white underline decoration-[#FF2E63] underline-offset-4 transition-colors hover:text-[#00F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]">
                  Подробнее о DRIVE X
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <div className="relative overflow-hidden rounded-[16px] border border-white/10 bg-[#090909]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_24%,rgba(0,240,255,0.15),transparent_23%),radial-gradient(circle_at_63%_76%,rgba(255,46,99,0.25),transparent_31%)]" />
              <div className="pointer-events-none absolute right-[8%] top-16 h-px w-56 rotate-[34deg] bg-[#FF2E63]/55" />
              <div className="pointer-events-none absolute right-[2%] top-32 h-px w-40 -rotate-[18deg] bg-[#FF2E63]/30" />

              <div className="relative grid lg:grid-cols-[0.78fr_1.22fr]">
                <div className="relative z-10 flex min-h-[520px] flex-col justify-center p-7 sm:p-10 lg:min-h-[650px] lg:p-14 xl:p-16">
                  <h3 className="max-w-2xl text-balance font-tactic text-4xl font-black uppercase italic leading-[1.02] text-white sm:text-5xl xl:text-6xl">
                    Выберите место заранее
                  </h3>
                  <p className="mt-5 max-w-xl font-chakra text-sm leading-relaxed text-white/70 sm:text-base">
                    Откройте CyberX Новокосино, выберите дату, свободное место и время. После регистрации на балансе будут 400 бонусов. Ими можно оплатить до 20% игры.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:translate-y-0 motion-reduce:transform-none">
                      <Smartphone size={17} />
                      Установить CyberX
                      <ArrowRight size={16} />
                    </AppStoreLink>
                    <Link
                      href="/#zones"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.055] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/10 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                    >
                      Посмотреть игровые зоны
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6">
                    <div>
                      <strong className="font-tactic text-3xl font-black italic text-[#FF2E63]">400</strong>
                      <span className="ml-2 font-chakra text-xs font-bold text-white/55">бонусов после регистрации</span>
                    </div>
                    <div>
                      <strong className="font-tactic text-3xl font-black italic text-white">24/7</strong>
                      <span className="ml-2 font-chakra text-xs font-bold text-white/55">бронь доступна всегда</span>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[560px] overflow-hidden lg:min-h-[650px]">
                  <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[#FF2E63]" />
                  <div className="absolute right-5 top-10 hidden aspect-[1.45] w-[58%] overflow-hidden rounded-[16px] border border-white/15 sm:block lg:right-10 lg:top-14">
                    <Image
                      src="/images/promo/bonus-app-v2.webp"
                      alt="Гость CyberX показывает бонус в приложении"
                      fill
                      sizes="(max-width: 1024px) 55vw, 42vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/28" />
                  </div>
                  <div className="absolute bottom-[-96px] left-1/2 z-10 -translate-x-1/2 lg:bottom-[-120px]">
                    <Image
                      src="/popup.webp"
                      alt="Экран выбора времени бронирования в приложении CyberX Новокосино"
                      width={1680}
                      height={3232}
                      sizes="(max-width: 1024px) 82vw, 36vw"
                      className="h-[650px] w-auto max-w-none lg:h-[790px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate px-4 py-16 md:px-10 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_50%,rgba(255,46,99,0.12),transparent_30%),radial-gradient(circle_at_82%_45%,rgba(0,240,255,0.08),transparent_28%)]" />
        <div className="mx-auto max-w-[1760px] overflow-hidden rounded-[16px] border border-white/10 bg-[#0b0b0d]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal className="relative min-h-[390px] overflow-hidden lg:min-h-full">
              <Image
                src="/images/promo/referral-friends-v2.webp"
                alt="Два друга обсуждают реферальный бонус CyberX в игровом клубе"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[58%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.03)_35%,rgba(7,7,7,0.82)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,7,7,0.04)_45%,rgba(11,11,13,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-5 bg-[#FF2E63] p-5 text-[#090909] md:p-7">
                <strong className="font-tactic text-3xl font-black uppercase italic leading-none sm:text-4xl">400 + 400 = 800</strong>
                <Infinity className="shrink-0" size={38} strokeWidth={2.4} aria-hidden="true" />
              </div>
            </Reveal>

            <div className="relative p-6 md:p-9 lg:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 bg-[#FF2E63]/10 blur-[70px]" />
              <Infinity className="pointer-events-none absolute right-6 top-5 h-32 w-32 text-white/[0.035]" aria-hidden="true" />
              <Reveal>
                <h2 className="max-w-2xl font-tactic text-4xl font-black uppercase italic leading-[1.02] md:text-6xl">
                  Приведи друга.
                  <span className="block text-[#FF2E63]">Выгодно обоим.</span>
                </h2>
                <p className="mt-5 max-w-xl font-chakra text-base leading-relaxed text-white/65">
                  Играйте вместе: друг начинает с 800 бонусов, а ты получаешь бонусы с каждого его пополнения.
                </p>
              </Reveal>

              <div className="mt-8 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.025]">
                {referralSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <Reveal key={step.title} delay={index * 0.06}>
                      <article className={`group grid grid-cols-[42px_minmax(0,1fr)] gap-4 p-4 transition duration-300 hover:bg-[#FF2E63]/[0.055] md:grid-cols-[48px_minmax(0,1fr)] md:p-5 ${index < referralSteps.length - 1 ? "border-b border-white/10" : ""}`}>
                        <div className="flex h-10 w-10 items-center justify-center border border-[#FF2E63]/30 bg-[#FF2E63]/10 text-[#FF2E63] [clip-path:polygon(0_0,100%_0,100%_72%,72%_100%,0_100%)] md:h-12 md:w-12">
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <div>
                            <h3 className="font-tactic text-base font-black uppercase italic leading-tight text-white sm:text-xl md:text-2xl">{step.title}</h3>
                          </div>
                          <p className="mt-2 font-chakra text-sm leading-relaxed text-white/60">{step.text}</p>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal className="mt-5">
                <div className="flex flex-col gap-3 rounded-[18px] border border-[#00F0FF]/25 bg-[#00F0FF]/[0.055] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="shrink-0 text-[#00F0FF]" size={22} />
                    <p className="font-chakra text-sm font-bold leading-relaxed text-white/80">Код находится в личном кабинете на ПК клуба</p>
                  </div>
                  <strong className="shrink-0 font-tactic text-2xl font-black uppercase italic text-[#00F0FF]">5% всегда</strong>
                </div>
              </Reveal>

              <Reveal className="mt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:translate-y-0 motion-reduce:transform-none">
                    <Smartphone size={17} />
                    Есть код друга? Скачать CyberX
                    <ArrowRight size={16} />
                  </AppStoreLink>
                  <Link
                    href="/#zones"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.055] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/10 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    Зона для игры вдвоём
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1760px]">
          <Reveal className="max-w-4xl">
            <h2 className="font-tactic text-2xl font-black uppercase italic leading-[1.02] sm:text-4xl md:text-6xl">
              Играете больше.
              <span className="block text-[#FF2E63]">Возвращается больше.</span>
            </h2>
            <p className="mt-5 font-chakra text-base leading-relaxed text-white/65 md:text-lg">
              Кэшбэк начисляется после игровых сессий. Уровень растет по суммарному времени в клубе, без сложных условий и ручных заявок.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="relative min-h-[560px] overflow-hidden rounded-[16px] border border-white/10 bg-[#0d0d0d] sm:min-h-[430px]">
              <Image
                src="/images/promo/loyalty-topup-v2.webp"
                alt="Гость CyberX пополняет игровой баланс через мобильное приложение"
                fill
                sizes="(max-width: 640px) 100vw, 1400px"
                className="object-cover object-[34%_center] sm:object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.04)_14%,rgba(7,7,7,0.94)_66%,#070707_100%)] sm:bg-[linear-gradient(270deg,rgba(7,7,7,0.98)_0%,rgba(7,7,7,0.84)_42%,rgba(7,7,7,0.06)_76%)]" />
              <div className="relative flex min-h-[560px] items-end p-6 sm:min-h-[430px] sm:items-center sm:justify-end sm:p-10">
                <div className="max-w-lg sm:w-[46%]">
                  <h3 className="text-balance font-tactic text-3xl font-black uppercase italic leading-[1.02] text-white md:text-4xl xl:text-5xl">
                    Ваш Киберкэш всегда под рукой
                  </h3>
                  <p className="mt-4 font-chakra text-sm leading-relaxed text-white/75 sm:text-base">
                    Пополняйте баланс через CyberX: подходящий автобонус начислится автоматически, а следующую игру можно забронировать сразу.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 xl:flex-row xl:flex-wrap">
                    <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:translate-y-0 motion-reduce:transform-none">
                      <Smartphone size={17} />
                      Скачать CyberX
                      <ArrowRight size={16} />
                    </AppStoreLink>
                    <Link
                      href="/prices"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black/55 px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/20 transition hover:bg-white/10 hover:ring-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                    >
                      Цены и пакеты
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12">
            {loyaltyLevels.map((level, index) => {
              const isDiamond = index === loyaltyLevels.length - 1;

              return (
                <Reveal
                  key={level.name}
                  delay={index * 0.05}
                  className={`h-full ${isDiamond ? "sm:col-span-2 lg:col-span-4 xl:col-span-4" : "lg:col-span-2 xl:col-span-2"}`}
                >
                  <article
                    className={`group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[16px] border p-5 transition duration-300 hover:-translate-y-1 motion-reduce:transform-none md:p-6 ${isDiamond ? "sm:min-h-[275px]" : ""}`}
                    style={{
                      borderColor: `${level.color}${isDiamond ? "99" : "66"}`,
                      background: isDiamond
                        ? `linear-gradient(145deg, ${level.color}38 0%, #1a1015 42%, #090909 100%)`
                        : `linear-gradient(145deg, ${level.color}1f 0%, #111111 46%, #090909 100%)`,
                    }}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl" style={{ background: level.color }} />
                    <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: level.color }} />

                    <div className="relative">
                      <div>
                        <span className="font-chakra text-xs font-black uppercase tracking-[0.13em]" style={{ color: level.color }}>{level.name}</span>
                      </div>
                    </div>

                    <div className={`relative mt-7 flex gap-4 ${isDiamond ? "items-end justify-between" : "flex-col"}`}>
                      <div>
                        <strong className={`block font-tactic font-black italic leading-none text-white ${isDiamond ? "text-7xl sm:text-8xl" : "text-5xl"}`}>{level.cashback}</strong>
                        <span className="mt-2 block font-chakra text-xs font-bold text-white/55">кэшбэк с каждой игры</span>
                      </div>
                      <span className={`self-start rounded-full px-3 py-1.5 font-chakra text-[10px] font-black uppercase tracking-wide ${isDiamond ? "bg-[#FF2E63] text-[#090909]" : "bg-white/[0.055] text-white/75 ring-1 ring-white/10"}`}>
                        {level.hours}
                      </span>
                    </div>

                    <div className="relative mt-auto pt-7">
                      <div className="flex flex-wrap gap-2">
                        {level.birthdayBonus ? (
                          <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/[0.055] px-3 font-chakra text-[10px] font-bold text-white/80 ring-1 ring-white/10">
                            <Gift size={13} style={{ color: level.color }} />
                            +{level.birthdayBonus} на день рождения
                          </span>
                        ) : (
                          <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/[0.055] px-3 font-chakra text-[10px] font-bold text-white/70 ring-1 ring-white/10">
                            <BadgeCheck size={13} style={{ color: level.color }} />
                            С первого визита
                          </span>
                        )}
                        {level.shopDiscount && (
                          <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/[0.055] px-3 font-chakra text-[10px] font-bold text-white/80 ring-1 ring-white/10">
                            <ShoppingBag size={13} style={{ color: level.color }} />
                            {level.shopDiscount}
                          </span>
                        )}
                      </div>

                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8">
            <div className="rounded-[16px] border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="flex items-center gap-3 font-tactic text-2xl font-black uppercase italic text-white md:text-3xl">
                    <CircleDollarSign size={24} className="text-[#FF2E63]" />
                    Автобонусы за пополнение
                  </h3>
                  <p className="mt-3 max-w-2xl font-chakra text-sm leading-relaxed text-white/60">
                    Пополняйте баланс через личный кабинет, приложение, терминал или у администратора. При подходящем уровне гостя бонусы начисляются автоматически, промокод не нужен.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 lg:grid-cols-[0.85fr_1fr_1.2fr]">
                {topUpBonuses.map((item, index) => (
                  <article key={item.bonus} className={`bg-[#111111] p-5 md:p-6 ${index === topUpBonuses.length - 1 ? "bg-[linear-gradient(135deg,rgba(255,46,99,0.16),#111111_65%)]" : ""}`}>
                    <span className="font-tactic text-4xl font-black italic text-[#FF2E63]">{item.bonus}</span>
                    <span className="ml-1 font-chakra text-xs font-bold uppercase text-white/55">бонусов</span>
                    <strong className="mt-5 block font-tactic text-lg font-black uppercase italic text-white">{item.balance}</strong>
                    <span className="mt-2 block font-chakra text-xs leading-relaxed text-white/60">{item.access}</span>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <Reveal>
            <div className="relative aspect-[1.1] overflow-hidden rounded-[28px] border border-white/10">
              <Image
                src="/zones/solo-premium-2.webp"
                alt="Игровое место Solo Premium с компьютером и креслом в CyberX Новокосино"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,7,7,0.9))]" />
              <div className="absolute bottom-0 p-6 md:p-8">
                <p className="font-tactic text-3xl font-black uppercase italic leading-none text-white md:text-4xl">Ваш аккаунт выбирает формат игры</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d]">
              <div className="p-7 md:p-9 lg:p-10">
                <UsersRound className="text-[#FF2E63]" size={29} />
                <h2 className="mt-7 font-tactic text-4xl font-black uppercase italic leading-none md:text-5xl xl:text-6xl">Бронь в несколько касаний</h2>
                <p className="mt-5 max-w-2xl font-chakra leading-relaxed text-white/65">
                  Общий зал, Bootcamp, Solo Room, PlayStation 5 или автосимулятор. В приложении видно свободные места, а бронь хранится в вашем аккаунте.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <AppStoreLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF2E63] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:translate-y-0 motion-reduce:transform-none">
                    <Smartphone size={17} />
                    Установить и забронировать
                    <ArrowRight size={16} />
                  </AppStoreLink>
                  <Link
                    href="/prices"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.055] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/10 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    Зоны и цены
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="mt-auto grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-3">
                {bookingFormats.map((format) => (
                  <Link
                    key={format.label}
                    href={format.href}
                    className="group relative min-h-[170px] overflow-hidden bg-[#090909] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] sm:min-h-[210px] lg:min-h-[190px] xl:min-h-[230px]"
                  >
                    <Image
                      src={format.src}
                      alt={format.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 motion-reduce:transform-none"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.05)_28%,rgba(7,7,7,0.92)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
                      <span className="font-tactic text-lg font-black uppercase italic text-white">{format.label}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF2E63] text-[#090909] transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <h2 className="font-tactic text-4xl font-black uppercase italic leading-none md:text-5xl">Промокод CyberX и бонусы</h2>
            <p className="mt-5 max-w-md font-chakra leading-relaxed text-white/60">
              Здесь собраны условия первого посещения CyberX Новокосино. Для актуального бонуса достаточно выбрать наш клуб в приложении.
            </p>
            <Link
              href="/contacts"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.055] px-5 font-tactic text-xs font-black uppercase italic tracking-wide text-white ring-1 ring-white/15 transition hover:bg-white/10 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              <MapPin size={17} className="text-[#FF2E63]" />
              Контакты и как добраться
              <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 md:grid-cols-2">
            {faqs.map((item, index) => (
              <Reveal
                key={item.question}
                delay={index * 0.04}
                className={`h-full ${index === 0 || index === faqs.length - 1 ? "md:col-span-2" : ""}`}
              >
                <article className={`h-full bg-[#0d0d0d] p-5 md:p-6 ${index === 0 || index === faqs.length - 1 ? "md:grid md:grid-cols-[0.8fr_1.2fr] md:gap-10" : ""}`}>
                  <h3 className="font-tactic text-xl font-black uppercase italic leading-tight text-white">{item.question}</h3>
                  <p className={`${index === 0 || index === faqs.length - 1 ? "mt-3 md:mt-0" : "mt-3"} font-chakra text-sm leading-relaxed text-white/60`}>{item.answer}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 md:px-10 md:pb-28">
        <Reveal>
          <div className="relative mx-auto min-h-[430px] max-w-[1760px] overflow-hidden rounded-[16px] border border-[#FF2E63]/40 bg-[#090909] sm:min-h-[360px]">
            <Image
              src="/images/promo/promo-team-cta-v2.webp"
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 1400px"
              className="object-cover object-[66%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.12)_0%,rgba(7,7,7,0.95)_68%,#070707_100%)] sm:bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.96)_36%,rgba(7,7,7,0.28)_68%,rgba(7,7,7,0.08)_100%)]" />
            <div className="relative flex min-h-[430px] flex-col justify-end gap-7 p-7 sm:min-h-[360px] sm:max-w-[58%] sm:justify-center md:p-10 lg:flex-row lg:items-center lg:justify-start lg:gap-10">
              <div>
                <h2 className="text-balance font-tactic text-4xl font-black uppercase italic leading-[1.02] md:text-5xl">
                  <span className="text-[#FF2E63]">400 бонусов.</span>
                  <span className="block">Место ждёт вас.</span>
                </h2>
                <p className="mt-4 max-w-xl font-chakra leading-relaxed text-white/75">Зарегистрируйтесь в приложении CyberX, выберите Новокосино и забронируйте удобное место.</p>
              </div>
              <AppStoreLink className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-6 font-tactic text-xs font-black uppercase italic tracking-wide text-[#111] transition duration-200 hover:-translate-y-0.5 hover:bg-[#FF2E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none sm:self-start">
                <Gift size={18} />
                Установить CyberX и забрать 400
              </AppStoreLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
