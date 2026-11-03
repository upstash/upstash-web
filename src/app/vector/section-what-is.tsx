import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionWhatIs() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-md text-left">
        <PageHeaderTitle as="h2" className="text-center">
          What is a vector database?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3 text-center">
          A database that finds things by meaning, not by matching text.
        </PageHeaderDesc>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-text-mute">
          <p>
            A <strong>vector database</strong> stores embeddings: lists of
            numbers that an AI model produces to represent the meaning of text,
            images, or other data. Items with similar meaning end up close
            together, so the database can answer &ldquo;what is most like
            this?&rdquo; by finding the nearest vectors to a query.
          </p>
          <p>
            That is the retrieval step behind RAG, semantic search,
            recommendations, and agent memory. Doing it well at scale takes an
            approximate nearest neighbor index, metadata filters, and a way to
            keep embeddings in sync with the source data, which is a lot to run
            yourself.
          </p>
          <p>
            <strong>Upstash Vector</strong> is that database as a serverless
            service. Create an index, choose an embedding model or bring your
            own vectors, and query over HTTP from any runtime. Storage scales on
            disk, and on pay as you go you are billed per request, so an index
            that is not being queried costs only its storage.
          </p>
        </div>
      </Container>
    </section>
  );
}
