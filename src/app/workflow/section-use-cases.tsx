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
          What can you build with Workflow?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Common durable execution use cases, with a guide to build each one.
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

// Internal links into the Workflow docs build a durable execution topic cluster.
const USE_CASES = [
  {
    title: "AI agents",
    desc: "Run agents whose LLM and tool calls are durable steps, so a slow model or a failed tool never restarts the whole run.",
    href: "https://upstash.com/docs/workflow/agents/overview",
  },
  {
    title: "Human-in-the-loop approvals",
    desc: "Pause a run until a person approves or rejects it, then continue with their answer.",
    href: "https://upstash.com/docs/workflow/howto/realtime/human-in-the-loop",
  },
  {
    title: "Event-driven flows",
    desc: "Wait for a payment, signup, or external system to send an event before moving to the next step.",
    href: "https://upstash.com/docs/workflow/features/wait-for-event",
  },
  {
    title: "Webhook processing",
    desc: "Create a webhook URL inside a run and wait for the third-party callback to arrive.",
    href: "https://upstash.com/docs/workflow/howto/use-webhooks",
  },
  {
    title: "Scheduled workflows",
    desc: "Trigger multi-step jobs on a CRON schedule, like weekly digests and nightly data pipelines.",
    href: "https://upstash.com/docs/workflow/howto/schedule",
  },
  {
    title: "Rate-limited batch jobs",
    desc: "Process thousands of items without overwhelming downstream APIs by capping rate and parallelism.",
    href: "https://upstash.com/docs/workflow/features/flow-control",
  },
];
