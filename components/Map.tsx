"use client";

/**
 * Map – Interactive Leaflet map with markers and popups.
 * Plain Leaflet (not react-leaflet): react-leaflet v4 inits the map in a callback ref
 * whose `context === null` guard never re-arms under React StrictMode's simulated
 * unmount/remount, throwing "Map container is already initialized" in dev. A plain
 * effect with `map.remove()` cleanup is StrictMode-proof by construction.
 * Markers are DERIVED from the content module: only kontak.cabang entries that carry
 * coords are pinned, so the map can never show a location the brand doesn't operate in.
 * Loaded client-only via MapDynamic (ssr: false).
 */
import { useEffect, useRef } from "react";
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import L from "leaflet";
import { useMediaQuery } from "react-responsive";
import "leaflet/dist/leaflet.css";
import { site } from "@/content/site";

/** Custom pin icon for markers (replaces default Leaflet marker). */
const customIcon = L.icon({
  iconUrl: "/pin-solid.svg",
  iconSize: [40, 40],
});

export default function Map() {
  /** Responsive: smaller height on mobile for better UX */
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = L.map(container, {
      zoomControl: false,
    });

    // CartoDB dark tiles match the site's charcoal theme; attribution required by OSM
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    const pinnedCabang = site.kontak.cabang.filter((c) => c.coords);

    if (pinnedCabang.length > 0) {
      const bounds = L.latLngBounds(
        pinnedCabang.map((c) => [c.coords!.lat, c.coords!.lng] as [number, number])
      );
      map.fitBounds(bounds, {
        padding: isMobile ? [30, 30] : [80, 80],
        maxZoom: isMobile ? 13 : 15,
      });
    }

    pinnedCabang.forEach((cabang) => {
      // Inline styles: Tailwind can't see classes built at runtime inside popups
      const popup = document.createElement("div");
      popup.innerHTML = `
        <div style="min-width:150px">
          <h3 style="margin:0 0 4px">${cabang.name}</h3>
          <p style="margin:0;line-height:1.375">${cabang.detail}</p>
        </div>`;
      L.marker([cabang.coords!.lat, cabang.coords!.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popup);
    });

    // Removes the map, its panes, and the _leaflet_id stamp so a remount
    // (StrictMode re-run, breakpoint change) re-inits cleanly.
    return () => {
      map.remove();
    };
  }, [isMobile]);

  return (
    <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
      className="relative xl:after:w-full xl:after:h-[240px] xl:after:bg-gradient-to-b xl:after:from-charcoal xl:after:via-charcoal/80 xl:after:to-charcoal/20 xl:after:absolute xl:after:top-0 xl:after:z-20"
    >
      <div
        ref={containerRef}
        className={`${isMobile ? "h-[300px]" : "h-[900px]"} z-10`}
      />
    </motion.section>
  );
}
