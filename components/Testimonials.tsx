"use client";

/**
 * Testimonials – Customer testimonials grid with 5-star ratings.
 * Copy from content/site. Framer Motion: cards fade up staggered.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { site } from "@/content/site";

export default function Testimonials() {
  const { testimoni } = site;

  return (
    <section className="py-16 xl:py-24 bg-white" id="testimoni">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center max-w-[570px] mx-auto mb-14"
        >
          <p className="text-gold-deep uppercase tracking-[0.2em] font-semibold mb-3">
            Testimoni
          </p>
          <h2>{testimoni.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
          {testimoni.items.map((item, index) => (
            <motion.figure
              key={item.name}
              variants={fadeIn("up", 0.2 + index * 0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="border border-line bg-white rounded-2xl p-8 shadow-primary/40 hover:shadow-primary transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 flex flex-col"
            >
              <span
                className="text-gold tracking-[0.2em] mb-4"
                aria-label="5 dari 5 bintang"
              >
                ★★★★★
              </span>
              <blockquote className="italic text-charcoal/80 leading-7 mb-6 flex-1">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption>
                <span className="font-semibold text-charcoal block">
                  {item.name}
                </span>
                <span className="text-grey text-sm">{item.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
