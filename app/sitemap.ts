import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cyberx-novokosino.ru';

    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date('2026-07-14'),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/prices`,
            lastModified: new Date('2026-08-13'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contacts`,
            lastModified: new Date('2026-07-14'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/promo`,
            lastModified: new Date('2026-08-13'),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/simracing`,
            lastModified: new Date('2026-07-14'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(Math.max(...blogPosts.map((post) => new Date(post.updated).getTime()))),
            changeFrequency: 'weekly',
            priority: 0.75,
        },
        ...blogPosts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated),
            changeFrequency: 'monthly' as const,
            priority: 0.72,
        })),
        {
            url: `${baseUrl}/mouse-test`,
            lastModified: new Date('2026-03-26'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/certificate`,
            lastModified: new Date('2026-07-14'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];
}
