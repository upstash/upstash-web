import getData from "../_/get-data";
import TagList from "@/app/blog/_/tag-list";
import PostList from "@/app/blog/_/post-list";

export default async function BlogPage() {
  const { posts, views, tags } = await getData();

  return (
    <>
      <TagList data={tags.slice(0, 10)} />

      <div className="mt-10">
        <PostList data={posts} views={views} />
      </div>
    </>
  );
}
