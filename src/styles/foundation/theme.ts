export type Theme = "paper" | "ocean";
export type ColorContext = "canvas" | "surface" | "floating";

// ColorScheme intentionally stays out of the public API until dark theme
// values exist. The CSS contract is structured so it can be added later.

export type ThemeOptions = {
  theme?: Theme;
  colorContext?: ColorContext;
};

/**
 * Returns typed attributes for the inheritable theme context.
 * Visual treatments such as raised, overlay, or sunken stay separate.
 *
 * @example Astro
 * ```astro
 * ---
 * import { themeAttributes } from "../styles/foundation/theme";
 * ---
 *
 * <section {...themeAttributes({ theme: "ocean", colorContext: "canvas" })}>
 *   <article {...themeAttributes({ colorContext: "surface" })}>
 *     Static content
 *   </article>
 * </section>
 * ```
 *
 * @example React
 * ```tsx
 * <div
 *   role="menu"
 *   {...themeAttributes({ theme: "ocean", colorContext: "floating" })}
 *   {...stylex.props(styles.dropdown)}
 * >
 *   Dropdown content
 * </div>
 * ```
 */
export function themeAttributes({ theme, colorContext }: ThemeOptions) {
  return {
    "data-theme": theme,
    "data-color-context": colorContext,
  } as const;
}

export type ThemeAttributes = ReturnType<typeof themeAttributes>;
