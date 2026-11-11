import type { ComponentType, ReactNode } from "react";

/** The product's main console action, e.g. "Create Database" or "Get Started". */
export interface ProductAction {
  href: string;
  label: string;
  icon: ReactNode;
}

export interface SectionHeroProps {
  icon: ComponentType<{ className?: string }>;
  /** The heading lines, usually two `<span className="block">` elements. */
  title: ReactNode;
  description: ReactNode;
  /** Tailwind `to-*` class that ends the heading gradient. */
  gradient: string;
  /** Extra heading classes, e.g. `pb-[0.15em]` to keep descenders unclipped. */
  titleClassName?: string;
  primaryAction: ProductAction;
  docsHref: string;
  pricingHref: string;
}

export interface SectionFeaturesProps {
  title: ReactNode;
  description: ReactNode;
  items: { icon: ReactNode; title: string; desc: string }[];
}

export interface SectionUseCasesProps {
  title: ReactNode;
  description: ReactNode;
  items: { title: string; desc: string; href: string }[];
}

export interface SectionWhatIsProps {
  title: ReactNode;
  description: ReactNode;
  /** The body paragraphs. */
  children: ReactNode;
}

export interface SectionCtaProps {
  title: ReactNode;
  description: ReactNode;
  /** Tailwind `to-*` class that ends the heading gradient. */
  gradient: string;
  /** Extra heading classes, e.g. `pb-[0.15em]` to keep descenders unclipped. */
  titleClassName?: string;
  primaryAction: ProductAction;
  pricingHref: string;
}
