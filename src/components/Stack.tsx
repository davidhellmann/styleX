import * as stylex from "@stylexjs/stylex";
import type { HTMLAttributes, ReactNode } from "react";
import { space } from "../styles/tokens.stylex";

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
      {...stylex.props(styles.root, directionStyles[direction], gapStyles[gap], wrap && styles.wrap, xstyle)}
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

const directionStyles = {
  column: styles.column,
  row: styles.row,
} satisfies Record<StackDirection, stylex.StyleXStyles>;

const gapStyles = {
  lg: styles.gapLg,
  md: styles.gapMd,
  sm: styles.gapSm,
  xl: styles.gapXl,
  xs: styles.gapXs,
} satisfies Record<StackGap, stylex.StyleXStyles>;
