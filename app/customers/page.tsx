import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import Bg from "@/components/bg";
import { allCustomers } from "contentlayer/generated";
import Link from "next/link";

export default async function CustomerPage() {
  const customers = allCustomers.filter((o) => !o.draft);

  return (
    <main className="relative z-0 text-center">
      <Bg className="opacity-10" />

      <section className="py-16 md:py-20">
        <Container className="max-w-screen-lg">
          {/* header */}
          <header>
            <PageHeaderTitle>Meet our Customers</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">
              Vercel enables companies of all sizes to create at the moment of
              inspiration
            </PageHeaderDesc>
          </header>
        </Container>
      </section>

      {/* body */}
      <section className="">
        <Container className="">
          {customers.map((customer) => {
            return (
              <Link
                key={customer.slug}
                className="group/customer-comp"
                href={`/customers/${customer.slug}`}
              >
                <p className="">{customer.highlight}</p>
              </Link>
            );
          })}
        </Container>
      </section>
    </main>
  );
}
