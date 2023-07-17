import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { DateTime } from "luxon";
import Balancer from "react-wrap-balancer";
import cx from "@/utils/cx";

export default function PostListCard({ data }: { data: Post }) {
  const { title, slug, date, authors, authorsData } = data;

  const isAnnouncement = data.tags.includes("announcement");

  return (
    <article
      className={cx(
        "flex h-full items-center gap-4 bg-zinc-900 px-6 py-5",
        "first:rounded-t-xl last:rounded-b-xl",
        "md:gap-6 md:py-6",
        isAnnouncement && "bg-yellow-300/10"
      )}
    >
      <div className="grow">
        {isAnnouncement && (
          <h5
            className="-ml-0.5 mb-2 inline-flex rounded-full bg-amber-500/50 px-2 py-1 text-xs
            uppercase tracking-wide text-amber-100 md:mb-4"
          >
            Announcement
          </h5>
        )}

        <h3 className="text-xl font-semibold font-display md:leading-tight">
          <Balancer>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </Balancer>
        </h3>

        <div className="flex items-center gap-2 mt-1 grow opacity-60">
          <Link href={`/blog/author/${author}`}>{authorObj.name}</Link>
          <span>•</span>
          <time dateTime={date}>
            {DateTime.fromISO(date).toFormat("LLLL d, yyyy")}
          </time>
        </div>
      </div>

      <Image
        width={50}
        height={50}
        alt={authorObj.name}
        src={authorObj.photo}
        className="object-cover rounded-full aspect-square shrink-0"
      />
    </article>
  );
}
