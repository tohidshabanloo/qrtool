/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://qrtool.ir',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: 'https://qrtool.ir', hreflang: 'fa' },
      ],
    }
  },
}

module.exports = config;

 
