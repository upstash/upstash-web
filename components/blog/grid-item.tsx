import Image from "next/image";
import Link from "next/link";

import type { Post } from "contentlayer/generated";
import { DateTime } from "luxon";
import Balancer from "react-wrap-balancer";

export default function PostGridCard({ data }: { data: Post }) {
  const { title, slug, date, authorsData } = data;

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl p-6 md:p-8
    bg-emerald-900/5 dark:bg-white/3">
      <h3 className="pr-4 font-display text-3xl font-semibold leading-tight md:pr-12">
        <Balancer>
          <Link
            href={`/blog/${slug}`}
            className="block transition hover:underline
            hover:text-emerald-500
            dark:hover:text-emerald-400"
          >
            {title}
          </Link>
        </Balancer>
      </h3>

      <div
        className={`grid ${
          authorsData.length >= 2 ? "lg:grid-cols-2" : "grid-cols-1"
        } gap-8`}
      >
        {authorsData.map((author) => (
          <div key={author.name} className="mt-2 flex grow items-center gap-4">
            <div className="flex grow flex-col items-start">
              <Link
                href={`/blog/author/${author.id}`}
                className="opacity-80 hover:underline font-medium
                hover:text-emerald-500
                dark:hover:text-emerald-400"
              >
                {author.name}
              </Link>

              <time dateTime={date} className="opacity-60">
                {DateTime.fromISO(date).toFormat("LLLL d, yyyy")}
              </time>
            </div>

            <Image
              width={64}
              height={64}
              alt={author.name}
              src={author.image}
              className="aspect-square border-2 border-emerald-900/10 shrink-0 rounded-full object-cover
              dark:border-emerald-500/40"
            />
          </div>
        ))}
      </div>
    </article>
  );
}
