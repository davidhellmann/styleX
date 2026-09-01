import type * as stylex from "@stylexjs/stylex";

type Style = stylex.StyleXStyles;
type FlatVariants = Record<string, Record<string, Style>>;
type Slots = Record<string, Style>;
type SlotStyles<TSlots extends Slots> = Partial<Record<keyof TSlots, Style>>;
type SlotVariants<TSlots extends Slots> = Record<string, Record<string, SlotStyles<TSlots>>>;

type VariantValue<TOptions> = "true" extends keyof TOptions
  ? "false" extends keyof TOptions
    ? boolean
    : keyof TOptions
  : keyof TOptions;

export type VariantProps<TVariants> = {
  [TVariant in keyof TVariants]?: VariantValue<TVariants[TVariant]>;
};

type CompoundProps<TVariants> = {
  [TVariant in keyof TVariants]?:
    | VariantValue<TVariants[TVariant]>
    | ReadonlyArray<VariantValue<TVariants[TVariant]>>;
};

type FlatCompound<TVariants extends FlatVariants> = CompoundProps<TVariants> & {
  style: Style;
};

type SlotCompound<TSlots extends Slots, TVariants extends SlotVariants<TSlots>> = CompoundProps<TVariants> & {
  style: SlotStyles<TSlots>;
};

type FlatConfig<TVariants extends FlatVariants> = {
  base?: Style;
  compoundVariants?: ReadonlyArray<FlatCompound<TVariants>>;
  defaultVariants?: VariantProps<TVariants>;
  slots?: never;
  variants?: TVariants;
};

type SlotConfig<TSlots extends Slots, TVariants extends SlotVariants<TSlots>> = {
  compoundVariants?: ReadonlyArray<SlotCompound<TSlots, TVariants>>;
  defaultVariants?: VariantProps<TVariants>;
  slots: TSlots;
  variants?: TVariants;
};

type SlotResult<TSlots extends Slots> = {
  [TSlot in keyof TSlots]: Style[];
};

/**
 * Selects already-created StyleX styles using a Tailwind Variants-like API.
 * It never creates styles at runtime, so StyleX can keep compiling the styles statically.
 */
export function tvVariants<const TSlots extends Slots, const TVariants extends SlotVariants<TSlots>>(
  config: SlotConfig<TSlots, TVariants>,
): (props?: VariantProps<TVariants>) => SlotResult<TSlots>;
export function tvVariants<const TVariants extends FlatVariants>(
  config: FlatConfig<TVariants>,
): (props?: VariantProps<TVariants>) => Style[];
export function tvVariants(config: unknown): unknown {
  const runtimeConfig = config as RuntimeConfig;

  return (props: Record<string, PropertyKey | boolean | undefined> = {}) => {
    const resolved = resolveProps(runtimeConfig.defaultVariants, props);

    if (runtimeConfig.slots) {
      const result: Record<string, Style[]> = Object.fromEntries(
        Object.entries(runtimeConfig.slots).map(([slot, style]) => [slot, [style]]),
      );

      applyVariants(runtimeConfig.variants, resolved, (styles) => appendSlotStyles(result, styles));
      applyCompounds(runtimeConfig.compoundVariants, resolved, (styles) => appendSlotStyles(result, styles));

      return result;
    }

    const result: Style[] = runtimeConfig.base == null ? [] : [runtimeConfig.base];
    applyVariants(runtimeConfig.variants, resolved, (style) => result.push(style as Style));
    applyCompounds(runtimeConfig.compoundVariants, resolved, (style) => result.push(style as Style));
    return result;
  };
}

type RuntimeStyle = Style | Record<string, Style>;
type RuntimeConfig = {
  base?: Style;
  compoundVariants?: ReadonlyArray<Record<string, unknown> & { style: RuntimeStyle }>;
  defaultVariants?: Record<string, PropertyKey | boolean | undefined>;
  slots?: Record<string, Style>;
  variants?: Record<string, Record<string, RuntimeStyle>>;
};

function resolveProps(
  defaults: RuntimeConfig["defaultVariants"],
  props: Record<string, PropertyKey | boolean | undefined>,
) {
  const resolved = { ...defaults };

  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) resolved[key] = value;
  }

  return resolved;
}

function applyVariants(
  variants: RuntimeConfig["variants"],
  resolved: Record<string, PropertyKey | boolean | undefined>,
  apply: (style: RuntimeStyle) => void,
) {
  for (const [name, options] of Object.entries(variants ?? {})) {
    const value = resolved[name];
    if (value === undefined) continue;

    const style = options[String(value)];
    if (style != null) apply(style);
  }
}

function applyCompounds(
  compounds: RuntimeConfig["compoundVariants"],
  resolved: Record<string, PropertyKey | boolean | undefined>,
  apply: (style: RuntimeStyle) => void,
) {
  for (const compound of compounds ?? []) {
    const { style, ...conditions } = compound;
    const matches = Object.entries(conditions).every(([key, value]) =>
      Array.isArray(value) ? value.includes(resolved[key]) : resolved[key] === value,
    );
    if (matches) apply(style);
  }
}

function appendSlotStyles(result: Record<string, Style[]>, styles: RuntimeStyle) {
  if (styles == null || typeof styles !== "object" || Array.isArray(styles)) return;

  for (const [slot, style] of Object.entries(styles)) {
    if (style != null) result[slot]?.push(style);
  }
}
