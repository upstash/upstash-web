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
          What is a Redis database?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3 text-center">
          A fast, in-memory key-value store for real-time applications.
        </PageHeaderDesc>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-text-mute">
          <p>
            A <strong>Redis database</strong> is an in-memory, key-value data
            store. Because it keeps data in RAM instead of on disk, reads and
            writes finish in well under a millisecond. That speed is why teams
            reach for Redis to handle caching, rate limiting, and queues.
          </p>
          <p>
            Redis is a NoSQL database. It supports data structures like strings,
            hashes, lists, sets, sorted sets, streams, and JSON, so it can do
            far more than simple caching. Many teams run Redis next to their
            primary database to absorb read traffic and serve hot data
            instantly.
          </p>
          <p>
            <strong>Upstash</strong> runs Redis as a serverless database, so
            there is nothing to provision and no failover to manage. You create
            a database in seconds, connect over HTTP or the Redis protocol, and
            pay only for the requests you make. Databases can be replicated
            across regions for high availability close to your users.
          </p>
        </div>
      </Container>
    </section>
  );
}
