"use client";

/**
 * Header – Fixed top bar with logo, desktop nav, and mobile menu.
 * Transparent over the hero at rest; fully opaque charcoal with a shadow after 50px of
 * scroll or on hover, so the nav always sits on a readable surface. Opaque on purpose:
 * translucent bg + backdrop-blur rendered a light fringe along the bar's bottom edge
 * (the "white line" artifact). Logo anchors left; nav sits at the right edge.
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import ScrollLink from "./ui/scroll-link";

export default function Header() {
  /** When true, header shows opaque charcoal background (scrolled past 50px). */
  const [active, setActive] = useState(false);

  /** Subscribe to scroll; set active when scrollY > 50. Cleanup removes listener. */
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        active
          ? "bg-charcoal shadow-lg py-3"
          : "bg-transparent py-5"
      } hover:bg-charcoal hover:shadow-lg hover:py-3 fixed top-0 w-full z-50 left-0 right-0 transition-[background-color,padding,box-shadow] duration-300`}
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
              src={site.brand.logoDark}
              width={160}
              height={50}
              alt={site.brand.name}
              className="h-22 w-auto"
              priority
            />
          </ScrollLink>
          {/* Desktop nav + halal badge grouped at the right edge. The badge is a
              trust mark, not a link: sized between the nav text and brand logo,
              and hidden below xl so the hamburger row stays logo + menu only. */}
          <div className="flex items-center gap-4">
            <Nav
              containerStyles="hidden xl:flex items-center text-cream"
              linkStyles="text-sm font-medium capitalize"
            />
            <Image
              src={site.brand.halalLogo}
              width={286}
              height={512}
              alt={site.brand.halal}
              className="hidden xl:block h-28 w-auto"
              priority
            />
          </div>
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
