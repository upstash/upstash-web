"use client";

import React, { useState } from "react";
import ExampleFilter from "./filter";
import { Example as Box } from "./comp";
import type { Example } from "@/utils/type";
import authors from "@/utils/authors";

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
  const [selectedStacks, setSelectedStack] = useState<string[]>([]);

  const data = examples.filter((item: Example) => {
    /**
     * Filter out other products
     */
    if (selectedProducts.length > 0 && !item.products.some((p) => selectedProducts.includes(p))) {
      return false
    }
 /**
     * Filter out other stacks
     */
 if (selectedStacks.length > 0 && !item.stack.some((s) => selectedStacks.includes(s))) {
  console.log("filtering out due to stack", item)
  return false
}
/**
     * Filter out other usecases
     */
if (selectedUseCases.length > 0 && !item.useCases.some((uc) => selectedUseCases.includes(uc))) {
  console.log("filtering out due to usecase", item, selectedUseCases)

  return false
}



    
    return true;
  });

  return (
    <div className="flex flex-col items-stretch gap-10 text-left lg:flex-row lg:items-start lg:gap-16">
      <div className="lg:w-1/4 xl:w-1/6">
        <ExampleFilter
          selectedProducts={selectedProducts}
          setSelectedProduct={setSelectedProduct}
          selectedUseCase={selectedUseCases}
          setSelectedUseCase={setSelectedUseCases}
          selectedStacks={selectedStacks}
          setSelectedStack={setSelectedStack}
          allStacks={Object.keys(stack)}
          allUseCases={Object.keys(useCases)}
        />
      </div>

      <div className="grid gap-4 grow sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {data.map((item) => {


          const author = authors[item.author] ?? {
            name: item.author,
            image: `https://github.com/${item.author}.png`
          }

          return (<Box
            key={item.title}
            title={item.title}
            products={item.products}
            author={author}
          />
          )
        })}
      </div>
    </div>
  );
};
