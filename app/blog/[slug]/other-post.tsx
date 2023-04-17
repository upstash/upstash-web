import NextLink from "next/link";
import type { Post } from "contentlayer/generated";
import cx from "@/utils/cx";

type Props = {
  post?: Post;
  align?: "left" | "right";
};

export default function OtherPostCard({ post, align = "left" }: Props) {
  return (
    <div
      className={cx(
        "flex flex-col bg-zinc-900 p-6 text-left",
        align === "right" && "text-right",
        post && "cursor-pointer bg-zinc-800"
      )}
    >
      {post && (
        <NextLink href={`/blog/${post.slug}`} className="">
          <span>{align === "left" ? "Previous:" : "Next:"}</span>
          <h4>{post.title}</h4>
        </NextLink>
      )}
    </div>
  );
}
