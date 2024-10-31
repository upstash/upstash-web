import Container from "@/components/container";
import { Mdx } from "@/components/post/mdx";
import { allCustomers } from "@content";
import type { Customer } from "@content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
          <div className="border-b border-white/5 py-4">
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
        <article className="customer-post">
          <header className="py-20 text-center">
            <Container className="relative max-w-screen-lg">
              <div className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-zinc-950 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />

              <Image
                src={`/customer/${customer.cover_image}`}
                alt={customer.company_name}
                width={1760}
                height={920}
                className="rounded-3xl"
              />
            </Container>
          </header>

          <div className="">
            <Container className="max-w-screen-md">
              <Mdx code={customer.mdx} />
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
