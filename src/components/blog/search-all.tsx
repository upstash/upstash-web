"use client";

import { trackEvent } from "@/lib/analytics";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import PostListCard from "./list-item";
import { FUSE_OPTIONS, type SearchPost } from "./search";
import SearchInput from "./search-input";

function groupByMonth(posts: SearchPost[]): Record<string, SearchPost[]> {
  return posts.reduce(
    (acc, post) => {
      const date = new Date(post.date);
      const key = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[key]) {
        acc[key] = [];
      }
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

  const resultsCount = results?.length ?? 0;
  useEffect(() => {
    if (trimmed.length < 2) {
      return;
    }
    const timer = window.setTimeout(() => {
      trackEvent("blog_search", {
        query: trimmed.toLowerCase().slice(0, 60),
        results_count: resultsCount,
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [trimmed, resultsCount]);

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />

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
              <p className="text-text-mute">
                No posts found for{" "}
                <span className="font-medium text-text">"{trimmed}"</span>
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
