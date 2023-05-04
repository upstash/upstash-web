"use client";

import { ReactNode } from "react";
import cx from "@/utils/cx";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Button from "@/components/button";
import Container from "@/components/container";
import Nav from "./nav";
import { allJobs } from "contentlayer/generated";
import { HTMLMotionProps, motion } from "framer-motion";

const jobLength = allJobs.filter((o) => !o.draft).length;

export default function Header({
  className,
  ...props
}: HTMLMotionProps<"header">) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className={cx("hidden py-10 md:block", className)}
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
    </motion.header>
  );
}

const NavItems: {
  name: string;
  href: string;
  children?: ReactNode;
}[] = [
  {
    name: "Pricing",
    href: "/#pricing",
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
