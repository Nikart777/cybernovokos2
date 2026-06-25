import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',   // Явно разрешаем публичные страницы
                disallow: [
                    '/api/',        // Скрываем API роуты (экономим краулинговый бюджет)
                    '/calculator',  // Внутренний калькулятор компенсаций
                    '/aim',         // Технический раздел
                    '/private/',    // Личный кабинет
                    '/admin/',      // Админка
                    '/admin-rules', // Инструкция администратора
                    '/social-hub',  // Закрытый Social Hub
                    '/legal/',      // Правовые документы
                    '/_next/',      // Системные файлы Next.js
                ],
            },
            {
                userAgent: 'OAI-SearchBot',
                allow: '/',
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
            }
        ],
        sitemap: 'https://cyberx-novokosino.ru/sitemap.xml',
    };
}