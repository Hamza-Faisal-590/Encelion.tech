/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@encelion/ui',
    '@encelion/types',
    '@encelion/auth',
    '@encelion/ai',
    '@encelion/validation',
    '@encelion/database'
  ]
};

module.exports = nextConfig;
