import cx from "@/utils/cx";
import type { Post } from "@content";
import Link from "next/link";

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
            "bg-black/10 dark:bg-white/10",
            "hover:underline",
          )}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
