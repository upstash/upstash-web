import { HTMLAttributes } from "react";
import cx from "@/utils/cx";
import { Logo } from "@/components/app/logo";
import Link from "next/link";
import { allJobs } from "contentlayer/generated";
import Button from "@/components/button";
import Container from "@/components/container";

export interface IAppHeader extends HTMLAttributes<HTMLDivElement> {}

export default function Header({ className, ...props }: IAppHeader) {
  return (
    <header className={cx("group py-10", className)} {...props}>
      <Container>
        <div className="grid grid-cols-4 items-center">
          <div className="flex">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* nav */}
          <nav
            className="col-span-2 flex items-center justify-center gap-6
          opacity-60 transition group-hover:opacity-100"
          >
            <Link
              href="/about"
              className="hover:text-emerald-300 hover:underline"
            >
              Pricing
            </Link>
            {/*<Link href="/about">Open Source</Link>*/}
            <Link
              href="/about"
              className="hover:text-emerald-300 hover:underline"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="hover:text-emerald-300 hover:underline"
            >
              Blog
            </Link>
            <Link
              href="/careers"
              className="hover:text-emerald-300 hover:underline"
            >
              Careers
              <span
                className="ml-0.5 rounded-full bg-emerald-300/20
              px-1.5 py-0.5 font-mono text-sm text-emerald-500"
              >
                {allJobs.filter((o) => !o.draft).length}
              </span>
            </Link>
            <Button href="https://docs.upstash.com" target="_blank">
              Docs
            </Button>
          </nav>

          {/* cta */}
          <div className="flex justify-end">
            <Button type="button" hideIcon href="https://console.upstash.com">
              Login
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
