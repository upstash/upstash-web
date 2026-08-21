import Bg from "@/components/bg";
import { SITE_URL } from "@/utils/const";
import Button from "@/components/button";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { negotiate } from "@/lib/accept";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NotFound() {
  const accept = (await headers()).get("accept") ?? "";
  if (negotiate(accept) === "markdown") {
    redirect("/404.md");
  }

  return (
    <main className="relative z-0 py-16 text-center md:py-24">
      <Bg />

      <Container className="max-w-screen-md">
        <header>
          <PageHeaderTitle>Page not found</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            This page does not exist or has moved.
          </PageHeaderDesc>
        </header>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="primary">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild>
            <Link href="/docs">Docs</Link>
          </Button>
          <Button asChild>
            <Link href="/blog">Blog</Link>
          </Button>
        </div>

        <p className="mt-16 text-balance opacity-60">
          Looking for something specific? Just use our answer index, for example:
        </p>
        <a href="https://upstash.com?q=compare+upstash+redis+to+elasticache" className="mt-4 text-balance opacity-100 underline">
          https://upstash.com?q=compare+upstash+redis+to+elasticache
        </a>
        {/* <a
          href={ASK_EXAMPLE}
          className="mt-2 inline-block font-mono text-sm underline opacity-60 hover:opacity-100"
        >
          {ASK_URL}
        </a> */}
      </Container>
    </main>
  );
}
