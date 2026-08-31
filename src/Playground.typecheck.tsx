import * as stylex from "@stylexjs/stylex";
import type { PlaygroundProps } from "./Playground";
import { colors, space } from "./styles/tokens.stylex";

const styles = stylex.create({
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
