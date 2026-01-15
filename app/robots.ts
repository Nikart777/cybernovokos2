import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/api/', '/aim', '/private/', '/admin/'],
    },
    sitemap: 'https://cyberx-novokosino.ru/sitemap.xml',
    host: 'https://cyberx-novokosino.ru',
  };
}