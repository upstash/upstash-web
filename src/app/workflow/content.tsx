import IconWorkflow from "@/components/icon-workflow";
import type {
  SectionCtaProps,
  SectionFeaturesProps,
  SectionHeroProps,
  SectionUseCasesProps,
  SectionWhatIsProps,
} from "@/components/product-page/types";
import {
  IconArrowUpRight,
  IconBellRinging,
  IconClockHour4,
  IconCode,
  IconDeviceFloppy,
  IconGauge,
  IconHourglass,
  IconRefresh,
  IconStack2,
} from "@tabler/icons-react";

export const HERO: SectionHeroProps = {
  icon: IconWorkflow,
  title: (
    <>
      <span className="block">Durable workflows</span>{" "}
      <span className="block">for serverless functions</span>
    </>
  ),
  description: (
    <>
      Upstash Workflow turns an API route into a durable, multi-step process.
      Each completed step's result is saved, and failures retry only the step
      that failed. Sleep for days, wait for events, and call slow APIs without
      hitting function timeouts.
    </>
  ),
  gradient: "to-purple-400",
  primaryAction: {
    href: "https://console.upstash.com/workflow",
    label: "Get Started",
    icon: <IconArrowUpRight size={24} />,
  },
  docsHref: "https://upstash.com/docs/workflow/getstarted",
  pricingHref: "/pricing/workflow",
};

export const FEATURES: SectionFeaturesProps = {
  title: "Why Upstash Workflow",
  description: "Durable execution that runs inside the app you already deploy.",
  items: [
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
  ],
};

// Internal links into the Workflow docs build a durable execution topic cluster.
export const USE_CASES: SectionUseCasesProps = {
  title: "What can you build with Workflow?",
  description:
    "Common durable execution use cases, with a guide to build each one.",
  items: [
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
  ],
};

export const WHAT_IS: SectionWhatIsProps = {
  title: "What is durable execution?",
  description:
    "Code that finishes what it started, even when the machine running it does not.",
  children: (
    <>
      <p>
        <strong>Durable execution</strong> means a function's progress is saved
        as it runs. The work is split into steps, and each step's result is
        recorded once it completes. If the process crashes, times out, or is
        redeployed halfway through, it resumes from the last completed step
        instead of starting over or leaving work half done.
      </p>
      <p>
        Serverless functions are the opposite by default. They have short time
        limits, keep no state between invocations, and a failure in the middle
        of a multi-step job usually means retrying everything or cleaning up by
        hand. Teams end up building their own queues, state tables, and retry
        logic around them.
      </p>
      <p>
        <strong>Upstash Workflow</strong> provides that layer on top of QStash.
        Your workflow is an ordinary endpoint in your app. Workflow calls it
        once per step, passes in the results of earlier steps, and retries any
        step that fails. Sleeps and waits use no compute while they last,
        because nothing is running.
      </p>
    </>
  ),
};

export const CTA: SectionCtaProps = {
  title: "Ship your first workflow today",
  description:
    "Start on the free tier with 1,000 steps a day. No credit card required.",
  gradient: "to-purple-500",
  primaryAction: {
    href: "https://console.upstash.com/workflow",
    label: "Get Started",
    icon: <IconArrowUpRight size={24} />,
  },
  pricingHref: "/pricing/workflow",
};
