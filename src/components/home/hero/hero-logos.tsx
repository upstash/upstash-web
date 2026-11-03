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
import type { ComponentType, ReactNode, SVGProps } from "react";

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

// Two rows of cards sliding in opposite directions. Reduced motion shows one
// static grid in priority order instead.
export default function HeroLogos() {
  // Alternate so both rows open with a well-known name.
  const rows = [0, 1].map((r) => logos.filter((_, i) => i % 2 === r));
  return (
    <>
      <LogoGrid items={logos} className="hidden motion-reduce:flex" />
      <div className="mt-16 flex flex-col gap-2 motion-reduce:hidden md:mt-24 md:gap-3">
        {rows.map((row, r) => (
          <MarqueeTrack key={r} items={row} reverse={r === 1} />
        ))}
      </div>
    </>
  );
}

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

function LogoCard({ item }: { item: LogoItem }) {
  const { Logo, slug, h = 24 } = item;
  return (
    <div
      className={cx(
        "flex h-[72px] w-full items-center justify-center px-4",
        "rounded-2xl bg-bg-mute transition-colors md:rounded-4xl dark:bg-bg-mute",
        slug &&
          "transition-all hover:text-primary hover:shadow-sm dark:hover:bg-white",
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

// Static wall: rows of 2/4/6, last row centered.
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

// Seconds per logo, so rows of different lengths move at the same speed.
const SECONDS_PER_LOGO = 4.2;

// Infinite track: two copies translated -50%, edge fade, pause on mouse hover.
function MarqueeTrack({
  items,
  reverse,
}: {
  items: LogoItem[];
  reverse?: boolean;
}) {
  return (
    <div
      onFocus={(e) => {
        // Keyboard focus stops the track (see :has below); bring the link out
        // of the edge fade. Mouse focus must not scroll, or the click misses.
        const target = e.target;
        if (target.matches(":focus-visible")) {
          requestAnimationFrame(() =>
            target.scrollIntoView({ inline: "center", block: "nearest" }),
          );
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          e.currentTarget.scrollLeft = 0;
        }
      }}
      className={cx(
        // py-1 leaves room for the focus ring inside the clipped box.
        "group/marquee overflow-hidden py-1",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
      )}
    >
      <div
        className={cx(
          "flex w-max",
          "animate-[marquee_var(--marquee-duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          "[@media(hover:hover)]:group-hover/marquee:[animation-play-state:paused]",
          // Keyboard focus: stop at the start so the browser can scroll the
          // focused link into view instead of it sitting off screen.
          "[&:has(:focus-visible)]:animate-none",
        )}
        style={
          {
            "--marquee-duration": `${items.length * SECONDS_PER_LOGO}s`,
          } as React.CSSProperties
        }
      >
        {[false, true].map((hidden) => (
          <div
            key={String(hidden)}
            aria-hidden={hidden || undefined}
            className="flex shrink-0 items-center gap-2 pr-2 md:gap-3 md:pr-3"
          >
            {items.map((item) => (
              <LogoLink
                key={item.name}
                item={item}
                hidden={hidden}
                className="block w-[160px] shrink-0 md:w-[180px]"
              >
                <LogoCard item={item} />
              </LogoLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
