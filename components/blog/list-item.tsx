import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { DateTime } from "luxon";
import Balancer from "react-wrap-balancer";
import cx from "@/utils/cx";

export default function PostListCard({ data }: { data: Post }) {
  const { title, slug, date, author, authorObj } = data;

  const isAnnouncement = data.tags.includes("announcement");

  return (
    <article
      className={cx(
        "flex h-full items-center gap-4 bg-zinc-900 px-6 py-4",
        "first:rounded-t-xl last:rounded-b-xl",
        "md:gap-6 md:py-6",
        isAnnouncement && "bg-emerald-400/10"
      )}
    >
      <div className="grow">
        <h3 className="font-display text-xl font-semibold md:leading-tight">
          <Balancer>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </Balancer>
        </h3>

        <div className="mt-1 flex grow items-center gap-2 opacity-60">
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
        className="aspect-square shrink-0 rounded-full object-cover"
      />
    </article>
  );
}
