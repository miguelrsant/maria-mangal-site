import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos pré-geradas em WebP (scripts/webp.mjs) e servidas como arquivos estáticos.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1280, 1600, 2000],
    imageSizes: [384],
  },
  async headers() {
    return [{ source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, s-maxage=31536000, stale-while-revalidate=31536000" }] }];
  },
};

export default nextConfig;
