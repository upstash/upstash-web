import cx from "@/utils/cx";
import type { Post } from "@content";
import { IconArrowUpRight } from "@tabler/icons-react";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

export type PostCardData = Pick<
  Post,
  "slug" | "title" | "date" | "authorsData" | "tags"
>;

export default function PostGridCard({ data }: { data: PostCardData }) {
  const { title, slug, date, authorsData } = data;

  const isAnnouncement = data.tags?.includes("announcement");

  return (
    <article
      className={cx(
        "hover:ring-primary/30 group flex h-full flex-col justify-between rounded-3xl bg-bg-mute p-6 ring-1 ring-transparent transition duration-300 md:p-8",
        isAnnouncement && "bg-yellow-500/10 dark:bg-yellow-300/10",
      )}
    >
      <div>
        <h3 className="flex items-start gap-2 pr-2 font-display text-2xl font-semibold leading-tight md:text-3xl">
          <Link
            href={`/blog/${slug}`}
            className="block transition group-hover:text-primary-text"
          >
            {title}
          </Link>
          <IconArrowUpRight
            size={24}
            className="mt-1 shrink-0 text-primary-text opacity-0 transition duration-300 group-hover:opacity-100"
          />
        </h3>

        {isAnnouncement && (
          <h5 className="-ml-0.5 mt-3 inline-flex rounded-full bg-amber-500/20 px-2 py-1 text-xs uppercase tracking-wide text-amber-900 dark:text-amber-100">
            Announcement
          </h5>
        )}
      </div>

      <div
        className={`mt-6 grid ${
          authorsData.length >= 2 ? "lg:grid-cols-2" : "grid-cols-1"
        } gap-x-8 gap-y-4`}
      >
        {authorsData.map((author) => (
          <div key={author.name} className="flex grow items-center gap-3">
            <Image
              width={40}
              height={40}
              alt={author.name}
              src={author.image}
              className="aspect-square shrink-0 rounded-full object-cover"
            />

            <div className="flex grow flex-col items-start text-sm">
              <Link
                href={`/blog/author/${author.username}`}
                className="relative z-10 font-medium hover:text-primary-text hover:underline"
              >
                {author.name}
              </Link>

              <time dateTime={date} className="opacity-60">
                {DateTime.fromISO(date).toFormat("LLLL d, yyyy")}
              </time>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
