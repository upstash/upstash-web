"use client";

import React, { useState } from "react";
import ExampleFilter from "./filter";
import { Example as Box } from "./comp";
import type { Example } from "@/app/examples/get-data"
import { authors } from "@/utils/authors";
import Button from "@/components/button";

type Props = {
  examples: Example[];
  useCases: Record<string, number>;
  stack: Record<string, number>;
  languages: Record<string, number>;
  platforms: Record<string, number>;
};

export const Client: React.FC<Props> = ({
  examples,
  useCases,
  stack,
  languages,
  platforms,
}) => {
  const [selectedProducts, setSelectedProduct] = useState<Example["products"]>(
    [],
  );
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [queriedUseCases, setQueriedUseCases] = useState<string[]>(
    Object.keys(useCases),
  );

  const [selectedStacks, setSelectedStack] = useState<string[]>([]);
  const [queriedStacks, setQueriedStacks] = useState<string[]>(
    Object.keys(stack),
  );

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [queriedLanguages, setQueriedLanguages] = useState<string[]>(
    Object.keys(languages),
  );

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [queriedPlatforms, setQueriedPlatforms] = useState<string[]>(
    Object.keys(platforms),
  );

  const [queriedExamples, setQueriedExamples] = useState<Example[]>(examples);
  const [exampleQuery, setExampleQuery] = useState<string>("");

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

    /**
     * Filter out other languages
     */
    if (
      selectedLanguages.length > 0 &&
      !item.languages.some((l) => selectedLanguages.includes(l))
    ) {
      return false;
    }

    /**
     * Filter out other platforms
     */

    if (
      selectedPlatforms.length > 0 &&
      !item.platforms?.some((p) => selectedPlatforms.includes(p))
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
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
          queriedStacks={queriedStacks}
          queriedUseCases={queriedUseCases}
          queriedLanguages={queriedLanguages}
          queriedPlatforms={queriedPlatforms}
        />
      </div>
      <div className="grid grid-flow-row auto-rows-[6_min]">
        <div className="flex w-[100%] flex-col gap-4 border-b border-b-white/5  sm:flex-row sm:justify-between sm:py-4">
          <Button
            href="https://github.com/upstash/examples#contributing"
            className="text-white rounded bg-white/10 "
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
