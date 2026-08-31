import * as stylex from "@stylexjs/stylex";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { colors, fonts, motion, radii, space, weights } from "../styles/tokens.stylex";

export type ButtonVariant = "filled" | "outlined" | "ghost";
export type ButtonSize = "default" | "small";
export type ButtonState = "default" | "loading" | "error" | "success";
export type ButtonPreviewState = "hover" | "focus" | "active";
export type ButtonMarginSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonMarginStyles = Pick<
  stylex.CSSProperties,
  | "margin"
  | "marginBlock"
  | "marginBlockEnd"
  | "marginBlockStart"
  | "marginBottom"
  | "marginInline"
  | "marginInlineEnd"
  | "marginInlineStart"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
>;

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> & {
  children: ReactNode;
  leadingIcon?: ReactNode;
  marginTop?: ButtonMarginSize;
  previewState?: ButtonPreviewState;
  size?: ButtonSize;
  state?: ButtonState;
  trailingIcon?: ReactNode;
  variant?: ButtonVariant;
  xstyle?: stylex.StyleXStyles<ButtonMarginStyles>;
};

export function Button({
  children,
  disabled = false,
  leadingIcon,
  marginTop,
  previewState,
  size = "default",
  state = "default",
  trailingIcon,
  type = "button",
  variant = "filled",
  xstyle,
  ...rest
}: ButtonProps) {
  const isLoading = state === "loading";
  const isDisabled = disabled || isLoading;
  const stateIcon =
    state === "error" ? (
      <ExclamationCircleIcon aria-hidden="true" />
    ) : state === "success" ? (
      <CheckIcon aria-hidden="true" />
    ) : null;

  return (
    <button
      {...rest}
      aria-busy={isLoading || undefined}
      aria-disabled={isDisabled || undefined}
      aria-invalid={state === "error" || undefined}
      data-state={state}
      disabled={isDisabled}
      type={type}
      {...stylex.props(
        styles.root,
        variantStyles[variant],
        sizeStyles[size],
        stateStyles[state],
        previewState == null ? null : previewStateStyles[previewState],
        marginTop == null ? null : marginTopStyles[marginTop],
        previewState === "hover" ? hoverPreviewStyles[variant] : null,
        xstyle,
      )}
    >
      {isLoading ? (
        <span aria-hidden="true" {...stylex.props(styles.spinner)} />
      ) : (
        (stateIcon ?? leadingIcon) && <span {...stylex.props(styles.icon)}>{stateIcon ?? leadingIcon}</span>
      )}
      <span {...stylex.props(styles.label)}>{children}</span>
      {!isLoading && trailingIcon && <span {...stylex.props(styles.icon)}>{trailingIcon}</span>}
    </button>
  );
}

const styles = stylex.create({
  root: {
    alignItems: "center",
    borderRadius: radii.sm,
    borderStyle: "solid",
    borderWidth: "1px",
    cursor: {
      default: "pointer",
      ":disabled": "not-allowed",
    },
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: fonts.ui,
    fontSize: "0.875rem",
    fontWeight: weights.bold,
    gap: space.xs,
    justifyContent: "center",
    letterSpacing: "0.01em",
    lineHeight: "1",
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.focusDefault,
    },
    outlineOffset: "3px",
    outlineStyle: "dashed",
    outlineWidth: {
      default: "2px",
      ":focus-visible": "2px",
    },
    opacity: {
      default: 1,
      ":disabled": 0.48,
    },
    textDecoration: "none",
    transform: {
      default: "translateY(0)",
      ":hover": {
        default: null,
        "@media (hover: hover) and (pointer: fine)": "translateY(-1px)",
      },
      ":active": {
        default: "translateY(1px)",
        "@media (prefers-reduced-motion: reduce)": "none",
      },
    },
    transitionDuration: motion.fast,
    transitionProperty: "background-color, color, border-color, transform",
    transitionTimingFunction: motion.standard,
    whiteSpace: "nowrap",
  },
  filled: {
    backgroundColor: {
      default: colors.textDefault,
      ":hover": {
        default: null,
        "@media (hover: hover) and (pointer: fine)": colors.textDefault,
      },
      ":active": colors.textDefault,
    },
    borderColor: colors.textDefault,
    color: colors.fillDefault,
  },
  outlined: {
    backgroundColor: {
      default: colors.transparent,
      ":hover": {
        default: null,
        "@media (hover: hover) and (pointer: fine)": colors.fillMuted,
      },
    },
    borderColor: colors.textDefault,
    color: colors.textDefault,
  },
  ghost: {
    backgroundColor: {
      default: colors.transparent,
      ":hover": {
        default: null,
        "@media (hover: hover) and (pointer: fine)": colors.fillMuted,
      },
    },
    borderColor: colors.transparent,
    color: colors.textDefault,
  },
  defaultSize: {
    minHeight: "3rem",
    paddingBlock: space.sm,
    paddingInline: space.lg,
  },
  smallSize: {
    minHeight: {
      default: "2.5rem",
      "@media (pointer: coarse)": "2.75rem",
    },
    paddingBlock: space.xs,
    paddingInline: space.md,
  },
  loading: {
    cursor: "wait",
  },
  error: {
    borderColor: colors.dangerDefault,
  },
  success: {
    borderColor: colors.successDefault,
  },
  previewFilledHover: {
    transform: {
      default: "translateY(-1px)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  previewLightHover: { backgroundColor: colors.fillMuted },
  previewFocus: {
    outlineColor: colors.focusDefault,
    outlineWidth: "2px",
  },
  previewActive: {
    transform: {
      default: "translateY(1px)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  marginTopXs: { marginTop: space.xs },
  marginTopSm: { marginTop: space.sm },
  marginTopMd: { marginTop: space.md },
  marginTopLg: { marginTop: space.lg },
  marginTopXl: { marginTop: space.xl },
  label: {
    minWidth: 0,
  },
  icon: {
    display: "inline-grid",
    flex: "0 0 auto",
    height: "1.125rem",
    placeItems: "center",
    width: "1.125rem",
  },
  spinner: {
    animationDuration: "800ms",
    animationIterationCount: "infinite",
    animationName: "foundation-spin",
    animationTimingFunction: "linear",
    borderColor: colors.current,
    borderInlineEndColor: colors.transparent,
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: "2px",
    height: "1rem",
    width: "1rem",
  },
});

const variantStyles = {
  filled: styles.filled,
  ghost: styles.ghost,
  outlined: styles.outlined,
} satisfies Record<ButtonVariant, stylex.StyleXStyles>;

const sizeStyles = {
  default: styles.defaultSize,
  small: styles.smallSize,
} satisfies Record<ButtonSize, stylex.StyleXStyles>;

const stateStyles = {
  default: null,
  error: styles.error,
  loading: styles.loading,
  success: styles.success,
} satisfies Record<ButtonState, stylex.StyleXStyles>;

const previewStateStyles = {
  active: styles.previewActive,
  focus: styles.previewFocus,
  hover: null,
} satisfies Record<ButtonPreviewState, stylex.StyleXStyles>;

const marginTopStyles = {
  lg: styles.marginTopLg,
  md: styles.marginTopMd,
  sm: styles.marginTopSm,
  xl: styles.marginTopXl,
  xs: styles.marginTopXs,
} satisfies Record<ButtonMarginSize, stylex.StyleXStyles>;

const hoverPreviewStyles = {
  filled: styles.previewFilledHover,
  ghost: styles.previewLightHover,
  outlined: styles.previewLightHover,
} satisfies Record<ButtonVariant, stylex.StyleXStyles>;
