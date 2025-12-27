import { useRef } from 'react'

export default function QRDisplay({ canvasRef, hasQr, isGenerating, downloadPng }) {
  return (
    <div className={`rounded-2xl border border-gray-200 dark:border-white/10 p-4 md:p-5 shadow-soft bg-white dark:bg-gray-900 ${hasQr ? 'fade-in' : ''}`}>
      {/* Step 3 Label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-base shadow-md">
          3
        </div>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200">دانلود کد QR</h2>
      </div>
      
      {/* Compact QR Preview */}
      <div className="rounded-xl grid place-items-center bg-gray-50 dark:bg-gray-950 border border-gray-200/70 dark:border-white/10 relative mb-4" style={{ aspectRatio: '1', minHeight: '200px', maxHeight: '280px' }}>
        <canvas ref={canvasRef} className="!w-full !h-full max-w-[220px] max-h-[220px] md:max-w-[240px] md:max-h-[240px]" />
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 rounded-xl backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400">
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs">در حال تولید...</span>
            </div>
          </div>
        )}
        {!hasQr && !isGenerating && (
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600">
            <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <span className="text-xs">کد QR اینجا نمایش داده می‌شود</span>
          </div>
        )}
      </div>
      
      {/* Download Button */}
      <button
        onClick={downloadPng}
        disabled={!hasQr}
        className={`w-full rounded-xl text-white px-4 py-3 transition-all flex items-center justify-center gap-2 font-semibold shadow-md ${
          hasQr 
            ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95' 
            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-60'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        دانلود کد QR
      </button>
    </div>
  )
}
