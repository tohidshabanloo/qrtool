/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qrtool.ir';

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      `${SITE_URL}/sitemap.xml`,
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
};


