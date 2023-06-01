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
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import { HTMLProps } from "react";
import Image from "next/image";
import Link from "next/link";

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

  const author = authors[example.author];
  const content = await markdownToHtml(example.body);

  return (
    <main className="pt-8 md:pt-16">
      <Container>
        <div className="grid gap-8 text-left md:grid-cols-3 md:gap-16">
          {/* meta */}
          <div className="order-2 md:order-1">
            <Link href="/examples" className="mb-4 hidden opacity-80 md:block">
              ← Back to Examples
            </Link>

            <div className="top-8 rounded-2xl bg-white/5 p-6 md:sticky">
              <div className="">
                <ExampleMetaRow title="Products">
                  <>
                    {example.products.map((item) => {
                      if (item === "redis") {
                        return (
                          <span
                            key={item}
                            className="flex items-center gap-2 rounded
                            bg-red-400/10 p-1.5 pr-2 leading-none text-red-200"
                          >
                            <IconRedis
                              width={16}
                              aria-label="Upstash Redis Icon"
                            />
                            <span>Redis</span>
                          </span>
                        );
                      } else if (item === "kafka") {
                        return (
                          <span
                            key={item}
                            className="flex items-center gap-2 rounded
                            bg-red-400/10 p-1.5 pr-2 leading-none text-red-200"
                          >
                            <IconKafka
                              width={16}
                              aria-label="Upstash Kafka Icon"
                            />
                            <span>Kafka</span>
                          </span>
                        );
                      } else if (item === "qstash") {
                        return (
                          <span
                            key={item}
                            className="flex items-center gap-2 rounded
                            bg-red-400/10 p-1.5 pr-2 leading-none text-red-200"
                          >
                            <IconQStash
                              width={16}
                              aria-label="Upstash QStash Icon"
                            />
                            <span>QStash</span>
                          </span>
                        );
                      }
                    })}
                  </>
                </ExampleMetaRow>

                <ExampleMetaRow title="Stack">
                  <>
                    {example.stack
                      .map((item) => {
                        return item;
                      })
                      .join(", ")}
                  </>
                </ExampleMetaRow>

                <ExampleMetaRow title="Use Case">
                  <>
                    {example.useCases
                      .map((item) => {
                        return item;
                      })
                      .join(", ")}
                  </>
                </ExampleMetaRow>

                <ExampleMetaRow title="Publisher">
                  <>{author.name}</>
                </ExampleMetaRow>
              </div>

              <div className="mt-4 grid gap-4">
                <Button
                  type="button"
                  href="mailto:jobs@upstash.com"
                  className=""
                >
                  Read Post
                </Button>

                <Button
                  type="button"
                  href="mailto:jobs@upstash.com"
                  className=""
                >
                  View Repo
                </Button>

                <Button
                  type="button"
                  href="mailto:jobs@upstash.com"
                  className="bg-white text-zinc-950"
                  // className="bg-emerald-400 text-zinc-950"
                >
                  Deploy
                </Button>
              </div>
            </div>
          </div>

          {/* post */}
          <div className="order-1 md:col-span-2 md:pt-10">
            <Link href="/examples" className="mb-8 block opacity-60 md:hidden">
              ← Back to Examples
            </Link>

            <article>
              <h1 className="font-display text-4xl font-bold !leading-title md:text-5xl">
                <Balancer>{example.title}</Balancer>
              </h1>

              <div
                className="post mt-8 leading-p"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </article>
          </div>
        </div>
      </Container>
    </main>
  );
}
function ExampleMetaRow({
  className,
  children,
  title,
  ...props
}: HTMLProps<HTMLDivElement> & {
  title: string;
}) {
  return (
    <div className="flex items-center border-b border-b-white/5 py-3">
      <div className="text-xs uppercase tracking-widest opacity-40">
        {title}:
      </div>
      <div className="ml-auto flex items-center">{children}</div>
    </div>
  );
}
