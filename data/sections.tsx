/**
 * Section registry — the single seam for section identity: ids, labels, scroll offsets,
 * icons, nav membership, and page order. Nav, NavMobile, Header's CTA and page.tsx
 * composition all read from here; adding a section means touching this file + one component.
 */
import type { ReactNode } from "react";
import { RiHomeFill } from "react-icons/ri";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaUsers, FaEnvelope, FaRoute, FaComments } from "react-icons/fa";

export interface SectionConfig {
  /** DOM id of the section (scroll target). */
  id: string;
  /** Label shown in navigation. */
  label: string;
  /** Scroll offset compensating for the fixed header. */
  offset: number;
  /** Optional icon for the mobile nav overlay. */
  icon?: ReactNode;
  /** Whether the section appears in desktop/mobile nav lists. */
  inNav: boolean;
}

/** Order in this array = order on the page. */
export const sections: SectionConfig[] = [
  { id: "home", label: "Beranda", offset: -50, icon: <RiHomeFill />, inNav: true },
  { id: "stats", label: "Statistik", offset: -100, inNav: false },
  { id: "about", label: "Tentang", offset: -100, icon: <FaUsers />, inNav: true },
  { id: "perjalanan", label: "Perjalanan", offset: -100, icon: <FaRoute />, inNav: true },
  { id: "nilai", label: "Nilai", offset: -100, inNav: false },
  { id: "menu", label: "Menu", offset: -50, icon: <BiSolidFoodMenu />, inNav: true },
  { id: "reservation", label: "Reservasi", offset: -100, inNav: false },
  { id: "testimoni", label: "Testimoni", offset: -100, icon: <FaComments />, inNav: true },
  { id: "contact", label: "Kontak", offset: 0, icon: <FaEnvelope />, inNav: true },
];

/** Union of section ids — page composition keys off this so a missing component is a type error. */
export type SectionId = (typeof sections)[number]["id"];

/** Convenience lookup for CTA scroll targets. */
export function getSection(id: SectionId): SectionConfig {
  const section = sections.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section id: ${id}`);
  return section;
}
