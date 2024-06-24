/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
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
};

module.exports = nextConfig;
