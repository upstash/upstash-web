import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  // classGroups: {
  //   backgroundColor: [
  //     "bg-bg",
  //     "bg-bg-mute",
  //     "bg-primary",
  //     "bg-primary-text",
  //     "bg-text",
  //     "bg-text-mute",
  //     "bg-pre-bg",
  //   ],
  //   textColor: [
  //     "text-bg",
  //     "text-bg-mute",
  //     "text-primary",
  //     "text-primary-text",
  //     "text-text",
  //     "text-text-mute",
  //   ],
  // },
});

export default function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
