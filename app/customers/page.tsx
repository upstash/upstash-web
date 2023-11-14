import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import Bg from "@/components/bg";
import { allCustomers } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button";

export default async function CustomerPage() {
  const customers = allCustomers.filter((o) => !o.draft);

  return (
    <main className="relative z-0 text-center">
      <Bg className="opacity-10" />

      <section className="py-16 md:py-24">
        <Container className="max-w-screen-lg">
          {/* header */}
          <header>
            <PageHeaderTitle>Meet our Customers</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">
              Upstash enables companies of all sizes to create at the moment of
              inspiration
            </PageHeaderDesc>
          </header>
        </Container>
      </section>

      {/* body */}
      <section className="">
        <Container className="">
          <div className="grid md:grid-cols-2 gap-8">
            {customers.map((customer) => {
              return (
                <Link
                  key={customer.slug}
                  className="group/customer-comp flex flex-col items-center gap-6
                  border-4 rounded-4xl border-white/5 p-10 md:p-16
                  bg-gradient-to-br transition
                  hover:from-[#00E9A3]/0 hover:to-[#00E9A3]/10"
                  href={`/customers/${customer.slug}`}
                >
                  <Image
                    src={`/customer/${customer.company_logo}`}
                    alt={customer.company_name}
                    width={500}
                    height={20}
                    className="object-contain h-8 max-w-full"
                  />

                  <hr className="border-0 border-b border-white/5 w-1/4" />

                  <div className="grow flex items-center">
                    <p
                      className="text-xl font-semibold
                    bg-clip-text text-transparent
                    bg-gradient-to-br from-white to-[#6DBEA6]"
                    >
                      “ {customer.highlight} ”
                    </p>
                  </div>

                  <div className="grid h-10 mt-auto group-hover/customer-comp:hidden">
                    <span className="opacity-80">{customer.user_name}</span>
                    <span className="opacity-40">{customer.user_title}</span>
                  </div>

                  <div
                    className="mt-auto h-10 hidden
                   group-hover/customer-comp:block"
                  >
                    <Button
                      target="_self"
                      type="button"
                      hideIcon
                      href="https://console.upstash.com"
                      className="bg-emerald-400 text-emerald-950"
                    >
                      Read more
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
