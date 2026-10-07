"use client";

/**
 * Contact – The Kontak section: cabang list, contact info list, and the location map.
 * All copy from content/site; the Leaflet map (client-only) renders below the lists.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import MapDynamic from "./MapDynamic";

export default function Contact() {
  const { kontak } = site;

  return (
    <section className="py-16 xl:py-24" id="contact">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center max-w-[570px] mx-auto mb-14"
        >
          <p className="text-gold-deep uppercase tracking-[0.2em] font-semibold mb-3">
            Kunjungi Kami
          </p>
          <h2>{kontak.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[50px]">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="mb-6">Cabang Kami</h3>
            <ul className="space-y-5">
              {kontak.cabang.map((branch) => (
                <li key={branch.name} className="flex gap-3">
                  <span className="text-gold">◆</span>
                  <div>
                    <span className="font-semibold text-charcoal block">
                      {branch.name}
                    </span>
                    <span className="text-grey text-sm">{branch.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              {[...kontak.reach, ...kontak.sosial].map((item) => (
                <li key={item.label} className="flex flex-col">
                  <span className="text-grey text-sm uppercase tracking-wider">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-charcoal hover:text-gold font-medium"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-charcoal font-medium">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="mt-14"
        >
          <div
            className="h-[300px] md:h-[420px] rounded-2xl overflow-hidden shadow-primary"
            role="application"
            aria-label="Peta lokasi cabang Steak Kenangan"
          >
            <MapDynamic />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
