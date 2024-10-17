import "@upstash/claps/style.css";
import "./globals.css";

import { ReactNode, Suspense } from "react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { SITE_URL } from "@/utils/const";
import cx from "@/utils/cx";

import { PHProvider } from "@/lib/posthog";
import { SegmentProvider } from "@/lib/segment/provider";

import { Footer, Header, HeaderMobile } from "@/components/master";
import { Analytics, ThirdPartyScripts } from "@/components";

const PostHogPageView = dynamic(() => import("@/lib/posthog/page-view"), {
  ssr: false,
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const interDisplay = localFont({
  variable: "--font-display",
  src: [
    {
      path: "./fonts/Inter-DisplayMedium.woff2",
      weight: "500",
    },
    {
      path: "./fonts/Inter-DisplaySemiBold.woff2",
      weight: "600",
    },
    {
      path: "./fonts/Inter-DisplayBold.woff2",
      weight: "700",
    },
  ],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cx(
        inter.variable,
        interDisplay.variable,
        "min-h-screen scroll-smooth bg-zinc-950 text-sm text-zinc-50 antialiased md:text-base",
      )}
    >
      <PHProvider>
        <body className="pt-[70px] md:pt-[80px]">
          <PostHogPageView />
          <Suspense>
            <Analytics />
          </Suspense>
          <SegmentProvider
            writeKey={process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY!}
          >
            <Header />
            <HeaderMobile />
            {children}
            <Footer />
          </SegmentProvider>
          <ThirdPartyScripts />
        </body>
      </PHProvider>
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
