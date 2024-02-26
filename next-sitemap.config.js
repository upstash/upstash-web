const SITE_URL = process.env.SITE_URL || "https://upstash.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateIndexSitemap: true,
  generateRobotsTxt: false,
  
};
