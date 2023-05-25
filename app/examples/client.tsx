"use client";

import { useState } from "react";
import ExampleFilter, { IProducts } from "./filter";
import { Example as Box } from "./comp";
import { allExamples, Example } from "contentlayer/generated";

export default function HomePage() {
  const [product, setProduct] = useState<IProducts[]>([]);
  const [useCase, setUseCase] = useState<string[]>([]);
  const [stack, setStack] = useState<string[]>([]);

  const data = allExamples.filter((item: Example) => {
    // if (product.length && !product.includes(item.products)) return false;
    // if (useCase.length && !useCase.includes(item.use_case)) return false;
    // if (stack.length && !stack.some((s) => item.stack.includes(s))) return false;
    return true;
  });

  return (
    <div className="flex items-start gap-16 text-left">
      <div className="w-1/6">
        <ExampleFilter
          product={product}
          setProduct={setProduct}
          useCase={useCase}
          setUseCase={setUseCase}
          stack={stack}
          setStack={setStack}
        />
      </div>

      <div className="grid grow gap-4 md:grid-cols-3 md:gap-6">
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
