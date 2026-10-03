import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server output keeps the Docker image small. Opt-in because
  // it needs symlink permissions that a plain Windows shell doesn't have.
  output: process.env.STANDALONE === "1" ? "standalone" : undefined,
  poweredByHeader: false,
};

export default nextConfig;
