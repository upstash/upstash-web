import { allDocRedis } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/post/mdx";

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
      <h1 className="mb-2 text-5xl font-semibold">{doc.title}</h1>

      <Mdx code={doc.body.code} />
    </>
  );
}
