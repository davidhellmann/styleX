# Foundation/X

A small, scalable design-system foundation built from CSS custom properties and a key-typed StyleX bridge.

## The contract

Two independent attributes currently describe a context:

- `data-theme="paper|ocean"` selects visual identity.
- `data-color-context="canvas|surface|floating"` selects the local color context.

They can be placed at any depth. A theme boundary starts at `canvas` unless that same element declares another color context.
The foundation is light-only for now, so `data-color-scheme` is deliberately not part of the runtime or typed attribute contract yet.

```html
<html data-theme="paper">
  <section data-theme="ocean" data-color-context="canvas">
    <article data-color-context="surface">
      <aside data-theme="paper" data-color-context="floating">
        Endless nesting: theme and color context stay local.
      </aside>
    </article>
  </section>
</html>
```

The same typed attribute helper works in Astro and React without introducing a wrapper element.

```astro
---
import { themeAttributes } from "../styles/foundation/theme";
---

<section {...themeAttributes({ theme: "ocean", colorContext: "canvas" })}>
  <article {...themeAttributes({ colorContext: "surface" })}>
    Static content
  </article>
</section>
```

```tsx
<section {...themeAttributes({ theme: "ocean", colorContext: "canvas" })}>
  <article {...themeAttributes({ colorContext: "surface" })}>
    <Button variant="outlined">Same component recipe</Button>
  </article>
</section>
```

`floating` supplies dropdowns, popovers, tooltips, and dialogs with their own theme-dependent colors. `raised`, `overlay`, and `sunken` remain visual treatments. A raised card is still a `surface`; it only composes a shadow recipe. An overlay panel normally composes `colorContext="floating"` with an overlay treatment. Its backdrop does not open a color context and uses `--color-backdrop-fill-default` directly.

## Color naming

Themes own fixed-depth backing slots:

```css
--color-canvas-fill-default;
--color-canvas-text-default;
--color-canvas-text-muted;
--color-canvas-link-default;
--color-canvas-link-hover;
--color-canvas-border-default;
```

The same slots exist for `surface` and `floating`. A `data-color-context` boundary maps them onto the small interface that callers consume:

```css
--color-fill-default;
--color-fill-muted;
--color-text-default;
--color-text-muted;
--color-link-default;
--color-link-hover;
--color-link-active;
--color-link-visited;
--color-border-default;
--color-focus-default;
```

This is why a link does not need to know whether it sits on a dark-blue canvas or a pale card. It always consumes `--color-link-default`; the nearest context supplies the right value.

`default` is used consistently for the primary semantic value. `base` and `rest` are not mixed into the semantic layer.

## CSS layers

The global order is explicit:

```css
@layer reset, tokens, themes, base,
  priority1, priority2, priority3, priority4, priority5,
  utilities;
```

- [`tokens.css`](./src/styles/foundation/tokens.css) contains portable primitives for colors, fonts, type, spacing, shadows, transitions, breakpoints, aspects and animations.
- [`reset.css`](./src/styles/foundation/reset.css) is the small framework-independent reset.
- [`themes.css`](./src/styles/foundation/themes.css) owns theme slots and contextual mapping.
- [`base.css`](./src/styles/foundation/base.css) applies body, link, selection, focus and reduced-motion defaults.
- [`tokens.stylex.ts`](./src/styles/tokens.stylex.ts) exposes typed keys while preserving the original CSS custom-property references.

StyleX emits its atomic rules into the `priority*` layers, after the foundation base styles.

## Adding a theme

Add one `[data-theme="name"]` block and provide the `canvas`, `surface`, and `floating` slots. Callers remain unchanged. Then add the value to `Theme` in `theme.ts` so it becomes available through TypeScript.

## Breakpoint caveat

Breakpoint values are exported as CSS variables for documentation and non-query calculations. CSS custom properties cannot be used in `@media` conditions, so `breakpoints` in the StyleX bridge intentionally mirrors those literal values.

## Components

- `Button`: filled, outlined and ghost; default/small; leading/trailing Heroicons; loading/error/success; typed margin-only `xstyle`.
- `Heading`: display, page, section and subsection presets with an independent semantic element.
- `Stack`: typed row/column flow using the shared spacing scale.
- `themeAttributes`: framework-independent typed attributes for theme and color context.

```tsx
const overrides = stylex.create({
  allowed: { marginInlineStart: space.md },
  rejected: { backgroundColor: colors.linkDefault },
});

<Button marginTop="md">Token spacing</Button>;
<Button xstyle={overrides.allowed}>Custom margin</Button>;

// TypeScript error: Button.xstyle does not accept backgroundColor.
<Button xstyle={overrides.rejected}>Not allowed</Button>;
```

## Run

```sh
pnpm install
pnpm dev
```

Verify with:

```sh
pnpm check
pnpm test
pnpm build
```
