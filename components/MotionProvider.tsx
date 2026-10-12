"use client";

/**
 * MotionProvider – site-wide Framer Motion config. reducedMotion="user" honors the
 * OS-level prefers-reduced-motion setting: transforms are skipped, opacity fades stay.
 * Lives in app/layout.tsx so every motion.* component on the page inherits it.
 */
import { MotionConfig } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
