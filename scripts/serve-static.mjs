#!/usr/bin/env node
/**
 * Zero-dependency static file server for the exported build (out/).
 * Replaces `next start`, which is incompatible with output: "export".
 *
 *   npm start                    serve out/ at http://localhost:3000
 *   PORT=4000 npm start          serve on a different port
 *   node scripts/serve-static.mjs --check
 *                                boot on an ephemeral port, self-test /,
 *                                a brand asset, and the 404 page, print
 *                                PASS/FAIL, and exit 0/1.
 */
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webmanifest": "application/manifest+json",
};

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveFile(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  } catch {
    return null;
  }

  // Traversal guard: the resolved path must stay inside out/.
  const resolved = path.resolve(ROOT, "." + path.posix.normalize(pathname));
  if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) return null;

  const candidates =
    pathname.endsWith("/") || pathname === ""
      ? [path.join(resolved, "index.html")]
      : [resolved, resolved + ".html", path.join(resolved, "index.html")];

  for (const candidate of candidates) {
    const stat = await fs.stat(candidate).then(
      (s) => (s.isFile() ? s : null),
      () => null,
    );
    if (stat) return candidate;
  }
  return null;
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (file) {
    const body = await fs.readFile(file);
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": "no-store",
    });
    res.end(body);
    return;
  }

  const notFoundPage = path.join(ROOT, "404.html");
  if (await exists(notFoundPage)) {
    const body = await fs.readFile(notFoundPage);
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": body.length,
      "Cache-Control": "no-store",
    });
    res.end(body);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

server.on("error", (err) => {
  console.error(`static server error: ${err.message}`);
  process.exit(1);
});

function listen(port) {
  return new Promise((resolve) => {
    server.listen(port, HOST, () => resolve(server.address().port));
  });
}

if (process.argv.includes("--check")) {
  const port = await listen(0);
  const base = `http://127.0.0.1:${port}`;
  const failures = [];

  const home = await fetch(`${base}/`);
  const homeBody = await home.text();
  if (home.status !== 200) failures.push(`GET / -> ${home.status}, expected 200`);
  if (!homeBody.includes("Rasa Yang Bercerita")) failures.push("GET / body missing brand tagline");

  const asset = await fetch(`${base}/brand/logo-dark.png`);
  if (asset.status !== 200) failures.push(`GET /brand/logo-dark.png -> ${asset.status}, expected 200`);
  if (!(asset.headers.get("content-type") ?? "").includes("image/png")) {
    failures.push("GET /brand/logo-dark.png content-type is not image/png");
  }

  const missing = await fetch(`${base}/does-not-exist`);
  if (missing.status !== 404) failures.push(`GET /does-not-exist -> ${missing.status}, expected 404`);

  server.closeAllConnections();
  server.close();
  if (failures.length > 0) {
    console.error("CHECK FAIL:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`CHECK PASS (${base}): /, /brand asset, and 404 all served correctly`);
  process.exit(0);
} else {
  if (!(await exists(path.join(ROOT, "index.html")))) {
    console.error(`No out/index.html found at ${ROOT}.`);
    console.error("Run `npm run build` first, then `npm start`.");
    process.exit(1);
  }
  const port = await listen(PORT);
  console.log(`Serving out/ at http://localhost:${port} (ctrl+c to stop)`);
}
