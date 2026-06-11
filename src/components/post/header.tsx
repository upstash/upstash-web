import AuthorSocials from "@/components/blog/author-socials";
import Container from "@/components/container";
import CopyArticleButton from "@/components/post/copy-article-button";
import { SITE_URL } from "@/utils/const";
import type { Post } from "@content";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostHeader({ post }: Props) {
  return (
    <header className="py-20 text-center">
      <Container className="max-w-screen-lg">
        {/* meta */}
        <div className="flex flex-wrap items-center justify-center gap-2 opacity-40">
          <time dateTime={post.date}>
            {DateTime.fromISO(post.date).toFormat("LLLL d, yyyy")}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        {/* title */}
        <h1 className="mx-4 mt-2 text-balance font-display text-4xl font-bold !leading-title md:text-6xl">
          {post.title}
        </h1>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-5">
          {post.authorsData.map((author) => (
            <div
              key={author.name}
              className="flex items-center gap-3 rounded-2xl bg-bg-mute px-5 py-3 text-left"
            >
              <Link
                href={`/blog/author/${author.username}`}
                aria-label={author.name}
              >
                <Image
                  width={48}
                  height={48}
                  alt={author.name}
                  src={author.image}
                  className="aspect-square shrink-0 rounded-full object-cover transition hover:opacity-80"
                />
              </Link>
              <div className="flex flex-col">
                <Link
                  href={`/blog/author/${author.username}`}
                  className="font-medium hover:text-primary-text hover:underline"
                >
                  {author.name}
                </Link>
                <span className="text-sm opacity-60">{author.title}</span>
              </div>
              <AuthorSocials author={author} className="ml-1" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
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
