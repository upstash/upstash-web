import {
  HeroTabFeatureBullet,
  HeroTabFeatureCont,
  HeroTabFeatureLi,
  HeroTabFeatureTitle,
  HeroTabFeatureUl,
} from "@/components/home/hero/hero-tab";
import { IconCircle1, IconCircle2, IconCircle3 } from "@tabler/icons-react";
import { CodeSnippetsBox } from "../serverless/code-snippets-box";

export function HeroTabBox() {
  return (
    <>
      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>Built for AI Agents</HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Secure, isolated cloud containers
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Built-in Claude Code and Codex agents
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Full shell, filesystem, and git access
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>Durable & Persistent</HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Infinite lifespan with auto freeze/resume
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Persistent storage across sessions
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Usage-based pricing, pay only when active
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <HeroTabFeatureCont>
        <HeroTabFeatureTitle>Scales Seamlessly</HeroTabFeatureTitle>
        <HeroTabFeatureUl>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle1 stroke={1.5} />
            </HeroTabFeatureBullet>
            Serverless, no infrastructure to manage
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle2 stroke={1.5} />
            </HeroTabFeatureBullet>
            Scale to hundreds of boxes instantly
          </HeroTabFeatureLi>
          <HeroTabFeatureLi>
            <HeroTabFeatureBullet>
              <IconCircle3 stroke={1.5} />
            </HeroTabFeatureBullet>
            Multi-agent orchestration support
          </HeroTabFeatureLi>
        </HeroTabFeatureUl>
      </HeroTabFeatureCont>

      <CodeSnippetsBox />
    </>
  );
}
