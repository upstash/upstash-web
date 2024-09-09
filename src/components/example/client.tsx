"use client";

import React, { useState } from "react";

import type { Example } from "@/app/examples/get-data";
import { authors } from "@/utils/authors";

import Button from "@/components/button";

import { Example as Box } from "./comp";
import ExampleFilter from "./filter";

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
    <div className="grid items-start gap-4 text-left sm:auto-cols-[1fr_4fr] sm:grid-flow-col sm:gap-10 lg:flex-row lg:items-start lg:gap-10">
      <div className="mt-2 sm:mt-[4.5rem] lg:w-full">
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
        <div className="flex w-full flex-col gap-6 border-b border-b-white/5 py-4 sm:flex-row sm:justify-between">
          <input
            type="search"
            aria-label="Search"
            className="w-1/2 rounded-full bg-white/5 px-4 py-2 transition placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            value={exampleQuery}
            placeholder="Search for an example..."
            onChange={(e) => {
              handleExampleQuery(e);
            }}
          />

          <Button
            className="hidden sm:flex"
            href="https://github.com/upstash/examples#contributing"
            type="button"
          >
            Contribute
          </Button>
        </div>

        <div className="mt-10 grid grow gap-4 py-4 sm:grid-cols-2 sm:gap-6 md:mt-0">
          {data.map((item) => {
            const author = authors[item.author] ?? {
              name: item.author,
              image: `https://github.com/${item.author}.png`,
            };

            return (
              <Box
                key={item.slug}
                slug={item.slug}
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
