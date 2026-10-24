import type { MetadataRoute } from "next";
import { CASAS, MOSAICO, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const fotos = [...CASAS.flatMap((c) => [c.foto.src, c.detalhe.src]), ...MOSAICO.map((f) => f.src)];
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1, images: fotos.map((f) => `${SITE_URL}${f}`) }];
}
