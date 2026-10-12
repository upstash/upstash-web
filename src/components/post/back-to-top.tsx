"use client";

import Button from "@/components/button";
import { IconArrowUp } from "@tabler/icons-react";

export default function BackToTop() {
  return (
    <div className="mb-10 flex justify-center">
      <Button
        className="min-h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        onClick={() => {
          document.getElementById("blog-top")?.focus({ preventScroll: true });
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
        }}
      >
        <IconArrowUp size={18} aria-hidden="true" />
        Back to top
      </Button>
    </div>
  );
}
