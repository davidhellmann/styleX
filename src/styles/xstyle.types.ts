import type * as stylex from "@stylexjs/stylex";

export type MarginStyleProperties = Pick<
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
