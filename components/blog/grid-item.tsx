import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { DateTime } from "luxon";
import Balancer from "react-wrap-balancer";

export default function PostGridCard({ data }: { data: Post }) {
  const { title, slug, date, authorsData } = data;

  return (
    <article className="flex flex-col justify-between h-full p-6 rounded-3xl bg-white/03 md:p-8">
      <h3 className="pr-4 text-3xl font-semibold leading-tight font-display md:pr-12">
        <Balancer>
          <Link
            href={`/blog/${slug}`}
            className="block transition hover:text-emerald-400 hover:underline"
          >
            {title}
          </Link>
        </Balancer>
      </h3>

      <div className={`grid ${authorsData.length >= 2 ? "lg:grid-cols-2" : "grid-cols-1"} gap-8`}>
        {authorsData.map(author => (
          <div key={author.name} className="flex items-center gap-4 mt-4 grow">
            <div className="flex flex-col items-start grow">
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
              className="object-cover rounded-full aspect-square shrink-0"
            />
          </div>
        ))}

      </div>

    </article>
  );
}
