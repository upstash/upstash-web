import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { DateTime } from "luxon";
import Balancer from "react-wrap-balancer";

export default function PostCard({
  data,
  viewCount,
}: {
  data: Post;
  viewCount?: number;
}) {
  const { title, slug, date, author, authorObj } = data;

  return (
    <article className="flex h-full flex-col rounded-xl bg-zinc-900 p-6 md:p-8">
      <h3 className="font-display text-3xl font-semibold leading-tight">
        <Balancer>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </Balancer>
      </h3>

      <div className="mt-8 flex grow items-center gap-6">
        <Image
          width={50}
          height={50}
          alt={authorObj.name}
          src={authorObj.photo}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <Link href={`/blog/author/${author}`}>{authorObj.name}</Link>

          <time dateTime={date} className="opacity-60">
            {DateTime.fromISO(date).toFormat("LLLL d, yyyy")}
          </time>

          {viewCount && (
            <span>
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                viewCount ?? 0
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
