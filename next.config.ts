import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Só WebP: o AVIF demora para ser gerado na primeira visita e a foto chega atrasada.
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1080, 1280, 1600, 2000],
  },
};

export default nextConfig;
