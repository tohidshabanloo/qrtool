import { useRef } from 'react'

export default function QRDisplay({ canvasRef, hasQr, isGenerating, downloadPng }) {
  return (
    <div className={`rounded-2xl border border-gray-200 dark:border-white/10 p-4 md:p-6 shadow-soft bg-white dark:bg-gray-900 ${hasQr ? 'fade-in' : ''}`}>
      <button
        onClick={downloadPng}
        className="w-full mb-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition flex items-center justify-center gap-2 font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        دانلود کد QR
      </button>
      <div className="aspect-square w-full rounded-xl grid place-items-center bg-gray-50 dark:bg-gray-950 border border-gray-200/70 dark:border-white/10 relative">
        <canvas ref={canvasRef} className="!w-[280px] !h-[280px]" />
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm">در حال تولید...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
