import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/border-box";

export default function HttpRestApi() {
  return (
    <BorderBox className="col-span-4">
      <BorderBoxBody>
        <header>
          <BorderBoxBodyTitle className="">HTTP/REST API</BorderBoxBodyTitle>
          <BorderBoxBodySummary>
            HTTP-based APIs enable access from both serverless and edge
            functions, while also supporting the use of standard clients via the
            Redis/Kafka protocol.
          </BorderBoxBodySummary>
        </header>

        {/* body */}
        <div>deneme</div>
      </BorderBoxBody>
    </BorderBox>
  );
}
