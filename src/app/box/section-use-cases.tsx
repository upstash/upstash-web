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
        <PageHeaderTitle as="h2">What can you build with Box?</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Agent workloads teams run on Box today, with a guide for each.
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

// Links into Box guides and posts build an agent-sandbox topic cluster.
const USE_CASES = [
  {
    title: "Background coding agents",
    desc: "Hand off a task, close the laptop, and review a pull request later. The agent clones, fixes, tests and opens the PR in its own box.",
    href: "https://upstash.com/blog/how-background-coding-agents-keep-working",
  },
  {
    title: "Parallel coding agents",
    desc: "One box per task, all started from the same snapshot, so agents never share a checkout or break each other's builds.",
    href: "https://upstash.com/blog/software-factory-needs-a-sandbox-per-agent",
  },
  {
    title: "Per-user agent workspaces",
    desc: "Give every user of your product their own box that keeps their project between sessions and pauses when they leave.",
    href: "https://upstash.com/docs/box/overall/how-it-works",
  },
  {
    title: "Personal agents, always on",
    desc: "Host OpenClaw or Hermes on a keep-alive box that stays reachable from Telegram, WhatsApp or Slack while your laptop is off.",
    href: "https://upstash.com/blog/openclaw-and-hermes-on-upstash-box",
  },
  {
    title: "Scheduled browser testing",
    desc: "A box with a browser and a cron schedule wakes up, runs Playwright against your app, saves the results and pauses again.",
    href: "https://upstash.com/blog/scheduled-browser-tests-upstash-box",
  },
  {
    title: "Remote work from your coding agent",
    desc: "Connect Claude Code, Cursor or Codex to the Upstash MCP server and the agent builds, tests and opens pull requests on a box instead of your laptop.",
    href: "https://upstash.com/docs/agent-resources/mcp",
  },
];
