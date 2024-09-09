import "../post.css";
import "./customer.css";

import { ReactNode } from "react";
import { Metadata } from "next";

import { SITE_URL } from "@/utils/const";

const title = "Upstash Customers";
const description = ""; // TODO: add description

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
};

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return children;
}
