import Link from "next/link";
import { INVESTORS } from "@/utils/investors";
import Container from "@/components/container";
import Image from "next/image";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";

export default function Investors({ fullList = false, ...props }) {
  const DATA = fullList ? INVESTORS : INVESTORS.slice(0, 5);

  return (
    <Container className="max-w-screen-lg">
      {/**/}

      <header>
        <PageHeaderTitle as="h2">Our investors</PageHeaderTitle>
        <PageHeaderDesc className="mt-4">
          We are fortunate to work with some of the best investors in the world.
          Chances are you are already using the products they helped to create.
        </PageHeaderDesc>
      </header>

      <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
        {DATA.map((investor) => {
          return (
            <Link
              key={investor.name}
              href={investor.url}
              className="flex flex-col items-center"
            >
              <Image
                alt={investor.name}
                src={investor.src}
                width={80}
                height={80}
                className="aspect-square rounded-full object-cover"
              />

              <h4 className="mt-4 font-display text-xl font-semibold">
                {investor.name}
              </h4>
              <p className="opacity-60">{investor.title}</p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
