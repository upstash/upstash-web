import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import Link from "next/link";

export default function NotFound() {
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

      </Container>
    </main>
  );
}
