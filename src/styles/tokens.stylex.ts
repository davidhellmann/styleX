import * as stylex from "@stylexjs/stylex";

/** Primitive values are useful for rare one-off recipes. Components should prefer `colors`. */
export const palette = stylex.defineVars({
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
 * Keep these as external CSS variable references via `stylex.defineConsts()`.
 * `defineConsts()` preserves the custom-property names when StyleX compiles them,
 * so they resolve on the styled element and follow nested themes and contexts.
 * `defineVars()` would instead declare inheritable aliases on `:root`.
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

export const fonts = stylex.defineVars({
  body: "var(--font-family-body)",
  display: "var(--font-family-display)",
  ui: "var(--font-family-ui)",
  code: "var(--font-family-code)",
  accent: "var(--font-family-accent)",
});

export const weights = stylex.defineVars({
  regular: "var(--font-weight-regular)",
  medium: "var(--font-weight-medium)",
  semibold: "var(--font-weight-semibold)",
  bold: "var(--font-weight-bold)",
});

export const leading = stylex.defineVars({
  tight: "var(--line-height-tight)",
  heading: "var(--line-height-heading)",
  body: "var(--line-height-body)",
  ui: "var(--line-height-ui)",
});

export const text = stylex.defineVars({
  xs: "var(--font-size-xs)",
  sm: "var(--font-size-sm)",
  md: "var(--font-size-md)",
  lg: "var(--font-size-lg)",
  xl: "var(--font-size-xl)",
  xxl: "var(--font-size-2xl)",
  xxxl: "var(--font-size-3xl)",
});

export const space = stylex.defineVars({
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

export const motion = stylex.defineVars({
  instant: "var(--duration-instant)",
  fast: "var(--duration-fast)",
  default: "var(--duration-default)",
  slow: "var(--duration-slow)",
  standard: "var(--easing-standard)",
  enter: "var(--easing-enter)",
  exit: "var(--easing-exit)",
});

export const transitions = stylex.defineVars({
  interactive: "var(--transition-interactive)",
});

export const radii = stylex.defineVars({
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  round: "var(--radius-round)",
});

export const shadows = stylex.defineVars({
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  raisedDefault: "var(--shadow-raised-default)",
  overlayDefault: "var(--shadow-overlay-default)",
  sunkenDefault: "var(--shadow-sunken-default)",
});

export const aspects = stylex.defineVars({
  square: "var(--aspect-square)",
  portrait: "var(--aspect-portrait)",
  landscape: "var(--aspect-landscape)",
  wide: "var(--aspect-wide)",
});

export const animations = stylex.defineVars({
  spin: "var(--animation-spin)",
  enter: "var(--animation-enter)",
});

/** CSS variables cannot be media-query conditions, so StyleX conditions mirror the CSS token values. */
export const breakpoints = {
  sm: "@media (min-width: 30rem)",
  md: "@media (min-width: 48rem)",
  lg: "@media (min-width: 64rem)",
  xl: "@media (min-width: 80rem)",
  xxl: "@media (min-width: 96rem)",
} as const;
