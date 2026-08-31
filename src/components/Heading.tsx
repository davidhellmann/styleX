import * as stylex from "@stylexjs/stylex";
import type { HTMLAttributes, ReactNode } from "react";
import { colors, fonts, leading, text, weights } from "../styles/tokens.stylex";

export type HeadingPreset = "display" | "page" | "section" | "subsection";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type HeadingProps = Omit<HTMLAttributes<HTMLElement>, "className" | "style"> & {
  as?: HeadingTag;
  children: ReactNode;
  preset?: HeadingPreset;
  tone?: "default" | "muted" | "accent";
  xstyle?: stylex.StyleXStyles;
};

const defaultTags: Record<HeadingPreset, HeadingTag> = {
  display: "h1",
  page: "h1",
  section: "h2",
  subsection: "h3",
};

export function Heading({
  as,
  children,
  preset = "section",
  tone = "default",
  xstyle,
  ...rest
}: HeadingProps) {
  const Tag = as ?? defaultTags[preset];

  return (
    <Tag
      {...rest}
      {...stylex.props(
        styles.root,
        preset === "display" && styles.display,
        preset === "page" && styles.page,
        preset === "section" && styles.section,
        preset === "subsection" && styles.subsection,
        tone === "default" && styles.defaultTone,
        tone === "muted" && styles.mutedTone,
        tone === "accent" && styles.accentTone,
        xstyle,
      )}
    >
      {children}
    </Tag>
  );
}

const styles = stylex.create({
  root: {
    fontFamily: fonts.display,
    fontStyle: "normal",
    margin: 0,
    minWidth: 0,
    overflowWrap: "anywhere",
  },
  display: {
    fontSize: "clamp(3rem, 9vw, 7rem)",
    fontWeight: weights.regular,
    letterSpacing: "-0.045em",
    lineHeight: leading.tight,
  },
  page: {
    fontSize: text.xxxl,
    fontWeight: weights.regular,
    letterSpacing: "-0.035em",
    lineHeight: leading.tight,
  },
  section: {
    fontSize: text.xl,
    fontWeight: weights.bold,
    letterSpacing: "-0.025em",
    lineHeight: leading.tight,
  },
  subsection: {
    fontSize: text.lg,
    fontWeight: weights.bold,
    letterSpacing: "-0.015em",
    lineHeight: leading.heading,
  },
  defaultTone: { color: colors.textDefault },
  mutedTone: { color: colors.textMuted },
  accentTone: { color: colors.linkDefault },
});
