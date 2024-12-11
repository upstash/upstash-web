import cx from "@/utils/cx";
import React from "react";

export function HeroTabFeatureCont({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      className={cx(
        "flex flex-col gap-4 rounded-2xl p-8 text-left",
        // "bg-red-900/10",
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
        "font-display text-2xl font-semibold",
        // "text-red-700",
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
      className={cx("flex items-start gap-2 py-1 font-medium", className)}
      {...props}
    />
  );
}
