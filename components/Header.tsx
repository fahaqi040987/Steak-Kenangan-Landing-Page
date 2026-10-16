"use client";

/**
 * Header – Fixed top bar with logo, desktop nav, and mobile menu.
 * Fully transparent at all times — rest, hover, scrolled (design decision: the
 * page is one continuous dark surface, so a tinted bar only banded the top of
 * each section). Only the padding eases in on scroll as a position cue.
 * Keep this bar paint-simple: never add backdrop-filter/filter/opacity here or
 * on any wrapper between it and the page — an ancestor backdrop-filter
 * induces a backdrop root and silently strips the NavMobile overlay's dim+blur
 * (NavMobile's aside is portaled to <body>, but stay paint-simple anyway).
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import ScrollLink from "./ui/scroll-link";

export default function Header() {
  /** When true, header shows frosted charcoal glass (scrolled past 50px). */
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
        active ? "py-3" : "py-5"
      } hover:py-3 fixed top-0 w-full z-50 left-0 right-0 transition-[padding] duration-300`}
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
            {/* Brand logo sizes along the site's one mobile/desktop seam: 120px
                below xl (where NavMobile takes over), 250px at xl+. width/height
                are the PNG's intrinsic size (600×550) so next/image reserves
                space at the true ratio; h-auto keeps it undistorted. */}
            <Image
              src={site.brand.logoDark}
              width={600}
              height={550}
              alt={site.brand.name}
              className="w-[120px] xl:w-[250px] h-auto"
              priority
            />
          </ScrollLink>
          {/* Desktop nav + halal badge grouped at the right edge. The badge is a
              trust mark, not a link: sized between the nav text and brand logo,
              and hidden below xl so the hamburger row stays logo + menu only. */}
          <div className="flex items-center gap-4">
            <Nav
              containerStyles="hidden xl:flex items-center text-cream"
              linkStyles="text-md font-medium capitalize"
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
