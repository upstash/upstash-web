"use client";

import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { allCustomers } from "@content";
import Image from "next/image";
import Link from "next/link";

export default function CustomerPage() {
  let customers = allCustomers.filter((o) => !o.draft);
  customers = customers.sort((a, b) => (a.order || 99) - (b.order || 99));

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
          <div className="grid gap-8 md:grid-cols-2">
            {customers.map((customer) => {
              return (
                <Link
                  key={customer.slug}
                  className="group/customer-comp flex flex-col items-center gap-6 rounded-4xl border-4 border-white/5 bg-gradient-to-br p-10 transition hover:from-[#00E9A3]/0 hover:to-[#00E9A3]/10 md:p-16"
                  href={`/customers/${customer.slug}`}
                >
                  <Image
                    src={`/customer/${customer.company_logo}`}
                    alt={customer.company_name}
                    width={500}
                    height={20}
                    className="h-8 max-w-full object-contain"
                  />

                  <hr className="w-1/4 border-0 border-b border-white/5" />

                  <div className="flex grow items-center">
                    <p className="bg-gradient-to-br from-white to-[#6DBEA6] bg-clip-text text-xl font-semibold text-transparent">
                      “ {customer.highlight} ”
                    </p>
                  </div>

                  <div className="mt-auto grid h-10 group-hover/customer-comp:hidden">
                    <span className="opacity-80">{customer.user_name}</span>
                    <span className="opacity-40">{customer.user_title}</span>
                  </div>

                  <div className="mt-auto hidden h-10 group-hover/customer-comp:block">
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
