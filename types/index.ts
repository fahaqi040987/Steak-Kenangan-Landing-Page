/**
 * Shared TypeScript types: animation directions, menu items, cabang entries.
 * FadeDirection used by lib/variants.ts; interfaces used by content/* and components.
 * SectionConfig lives in data/sections.tsx (it carries ReactNode icons).
 */

/** Shared types for the restaurant app */

export type FadeDirection = "up" | "down" | "left" | "right";

export type MenuCategory = "steak" | "pembuka" | "pendamping" | "minuman";

export interface MenuItem {
  name: string;
  price: string;
  category: MenuCategory;
  /** Only featured dishes have photography; others render in list views. */
  img?: string;
}

/**
 * A Cabang (branch). detail is the human-readable line shown in the Kontak list;
 * coords are optional reference data (kept for future uses like directions links) —
 * the Kontak map view itself is the Google Maps embed (kontak.mapEmbed).
 */
export interface CabangEntry {
  name: string;
  detail: string;
  coords?: { lat: number; lng: number };
}


