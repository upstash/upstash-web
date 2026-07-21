import cx from "@/utils/cx";

// Clay ships no monochrome vector (its mark is a colored 3D claymation icon),
// so we use a grayscale PNG — dark-text variant on light mode, white-text on dark.
export const LogoClay = ({ className, style }: React.SVGProps<SVGSVGElement>) => (
  <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/customer/clay-gray.png"
      alt="Clay"
      width={1018}
      height={326}
      style={style}
      className={cx(className, "dark:hidden")}
    />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/customer/clay-gray-dark.png"
      alt="Clay"
      width={1018}
      height={326}
      style={style}
      className={cx(className, "hidden dark:block")}
    />
  </>
);
