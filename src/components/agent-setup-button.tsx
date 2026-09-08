"use client";

import { trackEvent } from "@/lib/analytics";
import cx from "@/utils/cx";
import { IconCheck, IconChevronDown, IconSparkles } from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import * as React from "react";

/**
 * Kept in sync with the copy-prompt on the docs landing page
 * (upstash/docs → introduction.mdx). It tells the agent to install the plugin
 * itself rather than hand the reader a command to run.
 */
export const AGENT_SETUP_PROMPT =
  "Set up Upstash in my coding agent using the official Upstash instructions, and run the commands yourself instead of asking me to. If you are Claude Code, install the Upstash plugin — it bundles the Upstash skills (https://upstash.com/docs/agent-resources/skills) and the remote MCP server over OAuth — by running `claude plugin marketplace add upstash/skills` then `claude plugin install upstash@upstash`, and tell me to run `/reload-plugins`. If you are OpenAI Codex, install the same plugin with `codex plugin marketplace add upstash/skills` then `codex plugin add upstash@upstash`. For any other agent, install the skills with `npx -y skills add upstash/skills --global`, then add the remote MCP server https://mcp.upstash.com/mcp to your MCP config (it authenticates over OAuth on first use); see https://upstash.com/docs/agent-resources/clients for the exact location. When done, verify the skills and MCP server are installed and tell me whether a restart is needed.";

type SetupOption = {
  id: string;
  label: string;
  summary: string;
  value: string;
};

/**
 * The first entry is what the button itself copies, so the dropdown never
 * changes what a plain click does.
 */
const SETUP_OPTIONS: SetupOption[] = [
  {
    id: "prompt",
    label: "Agent setup prompt",
    summary: "Let your agent install everything",
    value: AGENT_SETUP_PROMPT,
  },
  {
    id: "claude_plugin",
    label: "Claude plugin",
    summary: "Skills + remote MCP in one install",
    value:
      "/plugin marketplace add upstash/skills\n/plugin install upstash@upstash",
  },
  {
    id: "codex_plugin",
    label: "Codex plugin",
    summary: "Skills + remote MCP in one install",
    value:
      "codex plugin marketplace add upstash/skills\ncodex plugin add upstash@upstash",
  },
  {
    id: "mcp_url",
    label: "Other agents",
    summary: "Remote MCP server URL, OAuth on first use",
    value: "https://mcp.upstash.com/mcp",
  },
  {
    id: "skills",
    label: "Skills",
    summary: "Agent Skills CLI, no MCP server",
    value: "npx skills add upstash/skills",
  },
];

const PRIMARY_OPTION = SETUP_OPTIONS[0];

export default function AgentSetupButton({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (!copiedId) return;
    const timer = setTimeout(() => setCopiedId(null), 1500);
    return () => clearTimeout(timer);
  }, [copiedId]);

  React.useEffect(() => () => clearTimeout(closeTimer.current), []);

  const onCopy = (option: SetupOption) => {
    copy(option.value);
    setCopiedId(option.id);
    trackEvent("agent_setup_copied", { option: option.id });
  };

  // A small grace period on leave, so the pointer can cross the gap between the
  // button and the menu without the menu closing underneath it.
  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className={cx("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) hide();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => onCopy(PRIMARY_OPTION)}
        className={cx(
          "inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition",
          "border border-black/10 bg-white/70 text-text backdrop-blur",
          "hover:border-primary/40 hover:text-primary-text hover:shadow-sm",
          "dark:border-white/15 dark:bg-white/5 dark:text-white",
        )}
      >
        {copiedId === PRIMARY_OPTION.id ? (
          <IconCheck size={20} className="text-primary" />
        ) : (
          <IconSparkles size={20} className="text-primary" />
        )}
        {copiedId === PRIMARY_OPTION.id ? "Copied!" : "Set up your agent"}
        <IconChevronDown
          size={16}
          className={cx(
            "opacity-60 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        role="menu"
        aria-label="Copy Upstash agent setup"
        className={cx(
          "absolute left-0 top-full z-50 w-72 pt-2 text-left",
          "transition duration-150",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div
          className={cx(
            "overflow-hidden rounded-2xl border border-black/10 bg-white p-1 shadow-lg",
            "dark:border-white/10 dark:bg-zinc-900",
          )}
        >
          {SETUP_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              tabIndex={open ? 0 : -1}
              onClick={() => onCopy(option)}
              className={cx(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition",
                "hover:bg-bg-mute dark:hover:bg-white/5",
              )}
            >
              <span className="min-w-0 grow">
                <span className="block text-sm font-medium text-text">
                  {option.label}
                </span>
                <span className="block text-xs text-text-mute">
                  {option.summary}
                </span>
              </span>
              {copiedId === option.id ? (
                <IconCheck size={16} className="shrink-0 text-primary" />
              ) : undefined}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
