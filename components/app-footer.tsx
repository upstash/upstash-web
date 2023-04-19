import React from "react";
import cx from "@/utils/cx";
import Container from "@/components/container";
import { Logo } from "@/components/logo";
import LinkNewTab from "@/components/link-new-tab";

export interface IAppFooter extends React.HTMLAttributes<HTMLDivElement> {}

export default function AppFooter({ className, ...props }: IAppFooter) {
  return (
    <footer className={cx("py-32 text-center", className)} {...props}>
      <Container className="max-w-screen-md">
        <div className="grid place-items-center gap-10">
          {/**/}

          <Logo />

          <div className="flex items-center gap-6 opacity-60 hover:opacity-100">
            <LinkNewTab href="https://docs.upstash.com/docs/help/support">
              Contact Us
            </LinkNewTab>
            <LinkNewTab href="/static/trust/privacy.pdf">
              Privacy Policy
            </LinkNewTab>
            <LinkNewTab href="/static/trust/terms.pdf">
              Terms of Service
            </LinkNewTab>
          </div>

          <p>© {new Date().getFullYear()} Upstash, Inc. Based in California.</p>

          <div className="space-y-2 text-xs opacity-40">
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
