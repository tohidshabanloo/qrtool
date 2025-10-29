import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import QRCode from 'qrcode';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  // Check system theme preference on mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Generate QR Code
  const generateQR = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(inputText, {
        width: 300,
        margin: 2,
        color: {
          dark: isDark ? '#f1f5f9' : '#1e293b',
          light: isDark ? '#1e293b' : '#ffffff',
        },
      });
      setQrCode(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
    setIsGenerating(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateQR();
    }
  };

  // Download QR Code
  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <title>QRTool - ساخت رایگان کد QR</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {/* Header */}
        <header className="text-center pt-16 pb-8 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-3 tracking-tight">
            QRTool
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium">
            ساخت آنی و رایگان کد QR
          </p>
        </header>

        {/* Main QR Generator */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-300">
            {/* Input Section */}
            <div className="mb-8">
              <label htmlFor="qr-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                لینک یا متن خود را وارد کنید
              </label>
              <input
                id="qr-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="https://example.com یا هر متن دلخواه..."
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all duration-200"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateQR}
              disabled={!inputText.trim() || isGenerating}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isGenerating ? 'در حال ساخت...' : 'ساخت کد QR'}
            </button>

            {/* QR Code Display */}
            {qrCode && (
              <div className="mt-10 animate-fadeIn">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-3xl p-8 shadow-inner flex justify-center items-center">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
                    <img 
                      src={qrCode} 
                      alt="Generated QR Code" 
                      className="w-[300px] h-[300px] rounded-xl"
                    />
                  </div>
                </div>
                
                {/* Download Button */}
                <button
                  onClick={downloadQR}
                  className="mt-6 w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  دانلود به صورت PNG
                </button>
              </div>
            )}
          </div>

          {/* How It Works */}
          <section className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-10">
              چگونه کار می‌کند؟
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-2">
                  متن را وارد کنید
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-center">
                  لینک یا متن خود را در کادر بالا بنویسید
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-2">
                  روی ساخت کلیک کنید
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-center">
                  کد QR شما به صورت آنی ساخته می‌شود
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-2">
                  دانلود کنید
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-center">
                  فایل PNG را دانلود و استفاده کنید
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 md:mt-24 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  QRTool
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                  ساخت رایگان و آنی کد QR با بهترین کیفیت
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-6">
                <a 
                  href="https://youtube.com/@tohidshabanloo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-full transition-all duration-300 hover:scale-105 font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  کانال یوتیوب
                </a>
                
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  <span>ساخته شده با</span>
                  <span className="text-red-500 animate-pulse">❤️</span>
                  <span>توسط توحید</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500">
                  © 2025 QRTool. تمامی حقوق محفوظ است.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
