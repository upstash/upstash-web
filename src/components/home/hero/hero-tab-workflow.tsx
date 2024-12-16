import {
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import CodeWorkflow from "@/components/home/serverless/code-workflow";
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
            Serverless <br /> Function Orchestration
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Effortlessly coordinate complex serverless workflows
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Integrate and manage multiple functions with ease
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Streamline your serverless architecture
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont className="bg-purple-900/10">
          <HeroTabFeatureTitle className="text-purple-700">
            Eliminate <br /> Function Timeouts
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Execute long-running processes without constraints
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              No more arbitrary time limits on your operations
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Focus on your logic, not on timing workarounds
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont className="bg-purple-900/10">
          <HeroTabFeatureTitle className="text-purple-700">
            Automatic <br /> Error Recovery
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <IconCircle1
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Built-in resilience for your workflows
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle2
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Automatically retry failed steps
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <IconCircle3
                size={24}
                stroke={2}
                className="shrink-0 text-purple-700"
              />
              Ensure robust execution even in unpredictable environments
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>
      </div>

      <div className="code-workflow w-full rounded-2xl bg-bg">
        <CodeWorkflow />
      </div>
    </div>
  );
}
