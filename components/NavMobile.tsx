"use client";

/**
 * NavMobile – Hamburger menu for small screens. Toggle opens a full-screen overlay with logo,
 * scroll links (with icons) from the section registry, and a reservation CTA.
 * Closing overlay on link click for better UX.
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { site } from "@/content/site";
import { getSection, sections } from "@/data/sections";
import { Button } from "./ui/button";
import ScrollLink from "./ui/scroll-link";

export interface NavMobileProps {
  containerStyles?: string;
  iconStyles?: string;
  linkStyles?: string;
}

export default function NavMobile({
  containerStyles = "",
  iconStyles = "",
  linkStyles = "",
}: NavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reservation = getSection("reservation");

  /** Escape closes the menu; body scroll is locked while the overlay is open. */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={containerStyles}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer border-0 bg-transparent p-0"
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={isOpen}
      >
        <RiMenu2Line className="text-3xl text-white transition-transform duration-200" />
      </button>
      {/* Overlay: slides in from right when isOpen. invisible when closed = out of the
          tab order and the a11y tree (unlike merely being off-screen). */}
      <aside
        className={`${
          isOpen ? "right-0 visible" : "-right-full invisible"
        } bg-charcoal fixed z-20 w-full p-10 top-0 bottom-0 transition-[right,visibility] duration-500`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col items-center justify-between h-full">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-4xl text-charcoal absolute w-10 h-10 left-8 bg-gold rounded-full flex items-center justify-center border-0"
            aria-label="Tutup menu"
            tabIndex={isOpen ? 0 : -1}
          >
            <IoCloseOutline />
          </button>
          <ScrollLink
            to="home"
            smooth
            href="#home"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
          >
            <Image
              src={site.brand.logoWhite}
              width={160}
              height={50}
              alt={site.brand.name}
              className="h-10 w-auto"
            />
          </ScrollLink>
          <div className="flex flex-col gap-y-8">
            {sections
              .filter((section) => section.inNav)
              .map((section) => (
                <ScrollLink
                  key={section.id}
                  to={section.id}
                  href={`#${section.id}`}
                  offset={section.offset}
                  smooth={false}
                  className="flex items-center gap-x-3 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  tabIndex={isOpen ? 0 : -1}
                >
                  <div className={iconStyles} aria-hidden="true">
                    {section.icon}
                  </div>
                  <div className={linkStyles}>{section.label}</div>
                </ScrollLink>
              ))}
          </div>
          <ScrollLink
            to={reservation.id}
            smooth
            href={`#${reservation.id}`}
            offset={reservation.offset}
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
          >
            <Button variant="gold">{reservation.label}</Button>
          </ScrollLink>
        </div>
      </aside>
    </div>
  );
}
