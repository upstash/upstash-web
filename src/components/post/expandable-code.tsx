"use client";

import cx from "@/utils/cx";
import { HTMLProps, useState } from "react";

export default function ExpandableCode({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Toc>
        <Toc.Summary className="mb-2" isOpen={isOpen} setIsOpen={setIsOpen}>
          Click to {isOpen ? " hide " : " expand "}
          <span className="font-large text-white">{title} </span>
          file content
        </Toc.Summary>
        {children}
      </Toc>
    </div>
  );
}

function Toc({ className, children, ...props }: HTMLProps<HTMLDetailsElement>) {
  return (
    <details
      role="navigation"
      aria-label="Use Cases"
      className={cx("group", className)}
      {...props}
    >
      {children}
    </details>
  );
}

Toc.Summary = function TocSummary({
  className,
  children,
  isOpen,
  setIsOpen,
  ...props
}: HTMLProps<HTMLDetailsElement> & { isOpen?: boolean } & {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <summary
      className={cx(
        "flex select-none list-none items-center gap-2",
        "mb-px h-10 rounded-lg px-4 text-white/40 hover:bg-[#151518ff]",
        className,
      )}
      {...props}
    >
      <span className="inline-flex w-5 shrink-0 items-center justify-center">
        <IconArrow className="rotate-0 group-open/toc:rotate-90" />
      </span>
      <span
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="grow text-sm tracking-wide"
      >
        {children}
      </span>
    </summary>
  );
};

function IconArrow({ className }: { className?: string }) {
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
