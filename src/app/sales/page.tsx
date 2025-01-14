import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import { IconCalendarDot } from "@tabler/icons-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sales",
  description: "Unlock the full potential of Upstash for your business.",
};

export default function HomePage() {
  return (
    <main className="relative z-0 py-16 text-center md:py-24">
      <Bg />

      <Container>
        <header>
          <PageHeaderTitle>Contact Us</PageHeaderTitle>

          <PageHeaderDesc className="mt-2">
            We're happy to assist you with any questions about our technology,
            pricing plans, custom contract options, and migrations assistance.
          </PageHeaderDesc>

          <p className="mt-6">
            <Button asChild variant="primary">
              <a target="_blank" href="https://calendly.com/upstash">
                <IconCalendarDot size={24} /> Book a meeting directly
              </a>
            </Button>
          </p>
        </header>

        <section className="mt-20 md:mt-24">
          <BigText className="xl:-mb-[70px] xl:text-[160px]">
            Let's Connect
          </BigText>

          <div className="relative z-0 mx-auto max-w-[640px] rounded-2xl border-2 border-dashed border-zinc-200 bg-white p-10 text-left shadow-xl md:p-14">
            <form className="grid gap-4 md:grid-cols-2 md:gap-6">
              {/* name, email, message */}
              <div className="grid gap-1">
                <label htmlFor="name" className="text-sm uppercase">
                  Name *
                </label>
                <input
                  className="block w-full rounded-lg border border-zinc-300 px-4 py-3"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>

              <div className="grid gap-1">
                <label htmlFor="email" className="text-sm uppercase">
                  Email *
                </label>
                <input
                  className="block w-full rounded-lg border border-zinc-300 px-4 py-3"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>

              <div className="grid gap-1 md:col-span-2">
                <label htmlFor="message" className="text-sm uppercase">
                  Message *
                </label>
                <textarea
                  className="block w-full rounded-lg border border-zinc-300 px-4 py-3"
                  id="message"
                  name="message"
                  rows={5}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-text-mute">
                  By submitting you agree to the{" "}
                  <a
                    className="underline"
                    href="/trust/terms.pdf"
                    target="_blank"
                  >
                    Terms of Service
                  </a>{" "}
                  and acknowledge the{" "}
                  <a
                    className="underline"
                    href="/trust/privacy.pdf"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="md:col-span-2">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </section>
      </Container>
    </main>
  );
}

function BigText({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <h5
      className={cx(
        "pointer-events-none -mb-[5vw] whitespace-nowrap xl:-mb-[70px]",
        "font-display text-[12vw] font-bold leading-tight xl:text-[160px]",
        "bg-gradient-to-br bg-clip-text text-transparent",
        "from-primary via-yellow-400 to-primary-text",
        className,
      )}
    >
      {children}
    </h5>
  );
}
