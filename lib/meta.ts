// Metadados de uma página: título, descrição, canonical absoluto, a versão em Markdown e os dados de compartilhamento.
import type { Metadata } from "next";
import { MARCA, abs } from "./site";

export function pageMeta(p: { path: string; titulo: string; descricao: string }): Metadata {
  const images = [{ url: abs("/opengraph-image.jpg"), width: 1200, height: 630, alt: `${MARCA.nome}: site conceito de parrilla argentina` }];
  const md = p.path === "/" ? "/index.md" : `${p.path}.md`;
  return {
    title: { absolute: p.titulo },
    description: p.descricao,
    alternates: { canonical: abs(p.path), types: { "text/markdown": abs(md) } },
    openGraph: { type: "website", locale: "pt_BR", siteName: MARCA.nome, title: p.titulo, description: p.descricao, url: abs(p.path), images },
    twitter: { card: "summary_large_image", title: p.titulo, description: p.descricao, images },
  };
}
