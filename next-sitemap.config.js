/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.qrtool.ir',
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
    additionalSitemaps: ['https://www.qrtool.ir/sitemap.xml'],
  },
  additionalPaths: async (config) => {
    // Use dynamic import to load ES6 module
    const { blogPosts } = await import('./data/blogData.js')
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
        { href: 'https://www.qrtool.ir', hreflang: 'fa-IR' },
        { href: 'https://www.qrtool.ir', hreflang: 'fa' },
        { href: 'https://www.qrtool.ir', hreflang: 'x-default' },
      ],
    }
  },
}

module.exports = config;

 
