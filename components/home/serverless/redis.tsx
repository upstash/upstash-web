import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/home/border-box";
import Button from "@/components/button";
import React from "react";

export default function ServerlessRedis() {
  return (
    <BorderBox className="col-span-2 from-red-300/20">
      <BorderBoxBody className="overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-red-500 to-transparent opacity-10" />

        <header>
          <BorderBoxBodyTitle>Redis</BorderBoxBodyTitle>
          <BorderBoxBodySummary>
            The data is replicated across multiple regions
          </BorderBoxBodySummary>
        </header>

        <Button
          href={"/docs/redis"}
          className="mt-auto justify-between hover:bg-[#E5484D] hover:text-white"
          type="button"
        >
          Read the docs
        </Button>
      </BorderBoxBody>
    </BorderBox>
  );
}
