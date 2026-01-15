import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cyberx-novokosino.ru';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
<<<<<<< HEAD
      url: `${baseUrl}/prices`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/simracing`,
=======
      url: `${baseUrl}/arena`,
      lastModified: new Date(),
      changeFrequency: 'always', // Арена обновляется часто (лобби)
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Якоря на главной (помогают Яндексу понять структуру для Быстрых ссылок)
    {
      url: `${baseUrl}/#price`,
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
<<<<<<< HEAD
      url: `${baseUrl}/contacts`,
=======
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}