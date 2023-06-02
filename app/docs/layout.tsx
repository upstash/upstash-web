import { ReactNode } from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/const";
import Bg from "@/components/bg";
import Container from "@/components/container";
import DocSidebar from "./sidebar";

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

      <section className="mt-6">
        <Container>
          <div className="grid grid-cols-4">
            <DocSidebar />
            <div className="col-span-3">{children}</div>
          </div>
        </Container>
      </section>
    </main>
  );
}
