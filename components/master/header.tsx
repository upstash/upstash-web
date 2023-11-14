"use client";

import { HTMLProps, ReactNode } from "react";
import Link from "next/link";

import cx from "@/utils/cx";
import { allJobs } from "contentlayer/generated";

import Button from "@/components/button";
import Container from "@/components/container";
import { Logo } from "@/components/logo";

import Nav from "./nav";

const jobLength = allJobs.filter((o) => !o.draft).length;

export default function Header({
  className,
  ...props
}: HTMLProps<HTMLHeadElement>) {
  return (
    <header className={cx("hidden md:block", className)} {...props}>
      <Container>
        <div className="flex items-center border-b border-b-white/5 py-5 md:grid md:grid-cols-4">
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
    href: "/pricing",
  },
  {
    name: "Customers",
    href: "/customers",
  },
  // {
  //   name: "Examples",
  //   href: "/examples",
  // },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Discord",
    href: "https://upstash.com/discord",
  },
  {
    name: "Docs",
    href: "/docs",
  },
];

const careersIndex = NavItems.length - 1;
if (jobLength > 0) {
  NavItems.splice(careersIndex, 0, {
    name: "Careers",
    href: "/careers",
    children: (
      <span
        className="flex items-center rounded-full bg-emerald-300/20
          px-1.5 py-1 font-mono text-sm leading-none text-emerald-500"
      >
        {jobLength}
      </span>
    ),
  });
}

export { NavItems };
