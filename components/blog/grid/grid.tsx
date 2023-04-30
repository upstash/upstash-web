import Link from "next/link";
import type { Post } from "contentlayer/generated";
import Container from "@/components/container";
import PostCard from "./grid-item";

export default function PostGrid({
  data,
  views,
}: {
  data: Post[];
  views: Record<string, number>;
}) {
  return (
    <Container>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8">
        {data.map((post: Post) => {
          return (
            <PostCard
              key={post.slug}
              data={post}
              viewCount={views[post.slug]}
            />
          );
        })}
      </div>

      <div className="mt-10">
        <Link href={`/blog/all`}>Show all posts</Link>
      </div>
    </Container>
  );
}
