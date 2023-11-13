import Container from "@/components/container";
import Link from "next/link";
import { allCustomers, Customer } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/post/mdx";
import Bg from "@/components/bg";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allCustomers
    .filter((customer) => !customer.draft)
    .map((customer) => ({
      slug: customer.slug,
    }));
}

export default async function BlogPage({ params }: Props) {
  const slug = params?.slug;
  const customer = allCustomers.find((customer) => customer.slug === slug);

  if (!customer) {
    notFound();
  }

  return (
    <>
      <section>
        <Container>
          <div className="py-4 border-b border-white/5">
            <Link
              href="/customers"
              className="inline-flex opacity-40 hover:opacity-80"
            >
              ← Back to Customers
            </Link>
          </div>
        </Container>
      </section>

      <main className="relative z-0">
        <Bg />

        <article className="customer-post">
          <header className="pt-20 text-center">
            <Container className="">
              <Image
                src={`/customer/${customer.cover_image}`}
                alt={customer.company_name}
                width={1760}
                height={920}
                className="rounded-3xl"
              />
            </Container>
          </header>

          <div className="z-10 relative -mt-20">
            <div className="-z-10 absolute -top-40 inset-x-0 h-60 bg-gradient-to-t from-zinc-950 to-transparent" />

            <Container className="max-w-screen-md">
              <Mdx code={customer.body.code} />
            </Container>
          </div>
        </article>
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const customer = allCustomers.find(
    (customer) => customer.slug === params.slug,
  ) as Customer;
  const title = customer.company_name;
  const description = customer.highlight;
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${baseUrl}/customers/${customer.slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
