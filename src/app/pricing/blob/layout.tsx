import SeoPlanData from "@/components/pricing/blob/seo-plan-data";
import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Blob Pricing";
const description =
  "Upstash Blob pricing. Free tier with 1 GB storage and 10 GB bandwidth, then pay as you go at $0.02 per GB stored and $0.02 per GB of bandwidth.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing/blob",
    types: {
      "text/markdown": "/pricing/blob.md",
    },
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/pricing/blob",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PricingBlobLayout({
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
