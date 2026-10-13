/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@encelion/ui',
    '@encelion/types',
    '@encelion/auth',
    '@encelion/ai',
    '@encelion/rag',
    '@encelion/voice',
    '@encelion/validation',
    '@encelion/database',
    '@encelion/payments',
    '@encelion/storage',
    '@encelion/email'
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
