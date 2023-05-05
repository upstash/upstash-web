"use client";

import { TableOfContents } from "@/utils/toc";

type Props = {
  toc: TableOfContents;
};

export default function PostTOC({ toc }: Props) {
  if (!toc?.items) return null;

  return (
    <div className="grid">
      {toc.items.map(({ title, url }) => {
        return (
          <a key={url} href={url} className="">
            {title}
          </a>
        );
      })}
    </div>
  );
}
