import "../post.css";

import { ReactNode } from "react";
import { Metadata } from "next";

import { SITE_URL } from "@/utils/const";

const title = "Upstash Careers";
const description =
  "Help us build the cutting edge data platform for the serverless era.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Upstash Careers",
    template: `%s | ${title}`,
  },
  description,
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
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}
