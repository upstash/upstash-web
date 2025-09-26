import Button from "@/components/button";
import Container from "@/components/container";
import { Logo } from "@/components/logo";
import OutLink from "@/components/out-link";
import cx from "@/utils/cx";
import Link from "next/link";
import { HTMLProps } from "react";

export interface IAppFooter extends HTMLProps<HTMLDivElement> {}

export default function Footer({ className, ...props }: IAppFooter) {
  return (
    <footer
      className={cx("relative z-20 py-24 text-center", className)}
      {...props}
    >
      <Container className="max-w-screen-md">
        <div className="grid place-items-center">
          {/**/}

          <Logo />

          <p className="mt-10 text-text-mute">
            © {new Date().getFullYear()} Upstash, Inc. Based in California.
          </p>

          <div className="mt-2 flex flex-col items-center gap-4 text-text-mute md:flex-row">
            <Link
              href="/contact"
              className="hover:text-primary hover:underline"
            >
              Contact Us
            </Link>
            <OutLink href="/trust/privacy.pdf">Privacy Policy</OutLink>
            <OutLink href="/trust/terms.pdf">Terms of Service</OutLink>
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              className="mt-10 whitespace-nowrap rounded-full bg-emerald-400/10 !py-2 px-4 text-emerald-500"
            >
              <a target="_blank" href="https://status.upstash.com/">
                <span className="-ml-1 mr-2 inline-flex h-3 w-3 animate-pulse rounded-full bg-current" />
                <span className="">Status</span>
              </a>
            </Button>

            <Button
              asChild
              className="mt-10 whitespace-nowrap rounded-full bg-emerald-400/10 !py-2 px-4 text-emerald-500"
            >
              <a target="_blank" href="https://latency.upstash.io/">
                <span className="-ml-1 mr-2 inline-flex h-3 w-3 animate-pulse rounded-full bg-current" />
                <span className="">Latency</span>
              </a>
            </Button>
          </div>

          <div className="mt-10 space-y-2 text-xs opacity-40">
            <p>
              * Redis is a trademark of Redis Ltd. Any rights therein are
              reserved to Redis Ltd. Any use by Upstash is for referential
              purposes only and does not indicate any sponsorship, endorsement
              or affiliation between Redis and Upstash.
            </p>
            <p>
              ** Cloudflare, the Cloudflare logo, and Cloudflare Workers are
              trademarks and/or registered trademarks of Cloudflare, Inc. in the
              United States and other jurisdictions.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
