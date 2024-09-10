import NextLink from "next/link";

import cx from "@/utils/cx";
import type { Post } from "@content";
import Balancer from "react-wrap-balancer";

type Props = {
  post?: Post;
  align?: "left" | "right";
};

export default function OtherPostCard({ post, align = "left" }: Props) {
  return post ? (
    <NextLink
      href={`/blog/${post.slug}`}
      className={cx(
        "flex flex-col p-6 text-left",
        "cursor-pointer rounded-xl text-inherit transition",
        "bg-emerald-600/10",
        "hover:bg-emerald-600/20",
        "dark:bg-zinc-800",
        "dark:hover:bg-emerald-200/10 dark:hover:text-emerald-400 dark:hover:underline",
        align === "right" && "text-right",
      )}
    >
      <span className="text-sm uppercase opacity-60">
        {align === "right" ? "Next post" : "Previous post"}
      </span>
      <h4 className="mt-2 font-display text-xl font-medium md:text-2xl">
        <Balancer>{post.title}</Balancer>
      </h4>
    </NextLink>
  ) : (
    <div className="flex rounded-xl bg-emerald-600/10 dark:bg-zinc-900" />
  );
}
