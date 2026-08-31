import * as stylex from "@stylexjs/stylex";
import type { HTMLAttributes, ReactNode } from "react";
import { colors, space } from "./styles/tokens.stylex";

type MarginStyles = Pick<
  stylex.CSSProperties,
  | "margin"
  | "marginBlock"
  | "marginBlockEnd"
  | "marginBlockStart"
  | "marginBottom"
  | "marginInline"
  | "marginInlineEnd"
  | "marginInlineStart"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
>;

export type PlaygroundProps = Omit<HTMLAttributes<HTMLElement>, "className" | "style"> & {
  children?: ReactNode;
  xstyle?: stylex.StyleXStyles<MarginStyles>;
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
  allowedMargin: {
    margin: space.md,
  },
  rejectedPadding: {
    padding: space.md,
  },
  rejectedBackground: {
    backgroundColor: colors.dangerDefault,
  },
});

const allowedXstyle: NonNullable<PlaygroundProps["xstyle"]> = styles.allowedMargin;

// These compile-time contracts fail if Playground.xstyle ever accepts more than margin properties.
// @ts-expect-error Playground.xstyle must not accept padding.
const rejectedPaddingXstyle: NonNullable<PlaygroundProps["xstyle"]> = styles.rejectedPadding;
// @ts-expect-error Playground.xstyle must not accept colors.
const rejectedBackgroundXstyle: NonNullable<PlaygroundProps["xstyle"]> = styles.rejectedBackground;

void allowedXstyle;
void rejectedPaddingXstyle;
void rejectedBackgroundXstyle;
