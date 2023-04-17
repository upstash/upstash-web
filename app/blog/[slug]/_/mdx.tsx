import { ComponentProps } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import PostNote from "./note";

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="post leading-relaxed">
      <Component components={{ ...components }} />
    </div>
  );
}

// Components

function a(props: ComponentProps<"a">) {
  return (
    <a
      className="text-emerald-400 underline decoration-emerald-800"
      {...props}
    />
  );
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
  return (
    <hr className="my-14 border-0 border-b border-black opacity-10 dark:border-white" />
  );
}

function ul(props: ComponentProps<"ul">) {
  return (
    <ul
      className="list-inside list-disc space-y-4 marker:text-zinc-400"
      {...props}
    />
  );
}

function ol(props: ComponentProps<"ol">) {
  return (
    <ol
      className="list-inside list-decimal space-y-4 marker:text-zinc-400"
      {...props}
    />
  );
}

function blockquote(props: ComponentProps<"blockquote">) {
  return <blockquote className="bg-red-200 p-4" {...props} />;
}

function h2(props: ComponentProps<"h2">) {
  return (
    <h2 className="mt-10 font-display text-4xl font-semibold" {...props} />
  );
}

function h3(props: ComponentProps<"h3">) {
  return <h3 className="font-display text-3xl font-semibold" {...props} />;
}

function h4(props: ComponentProps<"h4">) {
  return <h4 className="font-display text-xl font-semibold" {...props} />;
}

function code(props: ComponentProps<"code">) {
  return (
    <code
      className="whitespace-pre break-normal rounded bg-emerald-950 bg-opacity-50 p-0.5 text-[.92em] text-emerald-200"
      {...props}
    />
  );
}

function img(props: ComponentProps<"img">) {
  return <img className="mx-auto block rounded-xl" {...props} />;
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
  code,
  h4,
  FullWidth,
  Note: PostNote,
};
