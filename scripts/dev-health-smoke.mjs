/**
 * Dev-health smoke: `next dev` must serve the page with no React Client Manifest
 * or webpack module errors ("Could not find the module … #SegmentViewNode",
 * "__webpack_modules__[moduleId] is not a function"), no error overlay, and all
 * sections rendered.
 *
 * Red = one of those signatures appears, or the overlay shows a runtime error.
 * Green = clean load.
 *
 * Requires playwright (`npm i -D playwright`).
 * Usage: PLAYWRIGHT_CHROMIUM_PATH=<chromium> node scripts/dev-health-smoke.mjs [url]
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const SIGNATURES = [
  /Could not find the module .* in the React Client Manifest/,
  /__webpack_modules__\[moduleId\] is not a function/,
];

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});
const page = await browser.newPage();

const hits = [];
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const text = msg.text();
  if (SIGNATURES.some((rx) => rx.test(text))) hits.push(text.split("\n")[0]);
});
page.on("pageerror", (err) => {
  const s = String(err);
  if (SIGNATURES.some((rx) => rx.test(s))) hits.push(s.split("\n")[0]);
});

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(8000); // hydrate + let HMR/devtools settle

const state = await page.evaluate(() => ({
  sections: [...document.querySelectorAll("section[id]")].map((s) => s.id),
  overlayError: (() => {
    const portal = document.querySelector("nextjs-portal");
    const dlg = portal?.shadowRoot?.querySelector("[data-nextjs-dialog], dialog, [role=dialog]");
    return dlg?.textContent?.slice(0, 120) ?? null;
  })(),
}));
await browser.close();

if (hits.length > 0) {
  console.log(`RED — ${hits.length} dev-infra error(s):`);
  hits.slice(0, 4).forEach((h) => console.log("  " + h));
  process.exit(1);
}
if (state.overlayError) {
  console.log("RED — error overlay visible: " + state.overlayError);
  process.exit(1);
}
if (state.sections.length < 9) {
  console.log(`RED — only ${state.sections.length}/9 sections rendered: ${state.sections.join(",")}`);
  process.exit(1);
}
console.log(`GREEN — clean load, ${state.sections.length} sections, no manifest/webpack errors`);
process.exit(0);
