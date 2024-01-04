import Image from "next/image";

import { INVESTORS } from "@/utils/investors";

export default function Investors({ short = false }) {
  const DATA = short ? INVESTORS.slice(0, 5) : INVESTORS;

  return (
    <div className="flex flex-wrap justify-center gap-y-10 md:mx-24">
      {DATA.map((investor) => {
        return (
          <a
            key={investor.name}
            target="_blank"
            href={investor.url}
            className="group/investor inline-flex w-1/2 flex-col items-center md:w-1/3"
          >
            <Image
              alt={investor.name}
              src={investor.src}
              width={100}
              height={100}
              className="aspect-square h-[80px] w-[80px] scale-[1.01] rounded-full
                object-cover grayscale transition
                group-hover/investor:mix-blend-normal group-hover/investor:grayscale-0
                md:h-[100px] md:w-[100px]"
            />

            <h4
              className="mt-4 font-display text-xl font-medium transition
            group-hover/investor:text-emerald-400 group-hover/investor:underline"
            >
              {investor.name}
            </h4>
            <p className="opacity-40">{investor.title}</p>
          </a>
        );
      })}
    </div>
  );
}
