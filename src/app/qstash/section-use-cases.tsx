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
        <PageHeaderTitle as="h2">
          What can you build with QStash?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Common messaging and scheduling use cases, with a guide to build each
          one.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-4">
          {USE_CASES.map(({ title, desc, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={cx(
                "group flex flex-col gap-2 p-6",
                "rounded-3xl border-2 border-bg-mute bg-bg-mute",
                "hover:border-primary/40 transition hover:bg-white dark:hover:bg-white/5",
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

// Internal links into the QStash docs build a message queue topic cluster.
const USE_CASES = [
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
];
