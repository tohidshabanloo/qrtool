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
    <div className="h-screen flex flex-col items-center overflow-x-hidden overflow-y-hidden">
      <Head>
        <title>سازنده کد QR | ساخت qrcode رایگان و سریع | QRTool</title>
        <meta name="description" content="بهترین سازنده qr code رایگان برای ساخت qrcode لینک، وای‌فای، واتس‌اپ و کارت ویزیت. با qrcode builder اختصاصی ما، بارکد دو بعدی خود را شخصی‌سازی کنید." />
        <meta name="keywords" content="ساخت qrcode, سازنده qr code, qrcode builder, qrcode generator, ساخت بارکد رایگان, کیو آر کد سریع" />
        <link rel="canonical" href="https://www.qrtool.ir/" />
        <link rel="alternate" hreflang="fa-IR" href="https://www.qrtool.ir/" />
        <link rel="alternate" hreflang="fa" href="https://www.qrtool.ir/" />
        <link rel="alternate" hreflang="x-default" href="https://www.qrtool.ir/" />
        <meta property="og:url" content="https://www.qrtool.ir/" />
        <meta property="og:title" content="QRTool — ساخت فوری و رایگان qrcode" />
        <meta property="og:description" content="با استفاده از سازنده qr code ما، در کمتر از چند ثانیه qrcode خود را بسازید و شخصی‌سازی کنید." />
        <meta property="og:image" content="https://www.qrtool.ir/logo.png" />
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
              '@id': 'https://www.qrtool.ir/#webpage',
              url: 'https://www.qrtool.ir/',
              inLanguage: 'fa-IR',
              description: 'بهترین سازنده qr code و qrcode builder فارسی رایگان',
              isPartOf: { '@id': 'https://www.qrtool.ir/#website' },
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
              '@id': 'https://www.qrtool.ir/#organization',
              name: 'QRTool',
              url: 'https://www.qrtool.ir/logo.png',
              logo: 'https://www.qrtool.ir/logo.png',
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

      <main className="w-full flex-1 overflow-hidden relative">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950 -z-10" />
        
        <section className="h-full mx-auto max-w-7xl px-4 py-4 md:py-6">
          {/* Main Content - Horizontal Layout */}
          <div className="h-full grid lg:grid-cols-[1.8fr_1fr] gap-4 md:gap-6 items-start">
            {/* Left: Form Section */}
            <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm p-5 md:p-6">
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
            </div>

            {/* Right: QR Code Preview - Sticky */}
            <div className="lg:sticky lg:top-4 h-fit">
              <QRDisplay
                canvasRef={canvasRef}
                hasQr={hasQr}
                isGenerating={isGenerating}
                downloadPng={downloadPng}
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
