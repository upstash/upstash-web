"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";

import cx from "@/utils/cx";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useMDXComponent } from "next-contentlayer/hooks";

import ExpandableCode from "./expandable-code";
import PostNote from "./note";

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="post leading-p">
      <Component components={{ ...components }} />
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
  if (props && !props["data-language"]) {
    return <pre {...props} />;
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
          "flex items-center justify-center p-1",
          "cursor-pointer rounded-md",
          "",
          hasCopied
            ? "text-emerald-600"
            : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-200",
        )}
      >
        {hasCopied ? <IconCheck stroke={1.5} /> : <IconCopy stroke={1.5} />}
      </button>
      <pre {...props} />
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

const components = {
  table,
  img,
  FullWidth,
  Note: PostNote,
  ExpandableCode,
  pre: CopyFeaturePre,
};
