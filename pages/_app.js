import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>کیوآرتول — سازنده فوری کد QR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="QRTool — ساخت فوری کد QR رایگان. متن یا لینک را وارد کنید و فوری دریافت کنید." />
        <link rel="canonical" href="https://qrtool.ir/" />
        <meta name="application-name" content="QRTool" />
        <meta name="theme-color" content="#ffffff" />
        <meta httpEquiv="content-language" content="fa" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="QRTool" />
        <meta property="og:url" content="https://qrtool.ir/" />
        <meta property="og:title" content="QRTool — سازنده فوری کد QR" />
        <meta property="og:description" content="متن یا لینک را وارد کنید، QR آماده دریافت کنید. ساخت فوری کد QR رایگان." />
        <meta property="og:image" content="https://qrtool.ir/logo.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

