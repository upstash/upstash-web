import SeoPlanData from "@/components/pricing/qstash/seo-plan-data";
import { Metadata } from "next";
import { ReactNode } from "react";

const title = "QStash Pricing";
const description =
  "Upstash QStash pricing. Free tier for prototypes, Pay as You Go at $1 per 100K messages, Fixed plans from $180/month, and enterprise.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing/qstash",
    types: {
      "text/markdown": "/pricing/qstash.md",
    },
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/pricing/qstash",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PricingQStashLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <SeoPlanData />
    </>
  );
}
