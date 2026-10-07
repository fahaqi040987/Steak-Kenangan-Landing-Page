# Steak Kenangan | Premium Steakhouse Landing Page - Next.js, TypeScript, TailwindCSS, Framer Motion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF)](https://www.framer.com/motion/)

A modern, responsive steakhouse website for **Steak Kenangan** ("Rasa Yang Bercerita") built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion. The site showcases the brand's signature menu (Menu Andalan), its journey since 2021 in Belitung, and table reservations via a WhatsApp deep link — with smooth animations, an interactive cabang map, and a clean UI. It is designed for both production use and as an educational resource for learning the App Router, client components, and modern React patterns. All content is static and client-friendly—no backend or API is required to run it.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features & Functionality](#features--functionality)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & How to Run](#installation--how-to-run)
- [Environment Variables](#environment-variables)
- [Routes & Navigation](#routes--navigation)
- [Components Walkthrough](#components-walkthrough)
- [Libraries & Dependencies](#libraries--dependencies)
- [Reusing Components](#reusing-components)
- [Deployment](#deployment)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [License](#license)

---

## Project Overview

**Steak Kenangan** is a single-page steakhouse landing site that presents a hero banner, key stats, the brand story (Tentang), its journey (Perjalanan), values (Nilai), the signature menu (Menu Andalan), a reservation form, testimonials, contact info with an interactive cabang map, and a footer. It is built with the **Next.js 15 App Router**, **TypeScript**, **TailwindCSS**, and **Framer Motion**. The app is fully static and frontend-only: there is no backend server, database, or API. All copy and asset paths live in the **content module** (`content/site.ts`) — the single source of truth — while section identity (ids, labels, nav membership, page order) lives in the **section registry** (`data/sections.tsx`), and shared types live under `types/`. The project is suitable for learning Next.js App Router, client components, animations, and responsive layout patterns.

---

## Features & Functionality

**Core features:**

- **Hero section** – Full-bleed brand banner with eyebrow, title, tagline ("Rasa Yang Bercerita"), cities, and two scroll CTAs. Framer Motion fade-ins keyed to scroll.
- **Stats band** – Dark band with the brand's key numbers (years, menu items, cabang, guests).
- **About section** – Two-column layout (brand story + photo) with scroll-triggered animations; CTA scrolls to Perjalanan.
- **Perjalanan timeline** – The brand journey 2021–2025 (founding, expansions, reopening) as a vertical timeline.
- **Nilai section** – The brand's three values plus four advantages as cards.
- **Menu Andalan** – Grid of signature dishes with photography and IDR prices. Data comes from the content module (`content/site.ts`); hover effects and responsive columns.
- **Reservation section** – Form with first/last name, date picker (react-day-picker), time, and party size select (Radix Select). The form hands a `ReservationRequest` to a **reservation channel** (`lib/reservation.ts`); the WhatsApp adapter opens a `wa.me` deep link — no backend required, and an HTTP backend can be swapped in behind the same interface.
- **Testimoni** – Customer testimonials grid with 5-star ratings.
- **Contact section** – Cabang list (Belitung, Depok Tanah Baru, Cibitung Bekasi, Jogjakarta), contact info, and an interactive Leaflet map that pins the geocodable cabang from the content module. The map is loaded only on the client via `MapDynamic` to avoid SSR issues with Leaflet.
- **Header** – Fixed nav with logo, desktop nav links (smooth scroll via react-scroll), "Reservasi" CTA, and mobile menu.
- **Footer** – Logo, tagline, kontak links, sosial media, and cabang list.

**Technical behaviour:**

- **Single route, registry-driven composition** – The only route is `/`. `app/page.tsx` renders sections in the order defined by the section registry (`data/sections.tsx`); a `Record<SectionId, ComponentType>` map makes a missing section component a type error. Navigation smooth-scrolls to section ids (`#home`, `#about`, `#perjalanan`, `#menu`, `#testimoni`, `#contact`).
- **Content module** – All brand copy and asset paths come from `content/site.ts`; components never hardcode copy.
- **Client components** – Interactive pieces use `"use client"` (Header, Hero, Menu, About, Timeline, Values, Testimonials, Contact, Reservation, ReservationForm, Footer, Map, Nav, NavMobile, UI primitives).
- **Dynamic import** – The map is wrapped in `MapDynamic`, which uses `next/dynamic` with `ssr: false` so Leaflet runs only in the browser.
- **Token seam** – The whole visual identity (palette, fonts, shadows) is defined once in `tailwind.config.js`; components reference semantic tokens only (`bg-cream`, `text-charcoal`, `text-gold`, `font-serif`), so rebranding is a single edit point.
- **SEO** – Metadata (title, description, keywords, Open Graph, Twitter, icons) is set in `app/layout.tsx` with Indonesian locale (`id_ID`) and metadataBase `https://steakkenangan.com`.

---

## Technology Stack

| Layer         | Technology                                                                               |
| ------------- | ---------------------------------------------------------------------------------------- |
| Framework     | Next.js 15 (App Router)                                                                  |
| Language      | TypeScript 5.6                                                                           |
| UI            | React 18.3                                                                               |
| Styling       | TailwindCSS 3.4, tailwindcss-animate                                                     |
| Fonts         | Next.js Google Fonts (Playfair Display, Inter)                                           |
| Animation     | Framer Motion 11                                                                         |
| Maps          | Leaflet (plain, StrictMode-safe)                                                         |
| UI primitives | Radix UI (Label, Popover, Select, Slot)                                                  |
| Icons         | Lucide React, React Icons                                                                |
| Utilities     | clsx, tailwind-merge, class-variance-authority, date-fns, react-scroll, react-responsive |

---

## Project Structure

```bash
Steak-Kenangan-Landing-Page/
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata, global styles
│   ├── page.tsx        # Home page: composes all sections via the registry
│   ├── globals.css     # Tailwind directives + base styles
│   └── favicon.ico     # Site favicon
├── components/
│   ├── Header.tsx      # Fixed header, logo, nav, CTA, mobile menu
│   ├── Hero.tsx        # Hero section with motion animations
│   ├── Stats.tsx       # Key-numbers band
│   ├── About.tsx       # About section (text + image)
│   ├── Timeline.tsx    # Perjalanan: 2021–2025 vertical timeline
│   ├── Values.tsx      # Nilai: values + advantages cards
│   ├── Menu.tsx        # Menu Andalan grid (content module)
│   ├── Reservation.tsx # Reservation section wrapper
│   ├── ReservationForm.tsx # Form → reservation channel (WhatsApp today)
│   ├── Testimonials.tsx# Testimoni grid with ratings
│   ├── Contact.tsx     # Kontak: cabang list, contact info, map
│   ├── Map.tsx         # Leaflet map, pins cabang with coords (client-only)
│   ├── MapDynamic.tsx  # Dynamic wrapper for Map (ssr: false)
│   ├── Footer.tsx      # Footer with tagline, links, cabang
│   ├── Nav.tsx         # Desktop nav (registry-driven scroll links)
│   ├── NavMobile.tsx   # Mobile menu with icons
│   └── ui/             # Reusable UI primitives
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── popover.tsx
│       └── calendar.tsx
├── content/
│   └── site.ts         # Content module: single source of truth for copy/assets
├── data/
│   └── sections.tsx    # Section registry: ids, labels, offsets, icons, nav, order
├── lib/
│   ├── reservation.ts  # ReservationChannel seam + WhatsApp adapter
│   ├── utils.ts        # cn() – merge Tailwind classes
│   └── variants.ts     # Framer Motion fadeIn variants
├── types/
│   ├── index.ts        # FadeDirection, MenuItem, CabangEntry, ContactInfo, etc.
│   └── react-scroll.d.ts # Type declaration for react-scroll
├── public/             # Static assets (images, icons)
├── next.config.mjs
├── tailwind.config.js  # Token seam: palette, fonts, shadows
├── tsconfig.json
├── vercel.json         # Rewrites for SPA-style routing on Vercel
└── package.json
```

---

## Installation & How to Run

**Prerequisites:** Node.js 18+ and npm (or yarn/pnpm).

**Steps:**

1. Clone the repository and go into the project folder:

   ```bash
   git clone <repository-url>
   cd Steak-Kenangan-Landing-Page
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Other scripts:
   - **Build:** `npm run build` – production build.
   - **Start:** `npm run start` – run the production build locally.
   - **Lint:** `npm run lint` – run ESLint (Next.js config).

You do **not** need a backend or any external service to run or build this project.

---

## Environment Variables

**You do not need any environment variables to run this project.** It works out of the box with no `.env` file.

If you later add features that need configuration (e.g. analytics, a contact form backend, or a CMS), you can:

1. Create a `.env.local` in the project root (this file is gitignored).
2. Add variables such as:

   ```env
   NEXT_PUBLIC_SITE_URL=https://steakkenangan.com
   # Optional examples:
   # NEXT_PUBLIC_ANALYTICS_ID=...
   # CONTACT_FORM_ENDPOINT=...
   ```

3. Use them in code via `process.env.NEXT_PUBLIC_*` (client) or `process.env.*` (server). Restart the dev server after changing `.env.local`.

For the current codebase, no env vars are read; this section is for future use only.

---

## Routes & Navigation

- **Route:** There is a single route, `/`, defined by `app/page.tsx`. It renders the Header, then every section in registry order (home, stats, about, perjalanan, nilai, menu, reservation, testimoni, contact), then the Footer.

- **In-page navigation:** Links in the header and mobile menu use **react-scroll** to smooth-scroll to section IDs driven by the section registry (`data/sections.tsx`): `#home`, `#about`, `#perjalanan`, `#menu`, `#testimoni`, `#contact` (only sections flagged `inNav` appear in navigation). Section IDs are set on the corresponding `<section>` elements (e.g. `id="home"`, `id="menu"`).

- **Vercel rewrites:** `vercel.json` rewrites all non-asset paths to `/` so that refreshing the page on any path still serves the app (SPA-style behaviour on Vercel).

There are no API routes or server-only routes in this project.

---

## Components Walkthrough

**app/layout.tsx**  
Root layout: loads Playfair Display (headings serif) and Inter (body sans) via `next/font/google`, applies `globals.css`, and exports `metadata` (title, description, keywords, Open Graph with `id_ID` locale, Twitter, icons) with `metadataBase` set to `https://steakkenangan.com`. Renders `<html lang="id">` and `<body>` with font variables; backgrounds come from `globals.css` (`bg-cream`), keeping the tailwind token seam as the single edit point.

**content/site.ts (content module)**  
The single source of truth for all brand copy and asset paths — brand, hero, stats, about, perjalanan, nilai, menu items, testimonials, reservation config (including the WhatsApp number), cabang, and footer. Components never hardcode copy.

**data/sections.tsx (section registry)**  
The single seam for section identity: ids, nav labels, scroll offsets, mobile-nav icons, nav membership, and page order. Nav, NavMobile, Header's CTA target, and `app/page.tsx` composition all read from it.

**app/page.tsx**  
Server component that composes the single page: Header, then each registry section via a `Record<SectionId, ComponentType>` map (Hero, Stats, About, Timeline, Values, Menu, Reservation, Testimonials, Contact), then Footer inside a `<main>` container.

**Header**  
Client component. Tracks scroll position; toggles header background after 100px. Renders the white brand logo (Next.js `Image`), desktop `Nav`, a react-scroll CTA button (target from the registry via `getSection`), and `NavMobile` for small screens.

**Nav / NavMobile**  
Desktop nav renders react-scroll `Link`s for registry sections flagged `inNav`; NavMobile is a full-screen overlay with logo, icon scroll links, and the CTA button. Labels, offsets, and icons all come from the registry.

**Hero**  
Full-bleed banner with eyebrow, title, tagline, cities, and two scroll CTAs. Uses Framer Motion's `motion.*` and `fadeIn` from `lib/variants.ts` for scroll-triggered animations. Images via Next.js `Image`.

**Stats / Timeline (Perjalanan) / Values (Nilai) / Testimonials / Contact**  
Registry sections rendered from content-module data with staggered Framer Motion fade-ins: key numbers, the 2021–2025 brand journey as a vertical timeline, three values plus four advantages, testimonials with ratings, and the kontak section (cabang list, contact info, and the map).

**Menu**  
Renders signature dishes from `site.menu.items` (content module) as a responsive grid with photography-only cards; image scales on hover.

**Reservation & ReservationForm**  
Reservation is a dark card wrapper with motion. The form uses Radix Popover + react-day-picker for the date, Radix Select for party size, and hands a `ReservationRequest` to the reservation channel (`lib/reservation.ts`). The WhatsApp adapter builds a `wa.me` deep link (message formatted with the Indonesian date-fns locale) and opens it in a new tab; swapping in the PRD's HTTP backend is a one-line change behind the same `ReservationChannel` interface.

**About**  
Two-column layout (brand story + photo) with motion variants; CTA scrolls to Perjalanan.

**Map & MapDynamic**  
`Map` uses plain Leaflet (StrictMode-safe init/cleanup — see the module comment for why not react-leaflet) and plots only the cabang entries that carry `coords` in the content module; it is only loaded on the client. `MapDynamic` uses `dynamic(() => import('@/components/Map'), { ssr: false })` so the map does not run during SSR.

**Footer**  
Footer with logo, tagline, kontak links, sosial media, and cabang list — all from the content module.

**components/ui/**  
Reusable primitives built on Radix (button, input, label, select, popover) and react-day-picker (calendar). Styled with Tailwind semantic tokens and the `cn()` helper from `lib/utils.ts`.

**lib/reservation.ts (reservation channel seam)**  
Turns form fields into a `ReservationRequest` and hands it to a `ReservationChannel`. `buildReservationLink` is a pure function (request → wa.me URL); `createWhatsAppChannel` is today's adapter, and the PRD's HTTP reservation backend plugs in later behind the same interface.

---

## Libraries & Dependencies

**Next.js 15** – React framework with App Router, file-based routing, and built-in optimizations (images, fonts, code splitting). This project uses the `app/` directory and a single `page.tsx`.

**React 18 & TypeScript** – UI library and typed JavaScript. Components are written in `.tsx` with explicit types (see `types/index.ts`).

**TailwindCSS** – Utility-first CSS. Classes are used in JSX; theme (colors, fonts, breakpoints) is in `tailwind.config.js`. The `cn()` helper in `lib/utils.ts` combines `clsx` and `tailwind-merge` to merge and resolve class names safely.

**Framer Motion** – Declarative animations. `lib/variants.ts` exports a `fadeIn(direction, delay)` helper that returns `hidden`/`show` variants for use with `motion.*` and `initial`/`whileInView`.

**react-scroll** – Enables smooth scrolling to in-page sections. `<Link to="reservation" smooth offset={-150}>` scrolls to the element with `id="reservation"` with an offset.

**Radix UI** – Accessible primitives (Label, Popover, Select, Slot). Used in ReservationForm and in `components/ui/` for consistent, accessible form and overlay behaviour.

**Leaflet** – Map library used directly (no React bindings). Pins the geocodable cabang from the content module and is rendered only on the client to avoid “window is not defined” during SSR.

**date-fns & react-day-picker** – Date formatting and calendar UI for the reservation date field.

**class-variance-authority (cva)** – Used in `components/ui/button.tsx` to define button variants (default, orange, input, ghost) and sizes in a type-safe way.

---

## Reusing Components

You can copy individual components or the whole structure into another Next.js (App Router) project.

**Example – reuse Hero and Menu:**

1. Copy `components/Hero.tsx` and `components/Menu.tsx`.
2. Copy `lib/variants.ts` and `lib/utils.ts` (Hero/Menu and UI depend on them).
3. Copy `data/menu.ts` (Menu reads `menuItems`).
4. Ensure `types/index.ts` (or equivalent) defines `MenuItem` and `FadeDirection` (or adapt imports).
5. Ensure Tailwind is set up and `tailwind.config.js` includes your `content` paths and any custom theme (e.g. `colors.body`, `fontFamily`) used by these components.
6. In your page or layout, render `<Hero />` and `<Menu />`. If you use Next.js `Image`, keep assets in `public/` and paths like `/hero/plate.png`, `/menu/item-1.png` as in this project, or update them to your asset paths.

**Example – reuse only the Button:**

Copy `components/ui/button.tsx` and `lib/utils.ts`. Install `class-variance-authority`, `clsx`, and `tailwind-merge`. Use `<Button variant="orange" size="sm">Book a table</Button>` (or any variant/size). Adjust Tailwind theme if your project uses different colour names.

**General tip:** This app uses the `@/` path alias (e.g. `@/components/Header`, `@/lib/utils`). In a new project, configure the same in `tsconfig.json` (`"paths": { "@/*": ["./*"] }`) or change imports to relative paths when reusing files.

---

## Deployment

**Vercel (recommended):**

1. Push the repo to GitHub (or connect your Git provider in Vercel).
2. In Vercel, create a new project and import the repository.
3. Leave build command as `npm run build` and output as default (Next.js).
4. Deploy. The live URL will be something like `https://<project>.vercel.app`. The project is already configured with `vercel.json` for SPA-style rewrites.

**Other platforms:** Use `npm run build` and `npm run start`, or follow your host’s guide for Next.js. Ensure Node.js 18+ is available. No environment variables are required for the current feature set.

---

## Keywords

restaurant, steakhouse, Steak Kenangan, iga bakar, dining, restaurant website, food menu, book table, restaurant reservation, rasa yang bercerita, modern restaurant, fine dining, gourmet food, restaurant menu, online reservation, restaurant booking, Next.js, React, TypeScript, TailwindCSS, Framer Motion, Leaflet, Radix UI, App Router, static site, frontend, learning project, open source.

---

## Conclusion

This repository is a **frontend-only**, **single-page** steakhouse landing site for Steak Kenangan, built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion. It has **no backend or API**; all copy lives in the content module (`content/site.ts`), section identity in the registry (`data/sections.tsx`), and shared types under `types/`. It is suitable for learning the App Router, client components, animations, and responsive layout, and can be extended with a backend (e.g. the HTTP reservation adapter), CMS, or analytics later. Use the Table of Contents to jump to any section of this README.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
