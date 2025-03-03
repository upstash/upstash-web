import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import cx from "@/utils/cx";
import { IconArrowUpRight } from "@tabler/icons-react";
import React from "react";

export default function HomeHero() {
  return (
    <section className="relative z-0 py-16">
      <Bg className="!top-1/2 -translate-y-1/2" />

      <Container>
        {/*hero title*/}
        <h1
          className={cx(
            "tracking-tight transition",
            "font-display text-5xl font-bold leading-none md:text-[8rem]",
            "bg-gradient-to-r bg-clip-text text-transparent",
            "from-primary-text via-primary to-amber-500",
          )}
        >
          Serverless <br />
          Data Platform
        </h1>

        {/* hero subtitle*/}
        <h2 className={cx("mt-2 text-lg md:text-2xl", "text-text-mute")}>
          The single platform for all your data needs
        </h2>

        <div className="mt-6">
          <Button asChild variant="primary" className="px-8">
            <a href="https://console.upstash.com" target="_self">
              Start for Free <IconArrowUpRight size={24} />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
