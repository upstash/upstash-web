import getData from "../../get-data";
import PostGrid from "@/components/blog/grid/grid";
import PopularTag from "@/components/blog/popular-tag/popular-tag";

export default async function BlogPage() {
  const { posts, views, tags } = await getData();

  return (
    <main>
      <header className="text-center">
        <h1 className="font-display text-6xl font-semibold">Blog</h1>
        <p className="text-xl">
          Articles and tutorials from Upstash and community.
        </p>

        <div className="mt-6">
          <PopularTag data={tags.slice(0, 10)} />
        </div>
      </header>

      <section className="mt-20">
        <PostGrid data={posts.slice(0, 20)} views={views} />
      </section>
    </main>
  );
}