import IconRedis from "@/components/icon-redis";
import type {
  SectionCtaProps,
  SectionFeaturesProps,
  SectionHeroProps,
  SectionUseCasesProps,
  SectionWhatIsProps,
} from "@/components/product-page/types";
import {
  IconApi,
  IconArrowsMaximize,
  IconBolt,
  IconDatabase,
  IconPlugConnected,
  IconPlus,
  IconServer2,
  IconShieldLock,
  IconWorld,
} from "@tabler/icons-react";

export const HERO: SectionHeroProps = {
  icon: IconRedis,
  title: (
    <>
      <span className="block">Serverless Redis</span>
      <span className="block">in the Cloud</span>
    </>
  ),
  description: (
    <>
      Upstash runs Redis in the cloud as a fully managed, serverless database
      with single-digit millisecond latency and durable storage. You pay only
      for what you use, and there are no servers to run. Connect over HTTP or
      the standard Redis protocol (TCP).
    </>
  ),
  gradient: "to-amber-300",
  primaryAction: {
    href: "https://console.upstash.com/redis",
    label: "Create Database",
    icon: <IconPlus size={24} />,
  },
  docsHref: "https://upstash.com/docs/redis",
  pricingHref: "/pricing/redis",
};

export const FEATURES: SectionFeaturesProps = {
  title: "Why Upstash Redis",
  description:
    "A serverless Redis database built for modern, global applications.",
  items: [
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
  ],
};

// Internal links into existing docs/blog content build a Redis topic cluster.
export const USE_CASES: SectionUseCasesProps = {
  title: "What can you build with Redis?",
  description:
    "Common Redis database use cases, with guides to build each one.",
  items: [
    {
      title: "Caching",
      desc: "Cache database queries and API responses to cut latency and load on your primary database.",
      href: "https://upstash.com/docs/redis/tutorials/nextjs_with_redis",
    },
    {
      title: "Rate limiting",
      desc: "Protect your APIs with fast, distributed rate limiting using the Upstash Ratelimit SDK.",
      href: "https://upstash.com/docs/redis/sdks/ratelimit-ts/overview",
    },
    {
      title: "Queues & streams",
      desc: "Build FIFO, delayed, and prioritized job queues on Redis lists, sorted sets, and streams.",
      href: "https://upstash.com/docs/redis/tutorials/redis_queue",
    },
    {
      title: "Session storage",
      desc: "Store user sessions for fast, stateless authentication across serverless functions.",
      href: "https://upstash.com/docs/redis/tutorials/express_session",
    },
    {
      title: "Search",
      desc: "Add full-text to your app with Upstash Redis Search.",
      href: "https://upstash.com/docs/redis/search/introduction",
    },
    {
      title: "AI agent memory",
      desc: "Give AI agents fast short-term and long-term memory with a serverless Redis database.",
      href: "https://upstash.com/docs/redis/tutorials/agent_memory",
    },
  ],
};

export const WHAT_IS: SectionWhatIsProps = {
  title: "What is a Redis database?",
  description: "A fast, in-memory key-value store for real-time applications.",
  children: (
    <>
      <p>
        A <strong>Redis database</strong> is an in-memory, key-value data store.
        Because it keeps data in RAM instead of on disk, reads and writes finish
        in well under a millisecond. That speed is why teams reach for Redis to
        handle caching, rate limiting, and queues.
      </p>
      <p>
        Redis is a NoSQL database. It supports data structures like strings,
        hashes, lists, sets, sorted sets, streams, and JSON, so it can do far
        more than simple caching. Many teams run Redis next to their primary
        database to absorb read traffic and serve hot data instantly.
      </p>
      <p>
        <strong>Upstash</strong> runs Redis as a fully managed, serverless
        database in the cloud, so there is nothing to provision and no failover
        to manage. You create a cloud Redis database in seconds, connect over
        HTTP or the Redis protocol, and pay only for the requests you make.
        Databases can be replicated across regions for high availability close
        to your users.
      </p>
    </>
  ),
};

export const CTA: SectionCtaProps = {
  title: "Start your Redis database in seconds",
  description:
    "Create a serverless Redis database on the free tier. No credit card required.",
  gradient: "to-amber-500",
  primaryAction: {
    href: "https://console.upstash.com/redis",
    label: "Create Database",
    icon: <IconPlus size={24} />,
  },
  pricingHref: "/pricing/redis",
};
