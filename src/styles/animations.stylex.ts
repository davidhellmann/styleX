import * as stylex from "@stylexjs/stylex";
import { motion } from "./tokens.stylex";

/**
 * StyleX counterparts for the source waypoint utilities. Compose `base`, one
 * initial pose, and `animated` when the waypoint is visible.
 */
export const waypoint = stylex.create({
  base: {
    backfaceVisibility: "hidden",
    transitionDuration: {
      default: motion.slow,
      "@media (prefers-reduced-motion: reduce)": "0ms",
    },
    transitionProperty: "opacity, transform",
    transitionTimingFunction: motion.enter,
  },
  fadeIn: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
  },
  fadeInUp: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translateY(3rem)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  fadeInDown: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translateY(-3rem)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  fadeInLeft: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translateX(3rem)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  fadeInRight: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translateX(-3rem)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  zoomInUp: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translateY(3rem) scale(0.75)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  zoomInDown: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translateY(-3rem) scale(0.75)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  fadeInLeftDown: {
    opacity: {
      default: 0,
      "@media (prefers-reduced-motion: reduce)": 1,
    },
    transform: {
      default: "translate(3rem, -10vw) scale(0.75)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  animated: {
    opacity: 1,
    transform: "none",
  },
});
