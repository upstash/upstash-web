"use client";

import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Button from "@/components/button";
import Container from "@/components/container";
import Nav from "./nav";
import { allJobs } from "contentlayer/generated";
import { HOME_SECTIONS } from "@/utils/const";

const jobLength = allJobs.filter((o) => !o.draft).length;

export default function Header({
  className,
  ...props
}: HTMLProps<HTMLHeadElement>) {
  return (
    <header
      className={cx(
        "hidden border-b border-b-white/5 py-6 md:block",
        className
      )}
      {...props}
    >
      <Container>
        <div className="flex items-center md:grid md:grid-cols-4">
          <div className="flex">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <Nav />

          <div className="flex justify-end">
            <Button
              target="_self"
              type="button"
              hideIcon
              href="https://console.upstash.com"
              className="backdrop-blur"
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

const NavItems: {
  name: string;
  href: string;
  children?: ReactNode;
}[] = [
  {
    name: "Pricing",
    href: `/#${HOME_SECTIONS.PRICING}`,
  },
  // {
  //   name: "Open Source",
  //   href: "/open-source",
  // },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Examples",
    href: "/examples",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

if (jobLength > 0) {
  NavItems.push({
    name: "Careers",
    href: "/careers",
    children: (
      <span
        className="rounded-full bg-emerald-300/20
              px-1.5 py-1 font-mono text-sm leading-none text-emerald-500"
      >
        {jobLength}
      </span>
    ),
  });
}

export { NavItems };
