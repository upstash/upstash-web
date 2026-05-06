"use client";

import cx from "@/utils/cx";
import { IconSearch, IconX } from "@tabler/icons-react";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import PostListCard from "./list-item";
import { FUSE_OPTIONS, type SearchPost } from "./search";

function groupByMonth(posts: SearchPost[]): Record<string, SearchPost[]> {
  return posts.reduce(
    (acc, post) => {
      const date = new Date(post.date);
      const key = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[key]) acc[key] = [];
      acc[key].push(post);
      return acc;
    },
    {} as Record<string, SearchPost[]>,
  );
}

export default function BlogAllSearch({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => new Fuse(posts, FUSE_OPTIONS), [posts]);

  const trimmed = query.trim();
  const isSearching = trimmed.length > 0;
  const results = isSearching ? fuse.search(trimmed).map((r) => r.item) : null;
  const grouped = useMemo(() => groupByMonth(posts), [posts]);

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

      <section className="mt-10 text-left">
        {isSearching ? (
          results && results.length > 0 ? (
            <div className="grid gap-0.5">
              {results.map((post) => (
                <PostListCard key={post.slug} data={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-zinc-500">
                No posts found for{" "}
                <span className="font-medium text-zinc-700">"{trimmed}"</span>
              </p>
            </div>
          )
        ) : (
          <div className="grid gap-10 md:gap-14">
            {Object.keys(grouped).map((key) => (
              <div key={key}>
                <h4 className="pl-2 font-display text-xl font-medium opacity-30 dark:opacity-20">
                  {key}
                </h4>
                <div className="mt-2 grid gap-0.5">
                  {grouped[key].map((post) => (
                    <PostListCard key={post.slug} data={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
