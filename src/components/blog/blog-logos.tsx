import { LogoBranch } from "../customers/logo-branch";
import { LogoDubsh } from "../customers/logo-dubsh";
import { LogoGail } from "../customers/logo-gail";
import { LogoHumata } from "../customers/logo-humata";
import { LogoMaker } from "../customers/logo-maker";
import { LogoMarkprompt } from "../customers/logo-markprompt";
import { LogoNiftykit } from "../customers/logo-niftykit";
import { LogoPrelude } from "../customers/logo-prelude";
import { LogoTFashion } from "../customers/logo-tfashion";
import { LogoZapier } from "../customers/logo-zapier";

const blogLogos = {
  branch: LogoBranch,
  dub: LogoDubsh,
  humata: LogoHumata,
  maker: LogoMaker,
  markprompt: LogoMarkprompt,
  niftykit: LogoNiftykit,
  prelude: LogoPrelude,
  tfashion: LogoTFashion,
  zapier: LogoZapier,
  gail: LogoGail,
} as const;

export const getBlogLogo = (name: string) => {
  const logo = blogLogos[name as keyof typeof blogLogos];
  if (!logo) throw new Error(`Unknown logo: ${name}`);
  return logo;
};
