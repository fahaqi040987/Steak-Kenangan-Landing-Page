"use client";

/**
 * Stats – Dark band with the brand's key numbers (from content/site).
 * Framer Motion: band fades up, entries stagger.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { site } from "@/content/site";

export default function Stats() {
  return (
    <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="bg-charcoal py-14 text-white"
      id="stats"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 text-center">
          {site.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeIn("up", 0.3 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="text-4xl xl:text-5xl font-serif font-bold text-gold mb-2 tabular-nums">
                {stat.value}
              </div>
              <div className="uppercase tracking-wider text-sm text-white/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
