import "./globals.css";
import "@upstash/claps/style.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ReactNode } from "react";
import cx from "@/utils/cx";
import { SITE_URL } from "@/utils/const";
import Header from "@/components/master/header";
import HeaderMobile from "@/components/master/header-mobile";
import Footer from "@/components/master/footer";
import Head from "next/head";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const interDisplay = localFont({
  variable: "--font-display",
  src: [
    {
      path: "./fonts/inter/Inter-DisplayMedium.woff2",
      weight: "500",
    },
    {
      path: "./fonts/inter/Inter-DisplaySemiBold.woff2",
      weight: "600",
    },
    {
      path: "./fonts/inter/Inter-DisplayBold.woff2",
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
        "min-h-screen scroll-smooth bg-zinc-950 text-sm text-zinc-50 antialiased md:text-base"
      )}
    >
      <body>
        <Head>
          {process.env.NODE_ENV !== "development" && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=G-QW5KRSTDM0`}
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

        <Header />
        <HeaderMobile />
        {children}
        <Footer />
      </body>
    </html>
  );
}

const title = "Upstash: Serverless Data for Redis® and Kafka®";
const description =
  "Designed for the serverless with per-request pricing and Redis®/Kafka® API.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | Upstash`,
  },
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: title,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    site: "@upstash",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icons/favicon-32x32.png",
    apple: "/icons/apple-touch-icon.png",
  },
};
