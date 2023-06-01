"use client";

import React, { useState } from "react";
import ExampleFilter from "./filter";
import { Example as Box } from "./comp";
import type { Example } from "@/utils/type";

type Props = {
  examples: Example[];
  useCases: Record<string, number>;
  stack: Record<string, number>;
};

export const Client: React.FC<Props> = ({ examples, useCases, stack }) => {
  const [selectedProducts, setSelectedProduct] = useState<Example["products"]>(
    []
  );
  const [selectedUseCase, setSelectedUseCase] = useState<string[]>([]);
  const [selectedStacks, setSelectedStack] = useState<string[]>([]);

  const data = examples.filter((item: Example) => {
    // TODO: andreas
    return true;
  });

  return (
    <div className="flex flex-col items-stretch gap-10 text-left lg:flex-row lg:items-start lg:gap-16">
      <div className="lg:w-1/4 xl:w-1/6">
        <ExampleFilter
          selectedProducts={selectedProducts}
          setSelectedProduct={setSelectedProduct}
          selectedUseCase={selectedUseCase}
          setSelectedUseCase={setSelectedUseCase}
          selectedStacks={selectedStacks}
          setSelectedStack={setSelectedStack}
          allStacks={Object.keys(stack)}
          allUseCases={Object.keys(useCases)}
        />
      </div>

      <div className="grid grow gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {data.map((item) => (
          <Box key={item.title} products={item.products}>
            <Box.Products />
            <Box.Title>{item.title}</Box.Title>
            <Box.Link>
              <Box.LinkItem href={item.githubUrl}>Code</Box.LinkItem>
              {/* <Box.LinkItem href={item.blog}>Read</Box.LinkItem> */}
            </Box.Link>
          </Box>
        ))}
      </div>
    </div>
  );
};
