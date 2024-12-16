import {
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import CodeVector from "@/components/home/serverless/code-vector";
import cx from "@/utils/cx";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import React from "react";

export function HeroTabVector({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cx(
        "grid place-items-center gap-8 rounded-4xl p-10",
        "bg-orange-50 text-orange-950",
        className,
      )}
      {...props}
    >
      {/* bullets */}
      <div className="grid w-full gap-8 md:grid-cols-3">
        <HeroTabFeatureCont className="bg-orange-900/10">
          <HeroTabFeatureTitle className="text-orange-700">
            Massive <br /> Scalability
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Effortlessly handle hundreds of millions of vectors
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Seamless scaling as your data grows
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Maintain performance at any scale
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont className="bg-orange-900/10">
          <HeroTabFeatureTitle className="text-orange-700">
            Disk-Based <br /> Algorithm for Efficiency
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Optimize storage and performance
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Cost-effective solution for large datasets
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Balance between speed and resource usage
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont className="bg-orange-900/10">
          <HeroTabFeatureTitle className="text-orange-700">
            Powerful Metadata <br /> Store with SQL Support
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Rich querying capabilities with familiar SQL syntax
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Easily combine vector similarity search with metadata filtering
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-orange-700"
              />
              Flexible data organization and retrieval
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>
      </div>

      <div className="code-redis w-full rounded-2xl bg-bg">
        <CodeVector />
      </div>
    </div>
  );
}
