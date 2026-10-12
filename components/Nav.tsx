"use client";

/**
 * Nav – Desktop navigation: react-scroll Links driven by the section registry
 * (data/sections). Only sections flagged inNav render here.
 * RestoOne-style links: gold underline bar that grows from 0 to full width on hover
 * and stays fully grown on the section currently in view (spy adds .active, styled
 * in globals.css). The span is decorative — aria-hidden keeps it out of the a11y tree.
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
            className={`nav-link group relative px-3 py-2 transition-colors duration-200 ${linkStyles}`}
          >
            {section.label}
            <span
              aria-hidden="true"
              className="nav-underline absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full"
            />
          </ScrollLink>
        ))}
    </nav>
  );
}
