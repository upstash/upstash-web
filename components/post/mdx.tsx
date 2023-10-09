"use client";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons-react";
import cx from "@/utils/cx";
import ExpandableCode from "./expandable-code";
import PostNote from "./note";
import Image from "next/image";

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
    }, 2000);
  }, [hasCopied]);
  if (props && !props["data-language"]) {
    return <pre {...props} />;
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => {
          const content =
            containerRef.current?.querySelector("pre")?.textContent;
          navigator.clipboard.writeText(content || "");
          setHasCopied(true);
        }}
        className={cx(
          "absolute right-5 top-5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border p-1 transition ease-in-out hover:border-white/60 hover:text-white/60",
          !hasCopied
            ? "border-white/20 text-white/20"
            : "border-white/60 text-white/60",
        )}
      >
        {hasCopied ? (
          <IconClipboardCheck stroke={1} />
        ) : (
          <IconClipboard stroke={1} />
        )}
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
        className="group/highlight text-center grid place-items-center gap-6
                  border-4 rounded-4xl border-white/5 p-10 md:py-16 md:px-20"
      >
        <Image
          src={`/customer/${props.photo}`}
          alt={props.name}
          width={60}
          height={60}
          className="rounded-full"
        />

        <p
          className="text-xl
                    bg-clip-text text-transparent
                    bg-gradient-to-br from-white to-[#6DBEA6]"
        >
          {props.children}
        </p>

        <div className="">
          <h5 className="opacity-80">{props.name}</h5>
          <h6 className="opacity-40">{props.title}</h6>
        </div>
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
