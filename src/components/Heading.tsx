import type { HTMLAttributes, ReactNode } from "react";
import { tv } from "tailwind-variants";

export type HeadingPreset = "display" | "page" | "section" | "subsection";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export type HeadingProps = HTMLAttributes<HTMLElement> & {
  as?: HeadingTag;
  children: ReactNode;
  preset?: HeadingPreset;
  tone?: "default" | "muted" | "accent";
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
  className,
  preset = "section",
  style,
  tone = "default",
  ...rest
}: HeadingProps) {
  const Tag = as ?? defaultTags[preset];

  return (
    <Tag className={headingVariants({ className, preset, tone })} style={style} {...rest}>
      {children}
    </Tag>
  );
}

const headingVariants = tv({
  base: "m-0 min-w-0 font-display not-italic [overflow-wrap:anywhere]",
  variants: {
    preset: {
      display: "text-[length:clamp(3rem,9vw,7rem)] font-normal leading-tight tracking-[-0.045em]",
      page: "text-3xl font-normal leading-tight tracking-tight",
      section: "text-xl font-bold leading-tight tracking-[-0.025em]",
      subsection: "text-lg font-bold leading-heading tracking-[-0.015em]",
    },
    tone: {
      default: "text-foreground",
      muted: "text-foreground-muted",
      accent: "text-link",
    },
  },
  defaultVariants: {
    preset: "section",
    tone: "default",
  },
});
