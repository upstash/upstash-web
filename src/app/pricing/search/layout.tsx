import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Search Pricing";
const description =
  "Upstash Search pricing. Free tier for prototypes, Pay as You Go at $0.05 per 1K requests, and enterprise.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing/search",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/pricing/search",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PricingSearchLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
