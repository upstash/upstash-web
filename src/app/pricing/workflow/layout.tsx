import SeoPlanData from "@/components/pricing/workflow/seo-plan-data";
import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Workflow Pricing";
const description =
  "Upstash Workflow pricing. Free tier for prototypes, Pay as You Go at $1 per 100K steps, Fixed plans from $180/month, and enterprise.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing/workflow",
    types: {
      "text/markdown": "/pricing/workflow.md",
    },
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/pricing/workflow",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PricingWorkflowLayout({
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
