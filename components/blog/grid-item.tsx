import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { DateTime } from "luxon";
import Balancer from "react-wrap-balancer";

export default function PostGridCard({ data }: { data: Post }) {
  const { title, slug, date, authorsData } = data;

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl bg-white/3 p-6 md:p-8">
      <h3 className="pr-4 font-display text-3xl font-semibold leading-tight md:pr-12">
        <Balancer>
          <Link
            href={`/blog/${slug}`}
            className="block transition hover:text-emerald-400 hover:underline"
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
          <div key={author.name} className="mt-4 flex grow items-center gap-4">
            <div className="flex grow flex-col items-start">
              <Link
                href={`/blog/author/${author.id}`}
                className="opacity-80 hover:text-emerald-400 hover:underline"
              >
                {author.name}
              </Link>

              <time dateTime={date} className="opacity-40">
                {DateTime.fromISO(date).toFormat("LLLL d, yyyy")}
              </time>
            </div>

            <Image
              width={50}
              height={50}
              alt={author.name}
              src={author.image}
              className="aspect-square shrink-0 rounded-full object-cover"
            />
          </div>
        ))}
      </div>
    </article>
  );
}
