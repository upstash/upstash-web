import Link from "next/link";
import type { Post } from "contentlayer/generated";
import Container from "@/components/container";
import PostCard from "./post-list-item";

export default function PostList({
  data,
  views,
}: {
  data: Post[];
  views: Record<string, number>;
}) {
  return (
    <Container className="max-w-screen-lg">
      <div className="grid gap-0.5">
        {data.map((post: Post) => {
          return <PostCard key={post.slug} data={post} />;
        })}
      </div>

      <div className="mt-10 ">
        <Link href={`/blog/all`}>Show all posts</Link>
      </div>
    </Container>
  );
}
