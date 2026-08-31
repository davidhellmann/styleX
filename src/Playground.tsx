import * as stylex from "@stylexjs/stylex";
import type { HTMLAttributes, ReactNode } from "react";
import { colors, space } from "./styles/tokens.stylex";
import type { MarginStyleProperties } from "./styles/xstyle.types";

export type PlaygroundProps = Omit<HTMLAttributes<HTMLElement>, "className" | "style"> & {
  children?: ReactNode;
  xstyle?: stylex.StyleXStyles<MarginStyleProperties>;
};

export function Playground({ children = "Margin-only xstyle playground", xstyle, ...rest }: PlaygroundProps) {
  return (
    <section {...rest} {...stylex.props(styles.root, xstyle)}>
      {children}
    </section>
  );
}

const styles = stylex.create({
  root: {
    backgroundColor: colors.fillMuted,
    borderColor: colors.borderDefault,
    borderStyle: "solid",
    borderWidth: "1px",
    padding: space.md,
  },
});
