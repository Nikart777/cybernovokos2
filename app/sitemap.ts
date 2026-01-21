import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cyberx-novokosino.ru';

    return [
        {
            url: baseUrl, // Главная страница обычно без слеша в строке
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/prices`, // Убрали слеш
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contacts`, // Убрали слеш
            lastModified: new Date(),
            changeFrequency: 'monthly', // Контакты меняются редко
            priority: 0.5,
        },
        {
            url: `${baseUrl}/simracing`, // Убрали слеш
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];
}