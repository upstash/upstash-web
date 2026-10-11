import SeoPlanData from "@/components/pricing/blob/seo-plan-data";
import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Blob Pricing";
const description =
  "Upstash Blob pay-as-you-go costs $0.02 per GB stored with free egress up to 1 TB a month. The free tier includes 1 GB storage and 10 GB bandwidth.";

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
    images: "/og-home.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: "/og-home.jpg",
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
