"use client";

import cx from "@/utils/cx";
import {
  ComponentProps,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

export default function PostTOC({ children, ...props }: ComponentProps<"nav">) {
  const ref = useRef<HTMLDetailsElement>(null);

  // open by default on desktop (sticky sidebar), collapsed on mobile
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  // sticky offset measured from the fixed header (grows when the policy
  // banner is visible, so the TOC never tucks under the header)
  const [stickyTop, setStickyTop] = useState(96);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setOpen(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // keep the sticky offset in sync with the actual fixed-header height.
  // a ResizeObserver on the header reacts to the policy banner appearing or
  // being dismissed (which changes the header height) without relying on
  // store-state timing.
  useEffect(() => {
    const measure = () => {
      // only the site's fixed/sticky nav matters — ignore the blog's
      // <header> hero and other in-flow headers
      const nav = Array.from(document.querySelectorAll("header")).find((h) => {
        const pos = getComputedStyle(h).position;
        return (
          h.getBoundingClientRect().height > 0 &&
          (pos === "fixed" || pos === "sticky")
        );
      });
      const bottom = nav ? nav.getBoundingClientRect().bottom : 80;
      setStickyTop(bottom + 16);
      // expose the header height so heading anchors don't land beneath it
      document.documentElement.style.setProperty(
        "--header-offset",
        `${bottom}px`,
      );
    };

    const ro = new ResizeObserver(measure);
    document.querySelectorAll("header").forEach((h) => ro.observe(h));
    measure();
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // scroll-spy: highlight the heading currently in view
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(".post :is(h2, h3)"),
    ).filter((h) => h.id);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  // reflect the active heading onto the matching TOC link
  useEffect(() => {
    ref.current?.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const id = href.startsWith("#") ? decodeURIComponent(href.slice(1)) : "";
      a.toggleAttribute("data-active", Boolean(id) && id === activeId);
    });
  }, [activeId]);

  // if there are no children, don't render the TOC
  if (!children) return null;

  // if there is ‘toc’ contains the classNames
  const { className } = props;
  if (!className?.includes("toc")) {
    return <nav children={children} {...props} />;
  }

  return (
    <details
      ref={ref}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      style={
        {
          top: stickyTop,
          "--toc-top": `${stickyTop + 32}px`,
        } as CSSProperties
      }
      className={cx(
        "toc group/toc mb-10 rounded-xl bg-emerald-700/10 dark:bg-white/3",
        // desktop: sticky sidebar tucked into the right gutter
        "xl:sticky xl:float-right xl:-mr-64 xl:mb-0 xl:w-48",
        "xl:max-h-[calc(100vh-var(--toc-top,9rem))] xl:overflow-y-auto",
        "xl:rounded-none xl:bg-transparent xl:dark:bg-transparent",
      )}
      role="navigation"
      aria-label="Table of contents"
    >
      {/* summary */}
      <summary
        className={cx(
          "flex items-center px-6 py-3",
          "select-none list-none text-sm uppercase tracking-wide opacity-60",
          "xl:pointer-events-none xl:px-0 xl:pb-3 xl:pt-0",
        )}
      >
        On this page
      </summary>

      {/* content */}
      <div className="p-6 pt-0 xl:p-0">{children}</div>
    </details>
  );
}

export function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      className={cx(
        "shrink-0 rotate-90 transition group-open/toc:-rotate-90",
        className,
      )}
      width={24}
      viewBox="0 0 24 24"
      role="img"
      aria-label="arrow-right"
      fill="currentColor"
    >
      <path d="M10 17l5-5-5-5v10z"></path>
    </svg>
  );
}
