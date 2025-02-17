import {
  HeroTabFeatureBullet,
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import CodeWorkflow from "@/components/home/serverless/code-workflow";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import React from "react";

export function HeroTabWorkflow() {
  return (
    <>
      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>
          Serverless <br className="hidden sm:block" /> Function Orchestration
        </HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Coordinate complex serverless workflows
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Integrate and manage multiple functions with ease
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Streamline your serverless architecture
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>
          Eliminate <br className="hidden sm:block" /> Function Timeouts
        </HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Execute long-running processes without constraints
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            No more arbitrary time limits on your operations
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Focus on your logic, not on timing workarounds
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>
          Automatic <br className="hidden sm:block" /> Error Recovery
        </HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Built-in resilience for your workflows
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Automatically retry failed steps
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Ensure robust execution even in unpredictable environments
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <CodeWorkflow />
    </>
  );
}
