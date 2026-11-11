import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos pré-geradas em WebP (scripts/webp.mjs) e servidas como arquivos estáticos.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1280, 1600, 2000],
    imageSizes: [384],
  },
  async redirects() {
    // Um domínio só: os endereços extras da Vercel vão para o oficial.
    const extras = ["maria-mangal-parrilla-miguelrsants-projects.vercel.app", "maria-mangal-parrilla-git-main-miguelrsants-projects.vercel.app"];
    return [
      ...extras.map((value) => ({ source: "/:path*", has: [{ type: "host" as const, value }], destination: "https://maria-mangal-parrilla.vercel.app/:path*", permanent: true })),
      { source: "/about", destination: "/sobre", permanent: true },
      { source: "/contact", destination: "/contato", permanent: true },
      { source: "/privacy", destination: "/privacidade", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/", headers: [{ key: "Link", value: '</llms.txt>; rel="describedby"; type="text/markdown", </index.md>; rel="alternate"; type="text/markdown", </sitemap.xml>; rel="sitemap"' }] },
      { source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, s-maxage=31536000, stale-while-revalidate=31536000" }] },
    ];
  },
};

export default nextConfig;
