# Design Foundation

The foundation supplies inheritable visual context for components while keeping theme values, color-scheme selection, and color-context selection independent.

## Language

**Theme**:
A named visual palette, such as Paper or Ocean, that provides values for every color context.
_Avoid_: Theme name

**Color scheme**:
The light, dark, or system-selected mode in which a theme is rendered.

**Color context**:
An inheritable color environment established by Canvas, Surface, or Floating.
_Avoid_: Level, elevation, treatment

**Treatment**:
A visual effect such as raised, overlay, or sunken that does not establish a color context.
_Avoid_: Level
