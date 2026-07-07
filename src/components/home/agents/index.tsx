"use client";

import Bg from "@/components/bg";
import Container from "@/components/container";
import CopyButton from "@/components/copy-button";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import cx from "@/utils/cx";
import {
  IconArrowRight,
  IconPlugConnected,
  IconSparkles,
  IconTerminal2,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const UPSTASH_SKILL_COMMAND =
  "npx skills add https://github.com/upstash/skills --skill upstash";

const CLI_COMMAND = "npm i -g @upstash/cli";

const SKILL_AGENTS = ["Claude Code", "OpenAI Codex", "Cursor"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function AgentCard({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={cx(
        "group relative flex flex-col overflow-hidden p-6 text-left md:p-8",
        "rounded-3xl border border-black/5 bg-white shadow-sm md:rounded-4xl",
        "hover:border-primary/30 transition-colors duration-300",
        "dark:border-white/10 dark:bg-white/5",
        className,
      )}
    >
      {/* glow */}
      <div
        aria-hidden
        className={cx(
          "bg-primary/20 absolute -right-16 -top-16 -z-0 size-44 rounded-full blur-3xl",
          "opacity-40 transition-all duration-500 group-hover:scale-150 group-hover:opacity-70",
        )}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}

function AgentCardIcon({ children }: { children: ReactNode }) {
  return (
    <span
      className={cx(
        "bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl",
        "text-primary-text",
      )}
    >
      {children}
    </span>
  );
}

function AgentCardLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className={cx(
        "mt-6 inline-flex items-center gap-1.5 font-medium text-primary-text",
        "transition hover:text-primary",
      )}
    >
      {children}
      <IconArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}

function CommandLine({ command }: { command: string }) {
  return (
    <div
      className={cx(
        "flex items-center gap-3 rounded-2xl px-4 py-3",
        "border border-white/10 bg-pre-bg",
      )}
    >
      <code className="no-scrollbar grow overflow-x-auto whitespace-nowrap text-left font-mono text-xs text-emerald-400 md:text-sm">
        <span className="select-none opacity-50">$ </span>
        {command}
      </code>
      <CopyButton
        code={command}
        className="shrink-0 text-zinc-400 hover:text-emerald-400"
      />
    </div>
  );
}

export default function HomeAgents() {
  return (
    <section className="relative z-10 mt-10 py-16 md:mt-20 md:py-24">
      <Bg />

      <Container>
        <SectionHeader>
          <SectionHeaderTitle>Built for AI Agents</SectionHeaderTitle>
          <SectionHeaderSummary>
            Skills, an MCP server, and a CLI: everything your coding agent
            needs to build, manage, and debug Upstash resources
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-10 grid gap-4 md:mt-16 md:gap-6 lg:grid-cols-2">
          {/* Skills - featured */}
          <AgentCard index={0} className="lg:col-span-2">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <div className="flex flex-col items-start lg:w-1/2">
                <div className="flex flex-wrap items-center gap-4">
                  <AgentCardIcon>
                    <IconSparkles size={26} stroke={1.5} />
                  </AgentCardIcon>
                  <h4 className="font-display text-2xl font-semibold md:text-3xl">
                    Skills
                  </h4>
                  <span
                    className={cx(
                      "bg-primary/10 rounded-full px-2.5 py-1",
                      "text-xs font-semibold uppercase tracking-wide text-primary-text",
                    )}
                  >
                    Recommended
                  </span>
                </div>

                <p className="mt-4 text-balance text-text-mute md:text-lg">
                  Packaged instructions covering every Upstash SDK plus the full
                  CLI reference. Your agent loads only the sections it needs.
                  No context bloat, no stale docs.
                </p>

                <AgentCardLink href="https://upstash.com/docs/agent-resources/skills">
                  Explore Skills
                </AgentCardLink>
              </div>

              <div className="flex flex-col gap-4 lg:w-1/2">
                <CommandLine command={UPSTASH_SKILL_COMMAND} />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-text-mute">Works with</span>
                  {SKILL_AGENTS.map((agent) => (
                    <span
                      key={agent}
                      className={cx(
                        "rounded-full px-3 py-1 text-sm font-medium",
                        "border border-black/5 bg-bg-mute text-text",
                        "dark:border-white/5",
                      )}
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AgentCard>

          {/* MCP Server */}
          <AgentCard index={1}>
            <div className="flex items-center gap-4">
              <AgentCardIcon>
                <IconPlugConnected size={26} stroke={1.5} />
              </AgentCardIcon>
              <h4 className="font-display text-xl font-semibold md:text-2xl">
                MCP Server
              </h4>
            </div>

            <p className="mt-4 grow text-balance text-text-mute">
              Manage and debug your resources straight from your editor: create
              databases, analyze QStash logs, retry failed workflow runs.
              Read-only API keys supported.
            </p>

            <AgentCardLink href="https://upstash.com/docs/agent-resources/mcp">
              Set up MCP
            </AgentCardLink>
          </AgentCard>

          {/* CLI */}
          <AgentCard index={2}>
            <div className="flex items-center gap-4">
              <AgentCardIcon>
                <IconTerminal2 size={26} stroke={1.5} />
              </AgentCardIcon>
              <h4 className="font-display text-xl font-semibold md:text-2xl">
                CLI
              </h4>
            </div>

            <p className="mt-4 grow text-balance text-text-mute">
              Full resource management from the terminal or CI/CD, with JSON
              output built for scripting and agents.
            </p>

            <div className="mt-4">
              <CommandLine command={CLI_COMMAND} />
            </div>

            <AgentCardLink href="https://upstash.com/docs/agent-resources/cli">
              Explore the CLI
            </AgentCardLink>
          </AgentCard>
        </div>
      </Container>
    </section>
  );
}
