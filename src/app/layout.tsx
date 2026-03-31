import "@upstash/claps/style.css";
import "../styles/globals.css";
import "../styles/prism.css";
import Analytics from "@/components/Analytics";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { IntercomWrapper } from "@/components/intercom-wrapper";
import Footer from "@/components/master/footer";
import Header from "@/components/master/header";
import HeaderMobile from "@/components/master/header-mobile";
import { SITE_URL } from "@/utils/const";
import cx from "@/utils/cx";
import { Inter, Inter_Tight } from "next/font/google";
import Script from "next/script";
import { ReactNode, Suspense } from "react";

const fontText = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontDisplay = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cx(fontText.variable, fontDisplay.variable, "scroll-smooth")}
      suppressHydrationWarning
    >
      <IntercomWrapper>
        <body
          className={cx(
            "min-h-screen pt-[70px] antialiased md:pt-[80px]",
            "text-sm text-text md:text-base",
            "bg-bg",
          )}
        >
          <Suspense>
            <Analytics />
          </Suspense>

          <Header />
          <HeaderMobile />
          {children}
          <Footer />
          <CookieConsentBanner />

          {process.env.NODE_ENV !== "development" && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=G-QW5KRSTDM0`}
              />
              <Script
                id="ga"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: ` window.dataLayer = window.dataLayer || [];
                          function gtag(){ dataLayer.push(arguments); }
                          gtag('js', new Date());
                          gtag('config', 'G-QW5KRSTDM0');`,
                }}
              />
            </>
          )}
        </body>
      </IntercomWrapper>
    </html>
  );
}

const title = "Upstash: Serverless Data Platform";
const description =
  "Upstash is a serverless data platform providing low latency and high scalability for real-time applications. Optimize your data infrastructure with Upstash's managed services for Redis, Vector, QStash, and other key data technologies.";

export async function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | Upstash`,
    },
    description,
    keywords: [
      "redis",
      "vector",
      "qstash",
      "serverless database",
      "global database",
      "serverless vector",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      title,
      description,
      siteName: title,
      images: "/og-home.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@upstash",
      creator: "@upstash",
      images: "/og-home.jpg",
    },
    icons: {
      icon: "/icons/favicon-32x32.png",
      apple: "/icons/apple-touch-icon.png",
    },
    manifest: `${SITE_URL}/site.webmanifest`,
    alternates: {
      canonical: "./",
    },
  };
}
