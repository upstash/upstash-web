import { ServerlessBox, ServerlessSummary, ServerlessTitle } from "./comp";
import Button from "@/components/button";
import React from "react";

export default function ServerlessRedis() {
  return (
    <ServerlessBox className="col-span-2 from-red-300/20">
      <header>
        <ServerlessTitle>Redis</ServerlessTitle>
        <ServerlessSummary>
          The data is replicated across multiple regions
        </ServerlessSummary>
      </header>

      <Button
        href={"/docs/redis"}
        className="mt-auto justify-between group-hover/box-body:bg-[#E5484D] group-hover/box-body:text-white"
        type="button"
      >
        Read the docs
      </Button>
    </ServerlessBox>
  );
}
