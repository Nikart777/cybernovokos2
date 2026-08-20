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
  Medal,
  Percent,
  ShoppingBag,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  UserPlus,
  UsersRound,
  WalletCards,
} from "lucide-react";

const appLink = "/download";

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
    icon: WalletCards,
    title: "Используйте сразу",
    text: "Оплатите бонусами часть игрового времени уже в первый визит.",
  },
  {
    icon: Gamepad2,
    title: "Выберите место",
    text: "Бронируйте понравившийся ПК, консоль или приватную комнату.",
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
    text: "400 стандартных бонусов за регистрацию и ещё 400 бонусов за твой промокод — всего 800 на старт.",
  },
  {
    icon: Percent,
    title: "Ты получаешь 5%",
    text: "Пять процентов от всех пополнений друга начисляются тебе бонусами всегда. Пополнение на 1 000 ₽ — это 50 бонусов тебе.",
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
      "Новый гость получает 400 стандартных бонусов за регистрацию и ещё 400 после ввода уникального кода друга — всего 800 бонусов на старт. Код находится в личном кабинете пригласившего гостя на ПК клуба, в разделе «Пригласить друга».",
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
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function PromoLanding() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden bg-[#070707] text-white">
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-28 md:px-10 md:pb-28 md:pt-32">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_22%,rgba(255,46,99,0.18),transparent_28%),radial-gradient(circle_at_8%_80%,rgba(0,240,255,0.1),transparent_25%)]" />
        <div className="absolute inset-0 -z-10 opacity-60 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />

        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FF2E63]/10 px-3 py-1.5 font-chakra text-[10px] font-black uppercase tracking-[0.16em] text-[#FF2E63]">
              <Gift size={16} />
              Первый визит в CyberX Новокосино
            </div>
            <h1 className="max-w-xl font-tactic text-5xl font-black uppercase italic leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              400 бонусов
              <span className="block text-[#FF2E63]">в подарок.</span>
            </h1>
            <p className="mt-6 max-w-lg font-chakra text-base font-medium leading-relaxed text-white/65 md:text-lg">
              Зарегистрируйтесь в приложении, получите 400 бонусов и сразу используйте их для игровых визитов.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={appLink}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF2E63] py-2 pl-6 pr-2 font-tactic text-sm font-black uppercase italic tracking-wide text-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-[#ff4778] active:translate-y-0 active:scale-[0.98]"
              >
                <Smartphone size={19} />
                Скачать приложение
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/15 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowRight size={17} />
                </span>
              </a>
              <Link
                href="/prices"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white/[0.045] px-6 font-tactic text-sm font-black uppercase italic tracking-wide text-white ring-1 ring-white/10 transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-white/[0.1] hover:ring-white/25 active:translate-y-0 active:scale-[0.98]"
              >
                Выбрать устройство
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-[32px] bg-white/[0.045] p-1.5 ring-1 ring-white/10">
              <div className="relative overflow-hidden rounded-[26px] bg-[#101010] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                <div className="relative aspect-[1.2] overflow-hidden">
                  <Image
                    src="/zones/bootcamp-1.webp"
                    alt="Игровые компьютеры CyberX Новокосино"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08),rgba(7,7,7,0.72))]" />
                  <div className="absolute left-5 top-5 rounded-full bg-[#0d0d0d]/75 px-3 py-1.5 font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-white/80">
                    CyberX App
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                    <span className="font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-[#FF2E63]">Первый визит</span>
                    <p className="mt-2 max-w-sm font-tactic text-3xl font-black uppercase italic leading-none text-white md:text-4xl">Бронируйте любимую зону заранее</p>
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3 font-chakra text-xs font-black uppercase tracking-[0.16em] text-[#FF2E63]">
              <Sparkles size={17} />
              Как забрать и использовать бонусы
            </div>
            <h2 className="mt-5 font-tactic text-4xl font-black uppercase italic leading-none md:text-6xl">
              Простой путь до первой брони
            </h2>
            <p className="mt-5 font-chakra text-base leading-relaxed text-white/65 md:text-lg">
              Никаких лишних действий: каждый этап открывает следующий. Бонусы поступают на баланс сразу после регистрации.
            </p>
          </Reveal>

          <div className="relative mt-12 space-y-4 before:absolute before:bottom-8 before:left-[27px] before:top-8 before:w-px before:bg-gradient-to-b before:from-[#FF2E63] before:via-[#FF2E63]/35 before:to-transparent md:mt-16 md:space-y-5 md:before:left-[35px]">
            {activationSteps.map((step, index) => {
              const Icon = step.icon;
              const isBonusStep = index === 1;

              return (
                <Reveal key={step.title} delay={index * 0.06}>
                  <article className={`relative grid grid-cols-[56px_minmax(0,1fr)] gap-4 rounded-[24px] p-1 md:grid-cols-[72px_minmax(0,1fr)] md:gap-6 ${isBonusStep ? "bg-[#FF2E63]/10 ring-1 ring-[#FF2E63]/35" : "bg-white/[0.035] ring-1 ring-white/10"}`}>
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#121012] ring-1 ring-white/15 md:h-[72px] md:w-[72px]">
                      <span className="font-tactic text-xl font-black italic text-[#FF2E63] md:text-2xl">0{index + 1}</span>
                    </div>
                    <div className="min-w-0 rounded-[20px] bg-[#0d0d0d] p-5 md:flex md:items-center md:justify-between md:gap-8 md:p-7">
                      <div>
                        <div className="flex items-center gap-3">
                          <Icon className="text-[#FF2E63]" size={20} />
                          <h3 className="font-tactic text-xl font-black uppercase italic leading-tight text-white md:text-2xl">{step.title}</h3>
                        </div>
                        <p className="mt-3 max-w-2xl font-chakra text-sm leading-relaxed text-white/60 md:text-base">{step.text}</p>
                      </div>
                      {isBonusStep && (
                        <div className="mt-5 shrink-0 rounded-2xl bg-[#FF2E63] px-5 py-3 text-center md:mt-0">
                          <span className="block font-chakra text-[9px] font-black uppercase tracking-[0.15em] text-white/70">Подарок</span>
                          <strong className="font-tactic text-3xl font-black italic text-white">400 ₽</strong>
                        </div>
                      )}
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
                1 бонус = 1 ₽. Бонусами можно оплатить до 20% игрового времени. DRIVE X оплачивается только основным балансом.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate px-4 py-16 md:px-10 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_50%,rgba(255,46,99,0.12),transparent_30%),radial-gradient(circle_at_82%_45%,rgba(0,240,255,0.08),transparent_28%)]" />
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0d] shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal className="relative min-h-[390px] overflow-hidden lg:min-h-full">
              <Image
                src="/images/promo/referral-friends.webp"
                alt="Два друга получают бонусы по реферальной программе CyberX"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[58%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.03)_35%,rgba(7,7,7,0.82)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,7,7,0.04)_45%,rgba(11,11,13,0.92)_100%)]" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 md:bottom-7 md:left-7 md:right-7">
                <div className="rounded-2xl border border-white/15 bg-black/55 px-4 py-3 backdrop-blur-xl">
                  <span className="block font-chakra text-[9px] font-black uppercase tracking-[0.16em] text-white/50">Другу на старт</span>
                  <strong className="mt-1 block font-tactic text-3xl font-black italic leading-none text-white">400 + 400 = <span className="text-[#FF2E63]">800</span></strong>
                </div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] backdrop-blur-xl">
                  <Infinity size={30} strokeWidth={2.4} />
                </div>
              </div>
            </Reveal>

            <div className="relative p-6 md:p-9 lg:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 bg-[#FF2E63]/10 blur-[70px]" />
              <Reveal>
                <div className="flex items-center gap-3 font-chakra text-xs font-black uppercase tracking-[0.16em] text-[#00F0FF]">
                  <UsersRound size={17} />
                  Реферальная программа
                </div>
                <h2 className="mt-5 max-w-2xl font-tactic text-4xl font-black uppercase italic leading-[0.96] md:text-6xl">
                  Приведи друга.
                  <span className="block text-[#FF2E63]">Выгодно обоим.</span>
                </h2>
                <p className="mt-5 max-w-xl font-chakra text-base leading-relaxed text-white/65">
                  Играйте вместе: друг начинает с 800 бонусов, а ты получаешь бонусы с каждого его пополнения.
                </p>
              </Reveal>

              <div className="mt-8 space-y-3">
                {referralSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <Reveal key={step.title} delay={index * 0.06}>
                      <article className="group grid grid-cols-[42px_minmax(0,1fr)] gap-4 rounded-[18px] border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:border-[#FF2E63]/35 hover:bg-[#FF2E63]/[0.055] md:grid-cols-[48px_minmax(0,1fr)] md:p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF2E63]/10 text-[#FF2E63] ring-1 ring-[#FF2E63]/20 md:h-12 md:w-12">
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <div>
                            <h3 className="font-tactic text-xl font-black uppercase italic leading-tight text-white md:text-2xl">{step.title}</h3>
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
                    <p className="font-chakra text-sm font-bold leading-relaxed text-white/80">Код — в личном кабинете на ПК клуба</p>
                  </div>
                  <strong className="shrink-0 font-tactic text-2xl font-black uppercase italic text-[#00F0FF]">5% всегда</strong>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="max-w-3xl">
            <div className="flex items-center gap-3 font-chakra text-xs font-black uppercase tracking-[0.16em] text-[#FF2E63]">
              <Medal size={17} />
              Группы гостей Киберкэш
            </div>
            <h2 className="mt-5 font-tactic text-4xl font-black uppercase italic leading-none md:text-6xl">
              Играете больше, возвращается больше
            </h2>
            <p className="mt-5 font-chakra text-base leading-relaxed text-white/65 md:text-lg">
              Кэшбэк начисляется после игровых сессий. Уровень растет по суммарному времени в клубе, без сложных условий и ручных заявок.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 md:grid-cols-5">
            {loyaltyLevels.map((level, index) => (
              <Reveal key={level.name} delay={index * 0.05}>
                <article className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#101010] p-5 transition duration-300 hover:-translate-y-1" style={{ borderColor: `${level.color}66` }}>
                  <div className="absolute right-0 top-0 h-16 w-16 opacity-20 blur-2xl" style={{ background: level.color }} />
                  <span className="font-chakra text-[10px] font-black uppercase tracking-[0.15em]" style={{ color: level.color }}>{level.name}</span>
                  <strong className="mt-7 block font-tactic text-4xl font-black italic text-white">{level.cashback}</strong>
                  <span className="mt-1 block font-chakra text-xs font-bold text-white/45">кэшбэк с игры</span>
                  {level.shopDiscount && (
                    <span className="mt-4 flex items-center gap-1.5 font-chakra text-[10px] font-black uppercase tracking-wide text-white/85">
                      <ShoppingBag size={13} style={{ color: level.color }} />
                      {level.shopDiscount}
                    </span>
                  )}
                  <span className="mt-6 block font-chakra text-xs text-white/65">{level.hours}</span>
                  {level.birthdayBonus && (
                    <span className="mt-2 block font-chakra text-xs text-white/45">день рождения: +{level.birthdayBonus} бонусов</span>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="rounded-[24px] border border-white/10 bg-[#0d0d0d] p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="flex items-center gap-3 font-chakra text-xs font-black uppercase tracking-[0.16em] text-[#FF2E63]">
                    <CircleDollarSign size={17} />
                    Автобонусы за пополнение
                  </div>
                  <p className="mt-3 max-w-2xl font-chakra text-sm leading-relaxed text-white/60">
                    Пополняйте баланс через личный кабинет, приложение, терминал или у администратора. При подходящем уровне гостя бонусы начисляются автоматически.
                  </p>
                </div>
                <div className="flex items-center gap-2 font-chakra text-xs font-bold text-white/55">
                  <Sparkles size={16} className="text-[#FF2E63]" />
                  Бонусы приходят на баланс без промокода
                </div>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {topUpBonuses.map((item) => (
                  <article key={item.bonus} className="rounded-[18px] border border-white/10 bg-white/[0.035] p-5">
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
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[1.1] overflow-hidden rounded-[28px] border border-white/10">
              <Image
                src="/zones/solo-premium-2.webp"
                alt="Приватная игровая зона CyberX Новокосино"
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
          <Reveal delay={0.08}>
            <div className="rounded-[24px] border border-white/10 bg-[#0d0d0d] p-7 md:p-9">
              <UsersRound className="text-[#FF2E63]" size={29} />
              <h2 className="mt-7 font-tactic text-4xl font-black uppercase italic leading-none md:text-5xl">Бронь в несколько касаний</h2>
              <p className="mt-5 font-chakra leading-relaxed text-white/65">
                Общий зал, Bootcamp, Solo Room, PlayStation 5 или автосимулятор. В приложении видно свободные места, а бронь хранится в вашем аккаунте.
              </p>
              <Link href="/prices" className="mt-8 inline-flex items-center gap-2 font-tactic text-sm font-black uppercase italic tracking-wide text-[#FF2E63] transition hover:text-white">
                Посмотреть зоны и цены
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <h2 className="font-tactic text-4xl font-black uppercase italic leading-none md:text-5xl">Промокод CyberX и бонусы</h2>
            <p className="mt-5 max-w-md font-chakra leading-relaxed text-white/60">
              Здесь собраны условия первого посещения CyberX Новокосино. Для актуального бонуса достаточно выбрать наш клуб в приложении.
            </p>
          </Reveal>
          <div className="grid gap-3">
            {faqs.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.04}>
                <article className="rounded-[20px] border border-white/10 bg-white/[0.035] p-5 md:p-6">
                  <h3 className="font-tactic text-xl font-black uppercase italic leading-tight text-white">{item.question}</h3>
                  <p className="mt-3 font-chakra text-sm leading-relaxed text-white/60">{item.answer}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 md:px-10 md:pb-28">
        <Reveal>
          <div className="mx-auto flex max-w-[1400px] flex-col gap-7 rounded-[28px] border border-[#FF2E63]/40 bg-[linear-gradient(118deg,#211018,#100d10_58%,#151010)] p-7 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <div className="flex items-center gap-2 font-chakra text-xs font-black uppercase tracking-[0.15em] text-[#FF2E63]">
                <CircleDollarSign size={17} />
                Первый визит начинается здесь
              </div>
              <h2 className="mt-4 font-tactic text-4xl font-black uppercase italic leading-none md:text-5xl">400 бонусов уже ждут</h2>
              <p className="mt-4 max-w-xl font-chakra leading-relaxed text-white/65">Зарегистрируйтесь в приложении CyberX, выберите Новокосино и забронируйте удобное место.</p>
            </div>
            <a
              href={appLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-7 font-tactic text-sm font-black uppercase italic tracking-wide text-[#111] transition duration-200 hover:-translate-y-0.5 hover:bg-[#FF2E63] hover:text-white active:translate-y-0 active:scale-[0.98]"
            >
              <Gift size={18} />
              Забрать бонусы
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
