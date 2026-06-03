import IconRedis from "@/components/icon-redis";
import cx from "@/utils/cx";
import Link from "next/link";

/**
 * Internal-link CTA rendered at the end of any Redis-tagged blog post.
 * Sends readers (and link equity) to the /redis landing page.
 */
export default function RelatedRedis() {
  return (
    <Link
      href="/redis"
      className={cx(
        "mt-10 flex items-center gap-4 rounded-2xl p-5 no-underline transition",
        "border border-zinc-200 dark:border-zinc-800",
        "bg-emerald-500/5 hover:bg-emerald-500/10",
      )}
    >
      <IconRedis className="size-10 shrink-0" />
      <span className="text-left">
        <span className="block font-semibold">
          Looking for a managed Redis database?
        </span>
        <span className="mt-1 block text-text-mute">
          Upstash runs Redis as a serverless database — create one in seconds and
          pay only per request. Explore Upstash Redis →
        </span>
      </span>
    </Link>
  );
}
