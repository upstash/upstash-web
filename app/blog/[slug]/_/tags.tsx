import Link from "next/link";
import type { Post } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import Container from "@/components/container";
import { DateTime } from "luxon";
import IncrView from "@/app/blog/[slug]/_/view";
import Image from "next/image";

type Props = {
  post: Post;
};

export default function PostTags({ post }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 border-y border-zinc-900 py-10">
      {post.tags.map((tag: string) => (
        <Link
          key={tag}
          href={`/blog/tag/${tag}`}
          className="rounded bg-zinc-900 px-2 py-1 text-zinc-300
          decoration-emerald-900 hover:bg-emerald-950 hover:text-emerald-200 hover:underline"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
