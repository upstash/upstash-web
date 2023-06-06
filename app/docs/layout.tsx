import "../post.css";
import "../code.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/const";
import Bg from "@/components/bg";
import Container from "@/components/container";

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
    <main className="relative z-0">
      <Bg />

      <section className="mt-10">
        <Container>
          <div className="grid grid-cols-5 gap-10">{children}</div>
        </Container>
      </section>
    </main>
  );
}
