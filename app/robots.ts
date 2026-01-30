import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',   // Явно разрешаем публичные страницы
            disallow: [
                '/api/',        // Скрываем API роуты (экономим краулинговый бюджет)
                '/aim',         // Технический раздел
                '/private/',    // Личный кабинет
                '/admin/',      // Админка
                '/arena',       // Закрытая зона для клиентов
                '/social-hub',  // Закрытый Social Hub
                '/_next/',      // Системные файлы Next.js
            ],
        },
        sitemap: 'https://cyberx-novokosino.ru/sitemap.xml',
    };
}