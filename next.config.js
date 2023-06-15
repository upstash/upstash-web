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
  images:{
    domains: ["github.com","avatars.githubusercontent.com"]
  }
};

module.exports = withContentlayer(nextConfig);
