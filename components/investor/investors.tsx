import Link from "next/link";
import { INVESTORS } from "@/utils/investors";
import Image from "next/image";

export default function Investors({ short = false }) {
  const DATA = short ? INVESTORS.slice(0, 5) : INVESTORS;

  return (
    <div className="mt-20 flex flex-wrap justify-center gap-y-10 md:mx-24">
      {DATA.map((investor) => {
        return (
          <Link
            key={investor.name}
            href={investor.url}
            className="group/investor inline-flex w-1/3 flex-col items-center"
          >
            <span className="rounded-full bg-emerald-200">
              <Image
                alt={investor.name}
                src={investor.src}
                width={100}
                height={100}
                className="aspect-square scale-[1.01] rounded-full object-cover
                mix-blend-multiply grayscale transition-all duration-1000
                group-hover/investor:mix-blend-normal group-hover/investor:grayscale-0"
              />
            </span>

            <h4
              className="mt-4 font-display text-xl font-medium
            group-hover/investor:text-emerald-300 group-hover/investor:underline"
            >
              {investor.name}
            </h4>
            <p className="opacity-40">{investor.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
