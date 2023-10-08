import Container from "@/components/container";
import Link from "next/link";
import { allCustomers, Customer } from "contentlayer/generated";
import { SITE_URL } from "@/utils/const";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/post/mdx";
import Bg from "@/components/bg";

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

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const customer = allCustomers.find(
    (customer) => customer.slug === params.slug,
  ) as Customer;
  const title = customer.company;
  const description = customer.highlight;
  const url = `${SITE_URL}/customers/${customer.slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: title,
      images: "/og-home.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@upstash",
      creator: "@upstash",
      images: "/og-home.jpg",
    },
  };
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

        <article>
          <header className="py-20 text-center">
            <div>header</div>
          </header>

          <div>
            <Container className="max-w-screen-md">
              <Mdx code={customer.body.code} />
            </Container>
          </div>
        </article>
      </main>
    </>
  );
}
