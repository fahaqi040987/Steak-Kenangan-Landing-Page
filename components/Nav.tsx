"use client";

/**
 * Nav – Desktop navigation: react-scroll Links driven by the section registry
 * (data/sections). Only sections flagged inNav render here.
 */
import ScrollLink from "./ui/scroll-link";
import { sections } from "@/data/sections";

export interface NavProps {
  containerStyles?: string;
  linkStyles?: string;
}

export default function Nav({ containerStyles = "", linkStyles = "" }: NavProps) {
  return (
    <nav className={containerStyles}>
      {sections
        .filter((section) => section.inNav)
        .map((section) => (
          <ScrollLink
            key={section.id}
            to={section.id}
            href={`#${section.id}`}
            spy
            smooth
            offset={section.offset}
            duration={500}
            className={linkStyles}
          >
            {section.label}
          </ScrollLink>
        ))}
    </nav>
  );
}
