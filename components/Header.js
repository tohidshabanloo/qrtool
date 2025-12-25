import Link from 'next/link'

export default function Header({ isDark, setIsDark }) {
  return (
    <header className="w-full border-b border-gray-200/70 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img src="/logo.png" alt="QRTool - ساخت qrcode و سازنده qr code رایگان" className="h-10 w-10 rounded-xl object-contain shadow-soft group-hover:scale-105 transition" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold tracking-tight">QRTool</h1>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">ساخت فوری کد QR رایگان</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/blog" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4a2 2 0 002 2h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10" /></svg>
              وبلاگ
            </Link>
          </nav>
        </div>
        <div className="text-center flex-1 px-4 hidden lg:block">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">سازنده کد QR</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/blog" className="md:hidden text-gray-600 dark:text-gray-400 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4a2 2 0 002 2h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10" /></svg>
          </Link>
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="تغییر تم"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition flex-shrink-0"
          >
            <span>{isDark ? 'روشن' : 'تاریک'}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 18a6 6 0 0 0 0-12v12Zm0 4a10 10 0 1 0 0-20a10 10 0 0 0 0 20Z" /></svg>
          </button>
        </div>
      </div>
    </header>
  )
}
