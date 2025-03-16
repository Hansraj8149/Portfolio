import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portfolio-backend-xfse.onrender.com",
      },
    ],
  },
};

export default nextConfig;
