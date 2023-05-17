const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://upstash.slack.com/archives/C02Q9BA1F8C/p1684349628476519
  productionBrowserSourceMaps: true,
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
};

module.exports = withContentlayer(nextConfig);
