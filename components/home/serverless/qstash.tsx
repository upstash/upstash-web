import {
  BorderBox,
  BorderBoxBG,
  BorderBoxSummary,
  BorderBoxTitle,
} from "@/components/home/border-box";
import Button from "@/components/button";

export default function ServerlessQStash() {
  return (
    <BorderBox className="col-span-2 from-purple-300/20">
      <BorderBoxBG className="from-purple-500" />

      <header>
        <BorderBoxTitle>QStash</BorderBoxTitle>
        <BorderBoxSummary>
          The data is replicated across multiple regions
        </BorderBoxSummary>
      </header>

      <Button
        href={"/docs/redis"}
        className="mt-auto justify-between hover:bg-[#6E56CF] hover:text-white"
        type="button"
      >
        Read the docs
      </Button>
    </BorderBox>
  );
}
