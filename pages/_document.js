import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const meta = {
      title: 'Upstash: Serverless Database for Redis',
      description:
        'Run Serverless Database without thinking about the servers. It costs you nothing if nobody is using.',
      url: process.env.BASE_URL,
      imagePath: 'static/logo/square-dark.png',
      imageSize: 1024,
      googleAnalytic: 'G-QW5KRSTDM0'
    }

    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-ExtraBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* base */}
          <meta charSet="utf-8" />
          <meta name="robots" content="follow, index" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content={meta.description} />
          <link rel="canonical" href={meta.url} />

          {/* facebook */}
          <meta property="og:url" content={meta.url} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:image" content={meta.url + meta.imagePath} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content={meta.imageSize} />
          <meta property="og:image:height" content={meta.imageSize} />

          {/* twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={meta.url} />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.url + meta.imagePath} />
          <meta name="twitter:width" content={meta.imageSize} />
          <meta name="twitter:height" content={meta.imageSize} />

          {/* icons */}

          <link href="/static/icons/site.webmanifest" rel="manifest" />
          <link
            href="/static/icons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/icons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/icons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            color="#050505"
            href="/static/icons/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <meta content="#050505" name="theme-color" />
          <meta content="#050505" name="msapplication-TileColor" />

          {/* analytic */}
          {process.env.NODE_ENV !== 'development' && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${meta.googleAnalytic}`}
              />
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${meta.googleAnalytic}');`
                }}
              />
            </>
          )}
          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js.hs-scripts.com/6849390.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
