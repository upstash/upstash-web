import Bg from "@/components/bg";
import Container from "@/components/container";
import { LogoBranch } from "@/components/customers/logo-branch";
import { LogoMaker } from "@/components/customers/logo-maker";
import { LogoNiftykit } from "@/components/customers/logo-niftykit";
import { LogoZapier } from "@/components/customers/logo-zapier";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";

export default function SectionCustomer() {
  return (
    <section className="relative py-10 md:py-24">
      <Bg className="opacity-20" />

      <Container>
        <div>
          <PageHeaderTitle as="h2">Success Stories</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Discover how our customers are leveraging Upstash to achieve their
            goals.
          </PageHeaderDesc>
        </div>

        <div
          className={cx(
            "mt-10 grid gap-4 rounded-2xl md:mt-20 md:grid-cols-7 md:gap-6 md:rounded-4xl",
          )}
        >
          {/* Customer Card */}
          {CUSTOMERS.map(({ id, who, logo, quote }) => (
            <figure
              key={id}
              className={cx(
                "group relative flex flex-col justify-center md:col-span-3",
                "rounded-2xl px-10 py-8 md:rounded-4xl md:px-16 md:py-10",
                "bg-white shadow-sm",
                "transition hover:shadow-xl",
                "md:first:col-span-4",
                "md:last:col-span-4",
                "dark:bg-bg-mute dark:hover:bg-white/10",
              )}
            >
              <blockquote
                className={cx(
                  "text-balance md:text-xl",
                  "group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent",
                  "from-emerald-900 to-emerald-600",
                  "dark:from-emerald-200 dark:to-emerald-500",
                )}
              >
                <p>“{quote}”</p>
              </blockquote>

              <figcaption className="relative mt-6 flex h-10 items-center justify-center">
                <span className="absolute h-full -translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {who}
                </span>

                <span className="absolute h-full text-primary transition duration-300 group-hover:translate-y-4 group-hover:opacity-0">
                  {logo}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

const CUSTOMERS = [
  {
    id: "niftykit",
    who: "CTO, NiftyKit",
    logo: <LogoNiftykit height={26} />,
    quote: (
      <>
        Upstash service has been bulletproof, with almost zero issues, and their
        support team is some of the most incredible people. They helped us
        troubleshoot issues down to the code level
      </>
    ),
  },
  {
    id: "zapier",
    who: "VP of Product, Zapier",
    logo: <LogoZapier height={24} />,
    quote: (
      <>
        We chose Upstash specifically because it offers an HTTP interface for
        Redis, which perfectly suited our needs
      </>
    ),
  },
  {
    id: "maker",
    who: "Software Engineer, Maker",
    logo: <LogoMaker height={32} />,
    quote: (
      <>Upstash Redis helped us combine Primary Database and Caching Needs</>
    ),
  },
  {
    id: "branch",
    who: "CTO, Branch",
    logo: <LogoBranch height={32} />,
    quote: (
      <>
        Before Upstash we used Redis Cloud. This was not serverless, you had to
        think about instance size, memory usage etc. which we really don't want
        to do as it pulls our focus from product engineering, any time spent on
        operations like this is less time spent on our products and what
        differentiates Branch.
      </>
    ),
  },
];
