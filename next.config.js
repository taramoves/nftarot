/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true }, // react-icons IconType vs Chakra icon prop
  async rewrites() {
    return [
      {
        source: '/card-reveal/:readingId',
        destination: '/card-reveal/[readingId]',
      },
    ];
  },
};

module.exports = nextConfig;