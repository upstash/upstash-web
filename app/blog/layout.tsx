import "./prism.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/const";

const title = "Upstash Blog";
const description = "Articles and tutorials from Upstash and community.";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/blog`,
    siteName: title,
    type: "website",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-blog.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@upstash",
    creator: "@upstash",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-blog.jpg`],
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
