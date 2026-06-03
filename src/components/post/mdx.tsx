"use client";

import cx from "@/utils/cx";
import { MDXContent } from "@content-collections/mdx/react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import Image from "next/image";
import { ComponentProps, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ExpandableCode from "./expandable-code";
import PostNote from "./note";
import PostSummary from "./summary";
import { MuxVideoPlayer } from "./mux-video-player";
import { Frame } from "./frame";

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomedImage, setZoomedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll<HTMLImageElement>(
      ".post > img, .post > p > img",
    );
    images.forEach((img) => {
      if (img.dataset.zoomable === "") return;
      img.dataset.zoomable = "";

      const alt = img.alt?.trim();
      if (
        alt &&
        !img.nextElementSibling?.hasAttribute?.("data-image-caption")
      ) {
        const caption = document.createElement("span");
        caption.setAttribute("data-image-caption", "");
        caption.textContent = alt;
        img.parentElement?.insertBefore(caption, img.nextSibling);
      }
    });
  }, [code]);

  useEffect(() => {
    if (!zoomedImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setZoomedImage(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [zoomedImage]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const image = (event.target as Element).closest<HTMLImageElement>(
      "img[data-zoomable]",
    );
    if (!image || !event.currentTarget.contains(image)) return;

    setZoomedImage({
      src:
        image.getAttribute("data-zoom-src") ||
        image.getAttribute("src") ||
        image.currentSrc ||
        image.src,
      alt: image.alt,
    });
  }

  return (
    <>
      <div ref={containerRef} className="post leading-p" onClick={handleClick}>
        <MDXContent code={code} components={{ ...components }} />
      </div>
      {zoomedImage &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={zoomedImage.alt || "Expanded image"}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-zinc-950/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setZoomedImage(null)}
          >
            <button
              type="button"
              aria-label="Close expanded image"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setZoomedImage(null)}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-h-[92vh] max-w-[96vw] rounded-lg object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  );
}

function CloseIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}

function CopyFeaturePre(props: ComponentProps<"pre">) {
  const [hasCopied, setHasCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 3000);
  }, [hasCopied]);
  if (props && !props["data-language" as keyof typeof props]) {
    return <pre {...props} className="" />;
  }

  return (
    <div
      {...(props as ComponentProps<"div">)}
      ref={containerRef}
      className="group/code relative"
    >
      <button
        onClick={() => {
          const content =
            containerRef.current?.querySelector("pre")?.textContent;
          navigator.clipboard.writeText(content || "");
          setHasCopied(true);
        }}
        className={cx(
          "absolute right-3 top-3 z-10",
          "flex items-center justify-center rounded-md p-1.5",
          "cursor-pointer bg-white/[0.06]",
          "opacity-0 transition group-hover/code:opacity-100",
          "hover:bg-white/[0.12]",
          hasCopied ? "text-primary opacity-100" : "text-text-mute",
        )}
        aria-label="Copy code"
      >
        {hasCopied ? (
          <IconCheck size={14} stroke={2} />
        ) : (
          <IconCopy size={14} stroke={2} />
        )}
      </button>
      <pre {...props} className="" />
    </div>
  );
}

function table(props: ComponentProps<"table">) {
  return (
    <div className="-mx-5 overflow-x-auto rounded-2xl bg-emerald-900/5 md:-mx-6 dark:bg-white/[0.04]">
      <table className="w-full border-collapse" {...props} />
    </div>
  );
}

function img({ src, alt, width, height, className, ...rest }: ComponentProps<"img">) {
  const classes = cx(
    "-mx-5 block h-auto w-[calc(100%_+_2.5rem)] max-w-none rounded-xl md:-mx-6 md:w-[calc(100%_+_3rem)]",
    className,
  );

  const w = Number(width);
  const h = Number(height);

  // next/image needs intrinsic dimensions; the remark-image-dimensions plugin
  // injects them at build time. Without them (e.g. gif/svg), fall back to <img>.
  if (typeof src === "string" && w > 0 && h > 0) {
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={w}
        height={h}
        sizes="(max-width: 768px) 100vw, 768px"
        className={classes}
        data-zoom-src={src}
      />
    );
  }

  return <img {...rest} src={src} alt={alt || ""} className={classes} />;
}

function FullWidth(props: ComponentProps<"div">) {
  return <div className="lg:-mx-40" {...props} />;
}

function Highlight(props: {
  children: ReactNode;
  photo: string;
  name: string;
  title: string;
}) {
  return (
    <FullWidth>
      <div className="group grid place-items-center gap-6 rounded-4xl border-4 border-bg-mute p-10 text-center md:px-20 md:py-16">
        {props.photo && (
          <Image
            src={`/customer/${props.photo}`}
            alt={props.name}
            width={60}
            height={60}
            className="rounded-full"
          />
        )}

        <div
          className={cx(
            "text-xl font-medium",
            "bg-gradient-to-br bg-clip-text text-transparent",
            "from-primary-text to-text",
            "dark:from-white dark:to-emerald-300",
            "[&_p]:m-0",
          )}
        >
          {props.children}
        </div>

        {(props.name || props.title) && (
          <div className="">
            {props.name && <span className="opacity-80">{props.name}</span>}
            {props.title && <span className="opacity-40">, {props.title}</span>}
          </div>
        )}
      </div>
    </FullWidth>
  );
}

function NavOrNull(props: ComponentProps<"nav">) {
  if (props.className?.includes("toc")) return null;
  return <nav {...props} />;
}

const components = {
  table,
  img,
  FullWidth,
  Highlight,
  nav: NavOrNull,
  Note: PostNote,
  Summary: PostSummary,
  ExpandableCode,
  pre: CopyFeaturePre,
  Video: MuxVideoPlayer,
  Frame,
};
