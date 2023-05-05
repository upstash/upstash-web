import { TAG_NAMES } from "@/utils/const";
import Link from "next/link";
import cx from "@/utils/cx";

export default function BlogPopularTag({ data }: { data: [string, number][] }) {
  const colors = [
    "bg-rose-300 text-rose-300 hover:text-rose-200",
    "bg-blue-300 text-blue-300 hover:text-blue-200",
    "bg-yellow-300 text-yellow-300 hover:text-yellow-200",
    "bg-emerald-300 text-emerald-300 hover:text-emerald-200",
    "bg-purple-300 text-purple-300 hover:text-purple-200",
    "bg-lime-300 text-lime-300 hover:text-lime-200",
    "bg-fuchsia-300 text-fuchsia-300 hover:text-fuchsia-200",
    "bg-indigo-300 text-indigo-300 hover:text-indigo-200",
    "bg-orange-300 text-orange-300 hover:text-orange-200",
    "bg-cyan-300 text-cyan-300 hover:text-cyan-200",
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
