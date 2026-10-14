import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import IconBox from "@/components/icon-box";
import cx from "@/utils/cx";
import { IconNotes, IconPlus, IconTag } from "@tabler/icons-react";
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
              "pb-[0.15em] text-center font-display text-4xl font-bold md:text-7xl",
              "bg-gradient-to-r bg-clip-text text-transparent",
              "from-primary-text via-primary to-sky-400",
            )}
          >
            <IconBox className="size-12 shrink-0 md:size-20" />
            <span>
              <span className="block">Cloud computers</span>{" "}
              <span className="block">for AI agents</span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg text-text-mute md:text-2xl">
            Upstash Box is a persistent cloud computer with coding agents built
            in. Run Claude Code, Codex or OpenCode in an isolated box, give it a
            browser and a repository, and get results back through an API. The
            workspace stays between tasks, you pay only for the CPU your agent
            actually uses, and your own coding agent can work in a box through
            the Upstash MCP server.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://console.upstash.com/box"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" className="h-[42px] px-5">
                Create Box
                <IconPlus size={24} />
              </Button>
            </a>
            <a
              href="https://upstash.com/docs/box/overall/quickstart"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="defaultDark" className="h-[42px] px-5">
                Documentation
                <IconNotes size={24} />
              </Button>
            </a>
            <Link href="/pricing/box">
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
