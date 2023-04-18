import getData from "../get-data";
import PostList from "@/components/blog/list";

export default async function BlogPage() {
  const { posts, views, tags } = await getData();

  return (
    <>
      <div className="mt-10">
        <PostList data={posts} views={views} />
      </div>
    </>
  );
}
