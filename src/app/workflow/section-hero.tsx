import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import IconWorkflow from "@/components/icon-workflow";
import cx from "@/utils/cx";
import { IconArrowUpRight, IconNotes, IconTag } from "@tabler/icons-react";
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
              "from-primary-text via-primary to-purple-400",
            )}
          >
            <IconWorkflow className="size-12 shrink-0 md:size-20" />
            <span>
              <span className="block">Durable workflows</span>{" "}
              <span className="block">for serverless functions</span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg text-text-mute md:text-2xl">
            Upstash Workflow turns an API route into a durable, multi-step
            process. Each completed step's result is saved, and failures retry
            only the step that failed. Sleep for days, wait for events, and call
            slow APIs without hitting function timeouts.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://console.upstash.com/workflow"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" className="h-[42px] px-5">
                Get Started
                <IconArrowUpRight size={24} />
              </Button>
            </a>
            <a
              href="https://upstash.com/docs/workflow/getstarted"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="defaultDark" className="h-[42px] px-5">
                Documentation
                <IconNotes size={24} />
              </Button>
            </a>
            <Link href="/pricing/workflow">
              <Button variant="default" className="h-[42px] px-5">
                View Pricing
                <IconTag size={24} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
