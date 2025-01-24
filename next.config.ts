import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'adjoining-ostrich-c77.notion.site',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828],
    imageSizes: [16, 32, 64, 128, 159, 256, 384],
  },
};

export default nextConfig;
