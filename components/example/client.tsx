"use client";

import React, { useState } from "react";
import ExampleFilter from "./filter";
import { Example as Box } from "./comp";
import type { Example } from "@/utils/type";
import { authors } from "@/utils/authors";
import Button from "@/components/button";

type Props = {
  examples: Example[];
  useCases: Record<string, number>;
  stack: Record<string, number>;
};

export const Client: React.FC<Props> = ({ examples, useCases, stack }) => {
  const [selectedProducts, setSelectedProduct] = useState<Example["products"]>(
    []
  );
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [queriedUseCases, setQueriedUseCases] = useState<string[]>(
    Object.keys(useCases)
  );
  const [useCaseQuery, setUseCaseQuery] = useState<string>("");

  const [selectedStacks, setSelectedStack] = useState<string[]>([]);
  const [queriedStacks, setQueriedStacks] = useState<string[]>(
    Object.keys(stack)
  );
  const [stackQuery, setStackQuery] = useState<string>("");

  const [queriedExamples, setQueriedExamples] = useState<Example[]>(examples);
  const [exampleQuery, setExampleQuery] = useState<string>("");

  const handleStackQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    setStackQuery(query);
    const filteredStacks = Object.keys(stack).filter((item) => {
      if (selectedStacks.includes(item)) return false;
      if (query === "") return true;
      return item.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
    const outputStack = selectedStacks.concat(filteredStacks);
    setQueriedStacks(outputStack);
  };

  const handleUseCaseQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setUseCaseQuery(e.target.value);

    const filteredUseCase = Object.keys(useCases).filter((item) => {
      if (selectedUseCases.includes(item)) return false;
      if (query === "") return true;
      return item.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
    const outputUseCase = selectedUseCases.concat(filteredUseCase);
    setQueriedUseCases(outputUseCase);
  };

  const handleExampleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setExampleQuery(query);

    const filteredExamples = examples.filter((item) => {
      if (query === "") return true;
      return item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
    setQueriedExamples(filteredExamples);
  };

  const data = queriedExamples.filter((item: Example) => {
    /**
     * Filter out other products
     */
    if (
      selectedProducts.length > 0 &&
      !item.products.some((p) => selectedProducts.includes(p))
    ) {
      return false;
    }
    /**
     * Filter out other stacks
     */
    if (
      selectedStacks.length > 0 &&
      !item.stack.some((s) => selectedStacks.includes(s))
    ) {
      console.log("filtering out due to stack", item);
      return false;
    }
    /**
     * Filter out other usecases
     */
    if (
      selectedUseCases.length > 0 &&
      !item.useCases.some((uc) => selectedUseCases.includes(uc))
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="grid items-start gap-4 text-left sm:auto-cols-[1fr_4fr] sm:auto-cols-[1fr_4fr] sm:grid-flow-col  sm:gap-10 lg:flex-row lg:items-start lg:gap-10">
      <div className="mt-2  sm:mt-[4.5rem] lg:w-[100%] xl:w-[100%]">
        <ExampleFilter
          selectedProducts={selectedProducts}
          setSelectedProduct={setSelectedProduct}
          selectedUseCase={selectedUseCases}
          setSelectedUseCase={setSelectedUseCases}
          selectedStacks={selectedStacks}
          setSelectedStack={setSelectedStack}
          queriedStacks={queriedStacks}
          handleStackQuery={handleStackQuery}
          stackQuery={stackQuery}
          queriedUseCases={queriedUseCases}
          handleUseCaseQuery={handleUseCaseQuery}
          useCaseQuery={useCaseQuery}
        />
      </div>
      <div className="grid grid-flow-row auto-rows-[6_min]">
        <div className="flex w-[100%] flex-col gap-4 border-b border-b-white/5  sm:flex-row sm:justify-between sm:py-4">
          <Button
            href="https://github.com/upstash/examples#contributing"
            className="rounded bg-white/10 text-white "
            type="button"
          >
            Contribute
          </Button>
          <input
            type="search"
            className="text:white focus:border-1 border-1 w-[100%] rounded border-white/5 bg-white/10  px-4 py-2 text-slate-100 transition ease-in-out focus:border-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 sm:w-[31.25%] sm:text-sm"
            value={exampleQuery}
            placeholder="Search for an example..."
            onChange={(e) => {
              handleExampleQuery(e);
            }}
          />
        </div>
        <div className="grid grow gap-4 py-3.5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {data.map((item) => {
            const author = authors[item.author] ?? {
              name: item.author,
              image: `https://github.com/${item.author}.png`,
            };

            return (
              <Box
                key={item.title}
                title={item.title}
                products={item.products}
                author={author}
                stack={item.stack}
                selectedStacks={selectedStacks}
                setSelectedStacks={setSelectedStack}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
