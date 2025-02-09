import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import {
  IconBrandDiscord,
  IconCalendarEvent,
  IconMail,
  IconMessageDots,
} from "@tabler/icons-react";
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
        </header>

        <div className="mx-auto mt-20 grid max-w-2xl gap-4 md:gap-6">
          <Link href="https://calendly.com/upstash" target="_blank">
            <span>
              <b>Book</b> <span className="opacity-60">a Meeting</span>
            </span>
            <IconCalendarEvent size={40} strokeWidth={1.5} />
          </Link>

          <Link href="" target="_blank">
            <span>
              <b>Chat</b> <span className="opacity-60">with Team</span>
            </span>
            <IconMessageDots size={40} strokeWidth={1.5} />
          </Link>

          <Link href="">
            <span>
              <b>Send</b> <span className="opacity-60">us an Email</span>
            </span>
            <IconMail size={40} strokeWidth={1.5} />
          </Link>

          <Link href="" target="_blank">
            <span>
              <b>Join</b>{" "}
              <span className="opacity-60">our Discord Community</span>
            </span>
            <IconBrandDiscord size={40} strokeWidth={1.5} />
          </Link>
        </div>
      </Container>
    </main>
  );
}

function Link({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={cx(
        "group flex items-center justify-between rounded-3xl border-2 border-transparent bg-white p-6 text-left text-xl shadow-sm hover:border-primary hover:bg-emerald-50 hover:text-primary-text md:rounded-4xl md:p-8 md:text-2xl",
        className,
      )}
      {...props}
    />
  );
}
