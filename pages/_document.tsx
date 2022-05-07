import Document, { Html, Head, Main, NextScript } from "next/document";
import { META } from "constants/";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
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
          {process.env.NODE_ENV !== "development" && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${META.googleAnalytic}`}
              />
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: ` window.dataLayer = window.dataLayer || [];
                            function gtag(){ dataLayer.push(arguments); }
                            gtag('js', new Date());
                            gtag('config', 'G-QW5KRSTDM0');`,
                }}
              />
              <script
                type="text/javascript"
                id="hs-script-loader"
                async
                defer
                src="//js.hs-scripts.com/6849390.js"
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
