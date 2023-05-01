"use client";

import dynamic from "next/dynamic";
import Container from "@/components/container";
import {
  FastCard,
  FastCardTitle,
  FastCardValue,
} from "@/components/home/fast/card";
import { useEffect, useState } from "react";
import { numberFormat } from "@/utils/number-format";
import Link from "next/link";
import Icon, { ICON_NAMES } from "@/components/icon";

const AnimatedGlobe = dynamic(() => import("./globe"), {
  ssr: false,
});

export default function Fast() {
  const [data, setData] = useState({ database: 0, user: 0 });

  useEffect(() => {
    fetch("https://global-proven-finch-31564.upstash.io/hgetall/active_data", {
      headers: {
        Authorization:
          "Bearer AntMASQgYzc5YTMwMmQtMmE1Zi00NDI1LWE5ODctOTlhOTEzMWU1Mjc5_3NQlPMV3SNRmBYHfi62PIe4deMnaBqgQHDXFNL6G7I=",
      },
    })
      .then((response) => response.json())
      .then(({ result }) => {
        const data = { database: 0, user: 0 };
        for (let i = 0; i < result.length; i++) {
          // @ts-ignore
          data[result[i]] = result[i + 1];
          i++;
        }
        setData(data);
      });
  }, []);

  return (
    <section className="relative z-0 -mt-[160px] hidden h-[700px] overflow-hidden md:block">
      {/*  */}

      {/* slogan */}
      <h5 className="absolute inset-x-0 top-[210px] -z-10 select-none font-display text-[14vw] font-bold leading-none opacity-[0.02]">
        Fast Anywhere
      </h5>

      {/* globe */}
      <div className="absolute -top-0 left-1/2 z-0 -translate-x-1/2">
        <AnimatedGlobe />;
      </div>

      {/* bottom-bg */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[200px]
      bg-gradient-to-b from-transparent to-zinc-950"
      />

      {/* data */}
      <div className="group/source-box absolute inset-x-0 bottom-0 z-20">
        <Container className="max-w-screen-md">
          <div className="grid grid-cols-3 rounded-[2.2rem] bg-white/5 px-6 py-4 backdrop-blur md:p-6">
            <FastCard>
              <FastCardValue className="text-emerald-200">
                {numberFormat(data.user)}
              </FastCardValue>
              <FastCardTitle>Users</FastCardTitle>
            </FastCard>
            <FastCard>
              <FastCardValue className="text-emerald-200">
                {numberFormat(data.database)}
              </FastCardValue>
              <FastCardTitle>Databases</FastCardTitle>
            </FastCard>
            <FastCard>
              <FastCardValue className="text-yellow-200">
                ~
                {numberFormat(45000000, {
                  notation: "compact",
                })}
              </FastCardValue>
              <FastCardTitle>Request per week</FastCardTitle>
            </FastCard>
          </div>

          {/* test */}
          <p className="mt-6">
            <Link
              href="/fast"
              className="inline-flex items-center gap-1 opacity-60 transition hover:text-yellow-200
              hover:underline hover:opacity-100
              "
            >
              <Icon icon={ICON_NAMES.Bolt} className="text-2xl" />
              Test the speed!
            </Link>
          </p>
        </Container>
      </div>
    </section>
  );
}
