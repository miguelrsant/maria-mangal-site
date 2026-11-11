import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Site aberto para buscadores e para os robôs de IA (busca, citação e acesso a pedido de uma pessoa).
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
