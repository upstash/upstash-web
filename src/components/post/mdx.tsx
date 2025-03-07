"use client";

import PostTOC from "@/components/post/toc";
import cx from "@/utils/cx";
import { MDXContent } from "@content-collections/mdx/react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import Image from "next/image";
import { ComponentProps, useEffect, useRef, useState } from "react";
import ExpandableCode from "./expandable-code";
import PostNote from "./note";
import { MuxVideoPlayer } from "./mux-video-player";

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  return (
    <div className="post leading-p">
      <MDXContent code={code} components={{ ...components }} />
    </div>
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
      className="relative"
    >
      <button
        onClick={() => {
          const content =
            containerRef.current?.querySelector("pre")?.textContent;
          navigator.clipboard.writeText(content || "");
          setHasCopied(true);
        }}
        className={cx(
          "absolute right-5 top-5",
          "flex items-center justify-center p-2",
          "cursor-pointer rounded-md bg-white/5",
          hasCopied ? "text-primary" : "text-white/60",
        )}
      >
        {hasCopied ? (
          <IconCheck size={16} stroke={2} />
        ) : (
          <IconCopy size={16} stroke={2} />
        )}
      </button>
      <pre {...props} className="" />
    </div>
  );
}

function table(props: ComponentProps<"table">) {
  return (
    <div className="overflow-auto">
      <table className="max-w-fit" {...props} />
    </div>
  );
}

function img(props: ComponentProps<"img">) {
  return <img className="mx-auto block rounded-xl" alt="" {...props} />;
}

function FullWidth(props: ComponentProps<"div">) {
  return <div className="lg:-mx-40" {...props} />;
}

function Highlight(props: {
  children: string;
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

        <p
          className={cx(
            "text-xl font-medium",
            "bg-gradient-to-br bg-clip-text text-transparent",
            "from-primary-text to-text",
            "dark:from-white dark:to-emerald-300",
          )}
        >
          {props.children}
        </p>

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

const components = {
  table,
  img,
  FullWidth,
  Highlight,
  nav: PostTOC,
  Note: PostNote,
  ExpandableCode,
  pre: CopyFeaturePre,
  Video: MuxVideoPlayer
};
