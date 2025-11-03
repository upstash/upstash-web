"use client";

import Bg from "@/components/bg";
import Container from "@/components/container";
import { LogoBranch } from "@/components/customers/logo-branch";
import { LogoClickfunnels } from "@/components/customers/logo-clickfunnels";
import { LogoCustomerio } from "@/components/customers/logo-customerio";
import { LogoDropee } from "@/components/customers/logo-dropee";
import { LogoDubsh } from "@/components/customers/logo-dubsh";
import { LogoFly } from "@/components/customers/logo-fly";
import { LogoGail } from "@/components/customers/logo-gail";
import { LogoGitbook } from "@/components/customers/logo-gitbook";
import { LogoHashnode } from "@/components/customers/logo-hashnode";
import { LogoHumata } from "@/components/customers/logo-humata";
import { LogoMaker } from "@/components/customers/logo-maker";
import { LogoMidjourney } from "@/components/customers/logo-midjourney";
import { LogoOpenart } from "@/components/customers/logo-openart";
import { LogoOpenrouter } from "@/components/customers/logo-openrouter";
import { LogoPaulSmith } from "@/components/customers/logo-paul-smith";
import { LogoSupabase } from "@/components/customers/logo-supabase";
import { LogoVercel } from "@/components/customers/logo-vercel";
import { LogoZapier } from "@/components/customers/logo-zapier";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import cx from "@/utils/cx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
    <section className="relative z-10 py-8 md:py-16">
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

        {/* CARDS */}
        <div
          className={cx(
            "mt-16 flex flex-wrap justify-center gap-2 rounded-2xl px-4 md:mt-16 md:gap-6",
          )}
        >
          {customers.map(({ name, icon, slug }) => {
            const cell = (
              <div
                className={cx(
                  "group flex h-[72px] w-[180px] flex-col items-center justify-center",
                  "rounded-2xl bg-bg-mute transition-colors hover:text-primary md:rounded-4xl dark:bg-bg-mute dark:hover:bg-white",
                )}
              >
                {icon}
              </div>
            );
            return slug ? (
              <Link key={name} href={`/customers/${slug}`}>
                {cell}
              </Link>
            ) : (
              <div key={name}>{cell}</div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

const customers = [
  {
    name: "Vercel",
    icon: <LogoVercel height={22} />,
  },
  {
    name: "Supabase",
    icon: <LogoSupabase height={24} />,
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
        Upstash's global Redis has been a game changer — low latency, zero
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
    name: "GitBook",
    icon: <LogoGitbook height={23} />,
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
    name: "Gail",
    slug: "gail",
    icon: <LogoGail height={20} />,
    quote: (
      <>
        We were using Redis before for our cache but we saw great support from
        the Upstash team when we grew to handle more conversations and had
        difficulty keeping up with the growth. Upstash was there to help and
        within a few minutes we had the expanded capacity we needed.
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
