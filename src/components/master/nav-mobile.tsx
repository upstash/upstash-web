import React, { HTMLProps, ReactNode } from "react";
import Link, { LinkProps } from "next/link";

import cx from "@/utils/cx";
import { allJobs } from "@content";

import Button from "@/components/button";

const jobLength = allJobs.filter((o) => !o.draft).length;

export default function NavMobile({ hidden }: HTMLProps<HTMLDivElement> & {}) {
  return (
    <nav
      className={cx(
        "absolute inset-x-0 top-full z-10 mt-px flex-col p-6",
        "bg-zinc-950 shadow-2xl",
        hidden ? "flex" : "hidden",
      )}
    >
      {/* items */}
      <div className="flex flex-col divide-y divide-white/5">
        {NavItems.map((item) => {
          return (
            <NavLink key={item.href} href={item.href}>
              {item.name}
              {item.children}
            </NavLink>
          );
        })}
      </div>

      {/* login */}
      <Button
        type="button"
        target="_self"
        hideIcon
        href="https://console.upstash.com"
        className="my-6 justify-center bg-emerald-400 py-3 font-display text-lg font-medium text-zinc-950"
      >
        Login
      </Button>
    </nav>
  );
}

function NavLink({
  href,
  className,
  children,
  ...props
}: LinkProps & { className?: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={cx(
        "flex items-center gap-2 py-4 font-display text-lg font-medium",
        className,
      )}
      {...props}
    >
      {children}
      {href === "/careers" && (
        <span className="flex items-center rounded-full bg-emerald-300/20 px-1.5 py-1 font-mono text-sm leading-none text-emerald-500">
          {jobLength}
        </span>
      )}
    </Link>
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
    name: "Docs",
    href: "/docs",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Examples",
    href: "/examples",
  },

  {
    name: "Careers",
    href: "/careers",
  },
  {
    name: "Customers",
    href: "/customers",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Discord",
    href: "https://upstash.com/discord",
  },
];
