import Container from "@/components/container";
import CopyArticleButton from "@/components/post/copy-article-button";
import { SITE_URL } from "@/utils/const";
import type { Post } from "@content";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostHeader({ post }: Props) {
  const authors = post.authorsData;

  return (
    <header className="pt-10 md:pt-14">
      <Container className="max-w-screen-md">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-sm tracking-tight text-text-mute transition hover:text-text md:mb-14"
        >
          <IconArrowNarrowLeft size={16} stroke={1.5} aria-hidden />
          <span>Back</span>
        </Link>

        <div className="mb-5 font-mono text-sm tracking-tight text-text-mute">
          Published {DateTime.fromISO(post.date).toFormat("LLLL d, yyyy")}
        </div>

        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-4 font-mono text-sm tracking-tight text-text-mute">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>{post.readingTime}</span>
            {authors.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex shrink-0 -space-x-2">
                    {authors.map((a) => (
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
                  {authors.length === 1 ? (
                    <Link
                      href={`/blog/author/${authors[0].username}`}
                      className="truncate transition hover:text-text"
                    >
                      {authors[0].name}
                    </Link>
                  ) : authors.length === 2 ? (
                    <span className="truncate">
                      <Link
                        href={`/blog/author/${authors[0].username}`}
                        className="transition hover:text-text"
                      >
                        {authors[0].name}
                      </Link>
                      {" & "}
                      <Link
                        href={`/blog/author/${authors[1].username}`}
                        className="transition hover:text-text"
                      >
                        {authors[1].name}
                      </Link>
                    </span>
                  ) : (
                    <span className="truncate">
                      <Link
                        href={`/blog/author/${authors[0].username}`}
                        className="transition hover:text-text"
                      >
                        {authors[0].name}
                      </Link>
                      {` & ${authors.length - 1} more`}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          <CopyArticleButton
            slug={post.slug}
            pageUrl={`${SITE_URL}/blog/${post.slug}`}
            markdownUrl={`${SITE_URL}/blog/${post.slug}.md`}
          />
        </div>
      </Container>
    </header>
  );
}
