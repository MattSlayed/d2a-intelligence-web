/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep TypeScript type-checking on, but don't let lint nits block the build.
  eslint: { ignoreDuringBuilds: true },
  // Pin the file-tracing root to this app so a stray parent lockfile
  // (e.g. under the user home dir) doesn't confuse Vercel's root inference.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
