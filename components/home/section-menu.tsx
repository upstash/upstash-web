"use client";

import { HTMLProps } from "react";
import cx from "@/utils/cx";
import { HOME_SECTIONS } from "@/utils/const";

export default function SectionMenu({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {}) {
  return (
    <header
      className={cx(
        "fixed left-1/2 top-10 z-50 -translate-x-1/2",
        "flex items-center p-1",
        "rounded-full bg-black/90 shadow-xl backdrop-blur",
        // show ? "flex" : "hidden",
        className
      )}
      {...props}
    >
      <SectionMenuItem href={HOME_SECTIONS.FAST}>Fast Anywhere</SectionMenuItem>
      <SectionMenuItem href={HOME_SECTIONS.SERVERLESS}>
        Serverless
      </SectionMenuItem>
      <SectionMenuItem href={HOME_SECTIONS.PRICING}>Pricing</SectionMenuItem>
      <SectionMenuItem href={HOME_SECTIONS.OPEN_SOURCE}>
        Open Source
      </SectionMenuItem>
      <SectionMenuItem href={HOME_SECTIONS.COMMUNITY}>
        Community
      </SectionMenuItem>
    </header>
  );
}

function SectionMenuItem({
  children,
  className,
  ...props
}: HTMLProps<HTMLAnchorElement>) {
  return (
    <a className={cx("rounded-full px-4 py-3", className)} {...props}>
      {children}
    </a>
  );
}
