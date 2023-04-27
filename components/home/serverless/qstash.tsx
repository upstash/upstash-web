import { ServerlessBox, ServerlessSummary, ServerlessTitle } from "./comp";
import Button from "@/components/button";

export default function ServerlessQStash() {
  return (
    <ServerlessBox className="col-span-2 from-purple-300/20">
      <header>
        <ServerlessTitle>QStash</ServerlessTitle>
        <ServerlessSummary>
          The data is replicated across multiple regions
        </ServerlessSummary>
      </header>

      <Button
        href={"/docs/redis"}
        className="mt-auto justify-between group-hover/box-body:bg-[#6E56CF] group-hover/box-body:text-white"
        type="button"
      >
        Read the docs
      </Button>
    </ServerlessBox>
  );
}
