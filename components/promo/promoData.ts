import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Copy,
  Gamepad2,
  Percent,
  Smartphone,
  UserPlus,
  WalletCards,
} from "lucide-react";

export const APP_DOWNLOAD_URL = "/download";
export const ONLINE_BOOKING_URL = "https://booking.langame.ru/YWo4q8XN";

export type StoryChapter = {
  id: string;
  label: string;
  badge?: string;
};

export const STORY_CHAPTERS: StoryChapter[] = [
  { id: "start", label: "Старт 400 ₽" },
  { id: "reasons", label: "Зачем в клуб" },
  { id: "dropx", label: "DropX 700 ₽", badge: "NEW" },
  { id: "booking", label: "Как начать" },
  { id: "referral", label: "Друзья 800 ₽" },
  { id: "cashback", label: "Кэшбэк 20%" },
  { id: "faq", label: "Вопросы" },
];

export type ClubReason = {
  id: string;
  tab: string;
  kicker: string;
  title: string;
  pain: string;
  benefit: string;
  priceBadge: string;
  specs: string[];
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  accent: string;
};

export const CLUB_REASONS: ClubReason[] = [
  {
    id: "solo-pro",
    tab: "400 Гц + 5070",
    kicker: "01 // СОРЕВНОВАТЕЛЬНЫЙ ФОКУС",
    title: "Когда дома не хватает FPS и тишины",
    pain: "Отвлекают домашние, скачет пинг или монитор тянет только 60–144 Гц",
    benefit:
      "В изолированных комнатах Solo Pro и Solo Premium стоят RTX 5070, мониторы до 400 Гц BenQ Zowie (или 2K 240 Гц) и свой кондиционер — ничего не отвлекает от ранкеда.",
    priceBadge: "от 230 ₽/ч",
    specs: ["RTX 5070", "до 400 Гц Zowie", "Личная комната + AC"],
    image: "/zones/solo-pro-1.webp",
    imageAlt: "Игровая комната Solo Pro с RTX 5070 и монитором 400 Гц в CyberX Новокосино",
    ctaLabel: "Тарифы Solo",
    ctaHref: "/prices",
    accent: "#FF2E63",
  },
  {
    id: "simracing",
    tab: "DRIVE X · MOZA",
    kicker: "02 // ЖИВОЙ АВТОСПОРТ",
    title: "Ощутить 12 Нм руля и педали как в треке",
    pain: "Геймпад и обычный стол не передают вес машины, срыв оси и торможение",
    benefit:
      "Четыре кокпита DRIVE X с прямой базой MOZA R12, педалями Load Cell, КПП, ручником и экраном 55″ 4K. Свои серверы Assetto Corsa и BeamNG, а также Forza и DiRT Rally 2.0.",
    priceBadge: "от 580 ₽/ч",
    specs: ["4 кокпита MOZA R12", "55″ 4K экран", "Бонусы не списать"],
    image: "/zones/sim-1.webp",
    imageAlt: "Автосимулятор DRIVE X с рулём MOZA R12 и 4K экраном в CyberX Новокосино",
    ctaLabel: "Смотреть DRIVE X",
    ctaHref: "/simracing",
    accent: "#00F0FF",
  },
  {
    id: "bootcamp",
    tab: "Стак на 5 ПК",
    kicker: "03 // КОМАНДА В ОДНОЙ КОМНАТЕ",
    title: "Собрать пятерых и кричать коллы вживую",
    pain: "В Discord задержка и каждый играет с разного железа, а хочется эмоций LAN-турнира",
    benefit:
      "Отдельные закрытые комнаты Bootcamp на 5 мест (RTX 4060 / 144 Гц) и VIP Bootcamp (RTX 4070 / 240 Гц): единый пинг, живое общение и напитки к столу.",
    priceBadge: "от 170 ₽/ч",
    specs: ["5 ПК в комнате", "144 Гц / 240 Гц", "Без посторонних"],
    image: "/zones/bootcamp-1.webp",
    imageAlt: "Командная комната Bootcamp на 5 ПК в CyberX Новокосино",
    ctaLabel: "Выбрать зал",
    ctaHref: "/#zones",
    accent: "#B900FF",
  },
  {
    id: "night-ps5",
    tab: "Ночь 700 ₽ + PS5",
    kicker: "04 // КАТКА ВСЮ НОЧЬ ИЛИ ВЕЧЕР НА ДИВАНЕ",
    title: "Ночной пакет 700 ₽ сразу открывает рулетку",
    pain: "Вечер пролетает быстро, а дома некуда завалиться с компанией в FIFA / UFC",
    benefit:
      "Ночь в общем зале (22:00–11:00) стоит 700 ₽ в будни — одним чеком вы получаете 13 часов игры И сразу право открыть рулетку DropX. Для компании есть PS5 VIP-комната 4K и Duo.",
    priceBadge: "Ночь от 700 ₽",
    specs: ["22:00 – 11:00", "Сразу доступ к DropX", "PS5 4K и Duo"],
    image: "/zones/ps5-1.webp",
    imageAlt: "Гости играют в зоне PlayStation 5 в CyberX Новокосино",
    ctaLabel: "PS5 и цены",
    ctaHref: "/playstation",
    accent: "#D5FF39",
  },
];

export type DropXPrize = {
  id: string;
  title: string;
  subtitle: string;
  category: "top" | "bonus" | "bar_time";
  rarity: "Легендарный" | "Редкий" | "Бонус" | "Клуб";
  image: string;
  weightLabel: string;
  note: string;
};

export const DROPX_PRIZES: DropXPrize[] = [
  {
    id: "balance-x2",
    title: "X2 баланса",
    subtitle: "Удвоение пополнения рублями",
    category: "top",
    rarity: "Легендарный",
    image: "/images/promo/dropx/balance-x2.webp",
    weightLabel: "Супердроп",
    note: "Администратор зачислит сумму вашего пополнения рублями на основной баланс. Активация до 23:59.",
  },
  {
    id: "status-platinum",
    title: "Статус «Платина»",
    subtitle: "10% кэшбэк · +300 на ДР · 5% бар",
    category: "top",
    rarity: "Легендарный",
    image: "/images/promo/dropx/status-platinum.webp",
    weightLabel: "15% для новичка",
    note: "Повышение уровня Киберкэш на 1 год (если текущий статус ниже Платины). Активация до 23:59.",
  },
  {
    id: "status-gold",
    title: "Статус «Золото»",
    subtitle: "7% кэшбэк · +200 на ДР",
    category: "top",
    rarity: "Легендарный",
    image: "/images/promo/dropx/status-gold.webp",
    weightLabel: "15% для новичка",
    note: "Повышение уровня Киберкэш на 1 год (если текущий статус ниже Золота). Активация до 23:59.",
  },
  {
    id: "double-catch",
    title: "Двойной улов",
    subtitle: "200 бонусов + шоколадка",
    category: "top",
    rarity: "Редкий",
    image: "/images/promo/dropx/double-catch.webp",
    weightLabel: "Комбо",
    note: "200 бонусов приходят автоматически + любимый батончик (Mars, Snickers, Twix, M&M’s) у администратора.",
  },
  {
    id: "bonus-500",
    title: "500 бонусов",
    subtitle: "Автоначисление на счёт",
    category: "bonus",
    rarity: "Редкий",
    image: "/images/promo/dropx/bonus-500.webp",
    weightLabel: "Автовыдача",
    note: "Поступают автоматически на бонусный баланс без ожидания.",
  },
  {
    id: "bonus-300",
    title: "300 бонусов",
    subtitle: "Автоначисление на счёт",
    category: "bonus",
    rarity: "Бонус",
    image: "/images/promo/dropx/bonus-500.webp",
    weightLabel: "Автовыдача",
    note: "Мгновенное пополнение бонусного баланса (1 бонус = 1 ₽).",
  },
  {
    id: "bonus-200",
    title: "200 бонусов",
    subtitle: "Автоначисление на счёт",
    category: "bonus",
    rarity: "Бонус",
    image: "/images/promo/dropx/bonus-200.webp",
    weightLabel: "Автовыдача",
    note: "Можно оплатить до 20% игрового времени (кроме DRIVE X).",
  },
  {
    id: "bonus-150",
    title: "150 бонусов",
    subtitle: "Автоначисление на счёт",
    category: "bonus",
    rarity: "Бонус",
    image: "/images/promo/dropx/bonus-150.webp",
    weightLabel: "Автовыдача",
    note: "Поступают автоматически сразу после открытия DropX.",
  },
  {
    id: "bonus-100",
    title: "100 бонусов",
    subtitle: "Автоначисление на счёт",
    category: "bonus",
    rarity: "Бонус",
    image: "/images/promo/dropx/bonus-100.webp",
    weightLabel: "Автовыдача",
    note: "Поступают на бонусный счёт без ручных заявок.",
  },
  {
    id: "bonus-50",
    title: "50 бонусов",
    subtitle: "Автоначисление на счёт",
    category: "bonus",
    rarity: "Бонус",
    image: "/images/promo/dropx/bonus-50.webp",
    weightLabel: "Автовыдача",
    note: "Приятная добавка на баланс сразу в день пополнения.",
  },
  {
    id: "time-60",
    title: "+1 час игры",
    subtitle: "Бесплатное время в клубе",
    category: "bar_time",
    rarity: "Редкий",
    image: "/images/promo/dropx/time-60.webp",
    weightLabel: "Игровое время",
    note: "Активируется у администратора в день выигрыша до 23:59 МСК.",
  },
  {
    id: "time-30",
    title: "+30 минут игры",
    subtitle: "Продление катки бесплатно",
    category: "bar_time",
    rarity: "Клуб",
    image: "/images/promo/dropx/time.webp",
    weightLabel: "Игровое время",
    note: "Активируется в день открытия на стойке администратора до 23:59 МСК.",
  },
  {
    id: "energy",
    title: "Энергетик",
    subtitle: "Любой из наличия (18+)",
    category: "bar_time",
    rarity: "Клуб",
    image: "/images/promo/dropx/energy.webp",
    weightLabel: "Бар · 18+",
    note: "Выбираете банку в баре у администратора. Только для гостей 18+.",
  },
  {
    id: "sandwich",
    title: "Сэндвич",
    subtitle: "Свежий перекус из бара",
    category: "bar_time",
    rarity: "Клуб",
    image: "/images/promo/dropx/sandwich.webp",
    weightLabel: "Бар клуба",
    note: "Любой сэндвич из наличия — забирайте сразу у администратора до 23:59.",
  },
  {
    id: "chocolate",
    title: "Шоколадка",
    subtitle: "Mars, Snickers, Twix, M&M’s",
    category: "bar_time",
    rarity: "Клуб",
    image: "/images/promo/dropx/chocolate.webp",
    weightLabel: "Бар клуба",
    note: "На выбор из наличия на витрине в день выигрыша до 23:59.",
  },
];

export type StepItem = {
  num: string;
  icon: LucideIcon;
  title: string;
  text: string;
};

export const ACTIVATION_STEPS: StepItem[] = [
  {
    num: "01",
    icon: Smartphone,
    title: "Установите CyberX",
    text: "Создайте аккаунт в приложении и выберите клуб CyberX Новокосино.",
  },
  {
    num: "02",
    icon: BadgeCheck,
    title: "Получите 400 бонусов",
    text: "Стартовый подарок мгновенно зачисляется на бонусный баланс.",
  },
  {
    num: "03",
    icon: Gamepad2,
    title: "Выберите зал и время",
    text: "Посмотрите свободные места на карте зала: Общий, Bootcamp, Solo Pro или PS5.",
  },
  {
    num: "04",
    icon: WalletCards,
    title: "Играйте и крутите DropX",
    text: "Бонусы покроют до 20% игры. А при пополнении от 700 ₽ открывайте рулетку в клубе.",
  },
];

export type LoyaltyLevel = {
  id: string;
  name: string;
  hours: string;
  cashback: string;
  birthdayBonus?: string;
  shopDiscount?: string;
  perkSummary: string;
  color: string;
  dropxBoost?: string;
};

export const LOYALTY_LEVELS: LoyaltyLevel[] = [
  {
    id: "bronze",
    name: "Бронза",
    hours: "до 24 часов",
    cashback: "3%",
    perkSummary: "Стартовый уровень с первого визита + повышенный шанс (30% суммарно) выбить Золото или Платину в рулетке DropX.",
    color: "#B77945",
    dropxBoost: "15%+15% на статус",
  },
  {
    id: "silver",
    name: "Серебро",
    hours: "от 25 часов",
    cashback: "5%",
    birthdayBonus: "100",
    perkSummary: "Открывается автобонус +100 при пополнении от 1 000 ₽ и повышенные шансы выбить годовой статус в DropX.",
    color: "#B9C2CA",
    dropxBoost: "15%+15% на статус",
  },
  {
    id: "gold",
    name: "Золото",
    hours: "от 90 часов",
    cashback: "7%",
    birthdayBonus: "200",
    perkSummary: "Автобонусы +100 (от 1 000 ₽) и +250 (от 2 000 ₽), повышенный кэшбэк 7% и +200 бонусов на день рождения.",
    color: "#E6B84D",
  },
  {
    id: "platinum",
    name: "Платина",
    hours: "от 350 часов",
    cashback: "10%",
    birthdayBonus: "300",
    shopDiscount: "5% в магазине",
    perkSummary: "Доступны все 3 уровня автобонусов до +350, 10% кэшбэк с каток и скидка 5% на бар.",
    color: "#8FBDCD",
  },
  {
    id: "diamond",
    name: "Бриллиант",
    hours: "от 604 часов",
    cashback: "20%",
    birthdayBonus: "400",
    shopDiscount: "10% в магазине",
    perkSummary: "Максимальный возврат: каждая пятая игра возвращается кэшбэком, 10% скидка на бар и +400 бонусов в ДР.",
    color: "#FF2E63",
  },
];

export const TOPUP_BONUSES = [
  { bonus: "+100", balance: "1 000–1 999 ₽", access: "Серебро, Золото, Платина, Бриллиант" },
  { bonus: "+250", balance: "2 000–2 999 ₽", access: "Золото, Платина, Бриллиант" },
  { bonus: "+350", balance: "3 000–9 000 ₽", access: "Платина, Бриллиант" },
];

export const REFERRAL_STEPS: StepItem[] = [
  {
    num: "01",
    icon: Copy,
    title: "Возьми промокод в клубе",
    text: "Зайди в личный кабинет на ПК в клубе, открой раздел «Пригласить друга» и скопируй свой уникальный код.",
  },
  {
    num: "02",
    icon: UserPlus,
    title: "Друг получает 800 ₽",
    text: "400 стандартных бонусов за регистрацию и ещё 400 бонусов после ввода твоего кода. Всего 800 бонусов на старт.",
  },
  {
    num: "03",
    icon: Percent,
    title: "Ты получаешь 5% навсегда",
    text: "Пять процентов от всех будущих пополнений друга возвращаются тебе бонусами. Например, с 1 000 ₽ придут 50 бонусов.",
  },
];

export const BOOKING_FORMATS = [
  {
    src: "/zones/common-6.webp",
    alt: "Общий игровой зал CyberX Новокосино",
    label: "Общий зал",
    note: "от 150 ₽/ч · Ночь 700 ₽",
    href: "/#zones",
  },
  {
    src: "/zones/duo-1.webp",
    alt: "Комната на двоих Duo в CyberX Новокосино",
    label: "Duo & VIP",
    note: "RTX 4070 · 240 Гц",
    href: "/prices",
  },
  {
    src: "/zones/sim-1.webp",
    alt: "Автосимулятор DRIVE X с рулём MOZA R12",
    label: "DRIVE X",
    note: "4× MOZA R12 · 4K",
    href: "/simracing",
  },
];

export const PROMO_FAQS = [
  {
    question: "Как работает рулетка DropX при пополнении от 700 ₽?",
    answer:
      "Пополните основной баланс аккаунта в CyberX Новокосино одним платежом от 700 ₽ (в системе порог срабатывает с 699 ₽ за текущий день по МСК). Несколько мелких платежей не суммируются. Подойдите к планшету DropX в клубе, введите номер телефона и откройте дроп. Доступно раз в 24 часа.",
  },
  {
    question: "Какие призы выпадают в DropX и когда их нужно забрать?",
    answer:
      "В рулетке 15 призов: 50, 100, 150, 200, 300 или 500 бонусов (начисляются автоматически), энергетик (18+), шоколадка или сэндвич из бара, +30 минут или +1 час игры, годовой статус «Золото» или «Платина», комбо «Двойной улов» (200 бонусов + шоколадка) и X2 пополнения рублями на основной баланс. Небонусные призы, время, статус и X2 нужно активировать у администратора в тот же день до 23:59 МСК.",
  },
  {
    question: "Как получить 400 бонусов CyberX за регистрацию?",
    answer:
      "Установите приложение CyberX (или выберите магазин по ссылке «Скачать»), зарегистрируйтесь и укажите клуб CyberX Новокосино (Новокосинская ул., 32). 400 бонусов сразу появятся на бонусном счёте.",
  },
  {
    question: "Можно ли потратить бонусы в первый визит и на DRIVE X?",
    answer:
      "Да, 1 бонус равен 1 рублю, и бонусами можно оплатить до 20% игрового времени уже с первого визита. Исключение — зона автосимуляторов DRIVE X: она оплачивается только основным балансом.",
  },
  {
    question: "Как работают группы гостей и кэшбэк Киберкэш до 20%?",
    answer:
      "Уровень растёт по накопленным часам в клубе: Бронза (до 24 ч — 3%), Серебро (от 25 ч — 5% и +100 на ДР), Золото (от 90 ч — 7% и +200 на ДР), Платина (от 350 ч — 10%, +300 на ДР и 5% на бар), Бриллиант (от 604 ч — 20%, +400 на ДР и 10% на бар). А статус «Золото» или «Платина» можно выбить сразу на 1 год в рулетке DropX.",
  },
  {
    question: "Суммируются ли автобонусы за пополнение и рулетка DropX?",
    answer:
      "Да. Например, на уровне «Серебро» при пополнении одним чеком от 1 000 ₽ вам автоматически начислится +100 бонусов по программе лояльности И вы сможете открыть рулетку DropX (порог от 700 ₽/699 ₽ выполнен).",
  },
  {
    question: "Как получить 800 бонусов по промокоду друга?",
    answer:
      "Новый гость получает 400 бонусов за регистрацию и ещё 400 после ввода уникального промокода пригласившего друга. Код друга находится в его личном кабинете на игровом ПК в клубе, в разделе «Пригласить друга».",
  },
  {
    question: "Что получает тот, кто пригласил друга?",
    answer:
      "Пригласившему всегда начисляется 5% бонусами от всех пополнений друга. Например, друг пополнил счёт на 1 000 ₽ — вам сразу придёт 50 бонусов.",
  },
];
