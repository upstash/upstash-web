import getData from "../../_/get-data";
import PostGrid from "@/app/blog/_/post-grid";
import TagList from "@/app/blog/_/tag-list";

export default async function BlogPage() {
  const { posts, views, tags } = await getData();

  return (
    <>
      <header className="text-center">
        <h1 className="font-display text-6xl font-semibold">Blog</h1>
        <p className="text-xl">
          Articles and tutorials from Upstash and community.
        </p>

        <div className="mt-6">
          <TagList data={tags.slice(0, 10)} />
        </div>
      </header>

      <div className="mt-20">
        <PostGrid data={posts.slice(0, 20)} views={views} />
      </div>
    </>
  );
}
