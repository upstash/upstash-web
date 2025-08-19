import "../../styles/post.css";
import "./customer.css";
import { SITE_URL } from "@/utils/const";
import { Metadata } from "next";
import { ReactNode } from "react";

const title = "Upstash Customers";
const description =
  "Upstash powers companies of every size and industry, from cutting-edge AI to everyday retail.";

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
