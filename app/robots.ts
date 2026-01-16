import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/_next/static/', '/_next/image'],
            disallow: ['/api/', '/aim', '/private/', '/admin/'],
        },
        sitemap: 'https://cyberx-novokosino.ru/sitemap.xml',
        host: 'cyberx-novokosino.ru',
    };
}