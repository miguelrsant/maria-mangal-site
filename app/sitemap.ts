import type { MetadataRoute } from "next";
import { PAGINAS } from "@/lib/pages";
import { CASAS, MOSAICO, SITE, SITE_URL, abs } from "@/lib/site";

// /sitemap.xml: a home (com as fotos) e as páginas internas, com a data da última mudança de verdade (SITE.atualizado).
export default function sitemap(): MetadataRoute.Sitemap {
  const fotos = [...CASAS.flatMap((c) => [c.foto.src, c.detalhe.src]), ...MOSAICO.map((f) => f.src)];
  return [
    { url: abs("/"), lastModified: SITE.atualizado["/"], changeFrequency: "monthly", priority: 1, images: fotos.map((f) => `${SITE_URL}${f}`) },
    ...PAGINAS.map((p) => ({ url: abs(p.path), lastModified: SITE.atualizado[p.path], changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
