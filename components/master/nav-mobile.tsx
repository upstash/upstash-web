import { HTMLProps, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import Button from "@/components/button";
import cx from "@/utils/cx";
import { NavItems } from "./header";

export default function NavMobile({ hidden }: HTMLProps<HTMLDivElement> & {}) {
  return (
    <nav
      className={cx(
        "absolute inset-x-0 top-full z-10 mt-px flex-col p-6 pb-24",
        "bg-zinc-950 shadow-2xl",
        hidden ? "flex" : "hidden"
      )}
    >
      {/* login */}
      <Button
        type="button"
        target="_self"
        hideIcon
        href="https://console.upstash.com"
        className="justify-center py-3 text-lg font-medium bg-emerald-400 font-display text-zinc-950"
      >
        Login
      </Button>

      {/* items */}
      <div className="flex flex-col mt-6 divide-y divide-white/5 border-y border-y-white/5">
        {NavItems.map((item) => {
          return (
            <NavLink key={item.href} href={item.href}>
              {item.name}
              {item.children}
            </NavLink>
          );
        })}
        {/* doc */}
        <div>
          <Button
            type="button"
            href="/docs"
            className="px-0 py-4 text-lg font-medium bg-transparent font-display hover:bg-white/03 hover:text-zinc-50"
          >
            Docs
          </Button>
        </div>
      </div>
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
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
