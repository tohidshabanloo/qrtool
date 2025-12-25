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
                <title>وبلاگ تخصصی کد QR | راهنما و آموزش ساخت - QRTool</title>
                <meta name="description" content="مجموعه کامل مقالات آموزشی درباره کدهای QR، کاربردها، امنیت و روش‌های ساخت انواع بارکد دو بعدی رایگان در وبلاگ QRTool." />
                <link rel="canonical" href="https://qrtool.ir/blog" />
                <meta property="og:title" content="وبلاگ تخصصی کد QR | QRTool" />
                <meta property="og:description" content="آموزش‌ها و دانستنی‌های دنیای کدهای QR را در وبلاگ ما دنبال کنید." />
                <meta property="og:url" content="https://qrtool.ir/blog" />
                <meta property="og:type" content="website" />
            </Head>

            <Header isDark={isDark} setIsDark={toggleTheme} />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">وبلاگ آموزشی QRTool</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        همه چیز درباره کدهای QR، از تاریخچه تا کاربردهای مدرن و ترفندهای طراحی را در اینجا بیاموزید.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.slug} className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-soft hover:shadow-xl transition-all flex flex-col">
                            <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
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
