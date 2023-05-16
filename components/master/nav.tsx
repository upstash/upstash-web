"use client";

import { HTMLProps, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import Button from "@/components/button";
import { usePathname } from "next/navigation";
import cx from "@/utils/cx";
import { NavItems } from "./header";

export default function Nav({}: HTMLProps<HTMLDivElement> & {}) {
  return (
    <nav className="col-span-2 flex items-center justify-center">
      {NavItems.map((item) => {
        return (
          <NavLink key={item.href} href={item.href}>
            {item.name}
            {item.children}
          </NavLink>
        );
      })}
      <Button
        href="https://docs.upstash.com"
        className="px-4 py-2 text-zinc-400"
      >
        Docs
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
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cx(
        "inline-flex gap-1.5 rounded-full px-4 py-2 text-zinc-400 transition",
        "hover:bg-white/03",
        isActive && "!bg-white/03 !text-zinc-50",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
