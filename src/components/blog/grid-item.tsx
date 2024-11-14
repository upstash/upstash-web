import type { Post } from "@content";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function PostGridCard({ data }: { data: Post }) {
  const { title, slug, date, authorsData } = data;

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl bg-emerald-900/5 p-6 md:p-8 dark:bg-white/5">
      <h3 className="pr-4 font-display text-3xl font-semibold leading-tight md:pr-12">
        <Balancer>
          <Link
            href={`/blog/${slug}`}
            className="block transition hover:text-emerald-500 hover:underline dark:hover:text-emerald-400"
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
                href={`/blog/author/${author.username}`}
                className="font-medium opacity-80 hover:text-emerald-500 hover:underline dark:hover:text-emerald-400"
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
              className="aspect-square shrink-0 rounded-full border-2 border-emerald-900/10 object-cover dark:border-emerald-500/40"
            />
          </div>
        ))}
      </div>
    </article>
  );
}
