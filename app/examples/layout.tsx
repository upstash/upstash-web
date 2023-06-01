import "../post.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/const";

const title = "Upstash Examples";
const description =
  "Jumpstart your app development process with our pre-built solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
};

export default function ExamplesLayout({ children }: { children: ReactNode }) {
  return children;
}
