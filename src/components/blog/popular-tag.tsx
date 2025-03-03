import { TAG_NAMES } from "@/utils/const";
import cx from "@/utils/cx";
import Link from "next/link";

export default function BlogPopularTag({ data }: { data: [string, number][] }) {
  const colors = [
    "bg-rose-600 text-rose-800 dark:text-rose-400",
    "bg-blue-600 text-blue-800 dark:text-blue-400",
    "bg-yellow-600 text-yellow-800 dark:text-yellow-400",
    "bg-emerald-600 text-emerald-800 dark:text-emerald-400",
    "bg-purple-600 text-purple-800 dark:text-purple-400",
    "bg-lime-600 text-lime-800 dark:text-lime-400",
    "bg-fuchsia-600 text-fuchsia-800 dark:text-fuchsia-400",
    "bg-indigo-600 text-indigo-800 dark:text-indigo-400",
    "bg-orange-600 text-orange-800 dark:text-orange-400",
    "bg-cyan-600 text-cyan-800 dark:text-cyan-400",
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
