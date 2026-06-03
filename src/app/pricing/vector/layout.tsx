import SeoPlanData from "@/components/pricing/vector/seo-plan-data";
import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Vector Pricing";
const description =
  "Upstash Vector pricing. Free tier for prototypes, Pay as You Go at $0.40 per 100K requests, Fixed plans from $60/month, and enterprise.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing/vector",
    types: {
      "text/markdown": "/pricing/vector.md",
    },
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/pricing/vector",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PricingVectorLayout({
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
