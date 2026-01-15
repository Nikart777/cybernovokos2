import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
<<<<<<< HEAD
      disallow: ['/_next/', '/api/', '/aim', '/private/', '/admin/'], // Технические пути и исключенные страницы
=======
      disallow: ['/private/', '/admin/', '/api/'], // Закрываем технические API, кроме публичных
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f
    },
    // Sitemap обязателен для правильной индексации
    sitemap: 'https://cyberx-novokosino.ru/sitemap.xml',
    host: 'https://cyberx-novokosino.ru',
  };
}