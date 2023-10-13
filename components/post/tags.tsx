import Link from "next/link";

import type { Post } from "contentlayer/generated";

type Props = {
  post: Post;
};

export default function PostTags({ post }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 border-y border-zinc-900 py-10">
      {/*<Link href="/">Return to all articles</Link>*/}

      {post.tags.map((tag: string) => (
        <Link
          key={tag}
          href={`/blog/tag/${tag}`}
          className="rounded-full bg-zinc-900 px-3 py-1 text-zinc-300
          transition hover:bg-emerald-950 hover:text-emerald-400"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
