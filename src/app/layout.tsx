import "@upstash/claps/style.css";
import "../styles/globals.css";
import "../styles/prism.css";
import Analytics from "@/components/Analytics";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { CspViolationReporter } from "@/components/csp-violation-reporter";
import { IntercomWrapper } from "@/components/intercom-wrapper";
import Footer from "@/components/master/footer";
import Header from "@/components/master/header";
import HeaderMobile from "@/components/master/header-mobile";
import { PolicyBanner } from "@/components/policy-banner";
import { GA_MEASUREMENT_ID, SITE_URL } from "@/utils/const";
import cx from "@/utils/cx";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
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

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cx(
        fontText.variable,
        fontDisplay.variable,
        fontMono.variable,
        "scroll-smooth",
      )}
      suppressHydrationWarning
    >
      <IntercomWrapper>
        <body
          className={cx(
            // header height + the 36px SkillsBanner sitting above it
            "min-h-screen pt-[106px] antialiased md:pt-[116px]",
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

          {/* stacked bottom banners, so they never overlap each other */}
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-0 md:bottom-4 md:gap-3">
            <PolicyBanner />
            <CookieConsentBanner />
          </div>

          <CspViolationReporter />

          {process.env.NODE_ENV !== "development" && (
            <>
              <Script
                id="ga-consent"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                          function gtag(){ dataLayer.push(arguments); }
                          window.gtag = window.gtag || gtag;
                          var consent = 'pending';
                          try {
                            var stored = JSON.parse(localStorage.getItem('global-store'));
                            if (stored && stored.state && stored.state.cookieConsent) {
                              consent = stored.state.cookieConsent;
                            }
                          } catch (e) {}
                          if (consent === 'granted') {
                            gtag('consent', 'default', {
                              analytics_storage: 'granted',
                              ad_storage: 'granted',
                              ad_user_data: 'granted',
                              ad_personalization: 'granted',
                              wait_for_update: 500
                            });
                          } else {
                            gtag('consent', 'default', {
                              analytics_storage: 'denied',
                              ad_storage: 'denied',
                              ad_user_data: 'denied',
                              ad_personalization: 'denied',
                              region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'],
                              wait_for_update: 500
                            });
                            gtag('consent', 'default', {
                              analytics_storage: 'granted',
                              ad_storage: 'granted',
                              ad_user_data: 'granted',
                              ad_personalization: 'granted',
                              wait_for_update: 500
                            });
                          }`,
                }}
              />
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              />
              <Script
                id="ga"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: ` window.dataLayer = window.dataLayer || [];
                          function gtag(){ dataLayer.push(arguments); }
                          window.gtag = window.gtag || gtag;
                          gtag('js', new Date());
                          gtag('config', '${GA_MEASUREMENT_ID}');`,
                }}
              />
              <Script
                id="promptwatch"
                strategy="afterInteractive"
                src="https://ingest.promptwatch.com/js/client.min.js"
                data-project-id="0ef1db08-c833-4ebc-b064-4b52f3bfa233"
              />
            </>
          )}
        </body>
      </IntercomWrapper>
    </html>
  );
}

const title = "Upstash: Serverless Data Platform - Redis, Vector, Search";
const description =
  "Serverless Redis, Vector and Search databases with low latency and pay-as-you-go pricing. Upstash is the data platform for modern and AI applications — create a Redis database in seconds.";

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
      siteName: "Upstash",
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
    verification: {
      google: "9uteOuIS_pV0F3lt44DZ6OFmMXKMH04f-s4nJ4IhhIA",
    },
  };
}
