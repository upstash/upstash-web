import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Box Pricing";
const description =
  "Upstash Box pricing. Free tier for prototypes, Pay as You Go from $0.10 per active CPU hour, and enterprise.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing/box",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/pricing/box",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PricingBoxLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
