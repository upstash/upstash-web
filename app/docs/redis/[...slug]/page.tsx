import { allDocRedis } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/post/mdx";
import DocSidebar from "@/app/docs/sidebar";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams(params) {
  const slug = params.slug?.join("/") || "";

  const doc = allDocRedis.find((doc) => {
    return doc.slug === slug;
  });

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocRedis.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <>
      <DocSidebar />

      <div className="col-span-3">
        <h1>{doc.title}</h1>

        <Mdx code={doc.body.code} />
      </div>
    </>
  );
}
