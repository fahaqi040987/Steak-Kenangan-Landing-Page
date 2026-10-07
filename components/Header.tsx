"use client";

/**
 * Header – Fixed top bar with logo, desktop nav, CTA, and mobile menu.
 * Uses scroll state to switch from transparent to solid background after 100px.
 * Logo and CTA label come from content/site; CTA target from the section registry.
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { getSection } from "@/data/sections";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import { Button } from "./ui/button";
import ScrollLink from "./ui/scroll-link";

export default function Header() {
  /** When true, header shows dark background (scrolled past 100px). */
  const [active, setActive] = useState(false);

  /** Subscribe to scroll; set active when scrollY > 100. Cleanup removes listener. */
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reservation = getSection("reservation");

  return (
    <header
      className={`${
        active
          ? "bg-charcoal-soft/90 backdrop-blur-md shadow-primary py-3 border-b border-white/10"
          : "bg-none py-8 border-b border-transparent"
      } fixed top-0 w-full z-50 left-0 right-0 transition-[background-color,padding,box-shadow,border-color] duration-300`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* ScrollLink to top; brand logo (white/cream version for the dark hero) */}
          <ScrollLink
            to="home"
            smooth
            href="#home"
            aria-label={`${site.brand.name} — kembali ke beranda`}
            className="cursor-pointer"
          >
            <Image
              src={site.brand.logoWhite}
              width={160}
              height={50}
              alt={site.brand.name}
              className="h-10 w-auto"
              priority
            />
          </ScrollLink>
          {/* Desktop nav: hidden on small screens, visible from xl. */}
          <Nav
            containerStyles="hidden xl:flex gap-x-12 text-white"
            linkStyles="capitalize"
          />
          <ScrollLink
            to={reservation.id}
            smooth
            href={`#${reservation.id}`}
            offset={reservation.offset}
            className="hidden sm:inline-flex"
          >
            <Button variant="gold" size="sm">
              {reservation.label}
            </Button>
          </ScrollLink>
          <NavMobile
            containerStyles="xl:hidden"
            iconStyles="text-3xl"
            linkStyles="uppercase"
          />
        </div>
      </div>
    </header>
  );
}
