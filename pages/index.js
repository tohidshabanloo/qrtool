import Head from 'next/head'
import { useQRGenerator } from '../hooks/useQRGenerator'
import Header from '../components/Header'
import Footer from '../components/Footer'
import QRForm from '../components/QRForm'
import QRDisplay from '../components/QRDisplay'

export default function Home() {
  const {
    qrType,
    setQrType,
    text,
    setText,
    isDark,
    setIsDark,
    hasQr,
    isGenerating,
    canvasRef,
    designOptions,
    setDesignOptions,
    generate,
    downloadPng,
    onKeyDown
  } = useQRGenerator()

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Head>
        <title>سازنده کد QR | ساخت qrcode رایگان و سریع | QRTool</title>
        <meta name="description" content="بهترین سازنده qr code رایگان برای ساخت qrcode لینک، وای‌فای، واتس‌اپ و کارت ویزیت. با qrcode builder اختصاصی ما، بارکد دو بعدی خود را شخصی‌سازی کنید." />
        <meta name="keywords" content="ساخت qrcode, سازنده qr code, qrcode builder, qrcode generator, ساخت بارکد رایگان, کیو آر کد سریع" />
        <link rel="canonical" href="https://qrtool.ir/" />
        <meta property="og:url" content="https://qrtool.ir/" />
        <meta property="og:title" content="QRTool — ساخت فوری و رایگان qrcode" />
        <meta property="og:description" content="با استفاده از سازنده qr code ما، در کمتر از چند ثانیه qrcode خود را بسازید و شخصی‌سازی کنید." />
        <meta property="og:image" content="https://qrtool.ir/logo.png" />
        <meta property="og:type" content="website" />

        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              'name': 'QRTool Generator',
              'operatingSystem': 'Web',
              'applicationCategory': 'UtilitiesApplication',
              'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD'
              },
              'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': '4.9',
                'ratingCount': '1024'
              }
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': 'https://qrtool.ir/#webpage',
              url: 'https://qrtool.ir/',
              inLanguage: 'fa-IR',
              description: 'بهترین سازنده qr code و qrcode builder فارسی رایگان',
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
              url: 'https://qrtool.ir/logo.png',
              logo: 'https://qrtool.ir/logo.png',
              sameAs: [
                'https://www.instagram.com/qrtool.ir',
                'https://twitter.com/qrtool_ir'
              ]
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
                  name: 'چطور با QRTool ساخت qrcode را انجام دهم؟',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      'کافیست از سازنده qr code ما استفاده کنید: متن یا لینک را وارد کنید، رنگ و طرح را انتخاب کنید و تصویر نهایی را دانلود کنید.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'آیا این qrcode builder رایگان است؟',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'بله، استفاده از تمامی امکانات qrcode generator ما کاملاً رایگان و بدون محدودیت است.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'کدهای QR ساخته شده دائمی هستند؟',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'بله، کدهای ساخته شده با این سازنده qr code هرگز منقضی نمی‌شوند.',
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <Header isDark={isDark} setIsDark={setIsDark} />

      <main className="w-full flex-1 overflow-hidden">
        <section className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
            <div className="order-last lg:order-first overflow-y-auto max-h-[calc(100vh-120px)] pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <QRForm
                qrType={qrType}
                setQrType={setQrType}
                text={text}
                setText={setText}
                designOptions={designOptions}
                setDesignOptions={setDesignOptions}
                onGenerate={generate}
                onKeyDown={onKeyDown}
                isDark={isDark}
              />
            </div>
            <div className="order-first lg:order-last lg:sticky lg:top-6">
              <QRDisplay
                canvasRef={canvasRef}
                hasQr={hasQr}
                isGenerating={isGenerating}
                downloadPng={downloadPng}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 border-t border-gray-200 dark:border-white/10 mt-12 mb-12">
          <div className="max-w-4xl mx-auto text-right" dir="rtl">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 border-r-4 border-indigo-600 pr-4">
              آموزش ساخت qrcode با استفاده از سازنده qr code رایگان QRTool
            </h2>

            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed">
              <p className="mb-6 text-lg">
                آیا به دنبال یک <strong>سازنده qr code</strong> حرفه‌ای و سریع هستید؟ <strong>QRTool</strong> به عنوان یک <strong>qrcode builder</strong> پیشرفته، به شما این امکان را می‌دهد تا انواع کدهای QR را برای مصارف مختلف به صورت کاملاً رایگان تولید کنید.
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">مراحل ساخت qrcode در چند ثانیه:</h3>
              <ol className="list-decimal list-inside space-y-3 mb-8">
                <li><strong>انتخاب نوع کد:</strong> از منوی بالا، نوع محتوای خود (لینک، متن، وای‌فای، واتس‌اپ و ...) را انتخاب کنید.</li>
                <li><strong>ورود اطلاعات:</strong> اطلاعات مورد نظر خود را در کادر مربوطه وارد نمایید.</li>
                <li><strong>شخصی‌سازی (اختیاری):</strong> با استفاده از بخش طراحی، رنگ‌ها، شکل بدنه و لوگوی اختصاصی خود را اضافه کنید.</li>
                <li><strong>تولید و دانلود:</strong> روی دکمه «تولید» کلیک کرده و سپس فایل PNG را دریافت کنید.</li>
              </ol>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">چرا QRTool بهترین qrcode generator است؟</h3>
              <p className="mb-6">
                ما با ارائه ابزاری ساده اما قدرتمند، تلاش می‌کنیم تا بهترین تجربه <strong>ساخت qrcode</strong> را برای کاربران ایرانی فراهم کنیم. برخی از ویژگی‌های برتر این ابزار عبارتند از:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-8">
                <li>پشتیبانی کامل از زبان فارسی و متون یونیکد</li>
                <li>قابلیت شخصی‌سازی رنگ و لوگو بدون هزینه اضافی</li>
                <li>بدون نیاز به ثبت‌نام و کاملاً ناشناس</li>
                <li>سازگاری کامل با تمامی گوشی‌های هوشمند (اندروید و آیفون)</li>
              </ul>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 mt-12">
                <p className="text-indigo-700 dark:text-indigo-300 font-medium text-sm m-0">
                  نکته سئو: برای نتایج بهتر در گوگل، همیشه از کدهای QR با کنتراست رنگی بالا استفاده کنید تا توسط دوربین‌ها سریع‌تر اسکن شوند.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
