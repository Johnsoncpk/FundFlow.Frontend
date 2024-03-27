/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  env: {
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
  }
};

module.exports = nextConfig;