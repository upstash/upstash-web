"use client";

import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import * as React from "react";
import { Children, HTMLProps } from "react";

export default function CompareValue({
  type = "plain",
  prefix = "",
  suffix = "",
  after,
  valid = true,
  children,
  className = "",
  ...props
}: HTMLProps<HTMLSpanElement> & {
  type?: "plain" | "size" | "boolean" | "list" | "number";
  prefix?: string;
  suffix?: string;
  after?: React.ReactNode;
  valid?: boolean;
}) {
  return (
    <span
      className={`flex items-center justify-center border-b border-bg-mute py-5 ${className}`}
      {...props}
    >
      {prefix && <span className="mr-1 text-text-mute">{prefix}</span>}

      {type === "plain" && children}

      {type === "size" && children}

      {type === "boolean" && (
        <>
          {valid ? (
            <IconCircleCheckFilled className="text-primary-text" size="24" />
          ) : (
            <IconCircleXFilled className="opacity-20" size="24" />
          )}
        </>
      )}

      {type === "list" && children && (
        <span className="flex flex-wrap items-center justify-center gap-1 text-left">
          {Children.map(children, (child) => (
            <span className="rounded bg-bg-mute px-2 py-1.5 text-sm leading-none">
              {child}
            </span>
          ))}
        </span>
      )}

      {type === "number" && Number(children).toLocaleString()}

      {suffix && <span className="ml-1 opacity-60">{suffix}</span>}
      {after}
    </span>
  );
}
