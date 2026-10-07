/**
 * Regression smoke: the Leaflet map must mount exactly once, with no
 * "Map container is already initialized" error — including under React
 * StrictMode's simulated unmount/remount (next dev double-invokes effects).
 *
 * Red = the double-init error appears, or the leaflet pane never mounts.
 * Green = clean mount.
 *
 * Requires the playwright package (browsers via `npx playwright install chromium`):
 *   npm i -D playwright
 * Usage: node scripts/map-smoke.mjs [url]   (default http://localhost:3000)
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const BUG = "Map container is already initialized";

const browser = await chromium.launch({
  // Reuse an already-cached browser build when the default download is missing
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});
const page = await browser.newPage();

const hits = [];
page.on("console", (msg) => {
  if (msg.type() === "error" && msg.text().includes(BUG)) hits.push(msg.text());
});
page.on("pageerror", (err) => {
  if (String(err).includes(BUG)) hits.push(String(err));
});

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(6000); // let hydrate + StrictMode double-fire settle

const pane = await page.$(".leaflet-pane");
await browser.close();

if (hits.length > 0) {
  console.log(`RED — ${hits.length} occurrence(s) of "${BUG}":`);
  hits.forEach((h) => console.log("  " + h.split("\n")[0]));
  process.exit(1);
}
if (!pane) {
  console.log("RED — leaflet pane never mounted (map did not initialize at all)");
  process.exit(1);
}
console.log("GREEN — no double-init error, leaflet pane mounted");
process.exit(0);
