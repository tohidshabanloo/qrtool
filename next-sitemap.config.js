const { blogPosts } = require('./data/blogSitemapData')

// Use SITE_URL env variable if set, otherwise use production URL
// For local development, set SITE_URL=http://localhost:3000 before building
const siteUrl = process.env.SITE_URL || 'https://www.qrtool.ir'

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
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
    additionalSitemaps: [],
  },
  additionalPaths: async (config) => {
    const result = []

    // Add blog index page
    result.push({
      loc: '/blog',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })

    // Add all blog post pages
    blogPosts.forEach((post) => {
      result.push({
        loc: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date(post.date).toISOString(),
      })
    })

    return result
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : path.startsWith('/blog') ? 0.8 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: siteUrl, hreflang: 'fa-IR' },
        { href: siteUrl, hreflang: 'fa' },
        { href: siteUrl, hreflang: 'x-default' },
      ],
    }
  },
}

module.exports = config;


