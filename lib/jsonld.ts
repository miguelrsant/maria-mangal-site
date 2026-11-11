// JSON-LD (schema.org): quem fez (Person), o site, o projeto (CreativeWork) e a página atual, ligados por @id.
// O restaurante é fictício, por isso não entra como Restaurant: marcar um negócio que não existe enganaria os buscadores.
import { AUTOR, MARCA, SITE, SITE_URL, abs } from "./site";

type Tipo = "WebPage" | "AboutPage" | "ContactPage";

export function jsonLd(pagina: { path: string; titulo: string; descricao: string; tipo: Tipo; nome?: string }) {
  const pessoa = `${AUTOR.url}/#miguel`;
  const site = `${SITE_URL}/#site`;
  const projeto = `${SITE_URL}/#projeto`;
  const imagem = `${SITE_URL}/opengraph-image.jpg`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": pessoa,
      name: AUTOR.nome,
      url: AUTOR.url,
      jobTitle: AUTOR.papel,
      email: `mailto:${AUTOR.email}`,
      address: { "@type": "PostalAddress", addressLocality: AUTOR.cidade, addressRegion: AUTOR.uf, addressCountry: "BR" },
      contactPoint: { "@type": "ContactPoint", contactType: "orçamentos e projetos", email: AUTOR.email, url: `${AUTOR.url}/contato`, availableLanguage: ["pt-BR", "en"] },
      sameAs: [AUTOR.instagram, AUTOR.github, AUTOR.linkedin],
      knowsAbout: ["desenvolvimento web", "sites para restaurantes", "Next.js", "React", "TypeScript", "design de interface", "motion design"],
    },
    {
      "@type": "WebSite",
      "@id": site,
      name: MARCA.nome,
      alternateName: `${MARCA.nome} · site conceito`,
      url: `${SITE_URL}/`,
      description: SITE.descricao,
      inLanguage: "pt-BR",
      author: { "@id": pessoa },
      publisher: { "@id": pessoa },
    },
    {
      "@type": "CreativeWork",
      "@id": projeto,
      name: `${MARCA.nome} (site conceito)`,
      headline: "Site conceito de uma parrilla argentina fictícia",
      description: SITE.descricao,
      url: `${SITE_URL}/`,
      image: imagem,
      inLanguage: "pt-BR",
      genre: "Site conceito de restaurante",
      keywords: ["site para restaurante", "site de parrilla", "reserva pelo WhatsApp", "design de site para restaurante", "Next.js"],
      isAccessibleForFree: true,
      creator: { "@id": pessoa },
      author: { "@id": pessoa },
      codeRepository: AUTOR.repo,
      sameAs: [AUTOR.repo],
    },
    {
      "@type": pagina.tipo,
      "@id": `${abs(pagina.path)}#pagina`,
      url: abs(pagina.path),
      name: pagina.titulo,
      description: pagina.descricao,
      inLanguage: "pt-BR",
      isPartOf: { "@id": site },
      about: { "@id": projeto },
      mainEntity: { "@id": pagina.path === "/" ? projeto : pessoa },
      dateModified: SITE.atualizado[pagina.path] ?? SITE.atualizado["/"],
      primaryImageOfPage: imagem,
    },
  ];
  if (pagina.path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: MARCA.nome, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: pagina.nome ?? pagina.titulo, item: abs(pagina.path) },
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export const homeJsonLd = () => jsonLd({ path: "/", titulo: SITE.titulo, descricao: SITE.descricao, tipo: "WebPage" });
