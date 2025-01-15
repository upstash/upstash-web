import "../../src/styles/post.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import { SITE_URL } from "../../src/utils/const";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Upstash Glossary",
    template: "%s | Upstash Glossary",
  },
  description:
    "Upstash Glossary is a collection of terms and concepts related to databases, serverless, and cloud computing.",
};

export default function GlossaryLayout({ children }: { children: ReactNode }) {
  return children;
}
