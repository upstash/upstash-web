"use client";

import { useSectionView } from "@/hooks/use-section-view";

/**
 * Invisible marker that tracks viewport dwell time of its parent element.
 * Mount as a direct child of the section root you want to measure.
 */
export default function SectionViewTracker({ section }: { section: string }) {
  const setElement = useSectionView(section);

  return (
    <span
      aria-hidden
      className="hidden"
      ref={(node) => setElement(node ? node.parentElement : null)}
    />
  );
}
