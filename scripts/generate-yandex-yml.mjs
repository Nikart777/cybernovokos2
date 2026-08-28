#!/usr/bin/env node
/**
 * Генератор YML-прайса для Яндекс Бизнеса (кабинет: Товары и услуги → Загрузить XLS/YML → YML).
 *
 * Источник цен: data/prices.json — менять цены там, потом перегенерировать:
 *   node scripts/generate-yandex-yml.mjs
 *
 * Фото: public/yandex-menu/<slug>.jpg|png — тег <picture> попадает в фид только
 * для реально существующих файлов (этап 1 — без фото, этап 2 — с фото после деплоя).
 * Результат: public/yandex-menu/price-list.yml
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://cyberx-novokosino.ru';
const PHOTO_DIR = path.join(ROOT, 'public', 'yandex-menu');
const OUT = path.join(PHOTO_DIR, 'price-list.yml');

const prices = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'prices.json'), 'utf8'));

/* ---------- доступ к тарифам prices.json ---------- */

function zoneTariffs(zoneId, subIdx = null) {
    const zone = prices.zones.find(z => z.id === zoneId);
    if (!zone) throw new Error('Зона не найдена: ' + zoneId);
    const cats = subIdx != null ? zone.subZones[subIdx].categories : zone.categories;
    const day = Object.fromEntries((cats[0]?.items || []).map(i => [i.time, i]));
    const eve = Object.fromEntries(((cats[1] || cats[0]).items || []).map(i => [i.time, i]));
    return { day, eve };
}

// base = минимальная цена (будни, день), max = верх вилки (вечер/выходные)
function priceOf(zoneId, subIdx, time) {
    const { day, eve } = zoneTariffs(zoneId, subIdx);
    const d = day[time], e = eve[time];
    const base = (d ?? e).week;
    const max = (e ?? d).end;
    if (!base || !max) throw new Error('Нет тарифа ' + zoneId + '/' + time);
    return { base, max };
}

function abonement(name) {
    const ab = prices.abonnements.find(a => a.name === name);
    if (!ab) throw new Error('Нет абонемента ' + name);
    const val = zone => ab.prices.find(p => p.zone === zone).value;
    return { base: val('ОБЩИЙ ЗАЛ'), vip: val('VIP BOOTCAMP'), solo: val('SOLO') };
}

/* ---------- категории ---------- */

const CATS = [
    { id: 1, name: 'Общий зал — игровые ПК' },
    { id: 2, name: 'BOOTCAMP — комната на 5 игроков' },
    { id: 3, name: 'VIP зал' },
    { id: 4, name: 'DUO — места для двоих' },
    { id: 5, name: 'SOLO — приватные игровые комнаты' },
    { id: 6, name: 'PlayStation 5 — TV зона' },
    { id: 7, name: 'PS5 — отдельная VIP комната' },
    { id: 8, name: 'Автосимуляторы' },
    { id: 9, name: 'Абонементы' },
    { id: 10, name: 'Подарочные сертификаты' },
];

/* ---------- позиции ----------
 * {BASE}/{MAX} подставляются из prices.json, поэтому описания живут при смене цен.
 * slug = имя файла фото = offer id. */

const P = (zone, sub, time) => ({ zone, sub, time });

const OFFERS = [
    // Общий зал
    { slug: 'standard-1h', cat: 1, url: '/prices', tariff: P('common', null, '1 ЧАС'),
      name: 'Игровой ПК RTX 4060, 144 Гц — 1 час (Общий зал)',
      desc: 'Час за мощным игровым компьютером в клубе CyberX в Новокосино: RTX 4060, монитор BenQ 144 Гц, периферия Logitech. Днём в будни — {BASE} ₽, вечером и в выходные — до {MAX} ₽. В зале 13 мест — свободное найдётся почти всегда.' },
    { slug: 'standard-3h', cat: 1, url: '/prices', tariff: P('common', null, '3 ЧАСА'),
      name: 'Игровой ПК RTX 4060 — пакет 3 часа (Общий зал)',
      desc: 'Пакет на 3 часа выгоднее почасовой оплаты: от {BASE} ₽ в будни, до {MAX} ₽ вечером и в выходные. CS2, Dota 2, Fortnite, Valorant уже установлены. Компьютерный клуб у метро Новокосино, Москва (ВАО).' },
    { slug: 'standard-5h', cat: 1, url: '/prices', tariff: P('common', null, '5 ЧАСОВ'),
      name: 'Игровой ПК RTX 4060 — пакет 5 часов (Общий зал)',
      desc: 'Длинная сессия для марафона с друзьями: 5 часов от {BASE} ₽, в выходные — до {MAX} ₽. Удобные кресла Cougar, кондиционер, снеки и напитки на баре. Любые онлайн-игры на высоких настройках.' },
    { slug: 'standard-night', cat: 1, url: '/prices', tariff: P('common', null, 'НОЧЬ'),
      name: 'Ночь в компьютерном клубе — Общий зал (RTX 4060)',
      desc: 'Ночной пакет с 22:00 до 08:00: вся ночь игры за {BASE} ₽ в будни и {MAX} ₽ в выходные — дешевле, чем те же часы днём. Клуб в Новокосино работает круглосуточно.' },

    // BOOTCAMP
    { slug: 'bootcamp-1h', cat: 2, url: '/prices', tariff: P('bootcamp', null, '1 ЧАС'),
      name: 'Игровой ПК для команды — 1 час (BOOTCAMP, 5 мест)',
      desc: 'Отдельная комната на 5 ПК для игры с командой: RTX 4060, мониторы 144 Гц и общий войс без посторонних. От {BASE} ₽ с человека в час, вечером и в выходные — до {MAX} ₽. Идеально для праков и каток с друзьями.' },
    { slug: 'bootcamp-3h', cat: 2, url: '/prices', tariff: P('bootcamp', null, '3 ЧАСА'),
      name: 'BOOTCAMP на 3 часа — командная комната (RTX 4060)',
      desc: 'Три часа в закрытой комнате впятером: свой микроклимат, никого лишнего, полная концентрация на игре. От {BASE} ₽ за место, в пиковые часы — до {MAX} ₽. Компьютерный клуб CyberX, Новокосинская 32.' },
    { slug: 'bootcamp-5h', cat: 2, url: '/prices', tariff: P('bootcamp', null, '5 ЧАСОВ'),
      name: 'BOOTCAMP на 5 часов — турнирная подготовка',
      desc: 'Пять часов командной игры в формате буткемпа, как у про-составов: комната на 5 машин, одинаковое железо, стабильный интернет. От {BASE} ₽ с игрока, до {MAX} ₽ в выходные. Комнату можно забронировать целиком.' },
    { slug: 'bootcamp-night', cat: 2, url: '/prices', tariff: P('bootcamp', null, 'НОЧЬ'),
      name: 'Ночь в BOOTCAMP — комната на 5 игроков',
      desc: 'Ночной пакет 22:00–08:00 в отдельной комнате для пятерых: {BASE} ₽ с человека в будни, {MAX} ₽ в выходные. Вся ночь на праки и катки — комната полностью ваша до утра.' },

    // VIP
    { slug: 'vip-1h', cat: 3, url: '/prices', tariff: P('vip_duo', null, '1 ЧАС'),
      name: 'Игровой ПК RTX 4070, 240 Гц — 1 час (VIP)',
      desc: 'VIP-зал компьютерного клуба: RTX 4070, монитор Samsung 240 Гц, кресла Cougar. Час игры от {BASE} ₽, вечером и в выходные — до {MAX} ₽. Меньше соседей — больше комфорта.' },
    { slug: 'vip-3h', cat: 3, url: '/prices', tariff: P('vip_duo', null, '3 ЧАСА'),
      name: 'VIP пакет 3 часа — RTX 4070, 240 Гц',
      desc: 'Три часа на топовом железе: плавные сотни FPS в CS2 и Valorant, игры грузятся мгновенно. От {BASE} ₽ в будни, до {MAX} ₽ в выходные. Москва, район Новокосино.' },
    { slug: 'vip-5h', cat: 3, url: '/prices', tariff: P('vip_duo', null, '5 ЧАСОВ'),
      name: 'VIP пакет 5 часов — игровой компьютер 240 Гц',
      desc: 'Полдня в VIP-зале для тех, кто играет всерьёз: от {BASE} ₽, в выходные — до {MAX} ₽. RTX 4070 тянет любые новинки на ультра. Еду и напитки принесут прямо к месту.' },
    { slug: 'vip-night', cat: 3, url: '/prices', tariff: P('vip_duo', null, 'НОЧЬ'),
      name: 'Ночь в VIP-зале — RTX 4070, 240 Гц',
      desc: 'Ночной пакет 22:00–08:00 в VIP: {BASE} ₽ в будни, {MAX} ₽ в выходные. Тихий зал, топовое железо и кофе на баре под утро. Круглосуточный клуб в Новокосино.' },

    // DUO
    { slug: 'duo-1h', cat: 4, url: '/prices', tariff: P('vip_duo', null, '1 ЧАС'),
      name: 'Игровые места для двоих — 1 час (DUO)',
      desc: 'Парная зона DUO: два ПК рядом (RTX 4060, мониторы 240 Гц), чтобы играть вдвоём — на свидании, с другом или братом. От {BASE} ₽ за место в час, вечером и в выходные — до {MAX} ₽.' },
    { slug: 'duo-3h', cat: 4, url: '/prices', tariff: P('vip_duo', null, '3 ЧАСА'),
      name: 'DUO пакет 3 часа — играем вдвоём',
      desc: 'Три часа кооператива на соседних машинах: It Takes Two, Dota 2, CS2 — что угодно. От {BASE} ₽ с человека в будни, до {MAX} ₽ в выходные. Уютный парный угол в клубе CyberX, Новокосино.' },
    { slug: 'duo-5h', cat: 4, url: '/prices', tariff: P('vip_duo', null, '5 ЧАСОВ'),
      name: 'DUO пакет 5 часов — марафон на двоих',
      desc: 'Пять часов игры бок о бок: от {BASE} ₽ с человека, в выходные и вечером — до {MAX} ₽. Мониторы 240 Гц, удобная парная посадка, снеки и напитки на баре.' },
    { slug: 'duo-night', cat: 4, url: '/prices', tariff: P('vip_duo', null, 'НОЧЬ'),
      name: 'Ночь вдвоём — зона DUO (2 ПК рядом)',
      desc: 'Ночной пакет 22:00–08:00 для двоих геймеров: {BASE} ₽ с человека в будни, {MAX} ₽ в выходные. Вся ночь кооператива в клубе, который не закрывается никогда.' },

    // SOLO
    { slug: 'solo-1h', cat: 5, url: '/prices', tariff: P('solo', null, '1 ЧАС'),
      name: 'Игровая комната SOLO, RTX 5070 — 1 час',
      desc: 'Приватная комната с самым мощным железом клуба: RTX 5070, монитор 400 Гц (PRO) или 27" 2K 240 Гц (PREMIUM), мышь G PRO X Superlight, свой кондиционер. Час — от {BASE} ₽, в пик — до {MAX} ₽.' },
    { slug: 'solo-3h', cat: 5, url: '/prices', tariff: P('solo', null, '3 ЧАСА'),
      name: 'SOLO комната на 3 часа — RTX 5070, 400 Гц',
      desc: 'Три часа в личной игровой комнате без посторонних: играй рейтинг, стримь, записывай контент. От {BASE} ₽ в будни, до {MAX} ₽ в выходные. Такого железа в Новокосино больше нет ни у кого.' },
    { slug: 'solo-5h', cat: 5, url: '/prices', tariff: P('solo', null, '5 ЧАСОВ'),
      name: 'SOLO комната на 5 часов — приватный гейминг',
      desc: 'Полноценная соло-сессия в комнате PREMIUM с 2K-монитором: от {BASE} ₽, в выходные — до {MAX} ₽. Тишина, свой климат, беспроводная периферия и зарядка для телефона под рукой.' },
    { slug: 'solo-night', cat: 5, url: '/prices', tariff: P('solo', null, 'НОЧЬ'),
      name: 'Ночь в SOLO комнате — RTX 5070',
      desc: 'Ночной пакет 22:00–08:00 в отдельной комнате: {BASE} ₽ в будни, {MAX} ₽ в выходные. Максимальная приватность и топовое железо — как дома, только в разы мощнее.' },

    // PS5 TV зона
    { slug: 'ps5-std-1h', cat: 6, url: '/prices', tariff: P('tv', 0, '1 ЧАС'),
      name: 'Поиграть в PS5 — 1 час (4K TV 55")',
      desc: 'Зона PlayStation 5 с большим 4K-экраном и диванами: EA FC 26, UFC 5, Mortal Kombat. Час — от {BASE} ₽, вечером и в выходные — до {MAX} ₽. Геймпадов DualSense хватит на всю компанию.' },
    { slug: 'ps5-std-3h', cat: 6, url: '/prices', tariff: P('tv', 0, '3 ЧАСА'),
      name: 'PS5 на 3 часа — FIFA, UFC, Mortal Kombat',
      desc: 'Три часа на PlayStation 5 перед 55" экраном: турнир по EA FC или вечер файтингов с друзьями. От {BASE} ₽ в будни, до {MAX} ₽ в выходные. Приходите компанией — диванов хватит всем.' },
    { slug: 'ps5-std-5h', cat: 6, url: '/prices', tariff: P('tv', 0, '5 ЧАСОВ'),
      name: 'PS5 на 5 часов — вечер с друзьями',
      desc: 'Пять часов консольного гейминга: от {BASE} ₽, в выходные — до {MAX} ₽. Большая библиотека игр PS5, включая свежие релизы. Отличный формат дня рождения или встречи старой компании.' },
    { slug: 'ps5-std-night', cat: 6, url: '/prices', tariff: P('tv', 0, 'НОЧЬ'),
      name: 'Ночь на PS5 — TV зона (22:00–08:00)',
      desc: 'Ночной пакет на PlayStation 5: {BASE} ₽ в будни, {MAX} ₽ в выходные. Вся ночь EA FC, UFC и Tekken на большом экране — пока город спит, вы забиваете голы.' },

    // PS5 VIP комната
    { slug: 'ps5-vip-1h', cat: 7, url: '/prices', tariff: P('tv', 1, '1 ЧАС'),
      name: 'PS5 в отдельной комнате — 1 час (TV VIP)',
      desc: 'Приватная комната с PlayStation 5, большим телевизором и мягким диваном: своя атмосфера, никого чужого. Час — от {BASE} ₽, вечером и в выходные — до {MAX} ₽. Комната одна — бронируйте заранее.' },
    { slug: 'ps5-vip-3h', cat: 7, url: '/prices', tariff: P('tv', 1, '3 ЧАСА'),
      name: 'TV VIP комната с PS5 — 3 часа',
      desc: 'Три часа в закрытой TV-комнате: файтинги и спортсимы своей компанией, громко и весело. От {BASE} ₽ в будни, до {MAX} ₽ в выходные. Формат для свиданий и посиделок с друзьями.' },
    { slug: 'ps5-vip-5h', cat: 7, url: '/prices', tariff: P('tv', 1, '5 ЧАСОВ'),
      name: 'TV VIP на 5 часов — праздник с PS5',
      desc: 'Пять часов в отдельной комнате с PS5 — готовый формат дня рождения в компьютерном клубе: от {BASE} ₽ в будни, до {MAX} ₽ в выходные. День рождения, девичник или просто вечер — комната ваша.' },
    { slug: 'ps5-vip-night', cat: 7, url: '/prices', tariff: P('tv', 1, 'НОЧЬ'),
      name: 'Ночь в TV VIP комнате с PS5',
      desc: 'Ночной пакет 22:00–08:00 в приватной комнате с PlayStation 5: {BASE} ₽ в будни, {MAX} ₽ в выходные. Ночная тусовка на большом экране без соседей.' },

    // Автосимуляторы
    { slug: 'simracing-1h', cat: 8, url: '/simracing', tariff: P('simracing', null, '1 ЧАС'),
      name: 'Автосимулятор гонок — 1 час (кокпит, руль MOZA)',
      desc: 'Профессиональный гоночный симулятор в Москве: спортивный ковш, руль с обратной связью MOZA, педали и 55" экран. Час — от {BASE} ₽ в будни, {MAX} ₽ в выходные. Assetto Corsa и F1 — почувствуй настоящую трассу.' },
    { slug: 'simracing-2h', cat: 8, url: '/simracing', tariff: P('simracing', null, '2 ЧАСА'),
      name: 'Автосимулятор — 2 часа заездов',
      desc: 'Два часа за рулём симрейсинг-кокпита: от {BASE} ₽ в будни, до {MAX} ₽ в выходные. Успеете освоить трассу, настроить болид и поставить личный рекорд. Кокпитов четыре — можно гоняться с друзьями.' },
    { slug: 'simracing-3h', cat: 8, url: '/simracing', tariff: P('simracing', null, '3 ЧАСА'),
      name: 'Автосимулятор — 3 часа, гонки с друзьями',
      desc: 'Три часа гонок на автосимуляторах: свои чемпионаты, дуэли, дрифт. От {BASE} ₽ в будни, до {MAX} ₽ в выходные. Единственные проф. кокпиты в Новокосино: RTX 5070 Ti и экран 120 Гц.' },

    // Абонементы
    { slug: 'abonement-day', cat: 9, url: '/prices', abonement: 'СУТКИ',
      name: 'Абонемент «Сутки» — 24 часа игры',
      desc: '24 часа игрового времени, которые можно тратить 7 дней как удобно. Общий зал — {P_COMMON} ₽, VIP/BOOTCAMP — {P_VIP} ₽, SOLO — {P_SOLO} ₽. Выгоднее разовых посещений, если играешь регулярно.' },
    { slug: 'abonement-50h', cat: 9, url: '/prices', abonement: '50 ЧАСОВ',
      name: 'Абонемент 50 часов — для постоянных игроков',
      desc: '50 часов на 20 дней — почасовая цена падает почти вдвое. Общий зал — {P_COMMON} ₽, VIP/BOOTCAMP — {P_VIP} ₽, SOLO — {P_SOLO} ₽. Часы списываются только когда играешь.' },
    { slug: 'abonement-100h', cat: 9, url: '/prices', abonement: '100 ЧАСОВ',
      name: 'Абонемент 100 часов — максимальная выгода',
      desc: '100 часов игры с действием 45 дней — самый выгодный тариф клуба. Общий зал — {P_COMMON} ₽, VIP/BOOTCAMP — {P_VIP} ₽, SOLO — {P_SOLO} ₽. Для тех, кто в клубе как дома.' },

    // Сертификат
    { slug: 'certificate', cat: 10, url: '/certificate', fixedPrice: 1000,
      name: 'Сертификат в компьютерный клуб — подарочный',
      desc: 'Подарочный сертификат CyberX Новокосино номиналом от 1000 до 5000 ₽: часы игры, ночные пакеты, PS5 или автосимулятор — получатель выберет сам. Оформление на сайте за пару минут.' },
];

/* ---------- сборка ---------- */

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function findPhoto(slug) {
    for (const ext of ['jpg', 'jpeg', 'png']) {
        if (fs.existsSync(path.join(PHOTO_DIR, slug + '.' + ext))) return SITE + '/yandex-menu/' + slug + '.' + ext;
    }
    return null;
}

const missingPhotos = [];
const rows = [];

const offersXml = OFFERS.map(o => {
    let price, desc = o.desc;
    if (o.abonement) {
        const a = abonement(o.abonement);
        price = a.base;
        desc = desc.replaceAll('{P_COMMON}', a.base).replaceAll('{P_VIP}', a.vip).replaceAll('{P_SOLO}', a.solo);
    } else if (o.fixedPrice) {
        price = o.fixedPrice;
    } else {
        const t = priceOf(o.tariff.zone, o.tariff.sub, o.tariff.time);
        price = t.base;
        desc = desc.replaceAll('{BASE}', t.base).replaceAll('{MAX}', t.max);
    }
    if (desc.match(/\{[A-Z_]+\}/)) throw new Error('Неподставленный плейсхолдер в ' + o.slug + ': ' + desc);
    if (desc.length > 500) throw new Error('Описание длиннее 500 символов: ' + o.slug + ' (' + desc.length + ')');

    const photo = findPhoto(o.slug);
    if (!photo) missingPhotos.push(o.slug);
    rows.push({ slug: o.slug, name: o.name, price, cat: CATS.find(c => c.id === o.cat).name, photo: !!photo });

    return [
        '            <offer id="' + o.slug + '">',
        '                <name>' + esc(o.name) + '</name>',
        '                <price>' + price + '</price>',
        '                <currencyId>RUR</currencyId>',
        '                <categoryId>' + o.cat + '</categoryId>',
        photo ? '                <picture>' + esc(photo) + '</picture>' : null,
        '                <description>' + esc(desc) + '</description>',
        '                <url>' + esc(SITE + o.url) + '</url>',
        '            </offer>',
    ].filter(Boolean).join('\n');
}).join('\n');

const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<yml_catalog>',
    '    <shop>',
    '        <categories>',
    ...CATS.map(c => '            <category id="' + c.id + '">' + esc(c.name) + '</category>'),
    '        </categories>',
    '        <offers>',
    offersXml,
    '        </offers>',
    '    </shop>',
    '</yml_catalog>',
    '',
].join('\n');

fs.mkdirSync(PHOTO_DIR, { recursive: true });
fs.writeFileSync(OUT, xml, 'utf8');

/* ---------- отчёт ---------- */

console.log('YML: ' + path.relative(ROOT, OUT) + ' (' + OFFERS.length + ' позиций, ' + Math.round(xml.length / 1024) + ' КБ)');
console.log('');
for (const c of CATS) {
    console.log('— ' + c.name);
    for (const r of rows.filter(r => r.cat === c.name)) {
        console.log('   ' + (r.photo ? '[фото]' : '[ --- ]') + ' ' + r.price + ' ₽\t' + r.name + '  (' + r.slug + ')');
    }
}
console.log('');
if (missingPhotos.length) {
    console.log('Без фото (' + missingPhotos.length + '/' + OFFERS.length + '): ожидаются файлы в public/yandex-menu/: ' + missingPhotos.map(s => s + '.jpg').join(', '));
} else {
    console.log('Все ' + OFFERS.length + ' позиций с фото — фид готов к этапу 2.');
}
