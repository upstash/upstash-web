import { TopicIcon } from "@/components/kb/topic-toggle";
import {
  kbExcerpt,
  topicName,
  topicSlug,
  type KbArticle,
  type KbAuthor,
} from "@/lib/kb";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

export const formatKbDate = (iso: string) =>
  DateTime.fromISO(iso).toFormat("LLLL d, yyyy");

export function KbAvatar({ author, size }: { author: KbAuthor; size: number }) {
  if (author.avatarUrl) {
    return (
      <Image
        width={size}
        height={size}
        alt={author.name}
        src={author.avatarUrl}
        className="aspect-square shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="bg-primary/20 grid shrink-0 place-items-center rounded-full font-medium text-primary-text"
    >
      {author.name.charAt(0).toUpperCase()}
    </span>
  );
}

// After the blog's grid cards: the title and two lines of the article's
// opening, with the topic and date at the foot, so a row's cards line up. The
// whole card is the link.
export function KbCard({ article }: { article: KbArticle }) {
  const excerpt = kbExcerpt(article);

  return (
    <Link
      href={`/kb/${article.slug}`}
      className="hover:ring-primary/30 group flex flex-col rounded-3xl bg-bg-mute p-6 ring-1 ring-transparent transition duration-300 md:p-8"
    >
      <h3 className="text-balance font-display text-xl font-semibold leading-tight transition group-hover:text-primary-text">
        {article.title}
      </h3>

      {excerpt && <p className="mt-2 line-clamp-2 opacity-60">{excerpt}</p>}

      <div className="mt-auto flex items-center gap-4 pt-6 text-sm">
        {article.topic && (
          <span className="flex items-center gap-2 font-medium">
            <TopicIcon slug={topicSlug(article.topic.name)} />
            {topicName(article.topic.name)}
          </span>
        )}
        <time dateTime={article.publishedAt} className="opacity-60">
          {formatKbDate(article.publishedAt)}
        </time>
      </div>
    </Link>
  );
}

export function KbGrid({ articles }: { articles: KbArticle[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {articles.map((article) => (
        <KbCard key={article.id} article={article} />
      ))}
    </div>
  );
}
