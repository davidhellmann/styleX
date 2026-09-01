import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { tv } from "tailwind-variants";

export type ButtonVariant = "filled" | "outlined" | "ghost";
export type ButtonSize = "default" | "small";
export type ButtonState = "default" | "loading" | "error" | "success";
export type ButtonPreviewState = "hover" | "focus" | "active";
export type ButtonMarginSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  leadingIcon?: ReactNode;
  marginTop?: ButtonMarginSize;
  previewState?: ButtonPreviewState;
  size?: ButtonSize;
  state?: ButtonState;
  trailingIcon?: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  disabled = false,
  leadingIcon,
  marginTop,
  previewState,
  size = "default",
  state = "default",
  style,
  trailingIcon,
  type = "button",
  variant = "filled",
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
      className={buttonVariants({ className, marginTop, previewState, size, state, variant })}
      data-state={state}
      disabled={isDisabled}
      style={style}
      type={type}
    >
      {isLoading ? (
        <span aria-hidden="true" className={spinnerClassName} />
      ) : (
        (stateIcon ?? leadingIcon) && <span className={iconClassName}>{stateIcon ?? leadingIcon}</span>
      )}
      <span className="min-w-0">{children}</span>
      {!isLoading && trailingIcon && <span className={iconClassName}>{trailingIcon}</span>}
    </button>
  );
}

const iconClassName = "inline-grid size-[1.125rem] shrink-0 place-items-center [&>svg]:size-full";
const spinnerClassName =
  "size-4 animate-spin rounded-full border-2 border-solid border-current [border-inline-end-color:transparent]";

const buttonVariants = tv({
  base: [
    "inline-flex shrink-0 translate-y-0 items-center justify-center gap-xs whitespace-nowrap rounded-sm",
    "border border-solid font-ui text-sm font-bold leading-ui tracking-[0.01em] no-underline",
    "outline-2 outline-offset-[3px] outline-dashed outline-transparent",
    "transition-[background-color,color,border-color,transform] duration-(--duration-fast) ease-standard",
    "pointer-fine:hover:-translate-y-px active:translate-y-px motion-reduce:active:translate-y-0",
    "focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-[0.48]",
  ],
  variants: {
    variant: {
      filled: "border-foreground bg-foreground text-background",
      outlined:
        "border-foreground bg-transparent text-foreground pointer-fine:hover:bg-background-muted",
      ghost:
        "border-transparent bg-transparent text-foreground pointer-fine:hover:bg-background-muted",
    },
    size: {
      default: "min-h-12 px-lg py-sm",
      small: "min-h-10 px-md py-xs pointer-coarse:min-h-11",
    },
    state: {
      default: "",
      loading: "cursor-wait",
      error: "border-danger",
      success: "border-success",
    },
    previewState: {
      hover: "",
      focus: "outline-focus",
      active: "translate-y-px motion-reduce:translate-y-0",
    },
    marginTop: {
      xs: "mt-xs",
      sm: "mt-sm",
      md: "mt-md",
      lg: "mt-lg",
      xl: "mt-xl",
    },
  },
  defaultVariants: {
    variant: "filled",
    size: "default",
    state: "default",
  },
  compoundVariants: [
    {
      variant: "filled",
      previewState: "hover",
      class: "-translate-y-px motion-reduce:translate-y-0",
    },
    {
      variant: ["outlined", "ghost"],
      previewState: "hover",
      class: "bg-background-muted",
    },
  ],
});
