import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import {
  IconArrowsSplit,
  IconCalendarTime,
  IconClockPause,
  IconCoin,
  IconGauge,
  IconInbox,
  IconRefresh,
  IconWorldWww,
} from "@tabler/icons-react";
import React from "react";

export default function SectionFeatures() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">Why Upstash QStash</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          A message queue built for serverless functions and the HTTP endpoints
          they expose.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2 md:mt-16 md:gap-4 xl:grid-cols-4">
          {FEATURES.map(({ title, desc, icon }) => (
            <div
              key={title}
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
    icon: <IconWorldWww className="size-5" stroke={1.5} />,
    title: "HTTP native",
    desc: "Publish with a single HTTP request and receive messages as plain HTTP calls. No consumers, workers, or TCP connections to manage.",
  },
  {
    icon: <IconRefresh className="size-5" stroke={1.5} />,
    title: "Automatic retries",
    desc: "Failed deliveries retry with exponential backoff. Messages that still fail land in a dead letter queue you can inspect and replay.",
  },
  {
    icon: <IconCalendarTime className="size-5" stroke={1.5} />,
    title: "Cron schedules",
    desc: "Run recurring jobs with standard CRON syntax. QStash calls your endpoint on time, even from platforms with no cron of their own.",
  },
  {
    icon: <IconClockPause className="size-5" stroke={1.5} />,
    title: "Delayed delivery",
    desc: "Deliver a message after a delay or at an exact time, up to a year ahead on pay as you go.",
  },
  {
    icon: <IconInbox className="size-5" stroke={1.5} />,
    title: "Queues",
    desc: "Process messages in order with FIFO queues and configurable parallelism, so downstream services see a steady stream.",
  },
  {
    icon: <IconGauge className="size-5" stroke={1.5} />,
    title: "Flow control",
    desc: "Cap the rate and parallelism of calls per key to stay inside third-party API limits without writing a rate limiter.",
  },
  {
    icon: <IconArrowsSplit className="size-5" stroke={1.5} />,
    title: "Fan-out",
    desc: "Publish once to a URL group and QStash delivers to every endpoint in it, each with its own retries.",
  },
  {
    icon: <IconCoin className="size-5" stroke={1.5} />,
    title: "Pay per message",
    desc: "Start free with 1,000 messages a day. Pay as you go is $1 per 100K messages with no idle cost.",
  },
];
