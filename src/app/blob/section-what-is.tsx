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
          What is blob storage?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3 text-center">
          A place to put files that does not care what is in them.
        </PageHeaderDesc>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-text-mute">
          <p>
            <strong>Blob storage</strong>, also called object storage, keeps
            files as objects in a flat namespace. Each object has a path, a
            body, a content type, and a little metadata. There is no filesystem
            to mount and no schema to design, which is why it is the standard
            home for images, documents, videos, backups, and anything else that
            does not belong in a database row.
          </p>
          <p>
            Most object stores expose an S3-style API and leave the rest to
            you: signing uploads, enforcing limits, handling multipart, cleaning
            up abandoned parts, and wiring a CDN in front. That glue is where
            the time goes.
          </p>
          <p>
            <strong>Upstash Blob</strong> ships that glue as an SDK. A bucket
            is global and replicated to a CDN, so there is no region to pick.
            The upload handler runs in your own route, so a browser can send
            bytes straight to storage while your server decides who may upload
            and records what landed. Underneath it is real S3-compatible
            storage, so the AWS SDK and every S3 tool still work.
          </p>
        </div>
      </Container>
    </section>
  );
}
