import { useRef } from 'react'

export default function QRDisplay({ canvasRef, hasQr, isGenerating, downloadPng }) {
  return (
    <div className={`relative ${hasQr ? 'fade-in' : ''}`}>
      {/* Professional Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm p-5 md:p-6">
        {/* Step 3 Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            3
          </div>
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">دانلود کد QR</h2>
        </div>

        {/* QR Code Preview - Compact */}
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden mb-4" style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <canvas 
            ref={canvasRef} 
            style={{ 
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto', 
              height: 'auto',
              display: 'block'
            }}
            className="relative z-10 w-full h-full object-contain"
          />
          
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 rounded-lg backdrop-blur-sm z-20">
              <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg className="animate-spin h-6 w-6 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xs font-medium">در حال تولید...</span>
              </div>
            </div>
          )}
          
          {!hasQr && !isGenerating && (
            <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 relative z-10">
              <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="text-xs font-medium">کد QR اینجا نمایش داده می‌شود</span>
            </div>
          )}
        </div>
        
        {/* Download Button - Professional */}
        <button
          onClick={downloadPng}
          disabled={!hasQr}
          className={`w-full rounded-lg text-white px-5 py-3.5 transition-all flex items-center justify-center gap-2 font-semibold shadow-sm ${
            hasQr 
              ? 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 hover:shadow-md active:scale-[0.98]' 
              : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          دانلود کد QR
        </button>
      </div>
    </div>
  )
}
