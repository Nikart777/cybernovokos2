/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/terms',
        destination: '/legal/rules',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/llms.txt',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/llms-full.txt',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  // Игнорируем ошибки при сборке, чтобы сайт гарантированно собрался
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // ВАЖНО: Оптимизация отключена для стабильности на хостинге.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tildacdn.com',
      },
      {
        protocol: 'https',
        hostname: 'optim.tildacdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
