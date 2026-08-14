import { IconArrowRight } from "@tabler/icons-react";

export const SkillsBanner = () => {
  return (
    <a
      href="https://github.com/upstash/skills"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-9 w-full items-center justify-center gap-1.5 border-b border-emerald-500/20 bg-emerald-50 px-4 text-[13px] leading-none text-emerald-950 transition-colors hover:bg-emerald-100 md:text-sm dark:bg-[#01110d] dark:text-emerald-100 dark:hover:bg-emerald-950"
    >
      <span className="shrink-0 font-medium">New:</span>
      <span className="truncate underline decoration-emerald-600/40 underline-offset-4 transition-colors group-hover:decoration-emerald-600 dark:decoration-emerald-400/40 dark:group-hover:decoration-emerald-400">
        Upstash Skills
        <span className="hidden sm:inline">
          {" "}
          — teach your AI coding agent the Upstash SDKs
        </span>
      </span>
      <IconArrowRight
        size={16}
        strokeWidth={1.8}
        className="shrink-0 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
};
