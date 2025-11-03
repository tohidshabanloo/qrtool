import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import QRCode from 'qrcode'

export default function Home() {
  const [text, setText] = useState('https://qrtool.example')
  const [isDark, setIsDark] = useState(false)
  const [hasQr, setHasQr] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('qrtool-theme') : null
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = saved === 'dark' || (!saved && prefersDark)
    setIsDark(initialDark)
    if (initialDark) document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    try { localStorage.setItem('qrtool-theme', isDark ? 'dark' : 'light') } catch {}
  }, [isDark])

  const generate = async (value) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const fg = isDark ? '#e5e7eb' : '#111827'
    const bg = isDark ? '#0b1220' : '#ffffff'
    try {
      await QRCode.toCanvas(canvas, value || text || ' ', {
        margin: 2,
        width: 280,
        color: { dark: fg, light: bg }
      })
      setHasQr(true)
    } catch (e) {
      setHasQr(false)
    }
  }

  const downloadPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'qrtool.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  useEffect(() => {
    generate(text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      generate()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Head>
        <title>سازنده فوری کد QR | QRTool</title>
        <meta name="description" content="متن یا لینک را وارد کنید، QR آماده دریافت کنید. ساخت فوری کد QR رایگان." />
        <link rel="canonical" href="https://qrtool.ir/" />
        <meta property="og:url" content="https://qrtool.ir/" />
        <meta property="og:title" content="QRTool — سازنده فوری کد QR" />
        <meta property="og:description" content="متن یا لینک را وارد کنید، QR آماده دریافت کنید. ساخت فوری کد QR رایگان." />
        <meta property="og:image" content="https://qrtool.ir/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': 'https://qrtool.ir/#webpage',
              url: 'https://qrtool.ir/',
              inLanguage: 'fa-IR',
              description: 'QRTool — ساخت فوری کد QR رایگان',
              isPartOf: { '@id': 'https://qrtool.ir/#website' },
              lastReviewed: new Date().toISOString(),
              reviewedBy: { '@type': 'Organization', name: 'QRTool' },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://qrtool.ir/#organization',
              name: 'QRTool',
              url: 'https://qrtool.ir/',
              logo: 'https://qrtool.ir/logo.png',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'چطور با QRTool کد QR بسازم؟',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      'متن یا لینک خود را در کادر وارد کنید و روی دکمه «تولید» بزنید. تصویر QR بلافاصله نمایش داده می‌شود و می‌توانید آن را به صورت PNG دانلود کنید.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'آیا کدهای QR ساخته‌شده منقضی می‌شوند؟',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'خیر. بارکدهای ایجاد شده دائمی هستند و تحت هیچ شرایطی منقضی نمی‌شوند.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'آیا استفاده از QRTool رایگان است؟',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'بله، ساخت کد QR در QRTool کاملاً رایگان است.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'چطور تم تاریک یا روشن را تغییر دهم؟',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'با کلیک روی دکمه «تغییر تم» در بالای صفحه می‌توانید بین حالت تاریک و روشن جابه‌جا شوید. انتخاب شما برای دفعات بعد نیز ذخیره می‌شود.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'چطور تصویر QR را دانلود کنم؟',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'پس از تولید QR روی دکمه «دانلود PNG» کلیک کنید تا فایل تصویر با فرمت PNG ذخیره شود.',
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <header className="w-full border-b border-gray-200/70 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="QRTool" className="h-14 w-14 rounded-xl object-contain shadow-soft" />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">QRTool</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">ساخت فوری کد QR رایگان</p>
            </div>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="تغییر تم"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            <span>{isDark ? 'روشن' : 'تاریک'}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 18a6 6 0 0 0 0-12v12Zm0 4a10 10 0 1 0 0-20a10 10 0 0 0 0 20Z"/></svg>
          </button>
        </div>
      </header>

      <main className="w-full flex-1">
        <section className="mx-auto max-w-3xl px-4 py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">سازنده کد QR</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">متن یا لینک را وارد کنید و فوری دریافت کنید.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 md:p-6 shadow-soft bg-white dark:bg-gray-900">
              <label htmlFor="qr-input" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">متن یا لینک</label>
              <div className="flex gap-2">
                <input
                  id="qr-input"
                  dir="ltr"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="https://example.com یا هر متنی"
                  className="flex-1 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  onClick={() => generate()}
                  className="shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
                >
                  تولید
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">با Enter هم تولید میشود</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">بارکدهای ایجاد شده دائمی است و تحت هیچ شرایطی منقضی نمی‌شود.</p>
            </div>

            <div className={`rounded-2xl border border-gray-200 dark:border-white/10 p-4 md:p-6 shadow-soft bg-white dark:bg-gray-900 ${hasQr ? 'fade-in' : ''}`}>
              <div className="aspect-square w-full rounded-xl grid place-items-center bg-gray-50 dark:bg-gray-950 border border-gray-200/70 dark:border-white/10">
                <canvas ref={canvasRef} className="!w-[280px] !h-[280px]" />
              </div>
              <button
                onClick={downloadPng}
                className="mt-4 w-full rounded-xl border border-gray-300 dark:border-white/10 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                دانلود PNG
              </button>
            </div>
          </div>
        </section>

        
      </main>

      <footer className="w-full border-t border-gray-200/70 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          ساخته شده با ❤️ توسط 
          {" "}
          <a className=" hover:decoration-solid" href="https://www.koolegard.com" target="_blank" rel="noreferrer">توحید شعبانلو</a>
          
        </div>
      </footer>
    </div>
  )
}
