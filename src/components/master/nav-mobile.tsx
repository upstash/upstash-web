import Button from "@/components/button";
import { useGetAffiliateCodeFromApi } from "@/hooks/use-affiliate-code";
import cx from "@/utils/cx";
import { allJobs } from "@content";
import Link, { LinkProps } from "next/link";
import React, { HTMLProps, ReactNode } from "react";

const jobLength = allJobs.filter((o) => !o.draft).length;

export default function NavMobile({ hidden }: HTMLProps<HTMLDivElement> & {}) {
  const { affiliateCode } = useGetAffiliateCodeFromApi();

  return (
    <nav
      className={cx(
        "absolute inset-x-0 top-full z-10 mt-px flex-col p-6",
        "bg-bg shadow-2xl",
        hidden ? "flex" : "hidden",
      )}
    >
      {/* items */}
      <div className="flex flex-col divide-y divide-black/5 dark:divide-white/5">
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
      <Button asChild variant="primary" className="my-6">
        <a
          href={
            affiliateCode
              ? `https://console.upstash.com/?code=${affiliateCode}`
              : "https://console.upstash.com"
          }
        >
          Login
        </a>
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
        <span className="flex items-center rounded-full bg-emerald-300/20 px-1.5 py-1 font-mono text-sm leading-none text-primary">
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
    name: "Careers",
    href: "/careers",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];
