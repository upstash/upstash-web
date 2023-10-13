const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://upstash.com",
  },
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["github.com", "avatars.githubusercontent.com"],
  },
  rewrites: () => [
    {
      source: "/docs",
      destination: "https://upstash.mintlify.dev/docs",
    },
    {
      source: "/docs/:match*",
      destination: "https://upstash.mintlify.dev/docs/:match*",
    },
  ],
};

module.exports = withContentlayer(nextConfig);
