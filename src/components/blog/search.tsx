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
  const results = isSearching ? fuse.search(trimmed).map((r) => r.item) : posts;

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <IconSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-mute"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className={cx(
              "w-full rounded-full border border-black/10 bg-bg-mute py-3 pl-11 pr-10 dark:border-white/10",
              "text-sm text-text outline-none placeholder:text-text-mute",
              "focus:border-primary/40 focus:ring-primary/20 transition focus:ring-2",
            )}
          />
          {isSearching && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-mute transition hover:text-primary-text"
              aria-label="Clear search"
            >
              <IconX size={16} />
            </button>
          )}
        </div>
      </div>

      <section className="mt-10 text-left">
        {isSearching && results.length > 0 && (
          <p className="mb-6 text-center text-sm text-text-mute">
            {results.length} {results.length === 1 ? "result" : "results"} for{" "}
            <span className="font-medium text-text">"{trimmed}"</span>
          </p>
        )}

        {results.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {results.map((post) => (
              <PostGridCard key={post.slug} data={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-text-mute">
              No posts found for{" "}
              <span className="font-medium text-text">"{trimmed}"</span>
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
