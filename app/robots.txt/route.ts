// robots.txt is built here instead of app/robots.ts: MetadataRoute.Robots cannot output
// Yandex's Clean-param. Yandex had /?ge=… and /?_ym_status-check=… in its index as separate
// pages, and the certificate constructor writes its settings into the URL (/certificate?to=…&n=…).

export const dynamic = "force-static";

const SITE_URL = "https://cyberx-novokosino.ru";

const DISALLOW = [
    "/api/", // Скрываем API роуты (экономим краулинговый бюджет)
    "/calculator", // Внутренний калькулятор компенсаций
    "/aim", // Технический раздел
    "/private/", // Личный кабинет
    "/admin/", // Админка
    "/admin-rules", // Инструкция администратора
    "/social-hub", // Закрытый Social Hub
];

// AI-поисковики и ассистенты: пускаем на весь сайт, кроме служебных разделов. Бот, у которого
// есть своя группа, правила группы «*» не читает, поэтому Disallow повторяем и здесь.
const AI_BOTS = ["OAI-SearchBot", "GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "CCBot", "Google-Extended"];

// Для Яндекса: метки и параметры, которые не меняют содержимое страницы.
const CLEAN_PARAM = [
    "utm_source&utm_medium&utm_campaign&utm_content&utm_term",
    "yclid&ysclid&gclid&fbclid&ge&_ym_status-check&_ym_lang",
    // Настройки конструктора подарочного сертификата: страница та же, меняется только картинка.
    "to&from&n&skin&img&occ&oc&msg&gift&test /certificate",
];

function group(userAgent: string, lines: string[]) {
    return [`User-Agent: ${userAgent}`, ...lines].join("\n");
}

const disallowLines = DISALLOW.map((path) => `Disallow: ${path}`);

const ROBOTS = [
    group("*", ["Allow: /", ...disallowLines]),
    ...AI_BOTS.map((bot) => group(bot, ["Allow: /", ...disallowLines])),
    group("Yandex", ["Allow: /", ...disallowLines, ...CLEAN_PARAM.map((p) => `Clean-param: ${p}`)]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n\n");

export function GET() {
    return new Response(`${ROBOTS}\n`, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
