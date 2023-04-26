import {
  BorderBox,
  BorderBoxBody,
  BorderBoxBodySummary,
  BorderBoxBodyTitle,
} from "@/components/home/border-box";
import cx from "@/utils/cx";
import Button from "@/components/button";
import React from "react";

export default function ServerlessKafka() {
  return (
    <BorderBox className="col-span-2 from-blue-300/20">
      <BorderBoxBody className="overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-blue-500 to-transparent opacity-10" />

        <header>
          <BorderBoxBodyTitle>Kafka</BorderBoxBodyTitle>
          <BorderBoxBodySummary>
            The data is replicated across multiple regions
          </BorderBoxBodySummary>
        </header>

        <Button
          href={"/docs/redis"}
          className="mt-auto justify-between hover:bg-[#0090FF] hover:text-white"
          type="button"
        >
          Read the docs
        </Button>
      </BorderBoxBody>
    </BorderBox>
  );
}
