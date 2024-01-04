import Link from "next/link";

import { TAG_NAMES } from "@/utils/const";
import cx from "@/utils/cx";

export default function BlogPopularTag({ data }: { data: [string, number][] }) {
  const colors = [
    "bg-rose-600 text-rose-800 dark:text-rose-200",
    "bg-blue-600 text-blue-800 dark:text-blue-200",
    "bg-yellow-600 text-yellow-800 dark:text-yellow-200",
    "bg-emerald-600 text-emerald-800 dark:text-emerald-200",
    "bg-purple-600 text-purple-800 dark:text-purple-200",
    "bg-lime-600 text-lime-800 dark:text-lime-200",
    "bg-fuchsia-600 text-fuchsia-800 dark:text-fuchsia-200",
    "bg-indigo-600 text-indigo-800 dark:text-indigo-200",
    "bg-orange-600 text-orange-800 dark:text-orange-200",
    "bg-cyan-600 text-cyan-800 dark:text-cyan-200",
  ];

  return (
    <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
      {data.map(([tag, _], index) => {
        return (
          <Link
            key={tag}
            href={`/blog/tag/${tag}`}
            className={cx(
              "rounded-full bg-opacity-10 px-3 py-2 transition",
              "hover:bg-opacity-20 hover:underline",
              colors[index % colors.length],
            )}
          >
            {TAG_NAMES[tag as keyof typeof TAG_NAMES] || (
              <span className="font-medium capitalize">{tag}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
