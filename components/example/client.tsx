"use client";

import { useState } from "react";
import ExampleFilter from "./filter";
import { Example as Box } from "./comp";
import { allExamples, Example } from "contentlayer/generated";

export default function HomePage() {
  const [selectedProducts, setSelectedProduct] = useState<string[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<string[]>([]);
  const [selectedStacks, setSelectedStack] = useState<string[]>([]);

  const data = allExamples.filter((item: Example) => {
    // filter
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
        />
      </div>

      <div className="grid gap-4 grow sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {data.map((item) => (
          <Box key={item.title} products={item.products}>
            <Box.Products />
            <Box.Title>{item.title}</Box.Title>
            <Box.Link>
              <Box.LinkItem href={item.github_url}>Code</Box.LinkItem>
              <Box.LinkItem href={item.blog_url}>Read</Box.LinkItem>
            </Box.Link>
          </Box>
        ))}
      </div>
    </div>
  );
}
