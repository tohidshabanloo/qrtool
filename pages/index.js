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
        <title>سازنده پیشرفته کد QR | QRTool</title>
        <meta name="description" content="ایمیل، تماس، واتس‌اپ، وای‌فای، V-Card و انواع دیگر کدهای QR را رایگان بسازید. ساخت فوری کد QR پیشرفته." />
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
              url: 'https://qrtool.ir/logo.png',
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

      <Header isDark={isDark} setIsDark={setIsDark} />

      <main className="w-full flex-1 overflow-hidden">
        <section className="mx-auto max-w-7xl px-4 py-6 h-full">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start h-full">
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
      </main>

      <Footer />
    </div>
  )
}
