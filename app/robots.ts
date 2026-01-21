import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            // allow: '/', // Можно оставить для явности, но не обязательно
            disallow: [
                '/api/',      // Скрываем API роуты (экономим краулинговый бюджет)
                '/aim',       // Если это тех. раздел
                '/private/',  // Личный кабинет
                '/admin/',    // Админка
                '/_next/',    // Можно закрыть системные файлы Next.js, чтобы не мусорить в логах сканирования, 
                // НО Google рекомендует давать доступ к JS/CSS. 
                // Лучше просто не указывать их ни в allow, ни в disallow.
            ],
        },
        sitemap: 'https://cyberx-novokosino.ru/sitemap.xml',
    };
}