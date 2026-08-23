import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server accept asset/HMR requests when previewing over the
  // local network (e.g. from a phone) instead of localhost. Next.js blocks
  // these by default as a cross-origin protection for the dev server.
  allowedDevOrigins: ["192.168.1.4"],
};

export default nextConfig;
