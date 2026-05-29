import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import {
  IconApi,
  IconArrowsMaximize,
  IconBolt,
  IconDatabase,
  IconPlugConnected,
  IconServer2,
  IconShieldLock,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";

export default function SectionFeatures() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">Why Upstash Redis</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          A serverless Redis database built for modern, global applications.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2 md:mt-16 md:gap-4 xl:grid-cols-4">
          {FEATURES.map(({ title, desc, icon }, index) => (
            <div
              key={index}
              className={cx(
                "flex flex-col gap-3 p-5 md:p-6",
                "rounded-3xl border-2 border-bg-mute bg-bg-mute",
              )}
            >
              <span
                className={cx(
                  "inline-flex size-10 shrink-0 items-center justify-center",
                  "rounded-full bg-primary text-white dark:bg-white/10",
                )}
              >
                {icon}
              </span>
              <h3 className="whitespace-nowrap font-display text-lg font-semibold">
                {title}
              </h3>
              <p className="text-text-mute">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const FEATURES = [
  {
    icon: <IconBolt className="size-5" stroke={1.5} />,
    title: "Serverless & pay-per-request",
    desc: "No servers to provision. Pay only for the commands you run, and scale to zero when idle.",
  },
  {
    icon: <IconWorld className="size-5" stroke={1.5} />,
    title: "Global, low latency",
    desc: "Replicate your database across regions for single-digit millisecond reads close to your users.",
  },
  {
    icon: <IconDatabase className="size-5" stroke={1.5} />,
    title: "Durable storage",
    desc: "Data is persisted and replicated, so your Redis database survives restarts and failures.",
  },
  {
    icon: <IconApi className="size-5" stroke={1.5} />,
    title: "REST API over HTTP",
    desc: "Connect from serverless and edge functions over HTTP, with no connection pools to manage.",
  },
  {
    icon: <IconServer2 className="size-5" stroke={1.5} />,
    title: "High availability",
    desc: "Multi-zone replication with automatic failover keeps your database online.",
  },
  {
    icon: <IconPlugConnected className="size-5" stroke={1.5} />,
    title: "Redis API compatible",
    desc: "Use the Redis commands and clients you already know. Works with existing Redis tooling.",
  },
  {
    icon: <IconShieldLock className="size-5" stroke={1.5} />,
    title: "Secure by default",
    desc: "TLS encryption, encryption at rest, IP allowlists, and SOC2 / HIPAA compliance.",
  },
  {
    icon: <IconArrowsMaximize className="size-5" stroke={1.5} />,
    title: "Auto-scaling",
    desc: "Throughput and storage grow automatically with your traffic, so there is no manual resizing.",
  },
];
