import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'], // Закрываем технические API, кроме публичных
    },
    // Sitemap обязателен для правильной индексации
    sitemap: 'https://cyberx-novokosino.ru/sitemap.xml',
  };
}