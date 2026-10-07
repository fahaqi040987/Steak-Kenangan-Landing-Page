"use client";

/**
 * Menu – Featured dishes in a responsive grid. Data from content/site (menu.items with
 * photography only); hover scales image via group-hover. Prices in IDR.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/content/site";

export default function Menu() {
  const featured = site.menu.items.filter(
    (item) => "img" in item && item.img
  );

  return (
    <section
      className="relative py-12 xl:py-24 bg-cream-soft"
      id="menu"
    >
      <div className="container mx-auto">
        {/* Section title; animates from left */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-[570px] mx-auto text-center"
        >
          <h2 className="mb-3">{site.menu.title}</h2>
          <p className="text-grey mb-16">{site.brand.concept}</p>
        </motion.div>
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3"
        >
          {featured.map((item) => (
            <div
              key={item.name}
              className="max-w-[350px] w-full bg-white shadow-primary rounded-2xl overflow-hidden mx-auto xl:mx-0 group transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-primary/80"
            >
              <div className="overflow-hidden">
                {item.img && (
                  <Image
                    src={item.img}
                    width={350}
                    height={283}
                    sizes="(max-width: 768px) 100vw, 350px"
                    alt={item.name}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="pt-[20px] pb-[28px] px-[30px]">
                <h3 className="font-sans text-charcoal mb-[14px]">
                  {item.name}
                </h3>
                <div className="text-xl font-sans font-semibold text-gold-deep tabular-nums">
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        <motion.p
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center text-grey text-sm mt-12"
        >
          {site.menu.note}
        </motion.p>
      </div>
    </section>
  );
}
