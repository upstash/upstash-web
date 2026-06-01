import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import IconRedis from "@/components/icon-redis";
import cx from "@/utils/cx";
import { IconNotes, IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function SectionHero() {
  return (
    <section className="relative py-10 md:py-24">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <div className="grid place-items-center">
          <h1
            className={cx(
              "flex flex-col items-center gap-4 md:gap-6",
              "text-center font-display text-4xl font-bold md:text-7xl",
              "bg-gradient-to-r bg-clip-text text-transparent",
              "from-primary-text via-primary to-amber-300",
            )}
          >
            <IconRedis className="size-12 shrink-0 md:size-20" />
            <span>
              <span className="block">Serverless</span>
              <span className="block">Redis Database</span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg text-text-mute md:text-2xl">
            Upstash runs Redis as a fully managed, serverless database with
            single-digit millisecond latency and durable storage. You pay only
            for what you use, and there are no servers to run. Connect over HTTP
            or the standard Redis protocol.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="https://console.upstash.com/redis" target="_blank">
              <Button variant="primary" className="h-[42px] px-5">
                Create Database
                <IconPlus size={24} />
              </Button>
            </a>
            <a href="https://upstash.com/docs/redis" target="_blank">
              <Button variant="defaultDark" className="h-[42px] px-5">
                Documentation
                <IconNotes size={24} />
              </Button>
            </a>
            <Link href="/pricing/redis">
              <Button variant="default" className="h-[42px] px-5">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
