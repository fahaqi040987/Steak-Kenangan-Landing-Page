/**
 * Smoke test for the home page. Requires the dev server (or a preview server)
 * to be running:  npm run dev   then   npm run smoke
 *
 * Asserts the page renders (200), contains brand copy, serves the wired image
 * assets, and that no Next.js image-src error leaked into the response.
 * Exit code 0 = green, 1 = red.
 */
const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";

const EXPECTED_PRESENT = [
  "Rasa Yang Bercerita", // brand tagline renders
  "url=%2Fbrand%2Flogo-dark.png", // header brand logo wired
  "url=%2Fbrand%2Fhalal-logo.png", // halal badge wired
];

const EXPECTED_ABSENT = [
  "Failed to parse src", // next/image invalid-src throw (E63)
  "Failed to construct", // raw TypeError from new URL()
  "Application error", // client-side crash page
];

async function main() {
  let res;
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      res = await fetch(BASE_URL, { redirect: "manual" });
      break;
    } catch (err) {
      if (attempt === 10) {
        console.error(`SMOKE FAIL: cannot reach ${BASE_URL} — is the server running?`);
        process.exit(1);
      }
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  const html = await res.text();
  const failures = [];

  if (res.status !== 200) {
    failures.push(`status ${res.status}, expected 200`);
  }
  for (const needle of EXPECTED_PRESENT) {
    if (!html.includes(needle)) failures.push(`missing from HTML: ${needle}`);
  }
  for (const needle of EXPECTED_ABSENT) {
    if (html.includes(needle)) failures.push(`error string in HTML: ${needle}`);
  }

  if (failures.length > 0) {
    console.error(`SMOKE FAIL (${BASE_URL}):`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`SMOKE PASS (${BASE_URL}): ${html.length} bytes, all checks green`);
}

main();
