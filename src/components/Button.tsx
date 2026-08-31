import * as stylex from "@stylexjs/stylex";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { animations, colors, fonts, motion, radii, space, weights } from "../styles/tokens.stylex";
import { tvVariants } from "../styles/tvVariants";

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
        ...buttonVariants({ marginTop, previewState, size, state, variant }),
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
    animation: animations.spin,
    borderColor: colors.current,
    borderInlineEndColor: colors.transparent,
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: "2px",
    height: "1rem",
    width: "1rem",
  },
});

const buttonVariants = tvVariants({
  base: styles.root,
  variants: {
    variant: {
      filled: styles.filled,
      outlined: styles.outlined,
      ghost: styles.ghost,
    },
    size: {
      default: styles.defaultSize,
      small: styles.smallSize,
    },
    state: {
      default: null,
      loading: styles.loading,
      error: styles.error,
      success: styles.success,
    },
    previewState: {
      hover: null,
      focus: styles.previewFocus,
      active: styles.previewActive,
    },
    marginTop: {
      xs: styles.marginTopXs,
      sm: styles.marginTopSm,
      md: styles.marginTopMd,
      lg: styles.marginTopLg,
      xl: styles.marginTopXl,
    },
  },
  defaultVariants: {
    variant: "filled",
    size: "default",
    state: "default",
  },
  compoundVariants: [
    { variant: "filled", previewState: "hover", style: styles.previewFilledHover },
    { variant: "outlined", previewState: "hover", style: styles.previewLightHover },
    { variant: "ghost", previewState: "hover", style: styles.previewLightHover },
  ],
});
