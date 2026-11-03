import IconQStash from "@/components/icon-qstash";
import type {
  SectionCtaProps,
  SectionFeaturesProps,
  SectionHeroProps,
  SectionUseCasesProps,
  SectionWhatIsProps,
} from "@/components/product-page/types";
import {
  IconArrowsSplit,
  IconArrowUpRight,
  IconCalendarTime,
  IconClockPause,
  IconCoin,
  IconGauge,
  IconInbox,
  IconRefresh,
  IconWorldWww,
} from "@tabler/icons-react";

export const HERO: SectionHeroProps = {
  icon: IconQStash,
  title: (
    <>
      <span className="block">Serverless messaging</span>{" "}
      <span className="block">and scheduling over HTTP</span>
    </>
  ),
  description: (
    <>
      Upstash QStash is a message queue and task scheduler for serverless apps.
      Publish a message with one HTTP request and QStash delivers it to your
      endpoint, with retries, delays, cron schedules, and fan-out built in. No
      workers to run, no connections to keep open.
    </>
  ),
  gradient: "to-blue-400",
  primaryAction: {
    href: "https://console.upstash.com/qstash",
    label: "Get Started",
    icon: <IconArrowUpRight size={24} />,
  },
  docsHref: "https://upstash.com/docs/qstash/overall/getstarted",
  pricingHref: "/pricing/qstash",
};

export const FEATURES: SectionFeaturesProps = {
  title: "Why Upstash QStash",
  description:
    "A message queue built for serverless functions and the HTTP endpoints they expose.",
  items: [
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
  ],
};

// Internal links into the QStash docs build a message queue topic cluster.
export const USE_CASES: SectionUseCasesProps = {
  title: "What can you build with QStash?",
  description:
    "Common messaging and scheduling use cases, with a guide to build each one.",
  items: [
    {
      title: "Background jobs",
      desc: "Move slow work like emails, image processing, and report generation out of the request and into a retried job.",
      href: "https://upstash.com/docs/qstash/features/background-jobs",
    },
    {
      title: "Cron jobs",
      desc: "Run recurring tasks on Vercel, Cloudflare Workers, or any serverless platform with a CRON expression.",
      href: "https://upstash.com/docs/qstash/features/schedules",
    },
    {
      title: "Periodic data updates",
      desc: "Refresh caches, sync third-party data, and rebuild aggregates on a schedule.",
      href: "https://upstash.com/docs/qstash/recipes/periodic-data-updates",
    },
    {
      title: "Fan-out to many services",
      desc: "Publish one event and deliver it to every subscribed endpoint, each retried on its own.",
      href: "https://upstash.com/docs/qstash/features/url-groups",
    },
    {
      title: "Rate-limited API calls",
      desc: "Throttle calls to LLM providers and other third-party APIs with per-key rate and parallelism limits.",
      href: "https://upstash.com/docs/qstash/features/flowcontrol",
    },
    {
      title: "Reliable webhooks",
      desc: "Accept incoming webhooks fast and process them asynchronously with retries and a dead letter queue.",
      href: "https://upstash.com/docs/qstash/howto/webhook",
    },
  ],
};

export const WHAT_IS: SectionWhatIsProps = {
  title: "What is a message queue?",
  description:
    "A buffer between the code that asks for work and the code that does it.",
  children: (
    <>
      <p>
        A <strong>message queue</strong> lets one part of a system hand off work
        to another without waiting for it to finish. The producer publishes a
        message, the queue stores it durably, and a consumer processes it when
        it can. If the consumer is slow or down, the message waits instead of
        being lost.
      </p>
      <p>
        Traditional queues assume long-running consumers that hold a connection
        open and poll for messages. Serverless functions do not work that way:
        they start on a request, run briefly, and stop. That mismatch is why
        background jobs and cron are awkward on platforms like Vercel and
        Cloudflare Workers.
      </p>
      <p>
        <strong>Upstash QStash</strong> flips the model. Instead of your code
        pulling messages, QStash pushes each one to your endpoint as an HTTP
        request and keeps retrying until it succeeds. Anything that can serve
        HTTP can be a consumer, and every request is signed so your endpoint can
        verify it came from QStash.
      </p>
    </>
  ),
};

export const CTA: SectionCtaProps = {
  title: "Publish your first message in minutes",
  description:
    "Start on the free tier with 1,000 messages a day. No credit card required.",
  gradient: "to-blue-500",
  primaryAction: {
    href: "https://console.upstash.com/qstash",
    label: "Get Started",
    icon: <IconArrowUpRight size={24} />,
  },
  pricingHref: "/pricing/qstash",
};
