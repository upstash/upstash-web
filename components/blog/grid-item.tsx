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
    <article className="flex h-full flex-col rounded-3xl bg-zinc-900 p-6 md:p-8">
      <h3 className="pr-4 font-display text-3xl font-semibold leading-tight md:pr-12">
        <Balancer>
          <Link
            href={`/blog/${slug}`}
            className="block transition hover:text-emerald-300 hover:underline"
          >
            {title}
          </Link>
        </Balancer>
      </h3>

      <div className="mt-4 flex grow items-center gap-4">
        <div className="flex grow flex-col items-start">
          <Link
            href={`/blog/author/${author}`}
            className="hover:text-emerald-300 hover:underline"
          >
            {authorObj.name}
          </Link>

          <time dateTime={date} className="opacity-40">
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

        <Image
          width={50}
          height={50}
          alt={authorObj.name}
          src={authorObj.photo}
          className="aspect-square shrink-0 rounded-full object-cover"
        />
      </div>
    </article>
  );
}
