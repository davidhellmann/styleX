# CSS foundation drives Tailwind

The framework-independent CSS foundation remains the source of truth for design tokens, themes, and contextual color values. Tailwind CSS consumes the complete stable foundation through CSS-first `@theme` mappings, so utility classes follow the same nested theme and color-context behavior instead of introducing a second token system. Contextual colors form the concise component-facing API, while raw colors remain explicit `palette-*` escape hatches and Tailwind's default color palette is disabled.
