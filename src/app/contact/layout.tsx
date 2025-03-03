import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales",
  description: "Unlock the full potential of Upstash for your business.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
