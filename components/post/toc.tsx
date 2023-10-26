"use client";

import cx from "@/utils/cx";
import { TableOfContents } from "@/utils/toc";

type Props = {
  toc: TableOfContents;
};

export default function PostTOC({ toc }: Props) {
  if (!toc?.items) return null;

  return (
    <details
      className="group/toc mb-10 rounded-xl
      bg-emerald-700/10 dark:bg-white/3"
      role="navigation"
      aria-label="Table of contents"
    >
      {/* summary */}
      <summary
        className={cx(
          "flex items-center px-6 py-3",
          "select-none list-none text-sm uppercase tracking-wide opacity-60",
        )}
      >
        Table of contents
      </summary>

      {/* content */}
      <div className="p-6 pt-0">
        <ul className="list-inside list-disc space-y-2">
          {toc.items.map(({ title, url }) => {
            return (
              <li key={url}>
                <a
                  href={url}
                  className="text-emerald-600 dark:text-emerald-400"
                >
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}

export function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      className={cx(
        "shrink-0 rotate-90 transition group-open/toc:-rotate-90",
        className,
      )}
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
