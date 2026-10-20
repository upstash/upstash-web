import { LogoBranch } from "../customers/logo-branch";
import { LogoClickfunnels } from "../customers/logo-clickfunnels";
import { LogoDropee } from "../customers/logo-dropee";
import { LogoDubsh } from "../customers/logo-dubsh";
import { LogoGitbook } from "../customers/logo-gitbook";
import { LogoJuicebox } from "../customers/logo-juicebox";
import { LogoMaker } from "../customers/logo-maker";
import { LogoNavattic } from "../customers/logo-navattic";
import { LogoNousResearch } from "../customers/logo-nous-research";
import { LogoOkara } from "../customers/logo-okara";
import { LogoOpenart } from "../customers/logo-openart";
import { LogoPaulSmith } from "../customers/logo-paul-smith";
import { LogoStreamlined } from "../customers/logo-streamlined";
import { LogoSupabase } from "../customers/logo-supabase";
import { LogoTheMet } from "../customers/logo-the-met";
import { LogoZapier } from "../customers/logo-zapier";

const blogLogos = {
  branch: LogoBranch,
  dub: LogoDubsh,
  dropee: LogoDropee,
  maker: LogoMaker,
  juicebox: LogoJuicebox,
  navattic: LogoNavattic,
  gitbook: LogoGitbook,
  okara: LogoOkara,
  openart: LogoOpenart,
  zapier: LogoZapier,
  ["paul-smith"]: LogoPaulSmith,
  clickfunnels: LogoClickfunnels,
  streamlined: LogoStreamlined,
  ["the-met"]: LogoTheMet,
  ["nous-research"]: LogoNousResearch,
  supabase: LogoSupabase,
} as const;

export const getBlogLogo = (name: string) => {
  const logo = blogLogos[name as keyof typeof blogLogos];
  if (!logo) throw new Error(`Unknown logo: ${name}`);
  return logo;
};
