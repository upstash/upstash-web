import getData from "../get-data";
import { Post } from "contentlayer/generated";
import PostListCard from "@/components/blog/list-item";
import Container from "@/components/container";

export default async function BlogPage() {
  const posts = await getData();

  return (
    <main>
      <Container>
        <div className="grid gap-0.5">
          {posts.map((post: Post) => {
            return <PostListCard key={post.slug} data={post} />;
          })}
        </div>
      </Container>
    </main>
  );
}
