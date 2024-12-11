"use client";

import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
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
                  className={cx(
                    "group/customer-comp relative flex flex-col items-center gap-6 p-10 transition md:p-16",
                    "overflow-hidden rounded-4xl border-4 border-bg-mute",
                  )}
                  href={`/customers/${customer.slug}`}
                >
                  <span className="absolute inset-0 bg-gradient-to-br hover:from-emerald-500/20 hover:to-emerald-500/0" />

                  <Image
                    src={`/customer/${customer.company_logo}`}
                    alt={customer.company_name}
                    width={500}
                    height={20}
                    className="h-8 max-w-full object-contain dark:hidden"
                  />
                  <Image
                    src={`/customer/${customer.company_logo_dark}`}
                    alt={customer.company_name}
                    width={500}
                    height={20}
                    className="hidden h-8 max-w-full object-contain dark:block"
                  />

                  <hr className="w-1/4 border-0 border-b border-black/5 dark:border-white/5" />

                  <div className="flex grow items-center">
                    <p
                      className={cx(
                        "text-xl font-semibold text-transparent",
                        "bg-gradient-to-br bg-clip-text",
                        "from-primary-text to-text",
                        "dark:from-white dark:to-emerald-300",
                      )}
                    >
                      “ {customer.highlight} ”
                    </p>
                  </div>

                  <div className="mt-auto grid h-10 group-hover/customer-comp:hidden">
                    <span className="opacity-80">{customer.user_name}</span>
                    <span className="opacity-40">{customer.user_title}</span>
                  </div>

                  <div className="mt-auto hidden h-10 group-hover/customer-comp:block">
                    <Button type="button" hideIcon className="bg-primary">
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
