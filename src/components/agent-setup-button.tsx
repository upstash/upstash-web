"use client";

import Button from "@/components/button";
import { trackEvent } from "@/lib/analytics";
import cx from "@/utils/cx";
import {
  IconArrowUpRight,
  IconCheck,
  IconChevronDown,
  IconSparkles,
} from "@tabler/icons-react";
import copy from "copy-to-clipboard";
import * as React from "react";
import { createPortal } from "react-dom";

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
  value: string;
};

/**
 * The first entry is what the button itself copies, so the dropdown never
 * changes what a plain click does. Per-client commands live in the docs the
 * last menu row links to.
 */
const SETUP_OPTIONS: SetupOption[] = [
  {
    id: "prompt",
    label: "Copy setup prompt",
    value: AGENT_SETUP_PROMPT,
  },
];

const PRIMARY_OPTION = SETUP_OPTIONS[0];

const DOCS_URL = "https://upstash.com/docs/agent-resources/overview";

const MENU_WIDTH = 260;
const MENU_GAP = 8;

export default function AgentSetupButton({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
  }>();
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (!copiedId) return;
    const timer = setTimeout(() => setCopiedId(null), 1500);
    return () => clearTimeout(timer);
  }, [copiedId]);

  React.useEffect(() => () => clearTimeout(closeTimer.current), []);

  // The hero sits in its own `z-0` stacking context, so a menu rendered inline
  // is painted under the product tabs below it however high its z-index. It
  // goes to the body instead, anchored to the trigger on every open, scroll and
  // resize.
  const place = React.useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const left = Math.min(
      rect.left,
      Math.max(MENU_GAP, window.innerWidth - MENU_WIDTH - MENU_GAP),
    );
    setPosition({ top: rect.bottom + MENU_GAP, left });
  }, []);

  React.useEffect(() => {
    if (!open) return;
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

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

  const menu =
    open && position
      ? createPortal(
          <div
            role="menu"
            aria-label="Copy Upstash agent setup"
            style={{ top: position.top, left: position.left }}
            onMouseEnter={show}
            onMouseLeave={hide}
            className={cx(
              "fixed z-[999] w-[260px] rounded-2xl p-1 text-left",
              "border border-black/10 bg-white shadow-xl",
              "dark:border-white/10 dark:bg-zinc-900",
            )}
          >
            {SETUP_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="menuitem"
                onClick={() => onCopy(option)}
                className={cx(
                  "relative flex w-full items-center rounded-xl px-3 py-2 text-left transition",
                  "text-sm font-medium text-text",
                  "hover:bg-bg-mute dark:hover:bg-white/10",
                )}
              >
                {option.label}
                {/* Absolute, so the confirmation never reflows the row. */}
                {copiedId === option.id ? (
                  <span
                    className={cx(
                      "absolute inset-y-1 right-1 flex items-center gap-1 rounded-lg px-2",
                      "bg-bg-mute text-xs font-medium text-primary dark:bg-zinc-800",
                    )}
                  >
                    <IconCheck size={14} />
                    Copied
                  </span>
                ) : undefined}
              </button>
            ))}

            <a
              role="menuitem"
              href={DOCS_URL}
              target="_blank"
              className={cx(
                "mt-1 flex items-center gap-1.5 rounded-xl px-3 py-2 transition",
                "border-t border-black/5 text-sm font-medium text-primary-text",
                "hover:bg-bg-mute dark:border-white/10 dark:hover:bg-white/10",
              )}
            >
              See all agent resources
              <IconArrowUpRight size={16} />
            </a>
          </div>,
          document.body,
        )
      : undefined;

  return (
    <div
      ref={triggerRef}
      className={cx("inline-flex", className)}
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
      <Button
        variant="default"
        className="px-6"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => onCopy(PRIMARY_OPTION)}
      >
        <IconSparkles size={24} />
        {/* The confirmation is laid over the label rather than replacing it, so
            copying can't resize the button and shift Start for Free next to it. */}
        <span className="relative inline-flex items-center">
          <span className={cx(copiedId === PRIMARY_OPTION.id && "invisible")}>
            Set up your agent
          </span>
          {copiedId === PRIMARY_OPTION.id ? (
            <span className="absolute inset-0 flex items-center justify-center gap-1.5">
              <IconCheck size={20} />
              Copied
            </span>
          ) : undefined}
        </span>
        <IconChevronDown
          size={20}
          className={cx("transition-transform", open && "rotate-180")}
        />
      </Button>
      {menu}
    </div>
  );
}
