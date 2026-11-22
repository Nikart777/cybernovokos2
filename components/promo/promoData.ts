export const APP_DOWNLOAD_URL = "/download";
export const ONLINE_BOOKING_URL = "https://booking.langame.ru/YWo4q8XN";

export type StoryChapter = {
  id: string;
  label: string;
};

export const STORY_CHAPTERS: StoryChapter[] = [
  { id: "start", label: "Старт 400 ₽" },
  { id: "reasons", label: "Зачем в клуб" },
  { id: "dropx", label: "DropX от 700 ₽" },
  { id: "booking", label: "Бронь" },
  { id: "referral", label: "Друзья 800 ₽" },
  { id: "cashback", label: "Киберкэш" },
  { id: "faq", label: "FAQ" },
];

export type ClubReason = {
  id: string;
  num: string;
  tab: string;
  title: string;
  muted: string;
  summary: string;
  price: string;
  specs: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

export const CLUB_REASONS: ClubReason[] = [
  {
    id: "solo-pro",
    num: "01",
    tab: "Solo Pro 400 Гц",
    title: "Когда дома мало FPS.",
    muted: "И мешают.",
    summary:
      "Отдельная комната Solo с RTX 5070, монитором BenQ Zowie 400 Гц (или 2K 240 Гц) и личным кондиционером.",
    price: "от 230 ₽/ч",
    specs: "RTX 5070 · 400 Гц · 1 место",
    image: "/zones/solo-pro-1.webp",
    imageAlt: "Игровая комната Solo Pro с RTX 5070 и монитором 400 Гц в CyberX Новокосино",
    ctaLabel: "Тарифы Solo",
    ctaHref: "/prices",
  },
  {
    id: "simracing",
    num: "02",
    tab: "DRIVE X · MOZA R12",
    title: "Четыре кокпита.",
    muted: "Прямой привод 12 Нм.",
    summary:
      "Рули MOZA R12, педали Load Cell, КПП, ручник и экраны 55″ 4K. Свои серверы Assetto Corsa и BeamNG.drive.",
    price: "от 580 ₽/ч",
    specs: "MOZA R12 · 55″ 4K · 4 рига",
    image: "/zones/sim-1.webp",
    imageAlt: "Автосимулятор DRIVE X с рулём MOZA R12 и 4K экраном в CyberX Новокосино",
    ctaLabel: "Автосимуляторы DRIVE X",
    ctaHref: "/simracing",
  },
  {
    id: "bootcamp",
    num: "03",
    tab: "Bootcamp 5 ПК",
    title: "Пятеро в одной комнате.",
    muted: "Без лишних глаз.",
    summary:
      "Закрытый буткэмп на 5 машин (144 Гц или 240 Гц RTX 4070 в VIP): равный пинг, живые коллы и бар к столу.",
    price: "от 170 ₽/ч",
    specs: "5 ПК · RTX 4060 / 4070 · 144–240 Гц",
    image: "/zones/bootcamp-1.webp",
    imageAlt: "Командная комната Bootcamp на 5 ПК в CyberX Новокосино",
    ctaLabel: "Выбрать зал",
    ctaHref: "/#zones",
  },
  {
    id: "night-ps5",
    num: "04",
    tab: "Ночь 700 ₽ · PS5",
    title: "Ночной пакет за 700 ₽.",
    muted: "Сразу с доступом к DropX.",
    summary:
      "Ночь в общем зале (22:00–11:00) в будни стоит 700 ₽ — одним чеком хватает и на всю ночь игры, и на рулетку DropX. Для компании есть PS5 VIP 4K.",
    price: "Ночь от 700 ₽",
    specs: "22:00–11:00 · 4K PS5 · Вход в DropX",
    image: "/zones/ps5-1.webp",
    imageAlt: "Гости играют в зоне PlayStation 5 в CyberX Новокосино",
    ctaLabel: "PS5 и цены",
    ctaHref: "/playstation",
  },
];

export type DropXPrize = {
  id: string;
  title: string;
  subtitle: string;
  category: "top" | "bonus" | "bar_time";
  image: string;
  highlight?: boolean;
};

export const DROPX_PRIZES: DropXPrize[] = [
  {
    id: "balance-x2",
    title: "X2 баланса",
    subtitle: "Удвоение пополнения рублями",
    category: "top",
    image: "/images/promo/dropx/balance-x2.webp",
    highlight: true,
  },
  {
    id: "status-platinum",
    title: "Статус «Платина»",
    subtitle: "10% кэшбэк · +300 ДР · год",
    category: "top",
    image: "/images/promo/dropx/status-platinum.webp",
    highlight: true,
  },
  {
    id: "status-gold",
    title: "Статус «Золото»",
    subtitle: "7% кэшбэк · +200 ДР · год",
    category: "top",
    image: "/images/promo/dropx/status-gold.webp",
    highlight: true,
  },
  {
    id: "double-catch",
    title: "Двойной улов",
    subtitle: "200 бонусов + шоколадка",
    category: "top",
    image: "/images/promo/dropx/double-catch.webp",
    highlight: true,
  },
  {
    id: "bonus-500",
    title: "500 бонусов",
    subtitle: "Автоначисление",
    category: "bonus",
    image: "/images/promo/dropx/bonus-500.webp",
  },
  {
    id: "bonus-300",
    title: "300 бонусов",
    subtitle: "Автоначисление",
    category: "bonus",
    image: "/images/promo/dropx/bonus-500.webp",
  },
  {
    id: "bonus-200",
    title: "200 бонусов",
    subtitle: "Автоначисление",
    category: "bonus",
    image: "/images/promo/dropx/bonus-200.webp",
  },
  {
    id: "bonus-150",
    title: "150 бонусов",
    subtitle: "Автоначисление",
    category: "bonus",
    image: "/images/promo/dropx/bonus-150.webp",
  },
  {
    id: "bonus-100",
    title: "100 бонусов",
    subtitle: "Автоначисление",
    category: "bonus",
    image: "/images/promo/dropx/bonus-100.webp",
  },
  {
    id: "bonus-50",
    title: "50 бонусов",
    subtitle: "Автоначисление",
    category: "bonus",
    image: "/images/promo/dropx/bonus-50.webp",
  },
  {
    id: "time-60",
    title: "+1 час игры",
    subtitle: "Активация сегодня",
    category: "bar_time",
    image: "/images/promo/dropx/time-60.webp",
  },
  {
    id: "time-30",
    title: "+30 минут игры",
    subtitle: "Активация сегодня",
    category: "bar_time",
    image: "/images/promo/dropx/time.webp",
  },
  {
    id: "energy",
    title: "Энергетик",
    subtitle: "Из бара (18+)",
    category: "bar_time",
    image: "/images/promo/dropx/energy.webp",
  },
  {
    id: "sandwich",
    title: "Сэндвич",
    subtitle: "Из бара клуба",
    category: "bar_time",
    image: "/images/promo/dropx/sandwich.webp",
  },
  {
    id: "chocolate",
    title: "Шоколадка",
    subtitle: "Mars · Snickers · Twix",
    category: "bar_time",
    image: "/images/promo/dropx/chocolate.webp",
  },
];

export const ACTIVATION_STEPS = [
  {
    num: "01",
    title: "Установите CyberX",
    text: "Создайте профиль и выберите клуб «Новокосино».",
  },
  {
    num: "02",
    title: "400 ₽ на балансе",
    text: "Бонусы приходят автоматически после регистрации.",
  },
  {
    num: "03",
    title: "Выберите место",
    text: "Общий зал, Bootcamp, Solo Pro 400 Гц или PS5.",
  },
  {
    num: "04",
    title: "Играйте и крутите",
    text: "Бонусами оплачивается до 20% времени. От 700 ₽ — дроп в клубе.",
  },
];

export const LOYALTY_LEVELS = [
  {
    id: "bronze",
    name: "Бронза",
    hours: "до 24 ч",
    cashback: "3%",
    birthdayBonus: "—",
    shopDiscount: "—",
    color: "#B77945",
  },
  {
    id: "silver",
    name: "Серебро",
    hours: "от 25 ч",
    cashback: "5%",
    birthdayBonus: "+100 ₽",
    shopDiscount: "—",
    color: "#B9C2CA",
  },
  {
    id: "gold",
    name: "Золото",
    hours: "от 90 ч",
    cashback: "7%",
    birthdayBonus: "+200 ₽",
    shopDiscount: "—",
    color: "#E6B84D",
  },
  {
    id: "platinum",
    name: "Платина",
    hours: "от 350 ч",
    cashback: "10%",
    birthdayBonus: "+300 ₽",
    shopDiscount: "5% на бар",
    color: "#8FBDCD",
  },
  {
    id: "diamond",
    name: "Бриллиант",
    hours: "от 604 ч",
    cashback: "20%",
    birthdayBonus: "+400 ₽",
    shopDiscount: "10% на бар",
    color: "#FF2E63",
  },
];

export const TOPUP_BONUSES = [
  { bonus: "+100", balance: "1 000–1 999 ₽", access: "Серебро и выше" },
  { bonus: "+250", balance: "2 000–2 999 ₽", access: "Золото и выше" },
  { bonus: "+350", balance: "3 000–9 000 ₽", access: "Платина и Бриллиант" },
];

export const REFERRAL_STEPS = [
  {
    num: "01",
    title: "Скопируй свой код",
    text: "Находится на игровом ПК клуба в разделе «Пригласить друга».",
  },
  {
    num: "02",
    title: "Друг получает 800 ₽",
    text: "400 за регистрацию + 400 за твой код в первый визит.",
  },
  {
    num: "03",
    title: "Тебе 5% с пополнений",
    text: "Постоянно бонусами с каждого пополнения друга (50 ₽ с 1 000 ₽).",
  },
];

export const BOOKING_FORMATS = [
  {
    src: "/zones/common-6.webp",
    alt: "Общий игровой зал CyberX Новокосино",
    label: "Общий зал",
    price: "от 150 ₽/ч · Ночь 700 ₽",
    href: "/#zones",
  },
  {
    src: "/zones/duo-1.webp",
    alt: "Комната на двоих Duo в CyberX Новокосино",
    label: "VIP & Duo",
    price: "RTX 4070 · 240 Гц",
    href: "/prices",
  },
  {
    src: "/zones/sim-1.webp",
    alt: "Автосимулятор DRIVE X с рулём MOZA R12",
    label: "DRIVE X",
    price: "MOZA R12 · от 580 ₽/ч",
    href: "/simracing",
  },
];
