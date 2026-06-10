"use client";

import Button from "@/components/button";
import cx from "@/utils/cx";
import { IconSearch, IconX } from "@tabler/icons-react";
import Fuse, { type IFuseOptions } from "fuse.js";
import Link from "next/link";
import { useMemo, useState } from "react";
import PostGridCard, { type PostCardData } from "./grid-item";

export type SearchPost = PostCardData & {
  description?: string;
  tags: string[];
};

export const FUSE_OPTIONS: IFuseOptions<SearchPost> = {
  keys: [
    { name: "title", weight: 3 },
    { name: "tags", weight: 2 },
    { name: "description", weight: 1 },
    { name: "authorsData.name", weight: 0.5 },
  ],
  threshold: 0.35,
  includeScore: true,
};

export default function BlogSearch({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => new Fuse(posts, FUSE_OPTIONS), [posts]);

  const trimmed = query.trim();
  const isSearching = trimmed.length > 0;
  const results = isSearching
    ? fuse.search(trimmed).map((r) => r.item)
    : posts;

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-sm">
          <IconSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className={cx(
              "w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-10 pr-10",
              "text-sm text-zinc-900 outline-none placeholder:text-zinc-400",
              "focus:border-zinc-300 focus:ring-2 focus:ring-zinc-100",
            )}
          />
          {isSearching && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600"
              aria-label="Clear search"
            >
              <IconX size={14} />
            </button>
          )}
        </div>
      </div>

      <section className="mt-6 text-left">
        {results.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {results.map((post) => (
              <PostGridCard key={post.slug} data={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-zinc-500">
              No posts found for{" "}
              <span className="font-medium text-zinc-700">"{trimmed}"</span>
            </p>
          </div>
        )}

        {!isSearching && (
          <div className="mt-10 flex justify-center">
            <Button asChild variant="primary">
              <Link href="/blog/all">Show all posts</Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
