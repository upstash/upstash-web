import {
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import CodeQStash from "@/components/home/serverless/code-qstash";
import cx from "@/utils/cx";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import React from "react";

export function HeroTabQStash({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cx(
        "grid place-items-center gap-8 rounded-4xl p-10",
        "bg-blue-50 text-blue-950",
        className,
      )}
      {...props}
    >
      {/* bullets */}
      <div className="grid w-full gap-8 md:grid-cols-3">
        <HeroTabFeatureCont className="bg-blue-900/10">
          <HeroTabFeatureTitle className="text-blue-700">
            Serverless <br /> Messaging
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Effortless communication between serverless functions
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Decouple your microservices architecture
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Scale your messaging infrastructure without limits
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont className="bg-blue-900/10">
          <HeroTabFeatureTitle className="text-blue-700">
            Scheduled Tasks <br /> with CRON
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Easily set up recurring tasks and jobs
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Flexible scheduling with CRON syntax
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Automate your workflows with precision
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont className="bg-blue-900/10">
          <HeroTabFeatureTitle className="text-blue-700">
            Intelligent <br /> Retry Mechanism
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Automatically retry failed tasks
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Ensure task completion in unreliable environments
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-blue-700"
              />
              Configurable retry policies to suit your needs
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>
      </div>

      <div className="code-qstash w-full rounded-2xl bg-bg">
        <CodeQStash />
      </div>
    </div>
  );
}
