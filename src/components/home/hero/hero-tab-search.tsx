import {
  HeroTabFeatureBullet,
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import { CodeSnippetsSearch } from "../serverless/code-snippets-search";

export function HeroTabSearch() {
  return (
    <>
      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>Lightweight & Efficient</HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Set up in minutes
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Plug-and-play AI search with great defaults
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Optimized for speed and simplicity
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>Fast, Relevant Results</HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Combines semantic & full-text search for relevancy
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Understands user search intent
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Smart ranking shows the best matches first
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>Scales Automatically</HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Perfect for serverless and modern stacks like Next.js
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Scales to any data size
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            No infrastructure, clusters or servers to manage
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <CodeSnippetsSearch />
    </>
  );
}
