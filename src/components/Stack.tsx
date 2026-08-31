import * as stylex from "@stylexjs/stylex";
import type { HTMLAttributes, ReactNode } from "react";
import { space } from "../styles/tokens.stylex";
import { tvVariants } from "../styles/tvVariants";

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
type StackDirection = "column" | "row";

type StackProps = Omit<HTMLAttributes<HTMLDivElement>, "className" | "style"> & {
  children: ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
  wrap?: boolean;
  xstyle?: stylex.StyleXStyles;
};

export function Stack({
  children,
  direction = "column",
  gap = "md",
  wrap = false,
  xstyle,
  ...rest
}: StackProps) {
  return (
    <div
      {...rest}
      {...stylex.props(...stackVariants({ direction, gap, wrap }), xstyle)}
    >
      {children}
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    minWidth: 0,
  },
  column: {
    flexDirection: "column",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  wrap: {
    flexWrap: "wrap",
  },
  gapXs: { gap: space.xs },
  gapSm: { gap: space.sm },
  gapMd: { gap: space.md },
  gapLg: { gap: space.lg },
  gapXl: { gap: space.xl },
});

const stackVariants = tvVariants({
  base: styles.root,
  variants: {
    direction: {
      column: styles.column,
      row: styles.row,
    },
    gap: {
      xs: styles.gapXs,
      sm: styles.gapSm,
      md: styles.gapMd,
      lg: styles.gapLg,
      xl: styles.gapXl,
    },
    wrap: {
      true: styles.wrap,
      false: null,
    },
  },
  defaultVariants: {
    direction: "column",
    gap: "md",
    wrap: false,
  },
});
