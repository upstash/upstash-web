import Link from "next/link";

import cx from "@/utils/cx";
import type { Post } from "@content";

type Props = {
  post: Post;
};

export default function PostTags({ post }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 border-y border-zinc-200 py-6 dark:border-zinc-900">
      {/*<Link href="/">Return to all articles</Link>*/}

      {post.tags.map((tag: string) => (
        <Link
          key={tag}
          href={`/blog/tag/${tag}`}
          className={cx(
            "rounded-full px-3 py-1 font-medium transition",
            "bg-emerald-600/20 text-emerald-800",
            "hover:bg-emerald-600/40",
            "dark:bg-zinc-900 dark:text-zinc-300",
            "dark:hover:bg-emerald-950 dark:hover:text-emerald-400",
          )}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
