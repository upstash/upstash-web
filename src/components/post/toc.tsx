import type { TocItem } from "@/app/blog/utils/toc";
import cx from "@/utils/cx";
import { IconChevronDown, IconListNumbers } from "@tabler/icons-react";

export function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      className={cx("shrink-0 transition", className)}
      width={24}
      viewBox="0 0 24 24"
      role="img"
      aria-label="arrow-right"
      fill="currentColor"
    >
      <path d="M10 17l5-5-5-5v10z"></path>
    </svg>
  );
}

export default function PostTOC({ items }: { items: TocItem[] }) {
  if (!items.length) return null;

  return (
    <details className="group/toc -mx-5 mb-12 rounded-2xl bg-white/[0.02] md:-mx-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
          <IconListNumbers size={16} stroke={2} />
          Table of contents
        </div>
        <IconChevronDown
          size={18}
          stroke={2}
          className="text-text-mute transition-transform group-open/toc:rotate-180"
        />
      </summary>

      <ol className="space-y-2 px-5 pb-5 md:px-6 md:pb-6">
        {items.map((item, i) => (
          <li
            key={`${item.id}-${i}`}
            className={cx(
              "text-sm",
              item.level === 3 && "pl-4",
              item.level === 4 && "pl-8",
            )}
          >
            <a
              href={`#${item.id}`}
              className="text-text-mute transition hover:text-primary-text"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
