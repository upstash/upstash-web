import { notFound } from "next/navigation";
import { SITE_URL } from "@/utils/const";
import PageBodyGradient from "@/components/page-body-gradient";
import Container from "@/components/container";
import { Example } from "@/utils/type";
import getData from "../get-data";
import markdownToHtml from "@/utils/markdownToHtml";
import Balancer from "react-wrap-balancer";
import Button from "@/components/button";
import authors from "@/utils/authors";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  const examples: Example[] = await getData();

  return examples.map((item) => ({
    slug: item.title.toLowerCase().replace(/ /g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const examples: Example[] = await getData();
  const example = examples.find(
    (item) => item.title.toLowerCase().replace(/ /g, "-") === params.slug
  );

  if (!example) {
    return {
      title: "Not found",
    };
  }

  const title = example.title;
  const url = `${SITE_URL}/examples/${example.title
    .toLowerCase()
    .replace(/ /g, "-")}`;

  return {
    title,
  };
}

export default async function BlogPage({ params }: Props) {
  const examples: Example[] = await getData();
  const example = examples.find(
    (item) => item.title.toLowerCase().replace(/ /g, "-") === params.slug
  );

  if (!example) {
    notFound();
  }

  const content = await markdownToHtml(example.body);

  return (
    <main className="">
      <article>
        <header className="py-20 text-center">
          <Container className="max-w-screen-lg">
            <h1 className="mx-4 mt-2 font-display text-4xl font-bold !leading-title md:text-5xl">
              <Balancer>{example.title}</Balancer>
            </h1>
          </Container>
        </header>

        <div className="relative z-0 pt-20">
          <PageBodyGradient />

          <Container>
            <div className="grid grid-cols-3 items-start gap-10 text-left">
              {/* meta */}
              <div className="sticky top-10 rounded-3xl bg-white/5 p-6">
                <div className="">
                  <div className="flex items-center">
                    <div className="opacity-40">Products:</div>
                    <div>
                      {example.products.map((item) => {
                        return <span>{item}</span>;
                      })}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="opacity-40">Stack:</div>
                    <div>
                      {example.stack.map((item) => {
                        return <span>{item}</span>;
                      })}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="opacity-40">Use Case:</div>
                    <div>
                      {example.products.map((item) => {
                        return <span>{item}</span>;
                      })}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="opacity-40">Publisher:</div>
                    <div>{authors[example.author].name}</div>
                  </div>
                </div>

                <Button
                  type="button"
                  href="mailto:jobs@upstash.com"
                  className="mt-10 bg-emerald-400 text-zinc-950"
                >
                  Apply now
                </Button>
              </div>

              <div className="col-span-2">
                <div
                  className="post leading-p"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </Container>
        </div>
      </article>
    </main>
  );
}
