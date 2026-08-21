const SITE_URL = process.env.SITE_URL || "https://upstash.com";
const ASK_EXAMPLES = require("./src/lib/ask-examples.json");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    if (path === "/") {
      return { loc: path, changefreq: "daily", priority: 1.0, lastmod: new Date().toISOString() };
    }

    if (["/pricing", "/redis", "/enterprise", "/contact", "/about"].includes(path)) {
      return { loc: path, changefreq: "weekly", priority: 0.9, lastmod: new Date().toISOString() };
    }

    if (path === "/blog") {
      return { loc: path, changefreq: "daily", priority: 0.8, lastmod: new Date().toISOString() };
    }

    if (path.startsWith("/blog/") && !path.startsWith("/blog/tag/") && !path.startsWith("/blog/author/")) {
      return { loc: path, changefreq: "monthly", priority: 0.6, lastmod: new Date().toISOString() };
    }

    if (path.startsWith("/blog/tag/") || path.startsWith("/blog/author/")) {
      return { loc: path, changefreq: "weekly", priority: 0.3, lastmod: new Date().toISOString() };
    }

    if (path.startsWith("/customers")) {
      return { loc: path, changefreq: "monthly", priority: 0.7, lastmod: new Date().toISOString() };
    }

    if (path.startsWith("/examples")) {
      return { loc: path, changefreq: "weekly", priority: 0.5, lastmod: new Date().toISOString() };
    }

    return { loc: path, changefreq: config.changefreq, priority: config.priority, lastmod: new Date().toISOString() };
  },
  // Example /ask queries so crawlers and agents discover the answer index.
  // Kept in sync with the markdown/404 hints via src/lib/ask-examples.json.
  additionalPaths: async () =>
    ASK_EXAMPLES.map((question) => ({
      loc: `/ask?q=${question.replace(/ /g, "+")}`,
      changefreq: "weekly",
      priority: 0.5,
    })),
  robotsTxtOptions: {
    additionalSitemaps: ["https://upstash.com/docs/sitemap.xml"],
    policies: [
      { userAgent: "Twitterbot", allow: "/" },
      {
        userAgent: "*",
        allow: ["/", "/ask", "/ask?*"],
        disallow: [
          "/*?",
          "/*%",
          "/v1*",
          "/v2*",
          "/help/",
          "/oss/",
          "/api/",
          "/tags/",
          "/devops/",
        ],
      },
    ],
  },
};
