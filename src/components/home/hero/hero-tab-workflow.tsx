import {
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import CodeRedis from "@/components/home/serverless/code-redis";
import cx from "@/utils/cx";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import React from "react";

export function HeroTabWorkflow({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cx(
        "grid place-items-center gap-8 rounded-4xl p-10",
        "bg-purple-50 text-purple-950",
        className,
      )}
      {...props}
    >
      {/* bullets */}
      <div className="grid w-full gap-8 md:grid-cols-3">
        <HeroTabFeatureCont className="bg-purple-900/10">
          <HeroTabFeatureTitle className="text-purple-700">
            Highly Available, <br /> Infinitely Scalable
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              99.99% uptime guarantee
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Automatic scaling to meet your demands
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              No server management required
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont className="bg-purple-900/10">
          <HeroTabFeatureTitle className="text-purple-700">
            Global <br /> Low Latency
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Lightning-fast response times worldwide
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Multi-region replication options
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Optimize for your users, wherever they are
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont className="bg-purple-900/10">
          <HeroTabFeatureTitle className="text-purple-700">
            Durable, <br /> Persistent Storage
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              In-memory speed with disk-like persistence
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Data safety without sacrificing performance
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Automatic backups
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>
      </div>

      <div className="w-full rounded-2xl bg-bg">
        <div className="min-h-full rounded-2xl bg-purple-950/30 p-8">
          <CodeRedis />
        </div>
      </div>
    </div>
  );
}
