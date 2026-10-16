/**
 * [DEBUG-cal] Tightened diagnosis + regression harness for the reservation
 * date-picker bug ("day numbers scramble when choosing a date").
 *
 * Root cause under test: calendar.tsx builds day/nav buttons from
 * buttonVariants() without a size, so the CVA default size's min-w-[170px]
 * survives tailwind-merge (no conflicting min-w class) and inflates every
 * button box to 170px inside a 36px cell. The td grid looks intact; the
 * buttons overlap and steal each other's clicks.
 *
 * Drives the REAL page in headless Chrome (playwright-core + system Chrome —
 * no browser download) and asserts on BUTTON geometry, not td geometry.
 *
 * RED when any of:
 *   - a day/nav button's computed min-width is not 0px
 *   - any visible button is wider than 60px (intent: w-9=36 / w-7=28)
 *   - any two visible buttons in the popover overlap (pointer intercepts)
 *   - day rows are not 7 across
 *   - clicking "15" is intercepted, selects the wrong day, or the trigger
 *     keeps its placeholder text
 *
 * Usage:  node scripts/debug-calendar.mjs
 * Requires: server on :3000 (npm run dev, or npm start with a fresh build).
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const SHOTS = new URL("./debug-calendar-shots/", import.meta.url).pathname;
mkdirSync(SHOTS, { recursive: true });

const executablePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const failures = [];
const note = (ok, label, detail) => {
  console.log(`${ok ? "  ok " : "  RED"} ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(label);
};

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
await page.goto(BASE_URL, { waitUntil: "networkidle" });

// The reservation section is far down the page; scroll it into view first.
await page.locator("section#reservation").scrollIntoViewIfNeeded();
await page.waitForTimeout(800); // let framer-motion fade-ins settle

// Open the calendar popover.
await page.click("#tanggal");
const popover = page.locator("[role=dialog]");
await popover.waitFor({ state: "visible", timeout: 5000 });
await page.waitForTimeout(300);

await page.screenshot({ path: `${SHOTS}1-open.png` });

/** Geometry over BUTTON boxes — the td stays 36px; the button is what overflows. */
const dayButtons = await popover.locator("table td:not(.invisible) button").all();
const navButtons = await popover.locator(".rdp-nav button").all();
const rects = [];
let computedMinWidth = null;
for (const b of [...dayButtons, ...navButtons]) {
  if (computedMinWidth === null) {
    computedMinWidth = await b.evaluate((el) => getComputedStyle(el).minWidth);
  }
  const box = await b.boundingBox();
  if (box && box.width > 0) rects.push(box);
}

if (rects.length === 0) {
  console.log("  RED no visible buttons found in calendar popover");
  failures.push("no buttons found");
} else {
  const widths = rects.map((r) => Math.round(r.width));
  const heights = rects.map((r) => Math.round(r.height));
  const rows = new Map();
  let overlaps = 0;
  for (const r of rects) {
    const key = Math.round(r.y / 10);
    rows.set(key, (rows.get(key) ?? 0) + 1);
  }
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i];
      const b = rects[j];
      const overlapX = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
      const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
      if (overlapX > 2 && overlapY > 2) overlaps++;
    }
  }
  const rowCount = [...rows.values()];
  const maxW = Math.max(...widths);
  console.log(
    `grid: buttons=${rects.length} minW=${Math.min(...widths)} maxW=${maxW} minH=${Math.min(...heights)} maxH=${Math.max(...heights)} overlaps=${overlaps} dayRows=${JSON.stringify(rowCount)} computedMinWidth=${computedMinWidth}`
  );

  note(
    computedMinWidth === "0px",
    "button computed min-width is 0px",
    `got ${computedMinWidth}`
  );
  note(maxW <= 60, "every button ≤60px wide (w-9/w-7 intent)", `maxW=${maxW}px`);
  note(overlaps === 0, "no button overlaps (no pointer intercepts)", `overlaps=${overlaps}`);
  note(
    rowCount.every((n) => n === 7),
    "day rows are 7 across",
    JSON.stringify(rowCount)
  );
}

// Behavioral: clicking the 15th must select the 15th (this is the reported bug).
const day15 = popover
  .locator("table td:not(.invisible) button", { hasText: /^15$/ })
  .first();
let clicked = true;
try {
  await day15.click({ timeout: 5000 });
} catch {
  clicked = false;
  note(false, "day '15' clickable (no pointer intercept)");
}
if (clicked) {
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${SHOTS}2-selected.png` });
  const selected = await day15.getAttribute("aria-selected");
  note(selected === "true", "day '15' is the selected day", `aria-selected=${selected}`);
  const triggerText = await page.locator("#tanggal").innerText();
  note(
    triggerText.length > 0 && !triggerText.includes("Pilih tanggal"),
    "trigger shows formatted date",
    triggerText
  );
}

await browser.close();

for (const err of consoleErrors) {
  console.log(`  [console.error] ${err.slice(0, 300)}`);
}

if (failures.length > 0) {
  console.error(`DEBUG-cal RED (${failures.length}): ${failures.join(" | ")}`);
  console.error(`screenshots: ${SHOTS}1-open.png, ${SHOTS}2-selected.png`);
  process.exit(1);
}
console.log(`DEBUG-cal GREEN — calendar geometry + selection intact; shots in ${SHOTS}`);
