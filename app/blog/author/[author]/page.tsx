import getData from "../../get-data";
import PostGrid from "@/components/blog/grid/grid";
import PageHeaderTitle from "@/components/page-header-title";
import Link from "next/link";
import Bg from "@/components/bg";

type Props = {
  params: {
    author: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  return {
    title: `${params.author}'s Posts`,
  };
}

export default async function BlogPage({ params: { author } }: Props) {
  const { posts, views, tags } = await getData();

  return (
    <main className="relative z-0">
      <Bg />

      <header className="py-12 text-center md:py-24">
        <PageHeaderTitle>
          <span className="font-medium opacity-40">blog/author/</span>
          <span className="font-bold">{author}</span>
        </PageHeaderTitle>
        <div className="mt-4">
          <Link className="text-emerald-300 hover:underline" href="/blog">
            Back to all posts
          </Link>
        </div>
      </header>

      <section>
        <PostGrid data={posts.slice(0, 20)} views={views} />
      </section>
    </main>
  );
}
