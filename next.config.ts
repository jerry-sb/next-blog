import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828],
    imageSizes: [16, 32, 64, 128, 159, 256, 384],
  },
};

export default nextConfig;
