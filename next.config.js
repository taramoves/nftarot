/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  compilerOptions: {
    skipLibCheck: true,
  },
  include: [
    "index.d.ts",
    "next-env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx",
  ],
  exclude: ["node_modules"],
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