import "../../styles/post.css";
import { SITE_URL } from "@/utils/const";
import { Metadata } from "next";
import { ReactNode } from "react";

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
