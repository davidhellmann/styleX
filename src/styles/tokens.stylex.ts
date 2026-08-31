import * as stylex from "@stylexjs/stylex";

/**
 * Typed keys for custom properties owned by the CSS Foundation.
 * `defineConsts()` keeps the original custom-property references in compiled
 * declarations instead of creating a second, generated variable namespace.
 */

/** Primitive values are useful for rare one-off recipes. Callers should prefer `colors`. */
export const palette = stylex.defineConsts({
  neutral000: "var(--color-neutral-000)",
  neutral050: "var(--color-neutral-050)",
  neutral100: "var(--color-neutral-100)",
  neutral200: "var(--color-neutral-200)",
  neutral300: "var(--color-neutral-300)",
  neutral500: "var(--color-neutral-500)",
  neutral700: "var(--color-neutral-700)",
  neutral800: "var(--color-neutral-800)",
  neutral900: "var(--color-neutral-900)",
  neutral950: "var(--color-neutral-950)",
  ocean050: "var(--color-ocean-050)",
  ocean500: "var(--color-ocean-500)",
  ocean950: "var(--color-ocean-950)",
  orange500: "var(--color-orange-500)",
  yellow300: "var(--color-yellow-300)",
});

/**
 * Contextual runtime colors.
 *
 * These resolve on the styled element, so nested Themes and Color contexts
 * continue to follow the nearest inherited custom-property values.
 */
export const colors = stylex.defineConsts({
  fillDefault: "var(--color-fill-default)",
  fillMuted: "var(--color-fill-muted)",
  textDefault: "var(--color-text-default)",
  textMuted: "var(--color-text-muted)",
  linkDefault: "var(--color-link-default)",
  linkHover: "var(--color-link-hover)",
  linkActive: "var(--color-link-active)",
  linkVisited: "var(--color-link-visited)",
  borderDefault: "var(--color-border-default)",
  focusDefault: "var(--color-focus-default)",
  dangerDefault: "var(--color-danger-default)",
  successDefault: "var(--color-success-default)",
  backdropFillDefault: "var(--color-backdrop-fill-default)",
  transparent: "var(--color-transparent)",
  current: "var(--color-current)",
});

export const fonts = stylex.defineConsts({
  body: "var(--font-family-body)",
  display: "var(--font-family-display)",
  ui: "var(--font-family-ui)",
  code: "var(--font-family-code)",
  accent: "var(--font-family-accent)",
});

export const weights = stylex.defineConsts({
  regular: "var(--font-weight-regular)",
  medium: "var(--font-weight-medium)",
  semibold: "var(--font-weight-semibold)",
  bold: "var(--font-weight-bold)",
});

export const leading = stylex.defineConsts({
  tight: "var(--line-height-tight)",
  heading: "var(--line-height-heading)",
  body: "var(--line-height-body)",
  ui: "var(--line-height-ui)",
});

export const text = stylex.defineConsts({
  xs: "var(--font-size-xs)",
  sm: "var(--font-size-sm)",
  md: "var(--font-size-md)",
  lg: "var(--font-size-lg)",
  xl: "var(--font-size-xl)",
  xxl: "var(--font-size-2xl)",
  xxxl: "var(--font-size-3xl)",
});

export const space = stylex.defineConsts({
  xxxs: "var(--space-3xs)",
  xxs: "var(--space-2xs)",
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)",
  xxl: "var(--space-2xl)",
  xxxl: "var(--space-3xl)",
  fourXl: "var(--space-4xl)",
  gutter: "var(--space-gutter)",
  section: "var(--space-section)",
  safeBottom: "var(--space-safe-bottom)",
});

export const motion = stylex.defineConsts({
  instant: "var(--duration-instant)",
  fast: "var(--duration-fast)",
  default: "var(--duration-default)",
  slow: "var(--duration-slow)",
  standard: "var(--easing-standard)",
  enter: "var(--easing-enter)",
  exit: "var(--easing-exit)",
});

export const transitions = stylex.defineConsts({
  interactive: "var(--transition-interactive)",
});

export const radii = stylex.defineConsts({
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  round: "var(--radius-round)",
});

export const shadows = stylex.defineConsts({
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  raisedDefault: "var(--shadow-raised-default)",
  overlayDefault: "var(--shadow-overlay-default)",
  sunkenDefault: "var(--shadow-sunken-default)",
});

export const aspects = stylex.defineConsts({
  square: "var(--aspect-square)",
  portrait: "var(--aspect-portrait)",
  landscape: "var(--aspect-landscape)",
  wide: "var(--aspect-wide)",
});

/** CSS variables cannot be media-query conditions, so StyleX conditions mirror the CSS token values. */
export const breakpoints = {
  sm: "@media (min-width: 30rem)",
  md: "@media (min-width: 48rem)",
  lg: "@media (min-width: 64rem)",
  xl: "@media (min-width: 80rem)",
  xxl: "@media (min-width: 96rem)",
} as const;
