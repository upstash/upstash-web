"use client";

import { useState } from "react";
import ExampleFilter, { Frameworks, Products, UseCases } from "./filter";
import { Example } from "./comp";
import Data from "./data";

export default function HomePage() {
  const [product, setProduct] = useState<"all" | Products>("all");
  const [useCase, setUseCase] = useState<"all" | UseCases>("all");
  const [framework, setFramework] = useState<"all" | Frameworks>("all");

  const data = Data.filter((item) => {
    if (product !== "all" && !item.products.includes(product)) return false;
    if (useCase !== "all" && !item.use_cases.includes(useCase)) return false;
    if (framework !== "all" && !item.frameworks.includes(framework))
      return false;
    return true;
  });

  return (
    <>
      <div>
        <ExampleFilter
          product={product}
          setProduct={setProduct}
          useCase={useCase}
          setUseCase={setUseCase}
          framework={framework}
          setFramework={setFramework}
        />
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3 md:gap-6">
        {data.map((item) => (
          <Example key={item.title} products={item.products}>
            <Example.Title>{item.title}</Example.Title>
            <Example.Description>{item.description}</Example.Description>
            <Example.Products />
            <Example.Link>
              {item.github_url && (
                <Example.LinkItem href={item.github_url}>
                  View Repo
                </Example.LinkItem>
              )}
              {item.blog_url && (
                <Example.LinkItem href={item.blog_url}>
                  Read Post
                </Example.LinkItem>
              )}
            </Example.Link>
          </Example>
        ))}
      </div>
    </>
  );
}
