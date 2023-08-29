"use client";
import { ComponentProps, useRef } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { IconClipboard } from "@tabler/icons-react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  
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
        }}
        className="absolute right-5 top-5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-white/20 p-1 text-white/20 transition ease-in-out hover:border-white/60 hover:text-white/60"
      >
        <IconClipboard stroke={1} />
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

