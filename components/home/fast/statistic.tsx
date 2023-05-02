"use client";

import {
  FastCard,
  FastCardTitle,
  FastCardValue,
} from "@/components/home/fast/card";
import { useEffect, useState } from "react";
import { numberFormat } from "@/utils/number-format";

export default function FastStatistic() {
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
    <div className="grid grid-cols-4 rounded-[2.2rem] bg-white/5 px-6 py-4 backdrop-blur md:p-6">
      <FastCard>
        <FastCardValue className="text-emerald-300">
          {numberFormat(data.user)}
        </FastCardValue>
        <FastCardTitle>Users</FastCardTitle>
      </FastCard>

      <FastCard>
        <FastCardValue className="text-emerald-300">
          {numberFormat(data.database)}
        </FastCardValue>
        <FastCardTitle>Databases</FastCardTitle>
      </FastCard>

      <FastCard>
        <FastCardValue className="text-yellow-200">
          ~
          {numberFormat(9200000000, {
            notation: "compact",
          })}
        </FastCardValue>
        <FastCardTitle>Request per week</FastCardTitle>
      </FastCard>

      <FastCard>
        <FastCardValue className="text-yellow-200">99.99%</FastCardValue>
        <FastCardTitle>Guaranteed Uptime</FastCardTitle>
      </FastCard>
    </div>
  );
}
