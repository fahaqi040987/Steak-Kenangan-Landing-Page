"use client";

/**
 * Footer – Brand footer: logo, tagline, kontak links, sosial media, and cabang list.
 * All copy from content/site. Background from tailwind theme (bg-charcoal).
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/content/site";

export default function Footer() {
  const { brand, kontak } = site;
  const jamBuka = kontak.reach.find((item) => item.label === "Jam Buka");

  return (
    <motion.footer
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0 }}
      className="bg-charcoal-soft text-cream pt-16 border-t border-white/10"
    >
      <div className="container mx-auto">
        <div className="flex flex-col justify-between xl:flex-row">
          <div className="w-[300px] mb-8 xl:mb-0">
            <Image
              src={brand.logoWhite}
              width={160}
              height={50}
              alt={brand.name}
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/80 italic font-serif">{brand.tagline}</p>
            {jamBuka && (
              <p className="text-white/60 text-sm mt-2">{jamBuka.text}</p>
            )}
          </div>
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-[50px] mb-8 xl:mb-16">
            <div>
              <h3 className="font-semibold mb-5">Kontak</h3>
              <ul className="flex flex-col gap-y-4 text-sm">
                {kontak.reach.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-5">Ikuti Kami</h3>
              <ul className="flex flex-col gap-y-4 text-sm">
                {kontak.sosial.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-5">Cabang Kami</h3>
              <ul className="flex flex-col gap-y-4 text-sm">
                {kontak.cabang.map((branch) => (
                  <li key={branch.name}>
                    <span className="text-gold mr-2">◆</span>
                    {branch.name}
                    <span className="block text-white/60 text-xs ml-5">
                      {branch.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-white/10">
          <p className="text-white/60 text-center text-sm">
            &copy; {new Date().getFullYear()} {brand.name} — {brand.tagline}.
            Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
