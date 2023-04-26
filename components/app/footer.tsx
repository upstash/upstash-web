import React from "react";
import cx from "@/utils/cx";
import Container from "@/components/container";
import { Logo } from "@/components/app/logo";
import Button from "@/components/button";

export interface IAppFooter extends React.HTMLAttributes<HTMLDivElement> {}

export default function Footer({ className, ...props }: IAppFooter) {
  return (
    <footer className={cx("py-32 text-center", className)} {...props}>
      <Container className="max-w-screen-md">
        <div className="grid place-items-center gap-10">
          {/**/}

          <Logo />

          <p className="opacity-60">
            © {new Date().getFullYear()} Upstash, Inc. Based in California.
          </p>

          <div className="flex items-center gap-6">
            <Button
              href="https://docs.upstash.com/docs/help/support"
              className="opacity-60 hover:opacity-100"
            >
              Contact Us
            </Button>
            <Button
              href="/static/trust/privacy.pdf"
              className="opacity-60 hover:opacity-100"
            >
              Privacy Policy
            </Button>
            <Button
              href="/static/trust/terms.pdf"
              className="opacity-60 hover:opacity-100"
            >
              Terms of Service
            </Button>
          </div>

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
