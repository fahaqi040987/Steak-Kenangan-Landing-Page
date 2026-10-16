/** Next.js config. Static export: this site has no server routes, so the build emits a plain `out/` directory that any static host (e.g. Cloudflare Workers static assets) can serve as-is. */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
