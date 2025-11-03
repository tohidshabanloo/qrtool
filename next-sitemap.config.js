/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://qrtool.ir',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Amazonbot', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'meta-externalagent', disallow: '/' },
    ],
    additionalSitemaps: ['https://qrtool.ir/sitemap.xml'],
  },
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

 
