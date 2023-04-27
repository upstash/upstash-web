import {
  BorderBox,
  BorderBoxBG,
  BorderBoxSummary,
  BorderBoxTitle,
} from "@/components/home/border-box";
import Button from "@/components/button";

export default function ServerlessKafka() {
  return (
    <BorderBox className="col-span-2 from-blue-300/20">
      {/*<BorderBoxBG className="from-blue-500" />*/}

      <header>
        <BorderBoxTitle>Kafka</BorderBoxTitle>
        <BorderBoxSummary>
          The data is replicated across multiple regions
        </BorderBoxSummary>
      </header>

      <Button
        href={"/docs/redis"}
        className="mt-auto justify-between group-hover/box-body:bg-[#0090FF] group-hover/box-body:text-white"
        type="button"
      >
        Read the docs
      </Button>
    </BorderBox>
  );
}
