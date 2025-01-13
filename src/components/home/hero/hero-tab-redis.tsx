import {
  HeroTabFeatureBullet,
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import CodeRedis from "@/components/home/serverless/code-redis";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import React from "react";

export function HeroTabRedis() {
  return (
    <>
      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>
          Highly Available, <br /> Infinitely Scalable
        </HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            99.99% uptime guarantee
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Automatic scaling to meet your demands
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            No server management required
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>
          Global <br /> Low Latency
        </HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Lightning-fast response times worldwide
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Multi-region replication options
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Optimize for your users, wherever they are
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>
          Durable, <br /> Persistent Storage
        </HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            In-memory speed with disk-like persistence
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Data safety without sacrificing performance
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Automatic backups
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <CodeRedis />
    </>
  );
}
