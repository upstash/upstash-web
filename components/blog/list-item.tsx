import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { DateTime } from "luxon";
import Balancer from "react-wrap-balancer";

export default function PostListCard({ data }: { data: Post }) {
  const { title, slug, date, author, authorObj } = data;

  return (
    <article
      className="flex h-full items-center gap-4 bg-zinc-900 p-4
    first:rounded-t-xl last:rounded-b-xl md:p-5"
    >
      <div className="grow">
        <h3 className="font-display text-xl font-semibold leading-tight">
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
