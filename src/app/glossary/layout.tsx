import "./glossary.css";
import { SITE_URL } from "@/utils/const";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Upstash Glossary",
    template: "%s | Upstash Glossary",
  },
  description: "Upstash Glossary",
  openGraph: {
    images: "/og-home.jpg",
  },
  twitter: {
    images: "/og-home.jpg",
  },
};

export default function GlossaryLayout({ children }: { children: ReactNode }) {
  return children;
}
