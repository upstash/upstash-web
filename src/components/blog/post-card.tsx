import type { Post } from "@content";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

export type PostCardData = Pick<
  Post,
  "slug" | "title" | "date" | "tags" | "authorsData" | "description"
> & {
  excerpt?: string;
};

export default function PostCard({ data }: { data: PostCardData }) {
  const { slug, title, date, authorsData, description, excerpt } = data;
  const summary = description || excerpt || "";
  const authorLabel =
    authorsData.length === 0
      ? ""
      : authorsData.length === 1
        ? authorsData[0].name
        : authorsData.length === 2
          ? `${authorsData[0].name} & ${authorsData[1].name}`
          : `${authorsData[0].name} & ${authorsData.length - 1} more`;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative block h-full bg-bg"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100"
      />
      <div className="relative flex h-full flex-col p-7 md:p-10">
        <h3 className="mb-5 font-display text-xl font-semibold leading-tight md:text-2xl">
          {title}
        </h3>

        {summary && (
          <p className="mb-10 line-clamp-3 text-[rgb(2_44_34_/_0.58)] group-hover:text-white dark:text-[rgb(236_253_245_/_0.58)]">
            {summary}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 font-mono text-sm tracking-tight text-[rgb(2_44_34_/_0.58)] dark:text-[rgb(236_253_245_/_0.58)]">
          {authorsData.length > 0 ? (
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex shrink-0 -space-x-2">
                {authorsData.map((a) => (
                  <Image
                    key={a.username}
                    width={24}
                    height={24}
                    alt={a.name}
                    src={a.image}
                    className="aspect-square rounded-full object-cover ring-2 ring-bg"
                  />
                ))}
              </div>
              <span className="truncate group-hover:text-white">
                {authorLabel}
              </span>
            </div>
          ) : (
            <span />
          )}
          <time dateTime={date} className="shrink-0 group-hover:text-white">
            {DateTime.fromISO(date).toFormat("LLL dd, yyyy")}
          </time>
        </div>
      </div>
    </Link>
  );
}
