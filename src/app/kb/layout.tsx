import "../../styles/post.css";
import "../../styles/code.css";
import { KB_DESCRIPTION } from "@/lib/kb";
import { SITE_URL } from "@/utils/const";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Upstash Knowledge Base";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Knowledge Base",
    template: `%s | ${title}`,
  },
  description: KB_DESCRIPTION,
  alternates: {
    canonical: "/kb",
  },
  openGraph: {
    title,
    description: KB_DESCRIPTION,
    url: "/kb",
    siteName: title,
    type: "website",
    images: "/og-blog.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: KB_DESCRIPTION,
    site: "@upstash",
    creator: "@upstash",
    images: "/og-blog.jpg",
  },
};

export default function KbLayout({ children }: { children: ReactNode }) {
  return <div className="pb-20">{children}</div>;
}
