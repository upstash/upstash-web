import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import cx from "@/utils/cx";
import { IconNotes, IconTag } from "@tabler/icons-react";
import Link from "next/link";
import type { SectionHeroProps } from "./types";

export default function SectionHero({
  icon: Icon,
  title,
  description,
  gradient,
  titleClassName,
  primaryAction,
  docsHref,
  pricingHref,
}: SectionHeroProps) {
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
              "from-primary-text via-primary",
              gradient,
              titleClassName,
            )}
          >
            <Icon className="size-12 shrink-0 md:size-20" />
            <span>{title}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg text-text-mute md:text-2xl">
            {description}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={primaryAction.href} target="_blank" rel="noreferrer">
              <Button variant="primary" className="h-[42px] px-5">
                {primaryAction.label}
                {primaryAction.icon}
              </Button>
            </a>
            <a href={docsHref} target="_blank" rel="noreferrer">
              <Button variant="defaultDark" className="h-[42px] px-5">
                Documentation
                <IconNotes size={24} />
              </Button>
            </a>
            <Link href={pricingHref}>
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
