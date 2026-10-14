import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import {
  IconBrowser,
  IconClockPlay,
  IconCoin,
  IconCopy,
  IconFolders,
  IconGitPullRequest,
  IconRobot,
  IconShieldLock,
} from "@tabler/icons-react";
import React from "react";

export default function SectionFeatures() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">Why Upstash Box</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Everything an agent needs to finish real work, without building the
          infrastructure around it yourself.
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
    icon: <IconRobot className="size-5" stroke={1.5} />,
    title: "Agents built in",
    desc: "Claude Code, Codex, OpenCode or Cursor run inside the box. Send a prompt and get the result back with its cost, as text, a stream, or typed output.",
  },
  {
    icon: <IconFolders className="size-5" stroke={1.5} />,
    title: "Persistent workspace",
    desc: "The repository, installed dependencies and files stay between tasks. A user comes back tomorrow and picks up where they left off.",
  },
  {
    icon: <IconCoin className="size-5" stroke={1.5} />,
    title: "Pay for active CPU",
    desc: "Agents spend most of their time waiting on the model. Box bills only the CPU your code uses, memory is free, and an idle box pauses.",
  },
  {
    icon: <IconBrowser className="size-5" stroke={1.5} />,
    title: "Headless browser",
    desc: "Chromium in the same box: open the app the agent built, take screenshots, act on the page and extract typed data, with live view and recordings.",
  },
  {
    icon: <IconGitPullRequest className="size-5" stroke={1.5} />,
    title: "Git to pull request",
    desc: "Clone, branch, commit, push and open a pull request from the SDK, so a finished task arrives as a PR instead of a diff in a container.",
  },
  {
    icon: <IconClockPlay className="size-5" stroke={1.5} />,
    title: "Schedules and always-on",
    desc: "Run a command or an agent prompt on a cron schedule inside the box, or keep a box on all the time for a flat monthly price.",
  },
  {
    icon: <IconShieldLock className="size-5" stroke={1.5} />,
    title: "Isolated by default",
    desc: "Each box has its own filesystem, processes and network, with no access to private networks. Allowlist outbound traffic and keep API keys off the box.",
  },
  {
    icon: <IconCopy className="size-5" stroke={1.5} />,
    title: "Snapshots and fan-out",
    desc: "Snapshot a ready environment once, then start new boxes from it for each user, task, or parallel attempt.",
  },
];
