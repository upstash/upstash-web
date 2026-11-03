import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import cx from "@/utils/cx";
import { IconArrowUpRight, IconTag } from "@tabler/icons-react";
import Link from "next/link";

export default function SectionCta() {
  return (
    <section className="relative py-16 md:py-28">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-md">
        <h2
          className={cx(
            "font-display text-3xl font-bold md:text-5xl",
            "bg-gradient-to-r bg-clip-text text-transparent",
            "from-primary-text via-primary to-blue-500",
          )}
        >
          Publish your first message in minutes
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-text-mute md:text-xl">
          Start on the free tier with 1,000 messages a day. No credit card
          required.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary" className="h-[46px] px-6">
            <a
              href="https://console.upstash.com/qstash"
              target="_blank"
              rel="noreferrer"
            >
              Get Started
              <IconArrowUpRight size={24} />
            </a>
          </Button>
          <Button asChild variant="default" className="h-[46px] px-6">
            <Link href="/pricing/qstash">
              View Pricing
              <IconTag size={24} />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
