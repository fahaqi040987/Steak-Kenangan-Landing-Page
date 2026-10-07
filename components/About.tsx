"use client";

/**
 * About – Two-column section: real brand story (from content/site) and photo.
 * Framer Motion: text fades in from right, image from left. CTA scrolls to Perjalanan.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/content/site";
import { getSection } from "@/data/sections";
import { Button } from "./ui/button";
import ScrollLink from "./ui/scroll-link";

export default function About() {
  const { about, brand } = site;

  return (
    <section
      className="grid grid-cols-1 xl:grid-cols-2 gap-x-[74px] p-8 md:p-12 xl:p-0 items-center"
      id="about"
    >
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="xl:pl-[135px]"
      >
        <h2 className="mb-9">{about.title}</h2>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="mb-8">
            {paragraph}
          </p>
        ))}
        <p className="mb-8 font-medium text-charcoal">{about.highlight}</p>
        <p className="mb-10 text-gold-deep font-semibold">★ {brand.halal}</p>
        <ScrollLink
          to={about.cta.target}
          smooth
          href={`#${about.cta.target}`}
          offset={getSection("perjalanan").offset}
        >
          <Button>{about.cta.label}</Button>
        </ScrollLink>
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <Image
          src={about.image}
          width={705}
          height={771}
          sizes="(min-width: 1280px) 50vw, 100vw"
          alt={about.imageAlt}
          className="hidden xl:block rounded-2xl"
        />
      </motion.div>
    </section>
  );
}
