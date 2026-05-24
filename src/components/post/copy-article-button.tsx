"use client";

import cx from "@/utils/cx";
import * as Popover from "@radix-ui/react-popover";
import {
  IconBrandOpenai,
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconExternalLink,
  IconFileText,
} from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  slug: string;
  pageUrl: string;
  markdownUrl: string;
};

const COPY_RESET_MS = 1800;

export default function CopyArticleButton({
  slug,
  pageUrl,
  markdownUrl,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  async function copyMarkdown() {
    try {
      const res = await fetch(`/blog/${slug}.md`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch {
      // clipboard or fetch blocked — fail silently
    }
  }

  const chatPrompt = `Read ${markdownUrl} so I can ask questions about it.`;
  const chatgptHref = `https://chatgpt.com/?hints=search&prompt=${encodeURIComponent(chatPrompt)}`;
  const claudeHref = `https://claude.ai/new?q=${encodeURIComponent(chatPrompt)}`;

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-md">
      <button
        type="button"
        onClick={copyMarkdown}
        aria-label="Copy article as Markdown"
        className={cx(buttonBase, "pl-3 pr-3.5 tracking-tight")}
      >
        {copied ? (
          <>
            <IconCheck size={14} stroke={2} className="text-primary" />
            Copied
          </>
        ) : (
          <>
            <IconCopy size={14} stroke={1.75} />
            Copy article
          </>
        )}
      </button>
      <span
        aria-hidden
        className="my-auto h-4 w-px bg-emerald-900/15 dark:bg-white/15"
      />
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            aria-label="Open article actions"
            className={cx(
              buttonBase,
              "px-2 data-[state=open]:text-text",
            )}
          >
            <IconChevronDown
              size={14}
              stroke={1.75}
              className={cx(
                "transition-transform",
                open && "rotate-180",
              )}
            />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="end"
            sideOffset={6}
            className={cx(
              "z-50 w-[min(calc(100vw-2rem),20rem)] rounded-lg bg-bg p-1.5",
              "ring-1 ring-emerald-900/10 dark:ring-white/10",
              "shadow-xl shadow-emerald-950/10 dark:shadow-black/40",
              "focus:outline-none",
            )}
          >
            <MenuAction
              onClick={() => {
                void copyMarkdown();
                setOpen(false);
              }}
              icon={<IconCopy size={16} stroke={1.75} />}
              title={copied ? "Copied!" : "Copy article"}
              description="Copy article as Markdown for LLMs"
            />
            <MenuAction
              href={`/blog/${slug}.md`}
              external
              icon={<IconFileText size={16} stroke={1.75} />}
              title="View as Markdown"
              description="View this article as plain text"
            />
            <MenuAction
              href={chatgptHref}
              external
              icon={<IconBrandOpenai size={16} stroke={1.75} />}
              title="Open in ChatGPT"
              description="Ask questions about this article"
            />
            <MenuAction
              href={claudeHref}
              external
              icon={<ClaudeMark className="size-4" />}
              title="Open in Claude"
              description="Ask questions about this article"
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <span className="sr-only">{pageUrl}</span>
    </div>
  );
}

const buttonBase = cx(
  "inline-flex h-8 items-center gap-2 font-mono text-sm tracking-tight",
  "text-text-mute transition-colors hover:text-text focus-visible:text-text",
  "focus:outline-none",
);

const rowClasses = cx(
  "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition",
  "hover:bg-emerald-900/[0.05] focus:bg-emerald-900/[0.05]",
  "dark:hover:bg-white/[0.05] dark:focus:bg-white/[0.05]",
  "focus:outline-none",
);

function MenuAction({
  icon,
  title,
  description,
  href,
  onClick,
  external,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}) {
  const inner = (
    <>
      <span
        className={cx(
          "flex size-8 flex-none items-center justify-center rounded-md",
          "bg-emerald-900/[0.06] text-text-mute",
          "dark:bg-white/[0.06]",
        )}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-1 text-sm font-medium leading-tight text-text">
          {title}
          {external && (
            <IconExternalLink
              size={12}
              stroke={1.75}
              className="text-text-mute"
              aria-hidden
            />
          )}
        </span>
        <span className="mt-1 text-xs leading-tight text-text-mute">
          {description}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={rowClasses}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={rowClasses}>
      {inner}
    </button>
  );
}

function ClaudeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.34-.097-2.265-.122-.571-.121L0 11.882l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.146-.103.018-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.357-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
    </svg>
  );
}
