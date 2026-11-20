import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import cx from "@/utils/cx";
import { IconTag } from "@tabler/icons-react";
import Link from "next/link";
import type { SectionCtaProps } from "./types";

export default function SectionCta({
  title,
  description,
  gradient,
  titleClassName,
  primaryAction,
  pricingHref,
}: SectionCtaProps) {
  return (
    <section className="relative py-16 md:py-28">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-md">
        <h2
          className={cx(
            "pb-[0.15em] font-display text-3xl font-bold md:text-5xl",
            "bg-gradient-to-r bg-clip-text text-transparent",
            "from-primary-text via-primary",
            gradient,
            titleClassName,
          )}
        >
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-text-mute md:text-xl">
          {description}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary" className="h-[46px] px-6">
            <a href={primaryAction.href} target="_blank" rel="noreferrer">
              {primaryAction.label}
              {primaryAction.icon}
            </a>
          </Button>
          <Button asChild variant="default" className="h-[46px] px-6">
            <Link href={pricingHref}>
              View Pricing
              <IconTag size={24} />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
