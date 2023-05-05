import { ComponentProps } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
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

// Components

function a(props: ComponentProps<"a">) {
  return <a className="text-emerald-300 hover:underline" {...props} />;
}

function table(props: ComponentProps<"table">) {
  return (
    <div className="overflow-auto">
      <table className="max-w-fit" {...props} />
    </div>
  );
}

function tr(props: ComponentProps<"tr">) {
  return <tr className="border-t" {...props} />;
}

function td(props: ComponentProps<"td">) {
  return <td className="border px-2 py-2" {...props} />;
}

function th(props: ComponentProps<"td">) {
  return (
    <th
      className="whitespace-nowrap border px-2 py-2 font-semibold"
      {...props}
    />
  );
}

function strong(props: ComponentProps<"strong">) {
  return <strong className="font-semibold" {...props} />;
}

function hr(props: ComponentProps<"hr">) {
  return <hr className="my-10 border-b border-zinc-900 md:my-20" />;
}

function ul(props: ComponentProps<"ul">) {
  return (
    <ul
      className="list-inside list-disc space-y-2 marker:text-zinc-400"
      {...props}
    />
  );
}

function ol(props: ComponentProps<"ol">) {
  return (
    <ol
      className="list-inside list-decimal space-y-2 marker:text-zinc-400"
      {...props}
    />
  );
}

function blockquote(props: ComponentProps<"blockquote">) {
  return <blockquote className="bg-red-200 p-4" {...props} />;
}

function h2(props: ComponentProps<"h2">) {
  return (
    <h2
      className="font-display text-2xl font-semibold md:mt-16 md:text-4xl"
      {...props}
    />
  );
}

function h3(props: ComponentProps<"h3">) {
  return (
    <h3 className="font-display text-xl font-semibold md:text-2xl" {...props} />
  );
}

function h4(props: ComponentProps<"h4">) {
  return (
    <h4 className="font-display text-lg font-semibold md:text-xl" {...props} />
  );
}

function img(props: ComponentProps<"img">) {
  return <img className="mx-auto block rounded-xl" alt="" {...props} />;
}

function FullWidth(props: ComponentProps<"div">) {
  return <div className="lg:-mx-40" {...props} />;
}

const components = {
  strong,
  b: strong,
  a,
  table,
  tr,
  td,
  th,
  hr,
  ul,
  ol,
  blockquote,
  h2,
  h3,
  img,
  h4,
  FullWidth,
  Note: PostNote,
};
