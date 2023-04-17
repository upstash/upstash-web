import { TAG_NAMES } from "@/utils/const";
import Link from "next/link";
import cx from "@/utils/cx";

export default function TagList({ data }: { data: [string, number][] }) {
  const colors = [
    "bg-rose-300 bg-opacity-20 text-rose-200",
    "bg-blue-300 bg-opacity-20 text-blue-200",
    "bg-yellow-300 bg-opacity-20 text-yellow-200",
    "bg-emerald-300 bg-opacity-20 text-emerald-200",
    "bg-purple-300 bg-opacity-20 text-purple-200",
    "bg-lime-300 bg-opacity-20 text-lime-200",
    "bg-indigo-300 bg-opacity-20 text-indigo-200",
    "bg-fuchsia-300 bg-opacity-20 text-fuchsia-200",
    "bg-orange-300 bg-opacity-20 text-orange-200",
    "bg-cyan-300 bg-opacity-20 text-cyan-200",
  ];

  return (
    <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
      {data.map(([tag, _], index) => {
        return (
          <Link
            key={tag}
            href={`/blog/tag/${tag}`}
            className={cx(
              "rounded-xl px-3 py-2 font-medium",
              colors[index % colors.length]
            )}
          >
            {TAG_NAMES[tag as keyof typeof TAG_NAMES] || (
              <span className="capitalize">{tag}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
