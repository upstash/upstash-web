import "../post.css";
import "../code.css";
import { SITE_URL } from "@/utils/const";
import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Upstash Blog";
const description = "Articles and tutorials from Upstash and community.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Blog",
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    url: `/blog`,
    siteName: title,
    type: "website",
    images: "/og-blog.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@upstash",
    creator: "@upstash",
    images: "/og-blog.jpg",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-zinc-50 pb-20 text-emerald-950 dark:bg-transparent dark:text-inherit">
      {children}
    </div>
  );
}
