import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { blogPosts } from '../../data/blogData'
import { useState, useEffect } from 'react'

export default function BlogIndex() {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem('qrtool-theme')
        if (saved === 'light') {
            setIsDark(false)
            document.documentElement.classList.remove('dark')
        } else {
            setIsDark(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleTheme = (val) => {
        setIsDark(val)
        localStorage.setItem('qrtool-theme', val ? 'dark' : 'light')
        if (val) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors" dir="rtl">
            <Head>
                <title>وبلاگ تخصصی qrcode و کد QR | آموزش ساخت، کاربرد و امنیت - QRTool</title>
                <meta name="description" content="مجموعه کامل مقالات آموزشی درباره qrcode، کد QR، بارکد دو بعدی، سازنده qr code رایگان، آموزش ساخت qrcode، کاربردهای کد QR در بازاریابی و کسب‌وکار، امنیت کدهای QR و راهنمای جامع برای کاربران ایرانی." />
                <meta name="keywords" content="qrcode, کد QR, سازنده qr code, ساخت qrcode, بارکد دو بعدی, آموزش ساخت کد QR, qrcode generator, کیو آر کد, ساخت کیو آر کد رایگان, کاربرد کد QR, امنیت کد QR, تاریخچه qrcode, انواع کد QR" />
                <link rel="canonical" href="https://www.qrtool.ir/blog" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta httpEquiv="content-language" content="fa" />
                <meta name="language" content="Persian" />
                <meta name="geo.region" content="IR" />
                <meta name="geo.placename" content="Iran" />
                
                {/* Open Graph */}
                <meta property="og:title" content="وبلاگ تخصصی qrcode و کد QR | آموزش ساخت و کاربرد - QRTool" />
                <meta property="og:description" content="آموزش‌های جامع درباره qrcode، ساخت کد QR رایگان، کاربردهای تجاری و نکات امنیتی را در وبلاگ QRTool بخوانید." />
                <meta property="og:url" content="https://www.qrtool.ir/blog" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="fa_IR" />
                <meta property="og:site_name" content="QRTool - سازنده کد QR" />
                <meta property="og:image" content="https://www.qrtool.ir/logo.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="وبلاگ تخصصی qrcode و کد QR | QRTool" />
                <meta name="twitter:description" content="آموزش‌های جامع درباره qrcode، ساخت کد QR رایگان و کاربردهای تجاری" />
                
                {/* Structured Data - Blog */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Blog",
                            "name": "وبلاگ QRTool - آموزش qrcode و کد QR",
                            "description": "مجموعه کامل مقالات آموزشی درباره qrcode، کد QR، ساخت بارکد دو بعدی و کاربردهای آن",
                            "url": "https://www.qrtool.ir/blog",
                            "publisher": {
                                "@type": "Organization",
                                "name": "QRTool",
                                "url": "https://www.qrtool.ir",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://www.qrtool.ir/logo.png"
                                }
                            },
                            "inLanguage": "fa-IR",
                            "blogPost": blogPosts.map(post => ({
                                "@type": "BlogPosting",
                                "headline": post.title,
                                "url": `https://www.qrtool.ir/blog/${post.slug}`,
                                "datePublished": post.date,
                                "author": {
                                    "@type": "Organization",
                                    "name": post.author
                                },
                                "image": `https://www.qrtool.ir${post.thumbnail}`
                            }))
                        })
                    }}
                />
                
                {/* Breadcrumb Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "خانه",
                                    "item": "https://www.qrtool.ir"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "وبلاگ",
                                    "item": "https://www.qrtool.ir/blog"
                                }
                            ]
                        })
                    }}
                />
            </Head>

            <Header isDark={isDark} setIsDark={toggleTheme} />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                        وبلاگ تخصصی qrcode و کد QR | آموزش ساخت و کاربرد
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                        مجموعه کامل مقالات آموزشی درباره <strong>qrcode</strong>، <strong>کد QR</strong>، <strong>سازنده qr code</strong>، آموزش ساخت <strong>qrcode</strong> رایگان، کاربردهای تجاری، نکات امنیتی و راهنمای جامع برای کاربران ایرانی. همه چیز درباره <strong>بارکد دو بعدی</strong>، از تاریخچه تا کاربردهای مدرن و ترفندهای طراحی را در اینجا بیاموزید.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">qrcode</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">سازنده qr code</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">ساخت qrcode</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">آموزش کد QR</span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">بارکد دو بعدی</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.slug} className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-soft hover:shadow-xl transition-all flex flex-col">
                            <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                                <img
                                    src={post.thumbnail}
                                    alt={`تصویر مقاله ${post.title} - آموزش qrcode و کد QR`}
                                    title={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                        // Fallback to the first generated image if quota error happened
                                        e.target.src = '/blog/thumbnails/blog_thumbnail_what_is_qr.png'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                            </Link>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                                        آموزشی
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-500">{post.date}</span>
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition leading-tight">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-500">{post.readTime} مطالعه</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
}
