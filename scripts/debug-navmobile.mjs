/**
 * [DEBUG-nav] Diagnosis + regression harness for the NavMobile overlay bug:
 * "menu opened mid-page shows the nav text over a transparent background;
 * opened at the top of the page it behaves differently (dimmed)."
 *
 * Mechanism under test (H1): the overlay <aside> relies on backdrop-filter,
 * but it is rendered INSIDE <header>. When the header is scrolled/hovered it
 * gains its own backdrop-filter (frosted glass). A backdrop-filter ancestor
 * induces a backdrop ROOT, so the overlay's dim+blur stops seeing the page
 * and collapses to ~transparent. At the top (header transparent) it works.
 *
 * RED when, with the menu open:
 *   - any ancestor of the overlay creates a backdrop-root boundary
 *     (backdrop-filter / filter / opacity < 1), or
 *   - the overlay does not paint above the header (elementFromPoint probe).
 *
 * Usage:  node scripts/debug-navmobile.mjs
 * Requires: server on :3000 (or SMOKE_BASE_URL). Screenshots land in /tmp.
 */
import { chromium } from "playwright-core";

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";

const failures = [];
const note = (ok, label, detail) => {
  console.log(`${ok ? "  ok " : "  RED"} ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(label);
};

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
await page.goto(BASE_URL, { waitUntil: "networkidle" });

async function openMenu() {
  await page.locator("button[aria-label=\"Buka menu\"]").first().click();
  await page.waitForTimeout(700); // 500ms slide + settle
  await page.mouse.move(200, 400); // park pointer off the header (no hover styles)
}

async function closeMenu() {
  await page.keyboard.press("Escape"); // NavMobile closes on Escape
  await page.waitForTimeout(700);
}

/** Walk the overlay's ancestors; any backdrop-root boundary breaks the dim+blur. */
async function probe(label) {
  const r = await page.evaluate(() => {
    const aside = document.querySelector("aside");
    if (!aside) return { missing: true };
    const bad = [];
    let el = aside.parentElement;
    while (el && el !== document.documentElement) {
      const cs = getComputedStyle(el);
      const bf = cs.backdropFilter || "none";
      const fl = cs.filter || "none";
      const op = parseFloat(cs.opacity);
      if (bf !== "none" || fl !== "none" || op < 1) {
        bad.push(
          `${el.tagName}.${String(el.className).slice(0, 40)} bf=${bf} filter=${fl} opacity=${op}`
        );
      }
      el = el.parentElement;
    }
    const hit = document.elementFromPoint(30, 30);
    return {
      bad,
      hitInAside: aside.contains(hit),
      hit: hit ? hit.tagName : "none",
      bg: getComputedStyle(aside).backgroundColor,
      blur: getComputedStyle(aside).backdropFilter,
    };
  });
  if (r.missing) {
    note(false, `${label}: overlay <aside> found in DOM`);
    return;
  }
  console.log(
    `  [${label}] bg=${r.bg} blur=${r.blur} boundaries=${r.bad.length ? r.bad.join(" | ") : "none"} hitInAside=${r.hitInAside} hit=${r.hit}`
  );
  note(r.bad.length === 0, `${label}: no backdrop-root boundary above the overlay`);
  note(r.hitInAside, `${label}: overlay paints above the header`);
}

// Scenario A — opened at the very top of the page (user: "behavior is different").
await openMenu();
await probe("at-top");
await page.screenshot({ path: "/tmp/navmobile-top.png" });
await closeMenu();

// Scenario B — opened in the middle of the landing page (the reported bug).
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
await page.waitForTimeout(500);
await openMenu();
await probe("mid-page");
await page.screenshot({ path: "/tmp/navmobile-mid.png" });

await browser.close();

if (failures.length > 0) {
  console.error(`DEBUG-nav RED (${failures.length}): ${failures.join(" | ")}`);
  console.error("screenshots: /tmp/navmobile-top.png, /tmp/navmobile-mid.png");
  process.exit(1);
}
console.log("DEBUG-nav GREEN — overlay dim+blur intact at top and mid-page");
