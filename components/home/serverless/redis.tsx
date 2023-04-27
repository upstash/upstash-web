import {
  BorderBox,
  BorderBoxBG,
  BorderBoxSummary,
  BorderBoxTitle,
} from "@/components/home/border-box";
import Button from "@/components/button";
import React from "react";

export default function ServerlessRedis() {
  return (
    <BorderBox className="col-span-2 from-red-300/20">
      <BorderBoxBG className="from-red-500" />

      <header>
        <BorderBoxTitle>Redis</BorderBoxTitle>
        <BorderBoxSummary>
          The data is replicated across multiple regions
        </BorderBoxSummary>
      </header>

      <Button
        href={"/docs/redis"}
        className="mt-auto justify-between hover:bg-[#E5484D] hover:text-white"
        type="button"
      >
        Read the docs
      </Button>
    </BorderBox>
  );
}
