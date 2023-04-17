import getData from "./_/get-data";
import PostGrid from "@/app/blog/_/post-grid";
import TagList from "@/app/blog/_/tag-list";

export default async function BlogPage() {
  const { posts, views, tags } = await getData();

  return (
    <>
      <header className="py-20 text-center">
        <h1 className="font-display text-6xl font-semibold">Blog</h1>
        <p className="mt-4 text-xl opacity-60">
          Articles and tutorials from Upstash and community.
        </p>

        <div className="mt-8">
          <TagList data={tags.slice(0, 10)} />
        </div>
      </header>

      <div className="relative z-10 pt-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-[800px] bg-gradient-to-b from-zinc-900 to-zinc-950 opacity-40" />
        <PostGrid data={posts.slice(0, 20)} views={views} />
      </div>
    </>
  );
}
