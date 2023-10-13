"use client";

import * as React from "react";
import { Children, HTMLProps } from "react";

import cx from "@/utils/cx";

export default function CompareValue({
  type = "plain",
  suffix = "",
  valid = true,
  children,
  className = "",
  ...props
}: HTMLProps<HTMLSpanElement> & {
  type?: "plain" | "size" | "boolean" | "list" | "number";
  suffix?: string;
  valid?: boolean;
}) {
  return (
    <span
      className={`inner flex items-center justify-center border-b border-b-white/3 py-3 ${className}`}
      {...props}
    >
      {type === "plain" && children}

      {type === "size" && (
        <>
          {children} <span className="ml-1 text-white/40">{suffix}</span>
        </>
      )}

      {type === "boolean" && (
        <span className="text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cx(valid ? "text-emerald-400" : "text-white/10")}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.25"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
              strokeWidth="0"
              fill="currentColor"
            />
          </svg>
        </span>
      )}

      {type === "list" && children && (
        <span className="flex flex-wrap items-center justify-center gap-1 text-left">
          {Children.map(children, (child) => (
            <span className="rounded bg-emerald-300/10 px-2 py-1.5 text-sm font-medium leading-none">
              {child}
            </span>
          ))}
        </span>
      )}

      {type === "number" && Number(children).toLocaleString()}
    </span>
  );
}
