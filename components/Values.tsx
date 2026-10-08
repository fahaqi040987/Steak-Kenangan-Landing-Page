"use client";

/**
 * Values – The Nilai section: three brand values (◆ cards) plus four advantages.
 * Copy from content/site. Framer Motion: cards fade up staggered.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { site } from "@/content/site";

export default function Values() {
  const { nilai } = site;

  return (
    <section className="py-16 xl:py-24" id="nilai">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center max-w-[570px] mx-auto mb-14"
        >
          <p className="text-gold uppercase tracking-[0.2em] font-semibold mb-3">
            Nilai-Nilai Kami
          </p>
          <h2>{nilai.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mb-14">
          {nilai.values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={fadeIn("up", 0.3 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="bg-charcoal-soft border border-white/10 shadow-primary p-10 text-center rounded-2xl"
            >
              <span className="text-gold text-3xl block mb-4">◆</span>
              <h3 className="mb-3">{value.title}</h3>
              <p className="text-sm">{value.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[30px]">
          {nilai.advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              variants={fadeIn("up", 0.2 + index * 0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="border border-white/10 bg-white/5 p-8 rounded-xl"
            >
              <h4 className="font-serif font-bold text-lg mb-2">
                {advantage.title}
              </h4>
              <p className="text-sm">{advantage.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
