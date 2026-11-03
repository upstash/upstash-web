import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import {
  IconBellRinging,
  IconClockHour4,
  IconCode,
  IconDeviceFloppy,
  IconGauge,
  IconHourglass,
  IconRefresh,
  IconStack2,
} from "@tabler/icons-react";
import React from "react";

export default function SectionFeatures() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">Why Upstash Workflow</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Durable execution that runs inside the app you already deploy.
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
    icon: <IconDeviceFloppy className="size-5" stroke={1.5} />,
    title: "Durable steps",
    desc: "Each step's result is saved once it completes. A crash or redeploy resumes the run from the last finished step.",
  },
  {
    icon: <IconHourglass className="size-5" stroke={1.5} />,
    title: "No function timeouts",
    desc: "Every step runs in its own invocation, so a workflow can run for hours or days on platforms with short time limits.",
  },
  {
    icon: <IconClockHour4 className="size-5" stroke={1.5} />,
    title: "Sleep for days",
    desc: "Pause a run for minutes or months with context.sleep. Nothing runs while it waits, and the whole sleep counts as one step.",
  },
  {
    icon: <IconBellRinging className="size-5" stroke={1.5} />,
    title: "Wait for events",
    desc: "Stop at a step until a user approves, a webhook arrives, or another service sends a notify, then continue.",
  },
  {
    icon: <IconRefresh className="size-5" stroke={1.5} />,
    title: "Per-step retries",
    desc: "Failed steps retry on their own. Runs that still fail go to a dead letter queue where you can restart or resume them.",
  },
  {
    icon: <IconStack2 className="size-5" stroke={1.5} />,
    title: "Parallel steps",
    desc: "Run steps side by side with Promise.all and wait for them together, each one durable and retried.",
  },
  {
    icon: <IconGauge className="size-5" stroke={1.5} />,
    title: "Flow control",
    desc: "Limit how many runs execute at once and how fast, to protect databases and third-party API quotas.",
  },
  {
    icon: <IconCode className="size-5" stroke={1.5} />,
    title: "Just your code",
    desc: "Workflows are plain TypeScript or Python in your existing API routes. No separate worker or orchestration server to deploy.",
  },
];
