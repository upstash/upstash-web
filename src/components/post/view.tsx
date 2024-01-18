"use client";

import { useEffect, useState } from "react";

export default function IncrView({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);

  const increment = async () => {
    const res = await fetch(`/blog/api/incr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json();
    setCount(data.count);
  };

  useEffect(() => {
    increment();
  }, [slug]);

  return (
    <>{Intl.NumberFormat("en-US", { notation: "compact" }).format(count)}</>
  );
}
