"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import Image from "next/image";

import cx from "@/utils/cx";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { MDXContent } from "@content-collections/mdx/react";
import Balancer from "react-wrap-balancer";

import ExpandableCode from "./expandable-code";
import PostNote from "./note";

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

function Highlight(props: {
  children: string;
  photo: string;
  name: string;
  title: string;
}) {
  return (
    <FullWidth>
      <div
        className="group/highlight grid place-items-center gap-6 rounded-4xl
        border-4 border-white/5 p-10 text-center md:px-20 md:py-16"
      >
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
          className="bg-gradient-to-br from-white to-[#6DBEA6] bg-clip-text
          text-xl font-medium text-transparent"
        >
          <Balancer>{props.children}</Balancer>
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
  Note: PostNote,
  ExpandableCode,
  pre: CopyFeaturePre,
};
