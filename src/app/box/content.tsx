import IconBox from "@/components/icon-box";
import type {
  SectionCtaProps,
  SectionFeaturesProps,
  SectionHeroProps,
  SectionUseCasesProps,
  SectionWhatIsProps,
} from "@/components/product-page/types";
import {
  IconBrowser,
  IconClockPlay,
  IconCoin,
  IconCopy,
  IconFolders,
  IconGitPullRequest,
  IconPlus,
  IconRobot,
  IconShieldLock,
} from "@tabler/icons-react";

export const HERO: SectionHeroProps = {
  icon: IconBox,
  title: (
    <>
      <span className="block">Cloud computers</span>{" "}
      <span className="block">for AI agents</span>
    </>
  ),
  description: (
    <>
      Upstash Box is a persistent cloud computer with coding agents built in.
      Run Claude Code, Codex or OpenCode in an isolated box, give it a browser
      and a repository, and get results back through an API. The workspace stays
      between tasks, you pay only for the CPU your agent actually uses, and your
      own coding agent can work in a box through the Upstash MCP server.
    </>
  ),
  gradient: "to-sky-400",
  titleClassName: "pb-[0.15em]",
  primaryAction: {
    href: "https://console.upstash.com/box",
    label: "Create Box",
    icon: <IconPlus size={24} />,
  },
  docsHref: "https://upstash.com/docs/box/overall/quickstart",
  pricingHref: "/pricing/box",
};

export const FEATURES: SectionFeaturesProps = {
  title: "Why Upstash Box",
  description:
    "Everything an agent needs to finish real work, without building the infrastructure around it yourself.",
  items: [
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
  ],
};

// Links into Box guides and posts build an agent-sandbox topic cluster.
export const USE_CASES: SectionUseCasesProps = {
  title: "What can you build with Box?",
  description: "Agent workloads teams run on Box today, with a guide for each.",
  items: [
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
  ],
};

export const WHAT_IS: SectionWhatIsProps = {
  title: "What is an AI agent sandbox?",
  description: "A computer the agent can use, without access to yours.",
  children: (
    <>
      <p>
        An <strong>AI agent sandbox</strong> is an isolated environment where an
        agent runs the code it writes. Coding agents like Claude Code and Codex
        install packages, run builds and execute commands with real permissions.
        On a laptop or a shared server, one wrong command or one malicious
        package can reach your files, your credentials and your network. In a
        sandbox, the worst it can break is a disposable machine.
      </p>
      <p>
        Most sandboxes stop there: they give you an isolated machine and leave
        the rest to you. You install the agent, stream and parse its output,
        keep its files between sessions, run git, add a browser, and track what
        each run costs. That integration work is where the time goes.
      </p>
      <p>
        <strong>Upstash Box</strong> ships it. Each box is an isolated container
        with the coding agent already inside, a workspace that persists, git
        with pull requests, a headless browser and cron schedules, all driven
        from the SDK. Boxes pause when idle and bill active CPU only, so an
        agent that spends most of its time waiting on the model costs little to
        keep around.
      </p>
    </>
  ),
};

export const CTA: SectionCtaProps = {
  title: "Run your first agent in minutes",
  description:
    "Start on the free tier with 10 concurrent boxes, 5 CPU hours a month and $1 of model usage. No credit card required.",
  gradient: "to-sky-500",
  titleClassName: "pb-[0.15em]",
  primaryAction: {
    href: "https://console.upstash.com/box",
    label: "Create Box",
    icon: <IconPlus size={24} />,
  },
  pricingHref: "/pricing/box",
};
