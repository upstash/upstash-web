import type { ProductFeatureGroup } from "@/components/home/product-new/product-features";
import cx from "@/utils/cx";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import React from "react";

const BULLET_ICONS = [IconCircle1, IconCircle2, IconCircle3];

/**
 * Renders a product's feature groups from the shared PRODUCT_FEATURES data.
 * Used by every hero-tab-*.tsx so the visible tab and the sr-only crawlable
 * mirror (product-seo-data.tsx) stay in sync from one source of truth.
 */
export function HeroTabFeatures({ groups }: { groups: ProductFeatureGroup[] }) {
  return (
    <>
      {groups.map((group, groupIndex) => (
        <HeroTabFeatureCont key={groupIndex}>
          <HeroTabFeatureTitle>
            {group.title.map((line, lineIndex) =>
              lineIndex === 0 ? (
                <React.Fragment key={lineIndex}>{line} </React.Fragment>
              ) : (
                <React.Fragment key={lineIndex}>
                  <br className="hidden sm:block" /> {line}
                </React.Fragment>
              ),
            )}
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            {group.bullets.map((bullet, bulletIndex) => {
              const Icon = BULLET_ICONS[bulletIndex] ?? IconCircle3;
              return (
                <HeroTabFeatureLi key={bulletIndex}>
                  <HeroTabFeatureBullet>
                    <Icon stroke={1.5} />
                  </HeroTabFeatureBullet>
                  {bullet}
                </HeroTabFeatureLi>
              );
            })}
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>
      ))}
    </>
  );
}

export function HeroTabFeatureCont({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      className={cx(
        "flex flex-col gap-4 rounded-2xl p-6 text-left sm:h-full sm:p-8",
        "bg-bg-mute dark:bg-bg",
        className,
      )}
      {...props}
    />
  );
}

export function HeroTabFeatureTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cx(
        "font-display text-lg font-semibold leading-tight sm:text-2xl",
        className,
      )}
      {...props}
    />
  );
}

export function HeroTabFeatureUl({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return <ul className={cx("", className)} {...props} />;
}

export function HeroTabFeatureLi({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      className={cx("flex items-start gap-2 py-px sm:py-1", className)}
      {...props}
    />
  );
}

export function HeroTabFeatureBullet({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return <span className={cx("shrink-0 text-primary", className)} {...props} />;
}
