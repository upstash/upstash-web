import cx from "@/utils/cx";

export default function HomeHeroBg({}: {}) {
  return (
    <div
      className={cx(
        "absolute left-1/2 top-1/2 -z-10 h-[400px] w-full",
        "-translate-x-1/2 -translate-y-1/2",
        "opacity-10 blur-[100px]",
        // default
        "bg-emerald-500",
      )}
    />
  );
}
