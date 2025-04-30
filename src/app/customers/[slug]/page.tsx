import Container from "@/components/container";
import { Mdx } from "@/components/post/mdx";
import { capitalize } from "@/utils/capitalize";
import type { Customer } from "@content";
import { allCustomers } from "@content";
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
              className="inline-flex opacity-60 hover:opacity-100"
            >
              ← Back to Customers
            </Link>
          </div>
        </Container>
      </section>

      <main className="relative z-0">
        <article className="customer-post">
          <header className="py-20 text-center">
            <Container className="max-w-screen-lg">
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
  );
  if (!customer) {
    return {};
  }
  const title = capitalize(customer.company_name);
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
