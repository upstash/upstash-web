"use client";

import Bg from "@/components/bg";
import Container from "@/components/container";
import { LogoBranch } from "@/components/customers/logo-branch";
import { LogoClay } from "@/components/customers/logo-clay";
import { LogoClickfunnels } from "@/components/customers/logo-clickfunnels";
import { LogoCodeRabbit } from "@/components/customers/logo-coderabbit";
import { LogoCoinbase } from "@/components/customers/logo-coinbase";
import { LogoCustomerio } from "@/components/customers/logo-customerio";
import { LogoDropee } from "@/components/customers/logo-dropee";
import { LogoDubsh } from "@/components/customers/logo-dubsh";
import { LogoFal } from "@/components/customers/logo-fal";
import { LogoFly } from "@/components/customers/logo-fly";
import { LogoGitbook } from "@/components/customers/logo-gitbook";
import { LogoHashnode } from "@/components/customers/logo-hashnode";
import { LogoHumata } from "@/components/customers/logo-humata";
import { LogoMaker } from "@/components/customers/logo-maker";
import { LogoMeta } from "@/components/customers/logo-meta";
import { LogoMidjourney } from "@/components/customers/logo-midjourney";
import { LogoOkara } from "@/components/customers/logo-okara";
import { LogoOpenart } from "@/components/customers/logo-openart";
import { LogoOpencode } from "@/components/customers/logo-opencode";
import { LogoOpenrouter } from "@/components/customers/logo-openrouter";
import { LogoPaulSmith } from "@/components/customers/logo-paul-smith";
import { LogoPolymarket } from "@/components/customers/logo-polymarket";
import { LogoSupabase } from "@/components/customers/logo-supabase";
import { LogoVercel } from "@/components/customers/logo-vercel";
import { LogoZapier } from "@/components/customers/logo-zapier";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import SectionViewTracker from "@/components/section-view-tracker";
import cx from "@/utils/cx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import {
  ComponentType,
  SVGProps,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function HomeHeroCustomer() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section data-area="home_customers" className="relative z-10 py-8 md:py-16">
      <SectionViewTracker section="customers" />
      <Bg />

      <Container>
        {/* title */}
        <SectionHeader>
          <SectionHeaderTitle>Meet our Customers</SectionHeaderTitle>
          <SectionHeaderSummary>
            Upstash powers companies of every size and industry, from
            cutting-edge AI to everyday retail
          </SectionHeaderSummary>
        </SectionHeader>

        {/* QUOTES CAROUSEL */}
        <div className="mt-16 md:mt-24">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {customers
                .filter((c) => c.quote)
                .map(({ name, icon, quote, slug }) => {
                  const content = (
                    <div
                      className={cx(
                        "group flex h-full flex-col overflow-hidden px-4 py-3 sm:py-4",
                        "rounded-2xl bg-bg-mute md:rounded-4xl dark:bg-bg-mute dark:hover:bg-white",
                        "bg-white py-8 shadow-sm transition-colors sm:px-16 sm:py-10",
                      )}
                    >
                      <span className="flex h-10 items-center justify-center text-text transition-colors group-hover:text-primary group-hover:opacity-100 dark:text-white dark:opacity-80">
                        {icon}
                      </span>
                      <p
                        className={cx(
                          "mt-4 grow md:text-xl",
                          "text-balance text-text-mute dark:text-text",
                          "transition-colors dark:group-hover:text-bg",
                        )}
                      >
                        "{quote}"
                      </p>
                    </div>
                  );
                  return (
                    <div
                      key={name}
                      className="min-w-0 flex-[0_0_100%] px-2 md:px-3"
                    >
                      {slug ? (
                        <Link href={`/customers/${slug}`}>{content}</Link>
                      ) : (
                        content
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {customers
              .filter((c) => c.quote)
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cx(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    selectedIndex === index
                      ? "w-8 bg-primary"
                      : "bg-text-mute hover:bg-text dark:bg-text dark:hover:bg-white",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
          </div>
        </div>

        {/* LOGO GRID — 3 rows of 5, testimonials clickable, rest static */}
        <div className="mx-auto mt-16 grid max-w-[960px] grid-cols-2 gap-2 xs:grid-cols-3 md:mt-24 md:grid-cols-5 md:gap-3">
          {logos.map(({ name, Logo, slug, h = 24 }) => {
            const cell = (
              <div
                className={cx(
                  "group flex h-[72px] w-full items-center justify-center px-4",
                  "rounded-2xl bg-bg-mute transition-colors md:rounded-4xl dark:bg-bg-mute",
                  slug &&
                    "transition-all hover:text-primary hover:shadow-sm dark:hover:bg-white",
                )}
              >
                <Logo style={{ height: h }} className="w-auto max-w-full" />
              </div>
            );
            return slug ? (
              <Link key={name} href={`/customers/${slug}`} aria-label={name}>
                {cell}
              </Link>
            ) : (
              <div key={name}>{cell}</div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={"/customers"}
            className="text-lg font-semibold underline underline-offset-4 transition-colors hover:text-primary"
          >
            Read case studies →
          </Link>
        </div>
      </Container>
    </section>
  );
}

// Homepage logo wall — 3 rows of 5. `slug` marks a customer story (clickable).
// Every logo shares one height in the grid; `cn` nudges optical size per logo.
const logos: {
  name: string;
  Logo: ComponentType<SVGProps<SVGSVGElement>>;
  slug?: string;
  h?: number;
}[] = [
  // Row 1 — immediate, broadly recognizable trust
  { name: "Meta", Logo: LogoMeta, h: 20 },
  { name: "Coinbase", Logo: LogoCoinbase, h: 19 },
  { name: "Vercel", Logo: LogoVercel, h: 22 },
  { name: "Supabase", Logo: LogoSupabase, slug: "supabase", h: 24 },
  { name: "Midjourney", Logo: LogoMidjourney, h: 30 },
  // Row 2 — established companies plus industry variety
  { name: "Zapier", Logo: LogoZapier, slug: "zapier", h: 24 },
  { name: "GitBook", Logo: LogoGitbook, slug: "gitbook", h: 23 },
  { name: "Polymarket", Logo: LogoPolymarket, h: 22 },
  { name: "Fly.io", Logo: LogoFly, h: 24 },
  { name: "Paul Smith", Logo: LogoPaulSmith, slug: "paul-smith", h: 22 },
  // Row 3 — current AI and developer-platform credibility
  { name: "Clay", Logo: LogoClay, h: 30 },
  { name: "fal", Logo: LogoFal, h: 24 },
  { name: "OpenRouter", Logo: LogoOpenrouter, h: 22 },
  { name: "CodeRabbit", Logo: LogoCodeRabbit, h: 22 },
  { name: "OpenCode", Logo: LogoOpencode, h: 20 },
];

const customers = [
  {
    name: "Vercel",
    icon: <LogoVercel height={22} />,
  },
  {
    name: "Supabase",
    slug: "supabase",
    icon: <LogoSupabase height={24} />,
    quote: (
      <>
        At our scale, it's important to use the right tool for the right
        workload. Upstash lets us power low-latency edge use cases globally,
        while still keeping our overall architecture simple and cost-effective.
      </>
    ),
  },
  {
    name: "Okara",
    slug: "okara",
    icon: <LogoOkara height={30} />,
    quote: (
      <>
        We launched and immediately saw significant demand. Upstash was one of
        those decisions that we made very quickly because it solved real scaling
        problems without slowing down the team.
      </>
    ),
  },
  {
    name: "Midjourney",
    icon: <LogoMidjourney height={30} />,
  },
  {
    name: "Fly.io",
    icon: <LogoFly height={22} />,
  },
  {
    name: "Paul Smith",
    slug: "paul-smith",
    icon: <LogoPaulSmith height={22} />,
    quote: (
      <>
        Upstash's global Redis has been a game changer. Low latency, zero
        downtime, and easy to use across frontend and backend. With brilliant
        customer service and fast response times, we deliver the best shopping
        experience.
      </>
    ),
  },
  {
    name: "Openrouter",
    icon: <LogoOpenrouter height={22} />,
  },
  {
    name: "OpenArt",
    slug: "openart",
    icon: <LogoOpenart height={20} />,
    quote: (
      <>
        Developer experience became significantly better than what we
        experienced with traditional cloud service providers. The observability
        improvements alone were game-changing for our small team.
      </>
    ),
  },
  {
    name: "Customer.io",
    icon: <LogoCustomerio height={18} />,
  },
  {
    name: "Dub.co",
    slug: "dub",
    quote: (
      <>
        The Upstash JS SDK is incredibly easy to use – all I needed to do was
        run npm install, initialize the Redis instance, and start running redis
        commands – super simple!
      </>
    ),
    icon: <LogoDubsh height={27} />,
  },
  {
    name: "Zapier",
    slug: "zapier",
    quote: (
      <>
        We chose Upstash specifically because it offers an HTTP interface for
        Redis, which perfectly suited our needs
      </>
    ),
    icon: <LogoZapier height={24} />,
  },
  {
    name: "GitBook",
    icon: <LogoGitbook height={23} />,
  },
  {
    name: "Branch",
    slug: "branch",
    icon: <LogoBranch height={32} />,
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
  {
    name: "Humata",
    slug: "humata",
    icon: <LogoHumata height={32} />,
    quote: (
      <>
        Before Upstash QStash, we struggled with upload reliability and request
        failures, but with their support, we've achieved over 99.9% reliability
        for millions of users. Their seamless integration with our serverless
        architecture has made developing new features, like importing entire
        knowledge bases, much simpler.
      </>
    ),
  },
  {
    name: "Maker.co",
    slug: "maker",
    icon: <LogoMaker height={24} />,
    quote: (
      <>
        The ability to exceed the resident memory of the machine that Upstash
        has built opens up more possibilities, and allows reading and writing
        directly to Redis and skipping the middle-man
      </>
    ),
  },
  {
    name: "ClickFunnels",
    icon: <LogoClickfunnels height={18} />,
    slug: "clickfunnels",
    quote: (
      <>
        We've been working closely together on improving alerting across their
        clusters, and it feels less like using a vendor and more like building
        the future of edge infrastructure together.
      </>
    ),
  },
  {
    name: "Hashnode",
    icon: <LogoHashnode height={18} />,
  },
  {
    name: "Dropee",
    slug: "dropee",
    icon: <LogoDropee height={30} className="translate-y-[-2px]" />,
    quote: (
      <>
        Since day one we haven't had to worry about traffic peaks. The interface
        is a pleasure to use and support has been amazing, especially when we
        hit limits.
      </>
    ),
  },
];
