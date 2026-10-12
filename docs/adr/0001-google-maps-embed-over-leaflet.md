# ADR-0001 — Map view: Google Maps embed over Leaflet

- **Status:** Accepted
- **Date:** 2026-10-13
- **Deciders:** Site owner

## Context

The Kontak section originally rendered an interactive Leaflet map: loaded
client-only via `MapDynamic` (`next/dynamic`, `ssr: false`), styled with dark
CartoDB tiles, pinning every `kontak.cabang` entry that carried `coords`. It
needed a StrictMode double-init workaround (plain Leaflet instead of
react-leaflet) and its own smoke (`scripts/map-smoke.mjs`) guarding against
"Map container is already initialized".

That pulled `leaflet`, `@types/leaflet`, and `react-responsive` into the
dependency graph to serve a single map on an otherwise-static landing page.

## Decision

Replace the Leaflet map with a Google Maps **place embed** for
"Steak Kenangan Depok" — a plain `<iframe>` rendered directly by the Contact
section, driven from the content module (`kontak.mapEmbed.src` / `.title`),
lazy-loaded via `loading="lazy"`.

Consequently:

- `components/Map.tsx` and `components/MapDynamic.tsx` are deleted.
- `leaflet`, `@types/leaflet`, and `react-responsive` are removed from
  `package.json`.
- `scripts/map-smoke.mjs` now asserts the embed iframe mounts instead of the
  Leaflet pane.

## Consequences

- Multi-cabang pins are gone: the embed shows the Depok place listing, which
  matches the site's current operational focus (both active Java cabang are in
  Depok). The cabang `coords` stay in the content module as reference data.
- No client-only dynamic import, no StrictMode init workaround, three fewer
  dependencies, and one less hydration surface on a mostly-static page.
- Changing the map is a content-module edit (one URL), consistent with the
  "components never hardcode copy" seam.
- If multi-branch pins come back, reopen this ADR rather than silently
  re-adding Leaflet.
