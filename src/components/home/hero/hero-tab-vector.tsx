import {
  HeroTabFeatureBullet,
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import CodeVector from "@/components/home/serverless/code-vector";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import React from "react";

export function HeroTabVector() {
  return (
    <>
      <div className="grid w-full gap-8 md:grid-cols-3">
        <HeroTabFeatureCont>
          <HeroTabFeatureTitle>
            Massive <br /> Scalability
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle1 stroke={1.5} />
              </HeroTabFeatureBullet>
              Effortlessly handle hundreds of millions of vectors
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle2 stroke={1.5} />
              </HeroTabFeatureBullet>
              Seamless scaling as your data grows
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle3 stroke={1.5} />
              </HeroTabFeatureBullet>
              Maintain performance at any scale
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont>
          <HeroTabFeatureTitle>
            Disk-Based <br /> Algorithm for Efficiency
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              <HeroTabFeatureBullet>
                <IconCircle1 stroke={1.5} />
              </HeroTabFeatureBullet>
              Optimize storage and performance
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              {" "}
              <HeroTabFeatureBullet>
                <IconCircle2 stroke={1.5} />
              </HeroTabFeatureBullet>
              Cost-effective solution for large datasets
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              {" "}
              <HeroTabFeatureBullet>
                <IconCircle3 stroke={1.5} />
              </HeroTabFeatureBullet>
              Balance between speed and resource usage
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>

        <HeroTabFeatureCont>
          <HeroTabFeatureTitle>
            Powerful Metadata <br /> Store with SQL Support
          </HeroTabFeatureTitle>
          <HeroTabFeatureUl>
            <HeroTabFeatureLi>
              {" "}
              <HeroTabFeatureBullet>
                <IconCircle1 stroke={1.5} />
              </HeroTabFeatureBullet>
              Rich querying capabilities with familiar SQL syntax
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              {" "}
              <HeroTabFeatureBullet>
                <IconCircle2 stroke={1.5} />
              </HeroTabFeatureBullet>
              Easily combine vector similarity search with metadata filtering
            </HeroTabFeatureLi>
            <HeroTabFeatureLi>
              {" "}
              <HeroTabFeatureBullet>
                <IconCircle3 stroke={1.5} />
              </HeroTabFeatureBullet>
              Flexible data organization and retrieval
            </HeroTabFeatureLi>
          </HeroTabFeatureUl>
        </HeroTabFeatureCont>
      </div>

      <CodeVector />
    </>
  );
}
