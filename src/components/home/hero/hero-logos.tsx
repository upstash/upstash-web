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
  useMemo,
  useRef,
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

const VARIANTS = [
  "grid",
  "marquee",
  "rows",
  "cycle",
  "roll",
  "wall",
  "tabs",
  "spotlight",
] as const;
type Variant = (typeof VARIANTS)[number];

// Preview only: `?logos=<variant>` picks a layout to compare.
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
  if (variant === "roll") {
    return <LogoRoll />;
  }
  if (variant === "wall") {
    return <LogoWall />;
  }
  if (variant === "tabs") {
    return <LogoTabs />;
  }
  if (variant === "spotlight") {
    return <LogoSpotlight />;
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
  secondsPerLogo,
  reverse,
  gapClass,
  renderItem,
}: {
  items: LogoItem[];
  // Speed scales with length, so rows of different sizes move alike.
  secondsPerLogo: number;
  reverse?: boolean;
  gapClass: string;
  renderItem: (item: LogoItem, hidden: boolean) => ReactNode;
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
        "motion-reduce:[mask-image:none]",
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
          "motion-reduce:w-auto motion-reduce:animate-none",
        )}
        style={
          {
            "--marquee-duration": `${items.length * secondsPerLogo}s`,
          } as React.CSSProperties
        }
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
        secondsPerLogo={2.8}
        gapClass="gap-x-10 gap-y-4 motion-safe:pr-10 md:gap-x-16 md:gap-y-6 md:motion-safe:pr-16"
        renderItem={(item, hidden) => (
          <LogoLink
            item={item}
            hidden={hidden}
            className={cx(
              // Clay is a bitmap that ignores currentColor; mute it to match.
              "flex h-12 items-center text-text-mute transition-colors dark:text-text [&_img]:opacity-60",
              item.slug && "hover:text-primary",
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
            secondsPerLogo={4.2}
            reverse={row === bottom}
            gapClass="gap-2 motion-safe:pr-2 md:gap-3 md:motion-safe:pr-3"
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

// Cells the current breakpoint shows: 2x3, 4x2 or 6x2.
function visibleSlots() {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    return CYCLE_SLOTS;
  }
  return window.matchMedia("(min-width: 768px)").matches ? 8 : 6;
}

function LogoCycle() {
  // A permutation of all logos: the first `visible` fill the shown cells, the
  // rest wait in line. A swap puts the next in line into a cell and sends the
  // outgoing logo to the back, so every logo comes round at every breakpoint.
  const [order, setOrder] = useState(logos);
  const [paused, pauseHandlers] = usePause();
  const tick = useRef(0);

  useEffect(() => {
    if (
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      const visible = visibleSlots();
      const slots = SLOT_ORDER.filter((s) => s < visible);
      const slot = slots[tick.current++ % slots.length];
      setOrder((prev) => {
        const next = [...prev];
        next[slot] = prev[visible];
        next.splice(visible, 1);
        next.push(prev[slot]);
        return next;
      });
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <>
      {/* Reduced motion: one static grid in priority order. */}
      <LogoGrid items={logos} className="hidden motion-reduce:flex" />
      <div
        className="mx-auto mt-16 grid max-w-[1080px] grid-cols-2 gap-2 motion-reduce:hidden md:mt-24 md:grid-cols-4 md:gap-3 xl:grid-cols-6"
        {...pauseHandlers}
      >
        {order.slice(0, CYCLE_SLOTS).map((item, i) => (
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
              className="[&>*]:animate-logo-in"
            />
          </LogoLink>
        ))}
      </div>
    </>
  );
}

/* Shared: pause on mouse hover or keyboard focus, never on touch or mouse focus.
   Hover and focus are tracked apart so leaving one does not resume under the other. */

function usePause() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const handlers = {
    // Mouse only: a tap fires pointerenter with no matching pointerleave.
    onPointerEnter: (e: React.PointerEvent) =>
      setHovered(e.pointerType === "mouse"),
    onPointerLeave: () => setHovered(false),
    onFocus: (e: React.FocusEvent) =>
      setFocused((e.target as Element).matches(":focus-visible")),
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setFocused(false);
      }
    },
  };
  return [hovered || focused, handlers] as const;
}

/* 5. Roll: a row of cells that each roll up to their next logo, in a wave (clerk.com) */

const ROLL_MS = 2600;
const ROLL_ROW = "h-16";

function LogoRoll() {
  // One row, sized to the viewport: 2 / 4 / 6 cells. Remounting on change
  // restarts the roll from the top names.
  const [cols, setCols] = useState(6);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setCols(lg.matches ? 6 : sm.matches ? 4 : 2);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return (
    <>
      {/* Reduced motion: one static grid in priority order. */}
      <LogoGrid items={logos} className="hidden motion-reduce:flex" />
      <div className="mt-16 motion-reduce:hidden md:mt-24">
        <RollRow key={cols} cols={cols} />
      </div>
    </>
  );
}

function RollRow({ cols }: { cols: number }) {
  // Deal logos into columns so the first row shows the best-known names.
  const columns = useMemo(
    () =>
      Array.from({ length: cols }, (_, c) =>
        logos.filter((_, i) => i % cols === c),
      ),
    [cols],
  );
  // One counter drives every column: column c shows col[tick % length] and
  // rolls the previous logo out. Keys change each tick to replay the CSS
  // animations, so there is no position or wrap state to keep in sync.
  const [tick, setTick] = useState(0);
  const [paused, pauseHandlers] = usePause();

  useEffect(() => {
    if (
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => setTick((t) => t + 1), ROLL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="mx-auto grid max-w-[1080px] gap-4"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      {...pauseHandlers}
    >
      {columns.map((col, c) => {
        const item = col[tick % col.length];
        const prev = tick > 0 ? col[(tick - 1) % col.length] : null;
        // Staggered left to right; `both` holds each layer at its start
        // position during the delay.
        const delay = { animationDelay: `${c * 90}ms` };
        return (
          // overflow-clip, not hidden: a clipped box can't be scrolled by focus.
          <div
            key={col[0].name}
            className={cx(ROLL_ROW, "relative overflow-clip")}
          >
            {prev && (
              <div
                key={`out-${tick}`}
                aria-hidden
                className="pointer-events-none absolute inset-0 flex animate-roll-out items-center justify-center px-1"
                style={delay}
              >
                <RollLogo item={prev} hidden />
              </div>
            )}
            <div
              key={`in-${tick}`}
              className={cx(
                // Layers pass clicks through; only the logos themselves catch them,
                // so a logo half rolled out stays clickable under the next layer.
                "pointer-events-none absolute inset-0 flex items-center justify-center px-1",
                prev && "animate-roll-in",
              )}
              style={delay}
            >
              <RollLogo item={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RollLogo({ item, hidden }: { item: LogoItem; hidden?: boolean }) {
  return (
    <LogoLink
      item={item}
      hidden={hidden}
      className={cx(
        "pointer-events-auto flex max-w-full items-center text-text-mute transition-colors dark:text-text [&_img]:opacity-60",
        item.slug && "hover:text-primary",
      )}
    >
      <item.Logo
        role="img"
        aria-label={hidden ? undefined : item.name}
        style={{ height: item.h ?? 24 }}
        className="w-auto max-w-full"
      />
    </LogoLink>
  );
}

/* 6. Wall: every logo in a hairline grid, stories reveal a link (planetscale.com) */

function LogoWall() {
  return (
    <div className="mx-auto mt-16 grid max-w-[1080px] grid-cols-2 border-l border-t border-black/10 sm:grid-cols-3 md:mt-24 lg:grid-cols-5 dark:border-white/10">
      {logos.map((item) => (
        <LogoLink
          key={item.name}
          item={item}
          className={cx(
            "group/cell relative flex h-28 items-center justify-center border-b border-r border-black/10 px-6 dark:border-white/10",
            item.slug && "transition-colors hover:bg-bg-mute",
          )}
        >
          <item.Logo
            role="img"
            aria-label={item.name}
            style={{ height: Math.round((item.h ?? 24) * 1.15) }}
            className="w-auto max-w-full"
          />
          {item.slug && (
            <span className="absolute bottom-3 right-4 text-xs font-medium text-text-mute transition-opacity group-hover/cell:opacity-100 group-focus-visible/cell:opacity-100 [@media(hover:hover)]:opacity-0">
              Read story →
            </span>
          )}
        </LogoLink>
      ))}
      {/* Blank cells close the last row at 2, 3 and 5 columns. */}
      {Array.from({ length: 4 }, (_, i) => {
        const need = (cols: number) =>
          i < (cols - (logos.length % cols)) % cols;
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: blank filler cells
            key={i}
            aria-hidden
            className={cx(
              "border-b border-r border-black/10 dark:border-white/10",
              need(2) ? "block" : "hidden",
              need(3) ? "sm:block" : "sm:hidden",
              need(5) ? "lg:block" : "lg:hidden",
            )}
          />
        );
      })}
    </div>
  );
}

/* 7. Tabs: logos grouped by industry, one group at a time (tailscale.com, cloudflare.com) */

const TAB_GROUPS: { label: string; names: string[] }[] = [
  { label: "Featured", names: logos.slice(0, 12).map((l) => l.name) },
  {
    label: "AI",
    names: [
      "Midjourney",
      "Sierra",
      "Clay",
      "fal",
      "OpenRouter",
      "Paper",
      "Rork",
      "Nous Research",
      "Outtake",
      "Circleback",
      "Zo Computer",
    ],
  },
  {
    label: "Developer platforms",
    names: [
      "Vercel",
      "Supabase",
      "Zapier",
      "GitBook",
      "Fly.io",
      "Privy",
      "CodeRabbit",
      "OpenCode",
      "Composio",
    ],
  },
  {
    label: "Brands & fintech",
    names: ["Meta", "Coinbase", "Liverpool FC", "Polymarket", "Paul Smith"],
  },
];

function LogoTabs() {
  const [active, setActive] = useState(0);
  const group = TAB_GROUPS[active];
  const items = group.names
    .map((n) => logos.find((l) => l.name === n))
    .filter((l): l is LogoItem => Boolean(l));
  return (
    <div className="mt-16 md:mt-24">
      <div
        role="tablist"
        aria-label="Customers by industry"
        className="flex flex-wrap justify-center gap-2"
      >
        {TAB_GROUPS.map((g, i) => (
          <button
            key={g.label}
            type="button"
            role="tab"
            id={`logo-tab-${i}`}
            aria-selected={i === active}
            aria-controls="logo-tabpanel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
              if (step) {
                const next = (i + step + TAB_GROUPS.length) % TAB_GROUPS.length;
                setActive(next);
                document.getElementById(`logo-tab-${next}`)?.focus();
              }
            }}
            className={cx(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              i === active
                ? "bg-text text-bg dark:bg-white dark:text-black"
                : "bg-bg-mute text-text-mute hover:text-text",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="logo-tabpanel"
        aria-labelledby={`logo-tab-${active}`}
        // Focusable so Tab reaches a panel that has no story links (ARIA tabs pattern).
        // biome-ignore lint/a11y/noNoninteractiveTabindex: role="tabpanel" with no focusable content
        tabIndex={0}
        // Tallest group (12 logos) at each breakpoint, so switching tabs never
        // moves the content below.
        className="min-h-[472px] sm:min-h-[232px] md:min-h-[240px] xl:min-h-[156px]"
      >
        <LogoGrid
          key={group.label}
          items={items}
          className="!mt-6 md:!mt-8 [&>*]:animate-logo-in motion-reduce:[&>*]:animate-none"
        />
      </div>
    </div>
  );
}

/* 8. Spotlight: the marquee, with a dot on logos that have a story and a hover label (inngest.com) */

function LogoSpotlight() {
  return (
    <div className="mt-16 md:mt-24">
      <MarqueeTrack
        items={logos}
        secondsPerLogo={2.8}
        gapClass="gap-x-10 gap-y-4 motion-safe:pr-10 md:gap-x-16 md:gap-y-6 md:motion-safe:pr-16"
        renderItem={(item, hidden) => (
          <LogoLink
            item={item}
            hidden={hidden}
            className={cx(
              "group/logo relative flex h-20 items-center text-text-mute transition-colors dark:text-text [&_img]:opacity-60",
              item.slug && "hover:text-primary",
            )}
          >
            <item.Logo
              role="img"
              aria-label={item.name}
              style={{ height: item.h ?? 24 }}
              className="w-auto"
            />
            {item.slug && (
              <>
                <span
                  aria-hidden
                  className="absolute -right-2.5 top-5 size-1.5 rounded-full bg-primary"
                />
                <span className="absolute inset-x-0 bottom-0 whitespace-nowrap text-center text-xs font-medium text-primary opacity-0 transition-opacity group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100">
                  Read story →
                </span>
              </>
            )}
          </LogoLink>
        )}
      />
      <p className="mt-2 flex items-center justify-center gap-2 text-sm text-text-mute">
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
        Customer story
      </p>
    </div>
  );
}
