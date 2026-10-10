/**
 * Home Page (route: /) – Single-page layout. Section order comes from the registry
 * (data/sections); this map must cover every SectionId, so adding a section without
 * a component is a type error. No API calls; all content is static via content/site.
 * Main stays fluid (no max-width) so full-bleed surfaces — hero photo, section
 * backgrounds, footer — span the viewport edge to edge; content width is the
 * `container` seam in tailwind.config.js, not a cap here.
 */
import type { ComponentType } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Reservation from "@/components/Reservation";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Timeline from "@/components/Timeline";
import Values from "@/components/Values";
import { sections, type SectionId } from "@/data/sections";

const sectionComponents: Record<SectionId, ComponentType> = {
  home: Hero,
  stats: Stats,
  about: About,
  perjalanan: Timeline,
  nilai: Values,
  menu: Menu,
  reservation: Reservation,
  testimoni: Testimonials,
  contact: Contact,
};

export default function Home() {
  return (
    <main className="w-full bg-charcoal overflow-hidden">
      <Header />
      {sections.map((section) => {
        const SectionComponent = sectionComponents[section.id];
        return <SectionComponent key={section.id} />;
      })}
      <Footer />
    </main>
  );
}
