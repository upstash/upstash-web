import React from "react";
import cx from "@/utils/cx";
import Container from "@/components/container";
import Link from "next/link";
import { LINKS } from "@/utils/links";
import { Logo } from "@/components/logo";
import Icon, { ICON_NAMES } from "@/components/icon";

export interface IAppFooter extends React.HTMLAttributes<HTMLDivElement> {}

export default function AppFooter({ className, ...props }: IAppFooter) {
  return (
    <footer className={cx("py-32 text-center", className)} {...props}>
      <Container className="max-w-screen-md">
        <div className="grid place-items-center gap-10">
          {/**/}

          <Logo />

          <div>
            <Link href={LINKS.support} color="inherit">
              Contact Us <Icon className="" icon={ICON_NAMES.ArrowUpRight} />
            </Link>
            <Link href={LINKS.privacy} color="inherit">
              Privacy Policy
            </Link>
            <Link href={LINKS.terms} color="inherit">
              Terms of Service
            </Link>
          </div>

          <p>© {new Date().getFullYear()} Upstash, Inc. Based in California.</p>

          <div className="text-xs opacity-60">
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
