const SITE_URL = process.env.SITE_URL || "https://upstash.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  robotsTxtOptions: {
	additionalSitemaps: ['https://upstash.com/docs/sitemap.xml'],
    policies: [
      {
        userAgent: "*",
        allow: "/",
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
