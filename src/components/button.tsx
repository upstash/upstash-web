import cx from "@/utils/cx";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition hover:shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-bg-mute shadow-sm text-primary-text hover:bg-emerald-700/20 disabled:bg-white/5 disabled:text-zinc-50",
        defaultDark:
          "bg-emerald-800/20 dark:bg-bg-mute dark:hover:bg-emerald-800/30 text-primary-text hover:bg-emerald-800/30 disabled:bg-white/5 disabled:text-zinc-50",
        primary:
          "bg-primary text-white hover:bg-primary-text disabled:bg-white/5 disabled:text-zinc-50",
        secondary:
          "bg-white text-text dark:text-bg disabled:bg-white/5 disabled:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export default function Button({
  children,
  className,
  variant,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type="button"
      className={cx(buttonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}
