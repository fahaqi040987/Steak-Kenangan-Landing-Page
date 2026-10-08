"use client";

/**
 * Hero – Full-bleed brand banner, RestoOne-style: full-viewport centered copy, dark
 * vertical gradient for contrast, gold-highlighted brand name, and a pulsing scroll
 * indicator. Framer Motion: staggered fadeIn from lib/variants; copy/imagery from content/site.
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

  /** Reference-style title: every word cream except the brand's last word in gold. */
  const titleWords = hero.title.split(" ");
  const lastWord = titleWords.pop() ?? hero.title;
  const titleStart = titleWords.join(" ");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      id="home"
    >
      {/* Full-bleed brand photo; vertical dark gradient guarantees contrast for the
          centered copy column, matching the reference's overlay treatment */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/80" />

      <div className="container mx-auto relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="text-gold uppercase tracking-[0.2em] font-semibold mb-4 flex items-center justify-center gap-3"
          >
            <span className="inline-block h-px w-8 bg-gold" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
          >
            {titleStart && <>{titleStart} </>}
            <span className="text-gold">{lastWord}</span>
          </motion.h1>
          <motion.p
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="text-white text-lg sm:text-xl md:text-2xl font-serif italic mb-4"
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
                className="w-full sm:w-auto border-white text-cream hover:bg-white hover:text-charcoal"
              >
                {hero.ctaSecondary.label}
              </Button>
            </ScrollLink>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator (reference-style mouse); pulse disabled for reduced motion */}
      <motion.div
        variants={fadeIn("up", 1.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse motion-reduce:animate-none" />
        </div>
      </motion.div>
    </section>
  );
}
