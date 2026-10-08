"use client";

/**
 * Timeline – The Perjalanan section: brand journey 2021–2025 as a vertical timeline.
 * Copy from content/site. Framer Motion: entries fade in as they scroll into view.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { site } from "@/content/site";

export default function Timeline() {
  const { perjalanan } = site;

  return (
    <section className="py-16 xl:py-24" id="perjalanan">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center max-w-[570px] mx-auto mb-14"
        >
          <p className="text-gold uppercase tracking-[0.2em] font-semibold mb-3">
            Perjalanan Kami
          </p>
          <h2>{perjalanan.title}</h2>
        </motion.div>

        <div className="max-w-[720px] mx-auto border-l-2 border-gold/40 pl-8 xl:pl-12 space-y-12">
          {perjalanan.entries.map((entry, index) => (
            <motion.div
              key={entry.year}
              variants={fadeIn("left", 0.2 + index * 0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="relative"
            >
              <span className="absolute -left-[41px] xl:-left-[57px] top-1 w-4 h-4 rounded-full bg-gold ring-4 ring-gold/20" />
              <span className="font-serif font-bold text-gold text-xl">
                {entry.year}
              </span>
              <h3 className="mb-2 mt-1">{entry.title}</h3>
              <p>{entry.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
