import type { Post } from "@content";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

export type PostCardData = Pick<
  Post,
  "slug" | "title" | "date" | "authorsData"
> & {
  description?: string;
  excerpt?: string;
};

export default function PostGridCard({ data }: { data: PostCardData }) {
  const { title, slug, date, authorsData, description, excerpt } = data;
  const summary = description || excerpt;
  const authorLabel =
    authorsData.length === 0
      ? ""
      : authorsData.length === 1
        ? authorsData[0].name
        : authorsData.length === 2
          ? `${authorsData[0].name} & ${authorsData[1].name}`
          : `${authorsData[0].name} & ${authorsData.length - 1} more`;

  return (
    <article className="flex h-full flex-col rounded-2xl bg-bg-mute p-5 md:p-6">
      <h3 className="font-display text-xl font-semibold leading-tight">
        <Link
          href={`/blog/${slug}`}
          className="block transition hover:text-primary-text hover:underline"
        >
          {title}
        </Link>
      </h3>

      {summary && (
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed opacity-60">
          {summary}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm opacity-60">
        {authorsData.length > 0 ? (
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex shrink-0 -space-x-2">
              {authorsData.map((author) => (
                <Image
                  key={author.username}
                  width={24}
                  height={24}
                  alt={author.name}
                  src={author.image}
                  className="aspect-square rounded-full object-cover ring-2 ring-bg-mute"
                />
              ))}
            </div>
            <span className="truncate">{authorLabel}</span>
          </div>
        ) : (
          <span />
        )}
        <time dateTime={date} className="shrink-0">
          {DateTime.fromISO(date).toFormat("LLL d, yyyy")}
        </time>
      </div>
    </article>
  );
}
