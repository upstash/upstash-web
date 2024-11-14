"use client";

import cx from "@/utils/cx";
import { ComponentProps } from "react";

export default function PostTOC({ children, ...props }: ComponentProps<"nav">) {
  // if there are no children, don't render the TOC
  if (!children) return null;

  // if there is ‘toc’ contains the classNames
  const { className } = props;
  if (!className?.includes("toc")) {
    return <nav children={children} {...props} />;
  }

  return (
    <details
      className="group/toc mb-10 rounded-xl bg-emerald-700/10 dark:bg-white/3"
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
        <ul className="list-inside list-disc space-y-2">{children}</ul>
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
