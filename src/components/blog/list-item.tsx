import cx from "@/utils/cx";
import type { Post } from "@content";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function PostListCard({ data }: { data: Post }) {
  const { title, slug, date, authorsData } = data;

  const isAnnouncement = data.tags.includes("announcement");

  return (
    <article
      className={cx(
        "bg-z flex h-full items-center gap-4 bg-emerald-900/5 px-6 py-5 dark:bg-white/5",
        "first:rounded-t-xl last:rounded-b-xl",
        "md:gap-6 md:py-6",
        isAnnouncement && "bg-yellow-500/10 dark:bg-yellow-300/10",
      )}
    >
      <div className="grow">
        {isAnnouncement && (
          <h5 className="-ml-0.5 mb-2 inline-flex rounded-full bg-amber-500/20 px-2 py-1 text-xs uppercase tracking-wide text-amber-900 md:mb-4 dark:text-amber-100">
            Announcement
          </h5>
        )}

        <h3 className="font-display text-xl font-semibold md:leading-tight">
          <Balancer>
            <Link
              className="transition hover:text-emerald-500 hover:underline dark:hover:text-emerald-400"
              href={`/blog/${slug}`}
            >
              {title}
            </Link>
          </Balancer>
        </h3>

        <div className="mt-1 flex grow items-center gap-2">
          <Link
            href={`/blog/author/${authorsData[0].username}`}
            className="opacity-80 hover:text-emerald-500 hover:underline dark:hover:text-emerald-400"
          >
            {authorsData[0].name}
          </Link>
          <span className="opacity-60">•</span>
          <time className="opacity-60" dateTime={date}>
            {DateTime.fromISO(date).toFormat("LLLL d, yyyy")}
          </time>
        </div>
      </div>

      <Image
        width={50}
        height={50}
        alt={authorsData[0].name}
        src={authorsData[0].image}
        className="aspect-square shrink-0 rounded-full border-2 border-emerald-900/10 object-cover dark:border-emerald-500/40"
      />
    </article>
  );
}
