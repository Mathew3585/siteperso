import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Qualités autorisées pour next/image (95 = quasi indiscernable de l'original).
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
