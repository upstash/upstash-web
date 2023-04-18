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
  },
  twitter: {
    card: "summary",
    title,
    description,
    site: "@upstash",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
