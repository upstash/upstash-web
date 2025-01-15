import cx from "@/utils/cx";
import React from "react";

export function HeroTabFeatureCont({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      className={cx(
        "flex flex-col gap-4 rounded-2xl p-6 text-left sm:h-full sm:p-8",
        "bg-bg-mute",
        className,
      )}
      {...props}
    />
  );
}

export function HeroTabFeatureTitle({
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
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
