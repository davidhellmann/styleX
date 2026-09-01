# Design foundation with Tailwind CSS

A small design-system foundation where portable CSS custom properties own the values and Tailwind CSS provides the utility API. [ADR 0001](./docs/adr/0001-css-foundation-drives-tailwind.md) records that ownership boundary.

## Context contract

Two independent attributes describe the current visual context:

- `data-theme="paper|ocean"` selects a named palette.
- `data-color-context="canvas|surface|floating"` selects the inheritable color environment.

They may be nested at any depth. A new theme starts in `canvas` unless the same element explicitly selects another color context.

```tsx
<section {...themeAttributes({ theme: "ocean", colorContext: "canvas" })}>
  <article
    {...themeAttributes({ colorContext: "surface" })}
    className="border border-border bg-background text-foreground"
  >
    <Button variant="outlined">Context-aware component</Button>
  </article>
</section>
```

The foundation is intentionally light-only. Add color-scheme control after every theme supplies `light-dark()` values for the complete theme contract.

## CSS and Tailwind layers

The global cascade order is explicit:

```css
@layer theme, tokens, themes, base, components, utilities;
```

- [`primitives.css`](./src/styles/foundation/tokens/primitives.css) owns raw colors, typography, spacing, geometry, motion, and breakpoints.
- [`semantics.css`](./src/styles/foundation/tokens/semantics.css) assigns stable non-color roles.
- [`themes.css`](./src/styles/foundation/themes.css) owns Paper/Ocean values and contextual color mapping.
- [`base.css`](./src/styles/foundation/base.css) applies body, links, focus, selection, and reduced-motion defaults on top of Tailwind Preflight.
- [`tailwind.css`](./src/styles/tailwind.css) resets Tailwind's default theme and maps the foundation into `@theme inline`.

Contextual utilities use concise names such as `bg-background`, `text-foreground`, `text-foreground-muted`, `text-link`, `border-border`, and `outline-focus`. Raw palette access is deliberately explicit, for example `bg-palette-ocean-500`.

## Breakpoints

The responsive variants are `sm` 30rem, `md` 48rem, `lg` 64rem, `xl` 80rem, and `2xl` 96rem. CSS custom properties cannot resolve inside media-query conditions, so the Tailwind adapter mirrors those literal values and carries a synchronization comment.

## Components

- `Button`: filled, outlined, and ghost variants; two sizes; loading/error/success states; icons; token margins.
- `Heading`: display, page, section, and subsection presets independent from the rendered semantic tag.
- `Stack`: typed row/column flow using the foundation spacing scale.
- `themeAttributes`: framework-independent typed theme and color-context attributes.

The base components accept native `className` and `style`. Tailwind Variants resolves conflicting utility classes so call-site classes can override recipe defaults.

## Run

```sh
pnpm install
pnpm dev
```

Verify with:

```sh
pnpm check
pnpm build
```
