import { Metadata } from "next";
import FastResult from "@/components/fast/result";
import Container from "@/components/container";
import dynamic from "next/dynamic";
import cx from "@/utils/cx";
import Link from "next/link";

const AnimatedGlobe = dynamic(() => import("@/components/home/fast/globe"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Fast",
  description:
    "An AWS Lambda function from different regions reads from Upstash Redis and records latency.",
};

export default function HomePage() {
  return (
    <main>
      <Container>
        <div className="grid py-10 md:grid-cols-2 md:py-44">
          <div className="md:w-4/5">
            <h1
              className={cx(
                "font-display text-4xl font-bold leading-none md:text-5xl",
                "bg-gradient-to-r from-20% bg-clip-text text-transparent",
                "from-emerald-400 to-yellow-300"
              )}
            >
              Fast Anywhere ⚡️
            </h1>

            <p className="mt-4 text-lg opacity-60 md:text-2xl">
              An AWS Lambda function from different regions reads from Upstash
              Redis* and records latency.
            </p>

            <div className="mt-8">
              <FastResult />
            </div>

            <div className="mt-4 opacity-40">
              See the{" "}
              <Link href="/blog/global-database" className="underline">
                blog post
              </Link>
              .
            </div>
          </div>

          <div className="relative -z-10 hidden md:block">
            <div className="absolute left-1/2 top-1/2 -translate-x-[600px] -translate-y-1/2">
              <AnimatedGlobe />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
