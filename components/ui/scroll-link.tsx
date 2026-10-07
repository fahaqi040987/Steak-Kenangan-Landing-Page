"use client";

/**
 * ScrollLink – react-scroll Link with a real `href`.
 * react-scroll renders an <a> without href, which is invisible to keyboards and
 * Cmd/Ctrl-click. The component forwards href at runtime; its LinkProps type just
 * omits it, so this wrapper re-adds it (asserted) and is the only place that
 * needs the cast. All scroll anchors should use this instead of react-scroll directly.
 */
import React from "react";
import { Link } from "react-scroll";

/** react-scroll's LinkProps omits several <a> attributes (href, tabIndex, ...);
 *  we require href and allow the rest of the anchor surface. */
export interface ScrollLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  href: string;
  spy?: boolean;
  smooth?: boolean;
  offset?: number;
  duration?: number;
}

export default function ScrollLink({ href, ...rest }: ScrollLinkProps) {
  const linkProps = { ...rest, href } as React.ComponentProps<typeof Link>;
  return <Link {...linkProps} />;
}
