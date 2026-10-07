/**
 * Framer Motion fade-in variants used site-wide (Hero, Menu, About, Footer, Map, Reservation).
 * hidden = starting state (offset by direction, opacity 0); show = final state (opacity 1, no offset).
 * Short travel (24px) and sub-second duration read modern; combined with MotionConfig
 * reducedMotion="user" in app/layout.tsx, prefers-reduced-motion users get fades only.
 */
import type { Variants } from "framer-motion";
import type { FadeDirection } from "@/types";

/**
 * Framer Motion fade-in variants.
 * @param direction - 'up' | 'down' | 'left' | 'right'
 * @param delay - delay in seconds
 */
export function fadeIn(direction: FadeDirection, delay: number): Variants {
  return {
    hidden: {
      y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
      opacity: 0,
      x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
      transition: {
        type: "tween",
        duration: 0.5,
        delay,
        ease: "easeOut",
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.7,
        delay,
        ease: "easeOut",
      },
    },
  };
}
