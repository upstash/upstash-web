import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Redis Pricing";
const description =
  "Upstash Redis pricing. Free tier for prototypes, Pay as You Go at $0.20 per 100K commands, Fixed plans from $10/month, and enterprise.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing/redis",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/pricing/redis",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PricingRedisLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
