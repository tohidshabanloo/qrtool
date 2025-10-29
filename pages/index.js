import { useEffect, useRef, useState } from 'react'
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
      <header className="w-full border-b border-gray-200/70 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-soft" />
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

        <section className="mx-auto max-w-3xl px-4 pb-14">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-semibold mb-4">نحوه کار</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Step icon={<IconInput />} title="ورود متن یا لینک" desc="هر متنی یا URL معتبر" />
              <Step icon={<IconBolt />} title="کلیک روی تولید" desc="تولید آنی QR" />
              <Step icon={<IconDownload />} title="دانلود QR" desc="ذخیره به صورت PNG" />
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-gray-200/70 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 QRTool — ساخته شده با ❤️ توسط Tohid
          {" "}
          <a className="underline decoration-dotted hover:decoration-solid" href="https://www.youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </footer>
    </div>
  )
}

function Step({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="h-10 w-10 rounded-xl grid place-items-center bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-500/20">
        {icon}
      </div>
      <div className="font-medium">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{desc}</div>
    </div>
  )
}

function IconInput() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 5h16v2H4zM4 11h10v2H4zM4 17h16v2H4z"/></svg>
  )
}

function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 21h-1l1-7H7l6-11h1l-1 7h4l-6 11z"/></svg>
  )
}

function IconDownload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 20h14v-2H5v2zm7-18l-5 6h3v6h4v-6h3l-5-6z"/></svg>
  )
}


