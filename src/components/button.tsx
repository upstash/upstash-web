import cx from "@/utils/cx";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center gap-1 px-4 py-1.5 sm:px-5 sm:py-2 rounded-2xl font-medium transition hover:shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-bg-mute text-text hover:bg-white disabled:bg-white/5 disabled:text-zinc-50",
        primary:
          "bg-primary text-white hover:bg-primary-text disabled:bg-white/5 disabled:text-zinc-50",
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
