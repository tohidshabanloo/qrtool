import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { blogPosts } from '../../data/blogData'
import { useState, useEffect } from 'react'

export default function BlogPost() {
    const router = useRouter()
    const { slug } = router.query
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

    // Find the current post
    const post = blogPosts.find((p) => p.slug === slug)

    if (!router.isReady) return null
    if (!post) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors" dir="rtl">
                <Header isDark={isDark} setIsDark={toggleTheme} />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold mb-4">مقاله مورد نظر پیدا نشد.</h1>
                    <Link href="/blog" className="text-indigo-600 dark:text-indigo-400 font-bold underline">
                        بازگشت به لیست مقالات
                    </Link>
                </main>
                <Footer />
            </div>
        )
    }

    // Get related posts (random 3 excluding current)
    const relatedPosts = blogPosts
        .filter((p) => p.slug !== slug)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors" dir="rtl">
            <Head>
                <title>{post.title} | QRTool</title>
                <meta name="description" content={post.excerpt} />
                <meta name="keywords" content={post.keywords} />
                <link rel="canonical" href={`https://qrtool.ir/blog/${post.slug}`} />

                {/* Open Graph */}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.thumbnail} />
                <meta property="og:url" content={`https://qrtool.ir/blog/${post.slug}`} />
                <meta property="og:type" content="article" />

                {/* Article Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": post.title,
                            "image": post.thumbnail,
                            "datePublished": post.date,
                            "author": {
                                "@type": "Organization",
                                "name": "QRTool"
                            }
                        })
                    }}
                />
            </Head>

            <Header isDark={isDark} setIsDark={toggleTheme} />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
                <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-indigo-600 transition">خانه</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-indigo-600 transition">وبلاگ</Link>
                    <span>/</span>
                    <span className="truncate">{post.title}</span>
                </nav>

                <article>
                    <header className="mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 border-y border-gray-200 dark:border-white/5 py-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                </div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{post.readTime} مطالعه</span>
                            </div>
                        </div>

                        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/5">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/blog/thumbnails/blog_thumbnail_what_is_qr.png'
                                }}
                            />
                        </div>
                    </header>

                    <div
                        className="blog-content prose prose-lg dark:prose-invert prose-indigo max-w-none 
            prose-headings:font-black prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-r-4 prose-h2:border-indigo-600 prose-h2:pr-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                <section className="mt-24 pt-12 border-t border-gray-200 dark:border-white/5">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">مطالب پیشنهادی دیگر</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedPosts.map((related) => (
                            <Link key={related.slug} href={`/blog/${related.slug}`} className="group block flex flex-col">
                                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/5">
                                    <img
                                        src={related.thumbnail}
                                        alt={related.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        onError={(e) => {
                                            e.target.src = '/blog/thumbnails/blog_thumbnail_what_is_qr.png'
                                        }}
                                    />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-2 leading-snug">
                                    {related.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="mt-24 p-8 rounded-3xl bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-right">
                        <h2 className="text-2xl font-bold mb-2">همین حالا کد QR خود را بسازید!</h2>
                        <p className="opacity-90">سریع، رایگان و بدون محدودیت با امکان شخصی‌سازی کامل</p>
                    </div>
                    <Link href="/" className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-gray-100 transition shadow-lg shrink-0">
                        شروع ساخت کد QR
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    )
}
