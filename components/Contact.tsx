"use client";

/**
 * Contact – The Kontak section: three symmetric info groups (cabang, hubungi,
 * media sosial) above the location map. Every group renders the same item
 * anatomy — gold diamond, primary line, muted detail — so the columns mirror
 * each other. All copy from content/site; the map view is the lazy-loading
 * Google Maps embed from kontak.mapEmbed (see docs/adr/0001).
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { site } from "@/content/site";

/** One symmetric row: gold marker + primary line + muted detail line. */
function InfoLine({
  primary,
  secondary,
  href,
}: {
  primary: string;
  secondary: string;
  href?: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="text-gold" aria-hidden="true">
        ◆
      </span>
      <div>
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="font-semibold text-cream block hover:text-gold transition-colors duration-300"
          >
            {primary}
          </a>
        ) : (
          <span className="font-semibold text-cream block">{primary}</span>
        )}
        <span className="text-cream/60 text-sm">{secondary}</span>
      </div>
    </li>
  );
}

export default function Contact() {
  const { kontak } = site;
  const { groupTitles } = kontak;

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
          <p className="text-gold uppercase tracking-[0.2em] font-semibold mb-3">
            Kunjungi Kami
          </p>
          <h2>{kontak.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[50px]">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="mb-6">{groupTitles.cabang}</h3>
            <ul className="space-y-5">
              {kontak.cabang.map((branch) => (
                <InfoLine
                  key={branch.name}
                  primary={branch.name}
                  secondary={branch.detail}
                />
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="mb-6">{groupTitles.hubungi}</h3>
            <ul className="space-y-5">
              {kontak.reach.map((item) => (
                <InfoLine
                  key={item.label}
                  primary={item.text}
                  secondary={item.label}
                  href={item.href}
                />
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="mb-6">{groupTitles.sosial}</h3>
            <ul className="space-y-5">
              {kontak.sosial.map((item) => (
                <InfoLine
                  key={item.label}
                  primary={item.text}
                  secondary={item.label}
                  href={item.href}
                />
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
          <div className="h-[300px] md:h-[420px] rounded-2xl overflow-hidden shadow-primary">
            <iframe
              src={kontak.mapEmbed.src}
              title={kontak.mapEmbed.title}
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
