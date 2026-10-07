"use client";

/**
 * Reservation – Book-a-table section: dark card with heading and ReservationForm.
 * Section fades in on scroll; inner card has a slight delay for staggered effect.
 */
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import ReservationForm from "./ReservationForm";

export default function Reservation() {
  return (
    <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="xl:my-32 xl:flex xl:flex-col xl:items-center"
      id="reservation"
    >
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="bg-charcoal-soft w-full xl:max-w-[868px] min-h-[518px] p-8 md:p-14 xl:p-16"
      >
        <h2 className="text-white mb-4 capitalize">Reservasi Meja</h2>
        <p className="text-white/80 mb-9 max-w-[520px]">
          {site.reservasi.subtitle}
        </p>
        <ReservationForm />
      </motion.div>
    </motion.section>
  );
}
