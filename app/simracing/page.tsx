import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Phone, Plus } from "lucide-react";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import SimracingClient from "./SimracingClient";
import SimracingTariffs from "./SimracingTariffs";
import SimracingReviews from "./SimracingReviews";
import SimracingGames from "./SimracingGames";
import SimracingVideo from "./SimracingVideo";
import {
  BookingButton,
  CockpitGallery,
  Reveal,
  SimracingMobileBar,
  SimracingHeader,
} from "./SimracingControls";
import {
  SIMRACING_FAQ,
  SIMRACING_TARIFFS,
  SIMRACING_URL,
} from "./simracingData";
import { CYBERX_SERVER_GAMES } from "./catalogData";
import {
  RaceDivider,
  RaceFlag,
  StartLights,
  TrackOutline,
} from "./RacingMarks";
import "./simracing.css";

const title = "Автосимуляторы и симрейсинг в Москве | CyberX Новокосино";
const description =
  "Симрейсинг в Москве: 4 автосимулятора MOZA R12 Direct Drive, экран 55″ 4K, гонки с друзьями и 26 собственных серверов. От 580 ₽/час. Новокосинская, 32. Круглосуточно.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "автосимуляторы Москва",
    "симрейсинг Москва",
    "автосимулятор Новокосино",
    "гоночный симулятор",
    "симрейсинг клуб",
    "поиграть на руле Москва",
    "Assetto Corsa",
    "BeamNG.drive",
  ],
  alternates: { canonical: SIMRACING_URL },
  openGraph: {
    title,
    description,
    url: SIMRACING_URL,
    siteName: "CyberX Новокосино",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/racing/editorial/simracing-og.jpg",
        width: 1200,
        height: 630,
        alt: "Автосимуляторы CyberX в Москве, Новокосино",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/racing/editorial/simracing-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0c0f",
};
export const dynamic = "force-static";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SIMRACING_URL}#webpage`,
      url: SIMRACING_URL,
      name: title,
      description,
      inLanguage: "ru-RU",
      about: { "@id": `${SIMRACING_URL}#service` },
      breadcrumb: { "@id": `${SIMRACING_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SIMRACING_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: "https://cyberx-novokosino.ru/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Автосимуляторы и симрейсинг",
          item: SIMRACING_URL,
        },
      ],
    },
    {
      "@type": "SportsActivityLocation",
      "@id": `${SIMRACING_URL}#location`,
      name: "Симрейсинг CyberX Новокосино",
      url: SIMRACING_URL,
      image: "https://cyberx-novokosino.ru/zones/sim-5.webp",
      telephone: "+79851289538",
      priceRange: "580-2400 RUB",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Новокосинская ул., 32, этаж 2",
        addressLocality: "Москва",
        postalCode: "111672",
        addressCountry: "RU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.741887,
        longitude: 37.867172,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": `${SIMRACING_URL}#service`,
      name: "Заезды на автосимуляторах в Москве",
      serviceType: "Симрейсинг на гоночных автосимуляторах",
      provider: { "@id": `${SIMRACING_URL}#location` },
      areaServed: { "@type": "City", name: "Москва" },
      description:
        "Четыре гоночных кокпита MOZA R12 Direct Drive, педали Load Cell, 55-дюймовые 4K-экраны, заезды одному и с друзьями.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Тарифы автосимуляторов",
        itemListElement: SIMRACING_TARIFFS.flatMap((tariff) => [
          {
            "@type": "Offer",
            name: `${tariff.time}, будни`,
            price: tariff.week,
            priceCurrency: "RUB",
            url: `${SIMRACING_URL}#tariffs`,
            description:
              "Стоимость за один кокпит. Настройка посадки включена.",
            itemOffered: {
              "@type": "Service",
              name: `Автосимулятор: ${tariff.time}`,
            },
          },
          {
            "@type": "Offer",
            name: `${tariff.time}, выходные`,
            price: tariff.end,
            priceCurrency: "RUB",
            url: `${SIMRACING_URL}#tariffs`,
            description:
              "За один кокпит. С 17:00 пятницы до 22:00 воскресенья.",
            itemOffered: {
              "@type": "Service",
              name: `Автосимулятор: ${tariff.time}`,
            },
          },
        ]),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SIMRACING_URL}#faq`,
      mainEntity: SIMRACING_FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function SimracingPage() {
  const serverCount = CYBERX_SERVER_GAMES.reduce(
    (sum, game) => sum + game.rooms.length,
    0,
  );
  return (
    <div className="sr-page">
      <SchemaMarkup schema={schema} />
      <SimracingHeader />
      <main id="simracing-content">
        <section
          aria-labelledby="simracing-heading"
          className="sr-race-hero relative isolate mt-[72px] min-h-[640px] overflow-hidden md:min-h-[670px] lg:min-h-[min(760px,calc(100svh-72px))]"
        >
          <div className="absolute inset-0 -z-20 md:left-[24%]">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/racing/editorial/cockpit-1-mobile.avif"
              />
              <Image
                src="/racing/editorial/cockpit-1-1280.avif"
                alt="Реальные автосимуляторы CyberX Новокосино: руль MOZA, гоночный кокпит и большой экран"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 76vw"
                className="sr-hero-photo object-cover"
              />
            </picture>
          </div>
          <div className="sr-hero-shade absolute inset-0 -z-10" />
          <div className="sr-hero-livery" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <StartLights />
          <div className="sr-container flex min-h-[640px] flex-col justify-end pb-10 pt-12 md:min-h-[670px] md:justify-center md:pb-16 lg:min-h-[min(760px,calc(100svh-72px))]">
            <div className="sr-hero-copy max-w-4xl">
              <p className="sr-hero-kicker mb-5 text-xs font-medium uppercase tracking-[0.16em] text-[#f4f4f6]">
                <RaceFlag />
                CyberX Новокосино · 24/7
              </p>
              <h1
                id="simracing-heading"
                className="sr-hero-title font-tactic font-black uppercase"
              >
                Автосимуляторы
                <br />
                <span className="sr-hero-city">в Москве</span>
              </h1>
              <p className="mb-8 mt-6 max-w-[440px] text-base leading-relaxed text-[#d3d4da] md:text-lg">
                <strong className="sr-hero-punch">
                  Меньше слов. Больше газа.
                </strong>
                Руль Direct Drive, четыре гоночных кокпита и заезды с друзьями в
                Новокосино.
              </p>
              <div className="flex flex-wrap gap-3">
                <BookingButton />
                <a href="#tariffs" className="sr-button sr-button-secondary">
                  Выбрать тариф
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="sr-spec-strip border-y border-white/10 bg-[#121419]">
          <dl className="sr-container grid grid-cols-2 gap-y-7 py-7 md:grid-cols-4 md:py-9">
            {[
              { value: "4", label: "кокпита для вашей компании" },
              { value: "12 Нм", label: "прямой привод MOZA R12" },
              { value: "55″", label: "экран 4K · 120 Гц" },
              { value: "от 580 ₽", label: "час за рулём" },
            ].map((item) => (
              <div key={item.label} className="sr-spec flex flex-col pr-4">
                <dt className="mt-2 text-xs leading-relaxed text-[#b4b6c0] sm:text-sm">
                  {item.label}
                </dt>
                <dd className="order-first font-tactic text-[clamp(1.2rem,2.8vw,2.5rem)] font-bold tabular-nums">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <RaceDivider />

        <section id="equipment" className="sr-section">
          <div className="sr-container">
            <Reveal>
              <p className="sr-stage-label">
                <span>01</span> Почувствуй машину
              </p>
              <h2 className="sr-title">
                Садишься в кокпит.
                <br />И чувствуешь разницу.
              </h2>
              <p className="sr-lead">
                Руль сопротивляется в поворотах. Педаль тормоза чувствует
                усилие. Дорога занимает весь экран. Здесь гонку ощущаешь руками.
              </p>
            </Reveal>
            <CockpitGallery />
          </div>
        </section>

        <section
          id="club-video"
          className="sr-grid-section overflow-hidden bg-[#13151a]"
          aria-labelledby="together-heading"
        >
          <div className="sr-container grid gap-8 py-14 md:grid-cols-2 md:items-center md:gap-14 md:py-20">
            <Reveal>
              <span className="sr-grid-number" aria-hidden="true">
                04
              </span>
              <p className="mb-5 text-xs uppercase tracking-[0.16em] text-[#ff648a]">
                Одна компания. Одна стартовая решётка.
              </p>
              <h2 id="together-heading" className="sr-title">
                Вчетвером.
                <br />
                Колесо в колесо.
              </h2>
              <p className="sr-lead">
                Занимайте соседние кокпиты и встречайтесь на одной трассе.
                Дружеская гонка, парный дрифт или погоня: каждый выбирает свою
                роль.
              </p>
              <a
                href="#games"
                className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#f4f4f6]"
              >
                Выбрать режим
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <div className="sr-team-photo relative mt-8 aspect-[16/7] overflow-hidden">
                <Image
                  src="/racing/editorial/cockpit-5-640.webp"
                  alt="Ряд автосимуляторов для совместных заездов в CyberX Новокосино"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[50%_68%]"
                />
              </div>
            </Reveal>
            <Reveal>
              <SimracingVideo />
            </Reveal>
          </div>
        </section>

        <section id="games" className="sr-section sr-games-section">
          <div className="sr-container">
            <Reveal>
              <p className="sr-stage-label">
                <span>02</span> Выбери свою гонку
              </p>
              <div className="sr-grid-intro mb-10 grid items-center gap-5 border-b border-white/15 pb-10 md:grid-cols-[auto_1fr] md:gap-10">
                <p className="sr-server-number font-tactic text-[100px] font-black leading-none tracking-[-0.07em] md:text-[160px]">
                  {serverCount}
                </p>
                <div>
                  <h2 className="sr-title">
                    Своих серверов.
                    <br />
                    Десятки способов гонять.
                  </h2>
                  <p className="sr-lead">
                    Шашки по МКАД, ночной Токио, дрифт на серпантинах, GT на
                    Нордшляйфе и дерби на выживание. Выбирай настроение и свою
                    машину.
                  </p>
                  <p className="mt-4 text-sm font-medium text-[#d3d4da]">
                    17 в Assetto Corsa · 9 в BeamNG.drive
                  </p>
                </div>
              </div>
            </Reveal>
            <SimracingClient />
          </div>
        </section>

        <section
          id="other-games"
          className="sr-world-section relative isolate overflow-hidden border-y border-white/10"
        >
          <div className="absolute inset-0 -z-20">
            <Image
              src="/racing/editorial/racing-world.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[65%_50%]"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,12,15,.92),rgba(11,12,15,.35)),linear-gradient(0deg,rgba(11,12,15,.9),transparent)]" />
          <TrackOutline />
          <div className="sr-container py-16 md:py-24">
            <Reveal>
              <h2 className="sr-title max-w-xl">
                Сегодня дрифт.
                <br />
                Завтра ралли.
              </h2>
              <p className="sr-lead max-w-lg text-[#d3d4da]">
                Меняй не только машину, но и весь мир вокруг.
              </p>
            </Reveal>
          </div>
          <SimracingGames />
        </section>
        <RaceDivider finish />

        <section id="tariffs" className="sr-section">
          <div className="sr-container">
            <Reveal>
              <p className="sr-stage-label">
                <span>03</span> Время на старт
              </p>
              <h2 className="sr-title">Цены на автосимуляторы.</h2>
              <p className="sr-lead">
                Час на знакомство или целый вечер на трассе. Выбирай свой темп.
              </p>
            </Reveal>
            <SimracingTariffs />
          </div>
        </section>

        <SimracingReviews />

        <section id="faq" className="border-t border-white/10">
          <div className="sr-container grid gap-8 py-16 md:grid-cols-[.7fr_1.3fr] md:gap-16 md:py-24">
            <div>
              <h2 className="sr-title">
                Перед первым
                <br />
                заездом.
              </h2>
              <p className="sr-lead">
                Что нужно знать об автосимуляторах в нашем клубе.
              </p>
            </div>
            <div>
              {SIMRACING_FAQ.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-white/15"
                >
                  <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-5 py-5 text-base font-medium leading-relaxed">
                    <span>{item.question}</span>
                    <Plus
                      size={21}
                      className="sr-faq-icon shrink-0 text-[#b4b6c0] transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="max-w-2xl pb-6 pr-8 text-base leading-relaxed text-[#b4b6c0]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="location" className="sr-finish-section bg-[#15171d]">
          <div className="sr-container grid gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:gap-16 md:py-24">
            <Reveal>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-[#ff648a]">
                Москва · Новокосино · Круглосуточно
              </p>
              <h2 className="sr-title">
                Твой следующий
                <br />
                заезд здесь.
              </h2>
              <p className="sr-lead">
                Симрейсинг рядом с домом: приезжай из Новокосино, Реутова,
                Косино или других районов Москвы. Мы открыты каждый день и
                каждую ночь.
              </p>
              <div className="mt-8">
                <BookingButton />
              </div>
            </Reveal>
            <div className="flex flex-col justify-center">
              <address className="not-italic">
                <div className="flex gap-4">
                  <MapPin
                    className="mt-1 shrink-0 text-[#ff648a]"
                    size={23}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xl font-semibold">
                      Новокосинская улица, 32
                    </p>
                    <p className="mt-2 text-base text-[#b4b6c0]">
                      ТЦ «Новокосино», 2 этаж · Москва
                    </p>
                  </div>
                </div>
                <a
                  href="tel:+79851289538"
                  className="mt-6 flex min-h-12 items-center gap-4 text-lg"
                >
                  <Phone
                    size={23}
                    className="text-[#ff648a]"
                    aria-hidden="true"
                  />
                  +7 (985) 128-95-38
                </a>
              </address>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://yandex.ru/maps/?rtext=~55.741887,37.867172&rtt=auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sr-button sr-button-secondary"
                >
                  Построить маршрут
                  <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only"> в новой вкладке</span>
                </a>
                <Link
                  href="/contacts"
                  className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold"
                >
                  Как добраться
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <nav
          aria-label="Хлебные крошки"
          className="sr-container flex flex-wrap gap-2 py-7 text-xs text-[#b4b6c0]"
        >
          <Link
            href="/"
            className="inline-flex min-h-11 items-center hover:text-white"
          >
            Главная
          </Link>
          <span className="inline-flex items-center" aria-hidden="true">
            /
          </span>
          <span className="inline-flex items-center" aria-current="page">
            Автосимуляторы и симрейсинг в Москве
          </span>
        </nav>
      </main>
      <Footer />
      <SimracingMobileBar />
    </div>
  );
}
