import Button from "@/components/button";
import Container from "@/components/container";
import { Logo } from "@/components/logo";
import OutLink from "@/components/out-link";
import cx from "@/utils/cx";
import Link from "next/link";
import { HTMLProps } from "react";

export interface IAppFooter extends HTMLProps<HTMLDivElement> {}

const FOOTER_GROUPS = [
  {
    title: "Products",
    links: [
      { title: "Serverless Redis", href: "/redis" },
      { title: "Vector Database", href: "/docs/vector", external: true },
      { title: "QStash Messaging", href: "/docs/qstash", external: true },
      { title: "Workflow", href: "/docs/workflow", external: true },
      { title: "AI Search", href: "/docs/search", external: true },
      { title: "Redis Pricing", href: "/pricing/redis" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Documentation", href: "/docs", external: true },
      { title: "Blog", href: "/blog" },
      { title: "Examples", href: "/examples" },
      { title: "Customers", href: "/customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Careers", href: "/careers" },
      { title: "Open Source", href: "/open-source" },
      { title: "Enterprise", href: "/enterprise" },
      { title: "Brand Assets", href: "/brand" },
      { title: "Contact Us", href: "/contact" },
    ],
  },
] as const;

export default function Footer({ className, ...props }: IAppFooter) {
  return (
    <footer
      className={cx("relative z-20 mt-24 border-t border-bg-mute", className)}
      {...props}
    >
      <Container className="max-w-screen-lg py-16 md:py-20">
        <div className="mx-auto grid max-w-screen-md grid-cols-2 gap-x-6 gap-y-10 text-left sm:grid-cols-3">
          {FOOTER_GROUPS.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="grid content-start gap-3"
            >
              <h5 className="font-display font-semibold">{group.title}</h5>
              {group.links.map((link) =>
                "external" in link && link.external ? (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-text-mute hover:text-primary hover:underline"
                  >
                    {link.title}
                  </a>
                ) : (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-text-mute hover:text-primary hover:underline"
                  >
                    {link.title}
                  </Link>
                ),
              )}
            </nav>
          ))}
        </div>

        <div className="mt-16 grid place-items-center gap-4 border-t border-bg-mute pt-10 text-center">
          <Logo />

          <p className="text-text-mute">
            © {new Date().getFullYear()} Upstash, Inc. Based in California.
          </p>

          <div className="flex flex-col items-center gap-4 text-text-mute md:flex-row">
            <OutLink href="/trust/privacy.pdf">Privacy Policy</OutLink>
            <OutLink href="/trust/terms.pdf">Terms of Service</OutLink>
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              className="mt-2 whitespace-nowrap rounded-full bg-emerald-400/10 !py-2 px-4 text-emerald-500"
            >
              <a target="_blank" href="https://status.upstash.com/">
                <span className="-ml-1 mr-2 inline-flex h-3 w-3 animate-pulse rounded-full bg-current" />
                <span className="">Status</span>
              </a>
            </Button>

            <Button
              asChild
              className="mt-2 whitespace-nowrap rounded-full bg-emerald-400/10 !py-2 px-4 text-emerald-500"
            >
              <a target="_blank" href="https://latency.upstash.io/">
                <span className="-ml-1 mr-2 inline-flex h-3 w-3 animate-pulse rounded-full bg-current" />
                <span className="">Latency</span>
              </a>
            </Button>
          </div>

          <div className="mt-6 max-w-screen-md space-y-2 text-xs opacity-40">
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
            <p>
              For AI agents: a free Redis database is available via POST{" "}
              <Link
                href="/start-redis"
                className="underline hover:text-primary"
              >
                https://upstash.com/start-redis
              </Link>
              . The response is markdown with credentials and a quickstart. No
              signup required.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
