# GLOSSARY — Steak Kenangan

Domain vocabulary for this codebase. Terms come from the brand's own language
(`Steak-Kenangan-Paket-Lengkap-Website/06-Teks/TEKS-PROFIL-RESTAURANT.txt`).
Use these names in code, comments, and conversation.

## Domain terms

| Term | Meaning |
|---|---|
| **Brand** | Steak Kenangan — identity: name, tagline ("Rasa Yang Bercerita"), founded 2021 in Belitung, Halal certificate. |
| **Cabang** | A physical branch/outlet — Belitung, Depok Tanah Baru, Depok Kukusan today. Data lives in the content module (`kontak.cabang`); the Kontak list shows every entry, and `coords` ride along as reference data for future uses (e.g. directions links). |
| **Map view** | The Kontak section's location map: a lazy-loading Google Maps place embed for "Steak Kenangan Depok" (`kontak.mapEmbed`), rendered directly by the Contact section. Replaced the former Leaflet pin map — recorded in ADR-0001. |
| **Perjalanan** | The brand timeline 2021–2025 (founding, expansions, reopening). Rendered by the Timeline section. |
| **Nilai** | The brand's three values (Kualitas Utama, Keahlian, Keramahan) plus four advantages (Chef Berpengalaman, Bahan Premium, Reservasi Mudah, Acara Privat). |
| **Menu Andalan** | The signature menu with IDR prices, grouped into categories: `steak`, `pembuka`, `pendamping`, `minuman`. |
| **Testimoni** | Customer testimonials (5 items in the source). |
| **Reservasi** | Table reservation. The form hands a `ReservationRequest` to a **reservation channel** (`lib/reservation.ts`): the WhatsApp adapter opens a wa.me deep link; the PRD's HTTP backend arrives later behind the same `ReservationChannel` interface. |

## Architecture terms (project-specific)

| Term | Meaning |
|---|---|
| **content module** | `content/site.ts` — the single source of truth for all brand copy and asset paths. Components never hardcode copy. |
| **section registry** | `data/sections.tsx` — the single seam for section identity: id, label, offset, icon, nav membership, page order. Nav, NavMobile, Header CTA, and page composition all read it. |
| **source paket** | `Steak-Kenangan-Paket-Lengkap-Website/` — raw material (photos, texts, reference site, PRD). Never referenced by app code; excluded from scans/builds. |
