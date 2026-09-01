export type Theme = "paper" | "ocean";
export type ColorContext = "canvas" | "surface" | "floating";

// Add ColorScheme after every theme supplies light-dark() values.

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
 *   className="rounded-md border border-border bg-background p-md"
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
