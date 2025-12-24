export default function Header({ isDark, setIsDark }) {
  return (
    <header className="w-full border-b border-gray-200/70 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" alt="QRTool" className="h-12 w-12 rounded-xl object-contain shadow-soft" />
          <div>
            <h1 className="text-lg font-extrabold tracking-tight">QRTool</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">ساخت فوری کد QR رایگان</p>
          </div>
        </div>
        <div className="text-center flex-1 px-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">سازنده کد QR</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">متن یا لینک را وارد کنید و فوری دریافت کنید.</p>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          aria-label="تغییر تم"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition flex-shrink-0"
        >
          <span>{isDark ? 'روشن' : 'تاریک'}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 18a6 6 0 0 0 0-12v12Zm0 4a10 10 0 1 0 0-20a10 10 0 0 0 0 20Z"/></svg>
        </button>
      </div>
    </header>
  )
}
