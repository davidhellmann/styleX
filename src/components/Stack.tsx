import type { HTMLAttributes, ReactNode } from "react";
import { tv } from "tailwind-variants";

export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
export type StackDirection = "column" | "row";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
  wrap?: boolean;
};

export function Stack({
  children,
  className,
  direction = "column",
  gap = "md",
  style,
  wrap = false,
  ...rest
}: StackProps) {
  return (
    <div className={stackVariants({ className, direction, gap, wrap })} style={style} {...rest}>
      {children}
    </div>
  );
}

const stackVariants = tv({
  base: "flex min-w-0",
  variants: {
    direction: {
      column: "flex-col",
      row: "flex-row items-center",
    },
    gap: {
      xs: "gap-xs",
      sm: "gap-sm",
      md: "gap-md",
      lg: "gap-lg",
      xl: "gap-xl",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    direction: "column",
    gap: "md",
    wrap: false,
  },
});
