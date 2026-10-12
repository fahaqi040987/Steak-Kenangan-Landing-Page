/**
 * Regression smoke: the reservation form must build a correct WhatsApp deep link.
 * Drives the real UI (inputs, date picker, both selects), submits, and captures
 * window.open. Red = no popup, wrong host/number, or missing fields in the message.
 * Green = https://wa.me/<number>?text=<encoded message containing name/date/guests>.
 *
 * Requires the playwright package (browsers via `npx playwright install chromium`):
 *   npm i -D playwright
 * Usage: node scripts/reservation-smoke.mjs [url]   (default http://localhost:3000)
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const WA_PREFIX = "https://wa.me/6287899277000?text=";

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});
const page = await browser.newPage();

// Capture window.open instead of spawning a real popup
await page.addInitScript(() => {
  window.__opened = null;
  window.open = (u) => {
    window.__opened = String(u);
    return null;
  };
});

await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(5000); // hydration

// Scroll the reservation section into view (framer-motion whileInView needs it visible)
await page.evaluate(() => {
  document.getElementById("reservation")?.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(1000);

// Fill names
await page.fill("#firstname", "Budi");
await page.fill("#lastname", "Santoso");

// Open the date popover and pick the first numbered enabled day
// (react-day-picker v8: day buttons live under the .rdp root inside the popover dialog)
await page.getByRole("button", { name: /Pilih tanggal/i }).click();
await page.waitForTimeout(400);
await page.locator(
  "[role=dialog] .rdp button:not([disabled])",
  { hasText: /\d/ }
).first().click();
await page.waitForTimeout(300);

// Pick time (first combobox) and guests (second combobox)
await page.locator("button[role=combobox]").nth(0).click();
await page.waitForTimeout(300);
await page.getByRole("option", { name: "19:00" }).click();
await page.waitForTimeout(300);

await page.locator("button[role=combobox]").nth(1).click();
await page.waitForTimeout(300);
await page.getByRole("option", { name: "4", exact: true }).click();
await page.waitForTimeout(300);

// Submit
await page.getByRole("button", { name: /Kirim via WhatsApp/i }).click();
await page.waitForTimeout(800);

const opened = await page.evaluate(() => window.__opened);
await browser.close();

if (!opened) {
  console.log("RED — submit did not open anything (window.open never called)");
  process.exit(1);
}
if (!opened.startsWith(WA_PREFIX)) {
  console.log(`RED — wrong link: ${opened}`);
  process.exit(1);
}
const message = decodeURIComponent(opened.replace(WA_PREFIX, ""));
const checks = ["Budi Santoso", "19:00", "4"].filter((s) => message.includes(s));
if (checks.length !== 3) {
  console.log(`RED — message missing fields (${checks.length}/3 found): ${message}`);
  process.exit(1);
}
console.log("GREEN — wa.me link opened with complete message:");
console.log("  " + message.replace(/\n/g, " | "));
process.exit(0);
