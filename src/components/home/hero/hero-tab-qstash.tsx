import {
  HeroTabFeatureBullet,
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import CodeQStash from "@/components/home/serverless/code-qstash";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import React from "react";

export function HeroTabQStash() {
  return (
    <>
      <div className="grid w-full gap-8 md:grid-cols-3">
        <HeroTabFeatureCont>
          <HeroTabFeatureTitle>
            Serverless <br /> Messaging
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle1 stroke={1.5} />
              </HeroTabFeatureBullet>
              Effortless communication between serverless functions
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle2 stroke={1.5} />
              </HeroTabFeatureBullet>
              Decouple your microservices architecture
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle3 stroke={1.5} />
              </HeroTabFeatureBullet>
              Scale your messaging infrastructure without limits
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont>
          <HeroTabFeatureTitle>
            Scheduled Tasks <br /> with CRON
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle1 stroke={1.5} />
              </HeroTabFeatureBullet>
              Easily set up recurring tasks and jobs
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle2 stroke={1.5} />
              </HeroTabFeatureBullet>
              Flexible scheduling with CRON syntax
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle3 stroke={1.5} />
              </HeroTabFeatureBullet>
              Automate your workflows with precision
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont>
          <HeroTabFeatureTitle>
            Intelligent <br /> Retry Mechanism
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle1 stroke={1.5} />
              </HeroTabFeatureBullet>
              Automatically retry failed tasks
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle2 stroke={1.5} />
              </HeroTabFeatureBullet>
              Ensure task completion in unreliable environments
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle3 stroke={1.5} />
              </HeroTabFeatureBullet>
              Configurable retry policies to suit your needs
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>
      </div>

      <CodeQStash />
    </>
  );
}
