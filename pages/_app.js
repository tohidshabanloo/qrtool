import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qrtool.example'

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        defaultTitle="کیوآرتول — سازنده فوری کد QR"
        titleTemplate="%s | کیوآرتول"
        description="ساخت فوری و رایگان کد QR با رابط کاربری فارسی و تیره/روشن"
        canonical={SITE_URL}
        openGraph={{
          type: 'website',
          locale: 'fa_IR',
          url: SITE_URL,
          siteName: 'QRTool',
          images: [
            {
              url: `${SITE_URL}/logo.png`,
              width: 512,
              height: 512,
              alt: 'QRTool',
            },
          ],
        }}
        twitter={{ cardType: 'summary_large_image' }}
        additionalMetaTags={[
          { name: 'robots', content: 'index,follow' },
          { name: 'googlebot', content: 'index,follow' },
        ]}
      />
      <Component {...pageProps} />
    </>
  )
}

