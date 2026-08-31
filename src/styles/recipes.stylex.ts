import * as stylex from "@stylexjs/stylex";
import { colors, motion, space } from "./tokens.stylex";

export const layout = stylex.create({
  fluidGrid: {
    columnGap: space.gutter,
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    marginInline: "auto",
    maxWidth: "96rem",
    paddingInline: space.gutter,
    width: "100%",
  },
  spanFull: {
    gridColumn: "1 / -1",
  },
  spanContent: {
    gridColumn: {
      default: "1 / -1",
      "@media (min-width: 48rem)": "2 / -2",
    },
  },
  spanPopout: {
    gridColumn: "1 / -1",
  },
  spanSmall: {
    gridColumn: {
      default: "1 / -1",
      "@media (min-width: 48rem)": "4 / span 6",
      "@media (min-width: 64rem)": "5 / span 4",
    },
  },
  spanNarrow: {
    gridColumn: {
      default: "1 / -1",
      "@media (min-width: 48rem)": "3 / span 8",
      "@media (min-width: 64rem)": "4 / span 6",
    },
  },
  spanWide: {
    gridColumn: {
      default: "1 / -1",
      "@media (min-width: 48rem)": "2 / span 10",
      "@media (min-width: 64rem)": "3 / span 8",
    },
  },
  ruleTop: {
    borderTopColor: colors.borderDefault,
    borderTopStyle: "solid",
    borderTopWidth: "1px",
  },
});

export const interaction = stylex.create({
  quietLink: {
    color: colors.textDefault,
    textDecorationColor: colors.borderDefault,
    textDecorationThickness: "1px",
    textUnderlineOffset: "0.125em",
    transitionDuration: motion.fast,
    transitionProperty: "color, text-decoration-color",
    transitionTimingFunction: motion.standard,
  },
});
