import NextLink from "next/link";

import cx from "@/utils/cx";
import type { Post } from "contentlayer/generated";
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
        "cursor-pointer rounded-xl bg-zinc-800 transition",
        "hover:bg-emerald-200/10 hover:text-emerald-400 hover:underline",
        align === "right" && "text-right",
      )}
    >
      <span className="text-sm uppercase opacity-40">
        {align === "right" ? "Next post" : "Previous post"}
      </span>
      <h4 className="mt-2 font-display text-xl font-medium md:text-2xl">
        <Balancer>{post.title}</Balancer>
      </h4>
    </NextLink>
  ) : (
    <div className="flex rounded-xl bg-zinc-900" />
  );
}
