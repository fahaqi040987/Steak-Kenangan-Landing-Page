"use client";

/**
 * Hero – Full-bleed brand banner with eyebrow, title, tagline, cities, and two scroll CTAs.
 * Framer Motion: staggered fadeIn from lib/variants; copy and imagery from content/site.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/content/site";
import { getSection } from "@/data/sections";
import { Button } from "./ui/button";
import ScrollLink from "./ui/scroll-link";

export default function Hero() {
  const { hero } = site;

  return (
    <section
      className="relative min-h-[640px] xl:h-[1098px] flex items-center"
      id="home"
    >
      {/* Full-bleed brand photo; cinematic left-to-right gradient keeps the dish visible
          while guaranteeing text contrast over the copy column */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />

      <div className="container mx-auto relative z-10 py-32 xl:py-0">
        <div className="max-w-[640px] text-center xl:text-left">
          <motion.p
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="text-gold uppercase tracking-[0.2em] font-semibold mb-4 flex items-center justify-center xl:justify-start gap-3"
          >
            <span className="inline-block h-px w-8 bg-gold" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="text-white mb-4"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="text-white text-2xl font-serif italic mb-4"
          >
            {hero.tagline}
          </motion.p>
          <motion.p
            variants={fadeIn("down", 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="text-white/90 font-semibold mb-10"
          >
            {hero.cities}
          </motion.p>
          <motion.div
            variants={fadeIn("up", 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start"
          >
            {/* href makes these real anchors: keyboard-focusable, Cmd/Ctrl-clickable */}
            <ScrollLink
              to={hero.ctaPrimary.target}
              smooth
              href={`#${hero.ctaPrimary.target}`}
              offset={getSection("menu").offset}
            >
              <Button variant="gold" className="w-full sm:w-auto">
                {hero.ctaPrimary.label}
              </Button>
            </ScrollLink>
            <ScrollLink
              to={hero.ctaSecondary.target}
              smooth
              href={`#${hero.ctaSecondary.target}`}
              offset={getSection("reservation").offset}
            >
              <Button
                variant="input"
                className="w-full sm:w-auto border-white/40 hover:bg-white/10"
              >
                {hero.ctaSecondary.label}
              </Button>
            </ScrollLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
