import { LogoBranch } from "../customers/logo-branch";
import { LogoClickfunnels } from "../customers/logo-clickfunnels";
import { LogoDropee } from "../customers/logo-dropee";
import { LogoDubsh } from "../customers/logo-dubsh";
import { LogoGail } from "../customers/logo-gail";
import { LogoHumata } from "../customers/logo-humata";
import { LogoMaker } from "../customers/logo-maker";
import { LogoMarkprompt } from "../customers/logo-markprompt";
import { LogoNiftykit } from "../customers/logo-niftykit";
import { LogoOpenart } from "../customers/logo-openart";
import { LogoPaulSmith } from "../customers/logo-paul-smith";
import { LogoTFashion } from "../customers/logo-tfashion";
import { LogoZapier } from "../customers/logo-zapier";

const blogLogos = {
  branch: LogoBranch,
  dub: LogoDubsh,
  dropee: LogoDropee,
  humata: LogoHumata,
  maker: LogoMaker,
  markprompt: LogoMarkprompt,
  openart: LogoOpenart,
  niftykit: LogoNiftykit,
  tfashion: LogoTFashion,
  zapier: LogoZapier,
  gail: LogoGail,
  ["paul-smith"]: LogoPaulSmith,
  clickfunnels: LogoClickfunnels,
} as const;

export const getBlogLogo = (name: string) => {
  const logo = blogLogos[name as keyof typeof blogLogos];
  if (!logo) throw new Error(`Unknown logo: ${name}`);
  return logo;
};
