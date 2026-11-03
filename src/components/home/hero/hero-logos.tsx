"use client";

import { LogoCircleback } from "@/components/customers/logo-circleback";
import { LogoClay } from "@/components/customers/logo-clay";
import { LogoCodeRabbit } from "@/components/customers/logo-coderabbit";
import { LogoCoinbase } from "@/components/customers/logo-coinbase";
import { LogoComposio } from "@/components/customers/logo-composio";
import { LogoFal } from "@/components/customers/logo-fal";
import { LogoFly } from "@/components/customers/logo-fly";
import { LogoGitbook } from "@/components/customers/logo-gitbook";
import { LogoLiverpoolFc } from "@/components/customers/logo-liverpool-fc";
import { LogoMeta } from "@/components/customers/logo-meta";
import { LogoMidjourney } from "@/components/customers/logo-midjourney";
import { LogoNousResearchWordmark } from "@/components/customers/logo-nous-research-wordmark";
import { LogoOpencode } from "@/components/customers/logo-opencode";
import { LogoOpenrouter } from "@/components/customers/logo-openrouter";
import { LogoOuttake } from "@/components/customers/logo-outtake";
import { LogoPaper } from "@/components/customers/logo-paper";
import { LogoPaulSmith } from "@/components/customers/logo-paul-smith";
import { LogoPolymarket } from "@/components/customers/logo-polymarket";
import { LogoPrivy } from "@/components/customers/logo-privy";
import { LogoRork } from "@/components/customers/logo-rork";
import { LogoSierra } from "@/components/customers/logo-sierra";
import { LogoSupabase } from "@/components/customers/logo-supabase";
import { LogoVercel } from "@/components/customers/logo-vercel";
import { LogoZapier } from "@/components/customers/logo-zapier";
import { LogoZoComputer } from "@/components/customers/logo-zo-computer";
import cx from "@/utils/cx";
import Link from "next/link";
import {
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react";

type LogoItem = {
  name: string;
  Logo: ComponentType<SVGProps<SVGSVGElement>>;
  slug?: string;
  h?: number;
};

// Homepage logos, most recognizable first. `slug` marks a customer story
// (clickable). `h` nudges optical size per logo.
const logos: LogoItem[] = [
  // Immediate, broadly recognizable trust
  { name: "Meta", Logo: LogoMeta, h: 20 },
  { name: "Coinbase", Logo: LogoCoinbase, h: 19 },
  { name: "Vercel", Logo: LogoVercel, h: 22 },
  { name: "Supabase", Logo: LogoSupabase, slug: "supabase", h: 24 },
  { name: "Midjourney", Logo: LogoMidjourney, h: 30 },
  { name: "Zapier", Logo: LogoZapier, slug: "zapier", h: 24 },
  // Established companies plus industry variety
  { name: "Liverpool FC", Logo: LogoLiverpoolFc, h: 40 },
  { name: "GitBook", Logo: LogoGitbook, slug: "gitbook", h: 23 },
  { name: "Polymarket", Logo: LogoPolymarket, h: 22 },
  { name: "Fly.io", Logo: LogoFly, h: 24 },
  { name: "Paul Smith", Logo: LogoPaulSmith, slug: "paul-smith", h: 22 },
  { name: "Sierra", Logo: LogoSierra, h: 30 },
  { name: "Privy", Logo: LogoPrivy, h: 22 },
  // Current AI and developer-platform credibility
  { name: "Clay", Logo: LogoClay, h: 30 },
  { name: "fal", Logo: LogoFal, h: 24 },
  { name: "OpenRouter", Logo: LogoOpenrouter, h: 22 },
  { name: "CodeRabbit", Logo: LogoCodeRabbit, h: 22 },
  { name: "Paper", Logo: LogoPaper, h: 28 },
  { name: "OpenCode", Logo: LogoOpencode, h: 20 },
  { name: "Composio", Logo: LogoComposio, h: 22 },
  { name: "Rork", Logo: LogoRork, h: 24 },
  { name: "Nous Research", Logo: LogoNousResearchWordmark, h: 22 },
  { name: "Outtake", Logo: LogoOuttake, h: 20 },
  { name: "Circleback", Logo: LogoCircleback, h: 17 },
  { name: "Zo Computer", Logo: LogoZoComputer, h: 25 },
];

const VARIANTS = ["grid", "marquee", "rows", "cycle"] as const;
type Variant = (typeof VARIANTS)[number];

// Preview only: `?logos=grid|marquee|rows|cycle` picks a layout to compare.
export default function HeroLogos() {
  const [variant, setVariant] = useState<Variant>("marquee");

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("logos");
    if (VARIANTS.includes(v as Variant)) {
      setVariant(v as Variant);
    }
  }, []);

  if (variant === "grid") {
    return <LogoGrid items={logos} />;
  }
  if (variant === "rows") {
    return <LogoRows />;
  }
  if (variant === "cycle") {
    return <LogoCycle />;
  }
  return <LogoMarquee />;
}

/* ------------------------------------------------------------------ */

function LogoLink({
  item,
  className,
  hidden,
  children,
}: {
  item: LogoItem;
  className?: string;
  hidden?: boolean;
  children: ReactNode;
}) {
  if (!item.slug) {
    return <div className={className}>{children}</div>;
  }
  return (
    <Link
      href={`/customers/${item.slug}`}
      aria-label={item.name}
      tabIndex={hidden ? -1 : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}

function LogoCard({ item, className }: { item: LogoItem; className?: string }) {
  const { Logo, slug, h = 24 } = item;
  return (
    <div
      className={cx(
        "group flex h-[72px] w-full items-center justify-center px-4",
        "rounded-2xl bg-bg-mute transition-colors md:rounded-4xl dark:bg-bg-mute",
        slug &&
          "transition-all hover:text-primary hover:shadow-sm dark:hover:bg-white",
        className,
      )}
    >
      <Logo
        role="img"
        aria-label={item.name}
        style={{ height: h }}
        className="w-auto max-w-full"
      />
    </div>
  );
}

/* 1. Grid: the current static wall, rows of 2/4/6, centered last row */

function LogoGrid({
  items,
  className,
}: {
  items: LogoItem[];
  className?: string;
}) {
  return (
    <div
      className={cx(
        "mx-auto mt-16 flex max-w-[1080px] flex-wrap justify-center gap-2 md:mt-24 md:gap-3",
        className,
      )}
    >
      {items.map((item) => (
        <LogoLink
          key={item.name}
          item={item}
          className="w-[calc((100%-8px)/2)] sm:w-[calc((100%-24px)/4)] md:w-[calc((100%-36px)/4)] xl:w-[calc((100%-60px)/6)]"
        >
          <LogoCard item={item} />
        </LogoLink>
      ))}
    </div>
  );
}

/* Shared infinite track: two copies, translate -50%, edge fade, pause on hover */

function MarqueeTrack({
  items,
  duration,
  reverse,
  gapClass,
  renderItem,
}: {
  items: LogoItem[];
  duration: number;
  reverse?: boolean;
  gapClass: string;
  renderItem: (item: LogoItem, hidden: boolean) => ReactNode;
}) {
  return (
    <div
      className={cx(
        "group/marquee overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        "motion-reduce:[mask-image:none]",
      )}
    >
      <div
        className={cx(
          "flex w-max",
          "animate-[marquee_var(--marquee-duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          "group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]",
          "motion-reduce:w-auto motion-reduce:animate-none",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[false, true].map((hidden) => (
          <div
            key={String(hidden)}
            aria-hidden={hidden || undefined}
            className={cx(
              "flex shrink-0 items-center",
              gapClass,
              hidden && "motion-reduce:hidden",
              !hidden &&
                "motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center",
            )}
          >
            {items.map((item) => (
              <div key={item.name} className="shrink-0">
                {renderItem(item, hidden)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Marquee: one row of bare logos, like context7.com */

function LogoMarquee() {
  return (
    <div className="mt-16 md:mt-24">
      <MarqueeTrack
        items={logos}
        duration={70}
        gapClass="gap-x-12 gap-y-6 pr-12 md:gap-x-16 md:pr-16"
        renderItem={(item, hidden) => (
          <LogoLink
            item={item}
            hidden={hidden}
            className={cx(
              "flex h-12 items-center text-text-mute transition-colors dark:text-text",
              item.slug && "hover:text-primary dark:hover:text-white",
            )}
          >
            <item.Logo
              role="img"
              aria-label={item.name}
              style={{ height: item.h ?? 24 }}
              className="w-auto"
            />
          </LogoLink>
        )}
      />
    </div>
  );
}

/* 3. Rows: two rows of cards sliding in opposite directions */

function LogoRows() {
  // Alternate so both rows open with a well-known name.
  const top = logos.filter((_, i) => i % 2 === 0);
  const bottom = logos.filter((_, i) => i % 2 === 1);
  return (
    <>
      {/* Reduced motion: one static grid in priority order. */}
      <LogoGrid items={logos} className="hidden motion-reduce:flex" />
      <div className="mt-16 flex flex-col gap-2 motion-reduce:hidden md:mt-24 md:gap-3">
        {[top, bottom].map((row) => (
          <MarqueeTrack
            key={row === top ? "top" : "bottom"}
            items={row}
            duration={55}
            reverse={row === bottom}
            gapClass="gap-2 pr-2 md:gap-3 md:pr-3"
            renderItem={(item, hidden) => (
              <LogoLink
                item={item}
                hidden={hidden}
                className="block w-[160px] md:w-[180px]"
              >
                <LogoCard item={item} />
              </LogoLink>
            )}
          />
        ))}
      </div>
    </>
  );
}

/* 4. Cycle: a fixed 6x2 grid whose cells swap logos one at a time */

const CYCLE_SLOTS = 12;
const CYCLE_MS = 1800;
// Fixed shuffle so swaps hop around the grid instead of sweeping left to right.
const SLOT_ORDER = [4, 9, 1, 7, 11, 2, 6, 0, 10, 3, 8, 5];

function LogoCycle() {
  const [shown, setShown] = useState(() => logos.slice(0, CYCLE_SLOTS));
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced) {
      return;
    }
    let tick = 0;
    let queue = logos.slice(CYCLE_SLOTS);
    const id = setInterval(() => {
      setShown((prev) => {
        // Only swap slots the current breakpoint shows (6 / 8 / 12 cells).
        const visible = window.matchMedia("(min-width: 1280px)").matches
          ? CYCLE_SLOTS
          : window.matchMedia("(min-width: 768px)").matches
            ? 8
            : 6;
        const order = SLOT_ORDER.filter((s) => s < visible);
        const slot = order[tick++ % order.length];
        const [incoming, ...rest] = queue;
        queue = [...rest, prev[slot]];
        const next = [...prev];
        next[slot] = incoming;
        return next;
      });
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, reduced]);

  if (reduced) {
    return <LogoGrid items={logos} />;
  }

  return (
    <div
      className="mx-auto mt-16 grid max-w-[1080px] grid-cols-2 gap-2 md:mt-24 md:grid-cols-4 md:gap-3 xl:grid-cols-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {shown.map((item, i) => (
        <LogoLink
          // Keyed by slot so a swap remounts only the card inside.
          // biome-ignore lint/suspicious/noArrayIndexKey: slots are fixed positions
          key={i}
          item={item}
          className={cx(
            i >= 6 && "hidden md:block",
            i >= 8 && "md:hidden xl:block",
          )}
        >
          <LogoCard
            key={item.name}
            item={item}
            className="[&>svg]:animate-logo-in"
          />
        </LogoLink>
      ))}
    </div>
  );
}
