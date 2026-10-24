import { LARGURAS, nomeWebp } from "./webp.mjs";

/**
 * As fotos já vão prontas em WebP, em vários tamanhos (public/img), e saem direto da CDN.
 * Assim nenhuma foto espera ser convertida na hora da visita.
 */
export default function loader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/fotos/")) return src;
  const w = LARGURAS.find((l) => l >= width) ?? LARGURAS[LARGURAS.length - 1];
  return `/img/${nomeWebp(src)}-${w}.webp`;
}
