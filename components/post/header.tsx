import Link from "next/link";
import type { Post } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import Container from "@/components/container";
import { DateTime } from "luxon";
import Image from "next/image";

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
          <span>{post.readingTime.text}</span>
        </div>

        {/* title */}
        <h1 className="mx-4 mt-2 font-display text-4xl font-bold !leading-title md:text-6xl">
          <Balancer>{post.title}</Balancer>
        </h1>

        <div className="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row">
          {post.authorsData.map((author) => (
            <div key={author.name} className="flex flex-col items-center">
              <Image
                width={50}
                height={50}
                alt={author.name}
                src={author.image}
                className="aspect-square shrink-0 rounded-full object-cover"
              />
              <Link
                href={`/blog/author/${author.id}`}
                className="mt-2 hover:text-emerald-400 hover:underline"
              >
                {author.name}
              </Link>
              <span className="opacity-40">{author.title}</span>
            </div>
          ))}
        </div>
      </Container>
    </header>
  );
}
