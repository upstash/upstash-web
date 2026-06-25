"use client";

import Button from "@/components/button";
import Fuse, { type IFuseOptions } from "fuse.js";
import { DateTime } from "luxon";
import Link from "next/link";
import { useMemo, useState } from "react";
import PostGridCard, { type PostCardData } from "./grid-item";
import SearchInput from "./search-input";

export type SearchPost = PostCardData & {
  description?: string;
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
  // `posts` arrive already sorted newest-first; re-sort search hits (which
  // come back ranked by relevance) so the latest blogs appear first.
  const results = isSearching
    ? fuse
        .search(trimmed)
        .map((r) => r.item)
        .sort(
          (a, b) =>
            DateTime.fromISO(b.date).toMillis() -
            DateTime.fromISO(a.date).toMillis(),
        )
    : posts;

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />

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
