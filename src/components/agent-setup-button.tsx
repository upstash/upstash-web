"use client";

import { ClaudeLogo, CursorLogo, OpenAILogo } from "@/components/agent-logos";
import { trackEvent } from "@/lib/analytics";
import cx from "@/utils/cx";
import {
  IconArrowUpRight,
  IconCheck,
  IconChevronDown,
  IconCopy,
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

/** The clients the prompt covers, stacked on the trigger like avatars. */
const AGENT_LOGOS = [
  { name: "Cursor", Logo: CursorLogo },
  { name: "Claude", Logo: ClaudeLogo },
  { name: "OpenAI", Logo: OpenAILogo },
];

const COPIED_DELAY = 1800;

const MENU_GAP = 4;

const MENU_ROW = cx(
  "flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-base font-medium",
  "text-emerald-800 transition hover:bg-bg-mute",
  "dark:text-emerald-400 dark:hover:bg-white/10",
);

/**
 * Keeps both states mounted and cross-fades them in place, so a row or the
 * button never resizes or snaps when its label flips to a confirmation.
 */
function CrossFade({
  swapped,
  alt,
  className,
  children,
}: {
  swapped: boolean;
  alt: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cx("relative inline-flex items-center", className)}>
      <span
        className={cx(
          "inline-flex items-center transition duration-200 ease-out motion-reduce:transition-none",
          swapped ? "opacity-0" : "opacity-100",
        )}
      >
        {children}
      </span>
      <span
        aria-hidden={!swapped}
        className={cx(
          "pointer-events-none absolute inset-0 flex items-center",
          "transition duration-200 ease-out motion-reduce:transition-none",
          swapped ? "opacity-100" : "opacity-0",
        )}
      >
        {alt}
      </span>
    </span>
  );
}

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
    width: number;
  }>();
  const [mounted, setMounted] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!copiedId) {
      return;
    }
    const timer = setTimeout(() => setCopiedId(null), COPIED_DELAY);
    return () => clearTimeout(timer);
  }, [copiedId]);

  React.useEffect(() => () => clearTimeout(closeTimer.current), []);

  // The hero sits in its own `z-0` stacking context, so a menu rendered inline
  // is painted under the product tabs below it however high its z-index. It
  // goes to the body instead, anchored to the trigger on every open, scroll and
  // resize.
  const place = React.useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    // The menu takes the trigger's width, so it reads as one control.
    const left = Math.min(
      rect.left,
      Math.max(MENU_GAP, window.innerWidth - rect.width - MENU_GAP),
    );
    setPosition({ top: rect.bottom + MENU_GAP, left, width: rect.width });
  }, []);

  // The menu is mounted from the start and hidden with classes rather than
  // mounted on open, so it transitions both ways without needing a frame at
  // the start state first — a rAF here would never fire in a background tab.
  React.useEffect(() => {
    place();
  }, [place]);

  React.useEffect(() => {
    if (!open) {
      return;
    }
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  const isPrimaryCopied = copiedId === PRIMARY_OPTION.id;

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
    mounted && position
      ? createPortal(
          <div
            role="menu"
            aria-label="Set up your agent"
            aria-hidden={!open}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            onMouseEnter={show}
            onMouseLeave={hide}
            className={cx(
              "fixed z-[999] rounded-xl bg-white p-2 text-left",
              "shadow-[0_8px_10px_rgba(0,0,0,0.2)]",
              "dark:bg-zinc-900 dark:shadow-none dark:ring-1 dark:ring-white/10",
              "origin-top transition duration-150 ease-out motion-reduce:transition-none",
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0",
            )}
          >
            {SETUP_OPTIONS.map((option) => {
              const isCopied = copiedId === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="menuitem"
                  tabIndex={open ? 0 : -1}
                  onClick={() => onCopy(option)}
                  className={cx(
                    MENU_ROW,
                    "border-b border-zinc-100 dark:border-white/10",
                  )}
                >
                  <CrossFade
                    swapped={isCopied}
                    className="flex-1"
                    alt={<span className="text-primary">Copied</span>}
                  >
                    {option.label}
                  </CrossFade>
                  <CrossFade
                    swapped={isCopied}
                    alt={<IconCheck size={20} className="text-primary" />}
                  >
                    <IconCopy size={20} />
                  </CrossFade>
                </button>
              );
            })}

            <a
              role="menuitem"
              href={DOCS_URL}
              target="_blank"
              tabIndex={open ? 0 : -1}
              className={MENU_ROW}
              rel="noreferrer"
            >
              <span className="flex-1">See all agent resources</span>
              <IconArrowUpRight size={20} />
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
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          hide();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      {/* The 2px emerald-to-amber border is the wrapper's gradient showing
          through a 2px inset, so the inner radius is the outer 12px minus it. */}
      <span className="inline-flex rounded-xl bg-gradient-to-r from-emerald-400 to-amber-300 p-0.5">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => onCopy(PRIMARY_OPTION)}
          className={cx(
            "flex h-10 items-center gap-2.5 rounded-[10px] bg-white pl-2.5 pr-[18px]",
            "text-base font-medium text-emerald-800 transition hover:bg-emerald-50",
            "dark:bg-zinc-900 dark:text-emerald-400 dark:hover:bg-zinc-800",
          )}
        >
          <span className="flex items-center" aria-hidden="true">
            {AGENT_LOGOS.map(({ name, Logo }, index) => (
              <span
                key={name}
                title={name}
                className={cx(
                  "flex size-7 items-center justify-center rounded-full border border-emerald-900/30 bg-white",
                  "dark:border-emerald-400/30 dark:bg-zinc-900",
                  index > 0 && "-ml-[5px]",
                )}
              >
                <Logo className="size-4" />
              </span>
            ))}
          </span>
          {/* Both labels stay mounted and cross-fade, so the button neither
              resizes nor snaps between states. */}
          <CrossFade
            swapped={isPrimaryCopied}
            alt={<span className="text-primary">Copied</span>}
          >
            Set up your agent
          </CrossFade>
          <IconChevronDown
            size={20}
            className={cx("transition-transform", open && "rotate-180")}
          />
        </button>
      </span>
      {menu}
    </div>
  );
}
