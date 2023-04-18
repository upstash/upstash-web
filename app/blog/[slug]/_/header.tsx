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
        <div className="flex flex-wrap items-center justify-center gap-2 opacity-60">
          <time dateTime={post.date}>
            {DateTime.fromISO(post.date).toFormat("LLLL d, yyyy")}
          </time>
          <span>·</span>
          <span>{post.readingTime.text}</span>
          {/*<span>·</span>*/}
          {/*<span>*/}
          {/*  <IncrView slug={post.slug} /> views*/}
          {/*</span>*/}
        </div>

        {/* title */}
        <h1 className="mt-2 font-display text-4xl font-semibold !leading-title md:text-5xl">
          <Balancer>{post.title}</Balancer>
        </h1>

        {/* author */}
        <div className="mt-8 flex flex-col items-center">
          <Image
            width={50}
            height={50}
            alt={post.authorObj.name}
            src={post.authorObj.photo}
            className="shrink-0 rounded-full"
          />
          <Link
            href={`/blog/author/${post.author}`}
            className="mt-2 decoration-emerald-900 hover:text-emerald-400 hover:underline"
          >
            {post.authorObj.name}
          </Link>
          <span className="opacity-60">{post.authorObj.title}</span>
        </div>
      </Container>
    </header>
  );
}
