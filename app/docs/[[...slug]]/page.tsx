import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/post/mdx";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams(params) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => {
    return doc.slugAsParams === slug;
  });

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <div>
      <h1>{doc.title}</h1>

      <div>
        <Mdx code={doc.body.code} />
      </div>
    </div>
  );
}
