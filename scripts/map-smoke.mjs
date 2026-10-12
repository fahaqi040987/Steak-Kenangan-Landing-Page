/**
 * Regression smoke: the Kontak map view must render the Google Maps embed
 * iframe from the content module (kontak.mapEmbed.src) — the only map the site
 * ships since the Leaflet map was removed (see docs/adr/0001).
 *
 * Red = no iframe with a google.com/maps/embed src inside the contact section.
 * Green = the embed iframe is present.
 *
 * Requires the playwright package (browsers via `npx playwright install chromium`):
 *   npm i -D playwright
 * Usage: node scripts/map-smoke.mjs [url]   (default http://localhost:3000)
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const SELECTOR = 'section#contact iframe[src*="google.com/maps/embed"]';

const browser = await chromium.launch({
  // Reuse an already-cached browser build when the default download is missing
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});
const page = await browser.newPage();

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

let frame = null;
try {
  // waitForSelector waits for hydration + Framer Motion mount; the iframe is in
  // the DOM as soon as the Contact section renders.
  frame = await page.waitForSelector(SELECTOR, { timeout: 15000 });
} catch {
  // falls through to the RED branch below
}
await browser.close();

if (!frame) {
  console.log("RED — Google Maps embed iframe not found in the Kontak section");
  process.exit(1);
}
console.log("GREEN — Google Maps embed iframe present in the Kontak section");
process.exit(0);
