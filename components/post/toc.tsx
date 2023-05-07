"use client";

import { TableOfContents } from "@/utils/toc";
import cx from "@/utils/cx";

type Props = {
  toc: TableOfContents;
};

export default function PostTOC({ toc }: Props) {
  if (!toc?.items) return null;

  return (
    <details
      className="group/toc mb-10 rounded-xl bg-white/5"
      role="navigation"
      aria-label="Table of contents"
    >
      {/* summary */}
      <summary
        className={cx(
          "flex items-center justify-between px-6 py-3",
          "select-none list-none text-zinc-400"
        )}
      >
        <span className="text-sm uppercase tracking-wide">
          Table of contents
        </span>
        <Icon />
      </summary>

      {/* content */}
      <div className="p-6 pt-0">
        <ul className="list-inside list-disc space-y-2">
          {toc.items.map(({ title, url }) => {
            return (
              <li key={url}>
                <a href={url} className="text-emerald-400">
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

function Icon() {
  return (
    <svg
      className="rotate-90 group-open/toc:-rotate-90"
      width={24}
      viewBox="0 0 24 24"
      role="img"
      aria-label="arrow-right"
      fill="currentColor"
    >
      <path d="M10 17l5-5-5-5v10z"></path>
      <path d="M0 24V0h24v24H0z" fill="none"></path>
    </svg>
  );
}
