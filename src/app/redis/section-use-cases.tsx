import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function SectionUseCases() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">What can you build with Redis?</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Common Redis database use cases, with guides to build each one.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-4">
          {USE_CASES.map(({ title, desc, href }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              className={cx(
                "group flex flex-col gap-2 p-6",
                "rounded-3xl border-2 border-bg-mute bg-bg-mute",
                "transition hover:border-primary/40 hover:bg-white dark:hover:bg-white/5",
              )}
            >
              <h3 className="flex items-center gap-1 font-display text-lg font-semibold">
                {title}
                <IconArrowUpRight
                  size={18}
                  className="opacity-40 transition group-hover:opacity-100"
                />
              </h3>
              <p className="text-text-mute">{desc}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Internal links into existing docs/blog content build a Redis topic cluster.
const USE_CASES = [
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
    desc: "Add full-text and vector search to your app with Redis Search.",
    href: "https://upstash.com/docs/redis/search/introduction",
  },
  {
    title: "AI agent memory",
    desc: "Give AI agents fast short-term and long-term memory with a serverless Redis database.",
    href: "https://upstash.com/docs/redis/tutorials/agent_memory",
  },
];
